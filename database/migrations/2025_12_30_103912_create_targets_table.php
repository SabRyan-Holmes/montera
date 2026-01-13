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
        Schema::create('targets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('produk_id')->nullable()->constrained('produks');

            $table->decimal('nilai_target', 15, 2);
            $table->enum('tipe_target', ['nominal', 'noa']);
            $table->enum('periode', ['mingguan', 'bulanan', 'tahunan']);

            // Tambahkan kolom tahun untuk filter historis
            $table->integer('tahun')->default(2026);

            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai');
            $table->date('deadline_pencapaian');

            $table->text('keterangan_tambahan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('targets');
    }
};
