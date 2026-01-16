<?php
namespace Database\Seeders;
use App\Models\Akuisisi;
use App\Models\Produk;
use App\Models\User;
use App\Models\Transaksi;
use Illuminate\Database\Seeder;
class TransaksiSeeder extends Seeder
{
    public function run(): void
    {
        $akuisisis = Akuisisi::where('status_verifikasi', 'verified')->with(['pegawai.divisi', 'produk'])->get();
        foreach ($akuisisis as $ak) {
            $user = $ak->pegawai;
            $produk = $ak->produk;
            $isKreditStaff = str_contains(strtolower($user->divisi->nama_divisi ?? ''), 'kredit');
            $poin = $isKreditStaff ? $produk->bobot_kredit : $produk->bobot_frontliner;
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
