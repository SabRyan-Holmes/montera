<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Indikator extends Model
{
    protected $guarded = ['id'];
    public function produk(): BelongsTo
    {
        return $this->belongsTo(Produk::class);
    }

    /**
     * Menghubungkan Indikator ke target-target pegawai
     */
    public function targets(): HasMany
    {
        return $this->hasMany(Target::class);
    }
}
