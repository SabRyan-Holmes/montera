<?php

namespace App\Http\Controllers\KepalaCabang;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\Target;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TargetController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $user;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth_sso();
            return $next($request);
        });
    }

    public function index()
    {
        $subTitle = "";
        $params = request()->all(['search', 'byTipe', 'byPeriode']);
        $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Administrator/Target/Index', [
            "title" => "Target Kinerja Pegawai",
            "subTitle"  => $subTitle,
            "targets" => Target::with(['indikator:id,nama_kpi', 'produk:id,nama_produk'])->paginate(10)
                ->withQueryString(),
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Target $target)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Target $target)
    {
        //
    }

    public function byPegawai(Target $target)
    {

        $subTitle = "";
        $params = request()->all(['search', 'byKategori', 'byStatus']);
        // $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('_Pegawai/Target/Index', [
            "title" => "Semua Target Kerja Saya",
            "subTitle"  => $subTitle,
            "targets" => $this->user->targets()->with(['indikator:id,nama_kpi', 'produk:id,nama_produk'])->paginate(10)
                ->withQueryString(),
            // "targets"    => Target::filter($params)->paginate(10)->withQueryString(),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
            ],
            // "filtersList"   => [
            //     "kategori" => Target::getEnumValues('kategori'),
            //     "status"   => Target::getEnumValues('status'),
            // ],
        ]);
    }
}
