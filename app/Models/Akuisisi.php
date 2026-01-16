<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

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
     * Menggunakan foreign key 'verifikator_id'
     */
    public function verifikator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verifikator_id');
    }


    public function supervisor()
    {
        return $this->belongsTo(User::class, 'verifikator_id'); // Aktor yang menjamin data objektif
    }


    public function scopeFilter($query, array $filters): void
    {
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) =>
            $query->whereHas('pegawai', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('nip', 'like', '%' . $search . '%');
            })->OrWhere('nama_nasabah', 'like', "%{$search}%")
                ->OrWhere('no_identitas_nasabah', 'like', "%{$search}%")
        );

        $query->when(
            $filters['byStatus'] ?? false,
            fn($query, $byStatus) =>
            $query->where('status_verifikasi', $byStatus)
        );
    }

    public function scopeInSupervisorDivisi(Builder $query): void
    {
        $user = Auth::user();

        if ($user) {
            // 1. Filter Verifikator harus User yang sedang login
            // Ini ditaruh di query utama karena kolom 'verifikator_id' ada di tabel 'akuisisis'
            $query->where('verifikator_id', $user->id);

            // 2. DAN Filter Pegawainya harus satu divisi
            $query->whereHas('pegawai', function ($q) use ($user) {
                $q->where('divisi_id', $user->divisi_id);
            });
        }
    }
}
