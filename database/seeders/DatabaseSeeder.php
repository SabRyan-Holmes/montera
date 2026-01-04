<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    protected static ?string $password;

    public function run(): void
    {
        // DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        $this->call([
            // 1. Level Dasar (Pondasi Struktur)
            JabatanSeeder::class,   // Harus pertama karena User butuh jabatan_id
            DivisiSeeder::class,    // Harus awal karena User butuh divisi_id

            // 2. Data Master (Entitas Utama)
            UserSeeder::class,      // User butuh Jabatan & Divisi
            ProdukSeeder::class,    // Produk berdiri sendiri (kategori tabungan/kredit/asuransi)

            // 3. Aturan Main (KPI)
            IndikatorSeeder::class, // Indikator butuh produk_id

            // 4. Data Transaksi & Perencanaan (Target & Realisasi)
            TargetSeeder::class,    // Target butuh user_id dan indikator_id
            AkuisisiSeeder::class,  // Akuisisi butuh user_id dan produk_id
        ]);
        // DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
