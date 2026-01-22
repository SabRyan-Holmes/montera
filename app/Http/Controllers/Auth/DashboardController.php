<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Exports\PegawaiExport;
use App\Http\Controllers\Controller;
use App\Services\DataServices;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DashboardController extends Controller
{
    protected $user, $dataService;

    // Inject DataServices ke Constructor
    public function __construct(DataServices $dataService)
    {
        $this->dataService = $dataService;
        $this->middleware(function ($request, $next) {
            $this->user = auth_sso(); // Asumsi auth_sso() adalah helper custom kamu
            return $next($request);
        });
    }

    public function dashboard()
    {
        // Inisialisasi role
        $role = $this->user->jabatan->nama_jabatan;
        $dataByRole = [];

        // Panggil function dari Service sesuai Role
        if ($role === "Administrator") {
            $dataByRole = $this->dataService->getDataAdmin();
        } else if ($role === "Pegawai") {
            $dataByRole = $this->dataService->getDataPegawai($this->user);
        } else if ($role === "Supervisor") {
            $dataByRole = $this->dataService->getDataSupervisor($this->user);
        } else if ($role === "Kepala Cabang") {
            $dataByRole = $this->dataService->getDataKepalaCabang();
        }

        return Inertia::render('Shared/Dashboard/AuthDashboard', [
            'title' => 'Dashboard',
            'dataByRole' => $dataByRole,
        ]);
    }

    // --- Fungsi Export & Lainnya tetap sama ---
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
            $columns = DB::getSchemaBuilder()->getColumnListing('jabatans');
            fputcsv($handle, $columns);
            $data = DB::table('jabatans')->get();
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
        // ... (kode lama)
    }

    public function main_log()
    {
        return redirect()->back();
    }
}
