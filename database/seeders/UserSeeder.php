<?php

namespace Database\Seeders;

use App\Models\Divisi;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin (1 Orang)
        User::create([
            'name' => 'Budi Administrator',
            'nip' => '19900101001',
            'email' => 'admin@bankxyz.com',
            'password' => Hash::make('password'),
            'jabatan_id' => 1, //Admin
            'status_aktif' => 'aktif'
        ]);

        // 2. Kepala Cabang (2 Orang)
        User::create([
            'name' => 'Kepala Cabang I Bank XYZ',
            'nip' => '19900102007',
            'email' => 'kacab@bankxyz.com',
            'password' => Hash::make('password'),
            'jabatan_id' => 2, //Kacab
            'status_aktif' => 'aktif'
        ]);

        User::create([
            'name' => 'Kepala Cabang II Bank XYZ',
            'nip' => '19940102007',
            'email' => 'kacab2@bankxyz.com',
            'password' => Hash::make('password'),
            'jabatan_id' => 2,
            'status_aktif' => 'aktif'
        ]);

        // 3. Supervisor (7 Orang - Beda Divisi & Template Nama)
        // Ambil semua ID divisi yang ada di database
        $divisiIds = Divisi::pluck('id');

        // Loop 1 sampai 7
        for ($i = 1; $i <= 7; $i++) {

            // Logic untuk membagi divisi secara urut.
            // Menggunakan modulus (%) agar jika jumlah divisi < 7, dia akan loop balik ke divisi pertama.
            $assignedDivisi = $divisiIds->count() > 0
                ? $divisiIds[($i - 1) % $divisiIds->count()]
                : null;

            User::create([
                'name' => 'Supervisor ' . $i,
                // Generate NIP dummy (contoh: 1990010001)
                'nip' => '1990010' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'email' => "spv{$i}@bankxyz.com",
                'password' => Hash::make('password'),
                'jabatan_id' => 3, // ID Supervisor
                'divisi_id' => $assignedDivisi, // Set Divisi berbeda-beda
                'status_aktif' => 'aktif'
            ]);
        }

        // 4. PEGAWAI (Staff Lapangan/Sales) - Tambah jadi 19 Orang
        // Total User: 1 (Admin) + 5 (SPV) + 2 (Kacab) + 19 (Pegawai) = 27 User
        for ($i = 1; $i <= 20; $i++) {
            User::create([
                'name' => "Pegawai Unit $i",
                'nip' => "300" . str_pad($i, 3, '0', STR_PAD_LEFT), // Padding jadi 3 digit biar rapi
                'email' => "staff$i@bankxyz.com",
                'password' => bcrypt('password'),
                'jabatan_id' => 4, // Pegawai
                'divisi_id' => rand(1, 7),
                'status_aktif' => 'aktif'
            ]);
        }
    }
}
