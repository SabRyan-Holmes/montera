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
        Schema::create('akuisisis', function (Blueprint $table) {
            $table->id();
            $table->string('no_transaksi')->unique(); // Penting untuk tracking laporan manual lama

            // Relasi Aktor
            $table->foreignId('user_id')->constrained('users'); // Pegawai (UC-07)
            $table->foreignId('produk_id')->constrained('produks'); // Tabungan/Kredit/Asuransi

            // Data Nasabah (Wajib ada untuk objektivitas)
            $table->string('nama_nasabah');
            $table->string('no_identitas_nasabah')->nullable(); // NIK atau No. Rekening

            // Data Keuangan
            $table->decimal('nominal_realisasi', 15, 2);
            $table->date('tanggal_akuisisi');

            // Status Verifikasi (Workflow UC-11)
            $table->enum('status_verifikasi', ['pending', 'verified', 'rejected'])->default('pending');
            $table->foreignId('verifikator_id')->nullable()->constrained('users'); // Supervisor
            $table->dateTime('verified_at')->nullable();
            $table->text('catatan_revisi')->nullable(); // Alasan tolak/catatan supervisor

            // Lampiran (Bukti fisik agar tidak manipulasi data)
            $table->string('lampiran_bukti')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('akuisisis');
    }
};
