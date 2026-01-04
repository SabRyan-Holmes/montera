<?php

namespace Database\Seeders;

use App\Models\Jabatan;
use Illuminate\Database\Seeder;

class JabatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['nama_jabatan' => 'Administrator', 'kode_jabatan' => 'ADM', 'level_otoritas' => 1],
            ['nama_jabatan' => 'Supervisor', 'kode_jabatan' => 'SPV', 'level_otoritas' => 2],
            ['nama_jabatan' => 'Kepala Cabang', 'kode_jabatan' => 'KACAB', 'level_otoritas' => 0],
            ['nama_jabatan' => 'Pegawai', 'kode_jabatan' => 'STF', 'level_otoritas' => 3],
        ];

        foreach ($data as $j) {
            Jabatan::create($j);
        }
    }
}
