<?php

namespace Database\Seeders;

use App\Models\Produk;
use Illuminate\Database\Seeder;

class ProdukSeeder extends Seeder
{
    public function run(): void
    {
        // Format Data:
        // [Nama, Kategori, Label Input, Satuan, Bobot FL, Bobot Kredit]
        $data = [
            // FUNDING (Satuan: Rekening)
            ['TABUNGAN ONLINE', 'PRODUK FUNDING', 'NOMOR REKENING', 'Rekening', 5, 10],
            ['TABUNGAN REGULER', 'PRODUK FUNDING', 'NOMOR REKENING', 'Rekening', 5, 10],
            ['TABUNGAN RENCANA MANDIRI', 'PRODUK FUNDING', 'NOMOR REKENING', 'Rekening', 5, 10],
            ['GIRO', 'PRODUK FUNDING', 'NOMOR REKENING', 'Rekening', 5, 10],

            // E-CHANNEL (Satuan beda-beda)
            ['LIVIN/MOBILE BANKING', 'PRODUK E-CHANEL', 'NOMOR REKENING', 'User', 5, 5],
            ['LIVIN MERCHANT/QRIS', 'PRODUK E-CHANEL', 'NAMA MERCHANT', 'Merchant', 5, 5],
            ['EDC', 'PRODUK E-CHANEL', 'KODE MID', 'Unit', 5, 10],
            ['KOPRA BANKING PERUSAHAAN', 'PRODUK E-CHANEL', 'ID COMPANY', 'ID', 5, 10],

            // KREDIT (Satuan: Rekening/Debitur)
            ['KREDIT USAHA MIKRO (KUM)', 'PRODUK KREDIT', 'NOMOR REKENING', 'Debitur', 10, 5],
            ['KREDIT USAHA RAKYAT (KUR)', 'PRODUK KREDIT', 'NOMOR REKENING', 'Debitur', 10, 5],
            ['KREDIT SME', 'PRODUK KREDIT', 'NOMOR REKENING', 'Debitur', 15, 15],
            ['KREDIT PERUMAHAN (KPR)', 'PRODUK KREDIT', 'NOMOR REKENING', 'Debitur', 15, 15],
            ['KREDIT PINJAMAN PEGAWAI (KSM)', 'PRODUK KREDIT', 'NOMOR REKENING', 'Debitur', 15, 15],
            ['KARTU KREDIT', 'PRODUK KREDIT', 'NOMOR KTP', 'Kartu', 15, 15],

            // ANAK PERUSAHAAN
            ['ASURANSI AXA MANDIR', 'PRODUK ANAK PERUSAHAAN', 'NOMOR POLIS', 'Polis', 10, 10],
            ['KREDIT KENDARAAN BERMOTOR', 'PRODUK ANAK PERUSAHAAN', 'NOMOR KONTRAK', 'Unit', 10, 10],
        ];

        foreach ($data as $index => $item) {
            $prefix = strtoupper(substr($item[1], 7, 3));
            $kode = $prefix . '-' . str_pad($index + 1, 3, '0', STR_PAD_LEFT);

            Produk::create([
                'nama_produk' => $item[0],
                'kode_produk' => $kode,
                'kategori_produk' => $item[1],
                'label_input' => $item[2],
                'satuan' => $item[3], // <--- MASUK SINI
                'bobot_frontliner' => $item[4],
                'bobot_kredit' => $item[5],
                'status' => 'tersedia'
            ]);
        }
    }
}
