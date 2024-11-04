<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\RiwayatCetak;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RiwayatCetakController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show_history(Pegawai $pegawai)
    {
        $riwayatCetak = $pegawai->riwayatCetaks;
        return Inertia::render('CetakDokumen/History', [
            "title" => "Riwayat Pencetakan Dokumen PAK",
            'pegawai' => $pegawai,
            'riwayatCetak' => $riwayatCetak
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RiwayatCetak $riwayat)
    {
        return Inertia::render('CetakDokumen/Edit', [
            'title' => 'Edit Riwayat Pencetakan Dokumen PAK',
            // riwayat->with('pegawai)
            'riwayat' => $riwayat
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RiwayatCetak $riwayat)
    {
          // dd($request);
          $validated = $request->validated();
          RiwayatCetak::where('id', $riwayat->id)->update($validated);

          return redirect()->back()->with('message', 'Data Riwayat Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RiwayatCetak $riwayat)
    {
        // dd($pegawai);
        $riwayat->delete();
        return redirect()->back()->with('message', 'Data Riwayat Berhasil DiHapus!');
    }
}
