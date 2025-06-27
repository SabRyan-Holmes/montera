<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class LogAktivitas extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $with = ['pegawai', 'user'];


    public function user()
    {
        return $this->belongsTo(User::class, 'user_nip', 'nip'); // Tambahkan parameter ketiga
    }

    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'pegawai_nip', 'NIP'); // Tambahkan parameter ketiga
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        // Search By Keterangan Aktivitas
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) =>
            $query->where('keterangan', 'like', '%' . $search . '%')
        );

        $query->when(
            $filters['byJenisAktivitas'] ?? false,
            fn($query, $byJenisAktivitas) =>
            $query->where('aktivitas', 'like', '%' . $byJenisAktivitas . '%')
        );

        $query->when(
            $filters['byRole'] ?? false,
            fn($query, $byRole) =>
            $query->where('keterangan', 'like', '%' . $byRole . '%')
        );
    }
}
