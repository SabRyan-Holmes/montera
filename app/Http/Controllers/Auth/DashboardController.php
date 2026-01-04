<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Exports\PegawaiExport;
use App\Http\Controllers\Controller;
use App\Models\Akuisisi;
use App\Models\Divisi;
use App\Models\Produk;
use App\Models\Target;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DashboardController extends Controller
{

    protected $user;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth_sso();
            return $next($request);
        });
    }

    public function dashboard()
    {
        // Inisialisasi role dan nip
        $nip = $this->user->nip;
        $namaJabatan = $this->user->jabatan->nama_jabatan;
        $isAtasan = in_array($namaJabatan, ["Administrator", "Kepala Cabang", "Supervisor"]);

        $dataByRole = null;
        $dataGraph = null;

        if ($isAtasan) {
            $dataByRole = [
                'produkCount' => Produk::count(),
                'akuisisiCount' => Akuisisi::count(),
                'userCount' => User::count(),
                'targetCount' => Target::count(),
                'divisiCount' => Divisi::count(),
                'produkGraph' => [
                    'Diusulkan' => Produk::where('kategori', 'diusulkan')->count(),
                    'Direvisi' => Produk::where('kategori', 'direvisi')->count(),
                    'Ditolak' => Produk::where('kategori', 'ditolak')->count(),
                ],
                'targetGraph' => [
                    'Diajukan' => Target::where('nilai_target', 'diajukan')->count(),
                    'Direvisi' => Target::where('nilai_target', 'direvisi')->count(),
                    'Ditolak' => Target::where('nilai_target', 'ditolak')->count(),
                ],
            ];
        } else {
            // TODO: data untuk role lain
            $dataByRole = [];
            // $dataByRole = [
            //     'produkCount' => Produk::where('created_by', $nip)->count(),
            //     'akuisisiCount' => Akuisisi::where('created_by', $nip)->count(),
            //     'userCount' => User::where('nip', $nip)->count(),
            //     'targetCount' => Target::where('created_by', $nip)->count(),
            // ];
        }

        return Inertia::render('_Shared/Dashboard/AuthDashboard', [
            'title' => 'Dashboard',
            'dataGraph' => $dataGraph,
            'dataByRole' => $dataByRole,
            'isAtasan' => $isAtasan,
        ]);
    }

    public function exportCsv(): StreamedResponse
    {
        $filename = 'Data_Pegawai.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        return new StreamedResponse(function () {
            $handle = fopen('php://output', 'w');

            // Mendapatkan nama kolom dari tabel database
            $columns = DB::getSchemaBuilder()->getColumnListing('jabatans');
            fputcsv($handle, $columns);

            // Mengambil data dari tabel database
            $data = DB::table('jabatans')->get(); // Ganti dengan nama tabel Anda

            // Menulis data ke dalam file CSV
            foreach ($data as $row) {
                fputcsv($handle, (array) $row);
            }

            fclose($handle);
        }, 200, $headers);
    }

    public function exportExcel()
    {
        return Excel::download(new PegawaiExport, 'Data_Pegawai.xlsx');
    }

    public function help_and_guide()
    {
        $filePath = public_path('storage/PANDUAN_SIPACAK.pdf');

        if (!file_exists($filePath)) {
            abort(404, 'File tidak ditemukan');
        }

        return redirect('/storage/PANDUAN_SIPACAK.pdf');
    }
}
