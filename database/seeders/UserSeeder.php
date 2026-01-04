<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Jabatan;
use App\Models\Divisi;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    protected static ?string $password;
    public function run(): void
    {
        // // --- 1. SEED DATA JABATAN (Sesuai UC-03) ---
        // $adminJabatan = Jabatan::create([
        //     'nama_jabatan' => 'Administrator',
        //     'kode_jabatan' => 'ADM',
        //     'level_otoritas' => 1,
        //     'deskripsi_tugas' => 'Mengelola master data sistem'
        // ]);

        // $spvJabatan = Jabatan::create([
        //     'nama_jabatan' => 'Supervisor',
        //     'kode_jabatan' => 'SPV',
        //     'level_otoritas' => 2,
        //     'deskripsi_tugas' => 'Verifikasi data akuisisi pegawai'
        // ]);

        // $staffJabatan = Jabatan::create([
        //     'nama_jabatan' => 'Pegawai',
        //     'kode_jabatan' => 'STF',
        //     'level_otoritas' => 3,
        //     'deskripsi_tugas' => 'Input data akuisisi nasabah'
        // ]);

        // $kcJabatan = Jabatan::create([
        //     'nama_jabatan' => 'Kepala Cabang',
        //     'kode_jabatan' => 'KCB',
        //     'level_otoritas' => 3,
        //     'deskripsi_tugas' => 'Input data akuisisi nasabah'
        // ]);

        // // --- 2. SEED DATA DIVISI (Sesuai UC-04) ---
        // $mktDivisi = Divisi::create([
        //     'nama_divisi' => 'Marketing',
        //     'kode_divisi' => 'MKT',
        //     'lokasi_lantai' => 'Lantai 2'
        // ]);

        // $opsDivisi = Divisi::create([
        //     'nama_divisi' => 'Operasional',
        //     'kode_divisi' => 'OPS',
        //     'lokasi_lantai' => 'Lantai 1'
        // ]);

        // --- 3. SEED DATA USERS (5 User: 1 Admin, 1 SPV, 3 Pegawai) ---

        // 1. Admin
        User::create([
            'name' => 'Budi Administrator',
            'nip' => '19900101001',
            'email' => 'adminbankxyz@mail.com',
            'password' => Hash::make('password'),
            'jabatan_id' => 1, // Admin
            'divisi_id' => 1,  // Admin & SDM
            'status_aktif' => 'aktif'
        ]);

        // 2. Supervisor
        User::create([
            'name' => 'Siti Supervisor',
            'nip' => '19900101002',
            'email' => 'spv@mail.com',
            'password' => Hash::make('password'),
            'jabatan_id' => 2, // SPV
            'divisi_id' => 2,  // Operasional
            'status_aktif' => 'aktif'
        ]);

        // 3. Kepala Cabang
        User::create([
            'name' => 'Kepala Cabang I Bank XYZ',
            'nip' => '19900102007',
            'email' => 'kacab@mail.com',
            'password' => Hash::make('password'),
            'jabatan_id' => 3, //Kepala Cabang
            'divisi_id' => 5, //Khusus Kepala Cabang
            'status_aktif' => 'aktif'
        ]);

        // 4. PEGAWAI (Staff Lapangan/Sales) - 12 Orang
        // Total User jadi 15 (1 Kacab, 1 Admin, 1 SPV, 12 Pegawai)
        for ($i = 1; $i <= 12; $i++) {
            User::create([
                'name' => "Pegawai Unit $i",
                'nip' => "300" . str_pad($i, 2, '0', STR_PAD_LEFT),
                'email' => "staff$i@bankxyz.com",
                'password' => bcrypt('password'),
                'jabatan_id' => 4, // ID 4 = Pegawai
                'divisi_id' => rand(2, 4), // Tersebar di Ops, Mkt, atau Kredit
            ]);
        }
    }
}
