<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
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
            "search" => request('search'),
            "byDaerahReq" => request('byDaerah'),
            "byJabatanReq" => request('byJabatan')
        ]);
    }

    public function show(Pegawai $pegawai)
    {
        return Inertia::render('CetakDokumen/Show', [
            'pegawai' => $pegawai
        ]);
    }

    public function create(Pegawai $pegawai)
    {
        return Inertia::render('CetakDokumen/Create', [
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
        Session::put('data', $request->all());
        return redirect()->route('cetak_dokumen.view-pak');
        // $data = $request->all();
        // // dd($request->all());
        // // return Redirect::route('cetak_dokumen.view-pak')->with(['data' => $data]);
        // $pdf = Pdf::loadView('pdf/pak', [
        //     "title" => "Dokumen PAK",
        //     "data" => $data
        // ])->setPaper('F4', 'portrait')->setWarnings(false);
        // return $pdf->stream('dokumen_pak.pdf');
        // exit();
    }

    public function view_pak(Request $request)
    {
        // Ambil data dari session
        $data = Session::get('data');
        $dataTest = [
            "pegawai" => [
                "id" => 4,
                "Nama" => "DWI SATRIA FIRMANSYAH S.Tr.Stat.",
                "NIP/NRP" => "1998030620210410001",
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
            "periode_mulai" => 1,
            "periode_berakhir" => 6,
            "tgl_ditetapkan" => "2024-08-14",
            "nip" => "197412311996121001",
            "no_surat1" => "1500.445/Konv/2024",
            "predikat" => "Baik",
            "presentase" => 100,
            "ak_normatif" => 12.5,
            "angka_kredit" => "1.75",
            "ak_normatif_ops" => 0,
            "tebusan1" => [
                "kepala_reg" => false,
                "sekretaris" => false,
                "kepala_bps" => true,
                "pns" => true,
                "kepala_biro" => false,
                "arsip" => true,
            ],
            "no_surat2" => "1500.445/Akm/2024",
            "ak_terakhir" => "1.7",
            "jumlah_ak_kredit" => "3.45",
            "tahun_terakhir" => "2023",
            "tahun_ini" => "2024",
            "tebusan2" => [
                "kepala_reg" => false,
                "sekretaris" => false,
                "kepala_bps" => false,
                "pns" => false,
                "kepala_biro" => false,
                "arsip" => false,
            ],
            "no_surat3" => "1500.445/PAK/2024",
            "ak_dasar" => [
                'tipe_ak' => "AK Dasar yang diberikan",
                "lama" => "0.6",
                "baru" => "0.5",
                "jumlah" => 1.1,
                "keterangan" => "",
            ],
            "ak_jf" => [
                'tipe_ak' => "AK JF Lama",
                "lama" => "14.2",
                "baru" => "30",
                "jumlah" => 44.2,
                "keterangan" => "",
            ],
            "ak_penyesuaian" => [
                'tipe_ak'=> "AK Penyesuaian/ Penyetsaraan",
                "lama" => "0.8",
                "baru" => "1.1",
                "jumlah" => 1.9000000000000001,
                "keterangan" => "",
            ],
            "ak_konversi" => [
                'tipe_ak'=> "AK Konversi",
                "lama" => "0.8",
                "baru" => "1.4",
                "jumlah" => 2.2,
                "keterangan" => "Ini Keterangan",
            ],
            "ak_peningkatan" => [
                'tipe_ak'=> "AK yang diperoleh dari Peningkatan yang diberikan",
                "lama" => 0,
                "baru" => "3.9",
                "jumlah" => 3.9,
                "keterangan" => "",
            ],
            "jakk" => [
                "lama" => 16.4,
                "baru" => 36.9,
                "jumlah" => 53.2,
                "keterangan" => "",
            ],
            "ak_tipe_tambahan" => [
                "ak_tambahan_1" => [
                    "tipe_ak" => "Tess Cuy",
                    "lama" => "2.4",
                    "baru" => "1.7",
                    "jumlah" => 4.1,
                    "keterangan" => "dwwww",
                ],
                "ak_tambahan_2" => [
                    "tipe_ak" => "tes lagi cik",
                    "lama" => "0.5",
                    "baru" => "0.9",
                    "jumlah" => 1.4,
                    "keterangan" => "",
                ],
            ],
            "pangkat" => "50",
            "jabatan" => 100,
            "pangkat_keker" => "3.20",
            "jabatan_keker" => "-46.80",
            "tebusan3" => [
                "kepala_reg" => true,
                "sekretaris" => true,
                "kepala_bps" => false,
                "pns" => false,
                "kepala_biro" => true,
                "arsip" => true,
            ],
        ];
        // Buat PDF
        $pdf = Pdf::loadView('pdf.pak', [
            "title" => "Dokumen PAK",
            "pegawai" => "pegawai",
            "data" => $data, // Kirim data ke view
        ])->setPaper('F4', 'portrait')->setWarnings(false);

        // Stream PDF
        return $pdf->stream('dokumen_pak.pdf');
        // return response($pdf->output(), 200)
        //     ->header('Content-Type', 'application/pdf')
        //     ->header('Content-Disposition', 'inline; filename="dokumen_pak.pdf"');
    }

    // public function by_jabatan (Pegawai $pegawai) {

    //     $lomba = $pegawai->lomba()->latest()->paginate(5);
    //     // ddd($lomba);
    //     return Inertia::render('Informasi/LombaPegawai', [
    //         "title" => "Lomba Berdasarkan Kategori",
    //         "lomba" => $lomba,
    //         "pegawai" => $pegawai->name,
    //         "reqPegawai" => request('pegawai')
    //     ]);
    // })->middleware(['auth'])->name('lomba.show_pegawai');


    public function test_pdf()
    {
        $pdf = Pdf::loadHTML('<h1>Test PDF</h1><p>This is a simple PDF document.</p>')
            ->setPaper('A4', 'portrait')
            ->setWarnings(false);

        return $pdf->stream('test.pdf');
    }
}
