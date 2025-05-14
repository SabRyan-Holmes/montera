<?php

namespace App\Http\Controllers\Shared;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\Pengajuan;
use App\Models\PengusulanPAK;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class PengusulanPAKController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $pengajuan = Pengajuan::latest();

        $subTitle = GetSubtitle::getSubtitle(
            request('byStatus'),
            request('byJabatan'),
            request('search')
        );
        return Inertia::render('PengusulanPAK/Index', [
            "title" => "Pengusulan PAK ",
            "subTitle" => $subTitle,
            "pengusulanPAK" => $pengajuan->filter(request(['search', 'byStatus', 'byJabatan']))->paginate(10),
            'canValidate' => $user->role == 'divisi_sdm',
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
        return Inertia::render('PengusulanPAK/Create', [
            'title' => "Tambah Pengusulan PAK",
        ]);
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
    public function show(PengusulanPAK $pengusulan_pak)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PengusulanPAK $pengusulan_pak)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PengusulanPAK $pengusulan_pak)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PengusulanPAK $pengusulan_pak)
    {
        //
    }
}
