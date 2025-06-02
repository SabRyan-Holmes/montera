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
        $pegawai = Pegawai::where('NIP', $this->user->nip)->first();
        $riwayatKarirDiri = RiwayatKarir::where('pegawai_nip', $pegawai->NIP)->latest();
        // dd($riwayatKarirDiri);


        $subTitle = GetSubtitle::getSubtitle(
            request('byStatus'),
            request('byJabatan'),
            request('search')
        );


        $koefisien_per_tahun = AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value;
        $jabatan_list = collect($koefisien_per_tahun)->pluck('jabatan')->toArray();

        return Inertia::render('RiwayatKarir/Index', [
            "title" => "Riwayat Karir & Perubahan Data",
            "subTitle" => $subTitle,
            "riwayatKarirDiri" => $riwayatKarirDiri->filter(request(['search']))->paginate(10),
            'riwayatKarirSemua' => 'Semua', //TODO
            'canValidate' => $this->user->role == 'Divisi SDM',
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
