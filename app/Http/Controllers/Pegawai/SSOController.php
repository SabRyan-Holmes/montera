<?php

namespace App\Http\Controllers\Pegawai;

use App\Http\Controllers\Controller;
use App\Models\Pegawai;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SSOController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Shared/Auth/SSOLogin', [
            // 'canAddPegawai' => Route::has('pegawai.add-pegawai.request'),
            'status' => session('status'),
        ]);
    }

    public function login(Request $request)
    {
        $request->merge($request->json()->all()); // optional safeguard


        $request->validate([
            'username' => 'required',
            'password' => 'required',
            'nip' => 'required',
            'captcha' => '', // validasi token
        ]);

        // dd($request);
        // Verifikasi CAPTCHA
        // Log::info('Captcha token: ' . $request->captcha);
        // Log::info('Secret key: ' . env('RECAPTCHA_SECRET_KEY'));
        // $verify = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
        //     'secret' => env('RECAPTCHA_SECRET_KEY'), // dari dashboard Google
        //     'response' => $request->captcha,
        // ]);


        // if (!$verify->json('success')) {
        //     return back()->withErrors(['captcha' => 'Verifikasi CAPTCHA gagal. Silakan coba lagi.']);
        // }

        // Step 1: Login ke SSO (pakai username & password)
        // TODO: Finsihing Login by SSO Nanti!
        $token = $this->getSSOToken($request->username, $request->password);

        if (!$token) {
            return back()->withErrors(['username' => 'Username/password salah.']);
        }

        // NOTE: Untuk Simulasi
        // $token = Str::random(16);

        // Step 2: Ambil data pegawai berdasarkan NIP (nip_baru langsung)
        $pegawai = Pegawai::where('NIP', $request['nip'])->orWhere('NIP', 'like', '%' . $request['nip'] . '%')->first();
        // dd($pegawai);
        if (!$pegawai) {
            return back()->withErrors(['nip' => 'Data pegawai belum terdaftar di sistem. Hubungi Divisi Sumber Daya Manusia.']);
        }

        // Step 3: Simpan info penting di session (tanpa user)
        session([
            'id' => $pegawai['id'],
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
        $client = new \GuzzleHttp\Client([
            'verify' => false, // Boleh matikan kalau HTTPS bermasalah
            'headers' => [
                'User-Agent'    => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
                'Accept'        => 'application/json',
                'Content-Type'  => 'application/json',
                'Origin'        => 'https://bpsjambi.id',
                'Referer'       => 'https://bpsjambi.id/sso/public/index.php/auth/login',
            ],
            // Timeout opsional
            'timeout' => 10,
        ]);

        try {
            $response = $client->post('https://bpsjambi.id/sso/public/index.php/auth/login', [
                'json' => [
                    'username' => $username,
                    'password' => $password,
                ]
            ]);

            $statusCode = $response->getStatusCode();
            $body = $response->getBody()->getContents();

            Log::info('SSO Login Status: ' . $statusCode);
            Log::info('SSO Login Body: ' . $body);

            if ($statusCode === 200) {
                $data = json_decode($body, true);
                return $data['token'] ?? null;
            }

            return null;
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            Log::error('SSO ClientException: ' . $e->getMessage());
            Log::error('Response: ' . $e->getResponse()->getBody()->getContents());
            return null;
        } catch (\Exception $e) {
            Log::error('SSO Login Error: ' . $e->getMessage());
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
