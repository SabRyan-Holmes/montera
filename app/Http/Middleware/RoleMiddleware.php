<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // 1. Cek apakah user sudah login
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // 2. Ambil nama jabatan dari relasi (Lazy Loading)
        $userRole = Auth::user()->jabatan->nama_jabatan;

        // 3. Cek apakah nama jabatan user ada dalam daftar role yang diizinkan di route
        // Kita gunakan ...$roles agar bisa menerima banyak role sekaligus (contoh: role:Admin,Supervisor)
        if (in_array($userRole, $roles)) {
            return $next($request);
        }

        // 4. Jika tidak punya akses, lempar ke halaman 403 atau dashboard
        abort(403, 'Anda tidak memiliki hak akses untuk halaman ini.');
    }
}
