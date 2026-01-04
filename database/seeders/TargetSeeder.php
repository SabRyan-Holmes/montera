<?php

namespace Database\Seeders;

use App\Models\Indikator;
use App\Models\Produk;
use App\Models\Target;
use App\Models\User;
use Illuminate\Database\Seeder;

class TargetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pegawaiIds = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Pegawai'))->pluck('id');
        $produkIds = Produk::pluck('id');
        $indikatorIds = Indikator::pluck('id'); // Ambil ID Indikator

        if ($pegawaiIds->isEmpty() || $indikatorIds->isEmpty()) {
            return; // Jaga-jaga kalau seeder sebelumnya kosong
        }

        for ($i = 0; $i < 15; $i++) {
            Target::create([
                'user_id' => $pegawaiIds->random(),
                'indikator_id' => $indikatorIds->random(), // SINKRONKAN DISINI
                'produk_id' => $produkIds->random(),
                'nilai_target' => rand(50000000, 500000000),
                'tipe_target' => rand(0, 1) ? 'nominal' : 'noa',
                'periode' => 'bulanan',
                'tahun' => 2026,
                'tanggal_mulai' => now()->startOfMonth(),
                'tanggal_selesai' => now()->endOfMonth(),
                'deadline_pencapaian' => now()->endOfMonth(),
                'keterangan_tambahan' => 'Target performa awal tahun.',
            ]);
        }
    }
}
