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
            $table->foreignId('riwayat_pak_id')->constrained('riwayat_pak')->onDelete('cascade');
            $table->foreignId('pegawai_id')->constrained('pegawais')->onDelete('cascade');

            $table->enum('status', ['diajukan', 'divalidasi', 'ditolak'])->default('diajukan');
            // mungkin sebaiknya field "diajukan oleh(foreignId User(divisiSDM)) sebaikny juga ditambahkan
            $table->unsignedBigInteger('pengaju_id');
            $table->foreign('pengaju_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('catatan_id')->nullable();
            $table->foreign('catatan_id')->references('id')->on('catatans')->onDelete('cascade');
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
