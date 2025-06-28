<?php

use App\Http\Controllers\Shared\ArsipDokumenController;
use App\Http\Controllers\Auth\DashboardController;
use App\Http\Controllers\DivisiSDM\AturanPAKController;
use App\Http\Controllers\Pegawai\SSOController;
use App\Http\Controllers\Shared\PengusulanPAKController;
use App\Http\Controllers\Shared\DokumenPAKController;
use App\Http\Controllers\Shared\LogAktivitasController;
use App\Http\Controllers\Shared\PegawaiController;
use App\Http\Controllers\Shared\PengajuanController;
use App\Http\Controllers\Shared\ProfileController;
use App\Http\Controllers\Shared\RiwayatKarirController;
use App\Http\Controllers\Shared\RiwayatPAKController;
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
    Route::get('/sso-login', [SSOController::class, 'showLoginForm'])->name('sso-login.form');
    Route::post('/sso-login', [SSOController::class, 'login'])->name('sso-login');
});

// GetData
Route::middleware(['authOrSSO'])->group(function () {
    Route::get('/pengusulan-pak/show/{id}', [PengusulanPAKController::class, 'show'])->name('pengusulan-pak.show');
    Route::get('/pengajuan/show/{id}', [PengajuanController::class, 'show'])->name('pengajuan.show');
});

// <============================================================ All Actor ============================================================>

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->middleware(['authOrSSO'])->name('dashboard');

// Preview PAK PDF
Route::middleware(['authOrSSO'])->prefix('/pak')->name('pak.')->group(function () {
    Route::post('/process', [DokumenPAKController::class, 'process'])->name('process');
    Route::get('/preview', [DokumenPAKController::class, 'preview'])->name('preview');
});



// <============================================================ Divisi SDM ============================================================>

Route::middleware(['authOrSSO', 'Divisi SDM'])->prefix('/divisi-sdm')->name('divisi-sdm.')->group(function () {
    // Dashboard(=> Export Data Pegawai Ke csv)
    Route::get('/dashboard/export-csv', [DashboardController::class, 'exportCsv'])->name('export-csv'); // Export Data Pegawai Ke csv
    Route::get('/dashboard/export-excel', [DashboardController::class, 'exportExcel'])->name('export-excel');

    // ==============Proses PAK================

    // Pengusulan PAK(R, Accept, Reject)
    Route::get('pengusulan-pak/', [PengusulanPAKController::class, 'index'])->name('pengusulan-pak.index');
    Route::post('pengusulan-pak/approve/{pengusulanPAK}', [PengusulanPAKController::class, 'approve'])->name('pengusulan-pak.approve');
    Route::post('pengusulan-pak/reject', [PengusulanPAKController::class, 'reject'])->name('pengusulan-pak.reject');
    Route::post('pengusulan-pak/undo-validate', [PengusulanPAKController::class, 'undo_validate'])->name('pengusulan-pak.undo-validate');

    // Penetapan Angka Kredit(CRUD, Submit) => Pemrosesan, Penghitungan, Penetapan dan Pencetakan dalam output pdf
    Route::prefix('/pak')->name('pak.')->group(function () {
        Route::get('/create-for/pegawai', [DokumenPAKController::class, 'create'])->name('create');
        Route::get('/create-by/pengusulan/{pengusulan}', [DokumenPAKController::class, 'create_by_pengusulan'])->name('create-by-pengusulan');
        Route::get('/edit/pak', [DokumenPAKController::class, 'edit'])->name('edit');
        Route::post('/save', [DokumenPAKController::class, 'save'])->name('save');
        Route::post('/submit', [DokumenPAKController::class, 'submit'])->name('submit'); //ini routenya
    });

    // Pengajuan PAK(CRUD, Revisi, RESEBMIT, Cancel) //NOTE!! Urutan jangan diubah, resource harus paling bawah
    Route::get('/pengajuan/revisi', [PengajuanController::class, 'revisi'])->name('pengajuan.revisi');
    Route::patch('/pengajuan/ajukan-ulang', [PengajuanController::class, 'ajukan_ulang'])->name('pengajuan.ajukan-ulang');
    Route::resource('pengajuan', PengajuanController::class);


    // Arsip Dokumen(CRUD)
    Route::resource('arsip-dokumen', ArsipDokumenController::class)->parameters(['arsip-dokumen' => 'arsipDokumen']);


    // ===============Data Master================

    // Kelola Riwayat PAK(CRUD)
    // routes/web.php
    Route::get('/riwayat-pak/detail/{id}', [RiwayatPAKController::class, 'show_detail'])->name('riwayat-pak.show-detail');
    Route::resource('riwayat-pak', RiwayatPAKController::class)
        ->parameters(['riwayat-pak' => 'riwayat'])->only(['index', 'show', 'edit', 'update', 'destroy']);


    // Kelola Pegawai(CRUD) & Riwayat Karir(Log Perubahan Pegawai)
    Route::resource('pegawai', PegawaiController::class);
    Route::get('/riwayat-karir', [RiwayatKarirController::class, 'index'])->name('riwayat-karir.index');

    // Kelola Aturan PAK(CRUD)
    Route::post('/aturan-pak/set-default-config', [AturanPAKController::class, 'set_default_config'])->name('aturan-pak.set-default-config');
    Route::resource('aturan-pak', AturanPAKController::class);

    // =================INFO=================

    // Log Aktivitas(R)
    Route::get('/log-aktivitas', [LogAktivitasController::class, 'index'])->name('log-aktivitas.index');

    // Panduan/Bantuan(R)
    Route::get('/help-and-guide', [DashboardController::class, 'help_and_guide'])->name('help-and-guide'); // Export Data Pegawai Ke csv

    // Download Template
    Route::get('/download-template', [DokumenPAKController::class, 'download_template'])->name('download-template');
});




