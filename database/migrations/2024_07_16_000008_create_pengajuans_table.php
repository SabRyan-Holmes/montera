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
            $table->string('user_nip', 18);//pengaju
            $table->foreign('user_nip')->references('nip')->on('users')->onDelete('cascade'); //update tgl 2 Juni 2025-ubah berdasarkan nip
            $table->foreignId('riwayat_pak_id')->constrained('riwayat_pak')->onDelete('cascade');
            $table->foreignId('catatan_pengaju_id')->nullable()->constrained('catatans')->onDelete('cascade');
            $table->foreignId('catatan_validator_id')->nullable()->constrained('catatans')->onDelete('cascade');
            $table->string('validated_by', 18)->nullable();
            $table->foreign('validated_by')->references('nip')->on('users')->onDelete('cascade'); //update tgl 2 Juni 2025-ubah berdasarkan nip
            $table->enum('status', [
                'diajukan',
                'divalidasi',
                'ditolak',
                'direvisi',
            ])->default('diajukan');
            $table->string("approved_pak_path")->nullable()->comment('penyimpanan dokumen sementara setelah di validasi/ditandatangani'); //for store validated/approved PAK
            $table->datetime('tanggal_ditolak')->nullable();
            $table->datetime('tanggal_direvisi')->nullable();
            $table->datetime("tanggal_divalidasi")->nullable();
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
