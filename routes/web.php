<?php

use App\Http\Controllers\CetakDokumenController;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::get('/dashboard', [ProfileController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');


// Cetak Dokumen
Route::middleware('auth')->prefix('/cetak_dokumen')->name('cetak_dokumen.')->group(function () {
    Route::get('/pegawai', [CetakDokumenController::class, 'index'])->name('index');
    Route::get('/show/{pegawai:id}', [CetakDokumenController::class, 'show'])->name('show');
    Route::get('/create/{pegawai:id}', [CetakDokumenController::class, 'create'])->name('create');
    Route::post('/cetak', [CetakDokumenController::class, 'cetak'])->name('cetak');
    Route::get('/view-pak', [CetakDokumenController::class, 'view_pak'])->name('view-pak');
});


// Tes
Route::get('/test-pdf', [CetakDokumenController::class, 'test_pdf']);

Route::get('/tessss', function () {
    return Inertia::render('Test');
});

// `Kelola Data
Route::resource('pegawai', PegawaiController::class)->middleware('auth');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
