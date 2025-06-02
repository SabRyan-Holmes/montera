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
        Schema::create('catatans', function (Blueprint $table) {
            $table->id();
            $table->string('user_nip', 18); // updated tgl 3 Juni 2025 - dk usah pake foreign key lg
            $table->enum('tipe', [
                'PengusulanPAK',
                'ProsesPAK',
                'Verifikasi',
                'Koreksi',
                'Persetujuan',
                'Lainnya'
            ])->default('PengusulanPAK');
            // Konten catatan (long text)
            $table->longText('isi');
            // Metadata tambahan
            $table->string('judul', 150)->nullable();
            // Untuk tracking penting/tidak
            // Status baca
            $table->boolean('sudah_dibaca')->default(false);
            $table->boolean('penting')->default(false);

            // Soft delete
            $table->softDeletes();
            $table->timestamps();

            // $table->index(['pengusulan_pak_id', 'proses_pak_id']);
            $table->index('tipe');
            $table->index('sudah_dibaca');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('catatans');
    }
};
