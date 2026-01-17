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



    public function index(Request $request)
    {
        // ==========================================
        // KONDISI 1: JIKA USER ADALAH ADMINISTRATOR
        // ==========================================
        $componentPage = $this->isAdmin ? 'Administrator/Target/Index' : 'Supervisor/TargetTim/Index';

        if ($this->isAdmin) {
            $subTitle = "";
            $params = $request->only(['search', 'byTipe', 'byPeriode']);

            // Asumsi class GetSubtitle sudah diuse di atas
            // Jika error, pastikan namespace GetSubtitle benar
            $subTitle = GetSubtitle::getSubtitle(...$params);

            return Inertia::render($componentPage, [
                "title" => "Target Kinerja Pegawai",
                "subTitle"  => $subTitle,
                // Logic query dari function indexs() lama
                "targets" => Target::with(['produk:id,nama_produk,kategori_produk'])
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

            // ... inside else block ...
            $user = $this->user;

            // 1. FILTER PARAMS (Keep original variable names for safety)
            $viewMode = $request->input('view', 'semua');
            $search   = $request->input('search');
            $tahunFilter   = $request->input('tahun', date('Y'));
            $periodeFilter = $request->input('periode');

            $filters = [
                'search' => $search,
                'byTipe' => $request->input('byTipe'), // needed for filter scope? The original code didn't use byTipe in the else block filter scope, but the user's prompt *shows* byTipe in the scopeFilter. I should include it in the array passed to filter().
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
        // 1. Definisi Base Option dulu (Biar variabel $optionList terinisialisasi)
        $optionList = [
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
        ];

        // 2. Logic Admin vs Supervisor
        if ($this->isAdmin) {
            // === ADMIN ===
            // Pake scopeRole('Supervisor') sesuai kode lu
            $optionList['supervisor'] = User::role('Supervisor')
                ->get()
                ->map(fn($u) => [
                    'value' => $u->id,
                    // Opsional: tampilin jabatan buat mastiin
                    'label' => $u->name . ' (' . ($u->jabatan->nama_jabatan ?? '-') . ')'
                ]);

            // Admin bisa milih semua 'Pegawai'
            $optionList['pegawai'] = User::role('Pegawai') // Asumsi nama jabatannya 'Pegawai'
                ->get()
                ->map(fn($u) => [
                    'value' => $u->id,
                    'label' => $u->name . ' - ' . $u->nip
                ]);

        } else {
            // === SUPERVISOR ===
            // Supervisor cuma liat tim sendiri (pake scope myTeam yg lu punya)
            $optionList['pegawai'] = User::myTeam($this->user)
                ->get()
                ->map(fn($u) => [
                    'value' => $u->id,
                    'label' => $u->name . ' - ' . $u->nip
                ]);
        }

        return Inertia::render('Supervisor/TargetTim/CreateEdit', [
            "canManage" => $this->isAdmin,
            "title"     => "Buat Target Baru untuk Anggota Tim",
            "optionList" => $optionList,

            // Default Values
            "defaultValues" => [
                "user_id"       => $request->input('pegawai_id') ?? "",
                // Kalau admin -> Kosong (biar wajib pilih). Kalau SPV -> ID dia sendiri.
                "supervisor_id" => $this->isAdmin ? "" : $this->user->id,
                "produk_id"     => $request->input('produk_id') ?? "",
                "tahun"         => date('Y'),
                "tipe_target"   => 'nominal',
                "periode"       => 'bulanan',
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

        // [TAMBAHAN] Jika Admin, inject list semua user (calon supervisor)
        if ($this->isAdmin) {
            $optionList['supervisor'] = User::role('Supervisor')->get()->map(fn($u) => [
                'value' => $u->id,
                'label' => $u->name . ' (' . $u->jabatan->nama_jabatan . ')' // Opsional: Tampilkan jabatan
            ]);
        }

        return Inertia::render('Supervisor/TargetTim/CreateEdit', [ // Panggil component yg sama
            "canManage" => $this->isAdmin,
            "title"         => "Edit Target Anggota Tim",
            "optionList"    => $optionList,
            "target"        => $target, // Kirim data target existing
            "defaultValues" => [
                'supervisor_id' => $target ? $target->supervisor_id : ($this->isAdmin ? '' : $this->user->id)
            ]
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
