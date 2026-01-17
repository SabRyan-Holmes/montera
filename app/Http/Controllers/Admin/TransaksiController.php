<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\Produk;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TransaksiController extends Controller
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

        return Inertia::render('Administrator/Transaksi/Index', [
            "title" => "Data Transaksi",
            "subTitle"  => $subTitle,
            "canManage" => $this->user->role('Administrator'),
            "transaksis"    => Transaksi::with(['pegawai:id,name,nip', 'produk:id,nama_produk,kode_produk,kategori_produk',  'akuisisi:id,nama_nasabah,no_identitas_nasabah'])
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Transaksi/Create', [
            'title' => "Tambah Data Transaksi",
            "filtersList"   => [
                "kategori" => Transaksi::getEnumValues('kategori'),
                "status"   => Transaksi::getEnumValues('status'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validated();
        Transaksi::create($validated);
        return Redirect::route('admin.transaksi.index')->with('message', 'Data Transaksi Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaksi $transaksi) //Unused
    {
        return Inertia::render('Admin/Transaksi/Show', [
            'title' => 'Detail Data Transaksi',
            'transaksi' => $transaksi
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaksi $transaksi)
    {
        return Inertia::render('Admin/Transaksi/Edit', [
            'title' => "Edit Data Transaksi",
            'transaksi' => $transaksi,
            "filtersList"   => [
                "kategori" => Transaksi::getEnumValues('kategori'),
                "status"   => Transaksi::getEnumValues('status'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaksi $transaksi)
    {
        $validated = $request->validated();
        $transaksi->update($validated); // update data
        $pegawaiOld = $transaksi->toArray(); // ambil data lama sebelum update
        // app(LogPegawaiChangesService::class)->logChanges($pegawaiOld, $validated);

        return redirect()->back()->with('message', 'Data Transaksi Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaksi $transaksi)
    {
        $transaksi->delete();
        return redirect()->back()->with('message', 'Data Transaksi Berhasil DiHapus!');
    }
}
