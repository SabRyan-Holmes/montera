<?php

namespace App\Http\Controllers\Shared;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Http\Requests\ArsipDokumenStoreRequest;
use App\Models\ArsipDokumen;
use App\Models\Pengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use function Laravel\Prompts\search;

class ArsipDokumenController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $user;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth_sso();
            return $next($request);
        });
    }


    public function index()
    {
        $arsipDokumen = ArsipDokumen::byUser($this->user)->latest();
        $folderList = ArsipDokumen::folderListByUser($this->user);

        return Inertia::render('ArsipDokumen/Index', [
            'title' => 'Arsip Dokumen',
            'subTitle' => GetSubtitle::getSubtitle(
                search: request('search')
            ),
            'arsipDokumens' => $arsipDokumen->filter(request()->only('search'))->paginate(10),
            'folderList' => $folderList,
            "searchReq" => request('search'),

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
    public function store(ArsipDokumenStoreRequest $request)
    {
        $pengajuanPAK = Pengajuan::with('riwayat_pak.pegawai')->findOrFail($request->pengajuan_pak_id);
        $validated = $request->except(['pengajuan_pak_id']);
        $validated['nip_pak'] = $pengajuanPAK->riwayat_pak->pegawai['NIP'];

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
            $validated['size'] = Storage::disk('public')->size($filePath);
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
        // Validasi nested data
        $rules = [
            'datas.title' => 'required|string',
            'datas.folder_name' => 'required|string',
        ];

        $validated = $request->validate($rules);

        // Ambil data yang sudah tervalidasi dari 'datas'
        $data = $validated['datas'];

        // Update arsip dokumen
        $arsipDokumen->update($data);

        return redirect()->back()->with('message', 'Berhasil Mengupdate Arsip Dokumen!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ArsipDokumen $arsipDokumen)
    {
        $arsipDokumen->delete();
        return redirect()->back()->with('message', 'Arsip Dokumen Berhasil Dihapus!');
    }
}
