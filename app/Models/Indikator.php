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

    public function scopeFilter($query, array $filters): void
    {
        // 1. Search berdasarkan Nama Produk atau Kode Produk
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) =>
            $query->where(function ($q) use ($search) {
                $q->where('nama_produk', 'like', '%' . $search . '%')
                    ->orWhere('kode_produk', 'like', '%' . $search . '%');
            })
        );

        // 2. Filter Berdasarkan Target Minimal (Tabungan, Kredit, Asuransi)
        $query->when(
            $filters['byTargetMinimal'] ?? false,
            fn($query, $byKategori) =>
            $query->where('target_minimal', $byKategori)
        );


    }
}
