<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jabatans', function (Blueprint $table) {
            $table->id();
            $table->string('nama_jabatan'); // ex: Kepala Cabang, Supervisor, Staff
            $table->string('kode_jabatan')->unique(); // ex: KACAB, SPV, STF
            $table->integer('level_otoritas'); // Untuk kontrol akses menu
            $table->text('deskripsi_tugas')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jabatans');
    }
};
