<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class RiwayatKarir extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $with = ['pegawai', 'updated_by'];


    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'pegawai_nip', 'NIP');
    }

    public function updated_by()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        // Search By Nama & NIP
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) =>
            $query->where('jenis_perubahan', 'like', '%' . $search . '%')
                // ->orWhere('NIP', 'like', '%' . $search . '%')
        );
    }
}
