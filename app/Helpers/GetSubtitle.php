<?php

namespace App\Helpers;

class GetSubtitle
{
    public static function getSubtitle(
        ?string $byJabatan = null,
        ?string $byDaerah = null,
        ?string $search = null,
        ?string $byJenisPerubahan = null, //perubahan di riwayatKarir
        ?string $byJenisAktivitas = null, //perubahan di logAktivitas
        ?string $byStatus = null,
        ?string $searchLabel = "Cari pegawai dengan Nama/NIP : ",
        ?string $byKesimpulan = null,
        ?string $byRole = null
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

        if ($byJenisAktivitas) {
            $filters[] = "Jenis Aktivitas : $byJenisAktivitas";
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