// <============================================================ Pimpinan ============================================================>

Route::middleware(['authOrSSO', 'pimpinan'])->prefix('pimpinan')->name('pimpinan.')->group(function () {

    //Pengajuan PAK(Read, Approve,Reject)
    Route::prefix('/pengajuan')->name('pengajuan.')->group(function () {
        Route::get('/', [PengajuanController::class, 'index'])->name('index');
        Route::post('/approve/{pengajuan}', [PengajuanController::class, 'approve'])->name('approve');
        Route::post('/reject/{pengajuan}', [PengajuanController::class, 'reject'])->name('reject');
        Route::post('/undo-validate/{pengajuan}', [PengajuanController::class, 'undo_validate'])->name('undo-validate');
    });

    // Aturan PAK(R)
    Route::get('/aturan-pak', [AturanPAKController::class, 'index'])->name('aturan-pak.index');
    Route::post('/aturan-pak/set-pt', [AturanPAKController::class, 'setPenandaTangan'])->name('aturan-pak.set-pt');

    // Daftar Pegawai(R)
    Route::get('/pegawai', [PegawaiController::class, 'index'])->name('pegawai.index');

    // Riwayat Karir
    Route::get('/riwayat-karir', [RiwayatKarirController::class, 'index'])->name('riwayat-karir.index');

    // Arsip Dokumen
    Route::resource('arsip-dokumen', ArsipDokumenController::class);

    // Log Aktivitas(R)
    Route::get('/log-aktivitas', [LogAktivitasController::class, 'index'])->name('log-aktivitas');

    // Panduan/Bantuan
    Route::get('/help-and-guide', [DashboardController::class, 'help_and_guide'])->name('help-and-guide'); // Export Data Pegawai Ke csv

    // Download Template
    Route::get('/download-template', [DokumenPAKController::class, 'download_template'])->name('download-template');
});

// <============================================================ Pegawai ============================================================>
Route::middleware(['authOrSSO'])->prefix('pegawai')->name('pegawai.')->group(function () {
    // Pengusulan(CR)
    Route::resource('pengusulan-pak', PengusulanPAKController::class)->parameters(['pengusulan-pak' => 'pengusulanPAK']);

    //Status Proses PAK/Pengajuan(R)
    Route::get('/proses-pak/pengajuan', [PengajuanController::class, 'index'])->name('proses-pak.index');

    // Aturan PAK (R), //NOTE! Ini mungkin dak usah?
    Route::get('/aturan-pak', [AturanPAKController::class, 'index'])->name('aturan-pak.index');

    // Riwayat Karir (R)
    Route::get('/riwayat-karir', [RiwayatKarirController::class, 'index'])->name('riwayat-karir.index');

    // Arsip Dokumen
    Route::resource('arsip-dokumen', ArsipDokumenController::class)->only(['index', 'store', 'edit', 'update', 'destroy']);

    // Panduan/Bantuan
    Route::get('/help-and-guide', [DashboardController::class, 'help_and_guide'])->name('help-and-guide'); // Export Data Pegawai Ke csv

    // Download Template
    Route::get('/download-template', [DokumenPAKController::class, 'download_template'])->name('download-template');
});


Route::middleware(['authOrSSO'])->prefix('/info')->name('info.')->group(function () {
    // Panduan/Bantuan
    Route::get('/help-and-guide', [DashboardController::class, 'help_and_guide'])->name('help-and-guide'); // Export Data Pegawai Ke csv
    // Download Template
    Route::get('/download-template', [DokumenPAKController::class, 'download_template'])->name('download-template');
});

require __DIR__ . '/auth.php';

// Route::resource('riwayat-pak', RiwayatPAKController::class)
// ->except(['index', 'preview']) //Resource kecuali index karna beda parameter
// ->parameters(['riwayat' => 'riwayat']); // kasih parameter riwat semua biar URL pakai {riwayat}
  // Alternatif
    // Route::get('/pegawai', [RiwayatPAKController::class, 'pegawai'])->name('pegawai'); //Pilih dulu pegawai mana yang mau dilihat dokumen PAK nya
    // Route::get('/show/{pegawai:NIP}', [RiwayatPAKController::class, 'show'])->name('show');