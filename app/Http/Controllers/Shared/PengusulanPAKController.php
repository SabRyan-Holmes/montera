<?php

namespace App\Http\Controllers\Shared;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Http\Requests\Pegawai\PengusulanPAKRequest;
use App\Models\AturanPAK;
use App\Models\Catatan;
use App\Models\Pegawai;
use App\Models\Pengajuan;
use App\Models\PengusulanPAK;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
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

        $koefisien_per_tahun = AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value;
        $jabatan_list = collect($koefisien_per_tahun)->pluck('jabatan')->toArray();
        // dd($jabatan_list);


        return Inertia::render('PengusulanPAK/Index', [
            "title" => "Pengusulan PAK ",
            "subTitle" => $subTitle,
            "pengusulanPAK" => PengusulanPAK::latest()->paginate(10),
            'canValidate' => $user->role == 'Divisi SDM',
            "searchReq" => request('search'),
            "byStatusReq" => request('byStatus'),
            "byJabatanReq" => request('byJabatan'),
            "jabatanList" => $jabatan_list
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $pegawai = Pegawai::where('NIP', $user->nip)->first();
        return Inertia::render('PengusulanPAK/Create', [
            'title' => "Tambah Pengusulan PAK",
            'pegawai' => $pegawai
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PengusulanPAKRequest $request)
    {
        $validated = $request->except(['catatan_pegawai']);

        if ($request->catatan_pegawai) {
            $new_catatan = Catatan::create([
                'pegawai_nip' => $request->nip,
                // 'tipe' => 'PengusulanPAK',
                'isi' => $request->catatan_pegawai,
            ]);
            $validated['catatan_id'] = $new_catatan->id;
        }

        if ($request->hasFile('dokumen_pendukung_path')) {
            // TODO: Bikin logic store dokumen pendukung
            $fileName = '';
            $path = '';
        }

        PengusulanPAK::create($validated);
        return Redirect::route('pegawai.pengusulan-pak.index')->with('message', 'Pengusulan Berhasil Diajukan!');
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

    public function approve(Request $request)
    {
        PengusulanPAK::find($request->id)->update([
            "status" => 'diproses',
        ]);
    }

    public function reject(Request $request)
    {
        $rules = [
            'id' => 'required|integer',
            'catatan' => 'required|string|min:5|max:200',
        ];
        $request->validate($rules);

        // Store Catatan & The Relationship with Pengusulan & User
        $new_catatan = Catatan::create([
            'user_id' => Auth::user()->id,
            'isi' => $request->catatan,
        ]);
        PengusulanPAK::find($request->id)->update([
            'status' => 'ditolak',
            'catatan_sdm_id' => $new_catatan->user_id
        ]);

        return redirect()->back()->with('message', 'Pengusulan PAK berhasil ditolak');
    }

    public function undo_reject(Request $request)
    {
        // dd($request->all());
        PengusulanPAK::find($request->id)->update([
            "status" => 'diproses',
        ]);
        // Redirect kembali dengan pesan sukses
        return redirect()->back()->with('message', 'Penolakan pengusulan berhasil dibatalkan');
    }
}
