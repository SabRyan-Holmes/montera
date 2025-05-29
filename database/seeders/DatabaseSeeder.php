<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    protected static ?string $password;

    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            AturanPAKSeeder::class,
        ]);
    }
}
