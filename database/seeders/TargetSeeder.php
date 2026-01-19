<?php

namespace Database\Seeders;

use App\Models\Produk;
use App\Models\Target;
use App\Models\User;
use App\Models\Divisi; // Jangan lupa import model Divisi
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class TargetSeeder extends Seeder
{
    public function run(): void
    {
        $pegawaiList = User::role('Pegawai')->get();
        $supervisorList = User::role('Supervisor')->get();
        // Ambil User Kepala Cabang
        $kacabList = User::role('Kepala Cabang')->get();

        // Ambil semua Divisi
        $divisiList = Divisi::all();

        $produkIds = Produk::pluck('id');

        if ($pegawaiList->isEmpty() || $produkIds->isEmpty()) {
            return;
        }

        // --- LOOP 1: TARGET PERORANGAN (Oleh SPV ke Pegawai) ---
        // (Kode lama kamu tetap dipakai disini)
        for ($i = 0; $i < 42; $i++) {
            $bulan = rand(1, 12);
            $tahun = rand(2024, 2026);
            $startDate = Carbon::createFromDate($tahun, $bulan, 1);
            $endDate = $startDate->copy()->endOfMonth();

            $pegawai = $pegawaiList->random();
            $supervisor = $supervisorList->where('divisi_id', $pegawai->divisi_id)->first();

            if (!$supervisor) {
                $supervisor = $supervisorList->random();
            }

            Target::create([
                'user_id' => $pegawai->id,     // Ada User
                'divisi_id' => null,           // Divisi Null
                'supervisor_id' => $supervisor->id,
                'produk_id' => $produkIds->random(),
                'nilai_target' => rand(10, 100) * 1000000,
                'tipe_target' => rand(0, 1) ? 'nominal' : 'noa',
                'periode' => 'bulanan',
                'tahun' => $tahun,
                'bulan' => $bulan,
                'tanggal_mulai' => $startDate->format('Y-m-d'),
                'tanggal_selesai' => $endDate->format('Y-m-d'),
                'deadline_pencapaian' => $endDate->format('Y-m-d'),
                'keterangan_tambahan' => 'Target Individual (Auto Seeder)',
            ]);
        }

        // --- LOOP 2: TARGET DIVISI (Oleh Kacab ke Divisi) ---
        // Misal kita buat 10 target divisi
        if ($kacabList->isNotEmpty() && $divisiList->isNotEmpty()) {
            for ($j = 0; $j < 10; $j++) {
                $bulan = rand(1, 12);
                $tahun = rand(2024, 2026);
                $startDate = Carbon::createFromDate($tahun, $bulan, 1);
                $endDate = $startDate->copy()->endOfMonth();

                Target::create([
                    'user_id' => null,               // User Null (Karena untuk 1 divisi)
                    'divisi_id' => $divisiList->random()->id, // Divisi Terisi
                    'supervisor_id' => $kacabList->random()->id, // Dibuat oleh Kacab
                    'produk_id' => $produkIds->random(),
                    'nilai_target' => rand(500, 1000) * 1000000, // Target Divisi biasanya lebih besar
                    'tipe_target' => 'nominal',
                    'periode' => 'bulanan',
                    'tahun' => $tahun,
                    'bulan' => $bulan,
                    'tanggal_mulai' => $startDate->format('Y-m-d'),
                    'tanggal_selesai' => $endDate->format('Y-m-d'),
                    'deadline_pencapaian' => $endDate->format('Y-m-d'),
                    'keterangan_tambahan' => 'Target Divisi dari Kepala Cabang',
                ]);
            }
        }
    }
}
