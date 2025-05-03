<?php

namespace App\Http\Controllers\DivisiSDM;
use App\Http\Controllers\Controller;
use App\Http\Requests\KoefisienStoreRequest;
use App\Models\Koefisien;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class KoefisienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('KelolaKoefisien/Index', [
            "title" => "Kelola Aturan Koefisien",
            "koefisiens" => Koefisien::all(),
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
    public function store(KoefisienStoreRequest $request)
    {
        $validated = $request->validated();
        // dd($validated);
        // Koefisien::create($validated);
        Koefisien::updateOrCreate(
            ['jabatan' => $validated['jabatan']],
            $validated
        );
        return Redirect::route('koefisien.index')->with('message', 'Aturan Koefien Berhasil Disimpan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Koefisien $koefisien)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Koefisien $koefisien)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Koefisien $koefisien)
    {
        $validated = $request->validated();
        Pegawai::where('id', $koefisien->id)->update($validated);

        return redirect()->back()->with('message', 'Data Pegawai Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Koefisien $koefisien)
    {
        $koefisien->delete();
        return redirect()->back()->with('message', 'Data Pegawai Berhasil DiHapus!');
    }
}
