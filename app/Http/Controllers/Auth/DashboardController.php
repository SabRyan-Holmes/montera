<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Exports\PegawaiExport;
use App\Http\Controllers\Controller;
use App\Models\Akuisisi;
use App\Models\Divisi;
use App\Models\Jabatan;
use App\Models\Produk;
use App\Models\Target;
use App\Models\Transaksi;
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
        $nip = $this->user->nip;
        $role = $this->user->jabatan->nama_jabatan;
        $isAtasan = in_array($role, ["Administrator", "Kepala Cabang", "Supervisor"]);

        $dataByRole = null;

        // Pastikan ini ada di AdminController
        if ($role === "Administrator") {
            $dataByRole = [
                // GROUP 1: Quick Stats (Counter Sederhana)
                'masterData' => [
                    'produk'    => Produk::count(),
                    'user'      => User::count(),
                    'divisi'    => Divisi::count(),
                    'jabatan'   => Jabatan::count(),
                ],

                // GROUP 2: Operational Stats (Highlight Utama)
                'operationalData' => [
                    'total_target'    => Target::count(),
                    'total_akuisisi'  => Akuisisi::count(),
                    'total_transaksi' => Transaksi::count(),
                ],

                // GROUP 3: Charts Data
                'akuisisiGraph' => [
                    'Verified' => Akuisisi::where('status_verifikasi', 'verified')->count(),
                    'Pending'  => Akuisisi::where('status_verifikasi', 'pending')->count(),
                    'Rejected' => Akuisisi::where('status_verifikasi', 'rejected')->count(),
                ],

                'userDivisiGraph' => Divisi::withCount('users')->get()->map(function ($divisi) {
                    return [
                        'name'  => $divisi->nama_divisi,
                        'count' => $divisi->users_count
                    ];
                }),

                // GROUP 4: Recent Activities (Opsional tapi nice to have)
                'recentActivities' => Akuisisi::with(['pegawai', 'produk'])
                    ->latest()
                    ->take(5)
                    ->get()
                    ->map(function ($a) {
                        return [
                            'id' => $a->id,
                            'user' => $a->pegawai->name,
                            'produk' => $a->produk->nama_produk,
                            'status' => $a->status_verifikasi,
                            'time' => $a->created_at->diffForHumans()
                        ];
                    }),
            ];
        } else if ($role === "Pegawai") {
            $userId = $this->user->id;
            $currentYear = date('Y');

            // --- 1. Query Dasar ---
            $totalTarget = Target::where('user_id', $userId)->where('tahun', $currentYear)->count();
            $totalAkuisisi = Akuisisi::where('user_id', $userId)->count();
            $akuisisiVerified = Akuisisi::where('user_id', $userId)->where('status_verifikasi', 'verified')->count();
            $akuisisiRejected = Akuisisi::where('user_id', $userId)->where('status_verifikasi', 'rejected')->count();

            // Hitung Pending (Total - Verified - Rejected) atau query langsung
            $akuisisiPending = Akuisisi::where('user_id', $userId)->where('status_verifikasi', 'pending')->count();

            // --- 2. Perbandingan Nominal ---
            $transaksiCount = Transaksi::where('user_id', $userId)->count();
            $totalNominalTarget = Target::where('user_id', $userId)->sum('nilai_target');
            $totalNominalRealisasi = Transaksi::where('user_id', $userId)->sum('nilai_realisasi');

            // --- 3. Grafik Tren Kinerja (Monthly Trend - Tahun Ini) ---
            // Mengelompokkan total realisasi berdasarkan bulan
            $trendData = Transaksi::where('user_id', $userId)
                ->whereYear('tanggal_realisasi', $currentYear)
                ->selectRaw('MONTH(tanggal_realisasi) as bulan, SUM(nilai_realisasi) as total')
                ->groupBy('bulan')
                ->orderBy('bulan')
                ->pluck('total', 'bulan')
                ->toArray();

            // Mapping agar bulan 1-12 lengkap (isi 0 jika tidak ada data)
            $grafikTren = [];
            for ($i = 1; $i <= 12; $i++) {
                $grafikTren[] = $trendData[$i] ?? 0;
            }

            // --- 4. Breakdown Per Jenis Produk (Pie Chart) ---
            $breakdownProduk = Transaksi::where('user_id', $userId)
                ->join('produks', 'transaksis.produk_id', '=', 'produks.id')
                ->selectRaw('produks.kategori_produk as kategori, COUNT(*) as jumlah')
                ->groupBy('kategori')
                ->get()
                ->map(function ($item) {
                    return [
                        'label' => $item->kategori,
                        'value' => $item->jumlah
                    ];
                });

            $dataByRole = [
                'totalTarget' => $totalTarget,
                'akuisisiVerified' => $akuisisiVerified,
                'akuisisiRejected' => $akuisisiRejected,
                'akuisisiPending' => $akuisisiPending, // Tambahan variable
                'totalAkuisisi' => $totalAkuisisi,
                'transaksiCount' => $transaksiCount,
                'totalNominalTarget' => $totalNominalTarget,
                'totalNominalRealisasi' => $totalNominalRealisasi,

                // Data Presentase untuk Radial Chart (Handle division by zero)
                'persenNasabah' => $totalTarget > 0 ? round(($transaksiCount / $totalTarget) * 100) : 0,
                'persenNominal' => $totalNominalTarget > 0 ? round(($totalNominalRealisasi / $totalNominalTarget) * 100) : 0,

                // Data Grafik
                'grafikTren' => $grafikTren, // Array [12000, 50000, 0, ...]
                'breakdownProduk' => $breakdownProduk, // Array Object [{label: 'Funding', value: 10}, ...]
            ];
        } else if ($role === "Supervisor") {
            // Logic dipisah ke function bawah biar clean
            $dataByRole = $this->getDataSupervisor($this->user);
        } else if ($role === "Kepala Cabang") {
            $dataByRole = [
                // Statistik Utama Cabang
                'totalRealisasiCabang' => Transaksi::sum('nilai_realisasi'),
                'totalTargetCabang'    => Target::sum('nilai_target'),
                'totalNasabahCabang'   => Transaksi::count(), // Total NOA sah
                'topPerformer'         => User::role('Pegawai')
                    ->withCount('transaksi')
                    ->orderBy('transaksi_count', 'desc')
                    ->first(),

                // Data Grafik: Capaian per Divisi (Bar Chart)
                'divisiPerformanceGraph' => Divisi::with(['users.transaksi'])->get()->map(function ($divisi) {
                    return [
                        'name' => $divisi->nama_divisi,
                        'realisasi' => $divisi->users->flatMap->transaksi->sum('nilai_realisasi'),
                        'target' => $divisi->users->flatMap->target->sum('nilai_target'),
                    ];
                }),

                // Data Grafik: Progres Keseluruhan Cabang (Radial)
                'cabangProgressGraph' => [
                    'Tercapai' => 85, // Persentase total realisasi vs target cabang
                    'Sisa'     => 15
                ]
            ];
        }

        return Inertia::render('Shared/Dashboard/AuthDashboard', [
            'title' => 'Dashboard',
            'dataByRole' => $dataByRole,
        ]);
    }

    /**
     * Helper untuk mengambil data dashboard khusus Supervisor
     * Logic: Berdasarkan Direct Assignment (supervisor_id), bukan Divisi.
     */

    private function getDataSupervisor($user)
    {

        // 1. ANTREAN VERIFIKASI
        // Cari Akuisisi yang diajukan ke SAYA (supervisor_id) dan statusnya pending
        $pendingCount = Akuisisi::where('supervisor_id', $user->id)
            ->where('status_verifikasi', 'pending')
            ->count();

        // 2. TOTAL ANGGOTA TIM
        // User yang punya Target aktif yang dibuat oleh SAYA tahun ini
        $teamMembersCount = User::whereHas('targets', function ($q) use ($user) {
            $q->where('supervisor_id', $user->id);
        })->count();

        // 3. DIVERIFIKASI HARI INI
        // Ini tetap pakai 'verifikator_id' karena kita menghitung AKSI yang dilakukan user hari ini
        $verifiedToday = Akuisisi::where('verifikator_id', $user->id)
            ->where('status_verifikasi', 'verified')
            ->whereDate('updated_at', now())
            ->count();

        // 4. TOTAL TARGET TIM (Count Item Target)
        // Target yang dibuat oleh SAYA tahun ini
        $totalTeamTargetCount = Target::where('supervisor_id', $user->id)
            ->count();

        // --- DATA GRAFIK STATUS ---
        // Ambil rekap status dari Akuisisi yang ditujukan ke SAYA
        $statusStats = Akuisisi::where('supervisor_id', $user->id)
            ->selectRaw('status_verifikasi, count(*) as total')
            ->groupBy('status_verifikasi')
            ->pluck('total', 'status_verifikasi')
            ->toArray();

        // --- DATA PROGRESS NOMINAL TIM ---
        // A. Total Nominal Target Tim Saya
        $sumTarget = Target::where('supervisor_id', $user->id)
            ->sum('nilai_target');

        // B. Total Nominal Realisasi (Akuisisi Verified) Tim Saya
        $sumRealisasi = Akuisisi::where('supervisor_id', $user->id)
            ->where('status_verifikasi', 'verified')
            ->sum('nominal_realisasi');

        // Hitung Persentase Capaian
        $persenTercapai = $sumTarget > 0 ? ($sumRealisasi / $sumTarget) * 100 : 0;
        // Cap max 100% untuk grafik pie chart (sisanya 0)
        $persenTercapaiGraph = $persenTercapai > 100 ? 100 : $persenTercapai;
        $persenSisa = 100 - $persenTercapaiGraph;

        return [
            'pendingVerification' => $pendingCount,
            'totalTeamMembers'    => $teamMembersCount,
            'verifiedToday'       => $verifiedToday,
            'totalTeamTarget'     => $totalTeamTargetCount,

            // Data Grafik Status (Default 0 jika tidak ada data)
            'verificationRateGraph' => [
                'Verified' => $statusStats['verified'] ?? 0,
                'Pending'  => $statusStats['pending']  ?? 0,
                'Rejected' => $statusStats['rejected'] ?? 0,
            ],

            // Data Grafik Progress (Real calculation)
            'teamProgressGraph' => [
                'Tercapai' => round($persenTercapaiGraph, 1),
                'Sisa'     => round($persenSisa, 1),
                // Data tambahan untuk tooltip frontend
                'NominalTercapai' => $sumRealisasi,
                'NominalTarget'   => $sumTarget,
                'PersenAsli'      => round($persenTercapai, 1) // Bisa lebih dari 100%
            ]
        ];
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
            $columns = DB::getSchemaBuilder()->getColumnListing('jabatans');
            fputcsv($handle, $columns);

            // Mengambil data dari tabel database
            $data = DB::table('jabatans')->get(); // Ganti dengan nama tabel Anda

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
        // $filePath = public_path('storage/PANDUAN_SIPACAK.pdf');

        // if (!file_exists($filePath)) {
        //     abort(404, 'File tidak ditemukan');
        // }

        // return redirect('/storage/PANDUAN_SIPACAK.pdf');
    }

    public function main_log()
    {
        return redirect()->back();

        // $filePath = public_path('storage/PANDUAN_SIPACAK.pdf');

        // if (!file_exists($filePath)) {
        //     abort(404, 'File tidak ditemukan');
        // }

        // return redirect('/storage/PANDUAN_SIPACAK.pdf');
    }
}
