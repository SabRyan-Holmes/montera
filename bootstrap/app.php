<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ])->alias([
            'auth' => \App\Http\Middleware\Authenticate::class,
            'authOrSSO' => \App\Http\Middleware\AuthOrSSO::class,
            'role' => \App\Http\Middleware\RoleMiddleware::class,
        ]);


        //
    })
    ->withExceptions(function (Exceptions $exceptions) {

    })// 👉 Tambahkan ini untuk menggunakan Console Kernel buatanmu
    // ->withConsoleKernel(\App\Console\Kernel::class)
    ->create();
