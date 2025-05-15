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
            // Relasi dengan data pegawai (menggunakan NIP)
            $table->string('nip', 18); // Sesuaikan panjang NIP sesuai kebutuhan
            $table->foreign('nip')->references('NIP')->on('pegawais')->onDelete('cascade');

            // Data utama pengajuan
            $table->string('jabatan');
            $table->string('periode_penilaian'); // Format: 'YYYY-YYYY'
            $table->decimal('jumlah_ak_terakhir', 8, 2);
            $table->decimal('jumlah_ak_diajukan', 8, 2);

            // Data pendukung (opsional)
            $table->text('uraian_tugas')->nullable();
            $table->string('dokumen_pendukung_path')->nullable();
            $table->bigInteger('catatan_pegawai_id')->nullable();
            $table->foreign('catatan_pegawai_id')->references('id')->on('catatans')->onDelete('cascade');;

            // Status pengajuan
            $table->enum('status', [
                'diproses',
                'disetujui',
                'ditolak'
            ])->default('diproses');

            // Tracking proses
            $table->bigInteger('catatan_sdm_id')->nullable();
            $table->foreign('catatan_sdm_id')->references('id')->on('catatans')->onDelete('cascade');;
            $table->timestamp('tanggal_pengajuan')->nullable();
            $table->timestamp('tanggal_disetujui')->nullable();
            $table->string('disetujui_oleh')->nullable();
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
