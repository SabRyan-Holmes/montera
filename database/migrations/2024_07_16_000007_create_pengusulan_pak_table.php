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
        Schema::create('pengusulan_pak', function (Blueprint $table) {
            $table->id();
            // Relasi dengan data pegawai  & user (by NIP)
            $table->string('pegawai_nip', 18); // Sesuaikan panjang NIP sesuai kebutuhan
            $table->foreign('pegawai_nip')->references('NIP')->on('pegawais')->onDelete('cascade');
            $table->string('approved_by', 18)->nullable(); // Sesuaikan panjang NIP sesuai kebutuhan
            $table->foreign('approved_by')->references('nip')->on('users')->onDelete('cascade'); //update tgl 2 Juni 2025-berdasarkan nip skrg
            // Data utama pengajuan
            $table->string('tujuan');
            $table->date('periode_mulai');
            $table->date('periode_berakhir');
            $table->decimal('ak_terakhir', 8, 3);
            $table->decimal('ak_diajukan', 8, 3);
            $table->boolean('is_penilaian_pdd')->default(false);
            // Data pendukung (opsional)
            $table->string('dokumen_utama_path'); // Dokumen penilaian kinerja
            $table->string('dokumen_pendukung_path')->nullable(); // Dokumen penilaian pendidikan (Ijazah Terbaru)
            $table->foreignId('catatan_pegawai_id')->nullable()->constrained('catatans')->onDelete('cascade');

            // Status pengajuan
            $table->enum('status', [
                'diusulkan',
                'disetujui',
                'ditolak',
                'direvisi',
            ])->default('diusulkan');

            // Tracking proses
            $table->foreignId('catatan_sdm_id')->nullable()->constrained('catatans')->onDelete('cascade');
            $table->datetime('tanggal_ditolak')->nullable();
            $table->datetime('tanggal_diperbaiki')->nullable();
            $table->datetime('tanggal_disetujui')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengusulan_pak');
    }
};
