<?php

namespace App\Http\Controllers\KepalaCabang;

use App\Http\Controllers\Controller;
use App\Models\Akuisisi;
use App\Models\Divisi;
use App\Models\Produk;
use App\Models\Target;
use App\Models\Transaksi;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Stringable;
use Inertia\Inertia;

class KepalaCabangController extends Controller
{

    public function summary(Request $request)
    {
        // FILTER: Ambil dari request, default NULL (artinya All Time)
        $year   = $request->input('year');
        $month  = $request->input('month');

        // Helper Closure untuk Filter Tanggal Dinamis
        // Dipakai berulang-ulang di setiap query
        $dateFilter = function ($query) use ($year, $month) {
            $query->where('status_verifikasi', 'verified'); // Selalu verified

            if ($year) {
                $query->whereYear('tanggal_akuisisi', $year);
            }
            if ($month) {
                $query->whereMonth('tanggal_akuisisi', $month);
            }
        };

        // 1. Performa per Kategori Produk (Pie Chart)
        $performanceByKategori = Akuisisi::where($dateFilter) // Pakai helper tadi
            ->with('produk:id,nama_produk,kategori_produk')
            ->get()
            ->groupBy('produk.kategori_produk')
            ->map(function ($items, $kategori) {
                return [
                    'kategori' => $kategori,
                    'total' => (float) $items->sum('nominal_realisasi'),
                ];
            })->values();

        // 2. Trend Pertumbuhan (Bar Chart)
        // Diurutkan berdasarkan waktu agar grafik timeline-nya benar (Jan 2024 -> Feb 2024 -> ... -> Jan 2025)
        $monthlyTrend = Akuisisi::where($dateFilter)
            ->orderBy('tanggal_akuisisi', 'asc')
            ->get()
            ->groupBy(fn($date) => Carbon::parse($date->tanggal_akuisisi)->format('M Y')) // Format: "Jan 2025"
            ->map(function ($items, $bulan) {
                return [
                    'bulan' => $bulan,
                    'total' => (float) $items->sum('nominal_realisasi')
                ];
            })->values();

        // 3. Top 5 Pegawai (Leaderboard)
        // Logic: Cari User yg punya akuisisi (sesuai filter), lalu hitung jumlahnya
        $topPegawai = User::whereHas('akuisisi', fn($q) => $dateFilter($q))
            ->with('divisi:id,nama_divisi')
            ->withSum(['akuisisi' => fn($q) => $dateFilter($q)], 'nominal_realisasi')
            ->withCount(['akuisisi' => fn($q) => $dateFilter($q)])
            ->orderByDesc('akuisisi_sum_nominal_realisasi')
            ->limit(5)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'nip' => $user->nip,
                    'divisi' => $user->divisi->nama_divisi ?? 'Tanpa Divisi',
                    'total_capaian' => (float) $user->akuisisi_sum_nominal_realisasi,
                    'total_transaksi' => $user->akuisisi_count
                ];
            });

        // 4. Performa per Divisi
        // Logic: Divisi -> User -> Sum Akuisisi (Sesuai Filter)
        $divisiPerformance = Divisi::with(['users' => function ($q) use ($dateFilter) {
            $q->withSum(['akuisisi' => fn($sq) => $dateFilter($sq)], 'nominal_realisasi');
        }])
            ->get()
            ->map(function ($divisi) {
                // Jumlahkan hasil withSum dari setiap user di divisi ini
                $totalDivisi = $divisi->users->sum('akuisisi_sum_nominal_realisasi');
                return [
                    'nama_divisi' => $divisi->nama_divisi,
                    'kode_divisi' => $divisi->kode_divisi,
                    'total_realisasi' => (float) $totalDivisi
                ];
            })
            ->sortByDesc('total_realisasi')
            ->values();

        // 5. Quick Stats
        $quickStats = [
            'total_realisasi' => Akuisisi::where($dateFilter)->sum('nominal_realisasi'),

            'total_nasabah' => Akuisisi::where($dateFilter)
                ->distinct('no_identitas_nasabah')
                ->count('no_identitas_nasabah'),

            'avg_per_trx' => Akuisisi::where($dateFilter)->avg('nominal_realisasi') ?? 0,

            'total_trx' => Akuisisi::where($dateFilter)->count()
        ];

        // Judul Dinamis
        $title = "Executive Summary";
        if ($year) $title .= " - Tahun " . $year;
        else $title .= " (All Time)";

        return Inertia::render('KepalaCabang/Monitoring/Ringkasan', [
            'title' => $title,
            'filters' => ['year' => $year, 'month' => $month], // Kirim balik state filter
            'chartData' => $performanceByKategori,
            'trendData' => $monthlyTrend,
            'ranking'   => $topPegawai,
            'divisiData' => $divisiPerformance,
            'quickStats' => $quickStats
        ]);
    }

    public function realisasi(Request $request)
    {
        // 1. FILTER DYNAMIC (Default: All Time)
        $year   = $request->input('year');
        $month  = $request->input('month');

        // Helper Closure: Filter Akuisisi (Core Logic)
        $akuisisiFilter = function ($query) use ($year, $month) {
            $query->where('status_verifikasi', 'verified');

            if ($year) $query->whereYear('tanggal_akuisisi', $year);
            if ($month) $query->whereMonth('tanggal_akuisisi', $month);
        };

        // 2. HITUNG OVERVIEW (KPI)
        // Target (Jika filter tahun aktif, ambil target tahun itu. Jika all time, sum semua)
        $totalTarget = Target::query()
            ->when($year, fn($q) => $q->where('tahun', $year))
            ->sum('nilai_target');

        // Realisasi (Verified Only)
        $totalRealisasi = Akuisisi::where($akuisisiFilter)->sum('nominal_realisasi');

        // Gap & Persentase
        $gap = $totalTarget - $totalRealisasi;
        $persentase = $totalTarget > 0 ? round(($totalRealisasi / $totalTarget) * 100, 1) : 0;

        // Status Label
        $status = 'On Progress';
        if ($persentase >= 100) $status = 'Achieved';
        if ($totalTarget == 0 && $totalRealisasi > 0) $status = 'Surplus (No Target)';

        // 3. BREAKDOWN PER KATEGORI (Pie Chart Data)
        $breakdownKategori = Produk::select('kategori_produk')
            ->distinct()
            ->get()
            ->map(function ($prod) use ($akuisisiFilter) {
                $realisasi = Akuisisi::where($akuisisiFilter)
                    ->whereHas('produk', fn($q) => $q->where('kategori_produk', $prod->kategori_produk))
                    ->sum('nominal_realisasi');

                return [
                    'label' => $prod->kategori_produk,
                    'value' => (float) $realisasi,
                ];
            })
            ->sortByDesc('value')
            ->values();

        // 4. [BARU] BREAKDOWN PER NAMA PRODUK (Tabel Detail 16 Produk)
        // Menggunakan withSum agar query efisien (tidak N+1 problem)
        $breakdownProduk = Produk::withSum(['akuisisi as realisasi' => function ($q) use ($akuisisiFilter) {
            // Terapkan filter tanggal yang sama ke relasi akuisisi
            $akuisisiFilter($q);
        }], 'nominal_realisasi')
            ->get()
            ->map(function ($produk) {
                return [
                    'id' => $produk->id,
                    'nama_produk' => $produk->nama_produk,
                    'kategori' => $produk->kategori_produk,
                    'satuan' => $produk->satuan,
                    'realisasi' => (float) $produk->realisasi ?? 0,
                ];
            })
            ->sortByDesc('realisasi') // Urutkan dari capaian tertinggi
            ->values();

        // 5. JUDUL & LABEL
        Carbon::setLocale('id');
        $periodeLabel = "Sejak Awal (All Time)";
        if ($year) {
            $periodeLabel = "Tahun " . $year;
            if ($month) {
                // PERBAIKAN DISINI:
                // 1. Cast (int) agar tipe datanya benar.
                // 2. Pakai createFromDate(null, bulan, 1) agar aman dari bug tanggal 31.
                $monthName = Carbon::createFromDate(null, (int) $month, 1)->translatedFormat('F');

                $periodeLabel = "$monthName $year";
            }
        }

        return Inertia::render('KepalaCabang/Monitoring/Realisasi', [
            'title'    => "Monitoring Realisasi",
            'filters'  => ['year' => $year, 'month' => $month], // Kirim state filter balik ke frontend
            'periodeLabel' => $periodeLabel,
            'overview' => [
                'total_target'    => (float) $totalTarget,
                'total_realisasi' => (float) $totalRealisasi,
                'gap'             => (float) $gap,
                'persentase'      => $persentase,
                'status'          => $status
            ],
            'breakdownKategori' => $breakdownKategori,
            'breakdownProduk'   => $breakdownProduk // Data Baru
        ]);
    }


    public function divisi(Request $request)
    {
        // 1. FILTER DYNAMIC
        $year   = $request->input('year');
        $month  = $request->input('month');

        // Helper: Filter Akuisisi
        $dateFilter = function ($query) use ($year, $month) {
            $query->where('status_verifikasi', 'verified');
            if ($year) $query->whereYear('tanggal_akuisisi', $year);
            if ($month) $query->whereMonth('tanggal_akuisisi', $month);
        };

        // 2. QUERY DATA DIVISI (Aggregated)
        // Kita butuh: Total Realisasi Divisi, Jumlah Transaksi, Total Pegawai, dan Top User di Divisi itu
        $divisiStats = Divisi::with(['users' => function ($q) use ($dateFilter) {
                // Eager load sum & count akuisisi per user untuk ranking internal
                $q->withSum(['akuisisi' => fn($sq) => $dateFilter($sq)], 'nominal_realisasi')
                  ->withCount(['akuisisi' => fn($sq) => $dateFilter($sq)])
                  ->where('status_aktif', 'aktif');
            }])
            ->get()
            ->map(function ($divisi) {
                // Hitung total satu divisi
                $totalRealisasi = $divisi->users->sum('akuisisi_sum_nominal_realisasi');
                $totalTransaksi = $divisi->users->sum('akuisisi_count');

                // Cari Pegawai Terbaik di Divisi ini (The Star)
                $topPerformer = $divisi->users->sortByDesc('akuisisi_sum_nominal_realisasi')->first();

                return [
                    'id' => $divisi->id,
                    'nama_divisi' => $divisi->nama_divisi,
                    'kode_divisi' => $divisi->kode_divisi,
                    'total_realisasi' => (float) $totalRealisasi,
                    'total_transaksi' => (int) $totalTransaksi,
                    'jumlah_pegawai' => $divisi->users->count(),
                    'top_performer' => $topPerformer && $topPerformer->akuisisi_sum_nominal_realisasi > 0 ? [
                        'name' => $topPerformer->name,
                        'nominal' => (float) $topPerformer->akuisisi_sum_nominal_realisasi
                    ] : null,
                ];
            })
            ->sortByDesc('total_realisasi') // Urutkan divisi terbaik di atas
            ->values();

        // 3. CHART DATA (Untuk Grafik Batang Utama)
        $chartData = $divisiStats->map(fn($d) => [
            'name' => $d['nama_divisi'],
            'value' => $d['total_realisasi']
        ]);

        // 4. DATA FILTER (Dropdown Options)
        $yearsList = collect(range(date('Y'), date('Y') - 4))->map(fn($y) => [
            'value' => $y, 'label' => (string)$y
        ])->values();

        $monthsList = collect(range(1, 12))->map(fn($m) => [
            'value' => $m, 'label' => Carbon::create()->month($m)->isoFormat('MMMM')
        ])->values();

        // Label Judul
        $periodeLabel = "Sejak Awal (All Time)";
        if ($year) {
            $periodeLabel = "Tahun " . $year;
            if ($month) {
                $monthName = Carbon::createFromDate(null, (int)$month, 1)->isoFormat('MMMM');
                $periodeLabel = "$monthName $year";
            }
        }

        return Inertia::render('KepalaCabang/Monitoring/Divisi', [
            "title"       => "Performa Divisi",
            "divisiStats" => $divisiStats,
            "chartData"   => $chartData,
            "filters"     => ['year' => $year, 'month' => $month],
            "options"     => [
                "years"  => $yearsList,
                "months" => $monthsList
            ],
            "periodeLabel" => $periodeLabel
        ]);
    }

    public function pegawai_rank(Request $request)
    {
        // 1. FILTER DYNAMIC
        $year   = $request->input('year');
        $month  = $request->input('month');
        $divisiId = $request->input('divisi_id'); // Filter tambahan per divisi

        // Helper: Filter Tanggal (Reusability)
        $dateFilter = function ($query, $column = 'tanggal_akuisisi') use ($year, $month) {
            if ($year) $query->whereYear($column, $year);
            if ($month) $query->whereMonth($column, $month);
        };

        // 2. QUERY UTAMA: User + Aggregates
        // Kita ambil semua pegawai aktif
        $pegawaiData = User::where('status_aktif', 'aktif')
            ->when($divisiId, fn($q) => $q->where('divisi_id', $divisiId)) // Filter Divisi jika ada
            ->with('divisi:id,nama_divisi,kode_divisi')
            // Hitung Total Realisasi (Verified Only)
            ->withSum(['akuisisi' => function ($q) use ($dateFilter) {
                $q->where('status_verifikasi', 'verified');
                $dateFilter($q, 'tanggal_akuisisi');
            }], 'nominal_realisasi')
            // Hitung Jumlah Transaksi
            ->withCount(['akuisisi' => function ($q) use ($dateFilter) {
                $q->where('status_verifikasi', 'verified');
                $dateFilter($q, 'tanggal_akuisisi');
            }])
            // Hitung Total Target (Jika filter tahun aktif, ambil target tahun tsb)
            ->withSum(['targets' => function ($q) use ($year) {
                if ($year) $q->where('tahun', $year);
                // Jika filter bulan aktif, mungkin perlu logika target bulanan (opsional, disini kita ambil proporsional atau full tahunan dulu agar aman)
            }], 'nilai_target')
            ->get()
            ->map(function ($user) {
                $realisasi = (float) $user->akuisisi_sum_nominal_realisasi;
                $target    = (float) $user->targets_sum_nilai_target;

                // Hitung Persentase Capaian
                $achievement = $target > 0 ? ($realisasi / $target) * 100 : 0;

                // Status Kinerja
                $status = 'Underperfom';
                if ($achievement >= 100) $status = 'Star';
                elseif ($achievement >= 80) $status = 'On Track';
                elseif ($target == 0 && $realisasi > 0) $status = 'Surplus (No Target)';

                return [
                    'id'          => $user->id,
                    'name'        => $user->name,
                    'nip'         => $user->nip,
                    'divisi'      => $user->divisi->nama_divisi ?? '-',
                    'kode_divisi' => $user->divisi->kode_divisi ?? '-',
                    'realisasi'   => $realisasi,
                    'transaksi'   => (int) $user->akuisisi_count,
                    'target'      => $target,
                    'achievement' => round($achievement, 1),
                    'status'      => $status
                ];
            })
            // Sorting: Realisasi Tertinggi -> Transaksi Terbanyak
            ->sortByDesc(function ($data) {
                return sprintf('%012s%012s', $data['realisasi'], $data['transaksi']);
            })
            ->values();

        // 3. DATA PENDUKUNG VIEW
        // Top 3 untuk Podium
        $top3 = $pegawaiData->take(3);

        // Data Grafik Top 10
        $chartTop10 = $pegawaiData->take(10)->map(fn($u) => [
            'name' => Str::limit($u['name'], 10), // Limit nama biar grafik ga penuh
            'realisasi' => $u['realisasi'],
            'target' => $u['target']
        ]);

        // Opsi Filter
        $divisiOptions = Divisi::select('id as value', 'nama_divisi as label')->get();
        $yearsList = collect(range(date('Y'), date('Y') - 4))->map(fn($y) => ['value' => $y, 'label' => (string)$y]);
        $monthsList = collect(range(1, 12))->map(fn($m) => [
            'value' => $m, 'label' => Carbon::create()->month($m)->isoFormat('MMMM')
        ]);

        // Label Periode
        $periodeLabel = "Sejak Awal (All Time)";
        if ($year) {
            $monthName = $month ? Carbon::createFromDate(null, (int)$month, 1)->isoFormat('MMMM') : '';
            $periodeLabel = $month ? "$monthName $year" : "Tahun $year";
        }

        return Inertia::render('KepalaCabang/EvaluasiSDM/PegawaiRank', [
            "title"       => "Leaderboard Pegawai",
            "pegawaiList" => $pegawaiData,
            "top3"        => $top3,
            "chartTop10"  => $chartTop10,
            "filters"     => ['year' => $year, 'month' => $month, 'divisi_id' => $divisiId],
            "options"     => [
                "years"  => $yearsList,
                "months" => $monthsList,
                "divisi" => $divisiOptions
            ],
            "periodeLabel" => $periodeLabel
        ]);
    }

    public function pegawai_promotion(Request $request)
    {
        // 1. FILTER DYNAMIC (Default: All Time / Null)
        $year = $request->input('year');
        $divisiId = $request->input('divisi_id');

        // 2. LOGIC DATA
        // Ambil User yang jabatannya 'Pegawai'
        $candidates = User::where('status_aktif', 'aktif')
            ->whereHas('jabatan', function($q) {
                $q->where('nama_jabatan', 'Pegawai');
            })
            ->when($divisiId, fn($q) => $q->where('divisi_id', $divisiId))
            ->with('divisi:id,nama_divisi')

            // A. Sum Realisasi Verified (All Time / Filtered Year)
            ->withSum(['akuisisi' => function ($q) use ($year) {
                $q->where('status_verifikasi', 'verified');
                if ($year) {
                    $q->whereYear('tanggal_akuisisi', $year);
                }
            }], 'nominal_realisasi')

            // B. Sum Target (All Time / Filtered Year)
            ->withSum(['targets' => function ($q) use ($year) {
                if ($year) {
                    $q->where('tahun', $year);
                }
            }], 'nilai_target')
            ->get()
            ->map(function ($user) {
                $realisasi = (float) $user->akuisisi_sum_nominal_realisasi;
                $target    = (float) $user->targets_sum_nilai_target;

                // Rumus Skor (Capaian %)
                $score = $target > 0 ? ($realisasi / $target) * 100 : 0;

                // Tentukan Rekomendasi Sistem
                $recommendation = 'Pertahankan (Retain)';
                $badgeColor = 'gray';

                if ($score >= 120) {
                    $recommendation = '🔥 Highly Recommended';
                    $badgeColor = 'purple';
                } elseif ($score >= 100) {
                    $recommendation = '✅ Recommended';
                    $badgeColor = 'green';
                } elseif ($score >= 80) {
                    $recommendation = '⚠️ Perlu Pembinaan';
                    $badgeColor = 'yellow';
                } else {
                    $recommendation = '❌ Underperform';
                    $badgeColor = 'red';
                }

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'nip' => $user->nip,
                    'divisi' => $user->divisi->nama_divisi ?? '-',
                    'realisasi' => $realisasi,
                    'target' => $target,
                    'score' => round($score, 1),
                    'recommendation' => $recommendation,
                    'badge_color' => $badgeColor
                ];
            })
            // Urutkan dari skor tertinggi (Prioritas)
            ->sortByDesc('score')
            ->values();

        // 3. OPSI FILTER
        $yearsList = collect(range(date('Y'), date('Y') - 4))->map(fn($y) => ['value' => $y, 'label' => (string)$y]);
        $divisiOptions = Divisi::select('id as value', 'nama_divisi as label')->get();

        return Inertia::render('KepalaCabang/EvaluasiSDM/PegawaiPromotion', [
            "title" => "Rekomendasi Promosi",
            "candidates" => $candidates,
            "filters" => ['year' => $year, 'divisi_id' => $divisiId],
            "options" => [
                "years" => $yearsList,
                "divisi" => $divisiOptions
            ]
        ]);
    }

    public function final_report(Request $request)
    {
        // 1. OPSI FILTER
        // Format array simple untuk dropdown
        $yearsList = collect(range(date('Y'), date('Y') - 4))->map(fn($y) => (string)$y)->toArray();

        // Format array object untuk dropdown (Value & Label)
        // Note: FilterSearchCustom Anda merender option.label jika object, atau option itu sendiri jika string.
        // Jadi kita buat array simple string untuk bulan agar aman, atau sesuaikan komponen.
        // Agar aman dengan komponen Anda yang sekarang, kita pakai string value saja dulu untuk bulan (angka 1-12)
        // Atau kita kirim array of strings: "Januari", "Februari" lalu di backend convert balik.
        // TAPI, lebih baik kita kirim array of objects {value, label} dan sesuaikan komponen sedikit.

        // SEMENTARA: Kita pakai array string "1" sampai "12" agar tidak error "Object not valid as child"
        // Nanti di frontend kita mapping labelnya.
        $monthsList = collect(range(1, 12))->map(fn($m) => (string)$m)->toArray();

        $kategoriList = Produk::select('kategori_produk')
            ->distinct()
            ->pluck('kategori_produk')
            ->toArray();

        // 2. QUERY
        $filtersReq = $request->all();

        $reports = Akuisisi::query()
            ->with(['pegawai:id,name,nip', 'produk:id,nama_produk,kategori_produk'])
            ->where('status_verifikasi', 'verified')
            ->when($request->year, fn($q) => $q->whereYear('tanggal_akuisisi', $request->year))
            ->when($request->month, fn($q) => $q->whereMonth('tanggal_akuisisi', $request->month))
            ->filter($filtersReq) // Pastikan scopeFilter di Model Akuisisi menangani 'search' dan 'byKategori'
            ->orderByDesc('tanggal_akuisisi')
            ->paginate(10)
            ->withQueryString()
            ->through(function ($item) {
                return [
                    'id'                => $item->id,
                    'timestamp'         => $item->created_at->format('d/m/Y H:i'),
                    'nama_pegawai'      => $item->pegawai->name,
                    'nip_pegawai'       => $item->pegawai->nip,
                    'produk'            => $item->produk->nama_produk,
                    'kategori'          => $item->produk->kategori_produk,
                    'tanggal_akuisisi'  => Carbon::parse($item->tanggal_akuisisi)->format('d-M-Y'),
                    'bukti_url'         => $item->lampiran_bukti ? asset('storage/' . $item->lampiran_bukti) : null,
                    'no_rekening'       => $item->no_identitas_nasabah,
                    'nama_nasabah'      => $item->nama_nasabah,
                ];
            });

        return Inertia::render('KepalaCabang/Report/FinalReport', [
            "title"       => "Laporan Sah",
            "subTitle"    => "Detail Transaksi Tervalidasi",
            "reports"     => $reports,
            "filtersReq"  => $filtersReq,
            "filtersList" => [
                "year"     => $yearsList,
                "month"    => $monthsList,
                "kategori" => $kategoriList,
            ],
        ]);
    }

    public function export_data()
    {
        return Inertia::render('KepalaCabang/Report/ExportData', [
            "title" => "Data Realisasi untuk keperluan rapat koordinasi wilayah",
        ]);
    }
}
