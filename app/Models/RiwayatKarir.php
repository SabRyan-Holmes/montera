<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiwayatKarir extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $with = ['pegawai', 'updated_by'];


    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'NIP', 'nip');
    }

    public function updated_by()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
