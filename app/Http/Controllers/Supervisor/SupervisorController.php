<?php

namespace App\Http\Controllers\Supervisor;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\Akuisisi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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


    public function verify() //for Supervisor
    {
        $subTitle = "";
        $params = request()->all(['search', 'byStatus']);
        $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Supervisor/Verifikasi/Index', [
            "title" => "Verifikasi Data Akuisisi",
            "subTitle"  => $subTitle,
            "akuisisis"    => Akuisisi::with(['pegawai:id,name', 'produk:id,nama_produk', 'verifikator:id,name'])->filter($params)->paginate(10)->withQueryString(),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byStatus"   => $params['byStatus'] ?? "Semua Kategori",
            ],
            "filtersList"   => [
                "status"   => ['pending', 'verified', 'rejected'],
            ],
        ]);
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

    public function report()
    {
        return Inertia::render('Supervisor/Report', [
            "title" => "Laporan dan Evaluasi ",
        ]);
    }
}
