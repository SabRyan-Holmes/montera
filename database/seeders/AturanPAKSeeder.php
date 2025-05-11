<?php

namespace Database\Seeders;

use App\Models\AturanPAK;
use Illuminate\Database\Seeder;

class AturanPAKSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AturanPAK::create([
            'name' => 'Penanda Tangan',
            'value' => [
                "nama" => ["Agus Sudibyo, M.Stat"],
                "nip" => ["197412311996121001"]
            ],
            "default_config" => [
                'nama' => 0,
                'nip' => 0,
            ]
        ]);

        AturanPAK::create([
            'name' => 'Koefisien Per Tahun',
            'value' => [
                "Terampil" => 5,
                "Mahir" => 12.5,
                'Penyelia' => 25,
                'Pertama' => 12.5,
                'Madya' => 25,
                'Muda' => 37.5,
            ],
        ]);

        AturanPAK::create([
            'name' => 'Predikat & Presentase',
            'value' => [
                "Sangat Kurang" => 25,
                "Kurang" => 50,
                'Butuh Perbaikan' => 75,
                'Baik' => 100,
                'Sangat Baik' => 150,
            ],
        ]);

        AturanPAK::create([
            'name' => 'Angka Minimal Pangkat dan Jabatan',
            'value' => [
                "pangkat" => [20, 40, 50, 100, 150, 200, 250, 300, 450, 600],
                "jabatan" => [20, 40, 50, 100, 150, 200, 300, 450, 600],
            ],
        ]);

        AturanPAK::create([
            'name' => 'Tebusan',
            'value' => [
                "konversi" => ['Kepala Kantor Regional VII BKN', 'Sekretaris Tim Penilai Yang Bersangkutan', 'Kepala BPS Kabupaten/Kota', 'PNS Bersangkutan', 'Kepal Biro SDM BPS', 'Arsip'],
                "akumulasi" => ['Kepala Kantor Regional VII BKN', 'Sekretaris Tim Penilai Yang Bersangkutan', 'Kepala BPS Kabupaten/Kota', 'PNS Bersangkutan', 'Kepal Biro SDM BPS', 'Arsip'],
                "penetapan" => ['Kepala Kantor Regional VII BKN', 'Sekretaris Tim Penilai Yang Bersangkutan', 'Kepala BPS Kabupaten/Kota', 'PNS Bersangkutan', 'Kepal Biro SDM BPS', 'Arsip'],
            ],
        ]);

        AturanPAK::create([
            'name' => 'Kesimpulan',
            'value' => [
                'Belum Dapat Dipertimbangkan untuk  Kenaikan Pangkat Setingkat Lebih Tinggi',
                'Belum Dapat Dipertimbangkan untuk  Kenaikan Jabatan Setingkat Lebih Tinggi',
                'Belum Dapat Dipertimbangkan untuk  Kenaikan Pangkat & Jabatan Setingkat Lebih Tinggi',
                'Sudah Dapat Dipertimbangkan untuk  Kenaikan Pangkat Setingkat Lebih Tinggi',
                'Sudah Dapat Dipertimbangkan untuk Jabatan Setingkat Lebih Tinggi',
                'Sudah Dapat Dipertimbangkan untuk  Kenaikan Pangkat & Jabatan Setingkat Lebih Tinggi'
            ],
        ]);

        // NOTE : Belum tau ini bisa dijadiin ke database nanti dan bisa diedit
        AturanPAK::create([
            'name' => 'rumus_penghitungan',
            'value' => json_encode([
                'angka_kredit' => '(periode / 12) * ak_normatif * (presentase / 100)',
                'jumlah_ak_kumulatif' => 'ak_terakhir + ak_terbaru',
                'ak_minimal_naik_pangkat' => 'jakk - pangkat_minimal',
                'ak_minimal_naik_jabatan' => 'jakk - jabatan_minimal',
            ]),
            'default_config' => 'angka_kredit', // misal default rumus yang dipakai utama
            // 'is_locked' => true, // jika ingin mencegah edit via UI

        ]);
    }
}
