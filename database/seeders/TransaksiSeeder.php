<?php

namespace Database\Seeders;

use App\Models\Akuisisi;
use App\Models\Indikator;
use App\Models\Produk;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransaksiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ambil data pendukung secara acak agar relasinya tersambung
        $users = User::all();
        $produks = Produk::all();
        $indikators = Indikator::all();
        $akuisisis = Akuisisi::where('status_verifikasi', 'verified')->get();

        // Cek jika data master kosong agar tidak error
        if ($users->isEmpty() || $produks->isEmpty() || $indikators->isEmpty()) {
            $this->command->error('Data User, Produk, atau Indikator kosong. Jalankan seeder master dulu!');
            return;
        }

        // Bikin 7 data contoh
        for ($i = 0; $i < 7; $i++) {
            $user = $users->random();
            $produk = $produks->random();
            $indikator = $indikators->random();

            // Kita simulasi nominal random antara 5jt - 50jt untuk realisasi
            $nominal = fake()->randomFloat(2, 5000000, 50000000);

            DB::table('transaksis')->insert([
                'user_id' => $user->id,
                'produk_id' => $produk->id,
                'indikator_id' => $indikator->id,
                // Kita sambungkan ke ID akuisisi jika ada, jika tidak biarkan null
                'akuisisi_id' => $akuisisis->isNotEmpty() ? $akuisisis->random()->id : null,

                'nilai_realisasi' => $nominal,
                'poin_didapat' => rand(10, 100), // Simulasi skor poin KPI
                'bulan' => date('n'),
                'tahun' => date('Y'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('7 Data Transaksi berhasil dibuat dan relasi tersambung!');
    }
}
