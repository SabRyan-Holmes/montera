<?php

namespace Database\Seeders;

use App\Models\Akuisisi;
use App\Models\Produk;
use App\Models\User;
use Illuminate\Database\Seeder;

class AkuisisiSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Ambil data Pegawai dan Supervisor lengkap dengan divisi_id nya
        $pegawaiList = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Pegawai'))->get();
        $produkIds = Produk::pluck('id');

        $nasabahList = [
            'Budi Santoso',
            'Siti Aminah',
            'Andi Wijaya',
            'Rina Pratama',
            'Eko Susanto',
            'Dewi Lestari',
            'Fajar Ramadhan',
            'Gita Gutawa',
            'Hadi Sucipto',
            'Indah Permata',
            'Joko Widodo',
            'Kartika Sari',
            'Lutfi Hakim',
            'Maya Ahmad',
            'Nico Saputra',
            'Oki Setiawan',
            'Putri Ayu',
            'Qori Iskandar',
            'Rudi Hartono',
            'Siska Amelia',
            'Tono Subagyo',
            'Umar Bakri',
            'Vina Panduwinata',
            'Wawan Hendrawan',
            'Xena Warrior',
            'Yusuf Mansur',
            'Zainal Abidin',
            'Agus Salim',
            'Bambang Pamungkas',
            'Cici Paramida',
            'Dedi Corbuzier',
            'Endang Soekamti',
            'Farah Quinn',
            'Gading Marten',
            'Hesti Purwadinata',
            'Irfan Hakim',
            'Jessica Iskandar',
            'Kevin Aprilio',
            'Luna Maya',
            'Melly Goeslaw',
            'Nunung Srimulat',
            'Opick Tomboati',
            'Pasha Ungu',
            'Qibil Changcuters',
            'Raffi Ahmad',
            'Sule Prikitiw',
            'Tukul Arwana',
            'Uya Kuya',
            'Vicky Prasetyo',
            'Wendy Cagur',
            'Xabiru Oshe',
            'Yuni Shara',
            'Zaskia Gotik',
            'Ade Rai',
            'Baim Wong',
            'Chika Jessica',
            'Denny Cagur',
            'Eko Patrio',
            'Fitri Tropica',
            'Gilang Dirga',
            'Hengky Kurniawan',
            'Indra Bekti',
            'Jojon Pelawak',
            'Komeng Uhuy',
            'Lesti Kejora',
            'Mpok Alpa',
            'Nassar Sungkar',
            'Olga Syahputra',
            'Parto Patrio',
            'Quilla Simanjuntak',
            'Rina Nose',
            'Sojimah Pancawati',
            'Tora Sudiro',
            'Ucok Baba',
            'Vincent Rompies',
            'Siti Aminah',
            'Andi Wijaya',
            'Rina Pratama',
            'Eko Susanto',
            'Dewi Lestari',
            'Fajar Ramadhan',
            'Gita Gutawa',
            'Hadi Sucipto',
            'Indah Permata'
        ];

        $statuses = ['pending', 'verified', 'rejected'];
        $usedIdentities = [];

        foreach ($nasabahList as $index => $nama) {
            $status = $statuses[array_rand($statuses)];
            $pegawai = $pegawaiList->random(); // Ambil 1 pegawai random
            $produkId = $produkIds->random();

            // Cek duplikasi identitas + produk
            $noIdentitas = rand(1000000000, 9999999999);
            $key = $noIdentitas . '-' . $produkId;
            if (in_array($key, $usedIdentities)) continue;
            $usedIdentities[] = $key;

            // --- LOGIC VERIFIKATOR SESUAI DIVISI ---
            $verifikatorId = null;
            $verifiedAt = null;

            if ($status !== 'pending') {
                // Cari Supervisor yang divisi_id nya SAMA dengan si Pegawai
                $supervisor = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Supervisor'))
                    ->where('divisi_id', $pegawai->divisi_id)
                    ->first(); // Ambil SPV dari divisi tersebut

                // Jika ditemukan SPV di divisi tersebut, pakai ID-nya
                $verifikatorId = $supervisor ? $supervisor->id : null;
                $verifiedAt = now()->subDays(rand(0, 5));
            }
            // ----------------------------------------

            Akuisisi::create([
                'no_transaksi' => 'TRX-' . date('Ymd') . '-' . str_pad($index + 1, 4, '0', STR_PAD_LEFT),
                'user_id' => $pegawai->id,
                'produk_id' => $produkId,
                'nama_nasabah' => $nama,
                'no_identitas_nasabah' => $noIdentitas,
                'nominal_realisasi' => rand(1000000, 50000000),
                'tanggal_akuisisi' => now()->subDays(rand(1, 30)),
                'status_verifikasi' => $status,
                'verifikator_id' => $verifikatorId,
                'verified_at' => $verifiedAt,
                'created_at' => now()->subDays(rand(1, 5)),
            ]);
        }
    }
}
