<?php

namespace App\Http\Controllers\KepalaCabang;

use App\Http\Controllers\Controller;
use App\Models\Akuisisi;
use App\Models\Divisi;
use App\Models\Produk;
use App\Models\Target;
use App\Models\Transaksi;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KepalaCabangController extends Controller
{

    public function summary()
    {
        // 1. Performa per Kategori Produk (Pie Chart)
        $performanceByKategori = Akuisisi::where('status_verifikasi', 'verified')
            ->with('produk:id,kategori')
            ->get()
            ->groupBy('produk.kategori')
            ->map(function ($item, $key) {
                return [
                    'kategori' => $key,
                    'total' => (float) $item->sum('nominal_realisasi')
                ];
            })->values();

        // 2. Trend Bulanan (Bar Chart)
        $monthlyTrend = Akuisisi::where('status_verifikasi', 'verified')
            ->whereYear('tanggal_akuisisi', date('Y'))
            ->get()
            ->groupBy(fn($date) => \Carbon\Carbon::parse($date->tanggal_akuisisi)->format('M'))
            ->map(function ($item, $key) {
                return [
                    'bulan' => $key,
                    'total' => (float) $item->sum('nominal_realisasi')
                ];
            })->values();

        // 3. Top 5 Pegawai (Leaderboard)
        $topPegawai = Akuisisi::where('status_verifikasi', 'verified')
            ->with(['pegawai' => function ($q) {
                $q->select('id', 'name', 'divisi_id')->with('divisi:id,nama_divisi'); // Load Divisi Pegawai
            }])
            ->select('user_id', DB::raw('SUM(nominal_realisasi) as total_capaian'))
            ->groupBy('user_id')
            ->orderByDesc('total_capaian')
            ->limit(5)
            ->get();

        // 4. [BARU] Performa per Divisi (Untuk Komparasi Unit Kerja)
        // Logikanya: Ambil semua divisi, hitung total realisasi user di dalamnya
        $divisiPerformance = Divisi::with(['users.akuisisi' => function ($q) {
            $q->where('status_verifikasi', 'verified');
        }])->get()
            ->map(function ($divisi) {
                // Ratakan (flatten) semua akuisisi dari semua user di divisi ini
                $totalRealisasi = $divisi->users->flatMap->akuisisis->sum('nominal_realisasi');
                return [
                    'nama_divisi' => $divisi->nama_divisi,
                    'total_realisasi' => (float) $totalRealisasi
                ];
            })->sortByDesc('total_realisasi') ->values();

        // 5. [BARU] Quick Stats (Angka Besar di Atas)
        $quickStats = [
            'total_realisasi_tahun_ini' => Akuisisi::where('status_verifikasi', 'verified')
                ->whereYear('tanggal_akuisisi', date('Y'))
                ->sum('nominal_realisasi'),
            'total_nasabah_baru' => Akuisisi::where('status_verifikasi', 'verified')
                ->whereYear('tanggal_akuisisi', date('Y'))
                ->count(),
            'avg_realisasi_per_trx' => Akuisisi::where('status_verifikasi', 'verified')
                ->avg('nominal_realisasi') ?? 0,
        ];

        return Inertia::render('KepalaCabang/Monitoring/Ringkasan', [
            'title' => "Executive Summary",
            'chartData' => $performanceByKategori,
            'trendData' => $monthlyTrend,
            'ranking'   => $topPegawai,
            'divisiData' => $divisiPerformance, // Data Baru
            'quickStats' => $quickStats // Data Baru
        ]);
    }


    public function realisasi()
    {
        // 1. Hitung Total Target Cabang (Semua Pegawai)
        $totalTarget = Target::sum('nilai_target');

        // 2. Hitung Total Transaksi Sah (Verified Only)
        $totalRealisasi = Transaksi::sum('nilai_realisasi');

        // 3. Hitung Selisih (Gap)
        $gap = $totalTarget - $totalRealisasi; // Jika positif berarti kurang, negatif berarti surplus

        // 4. Hitung Persentase (Safety Division by Zero)
        $persentase = $totalTarget > 0 ? round(($totalRealisasi / $totalTarget) * 100, 1) : 0;

        // 5. Analisis Perbandingan per Kategori Produk (Strategic Insight)
        // Kita bandingkan realisasi per kategori produk (Kredit, Tabungan, dll)
        $breakdownProduk = Produk::select('kategori')
            ->distinct()
            ->get()
            ->map(function ($kategori) {
                $namaKategori = $kategori->kategori;

                // Ambil realisasi spesifik kategori ini
                $realisasiKategori = Transaksi::whereHas('produk', function ($q) use ($namaKategori) {
                    $q->where('kategori', $namaKategori);
                })->sum('nilai_realisasi');

                return [
                    'kategori' => $namaKategori,
                    'realisasi' => $realisasiKategori,
                    // Note: Target biasanya diset global per user, susah dipecah per produk kecuali ada field khusus.
                    // Jadi di sini kita fokus kontribusi kategori terhadap total realisasi.
                ];
            });

        return Inertia::render('KepalaCabang/Monitoring/Realisasi', [
            'title' => "Monitoring Realisasi",
            'overview' => [
                'total_target' => $totalTarget,
                'total_realisasi' => $totalRealisasi,
                'gap' => $gap,
                'persentase' => $persentase,
                'status' => $persentase >= 100 ? 'Achieved' : 'On Progress'
            ],
            'breakdown' => $breakdownProduk
        ]);
    }


    public function divisi()
    {
        return Inertia::render('KepalaCabang/Monitoring/Divisi', [
            "title" => "Grafik Performa Divisi",
        ]);
    }

    public function pegawai_rank()
    {
        return Inertia::render('KepalaCabang/EvaluasiSDM/PegawaiRank', [
            "title" => "Leaderboard Pegawai berdasarkan Kinerja",
        ]);
    }

    public function pegawai_promotion()
    {
        return Inertia::render('KepalaCabang/EvaluasiSDM/PegawaiPromotion', [
            "title" => "Leaderboard Pegawai berdasarkan Kinerja",
        ]);
    }

    public function final_report()
    {
        return Inertia::render('KepalaCabang/Report/FinalReport', [
            "title" => "Detail Transaksi Tervalidasi",
        ]);
    }

    public function export_data()
    {
        return Inertia::render('KepalaCabang/Report/ExportData', [
            "title" => "Data Realisasi untuk keperluan rapat koordinasi wilayah",
        ]);
    }
}
