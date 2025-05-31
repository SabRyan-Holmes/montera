<?php

namespace App\Http\Controllers\Shared;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArsipDokumenStoreRequest;
use App\Models\ArsipDokumen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ArsipDokumenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    { {
            $user = Auth::user();
            // dd($user);
            return Inertia::render('ArsipDokumen/Index', [
                'title' => 'Arsip Dokumen',
                'arsipDokumens' => "",
            ]);
        }
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
    public function store(ArsipDokumenStoreRequest $request)
    {
        $validated = $request->validated();

        // Logic Store File PDF Document
        $fileName = $request->title . '.pdf';
        $sourcePath = $request->approved_pak_path;

        // berikan logic untuk store pdf disini dengan, dengan mengakses pdf dari path diatas,
        //mengambil pdf dan mencopyny kemudian sekaligus mengubah  naa file ny seusai $fileName dimana nanti bisa diakses public, diaturh di storage/arsip_dokumen
        $destinationPath = "/arsip_dokumen/$fileName";
        // Salin file ke tujuan
        if (Storage::exists($sourcePath)) {
            Storage::copy($sourcePath, $destinationPath);
            $filePath = 'arsip_dokumen/' . $fileName;
            $validated['file_path'] = $filePath;
        } else {
            abort(404, 'File sumber tidak ditemukan');
        }
        ArsipDokumen::create($validated);
        return redirect()->back()->with('message', 'Berhasil Mengarsipkan Dokumen!');
    }

    /**
     * Display the specified resource.
     */
    public function show(ArsipDokumen $arsipDokumen)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ArsipDokumen $arsipDokumen)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ArsipDokumen $arsipDokumen)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ArsipDokumen $arsipDokumen)
    {
        //
    }
}
