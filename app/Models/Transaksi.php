<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    protected $guarded = ['id'];
    protected $appends = ['nominal_formatted'];

    public function pegawai()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function produk()
    {
        return $this->belongsTo(Produk::class);
    }

    protected function nominalFormatted(): Attribute
    {
        return Attribute::make(
            get: function () {
                // Cek apakah relasi akuisisi sudah diload agar tidak error
                if ($this->relationLoaded('akuisisi')) {
                    // Kita "numpang" panggil logic yang sudah capek-capek dibuat di Akuisisi
                    return $this->akuisisi?->nominal_formatted;
                }
                return null; // Atau return default value
            }
        );
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
