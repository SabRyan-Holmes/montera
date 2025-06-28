<?php

namespace App\Http\Controllers\Shared;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Http\Requests\Pegawai\PengusulanPAKRequest;
use App\Models\AturanPAK;
use App\Models\Catatan;
use App\Models\Pegawai;
use App\Models\PengusulanPAK;
use App\Models\RiwayatPAK;
use App\Services\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class PengusulanPAKController extends Controller
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
        // TODO
        $pengusulanPAK = PengusulanPAK::with([
            'pegawai:id,NIP,Nama,Gelar Tambahan,Jabatan/TMT'
        ])->latest();


        if ($this->user->role === "Pegawai") {
            $pengusulanPAK = PengusulanPAK::with([
                'pegawai:id,NIP,Nama,Gelar Tambahan,Jabatan/TMT'
            ])->where('pegawai_nip', $this->user->nip)->latest();
        }

        $filtered = $pengusulanPAK->filter(request(['search', 'byJabatan', 'byStatus']));
        $data = $filtered->paginate(10)->withQueryString();
        $subTitle = GetSubtitle::getSubtitle(
            byJabatan: request('byJabatan'),
            byStatus: request('byStatus'),
            search: request('search'),
            searchLabel: 'Cari pegawai dengan Nama/NIP : '
        );

        $koefisien_per_tahun = AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value;
        $jabatan_list = collect($koefisien_per_tahun)->pluck('jabatan')->toArray();

        return Inertia::render('PengusulanPAK/Index', [
            "title" => "Pengusulan Penilaian PAK ",
            "subTitle" => $subTitle,
            "pengusulanPAK" => $data,
            'isDivisiSDM' => $this->user->role == 'Divisi SDM',
            "searchReq" => request('search') ?? "",
            "byStatusReq" => request('byStatus'),
            "byJabatanReq" => request('byJabatan'),
            "jabatanList" => $jabatan_list,
            'processed' => RiwayatPAK::whereNotNull('pengusulan_pak_id')->pluck('pengusulan_pak_id')->toArray(),
        ]);
    }


    public function create()
    {
        $pegawai = Pegawai::where('NIP', $this->user->nip)->first();
        return Inertia::render('PengusulanPAK/CreateOrEdit', [
            'title' => "Tambah Pengusulan PAK",
            'pegawai' => $pegawai
        ]);
    }



    public function store(PengusulanPAKRequest $request)
    {
        $validated = $request->except(['catatan_pengusul']);

        if ($request->catatan_pengusul) {
            $new_catatan = Catatan::create([
                'user_nip' => $request->pegawai_nip,
                'tipe' => 'Pengusulan PAK-Pegawai',
                'isi' => $request->catatan_pengusul,
            ]);
            $validated['catatan_pengusul_id'] = $new_catatan->id;
        }

        $uploadMap = [
            'dokumen_utama_path' => '-Penilaian-Kinerja~',
            'dokumen_pendukung_path' => '-Penilaian-Pendidikan~',
        ];

        foreach ($uploadMap as $field => $alias) {
            if ($request->hasFile($field)) {
                $file = $request->file($field);
                $extension = $file->getClientOriginalExtension();
                $timestamp = now()->format('Ymd_His');
                $fileName = $request->pegawai_nip . $alias . $timestamp . '.' . $extension;
                $path = $file->storeAs('dokumen_pengusulan_pak', $fileName, 'public');
                $validated[$field] = $path;
            }
        }

        PengusulanPAK::create($validated);
        return Redirect::route('pegawai.pengusulan-pak.index')->with('message', 'Pengusulan Penilaian PAK Berhasil!');
    }


    public function show($id)
    {
        $data = PengusulanPAK::with([
            'pegawai',
            'catatan_pengusul',
            'catatan_validator',
        ])->findOrFail($id);

        return response()->json($data);
    }

    public function edit(PengusulanPAK $pengusulanPAK)
    {
        $pegawai = Pegawai::where('NIP', $this->user->nip)->first();
        return Inertia::render('PengusulanPAK/CreateOrEdit', [
            'title' => "Tambah Pengusulan PAK",
            'pegawai' => $pegawai,
            'pengusulanPAK' => $pengusulanPAK,
            'isEdit' => true
        ]);
    }


    public function update(PengusulanPAKRequest $request, PengusulanPAK $pengusulanPAK)
    {
        // dd($request);
        $validated = $request->except(['catatan_pengusul']);
        if ($request->filled('catatan_pengusul')) {
            $currentCatatan = $pengusulanPAK->catatan_pengusul;

            if ($currentCatatan) {
                // Cek apakah isinya berubah
                if ($currentCatatan->isi !== $request->catatan_pengusul) {
                    $currentCatatan->update([
                        'isi' => $request->catatan_pengusul,
                    ]);
                }
                $validated['catatan_pengusul_id'] = $currentCatatan->id;
            } else {
                // Belum ada catatan sebelumnya, buat baru
                $new_catatan = Catatan::create([
                    'user_nip' => $request->pegawai_nip,
                    'tipe' => 'Pengusulan PAK-Pegawai',
                    'isi' => $request->catatan_pengusul,
                ]);
                $validated['catatan_pengusul_id'] = $new_catatan->id;
            }
        }

        $uploadMap = [
            'dokumen_utama_path' => '-Penilaian-Kinerja~',
            'dokumen_pendukung_path' => '-Penilaian-Pendidikan~',
        ];

        foreach ($uploadMap as $field => $alias) {
            if ($request->hasFile($field)) {
                // hapus file lama kalo diupload ulang dokumen utama/pendukung
                if ($pengusulanPAK->$field) {
                    Storage::disk('public')->delete($pengusulanPAK->$field);
                }

                $file = $request->file($field);
                $extension = $file->getClientOriginalExtension();
                $timestamp = now()->format('Ymd_His');
                $fileName = $request->pegawai_nip . $alias . $timestamp . '.' . $extension;
                $path = $file->storeAs('dokumen_pengusulanPAK', $fileName, 'public');
                $validated[$field] = $path;
            }
        }

        $validated['status'] = 'direvisi';
        $validated['tanggal_direvisi'] = now();
        $pengusulanPAK->update($validated);
        ActivityLogger::log(
            pegawaiNip: $this->user->nip,
            aktivitas: "Revisi Pengusulan PAK",
            keterangan: "Pegawai dengan nama: {$this->user->name} merevisi pengusulan PAK dengan ID: #{$pengusulanPAK->id} ",
            entityType: get_class($pengusulanPAK),
            entityId: $pengusulanPAK->id
        );
        return redirect()->route('pegawai.pengusulan-pak.index')->with('message', 'Pengusulan PAK berhasil direvisi & diusulkan ulang');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PengusulanPAK $pengusulanPAK)
    {
        $pengusulanPAK->delete();
        return redirect()->back()->with('message', 'Berhasil Membatalkan Pengusulan PAK');
    }

    public function approve(PengusulanPAK $pengusulanPAK)
    {
        $pengusulanPAK->update([
            "status" => 'disetujui',
            "tanggal_disetujui" => now()
        ]);
        ActivityLogger::log(
            aktivitas: "Setujui Pengusulan PAK",
            keterangan: "{$this->user->name} ({$this->user->role} menyetujui pengusulan PAK dengan ID: #{$pengusulanPAK->id} ",
            entityType: get_class($pengusulanPAK),
            entityId: $pengusulanPAK->id
        );
    }

    public function reject(Request $request)
    {

        $rules = [
            'id' => 'required|integer',
            'catatan' => 'required|string|min:5|max:200',
        ];
        $pengusulanPAK = PengusulanPAK::findOrFail($request->id);
        $request->validate($rules);

        $new_catatan = Catatan::create([
            'user_nip' => $this->user->nip,
            'isi' => $request->catatan,
            'tipe' => "Pengusulan PAK-Divisi SDM"
        ]);
        $pengusulanPAK->update([
            'status' => 'ditolak',
            'tanggal_ditolak' => now(),
            'catatan_validator_id' => $new_catatan->id
        ]);
        ActivityLogger::log(
            aktivitas: "Tolak Pengusulan PAK",
            keterangan: "{$this->user->name} menolak pengusulan PAK dengan ID: #{$pengusulanPAK->id} ",
            entityType: get_class($pengusulanPAK),
            entityId: $pengusulanPAK->id
        );

        return redirect()->back()->with('message', 'Pengusulan PAK berhasil ditolak');
    }

    public function undo_validate(PengusulanPAK $pengusulanPAK)
    {
        $pengusulanPAK->update([
            "status" => 'diproses',
            'approved_by' => null,
            'tanggal_ditolak' => null,
            'tanggal_disetujui' => null,
            'catatan_validator_id' => null,
        ]);
        ActivityLogger::log(
            aktivitas: "Reset Validasi Pengusulan PAK",
            keterangan: "{$this->user->name} mereset validasi pengusulan PAK dengan ID: #{$pengusulanPAK->id} ",
            entityType: get_class($pengusulanPAK),
            entityId: $pengusulanPAK->id
        );
        return redirect()->back()->with('message', 'Penolakan pengusulan berhasil dibatalkan');
    }
}
