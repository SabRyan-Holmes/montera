<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ?? (
                    session('logged_in') ? [
                        'id' => session('id'),
                        'name' => session('name'),
                        'nip' => session('nip'),
                        'role' => session('role'),
                        'sso' => true,
                    ] : null
                ),
            ],
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'toast'   => fn() => $request->session()->get('toast'),
                'toast_id' => fn() => $request->session()->get('toast_id'),
                // Logic: Jika ada message/toast tapi controller lupa kirim timestamp/id,
                // Middleware yang akan buatkan otomatis.
                'timestamp' => function () use ($request) {
                    // 1. Cek apakah Controller kirim manual? (misal 'toast_id' atau 'timestamp')
                    if ($request->session()->has('timestamp')) {
                        return $request->session()->get('timestamp');
                    }

                    // 2. Jika tidak manual, tapi ada Pesan/Toast, generate otomatis sekarang
                    if ($request->session()->get('message') || $request->session()->get('toast')) {
                        return microtime(true);
                    }

                    return null;
                }
            ],
            'csrf_token' => csrf_token(),
        ];
    }
}
