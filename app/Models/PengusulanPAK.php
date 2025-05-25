<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class PengusulanPAK extends Model
{
    use HasFactory;
    protected $table = 'pengusulan_pak';
    protected $guarded = ['id'];
    protected $with = ['pegawai', 'catatan'];
    protected $casts = [
        'value' => 'array',
        'default_config' => 'array',
    ];

    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'pegawai_nip', 'NIP'); // Tambahkan parameter ketiga
    }

    public function catatan()
    {
        return $this->belongsTo(Catatan::class, 'catatan_id',); // Tambahkan parameter ketiga
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
    }
}
