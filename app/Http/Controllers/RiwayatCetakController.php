<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\RiwayatCetak;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;


class RiwayatCetakController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show_history(Pegawai $pegawai)
    {
        $riwayatCetak = $pegawai->riwayatCetaks;
        return Inertia::render('CetakDokumen/History', [
            "title" => "Riwayat Pencetakan Dokumen PAK",
            'pegawai' => $pegawai,
            'riwayatCetak' => $riwayatCetak
        ]);
    }


    public function show(Request $request)
    {
        // dd($request);
        Session::put('data', $request->all());

        return Inertia::location(route('cetak_dokumen.view-pak'));
    }

    public function view_pak()
    {
        // Ambil data dari session
        $data = Session::get('data')['data'];

        // Perbarui nilai total_dicetak dengan menambahkannya 1
        $userId = Auth::user()->id;
        User::where('id', $userId)
            ->update([
                'jumlah_dicetak' => DB::raw('jumlah_dicetak + 1')
            ]);

        // dd($data);

        // Bersihkan data untuk menghindari nilai 0/ 0,000 /null   menjadi string kosong ''
        // dd($data);
        $this->cleanAllData($data);


        // dd($data);

        // Buat PDF
        // SIZE F4
        $nama_pak = $data['pegawai']['Nama'] . '-' . $data['pegawai']['NIP'] . '-' . 'PAK.pdf';
        $customF4Paper = array(0, 0, 595.28, 935.43);
        $pdf = Pdf::loadView('pdf.pak', [
            "title" => $nama_pak,
            "pegawai" => "pegawai",
            "data" => $data, // Kirim data ke view
        ])->setPaper($customF4Paper, 'portrait')->setWarnings(false);

        // Stream PDF
        return $pdf->stream($nama_pak);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RiwayatCetak $riwayat)
    {
        return Inertia::render('CetakDokumen/Edit', [
            'title' => 'Edit Riwayat Pencetakan Dokumen PAK',
            // riwayat->with('pegawai)
            'riwayat' => $riwayat
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RiwayatCetak $riwayat)
    {
        // Update data berdasarkan ID
        $riwayat->update($request->all());

        return Redirect::route('cetak_dokumen.show_history', $riwayat->pegawai["NIP"])->with('message', 'Data Riwayat Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RiwayatCetak $riwayat)
    {
        // dd($riwayat);
        $riwayat->delete();
        return redirect()->back()->with('message', 'Data Riwayat Berhasil DiHapus!');
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
