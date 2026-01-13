<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // database/migrations/xxxx_create_produks_table.php
    public function up(): void
    {
        Schema::create('produks', function (Blueprint $table) {
            $table->id();
            $table->string('nama_produk'); // Contoh: TABUNGAN ONLINE
            $table->string('kode_produk')->unique();

            // Kategori Indikator (Funding, Kredit, E-Channel, dll)
            $table->string('kategori_produk');

            // Label Input Form (Contoh: "NOMOR REKENING", "ID COMPANY")
            $table->string('label_input');
            // Satuan untuk display: 'Rekening', 'Unit', 'Merchant', 'Polis'
            $table->string('satuan')->default('Unit');
            // Bobot Penilaian (Poin) sesuai Jabatan
            $table->integer('bobot_frontliner')->default(0);
            $table->integer('bobot_kredit')->default(0);

            $table->enum('status', ['tersedia', 'discontinued'])->default('tersedia');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produks');
    }
};
