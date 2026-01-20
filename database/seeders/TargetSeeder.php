<?php

namespace Database\Seeders;

use App\Models\Produk;
use App\Models\Target;
use App\Models\User;
use App\Models\Divisi;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class TargetSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Ambil Aktor & Data Pendukung
        $pegawaiList = User::role('Pegawai')->get();
        $supervisorList = User::role('Supervisor')->get();
        $kacabList = User::role('Kepala Cabang')->get(); // Untuk pembuat target divisi
        $divisiList = Divisi::all();

        // Ambil produk full object biar bisa cek kategori
        $produks = Produk::all();

        if ($pegawaiList->isEmpty() || $produks->isEmpty()) {
            $this->command->info('Data Pegawai atau Produk kosong. Skip TargetSeeder.');
            return;
        }

        $totalTargetIndividu = 60; // 60 Target Perorangan
        $totalTargetDivisi = 15;   // 15 Target Divisi

        // --- LOOP 1: TARGET INDIVIDU (SPV -> Pegawai) ---
        for ($i = 0; $i < $totalTargetIndividu; $i++) {
            $bulan = rand(1, 12);
            $tahun = rand(2025, 2026);
            $startDate = Carbon::createFromDate($tahun, $bulan, 1);
            $endDate = $startDate->copy()->endOfMonth();

            $pegawai = $pegawaiList->random();
            // Cari Supervisor yang satu divisi, kalau gak ada ambil random
            $supervisor = $supervisorList->where('divisi_id', $pegawai->divisi_id)->first() ?? $supervisorList->random();
            $produk = $produks->random();

            // GENERATE NOMINAL PINTAR (INDIVIDU)
            $nilaiTarget = $this->getSmartNominal($produk, 'individu');
            $tipeTarget = $this->getSmartType($produk);

            Target::create([
                'user_id' => $pegawai->id,
                'divisi_id' => null,
                'supervisor_id' => $supervisor->id,
                'produk_id' => $produk->id,
                'nilai_target' => $nilaiTarget,
                'tipe_target' => $tipeTarget,
                'periode' => 'bulanan',
                'tahun' => $tahun,
                'bulan' => $bulan,
                'tanggal_mulai' => $startDate->format('Y-m-d'),
                'tanggal_selesai' => $endDate->format('Y-m-d'),
                'deadline_pencapaian' => $endDate->format('Y-m-d'),
                'keterangan_tambahan' => 'Target Individu Bulanan',
            ]);
        }

        // --- LOOP 2: TARGET DIVISI (Kacab -> Divisi) ---
        if ($kacabList->isNotEmpty() && $divisiList->isNotEmpty()) {
            for ($j = 0; $j < $totalTargetDivisi; $j++) {
                $bulan = rand(1, 12);
                $tahun = rand(2025, 2026);
                $startDate = Carbon::createFromDate($tahun, $bulan, 1);
                $endDate = $startDate->copy()->endOfMonth();

                $divisi = $divisiList->random();
                $kacab = $kacabList->random();
                $produk = $produks->random();

                // GENERATE NOMINAL PINTAR (DIVISI - Lebih Besar)
                $nilaiTarget = $this->getSmartNominal($produk, 'divisi');
                $tipeTarget = $this->getSmartType($produk);

                Target::create([
                    'user_id' => null, // Target Divisi = User Null
                    'divisi_id' => $divisi->id,
                    'supervisor_id' => $kacab->id,
                    'produk_id' => $produk->id,
                    'nilai_target' => $nilaiTarget,
                    'tipe_target' => $tipeTarget,
                    'periode' => 'bulanan',
                    'tahun' => $tahun,
                    'bulan' => $bulan,
                    'tanggal_mulai' => $startDate->format('Y-m-d'),
                    'tanggal_selesai' => $endDate->format('Y-m-d'),
                    'deadline_pencapaian' => $endDate->format('Y-m-d'),
                    'keterangan_tambahan' => 'Target Divisi (Tim)',
                ]);
            }
        }
    }

    /**
     * Helper: Menentukan nominal target yang masuk akal
     */
    private function getSmartNominal($produk, $scope = 'individu')
    {
        $kategori = strtoupper($produk->kategori_produk);
        $multiplier = ($scope === 'divisi') ? 5 : 1; // Target Divisi 5x lipat individu

        if (str_contains($kategori, 'E-CHANEL') || str_contains($kategori, 'E-CHANNEL')) {
            // E-Channel (Unit/NOA) -> Target Unit Kecil
            // Individu: 5 - 50 Unit
            // Divisi: 25 - 250 Unit
            return rand(5, 50) * $multiplier;
        }

        if ($kategori == 'PRODUK KREDIT') {
            // Kredit -> Target Milyaran
            // Individu: 100jt - 500jt
            return rand(100, 500) * 1000000 * $multiplier;
        }

        if ($kategori == 'PRODUK FUNDING') {
            // Funding -> Target Ratusan Juta
            // Individu: 50jt - 200jt
            return rand(50, 200) * 1000000 * $multiplier;
        }

        // Default (Anak Perusahaan dll) -> Puluhan Juta
        return rand(10, 50) * 1000000 * $multiplier;
    }

    /**
     * Helper: Menentukan tipe target (Nominal/NOA)
     */
    private function getSmartType($produk)
    {
        $kategori = strtoupper($produk->kategori_produk);

        // E-Channel & Kartu Kredit biasanya targetnya NOA (Unit)
        if (str_contains($kategori, 'E-CHANEL') || str_contains($kategori, 'E-CHANNEL') || str_contains(strtoupper($produk->nama_produk), 'KARTU')) {
            return 'noa';
        }

        // Kredit & Funding biasanya Nominal (Rupiah)
        return 'nominal';
    }
}
