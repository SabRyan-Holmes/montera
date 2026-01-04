<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

// use App\Services\ActivityLogger;
// use Illuminate\Support\Facades\Auth;

class Jabatan extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    // protected $with = ['riwayat_pak'];

    // public function riwayat_pak()
    // {
    //     return $this->hasMany(RiwayatPAK::class);
    // }

    // public function pengajuans()
    // {
    //     return $this->hasMany(Pengajuan::class);
    // }

    public static function byNIP($nip)
    {
        return static::where(function ($query) use ($nip) {
            $query->where('NIP', $nip)->orWhere('NIP', 'like', '%' . $nip . '%');
        });
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'jabatan_id');
    }

    // public function scopeFilter(Builder $query, array $filters): void
    // {
    //     // Search By Nama & NIP
    //     $query->when(
    //         $filters['search'] ?? false,
    //         fn($query, $search) =>
    //         $query->where('Nama', 'like', '%' . $search . '%')
    //             ->orWhere('NIP', 'like', '%' . $search . '%')
    //     );

    //     // Berdasarkan Jabatan
    //     $query->when(
    //         $filters['byJabatan'] ?? false,
    //         fn($query, $byJabatan) =>
    //         $query->where('Jabatan/TMT', 'like', '%' . $byJabatan . '%')
    //     );

    //     // Berdasarkan Daerah
    //     $query->when(
    //         $filters['byDaerah'] ?? false,
    //         fn($query, $byDaerah) =>
    //         $query->where('Daerah', $byDaerah)
    //     );
    // }

    // Untuk Route Model Binding Custom(defaultny id)
    // public function getRouteKeyName()
    // {
    //     return 'NIP';
    // }

    // protected static function booted()
    // {
    //     static::created(function ($model) {
    //         ActivityLogger::log(
    //             'Tambah Data',
    //             Auth::user()->name . ' (' . Auth::user()->role  . ') menambahkan data pegawai baru dengan nama : ' . $model->Nama,
    //             get_class($model),
    //             $model->id,
    //             $model->pegawai_nip ?? null
    //         );
    //     });

    //     static::updated(function ($model) {
    //         ActivityLogger::log(
    //             'Update Data',
    //             Auth::user()->name . ' (' . Auth::user()->role  . ') memperbarui data pegawai dengan nama ' . $model->Nama,
    //             get_class($model),
    //             $model->id,
    //             $model->pegawai_nip ?? null
    //         );
    //     });

    //     static::deleted(function ($model) {
    //         ActivityLogger::log(
    //             'Hapus Data',
    //             Auth::user()->name . ' (' . Auth::user()->role  . ') menghapus data pegawai dengan nama ' . $model->Nama,
    //             get_class($model),
    //             $model->id,
    //             $model->pegawai_nip ?? null
    //         );
    //     });
    // }
}
