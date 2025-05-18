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
            $table->string('nip', 18); // Sesuaikan panjang NIP sesuai kebutuhan
            $table->foreign('nip')->references('NIP')->on('pegawais')->onDelete('cascade');

            $table->date('tanggal_perubahan');
            $table->string('jenis_perubahan'); // jabatan, pangkat, unit, gelar, dll
            $table->string('nilai_lama')->nullable();
            $table->string('nilai_baru');

            $table->foreignId('updated_by')->constrained('users')->onDelete('cascade');

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
