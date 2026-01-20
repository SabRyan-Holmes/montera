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
use App\Services\PointCalculator;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SupervisorController extends Controller
{
    protected $user;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth_sso();
            return $next($request);
        });
    }
    public function verify()
    {
        $subTitle = "";
        $params = request()->all(['search', 'byStatus']);
        $subTitle = GetSubtitle::getSubtitle(...$params);
        return Inertia::render('Supervisor/Verifikasi/Index', [
            "title" => "Verifikasi Data Akuisisi Tim Saya",
            "subTitle"  => $subTitle,
            "canApprove" => $this->user->hasRole('Supervisor'),
            "akuisisis" => Akuisisi::query()
                ->with(['pegawai:id,name', 'produk:id,nama_produk,kategori_produk', 'verifikator:id,name', 'supervisor:id,name'])
                ->myTeamFromSPV($this->user)
                ->latest('updated_at')
                ->filter($params)
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
    public function approve(Akuisisi $akuisisi)
    {
        $akuisisi->update([
            'status_verifikasi' => 'verified',
            'verifikator_id' => $this->user->id,
            'verified_at' => now()
        ]);
        $poin = PointCalculator::calculate($akuisisi->pegawai, $akuisisi->produk);
        Transaksi::create([
            'akuisisi_id' => $akuisisi->id,
            'user_id' => $akuisisi->user_id,
            'produk_id' => $akuisisi->produk_id,
            'nilai_realisasi' => $akuisisi->nominal_realisasi,
            'poin_didapat' => $poin,
            'tanggal_realisasi' => $akuisisi->tanggal_akuisisi,
        ]);
        return redirect()->back()->with([
            'toast' => "Berhasil Divalidasi.",
            'toast_id' => uniqid(),
        ]);
    }

    public function reject(Request $request, Akuisisi $akuisisi)
    {
        $request->validate([
            'catatan_revisi' => 'required|string|min:5|max:255',
        ], [
            'catatan_revisi.required' => 'Alasan penolakan wajib diisi agar pegawai tahu apa yang perlu diperbaiki.',
            'catatan_revisi.min' => 'Alasan penolakan terlalu singkat.',
        ]);
        $akuisisi->update([
            'status_verifikasi' => 'rejected',
            'catatan_revisi'    => $request->catatan_revisi,
            'verifikator_id'    => $this->user->id,
            'verified_at'       => now(),
        ]);
        return Redirect::back()->with('message', 'Pengajuan berhasil ditolak dan dikembalikan ke pegawai.');
    }

    public function target_divisi(Request $request)
    {

        $user = $request->user(); // Atau $this->user jika pakai middleware constructor

        // 1. FILTER PARAMS
        // Hapus default 'Semua Kategori' agar saat awal load nilainya null (tampil semua)

        $filters = $request->only(['search', 'tahun', 'periode']);
        $subTitle = GetSubtitle::getSubtitle(
            search: $filters['search'] ?? null,
            byPeriode: $filters['periode'] ?? null, // 'periode' masuk ke '$byPeriode'
            byTahun: $filters['tahun'] ?? null      // 'tahun' masuk ke '$byTahun'
        );



        // 2. QUERY DATA
        // Menggunakan scopeToDivision (filter divisi user) dan scopeFilter (pencarian/tahun/periode)
        $data = Target::toDivision($user)
            ->with(['divisi:id,nama_divisi,main_divisi', 'produk:id,nama_produk,kategori_produk,satuan']) // Eager load relasi
            ->filter($filters)
            ->latest('updated_at')
            ->paginate(10)
            ->withQueryString(); // Pengganti ->appends($params) yg lebih modern di Laravel

        // 3. RETURN INERTIA
        return Inertia::render('Supervisor/TargetDivisi/Index', [
            "title"       => "Target Kerja Tim",
            "targets"     => $data,
            'subTitle' =>   $subTitle,
            "filtersReq"  => $filters,
            // List opsi dropdown untuk FilterSearchCustom
            "filtersList" => [
                "periode" => ['mingguan', 'bulanan', 'tahunan'],
                "tahun"   => Target::select('tahun')->distinct()->orderBy('tahun', 'desc')->pluck('tahun'),
            ],
        ]);
    }


    public function team(Request $request)
    {
        $user  = $this->user;
        $tahun = $request->input('tahun', date('Y'));

        // Panggil Scope User::myTeam yang baru dibuat
        $teamMembers = User::myTeam($user)
            ->where('id', '!=', $user->id) // Jangan masukan diri sendiri
            ->with(['targets' => function ($q) use ($user, $tahun) {
                $q->where('supervisor_id', $user->id)
                    ->where('tahun', $tahun);
            }])->with(['transaksi' => function ($q) use ($tahun) {
                $q->whereYear('created_at', $tahun);
            }])->get()->map(function ($member) {
                // Logic hitung-hitungan
                $totalTarget    = $member->targets->sum('nilai_target');
                $totalRealisasi = $member->transaksi ? $member->transaksi->sum('nilai_realisasi') : 0;

                // LOGIC BARU: MENGATASI TARGET 0 TAPI ADA REALISASI
                if ($totalTarget > 0) {
                    $persentase = ($totalRealisasi / $totalTarget) * 100;
                } else {
                    // Jika target 0, tapi ada realisasi, anggap 100% (Excellent/Bonus)
                    // Jika tidak ada realisasi, tetap 0%
                    $persentase = $totalRealisasi > 0 ? 100 : 0;
                }

                // LOGIC STATUS LEBIH FAIR
                $status = match (true) {
                    $persentase >= 100 => 'Excellent', // 100% ke atas
                    $persentase >= 80  => 'Good',      // 80% - 99%
                    $persentase > 0    => 'Progress',  // Ada hasil tapi belum target
                    default            => 'Warning'    // 0% alias belum kerja
                };

                return [
                    'id'              => $member->id,
                    'name'            => $member->name,
                    'jabatan'         => $member->jabatan->nama_jabatan ?? '-',
                    'total_target'    => $totalTarget,
                    'total_realisasi' => $totalRealisasi,
                    'persentase'      => round($persentase, 1),
                    'status'          => $status,
                    'ratio'           => $persentase // Helper buat sorting
                ];
            })
            ->sortByDesc('ratio') // Urutkan dari yang performanya paling bagus
            ->values(); // Reset index array

        // Statistik Tim (PERBAIKAN LOGIC RATA-RATA AGAR TIDAK MELEDAK)

        // Hitung total dulu biar clean
        $totalTargetTim    = $teamMembers->sum('total_target');
        $totalRealisasiTim = $teamMembers->sum('total_realisasi');

        // Gunakan Weighted Average (Rata-rata Terbobot)
        if ($totalTargetTim > 0) {
            $capaianTim = ($totalRealisasiTim / $totalTargetTim) * 100;
        } else {
            // Jika Target Tim 0, tapi ada Realisasi Tim -> Anggap 100% (Excellent)
            $capaianTim = $totalRealisasiTim > 0 ? 100 : 0;
        }

        $teamStats = [
            'total_member'        => $teamMembers->count(),
            'total_target_tim'    => $totalTargetTim,
            'total_realisasi_tim' => $totalRealisasiTim,
            // Gunakan hasil hitungan baru di atas, BUKAN avg('persentase')
            'rata_rata_capaian'   => round($capaianTim, 1),
        ];

        return Inertia::render('Supervisor/Team', [
            "title"       => "Monitoring Performa Tim",
            "teamMembers" => $teamMembers,
            "teamStats"   => $teamStats,
            "filtersReq"  => ['tahun' => $tahun]
        ]);
    }

    public function memberTransactions(User $user)
    {
        // 1. VALIDASI AKSES (Authorization)
        // Logic Baru: Cek apakah Saya (Supervisor) punya Target ke Pegawai ini?
        // Kita gunakan exists() agar query-nya ringan (return boolean)
        $isMyTeam = Target::where('user_id', $user->id)
            ->where('supervisor_id', $this->user->id)
            ->exists();

        // Jika dia bukan target saya, DAN dia bukan diri saya sendiri (opsional)
        if (!$isMyTeam && $user->id !== $this->user->id) {
            abort(403, 'Akses Ditolak: Pegawai ini tidak berada di bawah target supervisi Anda.');
        }

        // 2. QUERY DATA (History Akuisisi yang Sukses)
        // Sebaiknya query ke model 'Akuisisi' langsung agar field 'nama_nasabah' valid
        // (Karena tabel Transaksi biasanya tidak menyimpan nama nasabah, melainkan relasi ke akuisisi)
        $history = Akuisisi::where('user_id', $user->id)
            ->with('produk') // Eager load produk
            ->where('status_verifikasi', 'verified') // Hanya yang sudah cair
            ->latest('tanggal_akuisisi') // Urutkan berdasarkan tanggal realisasi bisnis
            ->take(10)
            ->get()
            ->map(function ($t) {
                return [
                    // Gunakan tanggal_akuisisi (bisnis), bukan created_at (input sistem)
                    'tanggal' => \Carbon\Carbon::parse($t->tanggal_akuisisi)->format('d/m/Y'),
                    'nasabah' => $t->nama_nasabah,
                    // Pastikan pakai kolom yang benar (nominal_realisasi)
                    'nominal' => $t->nominal_realisasi,
                    'produk'  => $t->produk->nama_produk ?? '-'
                ];
            });

        return response()->json($history);
    }

    public function report(Request $request)
    {
        $yearsList = collect(range(date('Y'), date('Y') - 4))->map(fn($y) => (string)$y)->toArray();
        $monthsList = collect(range(1, 12))->map(fn($m) => (string)$m)->toArray();
        $kategoriList = Produk::select('kategori_produk')
            ->distinct()
            ->pluck('kategori_produk')
            ->toArray();
        $filtersReq = $request->all();
        $rawData = Akuisisi::query()
            ->with(['pegawai:id,name,nip', 'produk:id,nama_produk,kategori_produk'])
            ->where('status_verifikasi', 'verified')
            ->when($request->year, fn($q) => $q->whereYear('tanggal_akuisisi', $request->year))
            ->when($request->month, fn($q) => $q->whereMonth('tanggal_akuisisi', $request->month))
            ->when($request->byKategori, fn($q) => $q->whereHas('produk', fn($p) => $p->where('kategori_produk', $request->byKategori)))
            ->when($request->search, function ($q, $search) {
                $q->where(function ($sub) use ($search) {
                    $sub->where('nama_nasabah', 'like', "%{$search}%")
                        ->orWhereHas('pegawai', fn($p) => $p->where('name', 'like', "%{$search}%")->orWhere('nip', 'like', "%{$search}%"));
                });
            })
            ->orderByDesc('tanggal_akuisisi')
            ->get();
        $groupedReports = $rawData->groupBy(function ($item) {
            return $item->produk->kategori_produk;
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
                        'tanggal_akuisisi'  => Carbon::parse($item->tanggal_akuisisi)->format('d-M-Y'),
                        // FIXME kemungkinana bug ada disni
                        'bukti_url'         => $item->lampiran_bukti ? asset('storage/' . $item->lampiran_bukti) : null,
                        'no_rekening'       => $item->no_identitas_nasabah,
                        'nama_nasabah'      => $item->nama_nasabah,
                        'nominal'           => $item->nominal_realisasi,
                    ];
                })
            ];
        })->values();
        return Inertia::render('Supervisor/Report', [
            "title"       => "Laporan Sah",
            "subTitle"    => "Detail Transaksi Tervalidasi Per Kategori",
            "groupedReports" => $groupedReports,
            "filtersReq"  => $filtersReq,
            "filtersList" => [
                "year"     => $yearsList,
                "month"    => $monthsList,
                "kategori" => $kategoriList,
            ],
        ]);
    }
}
