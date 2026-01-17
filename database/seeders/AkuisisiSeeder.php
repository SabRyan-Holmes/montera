<?php
namespace Database\Seeders;
use App\Models\Akuisisi;
use App\Models\Produk;
use App\Models\User;
use Illuminate\Database\Seeder;
class AkuisisiSeeder extends Seeder
{
    public function run(): void
    {
        $pegawaiList = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Pegawai'))->get();
        $supervisorList = User::whereHas('jabatan', fn($q) => $q->where('nama_jabatan', 'Supervisor'))->get();
        $produkIds = Produk::pluck('id');
        if ($pegawaiList->isEmpty() || $supervisorList->isEmpty()) {
            $this->command->info('Data Pegawai atau Supervisor kosong. Skip AkuisisiSeeder.');
            return;
        }
        $nasabahList = [
            'Budi Santoso', 'Siti Aminah', 'Andi Wijaya', 'Rina Pratama', 'Eko Susanto',
            'Dewi Lestari', 'Fajar Ramadhan', 'Gita Gutawa', 'Hadi Sucipto', 'Indah Permata',
            'Joko Widodo', 'Kartika Sari', 'Lutfi Hakim', 'Maya Ahmad', 'Nico Saputra',
            'Oki Setiawan', 'Putri Ayu', 'Qori Iskandar', 'Rudi Hartono', 'Siska Amelia',
            'Tono Subagyo', 'Umar Bakri', 'Vina Panduwinata', 'Wawan Hendrawan', 'Xena Warrior',
            'Yusuf Mansur', 'Zainal Abidin', 'Agus Salim', 'Bambang Pamungkas', 'Cici Paramida',
            'Dedi Corbuzier', 'Endang Soekamti', 'Farah Quinn', 'Gading Marten', 'Hesti Purwadinata',
            'Irfan Hakim', 'Jessica Iskandar', 'Kevin Aprilio', 'Luna Maya', 'Melly Goeslaw',
            'Nunung Srimulat', 'Opick Tomboati', 'Pasha Ungu', 'Qibil Changcuters', 'Raffi Ahmad',
            'Sule Prikitiw', 'Tukul Arwana', 'Uya Kuya', 'Vicky Prasetyo', 'Wendy Cagur',
            'Xabiru Oshe', 'Yuni Shara', 'Zaskia Gotik', 'Ade Rai', 'Baim Wong',
            'Chika Jessica', 'Denny Cagur', 'Eko Patrio', 'Fitri Tropica', 'Gilang Dirga',
            'Hengky Kurniawan', 'Indra Bekti', 'Jojon Pelawak', 'Komeng Uhuy', 'Lesti Kejora',
            'Mpok Alpa', 'Nassar Sungkar', 'Olga Syahputra', 'Parto Patrio', 'Quilla Simanjuntak',
            'Rina Nose', 'Sojimah Pancawati', 'Tora Sudiro', 'Ucok Baba', 'Vincent Rompies',
            'Andre Taulany', 'Boris Bokir', 'Cinta Laura', 'Desta Mahendra', 'Enzy Storia',
            'Ferry Maryadi', 'Gading Marten', 'Habib Jafar', 'Indro Warkop', 'Jerome Polin',
            'Kiky Saputri', 'Livy Renata', 'Marshel Widianto', 'Njan Sutisna', 'Onadio Leonardo',
            'Praz Teguh', 'Raditya Dika', 'Surya Insomnia', 'Tretan Muslim', 'Uus Biasaaja',
            'Vindes Saja', 'Wendi Cagur', 'Yono Bakrie', 'Zarry Hendrik', 'Arief Muhammad',
            'Bintang Emon', 'Coki Pardede', 'Dustin Tiffani', 'Eca Aura'
        ];
        $usedIdentities = [];
        foreach ($nasabahList as $index => $nama) {
            $pegawai = $pegawaiList->random();
            $produkId = $produkIds->random();
            $noIdentitas = rand(1000000000, 9999999999);
            $key = $noIdentitas . '-' . $produkId;
            if (in_array($key, $usedIdentities)) continue;
            $usedIdentities[] = $key;
            $rand = rand(1, 100);
            if ($rand <= 65) {
                $status = 'verified';
            } elseif ($rand <= 85) {
                $status = 'rejected';
            } else {
                $status = 'pending';
            }
            $targetSupervisor = $supervisorList->random();
            $supervisorId = $targetSupervisor->id;
            $verifikatorId = null;
            $verifiedAt = null;
            $catatan = null;
            if ($status !== 'pending') {
                $verifikatorId = $supervisorId;
                $verifiedAt = now()->subDays(rand(0, 5));
                if ($status === 'rejected') {
                    $catatan = 'Data nasabah kurang lengkap, mohon lampirkan KTP yang jelas.';
                }
            }
            Akuisisi::create([
                'no_transaksi' => 'TRX-' . date('Ymd') . '-' . str_pad($index + 1, 4, '0', STR_PAD_LEFT),
                'user_id' => $pegawai->id,
                'produk_id' => $produkId,
                'nama_nasabah' => $nama,
                'no_identitas_nasabah' => $noIdentitas,
                'nominal_realisasi' => rand(1000000, 50000000),
                'tanggal_akuisisi' => now()->subDays(rand(1, 30)),
                'status_verifikasi' => $status,
                'supervisor_id' => $supervisorId,
                'verifikator_id' => $verifikatorId,
                'verified_at' => $verifiedAt,
                'catatan_revisi' => $catatan,
                'created_at' => now()->subDays(rand(6, 10)),
            ]);
        }
    }
}
