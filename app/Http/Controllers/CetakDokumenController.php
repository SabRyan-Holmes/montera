<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;

class CetakDokumenController extends Controller
{
    public function index()
    {
        $pegawai = Pegawai::latest();
        $subTitle = "";

        if (request('byDaerah')) {
            // $category = Pegawai::firstWhere('Daerah', request('byDaerah'));
            $subTitle = 'Berdasarkan Daerah : ' . request('byDaerah');
        }

        return Inertia::render('CetakDokumen/Index', [
            // "title" => "Pegawai " . $title,
            "title" => "Pencetakan Dokumen PAK ",
            "subTitle" => $subTitle,
            "pegawais" => $pegawai->filter(request(['search', 'byDaerah']))->paginate(10),
            "search" => request('search'),
            "byDaerah" => request('byDaerah')
        ]);
    }

    public function show(Pegawai $pegawai)
    {
        return Inertia::render('CetakDokumen/Show', [
            'pegawai' => $pegawai
        ]);
    }

    public function create(Pegawai $pegawai)
    {
        return Inertia::render('CetakDokumen/Create', [
            'pegawai' => $pegawai
        ]);
    }

    public function process(Pegawai $pegawai)
    {
        // Logika Cetak Dokumen
        // return Inertia::render('CetakDokumen/Show',[
        //     'pegawai' => $pegawai
        // ]);
    }

    public function cetak(Request $request)
    {
        Session::put('data', $request->all());
        return redirect()->route('cetak_dokumen.view-pak');
        // $data = $request->all();
        // // dd($request->all());
        // // return Redirect::route('cetak_dokumen.view-pak')->with(['data' => $data]);
        // $pdf = Pdf::loadView('pdf/pak', [
        //     "title" => "Dokumen PAK",
        //     "data" => $data
        // ])->setPaper('F4', 'portrait')->setWarnings(false);
        // return $pdf->stream('dokumen_pak.pdf');
        // exit();
    }

    public function view_pak(Request $request)
    {
          // Ambil data dari session
          $data = Session::get('data');

          // Buat PDF
          $pdf = Pdf::loadView('pdf.pak', [
              "title" => "Dokumen PAK",
              "pegawai" => "pegawai",
              "data" => $data, // Kirim data ke view
          ])->setPaper('F4', 'portrait')->setWarnings(false);

          // Stream PDF
          return $pdf->stream('dokumen_pak.pdf');
    }

    // public function by_jabatan (Pegawai $pegawai) {

    //     $lomba = $pegawai->lomba()->latest()->paginate(5);
    //     // ddd($lomba);
    //     return Inertia::render('Informasi/LombaPegawai', [
    //         "title" => "Lomba Berdasarkan Kategori",
    //         "lomba" => $lomba,
    //         "pegawai" => $pegawai->name,
    //         "reqPegawai" => request('pegawai')
    //     ]);
    // })->middleware(['auth'])->name('lomba.show_pegawai');


}
