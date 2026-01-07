<?php

namespace App\Helpers;

class GetSubtitle
{
    public static function getSubtitle(
        // --- 1. Filter Terkait Pegawai & Struktur ---
        ?string $byJabatan = null,
        ?string $byDivisi = null, // Pengganti 'Daerah' agar sesuai Bank XYZ

        // --- 2. Filter Terkait Produk & KPI ---
        ?string $byKategori = null, // Tabungan, Kredit, Asuransi
        ?string $byIndikator = null, // Nama KPI

        // --- 3. Filter Terkait Transaksi & Monitoring ---
        ?string $byStatus = null, // Pending, Valid, Tolak
        ?string $byPeriode = null, // Mingguan, Bulanan, Tahunan

        // --- 4. Search & General ---
        ?string $search = null,
        ?string $searchLabel = "Mencari data dengan kata kunci : ",

        // --- RUANG KOSONG (Kebutuhan Masa Depan) ---
        // Kamu bisa menambahkan parameter baru di bawah sini jika ada model lain
        ?string $byTipe = null,
        ?string $byLevel = null,
        ?string $byCustom2 = null
    ): string {
        $filters = [];

        // Logika Jabatan & Divisi
        if ($byJabatan) {
            $filters[] = "Jabatan: $byJabatan";
        }
        if ($byDivisi) {
            $filters[] = "Divisi: $byDivisi";
        }

        // Logika Produk & KPI (BI Context)
        if ($byKategori) {
            $filters[] = "Kategori Produk: " . ucfirst($byKategori);
        }
        if ($byIndikator) {
            $filters[] = "Indikator: $byIndikator";
        }

        // Logika Status & Periode (Monitoring Context)
        if ($byStatus) {
            $filters[] = "Status Verifikasi: " . ucfirst($byStatus);
        }
        if ($byPeriode) {
            $filters[] = "Periode: " . ucfirst($byPeriode);
        }

        // --- TEMPAT MENAMBAH LOGIKA FILTER BARU ---
        if ($byTipe) {
            $filters[] = "Tipe Target: $byTipe";
        }
        if ($byLevel) {
            $filters[] = "Level Otoritas: $byLevel";
        }

        // Finalisasi Output
        if (!empty($filters)) {
            // Menggunakan implode dengan koma, dan "serta" di akhir agar lebih formal
            return "Menampilkan data berdasarkan " . implode(", ", $filters);
        }

        if ($search) {
            return $searchLabel . " '" . $search . "'";
        }

        return "Menampilkan seluruh data";
    }
}
