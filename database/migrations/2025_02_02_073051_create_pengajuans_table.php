<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use function Laravel\Prompts\text;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pengajuans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('riwayat_pak_id')->constrained('riwayat_pak')->onDelete('cascade');
            $table->foreignId('catatan_id')->nullable()->constrained('catatans')->onDelete('cascade');
            //Foregin Pegawai dk usah karna di riwayatPak jg udah ad relationship dgn pegawai
            // $table->foreignId('pegawai_id')->constrained('pegawais')->onDelete('cascade');

            $table->enum('status', ['diajukan', 'divalidasi', 'ditolak'])->default('diajukan');
            $table->string("approved_pak_path")->nullable(); //for store validated/approved PAK
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengajuans');
    }
};
