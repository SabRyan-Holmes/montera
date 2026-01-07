<?php

namespace Database\Seeders;

use App\Models\Akuisisi;
use App\Models\Indikator;
use App\Models\Produk;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransaksiSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Ambil data pendukung
        $indikators = Indikator::all();
        // Ambil SEMUA akuisisi yang verified (ini adalah sumber kebenaran/source of truth)
        $akuisisis = Akuisisi::where('status_verifikasi', 'verified')->get();

        if ($akuisisis->isEmpty() || $indikators->isEmpty()) {
            $this->command->error('Data Akuisisi Verified atau Indikator kosong.');
            return;
        }

        // 2. Loop berdasarkan data AKUISISI, bukan loop angka random
        // Kita ambil 17 sampel acak dari akuisisi yang ada
        $sampleAkuisisis = $akuisisis->count() > 17
            ? $akuisisis->random(17)
            : $akuisisis; // Kalau datanya kurang dari 17, pakai semua yang ada

        foreach ($sampleAkuisisis as $akuisisi) {
            // Ambil indikator secara acak (atau sesuaikan logika bisnis jika indikator terikat produk)
            // Agar lebih akurat, ambil indikator yang sesuai dengan produk akuisisi tersebut
            $indikator = $indikators->where('produk_id', $akuisisi->produk_id)->first();

            // Fallback jika tidak ada indikator spesifik, ambil random (untuk dummy data)
            if (!$indikator) {
                $indikator = $indikators->random();
            }

            DB::table('transaksis')->insert([
                'user_id' => $akuisisi->user_id, // AMBIL DARI AKUISISI
                'produk_id' => $akuisisi->produk_id, // AMBIL DARI AKUISISI
                'indikator_id' => $indikator->id,
                'akuisisi_id' => $akuisisi->id, // PASTI ADA (NOT NULL)

                'nilai_realisasi' => $akuisisi->nominal_realisasi, // SINKRON DENGAN AKUISISI
                'poin_didapat' => rand(10, 100),
                'bulan' => date('n'),
                'tahun' => date('Y'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('Data Transaksi berhasil dibuat dari Akuisisi Verified!');
    }
}
