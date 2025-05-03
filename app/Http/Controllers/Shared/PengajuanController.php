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

        $PAK = RiwayatPAK::find($request->id);
        $validated = [
            "document_id" => $PAK->id,
            "pegawai_id" => $PAK->pegawai_id,
            // Logic Path nanti
            "path" => "TES"
        ];
        Pengajuan::create($validated);
        return redirect()->back()->with('message', 'Berhasil Diajukan!');
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
        $request->validate([
            'id' => 'required|integer',
            'signature' => 'required|string',
        ]);

        $base64Image = $request->input('signature');

        // Jika mau disimpan sebagai file:
        $image = str_replace('data:image/png;base64,', '', $base64Image);
        $image = str_replace(' ', '+', $image);
        $imageName = 'signature_' . $request->id . '.png';
        Storage::disk('public')->put("signatures/{$imageName}", base64_decode($image));

        session()->flash('signature_path', "storage/signatures/{$imageName}");

        return redirect()->back()->with('message', 'TTD berhasil diupload!'); // atau redirect ke halaman tertentu


        // $data = Pengajuan::find($request->id);
        // $nama_pak = $data['pegawai']['Nama'] . '-' . $data['pegawai']['NIP'] . '-' . 'PAK.pdf';
        // $customF4Paper = array(0, 0, 595.28, 935.43);

        // $pdf = Pdf::loadView('pdf.template_validasi', [
        //     'pengajuan' => $pengajuan,
        //     'signaturePath' => storage_path('app/public/' . $imagePath)
        // ]);

        // $pdf = Pdf::loadView('pdf.pak', [
        //     "title" => $nama_pak,
        //     "pegawai" => "pegawai",
        //     "data" => $data, // Kirim data ke view
        // ])->setPaper($customF4Paper, 'portrait')->setWarnings(false);
        // Atau simpan langsung base64-nya ke database jika perlu
    }

    public function reject(Request $request)
    {


        return redirect()->back()->with('message', 'TTD berhasil diupload!'); // atau redirect ke halaman tertentu



    }
}
