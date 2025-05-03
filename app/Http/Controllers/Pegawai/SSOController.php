<?php

namespace App\Http\Controllers\Pegawai;

use App\Http\Controllers\Controller;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class SSOController extends Controller
{
    public function showLoginForm()
    {
        return inertia('Auth/LoginPegawai');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('nip', 'password');

        // Simulasi login SSO (diganti sesuai sistemmu)
        $validSSO = $this->checkWithSSO($credentials['nip'], $credentials['password']);

        if (!$validSSO) {
            return back()->withErrors(['login' => 'NIP atau Password SSO salah.']);
        }

        // Cek apakah pegawai ada di DB internal
        $pegawai = Pegawai::where('NIP', $credentials['nip'])->first();

        if (!$pegawai) {
            return back()->withErrors(['login' => 'Data pegawai belum terdaftar. Hubungi SDM.']);
        }

        // Jika berhasil, simpan data di session manual (atau buat user sementara)
        Auth::loginUsingId($pegawai->id); // atau gunakan session custom
        Session::put('pegawai_logged_in', true);
        Session::put('nip', $pegawai->NIP);

        return redirect()->route('pegawai.dashboard');
    }

    private function checkWithSSO($nip, $password)
    {
        // Simulasi validasi ke server SSO
        return $nip === '200002122022012003' && $password === 'tanpaair21';
        // Ganti dengan request ke API SSO asli
    }
}
