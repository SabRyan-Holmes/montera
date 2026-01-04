<?php

namespace Database\Seeders;

use App\Models\Indikator;
use App\Models\Produk;
use Illuminate\Database\Seeder;

class IndikatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
{
    $produkKredit = Produk::where('kategori', 'kredit')->first();
    $produkTabungan = Produk::where('kategori', 'tabungan')->first();

    $data = [
        [
            'produk_id' => $produkKredit->id,
            'nama_kpi' => 'Penyaluran KUR Mikro',
            'satuan' => 'Rupiah',
            'bobot_nilai' => 25.00,
            'target_minimal' => 500000000.00, // 500 Juta
            'metode_perhitungan' => '(Total Realisasi / Target Tahunan) * Bobot',
        ],
        [
            'produk_id' => $produkTabungan->id,
            'nama_kpi' => 'Pembukaan Rekening Baru',
            'satuan' => 'Unit',
            'bobot_nilai' => 15.00,
            'target_minimal' => 50.00, // 50 Rekening
            'metode_perhitungan' => 'Jumlah akun baru tervalidasi sistem',
        ],
        [
            'produk_id' => $produkTabungan->id,
            'nama_kpi' => 'Rasio Pengendapan Dana',
            'satuan' => 'Persen',
            'bobot_nilai' => 10.00,
            'target_minimal' => 80.00,
            'metode_perhitungan' => '(Saldo Akhir / Saldo Awal) * 100',
        ],
    ];

    foreach ($data as $item) {
        Indikator::create($item);
    }

    // Tambahkan 12 data dummy lain agar total 15
    for ($i = 1; $i <= 12; $i++) {
        Indikator::create([
            'produk_id' => Produk::inRandomOrder()->first()->id,
            'nama_kpi' => "Indikator Kinerja Tambahan $i",
            'satuan' => 'Unit',
            'bobot_nilai' => 5.00,
            'target_minimal' => rand(10, 100),
            'metode_perhitungan' => 'Akumulasi data input tervalidasi supervisor',
        ]);
    }
}
}
