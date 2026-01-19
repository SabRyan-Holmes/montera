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
        Schema::create('targets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade')->comment('Pegawai ter target');
            $table->foreignId('divisi_id')
                ->nullable()
                ->constrained('divisis') // Asumsi nama tabel divisi adalah 'divisis'
                ->onDelete('cascade')
                ->comment('Target khusus satu divisi');
            $table->foreignId('supervisor_id')
                ->constrained('users')
                ->comment('Supervisor/Owner yang membuat target ini');
            $table->foreignId('produk_id')->nullable()->constrained('produks');
            $table->decimal('nilai_target', 15, 0);
            $table->enum('tipe_target', ['nominal', 'noa']);
            $table->enum('periode', ['mingguan', 'bulanan', 'tahunan']);
            $table->integer('tahun')->index();
            $table->integer('bulan')->nullable()->index();
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai');
            $table->date('deadline_pencapaian');
            $table->text('keterangan_tambahan')->nullable();
            $table->timestamps();
            $table->index(['supervisor_id', 'user_id', 'divisi_id', 'tahun', 'bulan'], 'idx_dashboard_target_spv');
            $table->index(['user_id', 'produk_id'], 'idx_target_pegawai');
            $table->index(['divisi_id', 'produk_id'], 'idx_target_divisi');            // untuk Cari target Divisi B untuk Produk C"

        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('targets');
    }
};
