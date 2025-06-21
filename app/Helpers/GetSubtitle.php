<?php

namespace App\Helpers;

class GetSubtitle
{
    public static function getSubtitle(
        ?string $byJabatan = null,
        ?string $byDaerah = null,
        ?string $search = null,
        ?string $byJenisPerubahan = null,
        ?string $byStatus = null,
        ?string $searchLabel = "Cari pegawai dengan Nama/NIP : ",
        ?string $byKesimpulan = null
    ): string {
        $filters = [];

        if ($byJabatan) {
            $filters[] = "Jabatan : $byJabatan";
        }

        if ($byDaerah) {
            $filters[] = "Daerah : $byDaerah";
        }

        if ($byJenisPerubahan) {
            $filters[] = "Jenis Perubahan : $byJenisPerubahan";
        }

        if ($byStatus) {
            $filters[] = "Status : $byStatus";
        }

        if ($byKesimpulan) {
            $filters[] = "Kesimpulan : $byKesimpulan";
        }

        if (!empty($filters)) {
            return "Berdasarkan " . implode(" dan ", $filters);
        }

        if ($search) {
            return $searchLabel . $search;
        }

        return "";
    }
}
