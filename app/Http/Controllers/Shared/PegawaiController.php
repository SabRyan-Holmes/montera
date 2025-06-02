<?php

namespace App\Http\Controllers\Shared;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Pegawai;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\PegawaiStoreRequest;
use App\Http\Requests\UpdatePegawaiRequest;
use App\Models\RiwayatKarir;
use App\Services\LogPegawaiChangesService;

class PegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pegawai = Pegawai::latest();
        $subTitle = "";

        $subTitle = GetSubtitle::getSubtitle(
            request('byStatus'),
            request('byJabatan'),
            request('search')
        );

        return Inertia::render('KelolaPegawai/Index', [
            "title" => "Kelola Data Pegawai ",
            "subTitle" => $subTitle,
            "pegawais" => $pegawai->filter(request(['search', 'byDaerah', 'byJabatan']))->paginate(10),
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

        return Inertia::render('KelolaPegawai/Create', [
            'title' => "Tambah Data Pegawai",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PegawaiStoreRequest $request)
    {
        $validated = $request->validated();
        Pegawai::create($validated);
        return Redirect::route('divisi-sdm.pegawai.index')->with('message', 'Data Pegawai Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pegawai $pegawai)
    {
        return Inertia::render('KelolaPegawai/Show', [
            'title' => 'Detail Data Pegawai',
            'pegawai' => $pegawai
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pegawai $pegawai)
    {
        return Inertia::render('KelolaPegawai/Edit', [
            'title' => "Edit Data Pegawai",
            'pegawai' => $pegawai
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePegawaiRequest $request, Pegawai $pegawai)
    {
        $validated = $request->validated();

        $pegawaiOld = $pegawai->toArray(); // ambil data lama sebelum update

        $pegawai->update($validated); // update data

        app(LogPegawaiChangesService::class)->logChanges($pegawaiOld, $validated);

        return redirect()->back()->with('message', 'Data Pegawai Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pegawai $pegawai)
    {
        $pegawai->delete();
        return redirect()->back()->with('message', 'Data Pegawai Berhasil DiHapus!');
    }


}
