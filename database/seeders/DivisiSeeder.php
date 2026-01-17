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
            // --- KELOMPOK 1: PEGAWAI FRONTLINER ---
            [
                'main_divisi' => 'Front Liner',
                'nama'        => 'Customer Service',
                'kode'        => 'CS'
            ],
            [
                'main_divisi' => 'Front Liner',
                'nama'        => 'Teller',
                'kode'        => 'TL'
            ],
            [
                'main_divisi' => 'Front Liner',
                'nama'        => 'Security',
                'kode'        => 'SEC'
            ],
            [
                'main_divisi' => 'Front Liner',
                'nama'        => 'Admin Gov',
                'kode'        => 'GOV'
            ],

            // --- KELOMPOK 2: PEGAWAI KREDIT ---
            [
                'main_divisi' => 'Kredit',
                'nama'        => 'Mikro Credit Analis',
                'kode'        => 'MCA'
            ],
            [
                'main_divisi' => 'Kredit',
                'nama'        => 'Sales Generalis Produktif',
                'kode'        => 'SGP'
            ],
            [
                'main_divisi' => 'Kredit',
                'nama'        => 'Sales Generalis Konsumtif',
                'kode'        => 'SGK'
            ],
        ];

        foreach ($divisi as $d) {
            Divisi::create([
                'main_divisi' => $d['main_divisi'], // Field baru wajib diisi
                'nama_divisi' => $d['nama'],
                'kode_divisi' => $d['kode'],
            ]);
        }
    }
}
