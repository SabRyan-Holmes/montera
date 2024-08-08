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
        Schema::create('pegawais', function (Blueprint $table) {
            $table->id();
            // $table->string('Nomor');
            $table->string('Nama');
            $table->bigInteger('NIP/NRP')->unique();
            $table->string('Nomor Seri Karpeg')->nullable();
            $table->string('Pangkat/Golongan Ruangan/TMT');
            $table->string('Tempat/Tanggal Lahir');
            $table->enum('Jenis Kelamin', ['PRIA', 'WANITA']);
            $table->string('Pendidikan');
            $table->string('Jabatan/TMT');
            $table->string('Masa Kerja Golongan');
            $table->string('Unit Kerja');

            $table->string('Daerah');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pegawais');
    }
};
