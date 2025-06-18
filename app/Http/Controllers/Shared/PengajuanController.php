<?php

namespace App\Http\Controllers\Shared;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\ArsipDokumen;
use App\Models\AturanPAK;
use App\Models\Catatan;
use App\Models\Pegawai;
use App\Models\Pengajuan;
use App\Models\RiwayatPAK;
use App\Services\ActivityLogger;
use App\Services\AturanPAKService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;


use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PengajuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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
        $pengajuan = Pengajuan::latest();
        // Kalo pegawai tampilkan proses PAK unutk pegawai itu saja
        $pegawai = Pegawai::byNIP($this->user->nip)->first();
        // dd($pegawai);
        if ($this->user->role === 'Pegawai') {
            $pengajuan = Pengajuan::byPegawaiId($pegawai->id ?? $this->user->id)->latest();
        }

        $subTitle = GetSubtitle::getSubtitle(
            request('byJabatan'),
            request('byDaerah'),
            request('search')
        );



        // TODO: LOGIKA Filter by PAK field nanti
        $koefisien_per_tahun = AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value;
        $jabatan_list = collect($koefisien_per_tahun)->pluck('jabatan')->toArray();
        $kesimpulan = AturanPAK::where('name', 'Kesimpulan')->first()->value;
        $kesimpulan_list = collect($kesimpulan)->pluck('jabatan')->toArray();

        // Dapatkan foldername arsip dari user yg login

        $arsipDokumenByUser = ArsipDokumen::byUser($this->user);

        return Inertia::render('Pengajuan/Index', [
            "title" => "Proses Pengajuan PAK",
            "subTitle" => $subTitle,
            "pengajuans" => $pengajuan->filter(request(['search', 'byStatus', 'byJabatan', 'byKesimpulan']))->paginate(10),
            'isPimpinan' => $this->user->role === 'Pimpinan',
            'isDivisiSDM' => $this->user->role === 'Divisi SDM',
            'isPegawai' => $this->user->role === 'Pegawai',
            "searchReq" => request('search'),
            "byStatusReq" => request('byStatus'),
            "byJabatanReq" => request('byJabatan'),
            "byKesimpulan" => request('byKesimpulan'),
            'jabatanList' => $jabatan_list,
            'kesimpulanList' => $kesimpulan_list,
            'folderArsipList' => $arsipDokumenByUser->pluck('folder_name')->toArray(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

    // Simpan Pengajuan setelah diajukan
    public function store(Request $request)
    {
        $rules = [
            'user_nip' => 'required|string',
            'riwayat_pak_id' => 'required|integer',
            'catatan' => 'nullable|string',
        ];
        $validated = $request->validate($rules);

        if ($request->catatan) {
            $new_catatan = Catatan::create([
                'user_nip' => $request->user_nip,
                'tipe' => 'ProsesPAK',
                'isi' => $request->catatan,
            ]);
            $validated['catatan_id'] = $new_catatan->id;
        }

        Pengajuan::create($validated);
        return redirect()->back()->with('message', 'PAK Berhasil diajukan! Silahkan menunggu untuk diproses!');
        // return Redirect::route('divisi-sdm.pengajuan.index')->with('message', 'PAK Berhasil diajukan! Silahkan menunggu untuk diproses!');
    }



    /**
     * Display the specified resource.
     */
    public function show(Pengajuan $pengajuan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pengajuan $pengajuan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengajuan $pengajuan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengajuan $pengajuan)
    {
        $pengajuan->delete();
        return redirect()->back()->with('message', 'Pengajuan PAK Berhasil Dihapus!');
    }







    // ===========================================================================================================================================
    public function approve(Pengajuan $pengajuan)
    {

        // 1.Ambil Pengajuan dan Pegawai
        $pegawai = $pengajuan->riwayat_pak->pegawai;
        // 2. Ambil ttd
        $signaturePath = public_path('storage/validasi_pimpinan/default.png');

        if (!file_exists($signaturePath)) {
            return back()->withErrors(['signature' => 'File tanda tangan default tidak ditemukan.']);
        }

        $mime = mime_content_type($signaturePath);
        $base64Sig = 'data:' . $mime . ';base64,' . base64_encode(file_get_contents($signaturePath));

        // 3. Ambil dan bersihkan data
        $data = optional($pengajuan->riwayat_pak)->toArray() ?? [];
        (new DokumenPAKController())->cleanAllData($data);

        // 4. Buat PDF
        $nama_pak = 'APPROVED_PAK_' . $pegawai->Nama . '-' . $pegawai->NIP . '.pdf';
        $pdfPath = storage_path("app/public/approved_pak/{$nama_pak}");
        $customF4Paper = [0, 0, 595.28, 935.43];

        Pdf::loadView('pdf.approved-pak', [
            'title' => $nama_pak,
            'data' => $data,
            'signature' => $base64Sig
        ])
            ->setPaper($customF4Paper, 'portrait')
            ->setWarnings(false)
            ->save($pdfPath);

        // 5. Update status
        $pengajuan->update([
            'validated_by' => $this->user->nip,
            'status' => 'divalidasi',
            'tanggal_divalidasi' => now(),
            'approved_pak_path' => "approved_pak/{$nama_pak}",
        ]);

        $no_surat =  AturanPAK::extractNoSurat($pengajuan->riwayat_pak['no_surat3']);
        ActivityLogger::log(
            'Validasi Pengajuan PAK',
            $this->user->name . '(' . $this->user->role . ') menyetujui pengajuan PAK dengan NO PAK: ' . $no_surat,
            Pengajuan::class,
            $pengajuan->id,
            null
        );

        // 6. Redirect dengan feedback
        return redirect()->back()->with('toast', 'Pengajuan PAK berhasil divalidasi.');
    }




    public function reject(Pengajuan $pengajuan)
    {
        $pengajuan->update(['status' => 'ditolak',   "tanggal_ditolak" => now()]);
        $no_surat =  AturanPAK::extractNoSurat($pengajuan->riwayat_pak['no_surat3']);
        ActivityLogger::log(
            'Tolak Pengajuan PAK',
            $this->user->name . '(' . $this->user->role . ') menolak pengajuan PAK dengan NO PAK: ' . $no_surat,
            Pengajuan::class,
            $pengajuan->id,
            null
        );

        return redirect()->back()->with('message', 'Pengajuan Berhasil Ditolak!'); // atau redirect ke halaman tertentu

    }

    // CANCEL PIMPINAN
    public function cancel_pengajuan(Pengajuan $pengajuan)
    {
        $pengajuan->delete();
        // Redirect kembali dengan pesan sukses
        return redirect()->back()->with('message', 'Pengajuan PAK berhasil dibatalkan');
    }

    public function undo_validate(Pengajuan $pengajuan)
    {
        // Ambil path file yang akan dihapus
        $filePath = $pengajuan->approved_pak_path;

        // Hapus file dari storage jika ada
        if ($filePath && Storage::disk('public')->exists($filePath)) {
            Storage::disk('public')->delete($filePath);
        }

        // Update kolom status dan kosongkan path file
        $pengajuan->update([
            "status" => 'diajukan',
            "tanggal_ditolak" => null,
            "tanggal_divalidasi" => null,
            "approved_pak_path" => null,
        ]);

        $no_surat =  AturanPAK::extractNoSurat($pengajuan->riwayat_pak['no_surat3']);
        ActivityLogger::log(
            'Undo Validasi Pengajuan PAK',
            $this->user->name . '(' . $this->user->role . ') membatalkan validasi pengajuan PAK dengan NO PAK: ' . $no_surat,
            Pengajuan::class,
            $pengajuan->id,
            null
        );
        // Redirect kembali dengan pesan sukses
        return redirect()->back()->with('message', 'Validasi pengajuan berhasil direset');
    }

    public function approved_show()
    {
        $preview = session('pak_preview');
        // dd($preview);
        if (!$preview) {
            return redirect()->back()->withErrors(['msg' => 'Data preview tidak tersedia.']);
        }


        $pengajuan = Pengajuan::findOrFail($preview['id']);
        $data = [];
        $data["pegawai"] = $pengajuan->pegawai;
        if ($pengajuan->riwayat_pak) {
            $documentArray = json_decode(json_encode($pengajuan->riwayat_pak), true);
            foreach ($documentArray as $key => $value) {
                $data[$key] = $value;
            }
        }

        // dd($data);

        // Bersihkan data untuk menghindari nilai 0/ 0,000 /null   menjadi string kosong ''
        $dokumenPAK = new DokumenPAKController();
        $dokumenPAK->cleanAllData($data);

        // Buat PDF SIZE F4
        $nama_pak = 'APPROVED' . $data['pegawai']['Nama'] . '-' . $data['pegawai']['NIP'] . '-' . 'PAK.pdf';
        $customF4Paper = array(0, 0, 595.28, 935.43);
        $pdf = Pdf::loadView('pdf.approved-pak', [
            "title" => $nama_pak,
            "data" => $data, // Kirim data ke view
            'signature' => $preview['signature']
        ])->setPaper($customF4Paper, 'portrait')->setWarnings(false);

        return response($pdf->output())
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . $nama_pak . '"')
            ->header('X-Frame-Options', 'SAMEORIGIN');
    }


    public function revisi(Request $request)
    {
        // dd($request);
        return Inertia::render('RiwayatPAK/CreateOrEdit', [
            'title' => 'Revisi Penetapan Angka Kredit',
            'isEdit' => true,
            'riwayat' => RiwayatPAK::findOrFail($request->pakId),
            'isRevisi' => $request->isRevisi,
            'pengajuanId' => $request->pengajuanId,
            'aturanPAK' => AturanPAKService::get(),
        ]);
    }

    public function ajukan_ulang(Request $request, RiwayatPAK $riwayat)
    {
        // dd($riwayat);
        $pengajuanPAK = Pengajuan::findOrfail($request->pengajuanId);
        if (!$riwayat) {
            return back()->withErrors('Data yang ingin diupdate tidak ditemukan.');
        }

        $riwayat->update($request->except('pengajuanId'));

        $pengajuanPAK->update([
            'status' => 'diajukan',
            'tanggal_direvisi' => now()
        ]);

        $no_surat =  AturanPAK::extractNoSurat($pengajuanPAK->riwayat_pak['no_surat3']);
        ActivityLogger::log(
            'Revisi Pengajuan PAK',
            $this->user->name . '(' . $this->user->role . ') merevisi pengajuan PAK dengan NO PAK: ' . $no_surat,
            Pengajuan::class,
            $pengajuanPAK->id,
        );

        return Redirect::route('divisi-sdm.pengajuan.index')->with('message', 'Pengajuan PAK berhasil direvisi & diajukan ulang');
    }
}
