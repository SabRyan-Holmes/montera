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
        $riwayatPAK = RiwayatPAK::select('id', 'no_surat3', 'kesimpulan', 'jakk', 'updated_at', 'pegawai_id')
            ->with([
                'pegawai:id,NIP,Nama,Gelar Tambahan,Jabatan/TMT'
            ])->latest();

        $filtered = $riwayatPAK->filter(request(['search', 'byJabatan', 'byKesimpulan', 'byStatus']));
        $data = $filtered->paginate(10)->withQueryString(); // disini masih sangat berat, ada saran ga

        // Logika REQUEST FILTER dan Search
        $subTitle = GetSubtitle::getSubtitle(
            byJabatan: request('byJabatan'),
            byDaerah: request('byDaerah'),
            search: request('search')

        );
        $koefisien_per_tahun = cache()->remember('koefisien_per_tahun', 60, function () {
            return AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value;
        });

        $submitted = Pengajuan::whereNotNull('riwayat_pak_id')->pluck('riwayat_pak_id')->toArray();
        $kesimpulan_list = cache()->remember('kesimpulan_list', 60, function () {
            $data = AturanPAKService::get('kesimpulan')['kesimpulan']->value ?? [];
            return collect($data)->pluck('kesimpulan');
        });

        return Inertia::render('RiwayatPAK/Index', [
            "title" => "Kelola Riwayat PAK",
            "subTitle" => $subTitle,
            "riwayatPAK" => $data,
            'pengajuans' => $submitted,
            'jabatanList' => collect($koefisien_per_tahun)->pluck('jabatan')->toArray(),
            'kesimpulanList' => $kesimpulan_list,
            "searchReq" => request('search') ?? "",
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


    // unused
    // public function show(RiwayatPAK $riwayat)
    // {
    //     return Inertia::render('RiwayatPAK/Show', [
    //         'title' => 'Edit Riwayat Pencetakan Dokumen PAK',
    //         'riwayat' => $riwayat
    //     ]);
    // }

    public function show_detail($id)
    {
        $data = RiwayatPAK::with([
            'pegawai',
            'pengusulan_pak:id,created_at,status,tujuan,periode_mulai,periode_berakhir,ak_terakhir,ak_diajukan,dokumen_utama_path,dokumen_pendukung_path,catatan_pengusul_id,catatan_validator_id',
            'pengusulan_pak.catatan_pengusul:id,isi',
            'pengusulan_pak.catatan_validator:id,isi',
        ])->findOrFail($id);

        return response()->json($data);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RiwayatPAK $riwayat)
    {
        return Inertia::render('RiwayatPAK/CreateOrEdit', [
            'title' => 'Edit Penetapan Angka Kredit',
            'isEdit' => true,
            'riwayat' => $riwayat->load('pegawai'),
            'aturanPAK' => AturanPAKService::get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RiwayatPAK $riwayat)
    {
        // Update data berdasarkan ID
        if (!$riwayat) {
            return back()->withErrors('Data yang ingin diupdate tidak ditemukan.');
        }

        $riwayat->update($request->all());
        $no_surat =  AturanPAK::extractNoSurat($riwayat['no_surat3']);
        ActivityLogger::log(
            aktivitas: 'Update Data',
            keterangan: Auth::user()->name . ' (' . Auth::user()->role  . ') memperbarui data riwayat PAK dengan no PAK ' . $no_surat,
            entityType: get_class($riwayat),
            entityId: $riwayat->id,
        );

        // return Redirect::route('divisi-sdm.riwayat-pak.index')->with('message', 'Data Riwayat Berhasil Diupdate!');
        return redirect()->back()->with('message', 'Data Penetapan Angka Kredit Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RiwayatPAK $riwayat)
    {
        $riwayat->delete();
        return redirect()->back()->with('message', 'Data Riwayat PAK Berhasil Dihapus!');
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
