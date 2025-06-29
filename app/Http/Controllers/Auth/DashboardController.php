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
use App\Models\RiwayatKarir;
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

            $dataByRole = [
                'pegawaiFungsional' => array_sum($dataGraph),
                'PAKCount' => RiwayatPAK::count(),
                'noPAKTerakhir' => AturanPAK::where('name', 'No Surat Terakhir')->first()->value[0]['no_surat'],
                'userCount' => User::count(),
                'pegawaiCount' => Pegawai::count(),
                'pengusulanCount' => PengusulanPAK::count(),
                'pengajuanCount' => Pengajuan::count(),
                'riwayatKarirCount' => RiwayatKarir::count(),
                'arsipDokumenCount' => ArsipDokumen::byUser($this->user)->count(),
                'pengusulanPAKGraph' => [
                    'Diusulkan' => PengusulanPAK::where('status', 'diusulkan')->count(),
                    'Direvisi' => PengusulanPAK::where('status', 'direvisi')->count(),
                    'Ditolak' => PengusulanPAK::where('status', 'ditolak')->count(),
                    'Disetujui' => PengusulanPAK::where('status', 'disetujui')->count(),
                    'Selesai' => PengusulanPAK::where('status', 'selesai')->count(),
                ],
                'pengajuanPAKGraph' => [
                    'Diajukan' => Pengajuan::where('status', 'diajukan')->count(),
                    'Direvisi' => Pengajuan::where('status', 'direvisi')->count(),
                    'Ditolak' => Pengajuan::where('status', 'ditolak')->count(),
                    'Divalidasi' => Pengajuan::where('status', 'divalidasi')->count(),
                    'Selesai' => Pengajuan::where('status', 'selesai')->count(),
                ],
            ];
        }


        //  TODO: data for Pegawai Role is Different! Jangan lupa tambahin nanti logikany, kalo lah bisa SSO
        if ($role == "Pegawai") {
            $pegawai = Pegawai::byNIP($nip)->first(); //find or Fail
            if (!$pegawai) {
                return back()->withErrors(['nip' => 'Data pegawai dengan NIP ini belum terdaftar di sistem. Hubungi Divisi Sumber Daya Manusia.']);
            }
            // Pengajuan/Proses PAK
            $dataProsesPAKGraph = [
                'Diajukan' => Pengajuan::byPegawaiIdAndStatus($pegawai->id, 'diajukan')->count(),
                'Direvisi' => Pengajuan::byPegawaiIdAndStatus($pegawai->id, 'direvisi')->count(),
                'Ditolak' => Pengajuan::byPegawaiIdAndStatus($pegawai->id, 'ditolak')->count(),
                'Divalidasi' => Pengajuan::byPegawaiIdAndStatus($pegawai->id, 'divalidasi')->count(),
                'Selesai' => Pengajuan::byPegawaiIdAndStatus($pegawai->id, 'selesai')->count(),
            ];
            $dataByRole = [
                'PAKCount' => Pengajuan::byPegawaiId($pegawai->id)->count(),
                'pengusulanPAKCount' => PengusulanPAK::byPegawai($nip)->count(),
                'prosesPAKCount' => Pengajuan::byPegawaiId($pegawai->id)->count(),
                'riwayatKarirCount' => RiwayatKarir::count(),
                'arsipDokumenCount' => ArsipDokumen::byUser($this->user)->count(),
                'pengusulanPAKGraph' =>  [
                    'Diusulkan' => PengusulanPAK::byPegawaiAndStatus($nip, 'diusulkan')->count(),
                    'Direvisi' => PengusulanPAK::byPegawaiAndStatus($nip, 'direvisi')->count(),
                    'Ditolak' => PengusulanPAK::byPegawaiAndStatus($nip, 'ditolak')->count(),
                    'Disetujui' => PengusulanPAK::byPegawaiAndStatus($nip, 'disetujui')->count(),
                    'Selesai' => PengusulanPAK::byPegawaiAndStatus($nip, 'selesai')->count(),
                ],
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
