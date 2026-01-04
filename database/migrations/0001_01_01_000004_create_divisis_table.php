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
        Schema::create('divisis', function (Blueprint $table) {
            $table->id();
            $table->string('nama_divisi'); // ex: Pemasaran, IT, Operasional
            $table->string('kode_divisi', 10)->unique(); // ex: MKT, IT, OPS
            $table->string('lokasi_lantai', 10)->nullable();
            $table->string('kepala_divisi')->nullable(); // Nama atau NIP pimpinan divisi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('divisis');
    }
};
