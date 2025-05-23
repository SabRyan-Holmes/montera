<?php

namespace App\Http\Controllers\Shared;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Http\Requests\Pegawai\PengusulanPAKRequest;
use App\Models\AturanPAK;
use App\Models\Pengajuan;
use App\Models\PengusulanPAK;
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
            'canValidate' => $user->role == 'divisi_sdm',
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
        return Inertia::render('PengusulanPAK/Create', [
            'title' => "Tambah Pengusulan PAK",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //   dd($request);
        //   $validated = $request->validated();
        $validated = $request->except(['nama', 'dokumen_pendukung_path', 'periode_mulai', 'periode_berakhir']);

        $periodeMulai = new DateTime($request->periode_mulai);
        $periodeBerakhir = new DateTime($request->periode_berakhir);

        // Format hasil ke dalam bentuk "Maret - Juni 2025"
        $periodePenilaian = $periodeMulai->format('F') . ' - ' . $periodeBerakhir->format('F Y');

        // Masukkan ke dalam array validasi
        $validated['periode_penilaian'] = $periodePenilaian;

        PengusulanPAK::create($validated);

        return Redirect::route('pegawai.pengusulan-pak.index')->with('message', 'Data Pengusulan Berhasil Ditambahkan!');
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
}
