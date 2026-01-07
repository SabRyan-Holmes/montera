<?php

namespace App\Http\Controllers\Pegawai;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\Produk;
use App\Models\Target;
use App\Models\Transaksi;
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

    public function target()
    {
        $subTitle = "";
        $params = request()->all(['search', 'byTipe', 'byPeriode']);
        $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Pegawai/Target/Index', [
            "title" => "Target Kinerja Pegawai",
            "subTitle"  => $subTitle,
            "targets" => Target::with(['indikator:id,nama_kpi,satuan', 'produk:id,nama_produk'])->paginate(10)
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

    public function report()
    {
        return Inertia::render('Pegawai/Report', [
            "title" => "Riwayat Laporan Saya",
        ]);
    }

    public function transaksi()
    {
        $subTitle = "";
        $params = request()->all(['search', 'byKategori', 'byStatus']);
        $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Pegawai/Transaksi/Index', [
            "title" => "Data Transaksi",
            "subTitle"  => $subTitle,
            "transaksis"    => $this->user->transaksi()->with(['pegawai:id,name,nip', 'produk:id,nama_produk,kode_produk', 'indikator:id,nama_kpi,satuan', 'akuisisi:id,nama_nasabah,no_identitas_nasabah'])
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
