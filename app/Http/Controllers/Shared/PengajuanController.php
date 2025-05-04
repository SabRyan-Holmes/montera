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

        $data = Pengajuan::findOrFail($request->id);

        // Simpan ke session
        session([
            'pak_preview' => [
                'id' => $request->id,
                'signature' => $request->signature
            ]
        ]);


        // $request->validate([
        //     'id' => 'required|integer',
        //     'signature' => 'required|string', //ini sudah dalam bentuk data:image/png;base64,
        // ]);


        // $data = Pengajuan::findOrFail($request->id);
        // $nama_pak = $data['pegawai']['Nama'] . '-' . $data['pegawai']['NIP'] . '-' . 'PAK.pdf';
        // $customF4Paper = array(0, 0, 595.28, 935.43);
        // $pdf = Pdf::loadView('pdf.approved-pak', [
        //     "title" => $nama_pak,
        //     "pegawai" => "pegawai",
        //     "data" => $data, // Kirim data ke view
        //     'signature' => $request->signature // apa request sig ny udah bisa diakses dan ditaruh disini >
        // ])->setPaper($customF4Paper, 'portrait')->setWarnings(false);

        // TODO: Logika save pdf pak yang sudah di validasi/ttd dalam pdf, pathnya nanti ditaruh di pengajuan
        //  Tolong Logika Imagepath disini
        // $imagePath = "";
        // $pdfFileName = $data['pegawai']['Nama'] . '-' . $data['pegawai']['NIP'] . '-' . 'PAK-Approved.pdf';
        // $pdfStoragePath = "Approved_PAK/{$pdfFileName}";
        // Storage::disk('public')->put($pdfStoragePath, $pdf->output());

        // // Update Status Pengajuan setelah dikasi TTD
        // $data->update([
        //     "status" => "divalidasi",
        //     "path" => "storage/{$pdfStoragePath}"
        // ]);

        // Testing Preview
         // Simpan Ke local data;
        // $pengajuan = $data;

         // Kalo dibuka dr history(tanpa restore ke database)

        // return redirect()->back()->with('message', 'Pengajuan PAK berhasil divalidasi!'); // atau redirect ke halaman tertentu
        // return redirect()->route('pimpinan.pengajuan.preview');

    }

    public function reject(Request $request)
    {


        return redirect()->back()->with('message', 'TTD berhasil diupload!'); // atau redirect ke halaman tertentu

    }

    public function approved_show()
    {
        $preview = session('pak_preview');
        // dd($preview);
        if (!$preview) {
            return redirect()->back()->withErrors(['msg' => 'Data preview tidak tersedia.']);
        }


        $pengajuan = Pengajuan::findOrFail($preview['id']);
        $data = [] ;
        $data["pegawai"] = $pengajuan->pegawai;
        if ($pengajuan->document) {
            $documentArray = json_decode(json_encode($pengajuan->document), true);
            foreach ($documentArray as $key => $value) {
                $data[$key] = $value;
            }
        }

        // dd($data);
        // Perbarui nilai total_dicetak dengan menambahkannya 1

        // Bersihkan data untuk menghindari nilai 0/ 0,000 /null   menjadi string kosong ''
        $dokumenPAK = new DokumenPAKController();
        $dokumenPAK->cleanAllData($data);
        // dd($cleanedData);


        // Buat PDF SIZE F4
        $nama_pak ='APPROVED' . $data['pegawai']['Nama'] . '-' . $data['pegawai']['NIP'] . '-' . 'PAK.pdf';
        $customF4Paper = array(0, 0, 595.28, 935.43);
        $pdf = Pdf::loadView('pdf.approved-pak', [
            "title" => $nama_pak,
            "data" => $data, // Kirim data ke view
            'signature' => $preview['signature']
        ])->setPaper($customF4Paper, 'portrait')->setWarnings(false);

        // Stream PDF
        // return $pdf->stream($nama_pak);
        return response($pdf->output())
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . $nama_pak . '"')
            ->header('X-Frame-Options', 'SAMEORIGIN');
    }
    // public function preview(Request $request)
    // {
    //     $request->validate([
    //         'id' => 'required|integer',
    //         'signature' => 'required|string', //ini sudah dalam bentuk data:image/png;base64,
    //     ]);


    //     $pengajuan = Pengajuan::findOrFail($request->id);
    //     $data = [] ;
    //     $data["pegawai"] = $pengajuan->pegawai;
    //     if ($pengajuan->document) {
    //         $documentArray = json_decode(json_encode($pengajuan->document), true);
    //         foreach ($documentArray as $key => $value) {
    //             $data[$key] = $value;
    //         }
    //     }

    //     // Perbarui nilai total_dicetak dengan menambahkannya 1

    //     // Bersihkan data untuk menghindari nilai 0/ 0,000 /null   menjadi string kosong ''
    //     $dokumenPAK = new DokumenPAKController();
    //     $cleanedData = $dokumenPAK->cleanAllData($data);


    //     // Buat PDF SIZE F4
    //     $nama_pak ='APPROVED' . $data['pegawai']['Nama'] . '-' . $data['pegawai']['NIP'] . '-' . 'PAK.pdf';
    //     $customF4Paper = array(0, 0, 595.28, 935.43);
    //     $pdf = Pdf::loadView('pdf.approved-pak', [
    //         "title" => $nama_pak,
    //         "pegawai" => "pegawai",
    //         "data" => $cleanedData, // Kirim data ke view
    //     ])->setPaper($customF4Paper, 'portrait')->setWarnings(false);

    //     // Stream PDF
    //     // return $pdf->stream($nama_pak);
    //     return response($pdf->output())
    //         ->header('Content-Type', 'application/pdf')
    //         ->header('Content-Disposition', 'inline; filename="' . $nama_pak . '"')
    //         ->header('X-Frame-Options', 'SAMEORIGIN');
    // }
}
