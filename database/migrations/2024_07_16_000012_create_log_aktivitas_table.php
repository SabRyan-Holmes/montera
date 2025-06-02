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
        Schema::create('log_aktivitas', function (Blueprint $table) {
            $table->id();
            // Jika user login via tabel User(Divisi SDM & Pimpinan)
            $table->string('user_nip', 18)->nullable();
            $table->foreign('user_nip')->references('nip')->on('users')->onDelete('cascade'); //updated 2 Juni 2025 - fk berdasarkan id -> nip
            $table->string('pegawai_nip', 18)->nullable(); //jika pegawai dari SSO
            $table->foreign('pegawai_nip')->references('NIP')->on('pegawais')->onDelete('cascade');
            $table->string('aktivitas');
            $table->text('keterangan')->nullable();
            $table->string('entity_type')->nullable();
            $table->unsignedBigInteger('entity_id')->nullable();
            $table->ipAddress('ip_address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_aktivitas');
    }
};
