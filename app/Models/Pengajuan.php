<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Pengajuan extends Model
{
    protected $guarded = ['id'];
    protected $with = ['riwayat_pak'];
    use HasFactory;



    public function riwayat_pak()
    {
        return $this->belongsTo(RiwayatPAK::class, 'riwayat_pak_id');

    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        // Search By Nama & NIP on Pegawai table
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) =>
            $query->whereHas('pegawai', function ($q) use ($search) {
                $q->where('Nama', 'like', '%' . $search . '%')
                    ->orWhere('NIP', 'like', '%' . $search . '%');
            })
        );

        // Berdasarkan Jabatan
        $query->when(
            $filters['byJabatan'] ?? false,
            fn($query, $byJabatan) =>
            $query->whereHas('pegawai', function ($q) use ($byJabatan) {
                $q->where('Jabatan/TMT', 'like', '%' . $byJabatan . '%');
            })
        );

         // Berdasarkan Status
         $query->when(
            $filters['byStatus'] ?? false,
            fn($query, $byStatus) =>
            $query->where('status', 'like', '%' . $byStatus . '%')
        );

         // Berdasarkan Kesimpulan
         $query->when(
            $filters['byKesimpulan'] ?? false,
            fn($query, $byKesimpulan) =>
            $query->where('kesimpulan', 'like', '%' . $byKesimpulan . '%')
        );

    }
}
