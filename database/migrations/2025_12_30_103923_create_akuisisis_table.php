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
        Schema::create('akuisisis', function (Blueprint $table) {
            $table->id();
            $table->string('no_transaksi', 30)->unique();
            $table->foreignId('user_id')->index('idx_akuisisi_user_id')
                ->constrained('users')->onDelete('cascade');
            $table->foreignId('produk_id')->index('idx_akuisisi_produk_id')
                ->constrained('produks')->onDelete('cascade');
            $table->string('nama_nasabah');
            $table->string('no_identitas_nasabah', 50)->nullable()->index('idx_nasabah_identity');
            $table->decimal('nominal_realisasi', 15, 2);
            $table->date('tanggal_akuisisi');
            $table->enum('status_verifikasi', ['pending', 'verified', 'rejected'])->default('pending');
            $table->foreignId('supervisor_id')
                ->constrained('users')
                ->comment('Supervisor yang dipilih pegawai');
            $table->foreignId('verifikator_id')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null')
                ->comment('Supervisor yang melakukan  verifikasi');
            $table->dateTime('verified_at')->nullable();
            $table->text('catatan_revisi')->nullable();
            $table->string('lampiran_bukti')->nullable();
            $table->timestamps();
            $table->index(['status_verifikasi', 'tanggal_akuisisi'], 'idx_verifikasi_spv');
            $table->index(['user_id', 'tanggal_akuisisi'], 'idx_laporan_pegawai');
            $table->index(['supervisor_id', 'status_verifikasi'], 'idx_tugas_supervisor');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('akuisisis');
    }
};
