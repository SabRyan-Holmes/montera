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

    public static function updateNoSuratTerakhir(string $noSurat): void
    {
        $record = self::where('name', 'No Surat Terakhir')->firstOrFail();
        $record->update([
            'value' => [
                [
                    "id" => 1,
                    "no_surat" => $noSurat,
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
}
