<?php

namespace App\Http\Controllers\DivisiSDM;

use App\Http\Controllers\Controller;
use App\Models\AturanPAK;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AturanPAKController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd("test");
        return Inertia::render('KelolaAturanPAK/Index', [
            'title' => 'Kelola Aturan PAK',
            'penandaTangan' => AturanPAK::where('name', 'Penanda Tangan')->first(),
            'koefisienPertahun' => AturanPAK::where('name', 'Penanda Tangan')->first(),
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
    public function show(AturanPAK $aturanPAK)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AturanPAK $aturanPAK)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AturanPAK $aturanPAK)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AturanPAK $aturanPAK)
    {
        //
    }
}
