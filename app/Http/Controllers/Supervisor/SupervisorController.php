<?php

namespace App\Http\Controllers\Supervisor;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Http\Requests\TargetStoreUpdateRequest;
use App\Models\Akuisisi;
use App\Models\Produk;
use App\Models\Target;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SupervisorController extends Controller
{

    protected $user, $role;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth_sso();
            $this->role = $this->user->jabatan->nama_jabatan;
            return $next($request);
        });
    }


    public function verify() //for Supervisor
    {
        $subTitle = "";
        $params = request()->all(['search', 'byStatus']);
        $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Supervisor/Verifikasi/Index', [
            "title" => "Verifikasi Data Akuisisi Tim Saya",
            "subTitle"  => $subTitle,
            "canApprove" => $this->role === "Supervisor",
            "akuisisis" => Akuisisi::query()
                ->with(['pegawai:id,name', 'produk:id,nama_produk,kategori_produk', 'verifikator:id,name'])
                ->inSupervisorDivisi() // <--- 1. Filter Divisi Supervisor
                ->latest()             // <--- 2. Ambil data terbaru (ORDER BY created_at DESC)
                ->filter($params)      // <--- 3. Filter Search/Status (bawaan kamu)
                ->paginate(10)
                ->withQueryString(),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byStatus"   => $params['byStatus'] ?? "Semua Kategori",
            ],
            "filtersList"   => [
                "status"   => ['pending', 'verified', 'rejected'],
            ],
        ]);
    }

    // SupervisorController.php (Method Verify)

    public function approve(Akuisisi $akuisisi)
    {
        // 1. Update status di tabel akuisisi (Operational)
        $akuisisi->update([
            'status_verifikasi' => 'verified',
            'verifikator_id' => $this->user->id(),
            'verified_at' => now()
        ]);

        // 2. Catat ke Ledger Poin (Transactional)
        // Hitung poin berdasarkan logika bisnis lu (misal 0.1% dari nominal)
        $poin = $this->calculatePoint($akuisisi);

        Transaksi::create([
            'akuisisi_id' => $akuisisi->id,
            'user_id' => $akuisisi->user_id, // Copy biar query leaderboard cepet
            'nilai_realisasi' => $akuisisi->nominal_realisasi,
            'poin_didapat' => $poin,
            'tanggal_realisasi' => $akuisisi->tanggal_akuisisi, // Copy tanggal bisnisnya
        ]);
    }

    public function reject(Request $request, Akuisisi $akuisisi)
    {
        // 1. Validasi: Catatan revisi WAJIB diisi jika menolak
        $request->validate([
            'catatan_revisi' => 'required|string|min:5|max:255',
        ], [
            'catatan_revisi.required' => 'Alasan penolakan wajib diisi agar pegawai tahu apa yang perlu diperbaiki.',
            'catatan_revisi.min' => 'Alasan penolakan terlalu singkat.',
        ]);

        // 2. Update Data Akuisisi
        $akuisisi->update([
            'status_verifikasi' => 'rejected',
            'catatan_revisi'    => $request->catatan_revisi, // Simpan input dari Modal
            'verifikator_id'    => $this->user->id(), // ID Supervisor yang login
            'verified_at'       => now(), // Waktu penolakan
        ]);

        // 3. Kembali dengan pesan sukses
        return Redirect::back()->with('success', 'Pengajuan berhasil ditolak dan dikembalikan ke pegawai.');
    }




    public function team()
    {
        // 1. Ambil data Supervisor yang sedang login
        $user = $this->user;
        $divisiId = $user->divisi_id;

        // 2. Query Anggota Tim
        $teamMembers = User::where('divisi_id', $divisiId)
            ->where('id', '!=', $user->id) // Kecualikan Supervisor itu sendiri
            ->with(['transaksi', 'target']) // Load relasi: Transaksi (hasMany) & Target (hasOne)
            ->get()
            ->map(function ($member) {
                // --- LOGIKA FIX NULL ERROR ---

                // Cek apakah user punya target?
                // Jika $member->target ada (Object), ambil properti 'nilai_target'.
                // Jika null, set nilai jadi 0.
                $totalTarget = $member->target ? $member->target->nilai_target : 0;

                // Hitung total realisasi (Transaksi sah)
                $totalRealisasi = $member->transaksi->sum('nilai_realisasi');

                // Hitung Persentase (Cegah pembagian dengan nol / Division by Zero)
                $persentase = $totalTarget > 0
                    ? ($totalRealisasi / $totalTarget) * 100
                    : 0;

                // Tentukan Status (Bisa dipisah jadi fungsi helper jika mau)
                $status = match (true) {
                    $persentase >= 100 => 'Excellent',
                    $persentase >= 80  => 'Good',
                    default            => 'Warning'
                };

                return [
                    'id' => $member->id,
                    'name' => $member->name,
                    // 'avatar' => $member->avatar, // Aktifkan jika ada kolom avatar
                    'total_target' => $totalTarget,
                    'total_realisasi' => $totalRealisasi,
                    'persentase' => round($persentase, 1), // Bulatkan 1 desimal
                    'status' => $status,
                ];
            })
            ->sortByDesc('total_realisasi') // Urutkan: Capaian tertinggi di atas (Ranking 1)
            ->values(); // Reset index array agar rapi (0, 1, 2...)

        // 3. Hitung Statistik Agregat untuk Card di Dashboard Atas
        $teamStats = [
            'total_member' => $teamMembers->count(),
            'total_target_tim' => $teamMembers->sum('total_target'),
            'total_realisasi_tim' => $teamMembers->sum('total_realisasi'),
            'rata_rata_capaian' => round($teamMembers->avg('persentase'), 1),
        ];

        // 4. Kirim ke Frontend (Inertia)
        return Inertia::render('Supervisor/Team', [
            "title" => "Monitoring Performa Tim",
            "teamMembers" => $teamMembers,
            "teamStats" => $teamStats
        ]);
    }

    // 2. Method Baru (Khusus API ambil detail transaksi)
    // Tambahkan ini di SupervisorController
    public function memberTransactions(User $user)
    {
        // Pastikan Supervisor cuma bisa intip timnya sendiri (Security)
        if ($user->divisi_id !== $this->user->divisi_id) {
            abort(403);
        }

        $history = $user->transaksi()
            ->with('produk') // Load nama produk
            ->where('status_verifikasi', 'verified')
            ->latest()
            ->take(10) // Ambil 10 terakhir
            ->get()
            ->map(function ($t) {
                return [
                    'tanggal' => $t->created_at->format('d/m/Y'),
                    'nasabah' => $t->nama_nasabah,
                    'nominal' => $t->nilai_realisasi,
                    'produk'  => $t->produk->nama_produk ?? '-'
                ];
            });

        return response()->json($history);
    }

    public function report(Request $request)
    {
        // 1. OPSI FILTER
        // Format array simple untuk dropdown
        $yearsList = collect(range(date('Y'), date('Y') - 4))->map(fn($y) => (string)$y)->toArray();

        // Format array object untuk dropdown (Value & Label)
        // Note: FilterSearchCustom Anda merender option.label jika object, atau option itu sendiri jika string.
        // Jadi kita buat array simple string untuk bulan agar aman, atau sesuaikan komponen.
        // Agar aman dengan komponen Anda yang sekarang, kita pakai string value saja dulu untuk bulan (angka 1-12)
        // Atau kita kirim array of strings: "Januari", "Februari" lalu di backend convert balik.
        // TAPI, lebih baik kita kirim array of objects {value, label} dan sesuaikan komponen sedikit.

        // SEMENTARA: Kita pakai array string "1" sampai "12" agar tidak error "Object not valid as child"
        // Nanti di frontend kita mapping labelnya.
        $monthsList = collect(range(1, 12))->map(fn($m) => (string)$m)->toArray();

        $kategoriList = Produk::select('kategori_produk')
            ->distinct()
            ->pluck('kategori_produk')
            ->toArray();

        // ... (Bagian Filter options sama) ...
        $filtersReq = $request->all();

        // Query Data
        $rawData = Akuisisi::query()
            ->with(['pegawai:id,name,nip', 'produk:id,nama_produk,kategori_produk'])
            ->where('status_verifikasi', 'verified')
            ->when($request->year, fn($q) => $q->whereYear('tanggal_akuisisi', $request->year))
            ->when($request->month, fn($q) => $q->whereMonth('tanggal_akuisisi', $request->month))
            // Filter byKategori dihapus dari query utama, karena kita mau tampilkan SEMUA kategori yang ada
            // Kecuali user spesifik minta 1 kategori aja.
            ->when($request->byKategori, fn($q) => $q->whereHas('produk', fn($p) => $p->where('kategori_produk', $request->byKategori)))
            ->when($request->search, function ($q, $search) {
                $q->where(function ($sub) use ($search) {
                    $sub->where('nama_nasabah', 'like', "%{$search}%")
                        ->orWhereHas('pegawai', fn($p) => $p->where('name', 'like', "%{$search}%")->orWhere('nip', 'like', "%{$search}%"));
                });
            })
            ->orderByDesc('tanggal_akuisisi')
            ->get(); // Gunakan GET, bukan paginate

        // Grouping Data by Kategori
        $groupedReports = $rawData->groupBy(function ($item) {
            return $item->produk->kategori_produk; // Group by 'PRODUK FUNDING', 'PRODUK KREDIT', dll
        })->map(function ($items, $kategori) {
            return [
                'kategori' => $kategori,
                'data' => $items->map(function ($item) {
                    return [
                        'id'                => $item->id,
                        'timestamp'         => $item->created_at->format('d/m/Y H:i'),
                        'nama_pegawai'      => $item->pegawai->name,
                        'nip_pegawai'       => $item->pegawai->nip,
                        'produk'            => $item->produk->nama_produk,
                        'kategori'          => $item->produk->kategori_produk,
                        'tanggal_akuisisi'  => \Carbon\Carbon::parse($item->tanggal_akuisisi)->format('d-M-Y'),
                        'bukti_url'         => $item->lampiran_bukti ? asset('storage/' . $item->lampiran_bukti) : null,
                        'no_rekening'       => $item->no_identitas_nasabah, // Value asli
                        'nama_nasabah'      => $item->nama_nasabah,
                        'nominal'           => $item->nominal_realisasi, // Perlu kirim nominal juga
                    ];
                })
            ];
        })->values(); // Reset keys jadi array index 0,1,2...

        return Inertia::render('Supervisor/Report', [
            "title"       => "Laporan Sah",
            "subTitle"    => "Detail Transaksi Tervalidasi Per Kategori",
            "groupedReports" => $groupedReports, // Kirim data yang sudah digroup
            "filtersReq"  => $filtersReq,
            "filtersList" => [
                "year"     => $yearsList,
                "month"    => $monthsList,
                "kategori" => $kategoriList,
            ],
        ]);
    }
}
