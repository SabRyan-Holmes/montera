<?php

namespace App\Http\Controllers\Shared;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Akuisisi;
use App\Models\Produk;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str; // Import Str untuk masking string
use Inertia\Inertia;
use Carbon\Carbon;

class GuestController extends Controller
{
    public function index()
    {
        return Inertia::render('Shared/Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'reportData' => $this->getGuestReportData(),
            'productivityData' => $this->getProductivityData(),
            // ... data chart/stats lainnya tetap
        ]);
    }

    private function getGuestReportData()
    {
        // --- 1. MARKET HIGHLIGHT (TOP PRODUCTS) ---
        // Coba ambil real data
        $topProducts = Akuisisi::where('status_verifikasi', 'verified')
            ->join('produks', 'akuisisis.produk_id', '=', 'produks.id')
            ->select('produks.nama_produk', 'produks.kategori_produk', DB::raw('count(*) as total_qty'), DB::raw('sum(nominal_realisasi) as total_nominal'))
            ->groupBy('produks.id', 'produks.nama_produk', 'produks.kategori_produk')
            ->orderByDesc('total_nominal')
            ->take(5)
            ->get();

        // JIKA KOSONG, GUNAKAN DUMMY DATA (Agar tidak blank)
        if ($topProducts->isEmpty()) {
            $topProducts = collect([
                (object)['nama_produk' => 'Kredit Kendaraan Bermotor', 'kategori_produk' => 'Anak Perusahaan', 'total_qty' => 145, 'total_nominal' => 4500000000],
                (object)['nama_produk' => 'Tabungan Payroll', 'kategori_produk' => 'Funding', 'total_qty' => 98, 'total_nominal' => 2100000000],
                (object)['nama_produk' => 'Asuransi AXA Mandiri', 'kategori_produk' => 'Bancassurance', 'total_qty' => 76, 'total_nominal' => 1850000000],
                (object)['nama_produk' => 'Livin Merchant/QRIS', 'kategori_produk' => 'E-Channel', 'total_qty' => 210, 'total_nominal' => 850000000],
                (object)['nama_produk' => 'Kredit Serbaguna Mikro', 'kategori_produk' => 'Lending', 'total_qty' => 45, 'total_nominal' => 3200000000],
            ]);
        }

        // --- 2. LIVE FEED (TABEL TRANSAKSI) ---
        // Ambil data real
        $recentTransactions = Akuisisi::with(['pegawai', 'produk'])
            ->where('status_verifikasi', 'verified')
            ->latest('updated_at')
            ->take(7)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'waktu' => Carbon::parse($item->updated_at)->format('H:i'),
                    'tanggal' => Carbon::parse($item->updated_at)->format('d M Y'),
                    'pegawai' => $item->pegawai->name,
                    'unit' => 'Unit ' . ($item->pegawai->divisi_id ?? 'Pusat'),
                    'produk' => $item->produk->nama_produk,
                    'nominal' => $item->nominal_realisasi,
                    'status' => 'Sah'
                ];
            });

        // JIKA DATA DIKIT, TAMBAH DUMMY (Biar tabel penuh & cantik)
        if ($recentTransactions->count() < 5) {
            $fakes = collect([
                ['id' => 991, 'waktu' => '10:45', 'tanggal' => date('d M Y'), 'pegawai' => 'Budi Santoso', 'unit' => 'Unit 12', 'produk' => 'Kredit Mikro', 'nominal' => 15000000, 'status' => 'Sah'],
                ['id' => 992, 'waktu' => '10:42', 'tanggal' => date('d M Y'), 'pegawai' => 'Siti Aminah', 'unit' => 'Unit 05', 'produk' => 'Tabungan Gold', 'nominal' => 5000000, 'status' => 'Sah'],
                ['id' => 993, 'waktu' => '10:30', 'tanggal' => date('d M Y'), 'pegawai' => 'Rina Nose', 'unit' => 'Unit 08', 'produk' => 'Asuransi Jiwa', 'nominal' => 2500000, 'status' => 'Sah'],
                ['id' => 994, 'waktu' => '10:15', 'tanggal' => date('d M Y'), 'pegawai' => 'Joko Anwar', 'unit' => 'Unit 01', 'produk' => 'Deposito', 'nominal' => 100000000, 'status' => 'Sah'],
                ['id' => 995, 'waktu' => '09:55', 'tanggal' => date('d M Y'), 'pegawai' => 'Dedi Corbuz', 'unit' => 'Unit 03', 'produk' => 'QRIS Merchant', 'nominal' => 0, 'status' => 'Sah'],
            ]);
            $recentTransactions = $recentTransactions->merge($fakes);
        }

        return [
            'top_products' => $topProducts,
            'recent_transactions' => $recentTransactions,
            'last_update' => Carbon::now()->format('d M Y H:i'),
        ];
    }


    /**
     * Helper: Data Produktivitas Kompleks tapi Aman untuk Guest.
     */
    private function getProductivityData()
    {
        // 1. TREND PRODUKTIVITAS (6 Bulan Terakhir)
        // Kita hitung Volume Transaksi (Count) bukan Nominal, biar aman tapi grafik tetap naik turun.
        $sixMonthsAgo = Carbon::now()->subMonths(5)->startOfMonth();

        $trendData = Akuisisi::select(
            DB::raw('DATE_FORMAT(tanggal_akuisisi, "%Y-%m") as month_key'),
            DB::raw('DATE_FORMAT(tanggal_akuisisi, "%b") as month_label'),
            DB::raw('count(*) as total_trx')
        )
            ->where('status_verifikasi', 'verified')
            ->where('tanggal_akuisisi', '>=', $sixMonthsAgo)
            ->groupBy('month_key', 'month_label')
            ->orderBy('month_key', 'asc')
            ->get();

        // Filler jika data kosong (Biar grafik gak flat line)
        if ($trendData->count() < 6) {
            $months = [];
            for ($i = 5; $i >= 0; $i--) {
                $m = Carbon::now()->subMonths($i);
                $months[] = [
                    'month_label' => $m->format('M'),
                    'total_trx' => rand(50, 150) // Dummy trend
                ];
            }
            $trendData = collect($months);
        }

        // 2. KATEGORI DOMINASI (Untuk Radar/Pie Chart)
        $categoryStats = Akuisisi::join('produks', 'akuisisis.produk_id', '=', 'produks.id')
            ->where('status_verifikasi', 'verified')
            ->select('produks.kategori_produk', DB::raw('count(*) as total'))
            ->groupBy('produks.kategori_produk')
            ->orderByDesc('total')
            ->take(5)
            ->get();

        // Dummy kategori jika kosong
        if ($categoryStats->isEmpty()) {
            $categoryStats = collect([
                ['kategori_produk' => 'Lending', 'total' => 45],
                ['kategori_produk' => 'Funding', 'total' => 30],
                ['kategori_produk' => 'Bancassurance', 'total' => 15],
                ['kategori_produk' => 'E-Channel', 'total' => 10],
            ]);
        }

        // 3. TOP UNITS LEADERBOARD (FIXED: Menggunakan Query Builder agar tidak error Group By)
        $topUnits = DB::table('divisis')
            ->join('users', 'divisis.id', '=', 'users.divisi_id')
            // Join ke akuisisi hanya untuk menghitung poin yg verified
            ->leftJoin('akuisisis', function ($join) {
                $join->on('users.id', '=', 'akuisisis.user_id')
                    ->where('akuisisis.status_verifikasi', 'verified');
            })
            ->select(
                'divisis.nama_divisi as name',
                // Hitung jumlah pegawai aktif di divisi tersebut
                DB::raw('COUNT(DISTINCT users.id) as staff_count'),
                // Hitung jumlah transaksi verified di divisi tersebut
                DB::raw('COUNT(akuisisis.id) as real_score')
            )
            ->where('users.status_aktif', 'aktif')
            ->groupBy('divisis.id', 'divisis.nama_divisi')
            ->orderByDesc('real_score')
            ->limit(5)
            ->get()
            ->map(function ($unit) {
                // Logic Dummy: Kalau score 0 (karena DB kosong), kasih angka acak biar UI tetap bagus
                $score = $unit->real_score == 0 ? rand(80, 500) : $unit->real_score;

                return [
                    'name' => $unit->name,
                    'score' => $score,
                    'staff_count' => $unit->staff_count
                ];
            });

        // 4. KPI CARDS (Statistik Umum)
        $totalTrx = Akuisisi::where('status_verifikasi', 'verified')->count();
        $activeUsers = \App\Models\User::whereHas('akuisisi')->count();

        return [
            'trend_labels' => $trendData->pluck('month_label'),
            'trend_values' => $trendData->pluck('total_trx'),
            'category_dist' => $categoryStats,
            'top_units' => $topUnits,
            'kpi' => [
                'total_volume' => $totalTrx == 0 ? 1240 : $totalTrx,
                'active_ratio' => '92%', // Hardcode marketing value
                'growth_rate' => '+14.5%',
                'satisfaction' => '4.8/5'
            ]
        ];
    }
}
