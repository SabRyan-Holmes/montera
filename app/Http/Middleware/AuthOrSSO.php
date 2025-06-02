<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthOrSSO
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Kalau user login biasa (Auth) dan role-nya Pimpinan atau SDM
        if (Auth::check()) {
            $role = Auth::user()->role;
            if (in_array($role, ['Divisi SDM', 'Pimpinan'])) {
                return $next($request);
            }
        }

        // 2. Kalau user login via SSO (session)
        if (session()->has('logged_in') && session('role') === 'Pegawai') {
            return $next($request);
        }

        // 3. Kalau tidak lolos dua-duanya
        return redirect()->route('login')->withErrors(['login' => 'Anda tidak punya akses ke dashboard.']);
    }
}
