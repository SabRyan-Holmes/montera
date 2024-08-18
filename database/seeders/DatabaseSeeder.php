<?php

namespace Database\Seeders;

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
