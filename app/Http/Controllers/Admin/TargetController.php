<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TargetStoreUpdateRequest;
use App\Models\Divisi;
use App\Models\Produk;
use App\Models\Target;
use App\Services\TargetServices;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TargetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $user, $isAdminOrKacab;
    protected $targetService;
    public function __construct(TargetServices $targetService)
    {
        $this->targetService = $targetService;
        $this->middleware(function ($request, $next) {
            $this->user = auth_sso();
            $this->isAdminOrKacab = $this->user->isAdmin || $this->user->hasRole('Kepala Cabang');
            return $next($request);
        });
    }

    public function index(Request $request)
    {
        $user = $this->user;
        $componentPage = $this->isAdminOrKacab ? 'Administrator/Target/Index' : 'Supervisor/TargetTim/Index';
        if ($this->isAdminOrKacab) {
            $serviceData = $this->targetService->getAdminData($request);
            return Inertia::render($componentPage, [
                "title"       => "Target Kerja Pegawai dan Divisi",
                "subTitle"    => $serviceData['subTitle'],
                "canManage"   => $user->isAdmin,
                "isAdmin"   => $user->isAdmin,
                "isAdminOrKacab" => $this->isAdminOrKacab,
                "targets"     => $serviceData['targets'],
                "filtersReq"  => $serviceData['filtersReq'],
                "filtersList" => $serviceData['filtersList']
            ]);
        } else {
            // SUPERVISOR
            $serviceData = $this->targetService->getSupervisorData($this->user, $request);
            return Inertia::render($componentPage, [
                "title"       => "Target Kerja Tim",
                "subTitle"    => $serviceData['subTitle'],
                "targets"     => $serviceData['data'],
                "viewMode"    => $serviceData['viewMode'],
                "filtersReq"  => $serviceData['filtersReq'],
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
        if ($this->isAdminOrKacab) {
            $optionList['supervisor'] = User::whereHas('jabatan', function ($q) {
                // Filter Jabatan: Supervisor ATAU Kepala Cabang
                $q->whereIn('nama_jabatan', ['Supervisor', 'Kepala Cabang']);
            })->get()
                ->map(fn($u) => [
                    'value' => $u->id,
                    'label' => $u->name . ' (' . ($u->jabatan->nama_jabatan ?? '-') . ')'
                ]);
            $optionList['pegawai'] = User::role('Pegawai')
                ->get()
                ->map(fn($u) => [
                    'value' => $u->id,
                    'label' => $u->name . ' - ' . $u->nip
                ]);
            $optionList['divisi'] = Divisi::all()
                ->map(fn($u) => [
                    'value' => $u->id,
                    'label' => $u->nama_divisi . ' - ' . $u->main_divisi
                ]);
        } else { //supervisor
            $optionList['pegawai'] = User::myTeam($this->user)
                ->get()
                ->map(fn($u) => [
                    'value' => $u->id,
                    'label' => $u->name . ' - ' . $u->nip
                ]);
        }
        return Inertia::render('Administrator/Target/CreateEdit', [
            "isAdmin" => $this->user->isAdmin,
            "isSPV" => $this->user->hasRole('Supervisor'),
            "isAdminOrKacab" => $this->isAdminOrKacab,
            "title"     => "Buat Data Target Baru",
            "optionList" => $optionList,
            "defaultValues" => [
                "user_id"       => $request->input('pegawai_id') ?? "",
                "supervisor_id" => $this->user->isAdmin ? "" : $this->user->id,
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
            ->route(
                $this->user->isAdmin ? 'admin.target.index'
                    : ($this->user->hasRole('Supervisor') ? 'spv.target-tim.index' : 'kacab.target.index')
            )->with('message', 'Target Baru Berhasil Ditambahkan!');
    }
    /**
     * Display the specified resource.
     */
    public function show(Target $target) {}
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Target $target)
    {
        $optionList = [
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
        ];
        if ($this->isAdminOrKacab) {
            $optionList['supervisor'] = User::whereHas('jabatan', function ($q) {
                // Filter Jabatan: Supervisor ATAU Kepala Cabang
                $q->whereIn('nama_jabatan', ['Supervisor', 'Kepala Cabang']);
            })->get()
                ->map(fn($u) => [
                    'value' => $u->id,
                    'label' => $u->name . ' (' . ($u->jabatan->nama_jabatan ?? '-') . ')'
                ]);
            $optionList['pegawai'] = User::role('Pegawai')
                ->get()
                ->map(fn($u) => [
                    'value' => $u->id,
                    'label' => $u->name . ' - ' . $u->nip
                ]);
            $optionList['divisi'] = Divisi::all()
                ->map(fn($u) => [
                    'value' => $u->id,
                    'label' => $u->nama_divisi . ' - ' . $u->main_divisi
                ]);
        }
        return Inertia::render('Administrator/Target/CreateEdit', [
            "isAdmin" => $this->user->isAdmin,
            "isSPV" => $this->user->hasRole('Supervisor'),
            "isAdminOrKacab" => $this->isAdminOrKacab,
            "title"         => "Edit Target Anggota Tim",
            "optionList"    => $optionList,
            "target"        => $target,
            "defaultValues" => [
                'supervisor_id' => $target ? $target->supervisor_id : ($this->user->isAdmin ? '' : $this->user->id)
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
            ->route(
                $this->user->isAdmin ? 'admin.target.index'
                    : ($this->user->hasRole('Supervisor') ? 'spv.target-tim.index' : 'kacab.target.index')
            )->with('message', 'Target Berhasil Diperbarui');
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
