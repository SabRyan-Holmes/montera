<?php

namespace App\Services;

use App\Models\AturanPAK;
use Illuminate\Support\Arr;

class AturanPAKService // Boleh pakai nama Helper
{
    public static function get($keys = null)
    {
        static $rules;

        if (!$rules) {
            $mergeTebusanDefault = function ($name) {
                $aturan = AturanPAK::where('name', $name)->first(['value', 'default_config']);

                if (!$aturan || !is_array($aturan->value) || !is_array($aturan->default_config)) {
                    return [];
                }

                return collect($aturan->value)->map(function ($item, $i) use ($aturan) {
                    return [
                        'pihak_tebusan' => $item['pihak_tebusan'] ?? '',
                        'checked' => $aturan->default_config[$i]['checked'] ?? false,
                    ];
                })->toArray();
            };
            $rules = [
                // ...
                'penandaTangan' => AturanPAK::where('name', 'Penanda Tangan')->first(['value', 'default_config']),
                'koefisienPertahun' => AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value,
                'predikatPresentase' => AturanPAK::where('name', 'Predikat & Presentase')->first(['value', 'default_config']),
                'pangkat' => AturanPAK::where('name', 'Angka Minimal Pangkat')->first(['value', 'default_config']),
                'jabatan' => AturanPAK::where('name', 'Angka Minimal Jabatan')->first(['value', 'default_config']),
                // TODO: Tambah logic untuk default
                'tebusanKonversi' => $mergeTebusanDefault('Tebusan Konversi'),
                'tebusanAkumulasi' => $mergeTebusanDefault('Tebusan Akumulasi'),
                'tebusanPenetapan' => $mergeTebusanDefault('Tebusan Penetapan'),

                'kesimpulan' => AturanPAK::where('name', 'Kesimpulan')->first(['value', 'default_config']),
                'noSuratTerakhir' => AturanPAK::where('name', 'No Surat Terakhir')->first(['value', 'default_config']),
            ];
        }

        return $keys ? Arr::only($rules, (array) $keys) : $rules;    }
}
