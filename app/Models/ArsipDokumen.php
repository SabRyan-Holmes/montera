<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArsipDokumen extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function updated_by()
    {
        return $this->belongsTo(User::class, 'user_id');

    }
}
