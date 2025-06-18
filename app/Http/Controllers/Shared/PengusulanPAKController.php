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
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;


class PengusulanPAKController extends Controller
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
        $pengusulan_pak = PengusulanPAK::latest();

        if ($this->user->role === "Pegawai") {
            $pengusulan_pak = PengusulanPAK::where('pegawai_nip', $this->user->nip)->latest();
        }

        $subTitle = GetSubtitle::getSubtitle(
            byJabatan: request('byJabatan'),
            byStatus: request('byStatus'),
            search: request('search'),
            searchLabel: 'Cari pegawai dengan Nama/NIP : '
        );

        $koefisien_per_tahun = AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value;
        $jabatan_list = collect($koefisien_per_tahun)->pluck('jabatan')->toArray();

        return Inertia::render('PengusulanPAK/Index', [
            "title" => "Pengusulan Penilaian PAK ",
            "subTitle" => $subTitle,
            "pengusulanPAK" => $pengusulan_pak->filter(request(['search', 'byJabatan', 'byStatus']))->paginate(10),
            'isDivisiSDM' => $this->user->role == 'Divisi SDM',
            "searchReq" => request('search') ?? "",
            "byStatusReq" => request('byStatus') ?? "Semua Kategori",
            "byJabatanReq" => request('byJabatan') ?? "Semua Kategori",
            "jabatanList" => $jabatan_list
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $pegawai = Pegawai::where('NIP', $this->user->nip)->first();
        return Inertia::render('PengusulanPAK/CreateOrEdit', [
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
                'user_nip' => $request->pegawai_nip,
                'tipe' => 'PengusulanPAK',
                'isi' => $request->catatan_pegawai,
            ]);
            $validated['catatan_id'] = $new_catatan->id;
        }

        $uploadMap = [
            'dokumen_utama_path' => '-Penilaian-Kinerja~',
            'dokumen_pendukung_path' => '-Penilaian-Pendidikan~',
        ];

        foreach ($uploadMap as $field => $alias) {
            if ($request->hasFile($field)) {
                $file = $request->file($field);
                $extension = $file->getClientOriginalExtension();
                $timestamp = now()->format('Ymd_His');
                $fileName = $request->pegawai_nip . $alias . $timestamp . '.' . $extension;
                $path = $file->storeAs('dokumen_pengusulan_pak', $fileName, 'public');
                $validated[$field] = $path;
            }
        }

        PengusulanPAK::create($validated);
        return Redirect::route('pegawai.pengusulan-pak.index')->with('message', 'Pengusulan Penilaian PAK Berhasil!');
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
    public function edit(PengusulanPAK $pengusulanPAK, Request $request)
    {
        $pegawai = Pegawai::where('NIP', $this->user->nip)->first();
        return Inertia::render('PengusulanPAK/CreateOrEdit', [
            'title' => "Tambah Pengusulan PAK",
            'pegawai' => $pegawai,
            'pengusulanPAK' => $pengusulanPAK
        ]);
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
        $pengusulan_pak->delete();
        return redirect()->back()->with('message', 'Berhasil Membatalkan Pengusulan PAK');
    }

    public function approve(Request $request)
    {
        PengusulanPAK::find($request->id)->update([
            "status" => 'disetujui',
        ]);
    }

    public function reject(Request $request)
    {
        $rules = [
            'id' => 'required|integer',
            'catatan' => 'required|string|min:5|max:200',
        ];
        $request->validate($rules);
        // dd($request->all());
        // Store Catatan & The Relationship with Pengusulan & User
        $new_catatan = Catatan::create([
            'user_nip' => $this->user->nip,
            'isi' => $request->catatan,
        ]);
        PengusulanPAK::find($request->id)->update([
            'status' => 'ditolak',
            'catatan_sdm_id' => $new_catatan->id
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
