<?php

namespace App\Http\Controllers\Shared;

use App\Http\Controllers\Controller;
use App\Http\Requests\ArsipDokumenStoreRequest;
use App\Models\ArsipDokumen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $filePath =  storage_path("app/public/arsip_dokumen/{$fileName}");
        $validated['file_path'] = $filePath;
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
