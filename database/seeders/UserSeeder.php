<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    protected static ?string $password;
    public function run(): void
    {
        User::create([
            'name' => 'DWI UTAMANINGSIH S.Psi., M.M.',
            'nip' => '198807032011012019',
            'role' => 'Divisi SDM',
            'email' => 'sdm.bps1500@gmail.com',
            'jumlah' => [
                'ditetapkan' => 0,
                'divalidasi' => 0,
            ],
            'password' => Hash::make('tanpaair21'),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Pimpinan',
            'nip' => '1000000000000000',
            'role' => "Pimpinan",
            'email' => 'pimpinan.bps1500@gmail.com',
            'jumlah' => [
                'ditetapkan' => 0,
                'divalidasi' => 0,
            ],
            'password' => Hash::make('passwordpimpinan'),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Siti Marfuah, S.E.',
            'role' => "Divisi SDM",
            'nip' => '198711082006042002',
            'email' => 'siti_marfuah@gmail.com',
            'jumlah' => [
                'ditetapkan' => 0,
                'divalidasi' => 0,
            ],
            'password' => Hash::make('passwordsiti'),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'DIAS KHUSNUL KHOTIMAH S.Tr.Stat',
            // 'role' => "Pegawai",
            'nip' => '200002122022012003',
            'email' => 'dias@gmail.com',
            'password' => Hash::make('passworddias'),
            'remember_token' => Str::random(10),
        ]);
    }
}
