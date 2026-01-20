<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TransaksiRequest;
use App\Models\Akuisisi;
use App\Models\Produk;
use App\Models\Transaksi;
use App\Models\User;
use App\Services\PointCalculator;
use Carbon\Carbon;
use Illuminate\Support\Str;
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
            "canManage" => $this->user->isAdmin,
            "transaksis"    => Transaksi::with([
                'pegawai:id,name,nip',
                'produk:id,nama_produk,kode_produk,kategori_produk',
                'akuisisi:id,nama_nasabah,no_identitas_nasabah,nominal_realisasi,produk_id',
                'akuisisi.produk:id,kategori_produk'
            ])->filter($params)->latest()->paginate(10)->withQueryString(),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byKategori"     => $params['byKategori'] ?? "",
                "byStatus"     => $params['byStatus'] ?? "",
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
        // Data pendukung untuk dropdown di form
        $pegawais = User::role('Pegawai')->get()->map(fn($u) => ['value' => $u->id, 'label' => $u->name]);
        $produks = Produk::where('status', 'tersedia')->get()->map(fn($p) => ['value' => $p->id, 'label' => $p->nama_produk]);

        // Ambil data Akuisisi yang statusnya 'verified' untuk dijadikan referensi
        // AMBIL AKUISISI + HITUNG POIN OTOMATIS
        $akuisisis = Akuisisi::with(['pegawai.divisi', 'produk']) // Eager load biar kenceng
            ->where('status_verifikasi', 'verified')
            ->get()->map(function ($a) {
                $hitungPoin = PointCalculator::calculate($a->user, $a->produk);
                return [
                    'value' => $a->id,
                    'label' => $a->produk->kode_produk . ' - ' .  $a->pegawai->name . ' - ' . $a->no_transaksi . ' - ' . $a->nama_nasabah,
                    // Data pendukung buat Auto-Fill
                    'nominal' => $a->nominal_realisasi,
                    'produk_id' => $a->produk_id,
                    'user_id' => $a->user_id,
                    'tanggal' => $a->tanggal_akuisisi,

                    // INI POIN HASIL HITUNGAN BACKEND
                    'poin_otomatis' => $hitungPoin,
                    'satuan_label' => $this->getSatuanLabel($a->produk->kategori_produk) //manfaatin ini buat mengubah label satuan
                ];
            });

        return Inertia::render('Administrator/Transaksi/CreateEdit', [
            'title' => 'Tambah Transaksi Baru',
            'isEdit' => false,
            'filtersList' => [
                'pegawais' => $pegawais,
                'produks' => $produks,
                'akuisisis' => $akuisisis
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TransaksiRequest $request)
    {
        $validated = $request->validated();

        // Ambil data relasi lagi untuk memastikan perhitungan akurat
        $akuisisi = Akuisisi::with(['pegawai.divisi', 'produk'])->find($validated['akuisisi_id']);

        // TIMPA 'poin_didapat' DENGAN KALKULATOR BACKEND
        // Biar kalau user iseng ganti angka di frontend, tetep kena reset pakai rumus asli.
        $validated['poin_didapat'] = PointCalculator::calculate($akuisisi->user, $akuisisi->produk);

        Transaksi::create($validated);

        return redirect()->route('admin.transaksi.index')->with('message', 'Data Transaksi berhasil dibuat.');
    }
    /**
     * Display the specified resource.
     */
    public function show(Transaksi $transaksi) //Unused
    {
        return Inertia::render('Administrator/Transaksi/Show', [
            'title' => 'Detail Data Transaksi',
            'transaksi' => $transaksi
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaksi $transaksi)
    {
        $pegawais = User::role('Pegawai')->get()->map(fn($u) => ['value' => $u->id, 'label' => $u->name]);
        $produks = Produk::where('status', 'tersedia')->get()->map(fn($p) => ['value' => $p->id, 'label' => $p->nama_produk]);
        // AMBIL AKUISISI + HITUNG POIN OTOMATIS
        $akuisisis = Akuisisi::with(['pegawai.divisi', 'produk']) // Eager load biar kenceng
            ->where('status_verifikasi', 'verified')
            ->get()
            ->map(function ($a) {
                // Panggil Helper Calculator di sini
                $hitungPoin = PointCalculator::calculate($a->user, $a->produk);

                return [
                    'value' => $a->id,
                    'label' => $a->produk->kode_produk . ' - ' .  $a->pegawai->name . ' - ' . $a->no_transaksi . ' - ' . $a->nama_nasabah,

                    // Data pendukung buat Auto-Fill
                    'nominal' => $a->nominal_realisasi,
                    'produk_id' => $a->produk_id,
                    'user_id' => $a->user_id,
                    'tanggal' => $a->tanggal_akuisisi,

                    // INI POIN HASIL HITUNGAN BACKEND
                    'poin_otomatis' => $hitungPoin,
                    'satuan_label' => $this->getSatuanLabel($a->produk->kategori_produk)

                ];
            });

        return Inertia::render('Administrator/Transaksi/CreateEdit', [
            'title' => 'Edit Data Transaksi',
            'isEdit' => true,
            'transaksi' => $transaksi,
            'currentLabel' => $this->getSatuanLabel($transaksi->produk->kategori_produk),
            'filtersList' => [
                'pegawais' => $pegawais,
                'produks' => $produks,
                'akuisisis' => $akuisisis
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * Update the specified resource in storage.
     */
    public function update(TransaksiRequest $request, Transaksi $transaksi)
    {
        $validated = $request->validated();

        // 1. Ambil Data Akuisisi Terkait (Fresh dari DB)
        // Kita butuh object User dan Produk dari akuisisi yang dipilih untuk hitung poin
        $akuisisi = Akuisisi::with(['pegawai.divisi', 'produk'])
            ->find($validated['akuisisi_id']);

        // 2. HITUNG ULANG POIN (Server Side Calculation)
        // Walaupun di frontend sudah ada angka poin, kita timpa lagi biar aman & akurat
        // sesuai rumus terbaru.
        $validated['poin_didapat'] = PointCalculator::calculate($akuisisi->user, $akuisisi->produk);

        // 3. Update Data
        $transaksi->update($validated);

        return redirect()->route('admin.transaksi.index')
            ->with('message', 'Data transaksi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaksi $transaksi)
    {
        // Langsung hapus (Soft delete atau Hard delete tergantung model)
        $transaksi->delete();

        return redirect()->back()
            ->with('message', 'Data transaksi berhasil dihapus.');
    }

    public function generateNoTransaksi()
    {
        $today = Carbon::now()->format('Ymd');
        $prefix = "TRX-{$today}";

        // Cari yang terakhir dibuat hari ini
        $lastTransaction = Akuisisi::where('no_transaksi', 'like', "{$prefix}-%")
            ->orderBy('id', 'desc')
            ->first();

        $newNumber = 1;

        if ($lastTransaction) {
            // Kita pecah string-nya.
            // Format: TRX-20260121-0001-XYZ
            // Index:  0   1        2    3
            $parts = explode('-', $lastTransaction->no_transaksi);

            // Ambil bagian urutan (Index ke-2)
            if (isset($parts[2]) && is_numeric($parts[2])) {
                $newNumber = intval($parts[2]) + 1;
            }
        }

        // Format: 0001
        $sequence = sprintf("%04d", $newNumber);

        // Tambah 3 Huruf Acak di belakang (Anti Tabrakan)
        $randomSuffix = strtoupper(Str::random(3));

        // Hasil: TRX-20260121-0001-A7X
        $newNoTransaksi = "{$prefix}-{$sequence}-{$randomSuffix}";

        return response()->json(['no_transaksi' => $newNoTransaksi]);
    }

    private function getSatuanLabel($kategori)
    {
        $kategori = strtoupper($kategori);
        // Logic sama persis dengan Model Akuisisi
        if (str_contains($kategori, 'E-CHANEL') || str_contains($kategori, 'E-CHANNEL')) {
            return '(Unit/NoA)';
        }
        return '(Rp)';
    }
}
