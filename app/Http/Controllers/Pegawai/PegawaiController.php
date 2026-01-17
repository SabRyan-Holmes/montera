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

    public function generateNoTransaksi()
    {
        $today = Carbon::now()->format('Ymd');
        $prefix = "TRX-{$today}";

        // Cari transaksi terakhir hari ini
        $lastTransaction = Akuisisi::where('no_transaksi', 'like', "{$prefix}-%")
            ->orderBy('id', 'desc')
            ->first();

        if ($lastTransaction) {
            // Ambil 4 digit terakhir (nomor urut)
            $lastNumber = intval(substr($lastTransaction->no_transaksi, -4));
            $newNumber = $lastNumber + 1;
        } else {
            // Jika belum ada transaksi hari ini
            $newNumber = 1;
        }

        // Format ulang menjadi 4 digit (misal: 0001)
        $formattedNumber = sprintf("%04d", $newNumber);
        $newNoTransaksi = "{$prefix}-{$formattedNumber}";

        return response()->json(['no_transaksi' => $newNoTransaksi]);
    }

    public function target()
    {
        $subTitle = "";
        $params = request()->all(['search', 'byTipe', 'byPeriode']);
        $subTitle = GetSubtitle::getSubtitle(...$params);
        $role = $this->user->jabatan->nama_jabatan;

        return Inertia::render('Pegawai/Target/Index', [
            "title" => "Target Kinerja Pegawai",
            "subTitle"  => $subTitle,
            "targets" => Target::filter($params)->latest()->with(['produk:id,nama_produk,kategori_produk,label_input,satuan,kode_produk'])->paginate(10)
                ->withQueryString(),
            "canManage" => $role === "Administrator",
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byTipe"     => $params['byTipe'] ?? "Semua Kategori",
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
        $user = Auth::user(); // Sesuaikan dengan cara lu ambil user

        // 1. Filter Parameter
        $mode = $request->input('mode', 'daily'); // 'daily' atau 'monthly'
        $month = (int) $request->input('month', date('n'));
        $year = (int) $request->input('year', date('Y'));

        // 2. Generate Struktur Kolom (Header Tabel)
        // --- LOGIC INI YANG HILANG DI KODE LU ---
        $columns = [];

        if ($mode === 'daily') {
            // Mode Harian: Generate angka 1 s/d Hari Terakhir Bulan itu
            // Pakai Carbon buat tau bulan itu sampai tanggal 28, 30, atau 31
            $daysInMonth = Carbon::createFromDate($year, $month, 1)->daysInMonth;

            for ($d = 1; $d <= $daysInMonth; $d++) {
                $columns[] = [
                    'key' => $d,
                    'label' => (string)$d // Label header: "1", "2", "3"...
                ];
            }
        } else {
            // Mode Bulanan: Generate Jan s/d Des
            $monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

            foreach ($monthNames as $idx => $name) {
                $columns[] = [
                    'key' => $idx + 1, // Key: 1, 2, ... 12
                    'label' => $name   // Label: "Jan", "Feb"...
                ];
            }
        }
        // ----------------------------------------

        // Kalo lu dd($columns) disini, PASTI UDAH ADA ISINYA
        // dd($columns);

        // 3. Ambil Master Produk (Baris Tabel)
        $produks = Produk::orderBy('kategori_produk')->get(['id', 'nama_produk', 'kategori_produk']);

        // 4. Query Data Transaksi (Hanya Verified)
        $query = Transaksi::query()
            ->with('akuisisi')
            ->where('user_id', $user->id);

        // Filter Waktu Query
        if ($mode === 'daily') {
            $query->whereHas('akuisisi', function($q) use ($year, $month) {
                $q->whereYear('tanggal_akuisisi', $year)
                  ->whereMonth('tanggal_akuisisi', $month);
            });
        } else {
            $query->whereHas('akuisisi', function($q) use ($year) {
                $q->whereYear('tanggal_akuisisi', $year);
            });
        }

        $transactions = $query->get();

        // 5. Mapping Data ke Matriks (Pivot Manual)
        $mappedData = [];
        foreach ($transactions as $trx) {
            $prodId = $trx->produk_id;

            // Penting: Ambil tanggal dari data akuisisi
            $dateObj = Carbon::parse($trx->akuisisi->tanggal_akuisisi);

            // Tentukan Key Grouping (Tanggal atau Bulan)
            $timeKey = ($mode === 'daily') ? $dateObj->day : $dateObj->month;

            if (!isset($mappedData[$prodId][$timeKey])) {
                $mappedData[$prodId][$timeKey] = 0;
            }
            $mappedData[$prodId][$timeKey]++;
        }

        // 6. Susun Data Final untuk Frontend
        $matrix = $produks->map(function ($produk) use ($mappedData, $columns) {
            $rowData = [];
            $rowTotal = 0;

            foreach ($columns as $col) {
                // Cari data di mappedData, kalo ga ada isi 0
                $val = $mappedData[$produk->id][$col['key']] ?? 0;

                $rowData[$col['key']] = $val;
                $rowTotal += $val;
            }


            return [
                'produk_id' => $produk->id,
                'nama_produk' => $produk->nama_produk,
                'kategori' => $produk->kategori_produk,
                'cells' => $rowData, // Array data per kolom
                'total' => $rowTotal // Total baris kanan
            ];
        });

        // 7. Hitung Grand Total (Footer Bawah)
        $columnTotals = [];
        $grandTotal = 0;

        // --- DEBUGGING AREA (Tulis ini bro) ---
        // Kita cek apa isi variabelnya sebelum dikirim ke React
        // dd([
        //     'REQUEST_MODE' => $mode, // Cek apakah mode kebaca?
        //     'REQUEST_MONTH' => $month,
        //     'COLUMNS_COUNT' => count($columns), // Harusnya 30/31 (Harian) atau 12 (Bulanan)
        //     'COLUMNS_DATA' => $columns, // Cek isinya array header bener gak?
        //     'MATRIX_DATA' => $matrix->toArray() // Cek isi datanya
        // ]);
        // -------------------------------------

        foreach ($columns as $col) {
            // Sum vertikal per kolom
            $sum = $matrix->sum(fn($row) => $row['cells'][$col['key']]);
            $columnTotals[$col['key']] = $sum;
            $grandTotal += $sum;
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
            ]
        ]);
    }

    public function transaksi()
    {
        $subTitle = "";
        $params = request()->all(['search', 'byKategori', 'byStatus']);
        $subTitle = GetSubtitle::getSubtitle(...$params);
        $role = $this->user->jabatan->nama_jabatan;
        return Inertia::render('Administrator/Transaksi/Index', [
            "title" => "Data Transaksi Saya",
            "subTitle"  => $subTitle,
            "canManage" => $role === "Administrator",
            "transaksis"    => $this->user->transaksi()->with(['pegawai:id,name,nip', 'produk:id,nama_produk,kode_produk',  'akuisisi:id,nama_nasabah,no_identitas_nasabah'])
                ->filter($params)->paginate(10)->withQueryString(),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byKategori"     => $params['byKategori'] ?? "",
                "byStatus"     => $params['byStatus'] ?? "",
            ],
            "filtersList"   => [
                "kategori" => Produk::getEnumValues('kategori'),
                "status"   => Produk::getEnumValues('status'),
            ],
        ]);
    }

    public function stats()
    {
        return Inertia::render('Pegawai/Stats', [
            "title" => "Statistik & Ranking Pencapaian Target Kinerja Saya",
        ]);
    }
}
