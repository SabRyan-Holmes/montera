<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProdukStoreUpdateRequest;
use Inertia\Inertia;
use App\Models\Produk;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\UpdatePegawaiRequest;
use App\Services\LogPegawaiChangesService;
use Illuminate\Support\Facades\Auth;


class ProdukController extends Controller
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
        $params = request()->all(['search', 'byKategori', 'byStatus']);
        $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Administrator/Produk/Index', [
            "title" => "Data Produk",
            "subTitle"  => $subTitle,
            "produks" => Produk::filter($params)->latest()->latest()->paginate(10)->withQueryString(),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byKategori" => $params['byKategori'] ?? "Semua Kategori",
                "byStatus"   => $params['byStatus'] ?? "Semua Kategori",
            ],
            "filtersList"   => [
                "kategori" => Produk::getEnumValues('kategori'),
                "status"   => Produk::getEnumValues('status'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Administrator/Produk/Create', [
            'title' => "Tambah Data Produk",
            "filtersList"   => [
                "kategori" => Produk::getEnumValues('kategori'),
                "status"   => Produk::getEnumValues('status'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProdukStoreUpdateRequest $request)
    {
        Produk::create($request->validated());

        return redirect()
            ->route('admin.produk.index')
            ->with('message', 'Data Produk Berhasil Ditambahkan!');
    }





    /**
     * Display the specified resource.
     */
    public function show(Produk $produk) //Unused
    {
        return Inertia::render('Administrator/Produk/Show', [
            'title' => 'Detail Data Produk',
            'produk' => $produk
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Produk $produk)
    {
        return Inertia::render('Administrator/Produk/Edit', [
            'title' => "Edit Data Produk",
            'produk' => $produk,
            "filtersList"   => [
                "kategori" => Produk::getEnumValues('kategori'),
                "status"   => Produk::getEnumValues('status'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProdukStoreUpdateRequest $request, Produk $produk)
    {
        // dd($request);
        $produk->update($request->validated());
        return redirect()
            ->route('admin.produk.index')
            ->with('message', 'Data Produk Berhasil Diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produk $produk)
    {
        $produk->delete();
        return redirect()->back()->with('message', 'Data Produk Berhasil DiHapus!');
    }
}
