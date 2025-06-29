<?php

namespace App\Http\Controllers\Shared;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\ArsipDokumen;
use App\Models\AturanPAK;
use App\Models\Catatan;
use App\Models\Pegawai;
use App\Models\Pengajuan;
use App\Models\PengusulanPAK;
use App\Models\RiwayatPAK;
use App\Services\ActivityLogger;
use App\Services\AturanPAKService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;


use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PengajuanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $user;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth_sso();
            return $next($request);
        });
    }

    public function index()
    {
        $pengajuan = Pengajuan::with([
            'riwayat_pak.pegawai:id,NIP,Nama,Gelar Tambahan,Jabatan/TMT'
        ])->latest();

        $pegawai = Pegawai::byNIP($this->user->nip)->first();
        // dd($pegawai->id);
        if ($this->user->role === 'Pegawai') {
            $pengajuan = Pengajuan::with([
                'riwayat_pak',
                'riwayat_pak.pegawai:id,NIP,Nama,Gelar Tambahan,Jabatan/TMT'
            ])->byPegawaiId($pegawai->id)->latest();
        }

        $filtered = $pengajuan->filter(request(['search', 'byStatus', 'byJabatan', 'byKesimpulan']));
        $data = $filtered->paginate(10)->withQueryString();

        $subTitle = GetSubtitle::getSubtitle(
            byJabatan: request('byJabatan'),
            byDaerah: request('byDaerah'),
            search: request('search')
        );

        $koefisien_per_tahun = AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value;
        $jabatan_list = collect($koefisien_per_tahun)->pluck('jabatan')->toArray();
        $kesimpulan_list = collect(AturanPAKService::get('kesimpulan')['kesimpulan']->value ?? [])->pluck('kesimpulan');

        // Dapatkan foldername & file arsip dari user yg login
        $arsipDokumenByUser = ArsipDokumen::byUser($this->user);

        return Inertia::render('Pengajuan/Index', [
            "title" => "Proses Pengajuan PAK",
            "subTitle" => $subTitle,
            "pengajuans" => $data,
            'isPimpinan' => $this->user->role === 'Pimpinan',
            'isDivisiSDM' => $this->user->role === 'Divisi SDM',
            'isPegawai' => $this->user->role === 'Pegawai',
            "searchReq" => request('search') ?? "",
            "byStatusReq" => request('byStatus'),
            "byJabatanReq" => request('byJabatan'),
            "byKesimpulanReq" => request('byKesimpulan'),
            'jabatanList' => $jabatan_list,
            'kesimpulanList' => $kesimpulan_list,
            'folderArsipList' => $arsipDokumenByUser->pluck('folder_name')->toArray(),
        ]);
    }

    // Simpan Pengajuan setelah diajukan
    public function store(Request $request)
    {
        $rules = [
            'user_nip' => 'required|string',
            'riwayat_pak_id' => 'required|integer',
            'catatan' => 'nullable|string',
        ];
        $validated = $request->validate($rules);

        if ($request->catatan) {
            $new_catatan = Catatan::create([
                'user_nip' => $request->user_nip,
                'tipe' => 'Pengajuan PAK-Divisi SDM',
                'isi' => $request->catatan,
            ]);
            $validated['catatan_id'] = $new_catatan->id;
        }

        // Kalo diajukan dan itu dr pengusulan pegawai
        $riwayatPAK = RiwayatPAK::findOrFail($request->riwayat_pak_id)->first();
        if ($riwayatPAK && $riwayatPAK->pengusulan_pak_id) {
            PengusulanPAK::find($riwayatPAK->pengusulan_pak_id)?->update([
                "status" => "selesai"
            ]);
        }
        Pengajuan::create($validated);
        return redirect()->back()->with('message', 'PAK Berhasil diajukan! Silahkan menunggu untuk diproses!');
        // return Redirect::route('divisi-sdm.pengajuan.index')->with('message', 'PAK Berhasil diajukan! Silahkan menunggu untuk diproses!');
    }

    public function show($id)
    {
        $data = Pengajuan::with([
            'riwayat_pak',
            'riwayat_pak.pegawai',
            'riwayat_pak.pengusulan_pak.pegawai',
            'pengaju',
            'validator',
            'catatan_pengaju',
            'catatan_validator',
        ])->findOrFail($id);

        return response()->json($data);
    }

    // ===========================================================================================================================================
    public function approve(Pengajuan $pengajuan)
    {

        // 1.Ambil Pengajuan dan Pegawai
        $pegawai = $pengajuan->riwayat_pak->pegawai;

        // 2. Ambil signature path dari AturanPAK berdasarkan NIP user
        $signaturePath = public_path('storage/validasi_pimpinan/default.png');

        $aturan = AturanPAK::where('name', 'Penanda Tangan')->first();

        if ($aturan && is_array($aturan->value)) {
            foreach ($aturan->value as $ttd) {
                if ($ttd['nip'] === $this->user->nip && !empty($ttd['signature_path'])) {
                    $signaturePath = public_path('storage/' . $ttd['signature_path']);
                    break;
                }
            }
        }

        if (!file_exists($signaturePath)) {
            return back()->withErrors(['signature' => 'File tanda tangan default tidak ditemukan.']);
        }

        $mime = mime_content_type($signaturePath);
        $base64Sig = 'data:' . $mime . ';base64,' . base64_encode(file_get_contents($signaturePath));

        // 3. Ambil dan bersihkan data
        $data = optional($pengajuan->riwayat_pak)->toArray() ?? [];
        (new DokumenPAKController())->cleanAllData($data);

        // 4. Buat PDF
        $nama_pak = 'APPROVED_PAK_' . $pegawai->Nama . '-' . $pegawai->NIP . '.pdf';
        $pdfPath = storage_path("app/public/approved_pak/{$nama_pak}");
        $customF4Paper = [0, 0, 595.28, 935.43];

        Pdf::loadView('pdf.approved-pak', [
            'title' => $nama_pak,
            'data' => $data,
            'signature' => $base64Sig
        ])
            ->setPaper($customF4Paper, 'portrait')
            ->setWarnings(false)
            ->save($pdfPath);

        // 5. Update status
        $pengajuan->update([
            'validated_by' => $this->user->nip,
            'status' => 'divalidasi',
            'tanggal_divalidasi' => now(),
            'approved_pak_path' => "approved_pak/{$nama_pak}",
        ]);

        $no_surat =  AturanPAK::extractNoSurat($pengajuan->riwayat_pak['no_surat3']);
        ActivityLogger::log(
            'Validasi Pengajuan PAK',
            $this->user->name . '(' . $this->user->role . ') menyetujui pengajuan PAK dengan NO PAK: ' . $no_surat,
            Pengajuan::class,
            $pengajuan->id,
            null
        );

        // 6. Redirect dengan feedback
        return redirect()->back()->with([
            'toast' => "Pengajuan PAK berhasil divalidasi.",
            'toast_id' => uniqid(),
        ]);
    }

    public function reject(Pengajuan $pengajuan, Request $request)
    {
        $new_catatan = null;
        if ($request->catatan) {
            $new_catatan = Catatan::create([
                'user_nip' => $this->user->nip,
                'isi' => $request->catatan,
                'tipe' => 'Pengajuan PAK-Pimpinan',
                'penting' => true
            ]);
        }

        $pengajuan->update(['status' => 'ditolak',    "tanggal_ditolak" => now(),  'catatan_validator_id' =>  $new_catatan->id ?? null]);
        $no_surat =  AturanPAK::extractNoSurat($pengajuan->riwayat_pak['no_surat3']);


        ActivityLogger::log(
            'Tolak Pengajuan PAK',
            $this->user->name . '(' . $this->user->role . ') menolak pengajuan PAK dengan NO PAK: ' . $no_surat,
            Pengajuan::class,
            $pengajuan->id,
            null
        );

        return redirect()->back()->with('message', 'Pengajuan Berhasil Ditolak!'); // atau redirect ke halaman tertentu

    }

    // UNDO SUBMIT(DELETE)
    public function destroy(Pengajuan $pengajuan)
    {
        $pengajuan->delete();
        return redirect()->back()->with('message', 'Pengajuan PAK berhasil dibatalkan');
    }



    public function reset_validate(Pengajuan $pengajuan)
    {
        $pengajuan->load(['riwayat_pak', 'catatan_validator']);
        try {
            DB::transaction(function () use ($pengajuan) {
                // Hapus file jika ada
                if ($pengajuan->approved_pak_path) {
                    Storage::disk('public')->delete($pengajuan->approved_pak_path);
                }

                // Hapus catatan validator jika ada
                if ($pengajuan->catatan_validator) {
                    $pengajuan->catatan_validator->delete();
                }

                // Reset pengajuan
                $pengajuan->update([
                    'status' => 'diajukan',
                    'validated_by' => null,
                    'tanggal_ditolak' => null,
                    'tanggal_divalidasi' => null,
                    'approved_pak_path' => null,
                    'catatan_validator_id' => null,
                ]);

                $no_surat = AturanPAK::extractNoSurat(optional($pengajuan->riwayat_pak)['no_surat3'] ?? '-');

                ActivityLogger::log(
                    aktivitas: 'Reset Validasi Pengajuan PAK',
                    keterangan: $this->user->name . " (" . $this->user->role . ") mereset validasi pengajuan PAK dengan NO PAK: {$no_surat}",
                    entityType: Pengajuan::class,
                    entityId: $pengajuan->id
                );
            });

            return redirect()->back()->with('message', 'Validasi pengajuan berhasil Direset');
        } catch (\Exception $e) {
            Log::error('Undo validate error: ' . $e->getMessage());
            return redirect()->back()->withErrors('Terjadi kesalahan saat membatalkan validasi.');
        }
    }



    public function approved_show()
    {
        $preview = session('pak_preview');
        // dd($preview);
        if (!$preview) {
            return redirect()->back()->withErrors(['msg' => 'Data preview tidak tersedia.']);
        }


        $pengajuan = Pengajuan::findOrFail($preview['id']);
        $data = [];
        $data["pegawai"] = $pengajuan->pegawai;
        if ($pengajuan->riwayat_pak) {
            $documentArray = json_decode(json_encode($pengajuan->riwayat_pak), true);
            foreach ($documentArray as $key => $value) {
                $data[$key] = $value;
            }
        }

        $dokumenPAK = new DokumenPAKController();
        $dokumenPAK->cleanAllData($data);

        // Buat PDF SIZE F4
        $nama_pak = 'APPROVED' . $data['pegawai']['Nama'] . '-' . $data['pegawai']['NIP'] . '-' . 'PAK.pdf';
        $customF4Paper = array(0, 0, 595.28, 935.43);
        $pdf = Pdf::loadView('pdf.approved-pak', [
            "title" => $nama_pak,
            "data" => $data, // Kirim data ke view
            'signature' => $preview['signature']
        ])->setPaper($customF4Paper, 'portrait')->setWarnings(false);

        return response($pdf->output())
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . $nama_pak . '"')
            ->header('X-Frame-Options', 'SAMEORIGIN');
    }


    public function revisi(Request $request)
    {
        return Inertia::render('RiwayatPAK/CreateOrEdit', [
            'title' => 'Revisi Penetapan Angka Kredit',
            'isEdit' => true,
            'riwayat' => RiwayatPAK::with('pegawai')->findOrFail($request->pakId),
            'isRevisi' => $request->isRevisi,
            'pengajuanId' => $request->pengajuanId,
            'aturanPAK' => AturanPAKService::get(),
        ]);
    }

    public function ajukan_ulang(Request $request, RiwayatPAK $riwayat)
    {
        DB::beginTransaction();
        try {
            // Ambil pengajuan berdasarkan ID dari request
            $pengajuanPAK = Pengajuan::findOrFail($request->pengajuanId);

            // Update riwayat PAK, kecuali kolom tertentu
            $riwayat->update($request->except(['pengajuanId', 'catatan']));

            // Buat catatan baru jika ada isinya
            $catatan = null;
            if ($request->filled('catatan')) {
                $catatan = Catatan::create([
                    'user_nip' => $this->user->nip,
                    'tipe'     => 'Revisi Pengajuan PAK-Divisi SDM',
                    'isi'      => $request->catatan,
                ]);
            }

            // Update status pengajuan jadi 'direvisi'
            $pengajuanPAK->update([
                'status'             => 'direvisi',
                'tanggal_direvisi'  => now(),
                'cataan_pengaju_id' => $catatan?->id,
            ]);

            // Ambil & log no surat
            $noSurat = AturanPAK::extractNoSurat($pengajuanPAK->riwayat_pak['no_surat3'] ?? '-');
            ActivityLogger::log(
                'Revisi Pengajuan PAK',
                "{$this->user->name} ({$this->user->role}) merevisi pengajuan PAK dengan NO PAK: {$noSurat}",
                Pengajuan::class,
                $pengajuanPAK->id,
            );

            DB::commit();

            return redirect()
                ->route('divisi-sdm.pengajuan.index')
                ->with('message', 'Pengajuan PAK berhasil direvisi & diajukan ulang');
        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Gagal revisi pengajuan PAK: ' . $e->getMessage(), [
                'nip'     => $this->user->nip ?? '-',
                'request' => $request->all(),
            ]);

            return back()->withErrors('Terjadi kesalahan saat revisi. Silakan coba lagi.');
        }
    }


    public function markAsRead(Pengajuan $pengajuan)
    {


        return response()->json([
            'message' => 'Pengajuan ditandai sebagai sudah dibaca dan status diperbarui.'
        ]);
    }
}
