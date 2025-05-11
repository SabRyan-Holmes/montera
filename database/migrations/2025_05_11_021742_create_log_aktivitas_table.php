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
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');

            // Jika login via SSO (pegawai) maka gunakan NIP
            $table->string('nip')->nullable()->index();

            $table->string('aktivitas'); // Misal: "Mengunduh File PAK"
            $table->string('model')->nullable(); // Misal: App\Models\Pak
            $table->unsignedBigInteger('model_id')->nullable(); // ID dari objek yg terlibat

            $table->text('keterangan')->nullable(); // Catatan tambahan jika ada
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
