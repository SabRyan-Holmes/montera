<?php

namespace Database\Seeders;

use App\Models\Indikator;
use App\Models\Produk;
use Illuminate\Database\Seeder;

class IndikatorSeeder extends Seeder
{
    public function run(): void
    {
        // Ambil contoh produk per kategori untuk foreign key
        $kredit = Produk::where('kategori', 'kredit')->first();
        $tabungan = Produk::where('kategori', 'tabungan')->first();
        $asuransi = Produk::where('kategori', 'asuransi')->first();

        // Total 12 Indikator Realistis (Non-Dummy)
        $indikators = [
            // --- KREDIT (4 Indikator) ---
            [
                'produk_id' => $kredit->id,
                'nama_kpi' => 'Penyaluran KUR Mikro',
                'satuan' => 'Rupiah',
                'bobot_nilai' => 25.00,
                'target_minimal' => 500000000.00,
                'metode_perhitungan' => '(Total Realisasi / Target) * Bobot',
            ],
            [
                'produk_id' => $kredit->id,
                'nama_kpi' => 'Booking Loan Consumer',
                'satuan' => 'Rupiah',
                'bobot_nilai' => 20.00,
                'target_minimal' => 300000000.00,
                'metode_perhitungan' => 'Total pencairan kredit baru',
            ],
            [
                'produk_id' => $kredit->id,
                'nama_kpi' => 'Recovery Rate (Penagihan)',
                'satuan' => 'Persen',
                'bobot_nilai' => 15.00,
                'target_minimal' => 5.00, // 5% recovery
                'metode_perhitungan' => '(Hutang Tertagih / Total Macet) * 100',
            ],
            [
                'produk_id' => $kredit->id,
                'nama_kpi' => 'NPL Ratio (Kredit Macet)',
                'satuan' => 'Persen',
                'bobot_nilai' => 10.00,
                'target_minimal' => 2.00, // Maksimal 2%
                'metode_perhitungan' => 'Menjaga NPL di bawah threshold',
            ],

            // --- TABUNGAN (4 Indikator) ---
            [
                'produk_id' => $tabungan->id,
                'nama_kpi' => 'Pembukaan Rekening Baru (NOA)',
                'satuan' => 'Unit',
                'bobot_nilai' => 15.00,
                'target_minimal' => 50.00,
                'metode_perhitungan' => 'Jumlah akun baru valid',
            ],
            [
                'produk_id' => $tabungan->id,
                'nama_kpi' => 'Rasio CASA (Dana Murah)',
                'satuan' => 'Persen',
                'bobot_nilai' => 15.00,
                'target_minimal' => 40.00,
                'metode_perhitungan' => '(Giro + Tabungan) / Total DPK',
            ],
            [
                'produk_id' => $tabungan->id,
                'nama_kpi' => 'Volume Deposito',
                'satuan' => 'Rupiah',
                'bobot_nilai' => 10.00,
                'target_minimal' => 1000000000.00,
                'metode_perhitungan' => 'Total penempatan deposito baru',
            ],
            [
                'produk_id' => $tabungan->id,
                'nama_kpi' => 'Akuisisi Merchant QRIS',
                'satuan' => 'Unit',
                'bobot_nilai' => 10.00,
                'target_minimal' => 20.00,
                'metode_perhitungan' => 'Jumlah merchant aktif baru',
            ],

            // --- ASURANSI (4 Indikator) ---
            [
                'produk_id' => $asuransi->id,
                'nama_kpi' => 'Premi Asuransi Jiwa (Bancassurance)',
                'satuan' => 'Rupiah',
                'bobot_nilai' => 20.00,
                'target_minimal' => 100000000.00,
                'metode_perhitungan' => 'Total premi collected',
            ],
            [
                'produk_id' => $asuransi->id,
                'nama_kpi' => 'Polis Baru Kendaraan',
                'satuan' => 'Unit',
                'bobot_nilai' => 10.00,
                'target_minimal' => 15.00,
                'metode_perhitungan' => 'Jumlah polis terbit',
            ],
            [
                'produk_id' => $asuransi->id,
                'nama_kpi' => 'Fee Based Income (FBI) Asuransi',
                'satuan' => 'Rupiah',
                'bobot_nilai' => 10.00,
                'target_minimal' => 25000000.00,
                'metode_perhitungan' => 'Pendapatan fee dari penjualan',
            ],
            [
                'produk_id' => $asuransi->id,
                'nama_kpi' => 'Retensi Nasabah Prioritas',
                'satuan' => 'Persen',
                'bobot_nilai' => 15.00,
                'target_minimal' => 90.00,
                'metode_perhitungan' => 'Persentase renewal polis',
            ],
        ];

        foreach ($indikators as $data) {
            Indikator::create($data);
        }
    }
}
