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
        return $this->belongsTo(User::class, 'updated_by', 'nip');
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        // Search By Jenis Perubahan
        $query->when(
            $filters['jenisPerubahan'] ?? false,
            fn($query, $byJenisPerubahan) =>
            $query->where('jenis_perubahan', 'like', '%' . $byJenisPerubahan . '%')
            // ->orWhere('NIP', 'like', '%' . $search . '%')
        );



        // Berdasarkan Jabatan
        $query->when(
            $filters['byJabatan'] ?? false,
            fn($query, $byJabatan) =>
            $query->whereHas('pegawai', function ($q) use ($byJabatan) {
                $q->where('Jabatan/TMT', 'like', '%' . $byJabatan . '%');
            })
        );

        // Search By Nama & NIP on Pegawai table
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) =>
            $query->whereHas('pegawai', function ($q) use ($search) {
                $q->where('Nama', 'like', '%' . $search . '%')
                    ->orWhere('NIP', 'like', '%' . $search . '%');
            })
        );
    }
}
