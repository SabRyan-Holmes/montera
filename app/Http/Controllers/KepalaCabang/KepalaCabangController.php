<?php

namespace App\Http\Controllers\KepalaCabang;

use App\Http\Controllers\Controller;
use App\Models\Akuisisi;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KepalaCabangController extends Controller
{
    public function analytics()
    {
        // 1. Perbaikan: Ubah ke format Array of Objects untuk PieChart
        $performanceByKategori = Akuisisi::where('status_verifikasi', 'verified')
            ->with('produk:id,kategori')
            ->get()
            ->groupBy('produk.kategori')
            ->map(function ($item, $key) {
                return [
                    'kategori' => $key,
                    'total' => (float) $item->sum('nominal_realisasi')
                ];
            })->values(); // .values() mengubah Object menjadi Array []

        // 2. Perbaikan: Ubah Trend Bulanan ke format Array untuk BarChart
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

        // 3. Pastikan penamaan kolom konsisten (tadi di frontend pakai total_capaian)
        $topPegawai = Akuisisi::where('status_verifikasi', 'verified')
            ->with('pegawai:id,name')
            ->select('user_id', DB::raw('SUM(nominal_realisasi) as total_capaian'))
            ->groupBy('user_id')
            ->orderByDesc('total_capaian')
            ->limit(5)
            ->get();

        return Inertia::render('_KepalaCabang/Analytics', [
            'chartData' => $performanceByKategori,
            'trendData' => $monthlyTrend,
            'ranking'   => $topPegawai
        ]);
    }
}
