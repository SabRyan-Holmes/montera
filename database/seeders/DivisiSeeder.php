<?php

namespace Database\Seeders;

use App\Models\Divisi;
use Illuminate\Database\Seeder;

class DivisiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $divisi = [
            ['nama' => 'SDM & Umum', 'kode' => 'ADM'], // Admin & SDM
            ['nama' => 'Operasional', 'kode' => 'OPS'],
            ['nama' => 'Pemasaran & Bisnis', 'kode' => 'MKT'],
            ['nama' => 'Kredit & Konsumer', 'kode' => 'CRD'],
            ['nama' => 'Pimpinan Cabang', 'kode' => 'KCP'], // Khusus Kepala Cabang
        ];

        foreach ($divisi as $d) {
            \App\Models\Divisi::create([
                'nama_divisi' => $d['nama'],
                'kode_divisi' => $d['kode'],
            ]);
        }
    }
}
