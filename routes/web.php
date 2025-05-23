<?php

use App\Http\Controllers\Shared\ArsipDokumenController;
use App\Http\Controllers\Auth\DashboardController;
use App\Http\Controllers\DivisiSDM\AturanPAKController;
use App\Http\Controllers\DivisiSDM\KoefisienController;
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


Route::get('/', function () {
    return Inertia::render('Auth/Login');
})->middleware('guest');

Route::get('/pegawai/login', [SSOController::class, 'showLoginForm'])->name('pegawai.login');
Route::post('/pegawai/login', [SSOController::class, 'loginpegawai']);

// <============================================================ All Actor ============================================================>

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

// Preview PAK PDF
Route::prefix('/pak')->name('pak.')->group(function () {
    Route::post('/process', [DokumenPAKController::class, 'process'])->name('process');
    Route::get('/preview', [DokumenPAKController::class, 'preview'])->name('preview');
});



// <============================================================ Divisi SDM ============================================================>

Route::middleware(['auth', 'divisi_sdm'])->prefix('/divisi-sdm')->name('divisi-sdm.')->group(function () {
    // Dashboard(=> Export Data Pegawai Ke csv)
    Route::get('/dashboard/export-csv', [DashboardController::class, 'exportCsv'])->name('export-csv'); // Export Data Pegawai Ke csv
    Route::get('/dashboard/export-excel', [DashboardController::class, 'exportExcel'])->name('export-excel');

    // TODO : Pengusulan PAK(R, Accept, Reject)
    Route::get('pengusulan-pak/', [PengusulanPAKController::class, 'index'])->name('pengusulan-pak.index');
    // Accept
    // Reject

    // Penetapan Angka Kredit => Pemrosesan, Penghitungan, Penetapan dan Pencetakan dalam output pdf (CRUD, Submit)
    Route::prefix('/pak')->name('pak.')->group(function () {
        Route::get('/create-for/pegawai', [DokumenPAKController::class, 'create'])->name('create');
        Route::get('/edit/pak', [DokumenPAKController::class, 'edit'])->name('edit');
        Route::post('/create-for-pegawai/{pegawai:NIP}', [DokumenPAKController::class, 'create_for_pegawai'])->name('create-for-pegawai');
        Route::post('/save', [DokumenPAKController::class, 'save'])->name('save');
        Route::post('/save-and-submit', [DokumenPAKController::class, 'save_and_submit'])->name('save-and-submit'); //ini routenya
    });

    // Pengajuan PAK(CRUD, Cancel)
    Route::resource('pengajuan', PengajuanController::class);
    Route::post('/cancel/{pengajuan}', [PengajuanController::class, 'cancel_pengajuan'])->name('pengajuan.cancel');

    // Arsip Dokumen(CRUD)
    Route::resource('arsip-dokumen', ArsipDokumenController::class);


    // =======Data Master========

    // Kelola Riwayat PAK(CRUD)
    Route::resource('riwayat-pak', RiwayatPAKController::class)
        ->parameters(['riwayat-pak' => 'riwayat'])->only(['index', 'show', 'edit', 'update', 'destroy']);
    // Alternatif
    // Route::get('/pegawai', [RiwayatPAKController::class, 'pegawai'])->name('pegawai'); //Pilih dulu pegawai mana yang mau dilihat dokumen PAK nya
    // Route::get('/show/{pegawai:NIP}', [RiwayatPAKController::class, 'show'])->name('show');

    // Kelola Pegawai(CRUD)
    Route::resource('pegawai', PegawaiController::class);

    // Kelola Aturan PAK(CRUD)
    Route::resource('aturan-pak', AturanPAKController::class);
    Route::post('/aturan-pak/set-default-config', [AturanPAKController::class, 'set_default_config'])->name('aturan-pak.set-default-config');


    // Kelola Koefisien(CRUD)
    Route::resource('koefisien', KoefisienController::class);


    // =========INFO=========

    // Log Aktivitas(R)
    Route::get('/log-aktivitas', [LogAktivitasController::class, 'index'])->name('log-aktivitas.index');

    // Panduan/Bantuan
    Route::get('/help-and-guide', [DashboardController::class, 'help_and_guide'])->name('help-and-guide'); // Export Data Pegawai Ke csv


    // Download Template
    Route::get('/download-template', [DokumenPAKController::class, 'download_template'])->name('download-template');
});




