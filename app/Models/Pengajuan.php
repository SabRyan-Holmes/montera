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
    // protected $with = ['pengaju', 'validator', 'riwayat_pak', 'catatan_pengaju', 'catatan_validator'];
    protected $with = ['pengaju', 'validator'];



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

    public function catatan_pengaju()
    {
        return $this->belongsTo(Catatan::class, 'catatan_pengaju_id');
    }

    public function catatan_validator()
    {
        return $this->belongsTo(Catatan::class, 'catatan_validator_id');
    }

    public function scopeByPegawaiId($query, $pegawaiId)
    {
        return $query->whereHas('riwayat_pak', function ($q) use ($pegawaiId) {
            $q->where('pegawai_id', $pegawaiId);
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
            $query->whereHas('riwayat_pak', function ($q) use ($search) {
                $q->whereHas('pegawai', function ($subQ) use ($search) {
                    $subQ->where('Nama', 'like', '%' . $search . '%')
                        ->orWhere('NIP', 'like', '%' . $search . '%');
                });
            })
        );
        // Berdasarkan Jabatan
        $query->when(
            $filters['byJabatan'] ?? false,
            fn($query, $byJabatan) =>
            $query->whereHas('riwayat_pak', function ($q) use ($byJabatan) {
                $q->whereHas('pegawai', function ($subQ) use ($byJabatan) {
                    $subQ->where('Jabatan/TMT', 'like', '%' . $byJabatan . '%');
                });
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
            $query->whereHas('riwayat_pak', function ($q) use ($byKesimpulan) {
                $q->where('kesimpulan', 'like', '%' . $byKesimpulan . '%');
            })
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
