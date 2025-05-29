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
        Schema::create('riwayat_pak', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            // NOTE: Uncomment ini jika di migrasi ulang riwayat_pak
            // $table->foreignId('created_by')->constrained('users'); //updated 24 Mei 2025
            // $table->foreignId('by_pengusulan_id')->nullable()->constrained('pengusulans'); //updated 29 Mei 2025
            $table->foreignId('pegawai_id')->constrained('pegawais')->onDelete('cascade');
            $table->string('nama'); //Penanda Tangan
            $table->string('nip'); //Penanda Tangan
            $table->string('tgl_ditetapkan');
            $table->integer('periode_mulai');
            $table->integer('periode_berakhir');
            $table->integer('tahun_periode');
            $table->string('angka_periode');
            $table->string('no_surat1');
            $table->string('predikat');
            $table->integer('presentase');
            $table->double('ak_normatif');
            $table->double('angka_kredit');
            $table->double('ak_normatif_ops')->nullable();
            $table->json('tebusan1');

            $table->string('no_surat2');
            $table->string('ak_terakhir');
            $table->string('jumlah_ak_kredit');
            $table->string('tahun_terakhir');
            $table->string('tahun_ini');
            $table->json('tebusan2');

            $table->string('no_surat3');
            $table->json('ak_dasar');
            $table->json('ak_jf');
            $table->json('ak_penyesuaian');
            $table->json('ak_konversi');
            $table->json('ak_peningkatan');
            $table->json('ak_tipe tambahan')->nullable();

            $table->json('jakk');
            $table->string('pangkat');
            $table->string('jabatan');
            $table->string('pangkat_keker');
            $table->string('jabatan_keker');
            $table->json('tebusan3');
            $table->string('kesimpulan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_pak');
    }
};
