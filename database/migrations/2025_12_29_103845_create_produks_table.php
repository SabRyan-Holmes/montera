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
        Schema::create('produks', function (Blueprint $table) {
            $table->id();
            $table->string('nama_produk', 100);
            $table->string('kode_produk', 20)->unique();
            $table->string('kategori_produk', 50)->index();
            $table->string('label_input', 50);
            $table->string('satuan', 20)->default('Unit');
            $table->integer('bobot_frontliner')->default(0);
            $table->integer('bobot_kredit')->default(0);
            $table->enum('status', ['tersedia', 'discontinued'])->default('tersedia')->index();
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produks');
    }
};
