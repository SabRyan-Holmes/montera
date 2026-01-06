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

    public function indikator()
    {
        return $this->belongsTo(Indikator::class);
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
            $query->where('nama_jabatan', 'like', '%' . $search . '%')
                ->orWhere('kode_jabatan', 'like', '%' . $search . '%')
        );

        // untuk filter : kategori, indikator, status produk
    }
}
