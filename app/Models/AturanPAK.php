<?php

namespace App\Models;

use App\Services\ActivityLogger;
use FontLib\Table\Type\name;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class AturanPAK extends Model
{
    use HasFactory;
    protected $table = 'aturan_pak';
    protected $guarded = ['id'];
    protected $casts = [
        'value' => 'array',
        'default_config' => 'array',
    ];

    public static function updateNoSuratTerakhir(string $fullNoSurat): void
    {
        $noSurat = strstr($fullNoSurat, '/', true) ?: $fullNoSurat;
        $parts = explode('/', $fullNoSurat);
        $tahun = end($parts);

        $record = self::where('name', 'No Surat Terakhir')->firstOrFail();
        $record->update([
            'value' => [
                [
                    "id" => 1,
                    "no_surat" => $noSurat,
                    "tahun" => $tahun,
                    "updated_at" => now()
                ]
            ],
            'default_config' => 1
        ]);
    }

    public static function extractNoSurat(string $fullNoSurat): string
    {
        return strstr($fullNoSurat, '/', true) ?: $fullNoSurat;
    }

    public static function extractTahun(string $fullNoSurat): string
    {
        // Todo Misal ny ada $ullsurat = 1500.564/Akm/2025. gimana caa ambil 2025 /tahun ny?
        return strstr($fullNoSurat, '/', true) ?: $fullNoSurat;
    }

    protected static function booted()
    {
        // static::created(function ($model) {
        //     $user = Auth::user();
        //     $name = $user ? $user->name : 'Administrator';
        //     $role = $user ? ' (' . $user->role  . ')' : '';
        //     ActivityLogger::log(
        //         'Tambah Data',
        //         $name . $role  . ' menambahkan data aturan PAK dengan jenis : ' . $model->name,
        //         get_class($model),
        //         $model->id,
        //     );
        // });

        static::updated(function ($model) {
            ActivityLogger::log(
                aktivitas: 'Update Data',
                keterangan: Auth::user()->name . ' (' . Auth::user()->role  . ') memperbarui data aturan PAK dengan jenis ' . $model->name,
                entityType: get_class($model),
                entityId: $model->id,
            );
        });

        static::deleted(function ($model) {
            ActivityLogger::log(
               aktivitas: 'Hapus Data',
                keterangan: Auth::user()->name . ' (' . Auth::user()->role  . ') menghapus data aturan PAK dengan jenis ' . $model->name,
                entityType: get_class($model),
                entityId: $model->id,
            );
        });
    }
}
