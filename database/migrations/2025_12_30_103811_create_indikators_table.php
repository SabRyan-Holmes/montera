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
        Schema::create('indikators', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produk_id')->constrained('produks')->onDelete('cascade');
            $table->string('nama_kpi');
            $table->string('satuan');

            // Gunakan decimal(8,2) agar bisa menampung angka seperti 100.00
            $table->decimal('bobot_nilai', 8, 2);

            // Target minimal untuk acuan batas bawah KPI
            $table->decimal('target_minimal', 15, 2);

            // Simpan rumus atau teks penjelasan cara hitung
            $table->text('metode_perhitungan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('indikators');
    }
};
