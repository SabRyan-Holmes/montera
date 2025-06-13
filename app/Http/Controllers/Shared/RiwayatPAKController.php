<?php

namespace App\Http\Controllers\Shared;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\AturanPAK;
use App\Models\Pegawai;
use App\Models\Pengajuan;
use App\Models\RiwayatPAK;
use App\Models\User;
use App\Services\ActivityLogger;
use App\Services\AturanPAKService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;


class RiwayatPAKController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    //  Ini Pilih berdasarkan pegawai nanti
    public function index()
    {
        $riwayatPAK = RiwayatPAK::latest();

        // Logika REQUEST FILTER dan Search
        $subTitle = GetSubtitle::getSubtitle(
            request('byJabatan'),
            request('byDaerah'),
            request('search')
        );

        $submitted = Pengajuan::where('status', "diajukan")->pluck('riwayat_pak_id')->toArray();

        return Inertia::render('RiwayatPAK/Index', [
            // "title" => "Riw$riwayatPAK " . $title,
            "title" => "Kelola Riwayat PAK",
            "subTitle" => $subTitle,
            "riwayatPAK" => $riwayatPAK->filter(request(['search', 'byDaerah', 'byJabatan']))->paginate(10),
            'pengajuans' => $submitted,
            "searchReq" => request('search'),
            "byDaerahReq" => request('byDaerah'),
            "byJabatanReq" => request('byJabatan')
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



    public function show(RiwayatPAK $riwayat)
    {
        return Inertia::render('RiwayatPAK/Show', [
            'title' => 'Edit Riwayat Pencetakan Dokumen PAK',
            'riwayat' => $riwayat
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RiwayatPAK $riwayat)
    {
        return Inertia::render('RiwayatPAK/CreateOrEdit', [
            'title' => 'Edit Penetapan Angka Kredit',
            'isEdit' => true,
            'riwayat' => RiwayatPAK::findOrFail($riwayat->id),
            'aturanPAK' => AturanPAKService::get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RiwayatPAK $riwayat)
    {
        // Update data berdasarkan ID
        // dd($riwayat);
        if (!$riwayat) {
            return back()->withErrors('Data yang ingin diupdate tidak ditemukan.');
        }


        $riwayat->update($request->all());
        $no_surat =  AturanPAK::extractNoSurat($riwayat['no_surat3']);
        ActivityLogger::log(
            'Update Data',
            Auth::user()->name . ' (' . Auth::user()->role  . ') memperbarui data riwayat PAK dengan no PAK ' . $no_surat,
            get_class($riwayat),
            $riwayat->id,
        );

        // return Redirect::route('divisi-sdm.riwayat-pak.index')->with('message', 'Data Riwayat Berhasil Diupdate!');
        return redirect()->back()->with('message', 'Data Penetapan Angka Kredit Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RiwayatPAK $riwayat)
    {
        // dd($riwayat);
        $riwayat->delete();
        return redirect()->back()->with('message', 'Data Riwayat Berhasil DiHapus!');
    }


    public function pegawai(Pegawai $pegawai)
    {
        $pegawai = Pegawai::latest();
        $subTitle = "";

        if (request('byDaerah')) {
            // $category = Pegawai::firstWhere('Daerah', request('byDaerah'));
            $subTitle = 'Berdasarkan Daerah : ' . request('byDaerah');
        }

        return Inertia::render('RiwayatPAK/PegawaiList', [
            // "title" => "Pegawai " . $title,
            "title" => "Kelola Riwayat PAK",
            "subTitle" => $subTitle,
            "pegawais" => $pegawai->filter(request(['search', 'byDaerah', 'byJabatan']))->paginate(10),
            "searchReq" => request('search'),
            "byDaerahReq" => request('byDaerah'),
            "byJabatanReq" => request('byJabatan')
        ]);
    }

    // Ini untuk show all pak by pegawai nanti
    public function index_show(Pegawai $pegawai)
    {
        // dd($pegawai);
        return Inertia::render('RiwayatPAK/Index', [
            "title" => "Riwayat Dokumen PAK",
            'pegawai' => $pegawai,
            'RiwayatPAK' => RiwayatPAK::where('pegawai_id', $pegawai->id)->get(),
            // Ambil semua pengajuan berdasarkan id Pegawai lalu ambil semua document Id dan dimasukkan ke dalam Array
            'pengajuans' => Pengajuan::where('pegawai_id', $pegawai->id)->pluck('pak_id')->toArray(),
        ]);
    }

    private function cleanData(&$item)
    {
        // Ganti koma dengan titik untuk pengecekan numeric
        $numericValue = is_string($item) ? str_replace(',', '.', $item) : $item;

        // Cek apakah nilai sama dengan 0, "0,000", atau null
        if ($numericValue === 0 || $numericValue === '0' || $numericValue === '0.000' || $item === null) {
            $item = ''; // Ubah menjadi string kosong
        }
    }

    // Fungsi rekursif untuk memproses semua elemen dalam array atau object
    private function cleanAllData(&$array)
    {
        foreach ($array as &$value) {
            if (is_array($value) || is_object($value)) {
                $this->cleanAllData($value); // Jika value adalah array atau object, rekursif
            } else {
                $this->cleanData($value); // Jika value adalah nilai tunggal, cek dan bersihkan
            }
        }
    }
}
