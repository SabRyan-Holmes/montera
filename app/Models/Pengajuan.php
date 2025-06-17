<?php

namespace App\Models;

use App\Services\ActivityLogger;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class Pengajuan extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $with = ['pengaju', 'validator','riwayat_pak', 'catatan'];



    public function pengaju()
    {
        return $this->belongsTo(User::class, 'user_nip', 'nip');

    }

    public function validator()
    {
        return $this->belongsTo(User::class, 'validated_by', 'nip');

    }

    public function riwayat_pak()
    {
        return $this->belongsTo(RiwayatPAK::class, 'riwayat_pak_id');

    }

    public function catatan()
    {
        return $this->belongsTo(Catatan::class, 'catatan_id');

    }

    public static function byPegawaiId($pegawaiId)
    {
        return static::whereHas('riwayat_pak', function ($query) use ($pegawaiId) {
            $query->where('pegawai_id', $pegawaiId);
        });
    }


    public static function byPegawaiIdAndStatus($id, $status)
    {
        return static::byPegawaiId($id)
            ->where('status', $status);
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        // Search By Nama & NIP on Pegawai table
        $query->when(
            $filters['search'] ?? false,
            fn($query, $search) =>
            $query->whereHas('pegawai', function ($q) use ($search) {
                $q->where('Nama', 'like', '%' . $search . '%')
                    ->orWhere('NIP', 'like', '%' . $search . '%');
            })
        );

        // Berdasarkan Jabatan
        $query->when(
            $filters['byJabatan'] ?? false,
            fn($query, $byJabatan) =>
            $query->whereHas('pegawai', function ($q) use ($byJabatan) {
                $q->where('Jabatan/TMT', 'like', '%' . $byJabatan . '%');
            })
        );

         // Berdasarkan Status
         $query->when(
            $filters['byStatus'] ?? false,
            fn($query, $byStatus) =>
            $query->where('status', 'like', '%' . $byStatus . '%')
        );

         // Berdasarkan Kesimpulan
         $query->when(
            $filters['byKesimpulan'] ?? false,
            fn($query, $byKesimpulan) =>
            $query->where('kesimpulan', 'like', '%' . $byKesimpulan . '%')
        );

    }

    protected static function booted()
    {

        static::created(function ($model) {
            ActivityLogger::log(
                'Mengajukan PAK',
                Auth::user()->name . ' (' . Auth::user()->role  . ') Mengajukan PAK untuk divalidasi Pimpinan : ',
                get_class($model),
                $model->id,
                $model->pegawai_nip ?? null
            );
        });

        static::deleted(function ($model) {
            ActivityLogger::log(
                'Hapus Data',
                Auth::user()->name . ' (' . Auth::user()->role  . ') menghapus data pengajuan PAK dengan ID #' . $model->id,
                get_class($model),
                $model->id,
                $model->pegawai_nip ?? null
            );
        });
    }
}
