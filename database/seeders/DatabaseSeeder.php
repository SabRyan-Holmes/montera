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
            JabatanSeeder::class,
            DivisiSeeder::class,
            UserSeeder::class,
            ProdukSeeder::class,
            TargetSeeder::class,
            AkuisisiSeeder::class,
            TransaksiSeeder::class,
        ]);
    }
}
