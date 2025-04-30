<?php

namespace Database\Seeders;

use App\Models\Koefisien;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    protected static ?string $password;

    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);


        User::create([
            'name' => 'Divisi Sumber Daya Manusia',
            'nip' => '198807032011012019',
            'email' => 'sdm.bps1500@gmail.com',
            'password' => static::$password ??= Hash::make('tanpaair21'),
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Pimpinan',
            'nip' => '1000000000000000',
            'email' => 'pimpinan.bps1500@gmail.com',
            'password' => static::$password ??= Hash::make('passwordpimpinan'), //tanpaair21
            'remember_token' => Str::random(10),
        ]);

         // User::create([
        //     'name' => 'Siti Marfuah, S.E.',
        //     'nip' => '198711082006042002',
        //     'email' => 'siti_marfuah@gmail.com',
        //     'password' => static::$password ??= Hash::make('password'),
        //     'remember_token' => Str::random(10),
        // ]);

        // const akNormatif = {
        //     Terampil: 5,
        //     Mahir: 12.5,
        //     Penyelia: 25,
        //     Pertama: 12.5,
        //     Muda: 25,
        //     Madya: 37.5,
        // };

        // Koefisien::create([
        //     'jabatan' => 'Terampil',
        //     'nilai' => 5,
        // ]);

        // Koefisien::create([
        //     'jabatan' => 'Mahir',
        //     'nilai' => 12.5,
        // ]);

        // Koefisien::create([
        //     'jabatan' => 'Penyelia',
        //     'nilai' => 25,
        // ]);

        // Koefisien::create([
        //     'jabatan' => 'Pertama',
        //     'nilai' => 12.5,
        // ]);

        // Koefisien::create([
        //     'jabatan' => 'Madya',
        //     'nilai' => 25,
        // ]);

        // Koefisien::create([
        //     'jabatan' => 'Muda',
        //     'nilai' => 37.5,
        // ]);

        // User::create([
        //     'name' => 'Dwi Utaminingsih, S.Psi, MM.',
        //     'nip' => '198807032011012019',
        //     'email' => 'sdm.bps1500@gmail.com',
        //     'password' => static::$password ??= Hash::make('tanpaair21'),
        //     'remember_token' => Str::random(10),
        // ]);

        // User::create([
        //     'name' => 'Siti Marfuah, S.E.',
        //     'nip' => '198711082006042002',
        //     'email' => 'siti_marfuah@gmail.com',
        //     'password' => static::$password ??= Hash::make('password'),
        //     'remember_token' => Str::random(10),
        // ]);


    }
}
