<?php

namespace App\Helpers;

class GetSubtitle
{
    public static function getSubtitle(?string $byJabatan, ?string $byDaerah, ?string $search): string
    {
        if ($byJabatan && $byDaerah) {
            return "Berdasarkan Jabatan : $byJabatan dan Daerah : $byDaerah";
        }

        if ($byJabatan) {
            return "Berdasarkan Jabatan : $byJabatan";
        }

        if ($byDaerah) {
            return "Berdasarkan Daerah : $byDaerah";
        }

        if ($search) {
            return "Cari pegawai dengan Nama/NIP : '$search'";
        }

        return "";
    }
}
