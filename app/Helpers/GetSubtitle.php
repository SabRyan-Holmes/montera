<?php

namespace App\Helpers;

class GetSubtitle
{
    public static function getSubtitle(
        ?string $byJabatan = null,
        ?string $byDivisi = null,
        ?string $byKategori = null,
        ?string $byIndikator = null,
        ?string $byStatus = null,
        ?string $byPeriode = null,
        ?string $search = null,
        ?string $searchLabel = "Mencari data dengan kata kunci : ",
        ?string $byTipeTarget = null,
        ?string $byTipeSatuan = null,
        ?string $byLevel = null,
        ?string $byTahun = null,
        ?string $byCustom2 = null
    ): ?string {
        $filters = [];

        if ($byJabatan) $filters[] = "Jabatan: $byJabatan";
        if ($byDivisi) $filters[] = "Divisi: $byDivisi";
        if ($byKategori) $filters[] = "Kategori Produk: " . ucfirst($byKategori);
        if ($byIndikator) $filters[] = "Indikator: $byIndikator";
        if ($byStatus) $filters[] = "Status Verifikasi: " . ucfirst($byStatus);
        if ($byPeriode) $filters[] = "Periode: " . ucfirst($byPeriode);
        if ($byTipeTarget) $filters[] = "Tipe Target: $byTipeTarget";
        if ($byTipeSatuan) $filters[] = "Tipe Satuan: $byTipeSatuan";
        if ($byTahun) $filters[] = "Tahun: $byTahun";
        if ($byLevel) $filters[] = "Level Otoritas: $byLevel";

        if (!empty($filters)) {
            return "Menampilkan data berdasarkan " . implode(", ", $filters);
        }

        if ($search) {
            return $searchLabel . "'" . $search . "'";
        }

        return null; // 🔥 INI KUNCINYA
    }
}

