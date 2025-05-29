<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // public function up(): void
    // {
    //     Schema::table('riwayat_pak', function (Blueprint $table) {
    //         // Tempatkan kolom baru sebelum 'pegawai_id'
    //         $table->foreignId('created_by')
    //               ->constrained('users')
    //               ->before('pegawai_id'); // Laravel 11 ke atas mendukung 'before'

    //         $table->foreignId('pengusulan_pak_id')
    //               ->nullable()
    //               ->constrained('pengusulan_pak')
    //               ->before('pegawai_id');
    //     });
    // }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('riwayat_pak', function (Blueprint $table) {
            $table->dropForeign(['created_by']);
            $table->dropColumn('created_by');

            $table->dropForeign(['pengusulan_pak_id']);
            $table->dropColumn('pengusulan_pak_id');
        });
    }
};
