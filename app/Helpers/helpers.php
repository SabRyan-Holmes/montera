<?php

use Illuminate\Support\Facades\Auth;

function auth_sso() {
    return Auth::user() ?? (object)[
        'nip' => session('nip'),
        'name' => session('name'),
        'role' => session('role'),
        'sso' => session('sso'),
    ];
}
