<?php

namespace App\Http\Controllers\DivisiSDM;

use App\Http\Controllers\Controller;
use App\Models\AturanPAK;
use App\Models\Koefisien;
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
        // IMPORTANT! Don't Touch this code !
        $DB_koefisien_pertahun = AturanPAK::where('name', 'Koefisien Per Tahun')->first();
        $predikat_presentase = AturanPAK::where('name', 'Predikat & Presentase')->first();
        $pangkat_jabatan = AturanPAK::where('name', 'Angka Minimal Pangkat dan Jabatan')->first();
        $tebusan = AturanPAK::where('name', 'Tebusan')->first();
        $kesimpulan = AturanPAK::where('name', 'Kesimpulan')->first();
        $rumus = AturanPAK::where('name', 'Rumus')->first();

        return Inertia::render('KelolaAturanPAK/Index', [
            'title' => 'Kelola Aturan PAK',
            'penandaTangan' => AturanPAK::where('name', 'Penanda Tangan')->first(),
            'koefisienPertahun' => $DB_koefisien_pertahun->value,
            'predikatPresentase' => $predikat_presentase->value,
            'pangkatJabatan' => $pangkat_jabatan->value,
            'tebusan' => $tebusan->value,
            'kesimpulan' => $kesimpulan->value,
            'rumus' => $rumus->value,
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