// <============================================================ Pimpinan ============================================================>

Route::middleware(['auth', 'pimpinan'])->prefix('pimpinan')->name('pimpinan.')->group(function () {

    //Pengajuan PAK(Read, Approve,Reject)
    Route::prefix('/pengajuan')->name('pengajuan.')->group(function () {
        Route::get('', [PengajuanController::class, 'index'])->name('index');
        Route::post('/approve', [PengajuanController::class, 'approve'])->name('approve');
        // Test Preview
        Route::post('/cancel/{pengajuan}', [PengajuanController::class, 'cancel'])->name('cancel');
        Route::post('/reject/{pengajuan}', [PengajuanController::class, 'reject'])->name('reject');
    });

    // Daftar Pegawai(Read)
    Route::get('/pegawai', [PengajuanController::class, 'index'])->name('pegawai.index');

    Route::get('/aturan-pak', [AturanPAKController::class, 'index'])->name('aturan-pak.index');

    // Kelola Koefisien(Mungkin Pimpinan bisa kelola koefisien juga?)
    //

    //Arsip Dokumen
    Route::resource('arsip-dokumen', PengajuanController::class);


    // Log Aktivitas(R)
    Route::get('/log-aktivitas', [LogAktivitasController::class, 'index'])->name('log-aktivitas');

    // Panduan/Bantuan
    Route::get('/help-and-guide', [DashboardController::class, 'help_and_guide'])->name('help-and-guide'); // Export Data Pegawai Ke csv


    // Download Template
    Route::get('/download-template', [DokumenPAKController::class, 'download_template'])->name('download-template');
});




// <============================================================ Pegawai ============================================================>
Route::middleware(['auth', 'pegawai'])->prefix('pegawai')->name('pegawai.')->group(function () {

    // Pengusulan
    Route::resource('pengusulan-pak', PengusulanPAKController::class);

    //Status Proses PAK/Pengajuan
    Route::get('/proses-pak', [PengajuanController::class, 'index'])->name('proses-pak.index');

    // Aturan PAK (R)
    Route::get('/aturan-pak', [AturanPAKController::class, 'index'])->name('aturan-pak.index');

    // Riwayat Karir (R)
    Route::get('/riwayat-karir', [RiwayatKarirController::class, 'index'])->name('riwayat-karir.index');

    // Log Aktivitas(R)
    Route::get('/log-aktivitas', [LogAktivitasController::class, 'index'])->name('log-aktivitas.index');

    // Panduan/Bantuan
    Route::get('/help-and-guide', [DashboardController::class, 'help_and_guide'])->name('help-and-guide'); // Export Data Pegawai Ke csv


    // Download Template
    Route::get('/download-template', [DokumenPAKController::class, 'download_template'])->name('download-template');
});



// Tes
// Route::get('/test-pdf', [DokumenPAKController::class, 'test_pdf']);

// Route::get('/tes', function () {
//     return Inertia::render('Test');
// });
require __DIR__ . '/auth.php';



// Route::prefix('/riwayat-pak')->name('riwayat-pak.')->group(function () {
//     // Route::get('/pegawai', [RiwayatPAKController::class, 'pegawai'])->name('pegawai'); //Pilih dulu pegawai mana yang mau dilihat dokumen PAK nya
//     // Route::get('/show/{pegawai:NIP}', [RiwayatPAKController::class, 'show'])->name('show');
//     // CRUD PAK
//     Route::get('', [RiwayatPAKController::class, 'index'])->name('index'); //Show All RiwayatPAK by Pegawai
//     Route::get('/show', [RiwayatPAKController::class, 'show'])->name('show');
//     Route::get('/edit/{riwayat:id}', [RiwayatPAKController::class, 'edit'])->name('edit');
//     Route::post('/update/{riwayat:id}', [RiwayatPAKController::class, 'update'])->name('update');
//     Route::delete('/delete/{riwayat:id}', [RiwayatPAKController::class, 'destroy'])->name('destroy');
// });


// Route::resource('riwayat-pak', RiwayatPAKController::class)
// ->except(['index', 'preview']) //Resource kecuali index karna beda parameter
// ->parameters(['riwayat' => 'riwayat']); // kasih parameter riwat semua biar URL pakai {riwayat}
