<?php

namespace App\Http\Controllers\Pegawai;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\Akuisisi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AkuisisiController extends Controller
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
        $params = request()->all(['search', 'byStatus']);
        $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Administrator/Akuisisi/Index', [
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
    public function show(Akuisisi $akuisisi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Akuisisi $akuisisi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Akuisisi $akuisisi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Akuisisi $akuisisi)
    {
        //
    }
}
