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

            // Jika user login via User model
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('pegawai_nip', 18)->nullable(); // Sesuaikan panjang NIP sesuai kebutuhan
            $table->foreign('pegawai_nip')->references('NIP')->on('pegawais')->onDelete('cascade');
            $table->string('aktivitas'); // Misal: "Mengunduh File PAK"
            $table->text('keterangan')->nullable(); // Catatan tambahan jika ada
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
