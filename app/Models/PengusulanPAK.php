<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PengusulanPAK extends Model
{
    use HasFactory;
    protected $table = 'pengusulan_pak';
    protected $guarded = ['id'];
    protected $with = ['pegawai'];
    protected $casts = [
        'value' => 'array',
        'default_config' => 'array',
    ];

    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'nip', 'NIP'); // Tambahkan parameter ketiga
    }
}
