<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;


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
        // dd($request);
        $pdf = Pdf::loadView('pdf/pak', [
            "title" => "Dokumen PAK",
            "pegawai" => "pegawai"
        ])->setPaper('F4', 'portrait')->setWarnings(false);
        return $pdf->stream();


        // return view('pak', [
        //     "title" => "Single Post",
        //     "active" => "posts",
        //     // "post" => $post
        // ]);
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
