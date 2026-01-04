<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Akuisisi extends Model
{
    protected $guarded = ['id'];

    public function pegawai(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relasi ke Produk yang diakuisisi (UC-06)
     */
    public function produk(): BelongsTo
    {
        return $this->belongsTo(Produk::class, 'produk_id');
    }

    /**
     * Relasi ke User yang melakukan verifikasi (UC-11)
     * Menggunakan foreign key 'verified_by'
     */
    public function verifikator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }


    public function supervisor()
    {
        return $this->belongsTo(User::class, 'verifikator_id'); // Aktor yang menjamin data objektif
    }
}
