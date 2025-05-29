<?php

namespace App\Http\Controllers\Auth;

use App\Models\Pegawai;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
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
            $no_pak_terakhir = AturanPAK::where('name', 'No Surat Terakhir')->first()->value;
            $user_count =  User::all()->count();
            $pegawai_count =  Pegawai::all()->count();
            $pengusulan_count = PengusulanPAK::all()->count();
            $pengajuan_count = Pengajuan::all()->count();
            $arsip_dokumen_count = ArsipDokumen::where('user_id', $user->id)->count();

            $dataPengusulanGraph = [
                'Diproses' => PengusulanPAK::where('status', 'diproses' )->count(),
                'Disetujui' => PengusulanPAK::where('status', 'disetujui' )->count(),
                'Ditolak' => PengusulanPAK::where('status', 'ditolak' )->count(),
            ];

            $dataPengajuanPAKGraph = [
                'Diajukan' => Pengajuan::where('status', 'diajukan' )->count(),
                'Divalidasi' => Pengajuan::where('status', 'divalidasi' )->count(),
                'Ditolak' => Pengajuan::where('status', 'ditolak' )->count(),
            ];

            $dataByRole = [
                'pegawaiFungsional' => $pegawai_fungsional,
                'PAKCount' => $pak_count,
                'noPAKTerakhir' => $no_pak_terakhir[0]['no_surat'],
                'userCount' => $user_count,
                'pegawaiCount' => $pegawai_count,
                'pengusulanCount' => $pengusulan_count,
                'pengajuanCount' => $pengajuan_count,
                'arsipDokumenCount' => $arsip_dokumen_count,
                'pengusulanPAKGraph' => $dataPengusulanGraph,
                'pengajuanPAKGraph' => $dataPengajuanPAKGraph,
            ];




        }

        //  TODO: data for Pegawai Role is Different! Jangan lupa tambahin nanti logikany, kalo lah bisa SSO
        if ($user->role == "Pegawai") {
            // NOTE: Dengan asumsi login dari SSO, Tambah logika jika tidak ditemukan nip sama dengan databse, gagal login
            $pegawai= Pegawai::where('NIP', $user->nip)->first(); //find or Fail
            $pengusulanPAK = PengusulanPAK::where('pegawai_nip', $pegawai->NIP);
            $prosesPAK = Pengajuan::whereHas('riwayat_pak', function ($query) use ($pegawai) {
                $query->where('pegawai_id', $pegawai->id);
            });

            $pak_count = $prosesPAK->where('status', 'divalidasi')->count();
            $arsip_dokumen_count = ArsipDokumen::where('pegawai_nip_owner', $pegawai->nip)->count();

            $dataPengusulanPAKGraph = [
                'Diproses' => $pengusulanPAK->where('status', 'diproses')->count(),
                'Disetujui' => $pengusulanPAK->where('status', 'disetujui')->count(),
                'Ditolak' => $pengusulanPAK->where('status', 'ditolak')->count(),
            ];

            // Pengajuan/Proses PAK
            $dataProsesPAKGraph = [
                'Diproses' => $prosesPAK->where('status', 'diajukan' )->count(),
                'Divalidasi' => $prosesPAK->where('status', 'divalidasi' )->count(),
                'Ditolak' => $prosesPAK->where('status', 'ditolak' )->count(),
            ];

            $dataByRole = [
                'PAKCount' => $pak_count,
                'pengusulanPAKCount' => $pengusulanPAK->count(),
                'prosesPAKCount' => $prosesPAK->count(),
                'arsipDokumenCount' => $arsip_dokumen_count,
                'pengusulanPAKGraph' => $dataPengusulanPAKGraph,
                'prosesPAKGraph' => $dataProsesPAKGraph,
            ];


        }

        return Inertia::render('Dashboard/AuthDashboard', [
            'title' => 'Dashboard',
            'dataGraph' => $dataGraph,
            'dataByRole' => $dataByRole,
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

    public function help_and_guide()
    {
        return Inertia::render('Help&Guide/Index', [
            'title' => 'Panduan & Bantuan',
        ]);
    }
}
