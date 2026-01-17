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
            $table->enum('main_divisi', ['Front Liner', 'Kredit']);
            $table->string('nama_divisi');
            $table->string('kode_divisi', 10)->unique();
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
