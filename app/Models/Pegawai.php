<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function riwayatCetaks()
    {
        return $this->hasMany(RiwayatCetak::class);
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        // Search By Nama & NIP
        $query->when(
            $filters['search'] ?? false,
            fn ($query, $search) =>
            $query->where('Nama', 'like', '%' . $search . '%')
                ->orWhere('NIP', 'like', '%' . $search . '%')
        );



        // Berdasarkan Jabatan
        $query->when(
            $filters['byJabatan'] ?? false,
            fn ($query, $byJabatan) =>
            $query->where('Jabatan/TMT', 'like', '%' . $byJabatan . '%')
        );

        // Berdasarkan Daerah
        $query->when(
            $filters['byDaerah'] ?? false,
            fn ($query, $byDaerah) =>
            $query->where('Daerah', $byDaerah)
        );
    }

    // Untuk Route Model Binding Custom(defaultny id)
    public function getRouteKeyName()
    {
      return 'NIP';
    }
}
