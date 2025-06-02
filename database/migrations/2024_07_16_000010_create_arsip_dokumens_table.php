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
            $table->string('user_nip', 18); //bisa user dari sistem/sso
            $table->foreign('user_nip')->references('NIP')->on('pegawais')->onDelete('cascade');
            $table->string('nip_pak')->comment('NIP Pegawai pada dokumen PAK'); //Ga perlu di FK ke tabel pegawai(?)

            // Folder & Filepath
            $table->string('folder_name');
            $table->string('title');
            $table->string('file_path');
            $table->unsignedBigInteger('size'); // Update tgl  1 Juni 2025 - size ditambahin??
            $table->datetime("tanggal_divalidasi")->nullable();
            $table->timestamps();

            // Unique folder per user
            $table->unique(['folder_name', 'user_nip']);
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
