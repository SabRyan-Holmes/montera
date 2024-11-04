<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiwayatCetak extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $with = ['pegawai'];

    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class);
    }

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
}
