<?php

namespace App\Http\Controllers;

use App\Models\PengusulanPegawai;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengusulanPegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('PengusulanPegawai/Index', [
            "title" => "Pengusulan Pegawai ",

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
    public function show(PengusulanPegawai $pengusulanPegawai)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PengusulanPegawai $pengusulanPegawai)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PengusulanPegawai $pengusulanPegawai)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PengusulanPegawai $pengusulanPegawai)
    {
        //
    }
}
