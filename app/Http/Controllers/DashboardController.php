<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use App\Exports\PegawaiExport;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DashboardController extends Controller
{
    public function dashboard()
    {

        // $accepted = Process::where('status', 'selesai')->count();
        $terampil = Pegawai::where('Jabatan/TMT', 'LIKE', '%Terampil%')
            ->count();

        $mahir = Pegawai::where('Jabatan/TMT', 'LIKE', '%Mahir%')
            ->count();

        $penyelia = Pegawai::where('Jabatan/TMT', 'LIKE', '%Penyelia%')
            ->count();

        $pertama = Pegawai::where('Jabatan/TMT', 'LIKE', '%Pertama%')
            ->count();

        $muda = Pegawai::where('Jabatan/TMT', 'LIKE', '%Muda%')
            ->count();

        $madya = Pegawai::where('Jabatan/TMT', 'LIKE', '%Madya%')
            ->count();

        $data = [
            'terampil' => $terampil,
            'mahir' => $mahir,
            'penyelia' => $penyelia,
            'pertama' => $pertama,
            'muda' => $muda,
            'madya' => $madya,
        ];

        $pegawaiFungsional = $terampil + $mahir + $penyelia + $pertama + $muda + $madya;
        $pakCount = Auth::user()->jumlah_dicetak;

        return Inertia::render('Dashboard', [
            'title' => 'Dashboard',
            'userCount' => User::all()->count(),
            'pegawaiCount' => Pegawai::all()->count(),
            'data' => $data,
            'pegawaiFungsional' => $pegawaiFungsional,
            'pakCount' => $pakCount
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
            $columns = DB::getSchemaBuilder()->getColumnListing('pegawais');
            fputcsv($handle, $columns);

            // Mengambil data dari tabel database
            $data = DB::table('pegawais')->get(); // Ganti dengan nama tabel Anda

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
}
