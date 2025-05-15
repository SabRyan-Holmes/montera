<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Catatan extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $guarded = ['id'];
    protected $casts = [
        'sudah_dibaca' => 'boolean',
        'penting' => 'boolean',
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function pengusulanPAK()
    {
        return $this->hasOne(PengusulanPAK::class);
    }

    public function prosesPAK()
    {
        return $this->hasOne(Pengajuan::class);
    }
}
