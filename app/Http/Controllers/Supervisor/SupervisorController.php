<?php

namespace App\Http\Controllers\Supervisor;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Http\Requests\TargetStoreUpdateRequest;
use App\Models\Akuisisi;
use App\Models\Produk;
use App\Models\Target;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SupervisorController extends Controller
{

    protected $user;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth_sso();
            return $next($request);
        });
    }


    public function verify() //for Supervisor
    {
        $subTitle = "";
        $params = request()->all(['search', 'byStatus']);
        $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Supervisor/Verifikasi/Index', [
            "title" => "Verifikasi Data Akuisisi Tim Saya",
            "subTitle"  => $subTitle,
            "akuisisis" => Akuisisi::query()
                ->with(['pegawai:id,name', 'produk:id,nama_produk,kategori_produk', 'verifikator:id,name'])
                ->inSupervisorDivisi() // <--- 1. Filter Divisi Supervisor
                ->latest()             // <--- 2. Ambil data terbaru (ORDER BY created_at DESC)
                ->filter($params)      // <--- 3. Filter Search/Status (bawaan kamu)
                ->paginate(10)
                ->withQueryString(),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byStatus"   => $params['byStatus'] ?? "Semua Kategori",
            ],
            "filtersList"   => [
                "status"   => ['pending', 'verified', 'rejected'],
            ],
        ]);
    }


    public function target_tim(Request $request)
    {
        $user = Auth::user();

        // --- 1. FILTER PARAMS ---
        $viewMode = $request->input('view', 'semua'); // Default: semua
        $search   = $request->input('search');

        // Filter Historis: Tahun & Periode
        $tahunFilter   = $request->input('tahun', date('Y'));
        $periodeFilter = $request->input('periode');

        // Params untuk pagination link agar filter tidak hilang saat ganti page
        $params = $request->all(['search', 'view', 'tahun', 'periode']);

        $data = null;



        // --- CLOSURE UNTUK TARGET (Pakai kolom 'tahun' & 'periode') ---
        $applyHistorisTarget = function ($query) use ($tahunFilter, $periodeFilter) {
            $query->where('tahun', $tahunFilter);
            if ($periodeFilter) {
                $query->where('periode', $periodeFilter);
            }
        };

        // --- CLOSURE UNTUK AKUISISI/TRANSAKSI (Pakai kolom Tanggal) ---
        // Kita konversi filter tahun ke rentang tanggal
        $applyHistorisReal = function ($query) use ($tahunFilter) {
            // Filter berdasarkan TAHUN saja (karena transaksi gapunya kolom 'periode' enum)
            // Asumsi kolom tanggal di tabel akuisisi adalah 'tanggal_akuisisi'
            // Jika tabel transaksi pakai 'created_at', sesuaikan nama kolomnya
            $query->whereYear('tanggal_akuisisi', $tahunFilter);
        };

        // Khusus Transaksi jika kolomnya created_at
        $applyHistorisTransaksi = function ($query) use ($tahunFilter) {
             $query->whereYear('created_at', $tahunFilter);
        };
        // --- 2. QUERY DATA BERDASARKAN MODE VIEW ---
        if ($viewMode === 'semua') {
            // --- MODE 3: SEMUA (LIST DETAIL / CRUD LOG) ---
            // Ini logic yang Anda minta tambahkan
            $data = Target::targetInDivision($user)
                ->tap($applyHistorisTarget)
                ->when($search, function ($q, $s) {
                    $q->where(function ($sub) use ($s) {
                        $sub->whereHas('pegawai', fn($sq) => $sq->where('name', 'like', "%{$s}%"))
                            ->orWhereHas('produk', fn($sq) => $sq->where('nama_produk', 'like', "%{$s}%"));
                    });
                })->latest()
                ->paginate(10)
                ->appends($params);
        } else if ($viewMode === 'pegawai') {
            // --- MODE 1: PER PEGAWAI ---
            $data = User::myTeam($user) // Exclude Supervisor sendiri
                ->when($search, fn($q) => $q->where('name', 'like', "%{$search}%"))

                // Hitung jumlah target pegawai ini (sesuai filter tahun/periode)
                ->withCount(['targets' => fn($q) => $applyHistorisTarget($q)])
                ->withCount(['akuisisi' => fn($q) => $applyHistorisReal($q)])
                ->withCount(['transaksi' => fn($q) => $applyHistorisTransaksi($q)])

                // Hitung total nominal target pegawai ini (sesuai filter tahun/periode)
                ->withSum(['targets as total_nominal' => fn($q) => $applyHistorisTarget($q)], 'nilai_target')

                ->paginate(10)
                ->appends($params);
        } else {
            // --- MODE 2: PER PRODUK (FOKUS PERBAIKAN DISINI) ---
            $data = Produk::query()
                ->where('status', 'tersedia')
                ->when($search, fn($q) => $q->where('nama_produk', 'like', "%{$search}%"))

                // 1. Hitung Total Target (Item) - INI YANG ANDA MINTA
                ->withCount(['targets as targets_count' => function ($q) use ($user, $applyHistorisTarget) {
                    $applyHistorisTarget($q); // Filter Tahun/Periode
                    $q->whereHas('pegawai', fn($sq) => $sq->where('divisi_id', $user->divisi_id));
                }])

                // 2. Hitung Pegawai Terpengaruh (Sama logicnya, tapi beda nama alias biar jelas di frontend)
                ->withCount(['targets as impacted_employees_count' => function ($q) use ($user, $applyHistorisTarget) {
                    $applyHistorisTarget($q);
                    $q->whereHas('pegawai', fn($sq) => $sq->where('divisi_id', $user->divisi_id));
                }])

                // 3. Hitung Total Nominal Tim
                ->withSum(['targets as total_team_nominal' => function ($q) use ($user, $applyHistorisTarget) {
                    $applyHistorisTarget($q);
                    $q->whereHas('pegawai', fn($sq) => $sq->where('divisi_id', $user->divisi_id));
                }], 'nilai_target')

                ->paginate(20)
                ->appends($params);
        }

        return Inertia::render('Supervisor/TargetTim/Index', [
            "title"      => "Target Kerja Tim",
            "subTitle"   => "Periode Aktif: " . $tahunFilter . ($periodeFilter ? " (" . ucfirst($periodeFilter) . ")" : ""),
            "targets"    => $data,
            "viewMode"   => $viewMode,

            // Kirim state filter ke frontend agar input terisi
            "filtersReq" => [
                "search"  => $search ?? "",
                "view"    => $viewMode,
                "tahun"   => $tahunFilter,
                "periode" => $periodeFilter ?? "",
            ],

            // List opsi dropdown filter
            "filtersList" => [
                "periode" => ['mingguan', 'bulanan', 'tahunan'],
                // Generate tahun dinamis (misal 5 tahun ke belakang + 1 tahun ke depan)
                "tahun"   => range(date('Y') + 1, date('Y') - 4),
            ],
        ]);
    }


    public function target_tim_create(Request $request)
    {
        // Input dari URL (misal klik + dari index)

        return Inertia::render('Supervisor/TargetTim/Create', [
            "title" => "Buat Target Baru untuk Anggota Tim",
            "optionList" => [
                "pegawai" => User::myTeam($this->user)->get()->map(fn($u) => [
                    'value' => $u->id,
                    'label' => $u->name . ' - ' . $u->nip
                ]),
                "produk" => Produk::all()->map(fn($p) => [
                    'value' => $p->id,
                    'label' => $p->nama_produk
                ]),
                "tipe_target" => [
                    ['value' => 'nominal', 'label' => 'Nominal (Rupiah)'],
                    ['value' => 'noa', 'label' => 'NoA (Number of Account)'],
                ],
                "periode" => [
                    ['value' => 'mingguan', 'label' => 'Mingguan'],
                    ['value' => 'bulanan', 'label' => 'Bulanan'],
                    ['value' => 'tahunan', 'label' => 'Tahunan'],
                ],
            ],

            // Kirim default value jika ada
            "defaultValues" => [
                "user_id"   => $request->input('pegawai_id'),
                "produk_id" => $request->input('produk_id'),
                "tahun" => date('Y'),
                "tipe_target" => 'nominal',
                "periode"    => 'bulanan',
            ]
        ]);
    }

    public function target_tim_store(TargetStoreUpdateRequest $request)
    {
        Target::create($request->validated());
        return redirect()
            ->route('spv.target-tim')
            ->with('message', 'Target Baru Berhasil Ditambahkan!');
    }


    public function team()
    {
        // 1. Ambil data Supervisor yang sedang login
        $user = $this->user;
        $divisiId = $user->divisi_id;

        // 2. Query Anggota Tim
        $teamMembers = User::where('divisi_id', $divisiId)
            ->where('id', '!=', $user->id) // Kecualikan Supervisor itu sendiri
            ->with(['transaksi', 'target']) // Load relasi: Transaksi (hasMany) & Target (hasOne)
            ->get()
            ->map(function ($member) {
                // --- LOGIKA FIX NULL ERROR ---

                // Cek apakah user punya target?
                // Jika $member->target ada (Object), ambil properti 'nilai_target'.
                // Jika null, set nilai jadi 0.
                $totalTarget = $member->target ? $member->target->nilai_target : 0;

                // Hitung total realisasi (Transaksi sah)
                $totalRealisasi = $member->transaksi->sum('nilai_realisasi');

                // Hitung Persentase (Cegah pembagian dengan nol / Division by Zero)
                $persentase = $totalTarget > 0
                    ? ($totalRealisasi / $totalTarget) * 100
                    : 0;

                // Tentukan Status (Bisa dipisah jadi fungsi helper jika mau)
                $status = match (true) {
                    $persentase >= 100 => 'Excellent',
                    $persentase >= 80  => 'Good',
                    default            => 'Warning'
                };

                return [
                    'id' => $member->id,
                    'name' => $member->name,
                    // 'avatar' => $member->avatar, // Aktifkan jika ada kolom avatar
                    'total_target' => $totalTarget,
                    'total_realisasi' => $totalRealisasi,
                    'persentase' => round($persentase, 1), // Bulatkan 1 desimal
                    'status' => $status,
                ];
            })
            ->sortByDesc('total_realisasi') // Urutkan: Capaian tertinggi di atas (Ranking 1)
            ->values(); // Reset index array agar rapi (0, 1, 2...)

        // 3. Hitung Statistik Agregat untuk Card di Dashboard Atas
        $teamStats = [
            'total_member' => $teamMembers->count(),
            'total_target_tim' => $teamMembers->sum('total_target'),
            'total_realisasi_tim' => $teamMembers->sum('total_realisasi'),
            'rata_rata_capaian' => round($teamMembers->avg('persentase'), 1),
        ];

        // 4. Kirim ke Frontend (Inertia)
        return Inertia::render('Supervisor/Team', [
            "title" => "Monitoring Performa Tim",
            "teamMembers" => $teamMembers,
            "teamStats" => $teamStats
        ]);
    }

    // 2. Method Baru (Khusus API ambil detail transaksi)
    // Tambahkan ini di SupervisorController
    public function memberTransactions(User $user)
    {
        // Pastikan Supervisor cuma bisa intip timnya sendiri (Security)
        if ($user->divisi_id !== $this->user->divisi_id) {
            abort(403);
        }

        $history = $user->transaksi()
            ->with('produk') // Load nama produk
            ->where('status_verifikasi', 'verified')
            ->latest()
            ->take(10) // Ambil 10 terakhir
            ->get()
            ->map(function ($t) {
                return [
                    'tanggal' => $t->created_at->format('d/m/Y'),
                    'nasabah' => $t->nama_nasabah,
                    'nominal' => $t->nilai_realisasi,
                    'produk'  => $t->produk->nama_produk ?? '-'
                ];
            });

        return response()->json($history);
    }

    public function report()
    {
        return Inertia::render('Supervisor/Report', [
            "title" => "Laporan dan Evaluasi ",
        ]);
    }
}
