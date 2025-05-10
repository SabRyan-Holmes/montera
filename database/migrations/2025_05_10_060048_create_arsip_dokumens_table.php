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
        Schema::create('arsip_dokumens', function (Blueprint $table) {
            $table->id();

            // Kategori/folder
            $table->string('folder_name'); // Misal: "PAK 2024"
            $table->string('title'); // Nama file dokumen, misal: "Penetapan AK"

            // File path
            $table->string('file_path'); // Lokasi file PDF di storage

            // Metadata pegawai
            $table->string('pegawai_nama');
            $table->string('pegawai_nip');

            // Optional: tanggal penetapan
            $table->date('tanggal_penetapan')->nullable();
            $table->text('keterangan')->nullable();

            // Identifikasi siapa pemilik dokumen (user/pimpinan/pegawai)
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('pegawai_nip_owner')->nullable(); // Jika pemiliknya adalah pegawai dari SSO

            $table->timestamps();

            // Unique folder per user
            $table->unique(['folder_name', 'user_id', 'pegawai_nip_owner']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('arsip_dokumens');
    }
};
