<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AturanPAK extends Model
{
    use HasFactory;
    protected $table = 'aturan_pak';
    protected $guarded = ['id'];
    protected $casts = [
        'value' => 'array',
        'default_config' => 'array',
    ];
}
