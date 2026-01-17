<?php
namespace Database\Seeders;
use App\Models\Akuisisi;
use App\Models\Transaksi;
use App\Services\PointCalculator;
use Illuminate\Database\Seeder;
class TransaksiSeeder extends Seeder
{
    public function run(): void
    {
        $akuisisis = Akuisisi::where('status_verifikasi', 'verified')
            ->with(['pegawai.divisi', 'produk'])
            ->get();
        foreach ($akuisisis as $ak) {
            $user = $ak->pegawai;
            $produk = $ak->produk;
            if (!$user || !$produk) continue;
            $poin = PointCalculator::calculate($user, $produk);
            Transaksi::create([
                'akuisisi_id' => $ak->id,
                'user_id' => $ak->user_id,
                'produk_id' => $ak->produk_id,
                'nilai_realisasi' => $ak->nominal_realisasi,
                'poin_didapat' => $poin,
                'tanggal_realisasi' => $ak->tanggal_akuisisi,
                'created_at' => $ak->verified_at,
            ]);
        }
    }
}
