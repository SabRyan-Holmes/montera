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
            $table->string('pegawai_nip', 18);
            $table->foreign('pegawai_nip')->references('NIP')->on('pegawais')->onDelete('cascade');
            $table->string('updated_by', 18);
            $table->foreign('updated_by')->references('nip')->on('users')->onDelete('cascade'); //updated 2 Juni 2025 - fk berdasarkan id -> nip
            $table->datetime('tanggal_perubahan');
            $table->string('jenis_perubahan');
            $table->string('nilai_lama')->nullable();
            $table->string('nilai_baru');
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
