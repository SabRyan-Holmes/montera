<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\Pengajuan;
use App\Models\RiwayatCetak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PengajuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pengajuan = Pengajuan::latest();
        $subTitle = "";

        if (request('byDaerah')) {
            $subTitle = 'Berdasarkan Daerah: ' . request('byDaerah');
        }

        return Inertia::render('Pengajuan/Index', [
            "title" => "Status Pengajuan Terbaru",
            "subTitle" => $subTitle,
            "pengajuans" => $pengajuan->filter(request(['search', 'byDaerah', 'byJabatan']))->paginate(10),
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

        $PAK = RiwayatCetak::find($request->id);
        $validated = [
            "document_id" => $PAK->id,
            "pegawai_id" => $PAK->pegawai_id,
            // Logic Path nanti
            "path" => "TES"
        ];
        Pengajuan::create($validated);

        return Redirect::route('cetak_dokumen.show_history')->with('message', 'Berhasil Diajukan!');
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
        //
    }
}
