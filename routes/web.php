<?php

use App\Http\Controllers\Auth\DashboardController;
use App\Http\Controllers\Shared\{ProfileController, GuestController};
use App\Http\Controllers\Pegawai\{PegawaiController};
use App\Http\Controllers\Supervisor\{SupervisorController};
use App\Http\Controllers\KepalaCabang\{KepalaCabangController};
use App\Http\Controllers\Admin\{UserController, AkuisisiController, TransaksiController, ProdukController,  TargetController, JabatanController, DivisiController};
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::middleware('guest')->group(function () {
    Route::get('/', [GuestController::class, 'index'])->name('welcome');
    Route::get('/login', function () {
        return Inertia::render('Shared/Auth/Login');
    })->name('login');
});

Route::get('/link-storage', function () {
    Artisan::call('storage:link');
    return 'Link storage berhasil dibuat!';
});


// <============================================================ All Actor ============================================================>

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    // --- SHARED (All Actor) ---
    Route::prefix('shared')->name('shared.')->group(function () {
        Route::get('/generate-transaction-number', [TransaksiController::class, 'generateNoTransaksi'])
            ->name('generate-tn');
        // Route::get('/dashboard/export-csv', [DashboardController::class, 'exportCsv'])->name('export-csv'); // Export Data
        // Route::get('/dashboard/export-excel', [DashboardController::class, 'exportExcel'])->name('export-excel');
    });

    // --- ADMIN (Data Master) ---
    Route::middleware('role:Administrator')->prefix('admin')->name('admin.')->group(function () {
        Route::resource('user', UserController::class);
        Route::resource('jabatan', JabatanController::class);
        Route::resource('divisi', DivisiController::class);
        Route::resource('produk', ProdukController::class);
        Route::resource('target', TargetController::class);
        Route::resource('akuisisi', AkuisisiController::class);
        Route::resource('transaksi', TransaksiController::class);
    });


    // --- PEGAWAI (Operasional) ---
    Route::middleware('role:Pegawai')->prefix('pegawai')->name('pegawai.')->group(function () {
        Route::get('/target', [PegawaiController::class, 'target'])->name('target'); // Monitoring Pribadi
        Route::resource('akuisisi', AkuisisiController::class)->only(['index', 'create', 'edit', 'store', 'update']);
        Route::get('/report', [PegawaiController::class, 'report'])->name('report'); // Monitoring Pribadi
        Route::get('/transaksi', [PegawaiController::class, 'transaksi'])->name('transaksi'); // Monitoring Pribadi
        Route::get('/stats', [PegawaiController::class, 'stats'])->name('stats'); // Monitoring Pribadi
    });

    // <============================================================ SUPERVISOR ============================================================>
    // Pengawasan Tim & Verifikasi Akuisisi
    Route::middleware('role:Supervisor')->prefix('spv')->name('spv.')->group(function () {
        Route::resource('produk', ProdukController::class)->only(['index', 'show']);
        Route::get('/verify-akuisisi', [SupervisorController::class, 'verify'])->name('verify'); // Monitoring Pribadi
        Route::patch('/verify/{akuisisi}/approve', [SupervisorController::class, 'approve'])->name('verify.approve');
        Route::patch('/verify/{akuisisi}/reject', [SupervisorController::class, 'reject'])->name('verify.reject');
        Route::resource('target-tim', TargetController::class)->parameters(['target-tim' => 'target']);;
        Route::get('/target-divisi', [SupervisorController::class, 'target_divisi'])->name('target-divisi');
        Route::get('/report', [SupervisorController::class, 'report'])->name('report');
        Route::get('/team', [SupervisorController::class, 'team'])->name('team'); // Monitoring Tim
        Route::get('/team/{user}/transactions', [SupervisorController::class, 'memberTransactions'])
            ->name('team.transactions');
    });

    // <============================================================ KEPALA CABANG ============================================================>
    // --- KEPALA CABANG (BI Dashboard & Keputusan Strategis) ---
    Route::middleware('role:Kepala Cabang')->prefix('kacab')->name('kacab.')->group(function () {
        // Semua fungsi BI (Ranking, Historis, Tren) digabung di DashboardController
        Route::resource('target', TargetController::class);
        Route::get('/monitoring/ringkasan', [KepalaCabangController::class, 'summary'])->name('summary');
        Route::get('/monitoring/realisasi', [KepalaCabangController::class, 'realisasi'])->name('realisasi');
        Route::get('/monitoring/divisi', [KepalaCabangController::class, 'divisi'])->name('divisi');
        Route::get('/evaluasi/ranking-pegawai', [KepalaCabangController::class, 'pegawai_rank'])->name('pegawai_rank');
        Route::get('/evaluasi/promosi-pegawai', [KepalaCabangController::class, 'pegawai_promotion'])->name('pegawai_promotion');
        Route::get('/report/final-report', [KepalaCabangController::class, 'final_report'])->name('final-report');
        Route::get('/report/export-data', [KepalaCabangController::class, 'export_data'])->name('export-data');
    });

    // Log Aktivitas(R)
    Route::get('/log-aktivitas', [DashboardController::class, 'main_log'])->name('main-log');

    // Panduan/Bantuan(R)
    Route::get('/help-and-guide', [DashboardController::class, 'help_and_guide'])->name('help-and-guide'); // Export Data Pegawai Ke csv

});

require __DIR__ . '/auth.php';
