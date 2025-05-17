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
                [
                    "id" => 2,
                    "nama" => 'Wasi Riyanto, S.ST., M.E.',
                    "nip" => "197405221997031001",
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
                    "jabatan" => 'Muda',
                    "nilai" => 25,
                    "updated_at" => $timestamp,
                ],
                [
                    "id" => 5,
                    "jabatan" => 'Madya',
                    "nilai" => 37,
                    5,
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
            'name' => 'Angka Minimal Pangkat',
            'value' => [
                ["id" => 1, "angka" => 20, "updated_at" => $timestamp],
                ["id" => 2, "angka" => 40, "updated_at" => $timestamp],
                ["id" => 3, "angka" => 50, "updated_at" => $timestamp],
                ["id" => 4, "angka" => 100, "updated_at" => $timestamp],
                ["id" => 5, "angka" => 150, "updated_at" => $timestamp],
                ["id" => 6, "angka" => 200, "updated_at" => $timestamp],
                ["id" => 7, "angka" => 250, "updated_at" => $timestamp],
                ["id" => 8, "angka" => 300, "updated_at" => $timestamp],
                ["id" => 9, "angka" => 450, "updated_at" => $timestamp],
                ["id" => 10, "angka" => 600, "updated_at" => $timestamp],
            ],
            'default_config' => 4
        ]);

        AturanPAK::create([
            'name' => 'Angka Minimal Jabatan',
            'value' => [
                ["id" => 1, "angka" => 20, "updated_at" => $timestamp],
                ["id" => 2, "angka" => 40, "updated_at" => $timestamp],
                ["id" => 3, "angka" => 50, "updated_at" => $timestamp],
                ["id" => 4, "angka" => 100, "updated_at" => $timestamp],
                ["id" => 5, "angka" => 150, "updated_at" => $timestamp],
                ["id" => 6, "angka" => 200, "updated_at" => $timestamp],
                ["id" => 7, "angka" => 300, "updated_at" => $timestamp],
                ["id" => 8, "angka" => 450, "updated_at" => $timestamp],
                ["id" => 9, "angka" => 600, "updated_at" => $timestamp],
            ],
            'default_config' => 4

        ]);

        AturanPAK::create([
            'name' => 'Tebusan Konversi',
            'value' => [
                ["id" => 1, "pihak_tebusan" => "Kepala Kantor Regional VII BKN", "updated_at" => $timestamp],
                ["id" => 2, "pihak_tebusan" => 'Sekretaris Tim Penilai Yang Bersangkutan', "updated_at" => $timestamp],
                ["id" => 3, "pihak_tebusan" => 'Kepala BPS Kabupaten/Kota', "updated_at" => $timestamp],
                ["id" => 4, "pihak_tebusan" => 'PNS Bersangkutan', "updated_at" => $timestamp],
                ["id" => 5, "pihak_tebusan" => 'Kepala Biro SDM BPS', "updated_at" => $timestamp],
                ["id" => 6, "pihak_tebusan" => 'Arsip', "updated_at" => $timestamp],
            ],
        ]);

        AturanPAK::create([
            'name' => 'Tebusan Akumulasi',
            'value' => [
                ["id" => 1, "pihak_tebusan" => "Kepala Kantor Regional VII BKN", "updated_at" => $timestamp],
                ["id" => 2, "pihak_tebusan" => 'Sekretaris Tim Penilai Yang Bersangkutan', "updated_at" => $timestamp],
                ["id" => 3, "pihak_tebusan" => 'Kepala BPS Kabupaten/Kota', "updated_at" => $timestamp],
                ["id" => 4, "pihak_tebusan" => 'PNS Bersangkutan', "updated_at" => $timestamp],
                ["id" => 5, "pihak_tebusan" => 'Kepala Biro SDM BPS', "updated_at" => $timestamp],
                ["id" => 6, "pihak_tebusan" => 'Arsip', "updated_at" => $timestamp],
            ],
        ]);

        AturanPAK::create([
            'name' => 'Tebusan Penetapan',
            'value' => [
                ["id" => 1, "pihak_tebusan" => "Kepala Kantor Regional VII BKN", "updated_at" => $timestamp],
                ["id" => 2, "pihak_tebusan" => 'Sekretaris Tim Penilai Yang Bersangkutan', "updated_at" => $timestamp],
                ["id" => 3, "pihak_tebusan" => 'Kepala BPS Kabupaten/Kota', "updated_at" => $timestamp],
                ["id" => 4, "pihak_tebusan" => 'PNS Bersangkutan', "updated_at" => $timestamp],
                ["id" => 5, "pihak_tebusan" => 'Kepala Biro SDM BPS', "updated_at" => $timestamp],
                ["id" => 6, "pihak_tebusan" => 'Arsip', "updated_at" => $timestamp],
            ],
        ]);

        AturanPAK::create([
            'name' => 'Kesimpulan',
            'value' => [
                ["id" => 1, "kesimpulan" => 'Belum Dapat Dipertimbangkan untuk  Kenaikan Pangkat Setingkat Lebih Tinggi', "updated_at" => $timestamp],
                ["id" => 2, "kesimpulan" => 'Belum Dapat Dipertimbangkan untuk  Kenaikan Jabatan Setingkat Lebih Tinggi', "updated_at" => $timestamp],
                ["id" => 3, "kesimpulan" => 'Belum Dapat Dipertimbangkan untuk  Kenaikan Pangkat & Jabatan Setingkat Lebih Tinggi', "updated_at" => $timestamp],
                ["id" => 4, "kesimpulan" => 'Sudah Dapat Dipertimbangkan untuk  Kenaikan Pangkat Setingkat Lebih Tinggi', "updated_at" => $timestamp],
                ["id" => 5, "kesimpulan" => 'Sudah Dapat Dipertimbangkan untuk Jabatan Setingkat Lebih Tinggi', "updated_at" => $timestamp],
                ["id" => 6, "kesimpulan" => 'Sudah Dapat Dipertimbangkan untuk  Kenaikan Pangkat & Jabatan Setingkat Lebih Tinggi', "updated_at" => $timestamp],
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
