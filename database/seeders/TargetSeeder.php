<?php
namespace Database\Seeders;
use App\Models\Produk;
use App\Models\Target;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
class TargetSeeder extends Seeder
{
    public function run(): void
    {
        $pegawaiList = User::role('Pegawai')->get();
        $supervisorList = User::role('Supervisor')->get();
        $produkIds = Produk::pluck('id');
        if ($pegawaiList->isEmpty() || $produkIds->isEmpty()) {
            return;
        }
        for ($i = 0; $i < 42; $i++) {
            $bulan = rand(1, 12);
            $tahun = rand(2024, 2026);
            $startDate = Carbon::createFromDate($tahun, $bulan, 1);
            $endDate = $startDate->copy()->endOfMonth();
            $deadline = $endDate->copy();
            $pegawai = $pegawaiList->random();
            $supervisor = $supervisorList->where('divisi_id', $pegawai->divisi_id)->first();
            if (!$supervisor) {
                $supervisor = $supervisorList->random();
            }
            Target::create([
                'user_id' => $pegawai->id,
                'supervisor_id' => $supervisor->id,
                'produk_id' => $produkIds->random(),
                'nilai_target' => rand(10, 100) * 1000000,
                'tipe_target' => rand(0, 1) ? 'nominal' : 'noa',
                'periode' => 'bulanan',
                'tahun' => $tahun,
                'bulan' => $bulan,
                'tanggal_mulai' => $startDate->format('Y-m-d'),
                'tanggal_selesai' => $endDate->format('Y-m-d'),
                'deadline_pencapaian' => $deadline->format('Y-m-d'),
                'keterangan_tambahan' => 'Target performa otomatis untuk bulan ' . $startDate->format('F Y'),
            ]);
        }
    }
}
