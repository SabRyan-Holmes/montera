<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pegawai;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\PegawaiStoreRequest;
use App\Http\Requests\UpdatePegawaiRequest;

class PegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pegawai = Pegawai::latest();
        $subTitle = "";

        if (request('byDaerah')) {
            // $category = Pegawai::firstWhere('Daerah', request('byDaerah'));
            $subTitle = 'Berdasarkan Daerah : ' . request('byDaerah');
        }

        return Inertia::render('KelolaData/Index', [
            // "title" => "Pegawai " . $title,
            "title" => "Pencetakan Dokumen PAK ",
            "subTitle" => $subTitle,
            "pegawais" => $pegawai->filter(request(['search', 'byDaerah']))->paginate(10),
            "search" => request('search'),
            "byDaerah" => request('byDaerah')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('KelolaData/Create', [
            'title' => "Tambah Data Pegawai",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PegawaiStoreRequest $request)
    {
        // dd($request);
        $validated = $request->validated();
        Pegawai::create($validated);

        return Redirect::route('pegawai.index')->with('message', 'Data Pegawai Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pegawai $pegawai)
    {
        return Inertia::render('KelolaData/Show', [
            'pegawai' => $pegawai
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pegawai $pegawai)
    {
        return Inertia::render('KelolaData/Edit', [
            'title' => "Edit Data Pegawai",
            'pegawai' => $pegawai
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePegawaiRequest $request, Pegawai $pegawai)
    {
        // dd($request);
        $validated = $request->validated();
        Pegawai::where('id', $pegawai->id)->update($validated);

        return redirect()->back()->with('message', 'Data Pegawai Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pegawai $pegawai)
    {
        //
    }

    public function cetak(Pegawai $pegawai)
    {
        return Inertia::render('CetakDokumen/Index', [
            'title' => 'Cetak Dokumen PAK',
            'pegawais' => Pegawai::paginate(10)
        ]);
    }
}
