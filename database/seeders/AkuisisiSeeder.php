<?php

namespace Database\Seeders;

use App\Models\Akuisisi;
use App\Models\Produk;
use App\Models\User;
use Illuminate\Database\Seeder;

class AkuisisiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
  public function run(): void
{
    $pegawaiIds = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Pegawai'))->pluck('id');
    $supervisorId = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Supervisor'))->first()->id;
    $produkIds = Produk::pluck('id');

    $nasabah = [
        'Budi Santoso', 'Siti Aminah', 'Andi Wijaya', 'Rina Pratama', 'Eko Susanto',
        'Dewi Lestari', 'Fajar Ramadhan', 'Gita Gutawa', 'Hadi Sucipto', 'Indah Permata',
        'Joko Widodo', 'Kartika Sari', 'Lutfi Hakim', 'Maya Ahmad', 'Nico Saputra'
    ];

    // Sesuaikan dengan ENUM di migrasi: pending, verified, rejected
    $statuses = ['pending', 'verified', 'rejected'];

    foreach ($nasabah as $index => $nama) {
        $status = $statuses[array_rand($statuses)];

        Akuisisi::create([
            'no_transaksi' => 'TRX-' . date('Ymd') . '-' . str_pad($index + 1, 3, '0', STR_PAD_LEFT),
            'user_id' => $pegawaiIds->random(),
            'produk_id' => $produkIds->random(),
            'nama_nasabah' => $nama,
            'no_identitas_nasabah' => rand(1000000000000000, 9999999999999999), // Contoh NIK

            // SINKRONKAN DISINI: Pakai nominal_realisasi
            'nominal_realisasi' => rand(10000000, 200000000),
            'tanggal_akuisisi' => now()->subDays(rand(1, 30)),

            // SINKRONKAN DISINI: Pakai status_verifikasi
            'status_verifikasi' => $status,
            'verifikator_id' => $status !== 'pending' ? $supervisorId : null,
            'verified_at' => $status !== 'pending' ? now() : null,
            'catatan_revisi' => $status === 'rejected' ? 'Dokumen identitas nasabah kurang jelas/blur.' : null,

            'created_at' => now()->subDays(rand(1, 30)),
            'lampiran_bukti' => 'bukti_tf_' . $index . '.jpg',
        ]);
    }
}
}
