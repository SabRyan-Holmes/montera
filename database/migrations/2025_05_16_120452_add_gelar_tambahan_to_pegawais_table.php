<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // Update tgl 10 April 2025:tambahin field Gelar Tambahan di tabel pegawai
    public function up()
    {
        // Schema::table('pegawais', function (Blueprint $table) {
        //     $table->string('Gelar Tambahan')->nullable()->after('Daerah'); // atau after kolom yang kamu mau
        // });
    }

    public function down()
    {
        // Schema::table('pegawais', function (Blueprint $table) {
        //     $table->dropColumn('Gelar Tambahan');
        // });
    }
};
