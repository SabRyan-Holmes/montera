<?php

namespace Database\Seeders;

use App\Models\Akuisisi;
use App\Models\Produk;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class AkuisisiSeeder extends Seeder
{
    public function run(): void
    {
        $pegawaiList = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Pegawai'))->get();
        $supervisorList = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Supervisor'))->get();

        // Ambil produk lengkap dengan kategorinya biar bisa main logic nominal
        $produks = Produk::all();

        if ($pegawaiList->isEmpty() || $supervisorList->isEmpty() || $produks->isEmpty()) {
            $this->command->info('Data Pegawai, Supervisor, atau Produk kosong. Skip AkuisisiSeeder.');
            return;
        }

        // --- 1. CONFIG GENERATOR ---
        $totalTarget = 280; // Total lebih dari 250
        $targetVerified = 176;
        $targetPending = 86;
        // Sisanya (280 - 96 - 137 = 47) akan jadi Rejected

        $dataBuffer = [];
        $usedIdentities = []; // Biar ga ada duplikat identitas-produk yg sama

        // --- 2. GENERATOR NAMA NASABAH (Kombinasi biar banyak) ---
        $firstNames = [
            'Aditya',
            'Bayu',
            'Chandra',
            'Dedi',
            'Eko',
            'Fajar',
            'Gilang',
            'Hendra',
            'Indra',
            'Joko',
            'Kurniawan',
            'Lukman',
            'Muhammad',
            'Nugroho',
            'Oscar',
            'Putra',
            'Reza',
            'Satria',
            'Taufik',
            'Wahyu',
            'Anita',
            'Bunga',
            'Citra',
            'Dewi',
            'Endang',
            'Fitri',
            'Gita',
            'Hesti',
            'Indah',
            'Julia',
            'Kartika',
            'Lina',
            'Maya',
            'Nina',
            'Olla',
            'Putri',
            'Rina',
            'Sari',
            'Tari',
            'Vina',
            'Andi',
            'Budi',
            'Cahyo',
            'Dian',
            'Eka',
            'Ferry',
            'Guntur',
            'Hadi',
            'Imam',
            'Jamal'
        ];
        $lastNames = [
            'Santoso',
            'Wijaya',
            'Saputra',
            'Pratama',
            'Hidayat',
            'Kusuma',
            'Ramadhan',
            'Nugraha',
            'Wibowo',
            'Susanto',
            'Permata',
            'Lestari',
            'Putri',
            'Sari',
            'Anggraini',
            'Rahmawati',
            'Dewi',
            'Kusumawati',
            'Utami',
            'Pertiwi',
            'Setiawan',
            'Kurniawan',
            'Siregar',
            'Nasution',
            'Simanjuntak',
            'Sitompul',
            'Lubis',
            'Harahap',
            'Ginting',
            'Subagyo',
            'Suharto',
            'Supriyadi',
            'Widodo',
            'Yudhoyono',
            'Megawati',
            'Habibie',
            'Soekarno',
            'Hatta'
        ];

        // --- 3. LOOPING PEMBUATAN DATA ---
        for ($i = 0; $i < $totalTarget; $i++) {

            // A. Tentukan Status Sesuai Kuota
            if ($i < $targetVerified) {
                $status = 'verified';
            } elseif ($i < ($targetVerified + $targetPending)) {
                $status = 'pending';
            } else {
                $status = 'rejected';
            }

            // B. Pilih Aktor & Produk
            $pegawai = $pegawaiList->random();
            $supervisor = $supervisorList->random();
            $produk = $produks->random();

            // C. Generate Nama Unik
            $namaNasabah = $firstNames[array_rand($firstNames)] . ' ' . $lastNames[array_rand($lastNames)];

            // D. Generate No Identitas (KTP 16 Digit)
            $noIdentitas = '1' . str_pad(mt_rand(1, 999999999999999), 15, '0', STR_PAD_LEFT);

            // Cek Unik (Identitas + Produk) biar realistis (1 orang bisa beli produk beda, tapi ga produk sama double)
            $key = $noIdentitas . '-' . $produk->id;
            if (in_array($key, $usedIdentities)) {
                $i--; // Ulangi iterasi ini
                continue;
            }
            $usedIdentities[] = $key;

            // E. Logic Nominal Cerdas
            $kategori = strtoupper($produk->kategori_produk);
            $nominal = 0;

            if (str_contains($kategori, 'E-CHANEL') || str_contains($kategori, 'E-CHANNEL')) {
                // E-Channel (Unit/NOA): Nominal Kecil (misal saldo awal 50rb - 1jt, atau 1 unit)
                // Kita anggap ini 'Saldo Awal' atau 'Unit'
                // 70% kemungkinan nominal kecil (1 unit), 30% nominal saldo (50rb - 500rb)
                if (rand(1, 100) <= 70) {
                    $nominal = 1; // 1 Unit
                } else {
                    $nominal = rand(50000, 500000); // Saldo Awal
                }
            } else {
                // Funding, Kredit, Anak Perusahaan: Nominal Besar (Jutaan - Milyaran)
                if ($kategori == 'PRODUK KREDIT') {
                    $nominal = rand(10, 500) * 1000000; // 10jt - 500jt
                } elseif ($kategori == 'PRODUK FUNDING') {
                    $nominal = rand(500, 20000) * 1000; // 500rb - 20jt
                } else {
                    $nominal = rand(1000000, 10000000); // 1jt - 10jt
                }
            }

            // F. Atur Verifikator & Tanggal
            $verifikatorId = null;
            $verifiedAt = null;
            $catatan = null;
            $tanggalInput = Carbon::now()->subDays(rand(1, 60)); // Data 2 bulan terakhir

            if ($status !== 'pending') {
                $verifikatorId = $supervisor->id; // Supervisor sendiri yg verifikasi
                // Verified/Rejected 1-3 hari setelah input
                $verifiedAt = (clone $tanggalInput)->addDays(rand(1, 3));

                if ($status === 'rejected') {
                    $alasan = [
                        'Data KTP buram / tidak terbaca.',
                        'Tanda tangan nasabah tidak sesuai.',
                        'Dokumen pendukung kurang lengkap.',
                        'Nasabah tidak dapat dihubungi saat verifikasi.',
                        'Nominal tidak sesuai dengan ketentuan produk.'
                    ];
                    $catatan = $alasan[array_rand($alasan)];
                }
            }

            $lampiranBukti = null;

            if ($status === 'verified' || $status === 'pending') {
                // Saya tambahkan 'pending' juga karena logikanya orang upload dulu baru diverifikasi
                // Format: bukti_akuisisi/bukti_akuisisi_YYYYMMDD_HHMMSS_RAND.pdf
                $lampiranBukti = 'bukti_akuisisi/bukti_akuisisi_20260120_064832_tF9m.pdf'; //untuk template pdf doang
            }
            // FORMAT BARU: TRX-YYYYMMDD-URUT-ACAK
            $tglTransaksi = $tanggalInput->format('Ymd');
            $urutan = str_pad($i + 1, 4, '0', STR_PAD_LEFT);
            $acak = strtoupper(Str::random(3)); // Tambahan acak
            // G. Masukkan ke Buffer
            $dataBuffer[] = [
                'no_transaksi'       => "TRX-{$tglTransaksi}-{$urutan}-{$acak}",
                'user_id'            => $pegawai->id,
                'produk_id'          => $produk->id,
                'nama_nasabah'       => $namaNasabah,
                'no_identitas_nasabah' => $noIdentitas,
                'nominal_realisasi'  => $nominal,
                'tanggal_akuisisi'   => $tanggalInput->format('Y-m-d'),
                'status_verifikasi'  => $status,
                'supervisor_id'      => $supervisor->id,
                'verifikator_id'     => $verifikatorId,
                'verified_at'        => $verifiedAt,
                'catatan_revisi'     => $catatan,
                'lampiran_bukti'     => $lampiranBukti,
                'created_at'         => $tanggalInput,
                'updated_at'         => $verifiedAt ?? $tanggalInput,
            ];
        }

        // H. Bulk Insert (Biar Cepat)
        // Kita chunk per 50 data biar database ga ngos-ngosan
        foreach (array_chunk($dataBuffer, 50) as $chunk) {
            Akuisisi::insert($chunk);
        }

        $this->command->info("Berhasil seeding {$totalTarget} data akuisisi.");
        $this->command->info("Verified: {$targetVerified}, Pending: {$targetPending}, Rejected: " . ($totalTarget - $targetVerified - $targetPending));
    }
}
