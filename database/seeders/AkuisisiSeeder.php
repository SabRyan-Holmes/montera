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
        $pegawaiIds = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Pegawai'))->pluck('id');

        // Ambil ID semua Supervisor
        $supervisorIds = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Supervisor'))->pluck('id');

        $produkIds = Produk::pluck('id');

        // Total 75 Nama Nasabah Realistis
        $nasabahList = [
            'Budi Santoso', 'Siti Aminah', 'Andi Wijaya', 'Rina Pratama', 'Eko Susanto',
            'Dewi Lestari', 'Fajar Ramadhan', 'Gita Gutawa', 'Hadi Sucipto', 'Indah Permata',
            'Joko Widodo', 'Kartika Sari', 'Lutfi Hakim', 'Maya Ahmad', 'Nico Saputra',
            'Oki Setiawan', 'Putri Ayu', 'Qori Iskandar', 'Rudi Hartono', 'Siska Amelia',
            'Tono Subagyo', 'Umar Bakri', 'Vina Panduwinata', 'Wawan Hendrawan', 'Xena Warrior',
            'Yusuf Mansur', 'Zainal Abidin', 'Agus Salim', 'Bambang Pamungkas', 'Cici Paramida',
            'Dedi Corbuzier', 'Endang Soekamti', 'Farah Quinn', 'Gading Marten', 'Hesti Purwadinata',
            'Irfan Hakim', 'Jessica Iskandar', 'Kevin Aprilio', 'Luna Maya', 'Melly Goeslaw',
            'Nunung Srimulat', 'Opick Tomboati', 'Pasha Ungu', 'Qibil Changcuters', 'Raffi Ahmad',
            'Sule Prikitiw', 'Tukul Arwana', 'Uya Kuya', 'Vicky Prasetyo', 'Wendy Cagur',
            'Xabiru Oshe', 'Yuni Shara', 'Zaskia Gotik', 'Ade Rai', 'Baim Wong',
            'Chika Jessica', 'Denny Cagur', 'Eko Patrio', 'Fitri Tropica', 'Gilang Dirga',
            'Hengky Kurniawan', 'Indra Bekti', 'Jojon Pelawak', 'Komeng Uhuy', 'Lesti Kejora',
            'Mpok Alpa', 'Nassar Sungkar', 'Olga Syahputra', 'Parto Patrio', 'Quilla Simanjuntak',
            'Rina Nose', 'Sojimah Pancawati', 'Tora Sudiro', 'Ucok Baba', 'Vincent Rompies'
        ];

        $statuses = ['pending', 'verified', 'rejected'];

        foreach ($nasabahList as $index => $nama) {
            $status = $statuses[array_rand($statuses)];
            $pegawai = $pegawaiIds->random();
            $produk = $produkIds->random();

            // LOGIKA PERBAIKAN VERIFIKATOR:
            // Jika verified/rejected, verifikator HARUS diisi (random dari list SPV).
            // Jika pending, verifikator NULL.
            $verifikator = ($status !== 'pending') ? $supervisorIds->random() : null;
            $verifiedAt = ($status !== 'pending') ? now()->subDays(rand(0, 5)) : null;
            $catatan = ($status === 'rejected') ? 'Dokumen KTP buram atau tanda tangan tidak cocok.' : null;

            Akuisisi::create([
                'no_transaksi' => 'TRX-' . date('Ymd') . '-' . str_pad($index + 1, 4, '0', STR_PAD_LEFT),
                'user_id' => $pegawai,
                'produk_id' => $produk,
                'nama_nasabah' => $nama,
                'no_identitas_nasabah' => rand(1100000000000000, 9900000000000000), // 16 digit NIK
                'nominal_realisasi' => rand(1000000, 150000000), // 1jt - 150jt
                'tanggal_akuisisi' => now()->subDays(rand(1, 60)),

                'status_verifikasi' => $status,
                'verifikator_id' => $verifikator,
                'verified_at' => $verifiedAt,
                'catatan_revisi' => $catatan,

                'created_at' => now()->subDays(rand(1, 60)),
                'lampiran_bukti' => 'bukti_akuisisi_' . ($index + 1) . '.pdf',
            ]);
        }
    }
}
