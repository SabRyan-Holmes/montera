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
            $rules = [
                // ...
                'penandaTangan' => AturanPAK::where('name', 'Penanda Tangan')->first(['value', 'default_config']),
                'koefisienPertahun' => AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value,
                'predikatPresentase' => AturanPAK::where('name', 'Predikat & Presentase')->first(['value', 'default_config']),
                'pangkat' => AturanPAK::where('name', 'Angka Minimal Pangkat')->first(['value', 'default_config']),
                'jabatan' => AturanPAK::where('name', 'Angka Minimal Jabatan')->first(['value', 'default_config']),
                'tebusanKonversi' => AturanPAK::where('name', 'Tebusan Konversi')->first()->value,
                'tebusanAkumulasi' => AturanPAK::where('name', 'Tebusan Akumulasi')->first()->value,
                'tebusanPenetapan' => AturanPAK::where('name', 'Tebusan Penetapan')->first()->value,
                'kesimpulan' => AturanPAK::where('name', 'Kesimpulan')->first(['value', 'default_config']),
            ];
        }

        return $keys ? Arr::only($rules, (array) $keys) : $rules;    }
}
