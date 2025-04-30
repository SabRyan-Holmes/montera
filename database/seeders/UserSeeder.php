<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        // User::create([
        //     'name' => 'Divisi Sumber Daya Manusia',
        //     'nip' => '198807032011012019',
        //     'email' => 'sdm.bps1500@gmail.com',
        //     'password' => static::$password ??= Hash::make('tanpaair21'),
        //     'remember_token' => Str::random(10),
        // ]);

        // User::create([
        //     'name' => 'Pimpinan',
        //     'nip' => '1000000000000000',
        //     'email' => 'pimpinan.bps1500@gmail.com',
        //     'password' => static::$password ??= Hash::make('passwordpimpinan'), //tanpaair21
        //     'remember_token' => Str::random(10),
        // ]);

        User::create([
            'name' => 'Siti Marfuah, S.E.',
            'nip' => '198711082006042002',
            'email' => 'siti_marfuah@gmail.com',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);

    }
}
