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
        $pegawaiIds = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Pegawai'))->pluck('id');
        $produkIds = Produk::pluck('id');

        if ($pegawaiIds->isEmpty() || $produkIds->isEmpty()) {
            return;
        }

        // Kita bikin 30 target buat sampel data yang rame
        for ($i = 0; $i < 30; $i++) {
            $bulan = rand(1, 12);
            $tahun = 2026;

            $startDate = Carbon::createFromDate($tahun, $bulan, 1);
            $endDate = $startDate->copy()->endOfMonth();

            // Kita asumsikan deadline adalah hari terakhir periode tersebut
            $deadline = $endDate->copy();

            Target::create([
                'user_id' => $pegawaiIds->random(),
                'produk_id' => $produkIds->random(),
                'nilai_target' => rand(10, 100) * 1000000,
                'tipe_target' => rand(0, 1) ? 'nominal' : 'noa',
                'periode' => 'bulanan',
                'tahun' => $tahun,
                'bulan' => $bulan,
                'tanggal_mulai' => $startDate->format('Y-m-d'),
                'tanggal_selesai' => $endDate->format('Y-m-d'),
                'deadline_pencapaian' => $deadline->format('Y-m-d'), // SEKARANG UDAH ADA BRO
                'keterangan_tambahan' => 'Target performa otomatis untuk bulan ' . $startDate->format('F'),
            ]);
        }
    }
}
