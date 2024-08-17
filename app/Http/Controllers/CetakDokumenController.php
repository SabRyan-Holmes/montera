<?php

namespace App\Http\Controllers;

use App\Http\Requests\CetakPAKRequest;
use Inertia\Inertia;
use App\Models\Pegawai;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;

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

    public function process(Pegawai $pegawai)
    {
        // Logika Cetak Dokumen
        // return Inertia::render('CetakDokumen/Show',[
        //     'pegawai' => $pegawai
        // ]);
    }

    public function cetak(Request $request)
    {
        // $request->validated();
        Session::put('data', $request->all());
        // return response()->json(['url' => route('cetak_dokumen.view-pak')]);
        return Inertia::location(route('cetak_dokumen.view-pak'));

    }

    public function view_pak()
    {
        // Ambil data dari session
        $data = Session::get('data')['data'];

        $dataTest = [
            "pegawai" => [
                "id" => 4,
                "Nama" => "DWI SATRIA FIRMANSYAH S.Tr.Stat.",
                "NIP/NRP" => "199803062021041000",
                "Nomor Seri Karpeg" => "",
                "Pangkat/Golongan Ruangan/TMT" => "PENATA MUDA /III/a /01-04-2021",
                "Tempat/Tanggal Lahir" => "JAMBI 06-03-1998",
                "Jenis Kelamin" => "PRIA",
                "Pendidikan" => "D-IV STATISTIKA",
                "Jabatan/TMT" => "Statistisi Ahli Pertama / 18-04-2022",
                "Masa Kerja Golongan" => "0 TAHUN 0 BULAN",
                "Unit Kerja" => "BPS KABUPATEN BATANG HARI",
                "Daerah" => "BATANG HARI",
                "created_at" => null,
                "updated_at" => null,
            ],
            "nama" => "Agus Sudibyo, M.Stat",
            "nip" => "197412311996121001",
            "tgl_ditetapkan" => "2024-08-14",
            "periode_mulai" => 1,
            "periode_berakhir" => 2,
            "angka_periode" => 3,
            "penanda_tangan" => "",
            "no_surat1" => "1500.455/KONV/2024",
            "predikat" => "Baik",
            "presentase" => 100,
            "ak_normatif" => 12.5,
            "angka_kredit" => "235.456",
            "ak_normatif_ops" => 0,
            "tebusan1" => [
                "kepala_reg" => true,
                "sekretaris" => true,
                "kepala_bps" => true,
                "pns" => true,
                "kepala_biro" => false,
                "arsip" => false,
            ],
            "no_surat2" => "1500.455/AKM/2024",
            "ak_terakhir" => "232.331",
            "jumlah_ak_kredit" => "467.787",
            "tahun_terakhir" => "2023",
            "tahun_ini" => "2024",
            "tebusan2" => [
                "kepala_reg" => true,
                "sekretaris" => false,
                "kepala_bps" => true,
                "pns" => false,
                "kepala_biro" => false,
                "arsip" => false,
            ],
            "no_surat3" => "1500.455/PAK/2024",
            "ak_dasar" => [
                "tipe_ak" => "AK Dasar yang diberikan",
                "lama" => 22,
                "baru" => 233,
                "jumlah" => "255.000",
                "keterangan" => "wdwdwdwdwdwdwdw",
            ],
            "ak_jf" => [
                "tipe_ak" => "AK JF Lama",
                "lama" => 230,
                "baru" => 2,
                "jumlah" => "232.000",
                "keterangan" => "",
            ],
            "ak_penyesuaian" => [
                "tipe_ak" => "AK Penyesuaian/ Penyetsaraan",
                "lama" => 340,
                "baru" => 33,
                "jumlah" => "373.000",
                "keterangan" => "",
            ],
            "ak_konversi" => [
                "tipe_ak" => "AK Konversi",
                "lama" => "232.331",
                "baru" => "235.456",
                "jumlah" => "467.787",
                "keterangan" => "",
            ],
            "ak_peningkatan" => [
                "tipe_ak" => "AK yang diperoleh dari Peningkatan yang diberikan",
                "lama" => 30,
                "baru" => 32.3,
                "jumlah" => "62.300",
                "keterangan" => "",
            ],
            "ak_tipe_tambahan" => [
                'ak_tambahan_1' => [
                    'tipe_ak' => 'AK konversi baru lagi',
                    'lama' => '27.2',
                    'baru' => '31.2',
                    'jumlah' => 58.4,
                    'keterangan' => '',
                ],
            ],

            "jakk" => [
                "lama" => 854.331,
                "baru" => 535.756,
                "jumlah" => 1390.087,
                "keterangan" => "",
            ],
            "pangkat" => "100",
            "jabatan" => "450",
            "pangkat_keker" => "1290.087",
            "jabatan_keker" => "940.087",
            "tebusan3" => [
                "kepala_reg" => true,
                "sekretaris" => false,
                "kepala_bps" => true,
                "pns" => false,
                "kepala_biro" => false,
                "arsip" => false,
            ],
        ];

        // dd($data);

        // Bersihkan data untuk menghindari nilai 0/ 0,000 /null   menjadi string kosong ''
        $this->cleanAllData($data);


        // dd($data);

        // Buat PDF
        // SIZE F4
        $nama_pak = $data['pegawai']['Nama'] . '-' . $data['pegawai']['NIP/NRP'] . '-' . 'PAK';
        $customF4Paper = array(0, 0, 595.28, 935.43);
        $pdf = Pdf::loadView('pdf.pak', [
            "title" => "Dokumen PAK",
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
