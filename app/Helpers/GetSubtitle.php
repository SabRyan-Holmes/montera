<?php

namespace App\Helpers;

class GetSubtitle
{
    public $defaultSearch ="Cari pegawai dengan Nama/NIP";
    public static function getSubtitle(
        ?string $byJabatan = null,
        ?string $byDaerah = null,
        ?string $search = null,
        ?string $byJenisPerubahan = null,
        ?string $byStatus = null,
        ?string $searchLabel = "Cari pegawai dengan Nama/NIP"

    ): string {
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

        if ($byStatus) {
            return "Berdasarkan Status : $byStatus";
        }

        if ($byJabatan && $byStatus) {
            return "Berdasarkan Jabatan : $byJabatan dan Status : $byStatus";
        }


        if ($search) {
            return  $searchLabel. $search;
        }

        return "";
    }
}
