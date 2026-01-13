<?php

namespace Database\Seeders;

use App\Models\Produk;
use App\Models\Target;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class TargetSeeder extends Seeder
{
    public function run(): void
    {
        // Ambil User Pegawai
        $pegawaiIds = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Pegawai'))->pluck('id');
        $produkIds = Produk::pluck('id');

        if ($pegawaiIds->isEmpty() || $produkIds->isEmpty()) {
            return;
        }

        // Buat 22 Target Contoh
        for ($i = 0; $i < 22; $i++) {
            // Tentukan periode (Bulanan)
            $bulan = rand(1, 12);
            $tahun = 2026;

            // Hitung tanggal otomatis pakai Carbon
            $startDate = Carbon::createFromDate($tahun, $bulan, 1);
            $endDate = $startDate->copy()->endOfMonth();

            Target::create([
                'user_id' => $pegawaiIds->random(),
                'produk_id' => $produkIds->random(),

                'nilai_target' => rand(5, 100) * 1000000, // Target 5jt - 100jt
                'tipe_target' => rand(0, 1) ? 'nominal' : 'noa',

                // Field yang dikembalikan:
                'periode' => 'bulanan',
                'tahun' => $tahun,
                'tanggal_mulai' => $startDate->format('Y-m-d'),
                'tanggal_selesai' => $endDate->format('Y-m-d'),
                'deadline_pencapaian' => $endDate->format('Y-m-d'), // Biasanya deadline akhir bulan

                'keterangan_tambahan' => 'Target performa reguler bulan ' . $startDate->format('F'),
            ]);
        }
    }
}
