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

            // Role Divisi SDM
            if ($user->role === 'Divisi SDM') {
                if ($request->is('/') || $request->is('login')) {
                    return redirect()->route('dashboard');
                }
                return $next($request);
            }

            // Role pimpinan
            if ($user->role === 'Pimpinan') {
                if ($request->is('/') || $request->is('login')) {
                    return redirect()->route('dashboard');
                }
                return $next($request);
            }

            // TODO : Aku ingin ditambahkan logic untuk login via sso
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
        return redirect('/login');
    }



}
