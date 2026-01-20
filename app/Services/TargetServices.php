<?php

namespace App\Services;

use App\Helpers\GetSubtitle;
use App\Models\Target;
use App\Models\User;
use App\Models\Produk;
use Illuminate\Http\Request;

class TargetServices
{
    /**
     * Logic pengambilan data khusus Supervisor
     */

    public function getAdminData(Request $request)
    {
        $params = $request->only(['search', 'byTipeSatuan', '', 'byTipeTarget']);

        // Generate Subtitle
        $subTitle = GetSubtitle::getSubtitle(...$params);

        // Query Data
        $targets = Target::with([
            'pegawai:id,name,nip',
            'divisi:id,nama_divisi,main_divisi',
            'produk:id,nama_produk,kategori_produk,kode_produk'
        ])->filter($params)->latest()->paginate(10)->withQueryString();

        return [
            'subTitle'   => $subTitle,
            'targets'    => $targets,
            'filtersReq' => [
                "search"    => $params['search'] ?? "",
                "byTipeSatuan"    => $params['byTipeSatuan'] ?? "Semua Kategori", //ini nanti jadi satuan
                "byPeriode" => $params['byPeriode'] ?? "Semua Kategori",
                "byTipeTarget" => $params['byTipeTarget'] ?? "",
            ],
            "filtersList" => [
                "tipe_target" => ['pegawai', 'divisi'], //tipe target
                "tipe_satuan" => ['nominal', 'noa'], //tipe satuan
                "periode"     => ['mingguan', 'bulanan', 'tahunan'],
            ],
        ];
    }


    public function getSupervisorData(User $user, Request $request)
    {
        // 1. FILTER PARAMS
        $viewMode = $request->input('view', 'semua');
        $search   = $request->input('search');
        $tahunFilter   = $request->input('tahun', date('Y'));
        $periodeFilter = $request->input('periode');

        $filters = [
            'search' => $search,
            'byTipeSatuan' => $request->input('byTipeSatuan'),
            'periode' => $periodeFilter,
            'tahun' => $tahunFilter
        ];

        // Original params for pagination appending
        $params = $request->all(['search', 'view', 'tahun', 'periode']);

        // Reusable Closures (replacing $applyHistoris...)
        $filterTarget = fn($q) => $q->where('tahun', $tahunFilter)
            ->when($periodeFilter, fn($sq) => $sq->where('periode', $periodeFilter));

        $filterReal = fn($q) => $q->whereYear('tanggal_akuisisi', $tahunFilter); // Asumsi kolom
        $filterTrx  = fn($q) => $q->whereYear('created_at', $tahunFilter);

        // Divisi logic for Produk mode
        $divisiCheck = fn($q) => $q->whereHas('pegawai', fn($sq) => $sq->where('divisi_id', $user->divisi_id));

        if ($viewMode === 'semua') {
            $data = Target::bySupervisor($user)
                ->with(['pegawai:id,name', 'produk:id,nama_produk,kategori_produk']) // Eager load optimization requested
                ->filter($filters) // Uses the updated scope
                ->latest('updated_at')
                ->paginate(10)
                ->appends($params);
        } elseif ($viewMode === 'pegawai') {
            $data = User::myTeam($user)
                ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))
                ->withCount([
                    'targets' => $filterTarget,
                    'akuisisi' => $filterReal,
                    'transaksi' => $filterTrx
                ])
                ->withSum(['targets as total_nominal' => $filterTarget], 'nilai_target')
                ->paginate(10)
                ->appends($params);
        } else {
            // Produk Mode
            $data = Produk::where('status', 'tersedia')
                ->when($search, fn($q) => $q->where('nama_produk', 'like', "%{$search}%"))
                ->withCount([
                    'targets as targets_count' => fn($q) => $filterTarget($q)->tap($divisiCheck),
                    'targets as impacted_employees_count' => fn($q) => $filterTarget($q)->tap($divisiCheck)
                ])
                ->withSum(['targets as total_team_nominal' => fn($q) => $filterTarget($q)->tap($divisiCheck)], 'nilai_target')
                ->paginate(20)->appends($params)->through(function ($item) {
                    // Cek logic Tipe Target berdasarkan kategori produk (sesuai logic kamu di Seeder)
                    $kategori = strtoupper($item->kategori_produk);
                    $isNoa = str_contains($kategori, 'E-CHANEL') || str_contains($kategori, 'E-CHANNEL');

                    if ($isNoa) {
                        $item->total_team_nominal_formatted = number_format($item->total_team_nominal ?? 0);
                    } else {
                        $item->total_team_nominal_formatted = 'Rp ' . number_format($item->total_team_nominal ?? 0, 0, ',', '.');
                    }

                    return $item;
                });;
        }
        // Return Data Array yang dibutuhkan Controller
        return [
            'data' => $data,
            'viewMode' => $viewMode,
            'filtersReq' => [
                "search"  => $search ?? "",
                "view"    => $viewMode,
                "tahun"   => $tahunFilter,
                "periode" => $periodeFilter ?? "",
            ],
            'subTitle' => "Periode Aktif: " . $tahunFilter . ($periodeFilter ? " (" . ucfirst($periodeFilter) . ")" : "")
        ];
    }
}
