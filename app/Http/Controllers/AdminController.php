<?php

namespace App\Http\Controllers;

use App\Helpers\GetSubtitle;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function produk_index()
    {
        $pegawai = Produk::latest();
        $subTitle = "";

        $subTitle = GetSubtitle::getSubtitle(
            byJabatan: request('byJabatan'),
            byDaerah: request('byDaerah'),
            search: request('search')
        );

        // $koefisien_per_tahun = AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value;
        // $koefisien_per_tahun = AturanPAKService::get(['koefisienPertahun']);

        return Inertia::render('KelolaPegawai/Index', [
            "title" => "Data Pegawai",
            "subTitle" => $subTitle,
            "jabatans" => $pegawai->filter(request(['search', 'byDaerah', 'byJabatan']))->paginate(10),
            "searchReq" => request('search') ?? "",
            "byDaerahReq" => request('byDaerah') ?? "Semua Kategori",
            "byJabatanReq" => request('byJabatan') ?? "Semua Kategori",
            // 'isDivisiSDM' => $this->user->hasRole === 'Divisi SDM',
            // 'jabatanList' => collect($koefisien_per_tahun)->pluck('jabatan')->toArray()
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
