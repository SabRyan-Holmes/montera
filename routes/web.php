<?php

use App\Http\Controllers\Admin\{UserController, JabatanController, DivisiController};
use App\Http\Controllers\Auth\DashboardController;
use App\Http\Controllers\Shared\{ProdukController, IndikatorController, ProfileController};
use App\Http\Controllers\Pegawai\{AkuisisiController, StatsController};
use App\Http\Controllers\Supervisor\{VerifikasiController, TeamController};
use App\Http\Controllers\KepalaCabang\{TargetController};
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Route::get('/', function () {
//     return Inertia::render('Auth/Login');
// })->middleware('guest');

// Login SSO
Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Auth/Login');
    })->name('reguler-login.form');
});



// <============================================================ All Actor ============================================================>

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->middleware(['authOrSSO'])->name('dashboard');

Route::middleware('auth')->group(function () {

    // --- ADMIN (Data Master) ---
    Route::middleware('role:Administrator')->prefix('admin')->name('admin.')->group(function () {
        Route::resource('user', UserController::class);
        Route::resource('jabatan', JabatanController::class);
        Route::resource('divisi', DivisiController::class);
    });

    // --- SHARED (Admin & SPV) ---
    Route::middleware('role:Administrator,Supervisor')->prefix('master')->name('shared.')->group(function () {
        Route::resource('produk', ProdukController::class);
        Route::resource('indikator', IndikatorController::class);
        Route::get('/dashboard/export-csv', [DashboardController::class, 'exportCsv'])->name('export-csv'); // Export Data
        Route::get('/dashboard/export-excel', [DashboardController::class, 'exportExcel'])->name('export-excel');
    });

    // --- PEGAWAI (Operasional) ---
    Route::middleware('role:Pegawai')->prefix('me')->name('pegawai.')->group(function () {
        Route::get('/stats', [StatsController::class, 'index'])->name('stats'); // Monitoring Pribadi
        Route::resource('akuisisi', AkuisisiController::class);
    });

    // <============================================================ SUPERVISOR ============================================================>
    // Pengawasan Tim & Verifikasi Akuisisi
    Route::middleware('role:Supervisor')->prefix('spv')->name('spv.')->group(function () {
        Route::get('/team', [TeamController::class, 'index'])->name('team'); // Monitoring Tim
        Route::patch('/verify/{akuisisi}/approve', [VerifikasiController::class, 'approve'])->name('verify.approve');
        Route::patch('/verify/{akuisisi}/reject', [VerifikasiController::class, 'reject'])->name('verify.reject');
    });

    // <============================================================ KEPALA CABANG ============================================================>
    // --- KEPALA CABANG (BI Dashboard & Keputusan Strategis) ---
    Route::middleware('role:Kepala Cabang')->prefix('kacab')->name('kacab.')->group(function () {
        // Semua fungsi BI (Ranking, Historis, Tren) digabung di DashboardController
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/export-report', [DashboardController::class, 'export'])->name('export');
        Route::resource('target', TargetController::class);
    });

    // Log Aktivitas(R)
    Route::get('/log-aktivitas', [DashboardController::class, 'help_and_guide'])->name('main-log');

    // Panduan/Bantuan(R)
    Route::get('/help-and-guide', [DashboardController::class, 'help_and_guide'])->name('help-and-guide'); // Export Data Pegawai Ke csv

});

require __DIR__ . '/auth.php';


















    // ==============Proses PAK================

    // Produk(R, Accept, Reject)
    // Route::prefix('produk')->name('produk.')->group(function () {
    //     Route::get('/', [AdminController::class, 'index'])->name('index');
    // Route::post('approve/{pengusulanPAK}', [PengusulanPAKController::class, 'approve'])->name('approve');
    // Route::post('reset-validate/{pengusulanPAK}', [PengusulanPAKController::class, 'reset_validate'])->name('reset-validate');
    // Route::post('reject', [PengusulanPAKController::class, 'reject'])->name('reject');
    // });



    // Pengajuan PAK(CRUD, Revisi, RESEBMIT, Cancel) //NOTE!! Urutan jangan diubah, resource harus paling bawah
    // Route::get('/pengajuan/revisi', [PengajuanController::class, 'revisi'])->name('pengajuan.revisi');
    // Route::patch('/pengajuan/ajukan-ulang', [PengajuanController::class, 'ajukan_ulang'])->name('pengajuan.ajukan-ulang');
    // Route::resource('pengajuan', PengajuanController::class);


    // Arsip Dokumen(CRUD)
    // Route::resource('arsip-dokumen', ArsipDokumenController::class)->parameters(['arsip-dokumen' => 'arsipDokumen']);


    // ===============Data Master================

    // Kelola Riwayat PAK(CRUD)
    // routes/web.php
    // Route::get('/riwayat-pak/detail/{id}', [RiwayatPAKController::class, 'show_detail'])->name('riwayat-pak.show-detail');
    // Route::resource('riwayat-pak', RiwayatPAKController::class)
    //     ->parameters(['riwayat-pak' => 'riwayat'])->only(['index', 'show', 'edit', 'update', 'destroy']);
