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

    // public function scopeTargetInDivision(Builder $query, $user)
    // {
    //     return $query->with([
    //             'pegawai:id,name,nip',
    //             'produk:id,nama_produk,kategori_produk,satuan'
    //         ])->whereHas('pegawai', function ($q) use ($user) {
    //             $q->where('divisi_id', $user->divisi_id);
    //         });
    // }

    public function scopeBySupervisor($query, $user)
    {
        return $query->where('supervisor_id', $user->id);
    }

    public function scopeFilter($query, array $filters): void
    {
        $query->when(
            $filters['search'] ?? false,
            fn($q, $search) =>
            $q->where(
                fn($sub) =>
                $sub->whereHas('pegawai', fn($k) => $k->where('name', 'like', "%$search%"))
                    ->orWhereHas('produk', fn($k) => $k->where('nama_produk', 'like', "%$search%"))
            )
        );

        $query->when($filters['byTipe'] ?? false, fn($q, $t) => $q->where('tipe_target', $t));

        // Gabungkan filter periode & tahun di sini agar controller tidak perlu manual where lagi
        $query->when($filters['periode'] ?? false, fn($q, $p) => $q->where('periode', $p));
        $query->when($filters['tahun'] ?? false, fn($q, $y) => $q->where('tahun', $y));
    }
}
