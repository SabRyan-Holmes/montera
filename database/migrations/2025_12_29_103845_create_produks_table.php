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
        Schema::create('produks', function (Blueprint $table) {
            $table->id();
            $table->string('nama_produk'); // Contoh: Kredit Mikro, Tabungan Berjangka
            $table->string('kode_produk')->unique(); // Contoh: KM-001
            $table->enum('kategori', ['tabungan', 'kredit', 'asuransi', 'retail', 'corporate', 'digital']);
            $table->decimal('harga_satuan', 15, 2)->default(0);
            $table->decimal('komisi_poin', 8, 2)->default(0); // Poin performa per produk
            $table->text('deskripsi_produk')->nullable();
            $table->enum('status', ['tersedia', 'discontinued', 'aktif'])->default('tersedia');
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
