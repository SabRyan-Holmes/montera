<?php

namespace App\Http\Middleware;

use App\Models\Pegawai;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */


    public function handle(Request $request, Closure $next): Response
    {

        if (Auth::check()) {

            $user = Auth::user();

            // Role divisi_sdm
            if ($user->role === 'divisi_sdm') {
                if ($request->is('/') || $request->is('login')) {
                    return redirect()->route('dashboard');
                }
                return $next($request);
            }

            // Role pimpinan
            if ($user->role === 'pimpinan') {
                if ($request->is('/') || $request->is('login')) {
                    return redirect()->route('dashboard');
                }
                return $next($request);
            }

            // Jalur login Pegawai via SSO (tanpa tabel User) nanti dibikin
            // Untuk role 'pegawai', pastikan data ada di tabel pegawai
            $pegawai = Pegawai::where('NIP', $user['nip'])->first();

            if (!$pegawai) {
                Auth::logout(); // logout paksa
                return redirect('/login')->withErrors([
                    // Jika tidak ditemukan, maka muncul peringatan
                    'login' => 'Data pegawai belum terdaftar di sistem. Hubungi Divisi Sumber Daya Manusia.',
                ]);
            }

            // Jika pegawai ditemukan, maka bisa lanjut ke sistem
            if ($request->is('/') || $request->is('login')) {
                return redirect()->route('dashboard');
            }

            return $next($request);
        }






        // Belum/Gagal login
        return redirect('/login');
    }

    // public function handle(Request $request, Closure $next): Response
    // {
    //     if (Auth::check()) {
    //         // Jika user sudah login dan mengakses / atau /login, redirect ke /dashboard
    //         if ($request->is('/') || $request->is('login')) {
    //             return redirect('/dashboard');
    //         }

    //         return $next($request);
    //     }

    //     // Jika tidak, arahkan mereka ke halaman login atau abaikan
    //     return redirect('/login');
    // }







    // tambahkan logika pengecekan Kredential SSO disini Auth::check || Kode Pengecekan SSO
    // if (Auth::check()) {

    //     $user = Auth::user();

    //     // Role divisi_sdm
    //     if ($user->role === 'divisi_sdm') {
    //         if ($request->is('/') || $request->is('login')) {
    //             return redirect()->route('dashboard');
    //         }
    //         return $next($request);
    //     }

    //     // Role pimpinan
    //     if ($user->role === 'pimpinan') {
    //         if ($request->is('/') || $request->is('login')) {
    //             return redirect()->route('pimpinan.dashboard');
    //         }
    //         return $next($request);
    //     }

    //     // Jalur login Pegawai via SSO (tanpa tabel User) nanti dibikin
    //     // Untuk role 'pegawai', pastikan data ada di tabel pegawai
    //     $pegawai = Pegawai::where('NIP', $user['nip'])->first();

    //     if (!$pegawai) {
    //         Auth::logout(); // logout paksa
    //         return redirect('/login')->withErrors([
    //             // Jika tidak ditemukan, maka muncul peringatan
    //             'login' => 'Data pegawai belum terdaftar di sistem. Hubungi Divisi Sumber Daya Manusia.',
    //         ]);
    //     }

    //     // Jika pegawai ditemukan, maka bisa lanjut ke sistem
    //     if ($request->is('/') || $request->is('login')) {
    //         return redirect()->route('pegawai.dashboard');
    //     }

    //     return $next($request);
    // }



    // public function handle(Request $request, Closure $next): Response
    // {

    // if (Auth::check()) {
    //     $user = Auth::user();

    //     // Jika mengakses root atau login
    //     if ($request->is('/') || $request->is('login')) {
    //         switch ($user->role) {
    //             case 'divisi_sdm':
    //                 return redirect()->route('divisi-sdm.dashboard');
    //             case 'pimpinan':
    //                 return redirect()->route('pimpinan.dashboard');
    //             case 'pegawai':
    //                 $pegawai = Pegawai::where('NIP', $user->nip)->first();
    //                 if (!$pegawai) {
    //                     Auth::logout();
    //                     return redirect('/login')->withErrors([
    //                         'login' => 'Data pegawai belum terdaftar di sistem.',
    //                     ]);
    //                 }
    //                 return redirect()->route('pegawai.dashboard');
    //             default:
    //                 Auth::logout();
    //                 return redirect('/login')->withErrors([
    //                     'login' => 'Role tidak dikenali.',
    //                 ]);
    //         }
    //     }

    //     return $next($request);
    // }

    // Belum/Gagal login
    //     return redirect('/login');
    // }

}
