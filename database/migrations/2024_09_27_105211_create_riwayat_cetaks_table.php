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
        Schema::create('riwayat_cetaks', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('pegawai_id') // Kolom foreign key
            ->constrained('pegawais') // Mengacu ke tabel 'pegawais'
            ->onDelete('cascade'); // Opsional: hapus riwayat_cetaks jika pegawai dihapus
            $table->string('nama');
            $table->string('nip');
            $table->string('tgl_ditetapkan');
            $table->integer('periode_mulai');
            $table->integer('periode_berakhir');
            $table->integer('tahun_periode');
            $table->string('angka_periode');
            // $table->string('penanda_tangan'); //NAMA
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
        Schema::dropIfExists('riwayat_cetaks');
    }
};
