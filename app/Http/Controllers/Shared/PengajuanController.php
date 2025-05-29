<?php

namespace App\Http\Controllers\Shared;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\AturanPAK;
use App\Models\Catatan;
use App\Models\Pengajuan;
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
    public function index()
    {
        $user = Auth::user();
        $pengajuan = Pengajuan::latest();

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

        return Inertia::render('Pengajuan/Index', [
            "title" => "Status Pengajuan Terbaru",
            "subTitle" => $subTitle,
            "pengajuans" => $pengajuan->filter(request(['search', 'byStatus', 'byJabatan', 'byKesimpulan']))->paginate(10),
            'canValidate' => $user->role === 'Pimpinan',
            'isDivisiSDM' => $user->role === 'Divisi SDM',
            'isPegawai' => $user->role === 'Pegawai',
            "searchReq" => request('search'),
            "byStatusReq" => request('byStatus'),
            "byJabatanReq" => request('byJabatan'),
            "byKesimpulan" => request('byKesimpulan'),
            'jabatanList' => $jabatan_list,
            'kesimpulanList' => $kesimpulan_list,
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
            'user_id' => 'required|integer',
            'riwayat_pak_id' => 'required|integer',
            'catatan' => 'nullable|string',
        ];
        $validated = $request->validate($rules);

        if ($request->catatan) {
            $new_catatan = Catatan::create([
                'user_id' => $request->user_id,
                // 'tipe' => 'PengusulanPAK',
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
        return redirect()->back()->with('message', 'Pengajuan Berhasil Dibatalkan!');
    }







    // ===========================================================================================================================================
    public function approve(Request $request)
    {
        // 1. Ambil Pengajuan, Pegawai, dan siapkan signature default
        $pengajuan = Pengajuan::findOrFail($request->id);
        $pegawai = $pengajuan->riwayat_pak->pegawai;

        // 2. Siapkan variabel signature
        $base64Sig = null;

        if ($request->fast_approve) {
            // dd($request);
            // Fast Approve: ambil gambar default dari public folder
            $signaturePath = public_path('storage/validasi_pimpinan/default.png');

            if (!file_exists($signaturePath)) {
                return back()->withErrors(['signature' => 'File tanda tangan default tidak ditemukan.']);
            }

            $mime = mime_content_type($signaturePath);
            $base64Sig = 'data:' . $mime . ';base64,' . base64_encode(file_get_contents($signaturePath));

        } else {
            // Manual approve: Validasi dan proses signature upload/draw
            $request->validate([
                'id' => 'required|integer',
                'signature' => $request->signatureType === 'upload'
                    ? 'required|image|max:2000'
                    : 'required|string',
            ]);

            $base64Sig = $request->signatureType === 'upload'
                ? 'data:' . $request->file('signature')->getMimeType() . ';base64,' . base64_encode(file_get_contents($request->file('signature')->getRealPath()))
                : $request->signature;
        }

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
            'status' => 'divalidasi',
            'approved_pak_path' => "approved_pak/{$nama_pak}",
        ]);

        // 6. Redirect dengan feedback
        return redirect()->back()->with('message', 'Pengajuan berhasil divalidasi.');
    }




    public function reject(Pengajuan $pengajuan)
    {
        $pengajuan->update(['status' => 'ditolak']);
        // dd($pengajuan); //ISI ny malah data model doang tanpa field dan id
        // TODO: Tambahin logic catatan dr pimpinan disni
        return redirect()->back()->with('message', 'Pengajuan Berhasil Ditolak!'); // atau redirect ke halaman tertentu

    }

    // CANCEL PIMPINAN
    public function cancel_pengajuan(Pengajuan $pengajuan)
    {
        // dd($)
        $PAK = $pengajuan->riwayat_pak();
        $pengajuan->delete();
        // Redirect kembali dengan pesan sukses
        return redirect()->back()->with('message', 'Pengajuan PAK berhasil dibatalkan');
    }

    public function cancel(Pengajuan $pengajuan)
    {
        // dd($pengajuan);
        // Ambil path file yang akan dihapus
        $filePath = $pengajuan->approved_pak_path;

        // Hapus file dari storage jika ada
        if ($filePath && Storage::disk('public')->exists($filePath)) {
            Storage::disk('public')->delete($filePath);
        }

        // Update kolom status dan kosongkan path file
        $pengajuan->update([
            "status" => 'diajukan',
            "approved_pak_path" => null,
        ]);

        // Redirect kembali dengan pesan sukses
        return redirect()->back()->with('message', 'Validasi pengajuan berhasil dibatalkan');
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
}
