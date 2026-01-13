<?php

namespace Database\Seeders;

use App\Models\Akuisisi;
use App\Models\Produk;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransaksiSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Ambil User Pegawai beserta Divisinya
        $users = User::with('divisi')
            ->whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Pegawai'))
            ->get();

        // 2. Ambil Data Akuisisi Verified (Source of Truth)
        $akuisisis = Akuisisi::where('status_verifikasi', 'verified')->get();

        if ($akuisisis->isEmpty()) {
            $this->command->warn('Data Akuisisi Verified kosong. Pastikan AkuisisiSeeder jalan duluan.');
            return;
        }

        // 3. Loop 17 Transaksi dari data Akuisisi
        $sample = $akuisisis->count() > 17 ? $akuisisis->random(17) : $akuisisis;

        foreach ($sample as $akuisisi) {
            $user = $users->find($akuisisi->user_id);
            $produk = Produk::find($akuisisi->produk_id);

            // --- LOGIKA HITUNG POIN (CORE LOGIC) ---
            // Cek Main Divisi User: 'Front Liner' atau 'kredit'
            // (Pastikan DivisiSeeder sudah pakai enum yang benar)
            $mainDivisi = $user->divisi->main_divisi ?? 'Front Liner'; // Default FL jika null

            $poin = ($mainDivisi === 'kredit')
                ? $produk->bobot_kredit
                : $produk->bobot_frontliner;
            // ----------------------------------------

            DB::table('transaksis')->insert([
                'user_id' => $user->id,
                'produk_id' => $produk->id,
                'akuisisi_id' => $akuisisi->id,

                'nilai_realisasi' => $akuisisi->nominal_realisasi, // Data Uang (Untuk Kacab)
                'poin_didapat' => $poin, // Data Skor (Untuk Penilaian KPI)

                'bulan' => date('n'),
                'tahun' => date('Y'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('17 Transaksi berhasil digenerate dengan perhitungan Poin otomatis!');
    }
}
