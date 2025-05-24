<?php

namespace App\Http\Controllers\Auth;

use App\Models\Pegawai;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use App\Exports\PegawaiExport;
use App\Http\Controllers\Controller;
use App\Models\ArsipDokumen;
use App\Models\AturanPAK;
use App\Models\Pengajuan;
use App\Models\PengusulanPAK;
use App\Models\RiwayatPAK;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $user = Auth::user();
        // dd($user);
        $dataByRole = null;
        $dataGraph = null;

        if ($user->role == "Divisi SDM" || $user->role == "Pimpinan") {
            $koefisien_per_tahun = AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value;
            $dataGraph = [];
            foreach ($koefisien_per_tahun as $koefisien) {
                $jabatan = $koefisien['jabatan'];
                $count = Pegawai::where('Jabatan/TMT', 'LIKE', "%{$jabatan}%")->count();
                $dataGraph[$jabatan] = $count;
            }

            $pegawai_fungsional = array_sum($dataGraph);
            $pak_count = RiwayatPAK::all()->count();
            $no_pak_terakhir = RiwayatPAK::latest('created_at')->first()?->no_surat3;;
            $user_count =  User::all()->count();
            $pegawai_count =  Pegawai::all()->count();
            $pengusulan_count = PengusulanPAK::all()->count();
            $pengajuan_count = Pengajuan::all()->count();
            $arsip_dokumen_count = ArsipDokumen::where('user_id', $user->id)->count();

            $dataByRole = [
                'pegawaiFungsional' => $pegawai_fungsional,
                'PAKCount' => $pak_count,
                'noPAKTerakhir' => $no_pak_terakhir,
                'userCount' => $user_count,
                'pegawaiCount' => $pegawai_count,
                'pengusulanCount' => $pengusulan_count,
                'pengajuanCount' => $pengajuan_count,
                'arsipDokumenCount' => $arsip_dokumen_count
            ];
        }

        //  TODO: Kalo role nya Pegawai data untuk dashboard beda lagi. JAngan lupa tambahin nanti logikany, kalo lah bisa SSO
        if ($user->role == "Pegawai") {
            $pak_count = RiwayatPAK::where('pegawai_id', $user->id)->count();
            $pengusulan_count = PengusulanPAK::all()->count();
            $pengajuan_count = Pengajuan::where('pegawai_id', $user->id)->count();
            $arsip_dokumen_count = ArsipDokumen::where('pegawai_nip', $user->nip)->count();

            $dataByRole = [
                'PAKCount' => $pak_count,
                'pengusulanCount' => $pengusulan_count,
                'pengajuanCount' => $pengajuan_count,
                'arsipDokumenCount' => $arsip_dokumen_count,
            ];

            $diajukan = Pengajuan::where('pegawai_id', $user->id)->where('status', 'diajukan')->count();
            $ditolak = Pengajuan::where('pegawai_id', $user->id)->where('status', 'ditolak')->count();
            $divalidasi = Pengajuan::where('pegawai_id', $user->id)->where('status', 'divalidasi')->count();

            $dataGraph = [
                'diajukan' => $diajukan,
                'ditolak' => $ditolak,
                'divalidasi' => $divalidasi,
            ];
        }

        return Inertia::render('Dashboard/AuthDashboard', [
            'title' => 'Dashboard',
            'dataGraph' => $dataGraph,
            'dataByRole' => $dataByRole,
        ]);
    }

    public function sdm_dashboard()
    {

        // $accepted = Process::where('status', 'selesai')->count();
        $terampil = Pegawai::where('Jabatan/TMT', 'LIKE', '%Terampil%')
            ->count();

        $mahir = Pegawai::where('Jabatan/TMT', 'LIKE', '%Mahir%')
            ->count();

        $penyelia = Pegawai::where('Jabatan/TMT', 'LIKE', '%Penyelia%')
            ->count();

        $pertama = Pegawai::where('Jabatan/TMT', 'LIKE', '%Pertama%')
            ->count();

        $muda = Pegawai::where('Jabatan/TMT', 'LIKE', '%Muda%')
            ->count();

        $madya = Pegawai::where('Jabatan/TMT', 'LIKE', '%Madya%')
            ->count();

        $data = [
            'terampil' => $terampil,
            'mahir' => $mahir,
            'penyelia' => $penyelia,
            'pertama' => $pertama,
            'muda' => $muda,
            'madya' => $madya,
        ];

        $pegawaiFungsional = $terampil + $mahir + $penyelia + $pertama + $muda + $madya;
        $pakCount = Auth::user()->jumlah_dicetak;

        return Inertia::render('Dashboard', [
            'title' => 'Dashboard',
            'userCount' => User::all()->count(),
            'pegawaiCount' => Pegawai::all()->count(),
            'data' => $data,
            'pegawaiFungsional' => $pegawaiFungsional,
            'pakCount' => $pakCount
        ]);
    }

    public function pimpinan_dashboard()
    {

        // $accepted = Process::where('status', 'selesai')->count();
        $terampil = Pegawai::where('Jabatan/TMT', 'LIKE', '%Terampil%')
            ->count();

        $mahir = Pegawai::where('Jabatan/TMT', 'LIKE', '%Mahir%')
            ->count();

        $penyelia = Pegawai::where('Jabatan/TMT', 'LIKE', '%Penyelia%')
            ->count();

        $pertama = Pegawai::where('Jabatan/TMT', 'LIKE', '%Pertama%')
            ->count();

        $muda = Pegawai::where('Jabatan/TMT', 'LIKE', '%Muda%')
            ->count();

        $madya = Pegawai::where('Jabatan/TMT', 'LIKE', '%Madya%')
            ->count();

        $data = [
            'terampil' => $terampil,
            'mahir' => $mahir,
            'penyelia' => $penyelia,
            'pertama' => $pertama,
            'muda' => $muda,
            'madya' => $madya,
        ];

        $pegawaiFungsional = $terampil + $mahir + $penyelia + $pertama + $muda + $madya;
        $pakCount = Auth::user()->jumlah_dicetak;

        return Inertia::render('Dashboard', [
            'title' => 'Dashboard',
            'userCount' => User::all()->count(),
            'pegawaiCount' => Pegawai::all()->count(),
            'data' => $data,
            'pegawaiFungsional' => $pegawaiFungsional,
            'pakCount' => $pakCount
        ]);
    }

    public function pegawai_dashboard()
    {

        // $accepted = Process::where('status', 'selesai')->count();
        $terampil = Pegawai::where('Jabatan/TMT', 'LIKE', '%Terampil%')
            ->count();

        $mahir = Pegawai::where('Jabatan/TMT', 'LIKE', '%Mahir%')
            ->count();

        $penyelia = Pegawai::where('Jabatan/TMT', 'LIKE', '%Penyelia%')
            ->count();

        $pertama = Pegawai::where('Jabatan/TMT', 'LIKE', '%Pertama%')
            ->count();

        $muda = Pegawai::where('Jabatan/TMT', 'LIKE', '%Muda%')
            ->count();

        $madya = Pegawai::where('Jabatan/TMT', 'LIKE', '%Madya%')
            ->count();

        $data = [
            'terampil' => $terampil,
            'mahir' => $mahir,
            'penyelia' => $penyelia,
            'pertama' => $pertama,
            'muda' => $muda,
            'madya' => $madya,
        ];

        $pegawaiFungsional = $terampil + $mahir + $penyelia + $pertama + $muda + $madya;
        $pakCount = Auth::user()->jumlah_dicetak;

        return Inertia::render('Dashboard/PegawaiDashboard', [
            'title' => 'Dashboard',
            'userCount' => User::all()->count(),
            'pegawaiCount' => Pegawai::all()->count(),
            'data' => $data,
            'pegawaiFungsional' => $pegawaiFungsional,
            'pakCount' => $pakCount
        ]);
    }

    public function exportCsv(): StreamedResponse
    {
        $filename = 'Data_Pegawai.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        return new StreamedResponse(function () {
            $handle = fopen('php://output', 'w');

            // Mendapatkan nama kolom dari tabel database
            $columns = DB::getSchemaBuilder()->getColumnListing('pegawais');
            fputcsv($handle, $columns);

            // Mengambil data dari tabel database
            $data = DB::table('pegawais')->get(); // Ganti dengan nama tabel Anda

            // Menulis data ke dalam file CSV
            foreach ($data as $row) {
                fputcsv($handle, (array) $row);
            }

            fclose($handle);
        }, 200, $headers);
    }

    public function exportExcel()
    {

        return Excel::download(new PegawaiExport, 'Data_Pegawai.xlsx');
    }
}
