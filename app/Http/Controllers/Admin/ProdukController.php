<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProdukRequest;
use Inertia\Inertia;
use App\Models\Produk;


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
                "kategori" => Produk::select('kategori_produk')
                    ->distinct()
                    ->pluck('kategori_produk')
                    ->toArray(),
                "status"   => ['tersedia', 'discontinued'],
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Administrator/Produk/CreateEdit', [
            'title' => "Tambah Data Produk",
            'filtersList' => [

                "kategori" => \App\Models\Produk::select('kategori_produk')
                    ->distinct()
                    ->orderBy('kategori_produk')
                    ->pluck('kategori_produk')
                    ->map(fn($k) => ['value' => $k, 'label' => $k])
                    ->values(),


                "status" => [
                    ['value' => 'tersedia', 'label' => 'Tersedia'],
                    ['value' => 'discontinued', 'label' => 'Discontinued (Tidak Aktif)'],
                ],
            ],

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProdukRequest $request)
    {
        Produk::create($request->validated());

        return redirect()
            ->route('admin.produk.index')
            ->with('message', 'Data Produk Berhasil Ditambahkan!');
    }





    /**
     * Display the specified resource.
     */

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Produk $produk)
    {
        return Inertia::render('Administrator/Produk/CreateEdit', [
            'title' => "Edit Data Produk",
            'produk' => $produk,
            'isEdit' => true,
            "filtersList"   => [
                "kategori" => Produk::select('kategori_produk')
                    ->distinct()
                    ->pluck('kategori_produk')
                    ->toArray(),
                "status"   => ['tersedia', 'discontinued'],
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProdukRequest $request, Produk $produk)
    {
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
        return redirect()->route('admin.produk.index')
            ->with('message', 'Data Produk berhasil dihapus.');
    }
}
