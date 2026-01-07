<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\Akuisisi;
use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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

        $query = Akuisisi::with([
            'pegawai:id,name',
            'produk:id,nama_produk',
            'verifikator:id,name',
        ])->filter($params);

        $role = $this->user->jabatan->nama_jabatan;
        $isAdmin = $role === "Administrator";
        if (!$isAdmin) {
            $query->where('user_id', $this->user->id);
        }

        return Inertia::render('Administrator/Akuisisi/Index', [
            "title" => "Data Akuisisi",
            "subTitle"  => $subTitle,
            "canCreate" => in_array($role, ['Administrator', 'Pegawai']),
            "canManage" => $isAdmin,
            'akuisisis' => $query->paginate(10)->withQueryString(),
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
        return Inertia::render('Administrator/Akuisisi/Create', [
            'title' => 'Input Laporan Akuisisi',
            'filtersList' => [
                // Mengambil daftar produk untuk dipilih di dropdown
                'produks' => Produk::all()->map(fn($p) => [
                    'value' => $p->id,
                    'label' => $p->nama_produk
                ]),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'no_transaksi' => 'required|unique:akuisisis,no_transaksi',
            'produk_id' => 'required|exists:produks,id',
            'nama_nasabah' => 'required|string|max:255',
            'no_identitas_nasabah' => 'nullable|string|max:50',
            'nominal_realisasi' => 'required|numeric',
            'tanggal_akuisisi' => 'required|date',
            'lampiran_bukti' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        // Tambahkan user_id otomatis dari auth
        $validated['user_id'] = $this->user->id;
        $validated['status_verifikasi'] = 'pending';

        // Logika upload file jika ada
        if ($request->hasFile('lampiran_bukti')) {
            $validated['lampiran_bukti'] = $request->file('lampiran_bukti')->store('bukti_akuisisi');
        }

        Akuisisi::create($validated);

        return redirect()->route('pegawai.akuisisi.index')->with('success', 'Laporan berhasil dikirim!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Akuisisi $akuisisi) //Unused
    {
        return Inertia::render('Admin/Akuisisi/Show', [
            'title' => 'Detail Data Akuisisi',
            'akuisisi' => $akuisisi
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Akuisisi $akuisisi)
    {
        return Inertia::render('Admin/Akuisisi/Edit', [
            'title' => "Edit Data Akuisisi",
            'akuisisi' => $akuisisi,
            "filtersList"   => [
                "kategori" => Akuisisi::getEnumValues('kategori'),
                "status"   => Akuisisi::getEnumValues('status'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Akuisisi $akuisisi)
    {
        $validated = $request->validated();

        $pegawaiOld = $akuisisi->toArray(); // ambil data lama sebelum update

        $akuisisi->update($validated); // update data

        // app(LogPegawaiChangesService::class)->logChanges($pegawaiOld, $validated);

        return redirect()->back()->with('message', 'Data Akuisisi Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Akuisisi $akuisisi)
    {
        $akuisisi->delete();
        return redirect()->back()->with('message', 'Data Akuisisi Berhasil DiHapus!');
    }
}
