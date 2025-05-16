<?php

namespace App\Http\Controllers\Shared;

use App\Http\Controllers\Controller;
use App\Http\Requests\CetakPAKRequest;
use App\Models\AturanPAK;
use App\Models\Koefisien;
use Inertia\Inertia;
use App\Models\Pegawai;
use App\Models\Pengajuan;
use App\Models\RiwayatPAK;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;



class DokumenPAKController extends Controller
{
    public function index()
    {
        $pegawai = Pegawai::latest();
        $subTitle = "";

        if (request('byDaerah')) {
            // $category = Pegawai::firstWhere('Daerah', request('byDaerah'));
            $subTitle = 'Berdasarkan Daerah : ' . request('byDaerah');
        }

        return Inertia::render('RiwayatPAK/Index', [
            // "title" => "Pegawai " . $title,
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

        $aturan_pak = [
            'penandaTangan' => AturanPAK::where('name', 'Penanda Tangan')->first(['value', 'default_config']),
            'koefisienPertahun' => AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value,
            'predikatPresentase' => AturanPAK::where('name', 'Predikat & Presentase')->first()->value,
            'pangkat' => AturanPAK::where('name', 'Angka Minimal Pangkat')->first()->value,
            'jabatan' => AturanPAK::where('name', 'Angka Minimal Jabatan')->first()->value,
            'tebusanKonversi' => AturanPAK::where('name', 'Tebusan Akumulasi')->first()->value,
            'tebusanAkumulasi' => AturanPAK::where('name', 'Tebusan Penetapan')->first()->value,
            'tebusanPenetapan' => AturanPAK::where('name', 'Tebusan Penetapan')->first()->value,
            'kesimpulan' => AturanPAK::where('name', 'Kesimpulan')->first(['value', 'default_config']),
            'rumus' => AturanPAK::where('name', 'Rumus')->first()->value,
        ];
        return Inertia::render('RiwayatPAK/CreateOrEdit', [
            'title' => 'Penetapan Angka Kredit',
            'pegawai' => $pegawai,
            'pegawaiList' => Pegawai::select('NIP', 'Nama')->latest()->get(),
            'koefisien' => Koefisien::select('jabatan', 'nilai')->get(),
            'aturanPAK' => $aturan_pak
        ]);
    }

    public function create_for_pegawai(Pegawai $pegawai)
    {
        Session::put('data', $pegawai);
        return redirect()->back();
    }

    public function edit(Request $request)
    {

        $aturan_pak = [
            'penandaTangan' => AturanPAK::where('name', 'Penanda Tangan')->first(['value', 'default_config']),
            'koefisienPertahun' => AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value,
            'predikatPresentase' => AturanPAK::where('name', 'Predikat & Presentase')->first()->value,
            'pangkat' => AturanPAK::where('name', 'Angka Minimal Pangkat')->first()->value,
            'jabatan' => AturanPAK::where('name', 'Angka Minimal Jabatan')->first()->value,
            'tebusanKonversi' => AturanPAK::where('name', 'Tebusan Akumulasi')->first()->value,
            'tebusanAkumulasi' => AturanPAK::where('name', 'Tebusan Penetapan')->first()->value,
            'tebusanPenetapan' => AturanPAK::where('name', 'Tebusan Penetapan')->first()->value,
            'kesimpulan' => AturanPAK::where('name', 'Kesimpulan')->first(['value', 'default_config']),
            'rumus' => AturanPAK::where('name', 'Rumus')->first()->value,
        ];
        $riwayat = RiwayatPAK::findOrFail($request->id);
        return Inertia::render('RiwayatPAK/CreateOrEdit', [
            'title' => 'Edit Penetapan Angka Kredit',
            'isEdit' => true,
            'riwayat' => $riwayat,
            'koefisien' => Koefisien::select('jabatan', 'nilai')->get(),
            'aturanPAK' => $aturan_pak
        ]);
    }

    public function process(Request $request)
    {
        // dd($request->all());
        // Simpan Ke local data;
        Session::put('data', $request->all());
        // Kalo dibuka dr history(tanpa restore ke database)
        if (!isset($request->id)) {
            $dataForStore = $request->except('pegawai');
            $pegawai_id = $request->input('pegawai.id');
            $dataForStore['pegawai_id'] = $pegawai_id;
        }
    }

    public function preview()
    {
        $data = Session::get('data');

        // Perbarui nilai total_dicetak dengan menambahkannya 1
        $userId = Auth::user()->id;
        // User::where('id', $userId)
        // ->update([
        //     'jumlah' => [
        //         "dicetak"
        //     ]
        //     DB::raw('jumlah_dicetak + 1')
        // ]);

        // Bersihkan data untuk menghindari nilai 0/ 0,000 /null   menjadi string kosong ''
        $this->cleanAllData($data);
        // dd($data);


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
        // Session::put('data', $request->all());
        $dataForStore = $request->except(['id', 'pegawai']);
        $pegawai_id = $request->input('pegawai.id');
        $dataForStore['pegawai_id'] = $pegawai_id;
        RiwayatPAK::create($dataForStore);
        return Redirect::route('divisi-sdm.riwayat-pak.index')->with('message', 'Data Berhasil Disimpan ke dalam Database');
    }


    public function save_and_submit(Request $request)
    {
        // Kalo si store ke database)
        if (!isset($request->id)) {
            $dataForStore = $request->except('pegawai');
            $pegawai_id = $request->input('pegawai.id');
            $dataForStore['pegawai_id'] = $pegawai_id;
            $newPAK = RiwayatPAK::create($dataForStore);
            $validated = [
                "pak_id" => $newPAK->id,
                "pegawai_id" => $newPAK->pegawai_id,
                "pengaju_id" => Auth::user()->id,
                // Logic Path nanti
                "path" => "TES"
            ];
            Pengajuan::create($validated);
        }
        return Redirect::route('divisi-sdm.pengajuan.index')->with('message', 'PAK berhasil Diajukan!');
    }


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


    // Maybe Unused
    public function cetak(Request $request)
    {
        // dd($request->all());
        Session::put('data', $request->all());

        // Kalo dibuka dr history(tanpa restore ke database)
        if (!isset($request->id)) {
            $dataForStore = $request->except('pegawai');
            $pegawai_id = $request->input('pegawai.id');
            $dataForStore['pegawai_id'] = $pegawai_id;
            // $dataForStore = array_merge($dataForStore['data'], ['pegawai_id' => $pegawai_id]);
            // dd($dataForStore);
            RiwayatPAK::create($dataForStore);
        }

        return Inertia::location(route('pak.preview'));
    }


    public function download_template()
    {

        // TODO : Download template logic(dalam docx kalo bisa)
        // return $download;
    }

    public function test_pdf()
    {
        $pdf = Pdf::loadHTML('<h1>Test PDF</h1><p>This is a simple PDF document.</p>')
            ->setPaper('A4', 'portrait')
            ->setWarnings(false);

        return $pdf->stream('test.pdf');
    }
}
