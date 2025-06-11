<?php

namespace App\Helpers;

class GetSubtitle
{
    public static function getSubtitle(
        ?string $byJabatan = null,
        ?string $byDaerah = null,
        ?string $search = null,
        ?string $byJenisPerubahan = null
    ): string
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

        if ($byJenisPerubahan) {
            return "Berdasarkan Jenis Perubahan : $byJenisPerubahan";
        }

        if ($search) {
            return "Cari pegawai dengan Nama/NIP : '$search'";
        }

        return "";
    }
}
