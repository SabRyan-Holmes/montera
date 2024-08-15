<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

        return Inertia::render('Dashboard', [
            'title' => 'Dashboard',
            'userCount' => User::all()->count(),
            'pegawaiCount' => Pegawai::all()->count(),
            'data' => $data
        ]);
    }


}
