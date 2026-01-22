<?php

namespace App\Services;

use App\Models\User;
use App\Models\Target;
use App\Models\Akuisisi;
use App\Models\Transaksi;
use App\Models\Divisi;
use App\Models\Jabatan;
use App\Models\Produk;
use Illuminate\Support\Facades\DB;

class DataServices
{
    protected $currentYear;

    public function __construct()
    {
        $this->currentYear = date('Y');
    }

    /**
     * Data Khusus Administrator
     */
    public function getDataAdmin()
    {
        return [
            // GROUP 1: Quick Stats
            'masterData' => [
                'produk'  => Produk::count(),
                'user'    => User::count(),
                'divisi'  => Divisi::count(),
                'jabatan' => Jabatan::count(),
            ],

            // GROUP 2: Operational Stats
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

            // GROUP 4: Recent Activities
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
    }

    /**
     * Data Khusus Pegawai (Fokus ke diri sendiri)
     */
    public function getDataPegawai($user)
    {
        $userId = $user->id;

        // --- 1. Query Dasar ---
        $totalTarget = Target::where('user_id', $userId)->where('tahun', $this->currentYear)->count();
        $totalAkuisisi = Akuisisi::where('user_id', $userId)->count();
        $akuisisiVerified = Akuisisi::where('user_id', $userId)->where('status_verifikasi', 'verified')->count();
        $akuisisiRejected = Akuisisi::where('user_id', $userId)->where('status_verifikasi', 'rejected')->count();
        $akuisisiPending = Akuisisi::where('user_id', $userId)->where('status_verifikasi', 'pending')->count();

        // --- 2. Perbandingan Nominal ---
        $transaksiCount = Transaksi::where('user_id', $userId)->count();
        $totalNominalTarget = Target::where('user_id', $userId)->sum('nilai_target');
        $totalNominalRealisasi = Transaksi::where('user_id', $userId)->sum('nilai_realisasi');

        // --- 3. Grafik Tren Kinerja (Monthly Trend) ---
        $trendData = Transaksi::where('user_id', $userId)
            ->whereYear('tanggal_realisasi', $this->currentYear)
            ->selectRaw('MONTH(tanggal_realisasi) as bulan, SUM(nilai_realisasi) as total')
            ->groupBy('bulan')
            ->pluck('total', 'bulan')
            ->toArray();

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

        // --- 5. Grafik Performa Target vs Realisasi per Produk ---
        $produkIds = Target::where('user_id', $userId)->where('tahun', $this->currentYear)->pluck('produk_id')
            ->merge(Transaksi::where('user_id', $userId)->whereYear('created_at', $this->currentYear)->pluck('produk_id'))
            ->unique();

        $labelsProduk = [];
        $dataTargetPerProduk = [];
        $dataRealisasiPerProduk = [];

        foreach ($produkIds as $pid) {
            $produkName = Produk::where('id', $pid)->value('nama_produk') ?? 'Unknown';
            $tgt = Target::where('user_id', $userId)->where('tahun', $this->currentYear)->where('produk_id', $pid)->sum('nilai_target');
            $real = Transaksi::where('user_id', $userId)->whereYear('created_at', $this->currentYear)->where('produk_id', $pid)->sum('nilai_realisasi');

            $labelsProduk[] = $produkName;
            $dataTargetPerProduk[] = (int) $tgt;
            $dataRealisasiPerProduk[] = (int) $real;
        }

        // --- 6. Grafik Tren Poin ---
        $poinTrendData = Transaksi::where('user_id', $userId)
            ->whereYear('tanggal_realisasi', $this->currentYear)
            ->selectRaw('MONTH(tanggal_realisasi) as bulan, SUM(poin_didapat) as total_poin')
            ->groupBy('bulan')
            ->pluck('total_poin', 'bulan')
            ->toArray();

        $grafikPoin = [];
        for ($i = 1; $i <= 12; $i++) {
            $grafikPoin[] = (int) ($poinTrendData[$i] ?? 0);
        }

        return [
            'totalTarget' => $totalTarget,
            'akuisisiVerified' => $akuisisiVerified,
            'akuisisiRejected' => $akuisisiRejected,
            'akuisisiPending' => $akuisisiPending,
            'totalAkuisisi' => $totalAkuisisi,
            'transaksiCount' => $transaksiCount,
            'totalNominalTarget' => $totalNominalTarget,
            'totalNominalRealisasi' => $totalNominalRealisasi,
            'persenNasabah' => $totalTarget > 0 ? round(($transaksiCount / $totalTarget) * 100) : 0,
            'persenNominal' => $totalNominalTarget > 0 ? round(($totalNominalRealisasi / $totalNominalTarget) * 100) : 0,
            'grafikTren' => $grafikTren,
            'breakdownProduk' => $breakdownProduk,
            'grafikPerforma' => [
                'labels' => $labelsProduk,
                'target' => $dataTargetPerProduk,
                'realisasi' => $dataRealisasiPerProduk
            ],
            'grafikPoin' => $grafikPoin,
        ];
    }

    /**
     * Data Khusus Supervisor (Fokus ke Tim)
     */
    public function getDataSupervisor($user)
    {
        // 1. Cari Anggota Tim (Pakai Scope)
        $teamMemberIds = User::myTeamFromSPV($user)->pluck('id');

        // Widgets
        $pendingCount = Akuisisi::where('supervisor_id', $user->id)->where('status_verifikasi', 'pending')->count();
        $teamMembersCount = $teamMemberIds->count();
        $verifiedToday = Akuisisi::where('verifikator_id', $user->id)->where('status_verifikasi', 'verified')->whereDate('updated_at', now())->count();

        $sumTarget = Target::where('supervisor_id', $user->id)->where('tahun', $this->currentYear)->sum('nilai_target');
        $sumRealisasi = Transaksi::whereIn('user_id', $teamMemberIds)->whereYear('tanggal_realisasi', $this->currentYear)->sum('nilai_realisasi');
        $persenTercapai = $sumTarget > 0 ? ($sumRealisasi / $sumTarget) * 100 : 0;

        // Top Performer
        $topPerformerData = Transaksi::whereIn('user_id', $teamMemberIds)
            ->whereYear('tanggal_realisasi', $this->currentYear)
            ->selectRaw('user_id, SUM(nilai_realisasi) as total_omset')
            ->groupBy('user_id')
            ->orderByDesc('total_omset')
            ->with('pegawai:id,name,nip')
            ->first();

        // Top Produk
        $topProductData = Transaksi::whereIn('user_id', $teamMemberIds)
            ->whereYear('tanggal_realisasi', $this->currentYear)
            ->selectRaw('produk_id, COUNT(*) as total_transaksi')
            ->groupBy('produk_id')
            ->orderByDesc('total_transaksi')
            ->with('produk:id,nama_produk')
            ->first();

        // Grafik Performa Tim
        $produkIds = Target::where('supervisor_id', $user->id)->where('tahun', $this->currentYear)->pluck('produk_id')
            ->merge(Transaksi::whereIn('user_id', $teamMemberIds)->whereYear('tanggal_realisasi', $this->currentYear)->pluck('produk_id'))
            ->unique();

        $labelsProduk = [];
        $dataTarget = [];
        $dataRealisasi = [];

        foreach ($produkIds as $pid) {
            $prod = Produk::find($pid);
            if (!$prod) continue;

            $labelsProduk[] = $prod->nama_produk;
            $dataTarget[] = (int) Target::where('supervisor_id', $user->id)->where('tahun', $this->currentYear)->where('produk_id', $pid)->sum('nilai_target');
            $dataRealisasi[] = (int) Transaksi::whereIn('user_id', $teamMemberIds)->whereYear('tanggal_realisasi', $this->currentYear)->where('produk_id', $pid)->sum('nilai_realisasi');
        }

        // Grafik Poin Tim
        $poinTrendData = Transaksi::whereIn('user_id', $teamMemberIds)
            ->whereYear('tanggal_realisasi', $this->currentYear)
            ->selectRaw('MONTH(tanggal_realisasi) as bulan, SUM(poin_didapat) as total_poin')
            ->groupBy('bulan')->pluck('total_poin', 'bulan')->toArray();

        $grafikPoinTim = [];
        for ($i = 1; $i <= 12; $i++) {
            $grafikPoinTim[] = (int) ($poinTrendData[$i] ?? 0);
        }

        return [
            'pendingCount'      => $pendingCount,
            'teamMembersCount'  => $teamMembersCount,
            'verifiedToday'     => $verifiedToday,
            'sumTarget'         => $sumTarget,
            'sumRealisasi'      => $sumRealisasi,
            'persenTercapai'    => round($persenTercapai, 1),
            'topPerformer'      => $topPerformerData ? ['name' => $topPerformerData->pegawai->name, 'omset' => $topPerformerData->total_omset] : null,
            'topProduct'        => $topProductData ? ['name' => $topProductData->produk->nama_produk, 'count' => $topProductData->total_transaksi] : null,
            'grafikPerformaTim' => [
                'labels' => $labelsProduk,
                'target' => $dataTarget,
                'realisasi' => $dataRealisasi
            ],
            'grafikPoinTim'     => $grafikPoinTim,
        ];
    }

    /**
     * Data Khusus Kepala Cabang (Fokus Global Cabang)
     */
    public function getDataKepalaCabang()
    {
        // 1. Total Statistik Cabang (Existing)
        $totalRealisasiCabang = Transaksi::whereYear('tanggal_realisasi', $this->currentYear)->sum('nilai_realisasi');
        $totalTargetCabang = Target::where('tahun', $this->currentYear)->sum('nilai_target');

        // --- UPDATE: Total Nasabah (Hitung UNIK berdasarkan Nama) ---
        // Menggunakan distinct count agar Budi yang transaksi 2x tetap dihitung 1 nasabah
        $totalNasabahCabang = Akuisisi::whereYear('tanggal_akuisisi', $this->currentYear)
            ->distinct('nama_nasabah')
            ->count('nama_nasabah');

        // Total Transaksi (Count Frekuensi) untuk pembagi rata-rata
        $totalFrekuensiTransaksi = Transaksi::whereYear('tanggal_realisasi', $this->currentYear)->count();

        // 2. Top Performer Individual (Existing)
        $topPerformerData = Transaksi::whereYear('tanggal_realisasi', $this->currentYear)
            ->selectRaw('user_id, SUM(nilai_realisasi) as total_omset')
            ->groupBy('user_id')
            ->orderByDesc('total_omset')
            ->with('pegawai:id,name,nip')
            ->first();

        // 3. Top Produk (Existing)
        $topProductData = Transaksi::whereYear('tanggal_realisasi', $this->currentYear)
            ->selectRaw('produk_id, COUNT(*) as total_transaksi')
            ->groupBy('produk_id')
            ->orderByDesc('total_transaksi')
            ->with('produk:id,nama_produk')
            ->first();

        // --- NEW METRIC: RATA-RATA TRANSAKSI (AVG TICKET SIZE) ---
        $avgRealisasi = $totalFrekuensiTransaksi > 0
            ? $totalRealisasiCabang / $totalFrekuensiTransaksi
            : 0;

        // --- NEW METRIC: BEST DIVISION (Divisi dengan Realisasi Tertinggi) ---
        $bestDivisi = Divisi::all()->map(function($divisi) {
            $realisasi = Transaksi::whereHas('pegawai', function($q) use ($divisi) {
                $q->where('divisi_id', $divisi->id);
            })->whereYear('tanggal_realisasi', $this->currentYear)->sum('nilai_realisasi');

            return ['name' => $divisi->nama_divisi, 'val' => $realisasi];
        })->sortByDesc('val')->first();

        // --- NEW METRIC: BEST SUPERVISOR (Tim SPV dengan Realisasi Tertinggi) ---
        // Kita ambil semua user jabatan Supervisor, lalu hitung total omset timnya
        $bestSpv = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Supervisor'))
            ->get()
            ->map(function($spv) {
                // Manfaatkan Scope myTeamFromSPV yang canggih itu
                $teamIds = User::myTeamFromSPV($spv)->pluck('id');
                $teamRealisasi = Transaksi::whereIn('user_id', $teamIds)
                    ->whereYear('tanggal_realisasi', $this->currentYear)
                    ->sum('nilai_realisasi');

                return ['name' => $spv->name, 'val' => $teamRealisasi];
            })->sortByDesc('val')->first();

        // 4. Performa Per Divisi (Existing)
        $divisiPerformanceGraph = Divisi::all()->map(function ($divisi) {
            $targetDivisi = Target::whereHas('pegawai', function($q) use ($divisi) {
                $q->where('divisi_id', $divisi->id);
            })->where('tahun', $this->currentYear)->sum('nilai_target');

            $realisasiDivisi = Transaksi::whereHas('pegawai', function($q) use ($divisi) {
                $q->where('divisi_id', $divisi->id);
            })->whereYear('tanggal_realisasi', $this->currentYear)->sum('nilai_realisasi');

            return [
                'name' => $divisi->nama_divisi,
                'target' => (int) $targetDivisi,
                'realisasi' => (int) $realisasiDivisi
            ];
        });

        // 5. Tren Poin & Progress (Existing)
        $poinTrendData = Transaksi::whereYear('tanggal_realisasi', $this->currentYear)
            ->selectRaw('MONTH(tanggal_realisasi) as bulan, SUM(poin_didapat) as total_poin')
            ->groupBy('bulan')->pluck('total_poin', 'bulan')->toArray();

        $grafikPoinCabang = [];
        for ($i = 1; $i <= 12; $i++) {
            $grafikPoinCabang[] = (int) ($poinTrendData[$i] ?? 0);
        }
        $persenCabang = $totalTargetCabang > 0 ? ($totalRealisasiCabang / $totalTargetCabang) * 100 : 0;

        return [
            'totalRealisasiCabang' => $totalRealisasiCabang,
            'totalTargetCabang'    => $totalTargetCabang,
            'totalNasabahCabang'   => $totalNasabahCabang, // Ini skrg nasabah UNIK
            'persenCabang'         => round($persenCabang, 1),

            // Data Widget Baru
            'avgRealisasi'         => $avgRealisasi,
            'bestDivisi'           => $bestDivisi ? $bestDivisi : ['name' => '-', 'val' => 0],
            'bestSpv'              => $bestSpv ? $bestSpv : ['name' => '-', 'val' => 0],

            'topPerformer'         => $topPerformerData ? ['name' => $topPerformerData->pegawai->name, 'omset' => $topPerformerData->total_omset] : null,
            'topProduct'           => $topProductData ? ['name' => $topProductData->produk->nama_produk, 'count' => $topProductData->total_transaksi] : null,
            'divisiPerformanceGraph' => $divisiPerformanceGraph,
            'grafikPoinCabang'     => $grafikPoinCabang,
        ];
    }
}
