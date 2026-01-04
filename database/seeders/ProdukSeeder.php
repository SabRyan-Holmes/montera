<?php

namespace Database\Seeders;

use App\Models\Produk;
use Illuminate\Database\Seeder;

class ProdukSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $produks = [
            ['nama' => 'Tabungan Britama', 'kat' => 'tabungan'],
            ['nama' => 'Tabungan Simpedes', 'kat' => 'tabungan'],
            ['nama' => 'Tabungan Haji', 'kat' => 'tabungan'],
            ['nama' => 'Kredit Usaha Rakyat (KUR)', 'kat' => 'kredit'],
            ['nama' => 'Kredit Perumahan (KPR)', 'kat' => 'kredit'],
            ['nama' => 'Kredit Kendaraan', 'kat' => 'kredit'],
            ['nama' => 'Asuransi Jiwa Sraya', 'kat' => 'asuransi'],
            ['nama' => 'Asuransi Kesehatan Plus', 'kat' => 'asuransi'],
            ['nama' => 'Deposito Berjangka', 'kat' => 'tabungan'],
            ['nama' => 'Kredit Modal Kerja', 'kat' => 'kredit'],
            ['nama' => 'Kredit Konsumsi', 'kat' => 'kredit'],
            ['nama' => 'Asuransi Pendidikan', 'kat' => 'asuransi'],
            ['nama' => 'Tabungan Rencana', 'kat' => 'tabungan'],
            ['nama' => 'Kredit Mikro', 'kat' => 'kredit'],
            ['nama' => 'Asuransi Kendaraan', 'kat' => 'asuransi'],
        ];

        foreach ($produks as $p) {
            Produk::create([
                'nama_produk' => $p['nama'],
                'kode_produk' => strtoupper(substr($p['nama'], 0, 3)) . rand(100, 999),
                'kategori' => $p['kat'],
                'status' => 'aktif'
            ]);
        }
    }
}
