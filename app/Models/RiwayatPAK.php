<?php

namespace App\Models;

use App\Services\ActivityLogger;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class RiwayatPAK extends Model
{
    use HasFactory;
    protected $table = 'riwayat_pak';
    protected $guarded = ['id'];
    protected $with = ['pegawai', 'pengusulan_pak'];
    protected $casts = [
        'tebusan1' => 'array',
        'tebusan2' => 'array',
        'tebusan3' => 'array',
        'ak_dasar' => 'array',
        'ak_jf' => 'array',
        'ak_penyesuaian' => 'array',
        'ak_konversi' => 'array',
        'ak_peningkatan' => 'array',
        'ak_tipe_tambahan' => 'array',
        'jakk' => 'array',
    ];

    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class);
    }

    public function pengusulan_pak()
    {
        return $this->belongsTo(PengusulanPAK::class, 'pengusulan_pak_id');
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

        // Berdasarkan Daerah
        $query->when(
            $filters['byDaerah'] ?? false,
            fn($query, $byDaerah) =>
            $query->whereHas('pegawai', function ($q) use ($byDaerah) {
                $q->where('Daerah', $byDaerah);
            })
        );
    }


    protected static function booted()
    {
        static::deleted(function ($model) {
            $no_surat =  AturanPAK::extractNoSurat($model['no_surat3']);
            ActivityLogger::log(
                'Hapus Data',
                Auth::user()->name . ' (' . Auth::user()->role  . ') menghapus riwayat PAK dengan no PAK #' .  $no_surat,
                get_class($model),
                $model->id,
            );
        });
    }
}
