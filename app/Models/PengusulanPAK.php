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
    protected $with = ['pegawai', 'catatan_pegawai', 'catatan_sdm'];
    protected $casts = [
        'periode_mulai' => 'date:Y-m',
        'periode_berakhir' => 'date:Y-m',
    ];


    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'pegawai_nip', 'NIP'); // Tambahkan parameter ketiga
    }

    public function catatan_pegawai()
    {
        return $this->belongsTo(Catatan::class, 'catatan_pegawai_id',); // Tambahkan parameter ketiga
    }

    public function catatan_sdm()
    {
        return $this->belongsTo(Catatan::class, 'catatan_sdm_id',); // Tambahkan parameter ketiga
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
