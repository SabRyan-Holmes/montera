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
        Schema::create('riwayat_karirs', function (Blueprint $table) {
            $table->id();
            $table->string('pegawai_nip'); // Referensi pegawai
            $table->date('tanggal_perubahan');
            $table->string('jenis_perubahan'); // jabatan, pangkat, unit, gelar, dll
            $table->string('nilai_lama')->nullable();
            $table->string('nilai_baru');
            $table->string('updated_by')->nullable(); // Nama user yang ubah
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_karirs');
    }
};
