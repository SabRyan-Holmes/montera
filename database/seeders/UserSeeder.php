<?php

namespace Database\Seeders;

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
            'email' => 'adminbankxyz@mail.com',
            'password' => Hash::make('password'),
            'jabatan_id' => 1, //Admin
            'status_aktif' => 'aktif'
        ]);

        // 2. Kepala Cabang (2 Orang)
        User::create([
            'name' => 'Kepala Cabang I Bank XYZ',
            'nip' => '19900102007',
            'email' => 'kacab@mail.com',
            'password' => Hash::make('password'),
            'jabatan_id' => 2, //Kacab
            'status_aktif' => 'aktif'
        ]);

        User::create([
            'name' => 'Kepala Cabang II Bank XYZ',
            'nip' => '19940102007',
            'email' => 'kacab2@mail.com',
            'password' => Hash::make('password'),
            'jabatan_id' => 2,
            'status_aktif' => 'aktif'
        ]);

        // 3. Supervisor (5 Orang)
        $spvs = [
            ['name' => 'Siti SPV', 'nip' => '19900101002', 'email' => 'siti_spv@mail.com'],
            ['name' => 'Indra SPV', 'nip' => '19900104402', 'email' => 'indra_spv@mail.com'],
            ['name' => 'Anto SPV', 'nip' => '19904104402', 'email' => 'anto_spv@mail.com'],
            ['name' => 'Roni SPV', 'nip' => '19904184402', 'email' => 'roni_spv@mail.com'],
            ['name' => 'Toni SPV', 'nip' => '19964184402', 'email' => 'toni_spv@mail.com'],
        ];

        foreach ($spvs as $spv) {
            User::create([
                'name' => $spv['name'],
                'nip' => $spv['nip'],
                'email' => $spv['email'],
                'password' => Hash::make('password'),
                'jabatan_id' => 3, //Supervisor
                'status_aktif' => 'aktif'
            ]);
        }



        // 4. PEGAWAI (Staff Lapangan/Sales) - Tambah jadi 19 Orang
        // Total User: 1 (Admin) + 5 (SPV) + 2 (Kacab) + 19 (Pegawai) = 27 User
        for ($i = 1; $i <= 17; $i++) {
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
