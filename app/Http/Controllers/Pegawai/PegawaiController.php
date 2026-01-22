<?php

namespace App\Http\Controllers\Pegawai;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\Akuisisi;
use App\Models\Produk;
use App\Models\Target;
use App\Models\Transaksi;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PegawaiController extends Controller
{
    protected $user;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth_sso();
            return $next($request);
        });
    }
    public function target()
    {
        $subTitle = "";
        $params = request()->all(['search', 'byTipeSatuan', 'byPeriode']);
        $subTitle = GetSubtitle::getSubtitle(...$params);
        $role = $this->user->jabatan->nama_jabatan;
        return Inertia::render('Pegawai/Target/Index', [
            "title" => "Target Kinerja Pegawai",
            "isPegawai" => $this->user->hasRole('Pegawai'),
            "subTitle"  => $subTitle,
            "targets" => Target::byPegawai($this->user) // atau $this->user, tergantung variabel user kamu
                ->filter($params)
                ->latest()
                ->with([
                    'produk:id,nama_produk,kategori_produk,label_input,satuan,kode_produk',
                    'supervisor:id,name',
                    'pegawai:id,name,nip'
                ])
                ->paginate(10)
                ->withQueryString(),
            "canManage" => $role === "Administrator",
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byTipeSatuan"     => $params['byTipeSatuan'] ?? "Semua Kategori",
                "byPeriode"     => $params['byPeriode'] ?? "Semua Kategori",
            ],
            "filtersList"   => [
                "tipe_target" => ['nominal', 'noa'],
                "periode"   => ['mingguan', 'bulanan', 'tahunan'],
            ],
        ]);
    }
    public function report(Request $request)
    {
        $user = Auth::user();
        $mode = $request->input('mode', 'daily');
        $month = (int) $request->input('month', date('n'));
        $year = (int) $request->input('year', date('Y'));
        $columns = [];
        if ($mode === 'daily') {
            $daysInMonth = Carbon::createFromDate($year, $month, 1)->daysInMonth;
            for ($d = 1; $d <= $daysInMonth; $d++) {
                $columns[] = [
                    'key' => $d,
                    'label' => (string)$d
                ];
            }
        } else {
            $monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
            foreach ($monthNames as $idx => $name) {
                $columns[] = [
                    'key' => $idx + 1,
                    'label' => $name
                ];
            }
        }
        $produks = Produk::orderBy('kategori_produk')->get(['id', 'nama_produk', 'kategori_produk']);
        $query = Transaksi::query()
            ->with('akuisisi')
            ->where('user_id', $user->id);
        if ($mode === 'daily') {
            $query->whereHas('akuisisi', function ($q) use ($year, $month) {
                $q->whereYear('tanggal_akuisisi', $year)
                    ->whereMonth('tanggal_akuisisi', $month);
            });
        } else {
            $query->whereHas('akuisisi', function ($q) use ($year) {
                $q->whereYear('tanggal_akuisisi', $year);
            });
        }
        $transactions = $query->get();
        $mappedData = [];
        foreach ($transactions as $trx) {
            $prodId = $trx->produk_id;
            $dateObj = Carbon::parse($trx->akuisisi->tanggal_akuisisi);
            $timeKey = ($mode === 'daily') ? $dateObj->day : $dateObj->month;
            if (!isset($mappedData[$prodId][$timeKey])) {
                $mappedData[$prodId][$timeKey] = 0;
            }
            $mappedData[$prodId][$timeKey]++;
        }
        $matrix = $produks->map(function ($produk) use ($mappedData, $columns) {
            $rowData = [];
            $rowTotal = 0;
            foreach ($columns as $col) {
                $val = $mappedData[$produk->id][$col['key']] ?? 0;
                $rowData[$col['key']] = $val;
                $rowTotal += $val;
            }
            return [
                'produk_id' => $produk->id,
                'nama_produk' => $produk->nama_produk,
                'kategori' => $produk->kategori_produk,
                'cells' => $rowData,
                'total' => $rowTotal
            ];
        });
        $columnTotals = [];
        $grandTotal = 0;
        foreach ($columns as $col) {
            $sum = $matrix->sum(fn($row) => $row['cells'][$col['key']]);
            $columnTotals[$col['key']] = $sum;
            $grandTotal += $sum;
        }

        $years = Akuisisi::selectRaw('YEAR(tanggal_akuisisi) as year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year')
            ->toArray();

        // Fallback kalau DB kosong
        if (empty($years)) {
            $years = [date('Y')];
        }
        return Inertia::render('Pegawai/Report', [
            'title' => 'Laporan Rekapitulasi Transaksi Produk',
            'matrix' => $matrix,
            'columns' => $columns,
            'columnTotals' => $columnTotals,
            'grandTotal' => $grandTotal,
            'filters' => [
                'mode' => $mode,
                'month' => $month,
                'year' => $year
            ],
            'filtersList' => [
            'years' => $years
        ]
        ]);
    }
    public function stats()
    {
        return Inertia::render('Pegawai/Stats', [
            "title" => "Statistik & Ranking Pencapaian Target Kinerja Saya",
        ]);
    }
}
