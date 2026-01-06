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
            ['nama_jabatan' => 'Administrator', 'kode_jabatan' => 'ADM', 'level_otoritas' => 1,  'deskripsi_tugas'   => 'Mengelola data sistem, pengguna, hak akses, serta memastikan kelancaran operasional aplikasi dan administrasi internal.'],
            ['nama_jabatan' => 'Supervisor', 'kode_jabatan' => 'SPV', 'level_otoritas' => 2,  'deskripsi_tugas'   => 'Mengawasi dan memverifikasi kinerja pegawai, melakukan validasi data operasional, serta memberikan arahan dan evaluasi.'],
            ['nama_jabatan' => 'Kepala Cabang', 'kode_jabatan' => 'KACAB', 'level_otoritas' => 0,  'deskripsi_tugas'   => 'Memimpin dan mengawasi seluruh operasional cabang, mengambil keputusan strategis, serta bertanggung jawab atas pencapaian target cabang.'],
            ['nama_jabatan' => 'Pegawai', 'kode_jabatan' => 'STF', 'level_otoritas' => 3,  'deskripsi_tugas'   => 'Melaksanakan tugas operasional harian, menginput dan mengelola data sesuai tanggung jawab, serta melaporkan hasil kerja.'],
        ];

        foreach ($data as $j) {
            Jabatan::create($j);
        }
    }
}
