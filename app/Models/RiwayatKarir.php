<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiwayatKarir extends Model
{
    use HasFactory;

    public function updated_by()
    {
        return $this->belongsTo(User::class, 'user_id');

    }

}
