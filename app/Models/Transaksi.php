<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    protected $guarded = ['id'];


    public function pegawai()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function produk()
    {
        return $this->belongsTo(Produk::class);
    }


    public function akuisisi()
    {
        return $this->belongsTo(Akuisisi::class);
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) =>
            $query->whereHas('pegawai', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('nip', 'like', '%' . $search . '%');
            })
        );

        $query->when(
            $filters['byKategori'] ?? false,
            fn($query, $byKategori) =>
            $query->whereHas('produk', function ($q) use ($byKategori) {
                $q->where('kategori_produk', 'like', "%{$byKategori}%");
            })
        );
        $query->when(
            $filters['byStatus'] ?? false,
            fn($query, $byStatus) =>
            $query->whereHas('produk', function ($q) use ($byStatus) {
                $q->where('status', 'like', "%{$byStatus}%");
            })
        );
    }
}
