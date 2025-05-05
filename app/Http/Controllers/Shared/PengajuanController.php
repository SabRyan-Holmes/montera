<?php

namespace App\Http\Controllers\Shared;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\Pengajuan;
use App\Models\RiwayatPAK;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Intervention\Image\Facades\Image;

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
        //

        return Inertia::render('Pengajuan/Index', [
            "title" => "Status Pengajuan Terbaru",
            "subTitle" => $subTitle,
            "pengajuans" => $pengajuan->filter(request(['search', 'byDaerah', 'byJabatan']))->paginate(10),
            'canValidate' => $user->role == 'pimpinan',
            "searchReq" => request('search'),
            "byDaerahReq" => request('byDaerah'),
            "byJabatanReq" => request('byJabatan')
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
            'riwayat_pak_id' => 'required|integer',
            'pegawai_id' => 'required|integer',
        ];
        $validated = $request->validate($rules);
        Pengajuan::create($validated);
        return redirect()->back()->with('message', 'PAK Berhasil diajukan! Silahkan menunggu untuk diproses!');
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
        // 1. Validasi request dan ambil data signature
        $request->validate([
            'id' => 'required|integer',
            'signature' => $request->signatureType == 'upload'
                ? 'required|file|image|max:2000'
                : 'required|string',
        ]);

        // 2. Ambil Pengajuan dan Pegawai
        $pengajuan = Pengajuan::findOrFail($request->id);
        $pegawai = $pengajuan->pegawai;

        // 3. Proses signature (Draw/Upload)
        $base64Sig = $request->signatureType == 'upload'
            ? 'data:' . $request->file('signature')->getMimeType() . ';base64,' . base64_encode(file_get_contents($request->file('signature')->getRealPath()))
            : $request->signature;

        // 4. Ambil dan bersihkan data dokumen
        $data = $pengajuan->riwayat_pak ? json_decode(json_encode($pengajuan->riwayat_pak), true) : [];
        (new DokumenPAKController())->cleanAllData($data);  // Membersihkan data jika perlu

        // 5. Siapkan PDF untuk tanda tangan
        $nama_pak = 'APPROVED_PAK_' . $pegawai['Nama'] . '-' . $pegawai['NIP'] . '.pdf';
        $customF4Paper = array(0, 0, 595.28, 935.43);

        $pdf = Pdf::loadView('pdf.approved-pak', [
            'title' => $nama_pak,
            'data' => $data,
            'signature' => $base64Sig
        ])
            ->setPaper($customF4Paper, 'portrait')
            ->setWarnings(false);

        // 6. Simpan PDF ke folder
        $pdfPath = storage_path('app/public/approved_pak/' . $nama_pak);
        $pdf->save($pdfPath);

        // 7. Update status pengajuan dan path PDF di database
        $pengajuan->update([
            'status' => 'divalidasi',
            'approved_pak_path' => 'approved_pak/' . $nama_pak,
        ]);

        return redirect()->back(); // atau redirect ke halaman tertentu
    }



    public function reject(Pengajuan $pengajuan)
    {
        $pengajuan->update(['status' => 'ditolak']);
        // dd($pengajuan); //ISI ny malah data model doang tanpa field dan id
        // TODO: Tambahin logic catatan dr pimpinan disni
        return redirect()->back()->with('message', 'Pengajuan Berhasil Ditolak!'); // atau redirect ke halaman tertentu

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
