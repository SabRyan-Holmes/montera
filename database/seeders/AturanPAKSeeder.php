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
        $timestamp = "2025-05-11 23:24:54";
        AturanPAK::create([
            'name' => 'Penanda Tangan',
            'value' => [
                [
                    "id" => 1,
                    "nama" => 'Agus Sudibyo, M.Stat',
                    "nip" => "197412311996121001",
                    "updated_at" => $timestamp,
                ],
            ],
            "default_config" => 1
        ]);

        AturanPAK::create([
            'name' => 'Koefisien Per Tahun',
            'value' => [
                [
                    "id" => 1,
                    "jabatan" => 'Terampil',
                    "nilai" => 5,
                    "updated_at" => $timestamp,
                ],
                [
                    "id" => 2,
                    "jabatan" => 'Mahir',
                    "nilai" => 12.5,
                    "updated_at" => $timestamp,
                ],
                [
                    "id" => 3,
                    "jabatan" => 'Penyelia',
                    "nilai" => 25,
                    "updated_at" => $timestamp,
                ],
                [
                    "id" => 4,
                    "jabatan" => 'Pertama',
                    "nilai" => 12.5,
                    "updated_at" => $timestamp,
                ],
                [
                    "id" => 5,
                    "jabatan" => 'Madya',
                    "nilai" => 25,
                    "updated_at" => $timestamp,
                ],
                [
                    "id" => 6,
                    "jabatan" => 'Muda',
                    "nilai" => 37.5,
                    "updated_at" => $timestamp,
                ],
            ],
        ]);


        AturanPAK::create([
            'name' => 'Predikat & Presentase',
            'value' => [
                [
                    "id" => 1,
                    "predikat" => 'Sangat Kurang',
                    "presentase" => 25,
                    "updated_at" => $timestamp,
                ],
                [
                    "id" => 2,
                    "predikat" => 'Kurang',
                    "presentase" => 50,
                    "updated_at" => $timestamp,
                ],
                [
                    "id" => 3,
                    "predikat" => 'Butuh Perbaikan',
                    "presentase" => 75,
                    "updated_at" => $timestamp,
                ],
                [
                    "id" => 4,
                    "predikat" => 'Baik',
                    "presentase" => 100,
                    "updated_at" => $timestamp,
                ],
                [
                    "id" => 5,
                    "predikat" => 'Sangat Baik',
                    "presentase" => 150,
                    "updated_at" => $timestamp,
                ],
            ],
        ]);

        AturanPAK::create([
            'name' => 'Angka Minimal Pangkat dan Jabatan',
            'value' => [
                "pangkat" => [
                    ["id" => 1, "nilai" => 20, "updated_at" => $timestamp],
                    ["id" => 2, "nilai" => 40, "updated_at" => $timestamp],
                    ["id" => 3, "nilai" => 50, "updated_at" => $timestamp],
                    ["id" => 4, "nilai" => 100, "updated_at" => $timestamp],
                    ["id" => 5, "nilai" => 150, "updated_at" => $timestamp],
                    ["id" => 6, "nilai" => 200, "updated_at" => $timestamp],
                    ["id" => 7, "nilai" => 250, "updated_at" => $timestamp],
                    ["id" => 8, "nilai" => 300, "updated_at" => $timestamp],
                    ["id" => 9, "nilai" => 450, "updated_at" => $timestamp],
                    ["id" => 10, "nilai" => 600, "updated_at" => $timestamp],
                ],
                "jabatan" => [
                    ["id" => 1, "nilai" => 20, "updated_at" => $timestamp],
                    ["id" => 2, "nilai" => 40, "updated_at" => $timestamp],
                    ["id" => 3, "nilai" => 50, "updated_at" => $timestamp],
                    ["id" => 4, "nilai" => 100, "updated_at" => $timestamp],
                    ["id" => 5, "nilai" => 150, "updated_at" => $timestamp],
                    ["id" => 6, "nilai" => 200, "updated_at" => $timestamp],
                    ["id" => 7, "nilai" => 300, "updated_at" => $timestamp],
                    ["id" => 8, "nilai" => 450, "updated_at" => $timestamp],
                    ["id" => 9, "nilai" => 600, "updated_at" => $timestamp],
                ],
            ],
        ]);

        AturanPAK::create([
            'name' => 'Tebusan',
            'value' => [
                "konversi" => [
                    ["id" => 1, "choice" => "Kepala Kantor Regional VII BKN", "updated_at" => $timestamp],
                    ["id" => 2, "choice" => 'Sekretaris Tim Penilai Yang Bersangkutan', "updated_at" => $timestamp],
                    ["id" => 3, "choice" => 'Kepala BPS Kabupaten/Kota', "updated_at" => $timestamp],
                    ["id" => 4, "choice" => 'PNS Bersangkutan', "updated_at" => $timestamp],
                    ["id" => 5, "choice" => 'Kepala Biro SDM BPS', "updated_at" => $timestamp],
                    ["id" => 6, "choice" => 'Arsip', "updated_at" => $timestamp],
                ],
                "akumulasi" => [
                    ["id" => 1, "choice" => "Kepala Kantor Regional VII BKN", "updated_at" => $timestamp],
                    ["id" => 2, "choice" => 'Sekretaris Tim Penilai Yang Bersangkutan', "updated_at" => $timestamp],
                    ["id" => 3, "choice" => 'Kepala BPS Kabupaten/Kota', "updated_at" => $timestamp],
                    ["id" => 4, "choice" => 'PNS Bersangkutan', "updated_at" => $timestamp],
                    ["id" => 5, "choice" => 'Kepala Biro SDM BPS', "updated_at" => $timestamp],
                    ["id" => 6, "choice" => 'Arsip', "updated_at" => $timestamp],
                ],
                "penetapan" => [
                    ["id" => 1, "choice" => "Kepala Kantor Regional VII BKN", "updated_at" => $timestamp],
                    ["id" => 2, "choice" => 'Sekretaris Tim Penilai Yang Bersangkutan', "updated_at" => $timestamp],
                    ["id" => 3, "choice" => 'Kepala BPS Kabupaten/Kota', "updated_at" => $timestamp],
                    ["id" => 4, "choice" => 'PNS Bersangkutan', "updated_at" => $timestamp],
                    ["id" => 5, "choice" => 'Kepala Biro SDM BPS', "updated_at" => $timestamp],
                    ["id" => 6, "choice" => 'Arsip', "updated_at" => $timestamp],
                ],
            ],
        ]);

        AturanPAK::create([
            'name' => 'Kesimpulan',
            'value' => [
                ["id" => 1, "teks" => 'Belum Dapat Dipertimbangkan untuk  Kenaikan Pangkat Setingkat Lebih Tinggi', "updated_at" => $timestamp],
                ["id" => 2, "teks" => 'Belum Dapat Dipertimbangkan untuk  Kenaikan Jabatan Setingkat Lebih Tinggi', "updated_at" => $timestamp],
                ["id" => 3, "teks" => 'Belum Dapat Dipertimbangkan untuk  Kenaikan Pangkat & Jabatan Setingkat Lebih Tinggi', "updated_at" => $timestamp],
                ["id" => 4, "teks" => 'Sudah Dapat Dipertimbangkan untuk  Kenaikan Pangkat Setingkat Lebih Tinggi', "updated_at" => $timestamp],
                ["id" => 5, "teks" => 'Sudah Dapat Dipertimbangkan untuk Jabatan Setingkat Lebih Tinggi', "updated_at" => $timestamp],
                ["id" => 6, "teks" => 'Sudah Dapat Dipertimbangkan untuk  Kenaikan Pangkat & Jabatan Setingkat Lebih Tinggi', "updated_at" => $timestamp],
            ],
            'default_config' => 1
        ]);

        // NOTE : Belum tau ini bisa dijadiin ke database nanti dan bisa diedit
        AturanPAK::create([
            'name' => 'Rumus',
            'value' => [
                [
                    "id" => 1,
                    "nama" => 'Angka Kredit',
                    "rumus" => '(periode / 12) * ak_normatif * (presentase / 100)',
                    "updated_at" => $timestamp,
                ],
                [
                    "id" => 2,
                    "nama" => 'Angka Periode',
                    "rumus" => 'periode_berakhir + periode_mulai',
                    "updated_at" => $timestamp,
                ],
                [
                    "id" => 3,
                    "nama" => 'Jumlah Angka Kredit Kumulatif',
                    "rumus" => 'ak_terakhir + ak_terbaru',
                    "updated_at" => $timestamp,
                ],
                [
                    "id" => 4,
                    "nama" => 'AK Minimal untuk Kenaikan Pangkat',
                    "rumus" => 'jakk - pangkat_minimal',
                    "updated_at" => $timestamp,
                ],
                [
                    "id" => 5,
                    "nama" => 'AK Minimal untuk Kenaikan Jabatan',
                    "rumus" => 'jakk - jabatan_minimal',
                    "updated_at" => $timestamp,
                ],
            ],
            'default_config' => 1,
        ]);
    }
}


