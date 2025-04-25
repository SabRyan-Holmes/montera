<?php

use App\Http\Controllers\CetakDokumenController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KoefisienController;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\PengajuanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RiwayatCetakController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login');
})->middleware('guest');

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/dashboard/export-csv', [DashboardController::class, 'exportCsv'])->name('export-csv');

// ? :
Route::get('/dashboard/export-excel', [DashboardController::class, 'exportExcel'])->name('export-excel');


// Cetak Dokumen
Route::middleware(['auth', 'divisi_sdm'])->prefix('/cetak_dokumen')->name('cetak_dokumen.')->group(function () {
    Route::get('/pegawai', [CetakDokumenController::class, 'index'])->name('index');
    // Route::get('/show/{pegawai:NIP}', [CetakDokumenController::class, 'show'])->name('show');
    Route::get('/create/{pegawai:NIP}', [CetakDokumenController::class, 'create'])->name('create');
    Route::post('/cetak', [CetakDokumenController::class, 'cetak'])->name('cetak');
    Route::get('/view-pak', [CetakDokumenController::class, 'view_pak'])->name('view-pak');

    // Riwayat Cetak
    Route::get('/show-history/{pegawai:NIP}', [RiwayatCetakController::class, 'show_history'])->name('show_history');
    Route::get('/show-history/show', [RiwayatCetakController::class, 'show'])->name('show');
    Route::get('/show-history/edit/{riwayat:id}', [RiwayatCetakController::class, 'edit'])->name('edit');
    Route::post('/show-history/update/{riwayat:id}', [RiwayatCetakController::class, 'update'])->name('update');
    Route::delete('/show-history/delete/{riwayat:id}', [RiwayatCetakController::class, 'destroy'])->name('destroy');
});

//Status Pengajuan
Route::resource('pengajuan', PengajuanController::class)->middleware(['auth', 'pimpinan_or_sdm']);

Route::middleware(['auth', 'divisi_sdm'])->group(function () {
    //Status Pengajuan
    // Route::resource('pengajuan', PengajuanController::class);
    // `Kelola Data Pegawai
    Route::resource('pegawai', PegawaiController::class);
    //Kelola Koefisien
    Route::resource('koefisien', KoefisienController::class);
});





// PIMPINAN
// Route::middleware(['auth', 'pimpinan', 'divisi_sdm'])->group(function () {
//     Route::resource('pengajuan', PengajuanController::class)->middleware('auth');
// });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Tes
// Route::get('/test-pdf', [CetakDokumenController::class, 'test_pdf']);

// Route::get('/tes', function () {
//     return Inertia::render('Test');
// });
require __DIR__ . '/auth.php';
