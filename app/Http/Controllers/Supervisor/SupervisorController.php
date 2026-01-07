<?php

namespace App\Http\Controllers\Supervisor;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\Akuisisi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupervisorController extends Controller
{
     public function verify() //for Supervisor
    {
        $subTitle = "";
        $params = request()->all(['search', 'byStatus']);
        $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Supervisor/Verifikasi/Index', [
            "title" => "Verifikasi Data Akuisisi",
            "subTitle"  => $subTitle,
            "akuisisis"    => Akuisisi::with(['pegawai:id,name', 'produk:id,nama_produk', 'verifikator:id,name' ])->filter($params)->paginate(10)->withQueryString(),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byStatus"   => $params['byStatus'] ?? "Semua Kategori",
            ],
            "filtersList"   => [
                "status"   => ['pending', 'verified', 'rejected'],
            ],
        ]);
    }
}
