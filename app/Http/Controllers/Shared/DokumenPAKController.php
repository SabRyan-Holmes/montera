<?php

namespace App\Http\Controllers\Shared;

use App\Http\Controllers\Controller;
use App\Models\AturanPAK;
use App\Models\Catatan;
use App\Models\Koefisien;
use Inertia\Inertia;
use App\Models\Pegawai;
use App\Models\Pengajuan;
use App\Models\PengusulanPAK;
use App\Models\RiwayatPAK;
use App\Models\User;
use App\Services\AturanPAKService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;



class DokumenPAKController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth_sso();
            return $next($request);
        });
    }

    public function index()
    {
        $pegawai = Pegawai::latest();
        $subTitle = "";

        if (request('byDaerah')) {
            // $category = Pegawai::firstWhere('Daerah', request('byDaerah'));
            $subTitle = 'Berdasarkan Daerah : ' . request('byDaerah');
        }

        return Inertia::render('RiwayatPAK/Index', [
            "title" => "Pencetakan Dokumen PAK ",
            "subTitle" => $subTitle,
            "pegawais" => $pegawai->filter(request(['search', 'byDaerah', 'byJabatan']))->paginate(10),
            "searchReq" => request('search'),
            "byDaerahReq" => request('byDaerah'),
            "byJabatanReq" => request('byJabatan')
        ]);
    }

    public function show(Pegawai $pegawai)
    {
        return Inertia::render('RiwayatPAK/Show', [
            "title" => "Cetak Dokumen PAK ",
            'pegawai' => $pegawai
        ]);
    }

    public function create(Request $request)
    {
        $nip = $request->query('NIP');
        $pegawai = $nip ? Pegawai::where('NIP', $nip)->first() : null;

        return Inertia::render('RiwayatPAK/CreateOrEdit', [
            'title' => 'Penetapan Angka Kredit',
            'pegawai' => $pegawai,
            'pegawaiList' => Pegawai::select('NIP', 'Nama')->latest()->get(),
            'aturanPAK' => AturanPAKService::get(),
        ]);
    }

    public function create_by_pengusulan(PengusulanPAK $pengusulan)
    {
        $pegawai = $pengusulan->pegawai_nip ? Pegawai::where('NIP', $pengusulan->pegawai_nip)->first() : null;
        return Inertia::render('RiwayatPAK/CreateOrEdit', [
            'title' => 'Penetapan Angka Kredit',
            'pengusulan' => $pengusulan,
            'pegawai' => $pegawai,
            'aturanPAK' => AturanPAKService::get(),
            'isByPengusulan' => (bool)$pengusulan
        ]);
    }

    public function edit(Request $request)
    {
        return Inertia::render('RiwayatPAK/CreateOrEdit', [
            'title' => 'Edit Penetapan Angka Kredit',
            'isEdit' => true,
            'riwayat' => RiwayatPAK::findOrFail($request->id),
            'aturanPAK' => AturanPAKService::get(),
        ]);
    }

    public function process(Request $request)
    {
        // Ambil data dari model jika ada riwayat_pak_id, atau gunakan semua data dari request
        $data = null;
        if ($request->filled('riwayat_pak_id')) {
            // Ambil RiwayatPAK beserta relasi pegawai
            $data = RiwayatPAK::with('pegawai')->findOrFail($request->riwayat_pak_id);
        } else {
            // Gunakan data dari request (array)
            $data = $request->all();
        }

        // Simpan data ke session
        Session::put('data', $data);
    }

    public function preview()
    {
        // $data = null;

        $data = Session::get('data');
        $this->cleanAllData($data);

        // Buat PDF SIZE F4
        $nama_pak = $data['pegawai']['Nama'] . '-' . $data['pegawai']['NIP'] . '-' . 'PAK.pdf';
        $customF4Paper = array(0, 0, 595.28, 935.43);
        $pdf = Pdf::loadView('pdf.pak', [
            "title" => $nama_pak,
            "pegawai" => "pegawai",
            "data" => $data, // Kirim data ke view
        ])->setPaper($customF4Paper, 'portrait')->setWarnings(false);

        // Stream PDF
        // return $pdf->stream($nama_pak);
        return response($pdf->output())
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . $nama_pak . '"')
            ->header('X-Frame-Options', 'SAMEORIGIN');
    }

    public function save(Request $request)
    {
        Session::put('data', $request->all());
        $dataForStore = $request->except(['id', 'pegawai']);
        $pegawai_id = $request->input('pegawai.id');
        $dataForStore['pegawai_id'] = $pegawai_id;
        RiwayatPAK::create($dataForStore);
        // Update no surat
        AturanPAK::updateNoSuratTerakhir($dataForStore['no_surat1']);
        return Redirect::route('divisi-sdm.riwayat-pak.index')->with('message', 'Data Berhasil Disimpan sebagai Riwayat PAK');
    }


    public function submit(Request $request)
    {
        // dd($request);
        $request->validate([
            'no_surat1' => 'required|string',
            'pegawai.id' => 'required|exists:pegawais,id',
        ]);

        DB::beginTransaction();
        try {
            $dataForStore = $request->except(['pegawai', 'catatan']);
            $dataForStore['pegawai_id'] = $request->input('pegawai.id');

            AturanPAK::updateNoSuratTerakhir($dataForStore['no_surat1']);
            $newPAK = RiwayatPAK::create($dataForStore);

            $catatan = null;
            if ($request->filled('catatan')) {
                $catatan = Catatan::create([
                    'user_nip' => $this->user->nip,
                    'tipe' => 'Pengajuan PAK-Divisi SDM',
                    'isi' => $request->catatan,
                ]);
            }

            if (!$request->filled('id')) {
                Pengajuan::create([
                    'riwayat_pak_id' => $newPAK->id,
                    'pegawai_id' => $newPAK->pegawai_id,
                    'user_nip' => $this->user->nip,
                    'catatan_pengaju_id' => $catatan?->id ?? null,
                ]);
            }

            DB::commit();
            return Redirect::route('divisi-sdm.pengajuan.index')->with('message', 'Dokumen PAK berhasil Diajukan!');
        } catch (\Throwable $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal menyimpan data: ' . $e->getMessage()]);
        }
    }

    // public function save_and_submit(Request $request)
    // {
    //     // Kalo si store ke database)
    //     $dataForStore = $request->except(['pegawai', 'catatan']);
    //     $pegawai_id = $request->input('pegawai.id');
    //     $dataForStore['pegawai_id'] = $pegawai_id;
    //     AturanPAK::updateNoSuratTerakhir($dataForStore['no_surat1']);
    //     $newPAK = RiwayatPAK::create($dataForStore);
    //     $catatan = null;
    //     if($request->catatan) {
    //         $catatan = Catatan::create([
    //             'user_nip' => $this->user->nip,
    //             'tipe' => 'Pengajuan PAK-Divisi SDM',
    //             'isi' => $request->catatan,
    //         ]);
    //     }
    //     $validated = [
    //         "riwayat_pak_id" => $newPAK->id,
    //         "pegawai_id" => $newPAK->pegawai_id,
    //         "user_nip" => $this->user->nip,
    //         "catatan_pengaju_id" => $catatan?->id ?? null
    //     ];
    //     if (!isset($request->id)) {
    //         Pengajuan::create($validated);
    //     }

    //     return Redirect::route('divisi-sdm.pengajuan.index')->with('message', 'Dokumen PAK berhasil Diajukan! Silahkan menunggu untuk diproses.');
    // }


    private function cleanData(&$item)
    {
        // Ganti koma dengan titik untuk pengecekan numeric
        $numericValue = is_string($item) ? str_replace(',', '.', $item) : $item;

        // Cek apakah nilai sama dengan 0, "0,000", atau null
        if ($numericValue === 0 || $numericValue === '0' || $numericValue === '0.000' || $item === null) {
            $item = ''; // Ubah menjadi string kosong
        }
    }

    // Fungsi rekursif untuk memproses semua elemen dalam array atau object
    public function cleanAllData(&$array)
    {
        foreach ($array as &$value) {
            if (is_array($value) || is_object($value)) {
                $this->cleanAllData($value); // Jika value adalah array atau object, rekursif
            } else {
                $this->cleanData($value); // Jika value adalah nilai tunggal, cek dan bersihkan
            }
        }
    }



    public function download_template()
    {
        $filePath = public_path('storage/TEMPLATE_PAK.docx');

        if (!file_exists($filePath)) {
            abort(404, 'File tidak ditemukan');
        }

        return redirect('storage/TEMPLATE_PAK.docx');
    }
}
