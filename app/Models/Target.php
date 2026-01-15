<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Target extends Model
{
    protected $guarded = ['id'];

    public function pegawai(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    public function produk(): BelongsTo
    {
        return $this->belongsTo(Produk::class);
    }

    public function scopeTargetInDivision(Builder $query, $user)
    {
        return $query->with([
                'pegawai:id,name,nip',
                'produk:id,nama_produk,kategori_produk,satuan'
            ])->whereHas('pegawai', function ($q) use ($user) {
                $q->where('divisi_id', $user->divisi_id);
            });
    }

    public function scopeFilter($query, array $filters): void
    {
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) =>
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%');
            })->orWhereHas('produk', function ($q2) use ($search) {
                $q2->where('nama_produk', 'like', "%{$search}%");
            })
        );

        $query->when(
            $filters['byTipe'] ?? false,
            fn($query, $byTipe) =>
            $query->where('tipe_target', $byTipe)
        );

        $query->when(
            $filters['byPeriode'] ?? false,
            fn($query, $byPeriode) =>
            $query->where('periode', $byPeriode)
        );
    }
}
