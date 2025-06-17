<?php

namespace App\Http\Controllers\Shared;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\AturanPAK;
use App\Models\Pegawai;
use App\Models\RiwayatKarir;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RiwayatKarirController extends Controller
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
        // $pegawai = Pegawai::where('NIP', $this->user->nip)->first();
        $riwayatKarir = null;
        $pegawai = null;
        $title = '';
        if ($this->user->role === "Pegawai") {
            $riwayatKarirDiri = RiwayatKarir::where('pegawai_nip', $this->user->nip)->orWhere('pegawai_nip', 'like', '%' . $this->user->nip . '%')->latest();
            $riwayatKarir = $riwayatKarirDiri;
            $pegawai = Pegawai::byNIP($this->user->nip)->first();
            $title = "Riwayat Karir Diri";
        } else { //if Divisi SDM or Pimpinan get all
            $riwayatKarir = RiwayatKarir::latest();
            $title = "Riwayat Karir Pegawai";
        }



        $subTitle = GetSubtitle::getSubtitle(
            byJabatan: request('byJabatan'),
            search: request('search'),
            byJenisPerubahan: request('search')
        );


        $koefisien_per_tahun = AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value;
        $jabatan_list = collect($koefisien_per_tahun)->pluck('jabatan')->toArray();




        return Inertia::render('RiwayatKarir/Index', [
            "title" => $title,
            "subTitle" => $subTitle,
            'riwayatKarir' => $riwayatKarir->filter(request(['byJenisPerubahan', 'byJabatan', 'search']))->paginate(10), //TODO
            'canValidate' => $this->user->role == 'Divisi SDM',
            'isPegawai' => $this->user->role == 'Pegawai',
            'pegawai' => $pegawai,
            "searchReq" => request('search') ?? "",
            "byJenisPerubahanReq" => request('byJenisPerubahan') ?? "Semua Kategori",
            "byJabatanReq" => request('byJabatan') ?? "Semua Kategori",
            "jabatanList" => $jabatan_list
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
    public function show(RiwayatKarir $riwayatKarir)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RiwayatKarir $riwayatKarir)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RiwayatKarir $riwayatKarir)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RiwayatKarir $riwayatKarir)
    {
        //
    }
}
