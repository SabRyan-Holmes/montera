<?php

namespace App\Http\Controllers;

use App\Models\Pengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PengajuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $Pengajuan = Pengajuan::latest();
        // $subTitle = "";

        // if (request('byDaerah')) {
        //     // $category = Pengajuan::firstWhere('Daerah', request('byDaerah'));
        //     $subTitle = 'Berdasarkan Daerah : ' . request('byDaerah');
        // }

        return Inertia::render('Pengajuan/Index', [
            "title" => "Pengajuan Dokumen PAK",
            // "subTitle" => $subTitle,
            // "Pengajuans" => $Pengajuan->filter(request(['search', 'byDaerah', 'byJabatan']))->paginate(10),
            // "searchReq" => request('search'),
            // "byDaerahReq" => request('byDaerah'),
            // "byJabatanReq" => request('byJabatan')
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
    public function store(Request $request)
    {
        //
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
