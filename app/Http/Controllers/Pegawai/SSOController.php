<?php

namespace App\Http\Controllers\Pegawai;

use App\Http\Controllers\Controller;
use App\Models\Pegawai;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SSOController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Auth/SSOLogin', [
            // 'canAddPegawai' => Route::has('pegawai.add-pegawai.request'),
            'status' => session('status'),
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
            'nip' => 'required', // ini NIP pegawai yang ingin diakses
        ]);

        // Step 1: Login ke SSO (pakai username & password)
        // TODO: Uncomment nanti!
        // $token = $this->getSSOToken($request->username, $request->password);

        // if (!$token) {
        //     return back()->withErrors(['username' => 'Username/password salah.']);
        // }

        // NOTE: Untuk Simulasi
        $token = Str::random(16);

        // Step 2: Ambil data pegawai berdasarkan NIP (nip_baru langsung)
        $pegawai = Pegawai::where('NIP', $request['nip'])->orWhere('NIP', 'like', '%' . $request['nip'] . '%')->first();
        // dd($pegawai);
        if (!$pegawai) {
            return back()->withErrors(['nip' => 'Data pegawai belum terdaftar di sistem. Hubungi Divisi Sumber Daya Manusia.']);
        }

        // Step 3: Simpan info penting di session (tanpa user)
        session([
            'nip' => $pegawai['NIP'], //Foreign
            'name' => $pegawai['Nama'],
            'role' => 'Pegawai',
            'token' => $token,
            'sso' => true,
            'logged_in' => true,
        ]);
        session()->regenerate();
        return redirect()->route('dashboard');
    }


    private function getSSOToken($username, $password)
    {
        try {
            $response = Http::post('https://bpsjambi.id/sso/api/auth/login', [
                'username' => $username,
                'password' => $password,
            ]);

            if ($response->successful()) {
                return $response->json()['token'];
            }

            return null;
        } catch (\Exception $e) {
            return null;
        }
    }

    private function getPegawaiByNipLama($token, $nipLama)
    {
        try {
            $response = Http::post('https://bpsjambi.id/sso/api/pegawai/by-niplama', [
                'token' => $token,
                'secret_key' => env('SSO_SECRET_KEY'), // simpan di .env
                'nip_lama' => $nipLama,
            ]);

            if ($response->successful()) {
                return $response->json()['data'];
            }

            return null;
        } catch (\Exception $e) {
            return null;
        }
    }
}
