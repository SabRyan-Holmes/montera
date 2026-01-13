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
        Schema::create('transaksis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users'); // Siapa pegawainya
            $table->foreignId('produk_id')->constrained('produks'); // Apa produknya
            $table->foreignId('akuisisi_id')->constrained('akuisisis'); // Referensi ke laporan aslinya

            $table->decimal('nilai_realisasi', 15, 2); // Nominal duitnya
            $table->integer('poin_didapat'); // Skor poin berdasarkan bobot indikator
            $table->integer('bulan'); // Untuk filter dashboard
            $table->integer('tahun');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksis');
    }
};
