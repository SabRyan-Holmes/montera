<?php

namespace App\Http\Controllers;

use App\Http\Requests\CetakPAKRequest;
use Inertia\Inertia;
use App\Models\Pegawai;
use App\Models\RiwayatCetak;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;



class CetakDokumenController extends Controller
{
    public function index()
    {
        $pegawai = Pegawai::latest();
        $subTitle = "";

        if (request('byDaerah')) {
            // $category = Pegawai::firstWhere('Daerah', request('byDaerah'));
            $subTitle = 'Berdasarkan Daerah : ' . request('byDaerah');
        }

        return Inertia::render('CetakDokumen/Index', [
            // "title" => "Pegawai " . $title,
            "title" => "Pencetakan Dokumen PAK ",
            "subTitle" => $subTitle,
            "pegawais" => $pegawai->filter(request(['search', 'byDaerah', 'byJabatan']))->paginate(10),
            "searchReq" => request('search'),
            "byDaerahReq" => request('byDaerah'),
            "byJabatanReq" => request('byJabatan')
        ]);
    }

    public function show(Pegawai $pegawai)
    {
        return Inertia::render('CetakDokumen/Show', [
            "title" => "Cetak Dokumen PAK ",
            'pegawai' => $pegawai
        ]);
    }

    public function create(Pegawai $pegawai)
    {
        return Inertia::render('CetakDokumen/Create', [
            "title" => "Cetak Dokumen PAK ",
            'pegawai' => $pegawai
        ]);
    }

    public function edit(Pegawai $pegawai)
    {
        return Inertia::render('CetakDokumen/Create', [
            "title" => "Edit Riwayat Dokumen PAK",
            'pegawai' => $pegawai
        ]);
    }

    public function show_history(Pegawai $pegawai)
    {
        return Inertia::render('CetakDokumen/History', [
            "title" => "Riwayat Pencetakan Dokumen PAK",
            'pegawai' => $pegawai
        ]);
    }


    public function cetak(Request $request)
    {
        // dd($request->all());
        Session::put('data', $request->all());

        // Kalo dibuka dr history(tanpa restore ke database)
        if (!isset($request->id) ) {
            $dataForStore = $request->except('pegawai');
            $pegawai_id = $request->input('pegawai.id');
            $dataForStore['pegawai_id'] = $pegawai_id;
            // $dataForStore = array_merge($dataForStore['data'], ['pegawai_id' => $pegawai_id]);
            // dd($dataForStore);
            RiwayatCetak::create($dataForStore);
        }

        return Inertia::location(route('cetak_dokumen.view-pak'));
    }

    public function view_pak()
    {
        // dd(Session::get('data'));
        $data = Session::get('data');

        // Perbarui nilai total_dicetak dengan menambahkannya 1
        $userId = Auth::user()->id;
        User::where('id', $userId)
            ->update([
                'jumlah_dicetak' => DB::raw('jumlah_dicetak + 1')
            ]);

        // Bersihkan data untuk menghindari nilai 0/ 0,000 /null   menjadi string kosong ''
        $this->cleanAllData($data);


        // Buat PDF SIZE F4
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


    public function test_pdf()
    {
        $pdf = Pdf::loadHTML('<h1>Test PDF</h1><p>This is a simple PDF document.</p>')
            ->setPaper('A4', 'portrait')
            ->setWarnings(false);

        return $pdf->stream('test.pdf');
    }
}
