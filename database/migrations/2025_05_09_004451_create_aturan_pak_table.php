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
        Schema::create('aturan_pak', function (Blueprint $table) {
            $table->id();
            $table->string('name');           // ex: Penanda Tangan, Koefisien Pertahun
            $table->json('value');            // bisa array atau associative array
            $table->json('default_pointer')->nullable(); // info pointer default (index atau map key->index)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aturan_pak');
    }
};
