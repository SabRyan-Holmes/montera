<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         // Set tanggal 29 Juli 2024, jam 08:00:00
         $fixedDate = '2024-07-29 08:00:00';

         DB::table('pegawais')->update([
             'created_at' => $fixedDate,
             'updated_at' => $fixedDate,
         ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Optional: Kosongkan timestamp jika rollback
        DB::table('pegawais')->update([
            'created_at' => null,
            'updated_at' => null,
        ]);
    }
};
