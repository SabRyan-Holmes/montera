<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Http\Requests\TargetStoreUpdateRequest;
use App\Models\Produk;
use App\Models\Target;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TargetController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $user, $role, $isAdmin;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth_sso();
            $this->role = $this->user->jabatan->nama_jabatan;
            $this->isAdmin = $this->role === 'Administrator';
            return $next($request);
        });
    }

    // public function indexs()
    // {
    //     $subTitle = "";
    //     $params = request()->all(['search', 'byTipe', 'byPeriode']);
    //     $subTitle = GetSubtitle::getSubtitle(...$params);

    //     return Inertia::render('Administrator/Target/Index', [
    //         "title" => "Target Kinerja Pegawai",
    //         "subTitle"  => $subTitle,
    //         "targets" => Target::with(['produk:id,nama_produk'])->paginate(10)
    //             ->withQueryString(),
    //         "filtersReq"   => [
    //             "search"     => $params['search'] ?? "",
    //             "byTipe"     => $params['byTipe'] ?? "Semua Kategori",
    //             "byPeriode"     => $params['byPeriode'] ?? "Semua Kategori",
    //         ],
    //         "filtersList"   => [
    //             "tipe_target" => ['nominal', 'noa'],
    //             "periode"   => ['mingguan', 'bulanan', 'tahunan'],
    //         ],
    //     ]);
    // }

    public function index(Request $request)
    {
        // ==========================================
        // KONDISI 1: JIKA USER ADALAH ADMINISTRATOR
        // ==========================================
        if ($this->isAdmin) {
            $subTitle = "";
            $params = $request->only(['search', 'byTipe', 'byPeriode']);

            // Asumsi class GetSubtitle sudah diuse di atas
            // Jika error, pastikan namespace GetSubtitle benar
            $subTitle = \App\Helpers\GetSubtitle::getSubtitle(...$params);

            return Inertia::render('Administrator/Target/Index', [
                "title" => "Target Kinerja Pegawai",
                "subTitle"  => $subTitle,
                // Logic query dari function indexs() lama
                "targets" => Target::with(['produk:id,nama_produk'])
                    // Tambahkan scope filter jika diperlukan sesuai logic asli Anda
                    ->paginate(10)
                    ->withQueryString(),
                "filtersReq"   => [
                    "search"     => $params['search'] ?? "",
                    "byTipe"     => $params['byTipe'] ?? "Semua Kategori",
                    "byPeriode"  => $params['byPeriode'] ?? "Semua Kategori",
                ],
                "filtersList"   => [
                    "tipe_target" => ['nominal', 'noa'],
                    "periode"   => ['mingguan', 'bulanan', 'tahunan'],
                ],
            ]);
        }

        // ==========================================
        // KONDISI 2: JIKA USER ADALAH SUPERVISOR (Logic Lama)
        // ==========================================
        else {

            $user = $this->user;
            $componentPage = $this->isAdmin ? 'Administrator/Target/Index' : 'Supervisor/TargetTim/Index';
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

            return Inertia::render($componentPage, [
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
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('Supervisor/TargetTim/CreateEdit', [
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(TargetStoreUpdateRequest $request)
    {
        Target::create($request->validated());
        return redirect()
            ->route($this->isAdmin ? 'admin.target.index' : 'spv.target-tim.index')
            ->with('message', 'Target Baru Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Target $target)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Target $target)
    {
        // Reuse optionList yang sama dengan create
        $optionList = [
            "pegawai" => User::myTeam($this->user)->get()->map(fn($u) => [
                'value' => $u->id,
                'label' => $u->name . ' - ' . $u->nip
            ]),
            "produk" => \App\Models\Produk::all()->map(fn($p) => [
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
        ];

        return Inertia::render('Supervisor/TargetTim/CreateEdit', [ // Panggil component yg sama
            "title"         => "Edit Target Anggota Tim",
            "optionList"    => $optionList,
            "target"        => $target, // Kirim data target existing
            "defaultValues" => [] // Tidak perlu default values krn target ada
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TargetStoreUpdateRequest $request, Target $target)
    {
        $target->update($request->validated());
        return redirect()
            ->route($this->isAdmin ? 'admin.target.index' : 'spv.target-tim.index')
            ->with('message', 'Data Target Berhasil Diperbarui!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Target $target)
    {
        $target->delete();
        return redirect()->back()->with('message', 'Data Target Berhasil Dihapus!');
    }
}
