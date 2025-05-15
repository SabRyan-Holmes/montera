<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogAktivitas extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $with = ['pegawai'];


    public function user()
    {
        return $this->belongsTo(User::class); // Tambahkan parameter ketiga
    }

    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'nip', 'NIP'); // Tambahkan parameter ketiga
    }
}
