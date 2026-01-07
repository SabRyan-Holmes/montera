<?php

namespace App\Http\Controllers\Pegawai;

use App\Http\Controllers\Controller;
use App\Models\Target;
use Illuminate\Http\Request;
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

    public function target(Target $target)
    {

        $subTitle = "";
        $params = request()->all(['search', 'byKategori', 'byStatus']);
        // $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Pegawai/Target/Index', [
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

     public function report()
    {
        return Inertia::render('Pegawai/Report', [
            "title" => "Riwayat Laporan Saya",
        ]);
    }

    public function stats()
    {
        return Inertia::render('Pegawai/Stats', [
            "title" => "Statistik & Ranking Pencapaian Target Kinerja Saya",
        ]);
    }


}
