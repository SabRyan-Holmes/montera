<?php

namespace Database\Seeders;

use App\Models\Indikator;
use App\Models\Produk;
use App\Models\Target;
use App\Models\User;
use Illuminate\Database\Seeder;

class TargetSeeder extends Seeder
{
    public function run(): void
    {
        $pegawaiIds = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Pegawai'))->pluck('id');
        $produkIds = Produk::pluck('id');
        $indikatorIds = Indikator::pluck('id');

        if ($pegawaiIds->isEmpty() || $indikatorIds->isEmpty()) {
            return;
        }

        // Loop diubah jadi 22
        for ($i = 0; $i < 22; $i++) {
            Target::create([
                'user_id' => $pegawaiIds->random(),
                'indikator_id' => $indikatorIds->random(),
                'produk_id' => $produkIds->random(),
                'nilai_target' => rand(50000000, 500000000), // Target antara 50jt - 500jt
                'tipe_target' => rand(0, 1) ? 'nominal' : 'noa',
                'periode' => 'bulanan',
                'tahun' => date('Y'),
                'tanggal_mulai' => now()->startOfMonth(),
                'tanggal_selesai' => now()->endOfMonth(),
                'deadline_pencapaian' => now()->endOfMonth(),
                'keterangan_tambahan' => 'Target performa bulanan Q1.',
            ]);
        }
    }
}
