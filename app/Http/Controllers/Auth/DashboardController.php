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

    protected $user;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth_sso();
            return $next($request);
        });
    }

    public function dashboard()
    {
        $session = session();

        // Inisialisasi role dan nip
        $role = $this->user->role;
        $nip = $this->user->nip;

        $dataByRole = null;
        $dataGraph = null;

        if (($role == "Divisi SDM" || $role == "Pimpinan")) {
            $koefisien_per_tahun = AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value;
            $dataGraph = [];
            foreach ($koefisien_per_tahun as $koefisien) {
                $jabatan = $koefisien['jabatan'];
                $count = Pegawai::where('Jabatan/TMT', 'LIKE', "%{$jabatan}%")->count();
                $dataGraph[$jabatan] = $count;
            }




            $pegawai_fungsional = array_sum($dataGraph);
            //Ini berhasil
            // dd($dataGraph);
            // dd(class_exists(\App\Models\RiwayatPAK::class)); //berhasil, true
            // 2. Kalau true, tes query
            // dd(RiwayatPAK::count()); // Berhasil = 407

            $pak_count = RiwayatPAK::count();
            $no_pak_terakhir = AturanPAK::where('name', 'No Surat Terakhir')->first()->value;
            $user_count =  User::count();
            $pegawai_count =  Pegawai::count();
            $pengusulan_count = PengusulanPAK::count();
            $pengajuan_count = Pengajuan::count();
            $arsip_dokumen_count = ArsipDokumen::where('user_nip', $nip)->count();
            $dataPengusulanGraph = [
                'Diusulkan' => PengusulanPAK::where('status', 'diusulkan')->count(),
                'Direvisi' => PengusulanPAK::where('status', 'direvisi')->count(),
                'Ditolak' => PengusulanPAK::where('status', 'ditolak')->count(),
                'Disetujui' => PengusulanPAK::where('status', 'disetujui')->count(),
            ];

            $dataPengajuanPAKGraph = [
                'Diajukan' => Pengajuan::where('status', 'diajukan')->count(),
                'Direvisi' => Pengajuan::where('status', 'direvisi')->count(),
                'Ditolak' => Pengajuan::where('status', 'ditolak')->count(),
                'Divalidasi' => Pengajuan::where('status', 'divalidasi')->count(),
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
        // Kalo data ny dr SSO dan session ini gimana caranya ngab
        if ($role == "Pegawai") {
            // NOTE: Dengan asumsi login dari SSO, Tambah logika jika tidak ditemukan nip sama dengan databse, gagal login

            $pengusulanPAK = PengusulanPAK::byPegawai($nip);

            $pegawai = Pegawai::byNIP($nip)->first(); //find or Fail
            if (!$pegawai) {
                return back()->withErrors(['nip' => 'Data pegawai dengan NIP ini belum terdaftar di sistem. Hubungi Divisi Sumber Daya Manusia.']);
            }
            $prosesPAK = Pengajuan::byPegawaiId($pegawai->id);
            $pak_count = $prosesPAK->where('status', 'divalidasi')->count();
            $arsip_dokumen_count = ArsipDokumen::where('user_nip', $nip)->count();

            $dataPengusulanPAKGraph = [
                'Diusulkan' => PengusulanPAK::byPegawaiAndStatus($nip, 'diusulkan')->count(),
                'Disetujui' => PengusulanPAK::byPegawaiAndStatus($nip, 'disetujui')->count(),
                'Direvisi' => PengusulanPAK::byPegawaiAndStatus($nip, 'direvisi')->count(),
                'Ditolak' => PengusulanPAK::byPegawaiAndStatus($nip, 'ditolak')->count(),
            ];

            // Kenapa setelah kode diatas $dataPengusulanPAKGraph count ini malah jadi 0 ?


            // Pengajuan/Proses PAK
            $dataProsesPAKGraph = [
                'Diajukan' => Pengajuan::byPegawaiIdAndStatus($pegawai->id, 'diajukan')->count(),
                'Divalidasi' => Pengajuan::byPegawaiIdAndStatus($pegawai->id, 'divalidasi')->count(),
                'Ditolak' => Pengajuan::byPegawaiIdAndStatus($pegawai->id, 'ditolak')->count(),
            ];
            // dd($pengusulanPAK->count);
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
        $filePath = public_path('storage/PANDUAN_SIPACAK.pdf');

        if (!file_exists($filePath)) {
            abort(404, 'File tidak ditemukan');
        }

        return redirect('/storage/PANDUAN_SIPACAK.pdf');
    }
}
