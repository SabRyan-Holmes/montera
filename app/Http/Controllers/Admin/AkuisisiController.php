<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Http\Requests\Shared\AkuisisiRequest;
use App\Models\Akuisisi;
use App\Models\Produk;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AkuisisiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $user, $role, $isAdmin;
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user = auth_sso();
            return $next($request);
        });
    }

    public function index()
    {
        $subTitle = "";
        $params = request()->all(['search', 'byStatus']);
        $subTitle = GetSubtitle::getSubtitle(...$params);
        $query = Akuisisi::with([
            'pegawai:id,name',
            'produk:id,nama_produk,kategori_produk',
            'verifikator:id,name',
            'supervisor:id,name',
        ])->filter($params)->latest();
        $role = $this->user->jabatan->nama_jabatan;

        if (!$this->user->isAdmin) {
            $query->where('user_id', $this->user->id);
        }
        return Inertia::render('Administrator/Akuisisi/Index', [
            "title" => "Data Akuisisi",
            "subTitle"  => $subTitle,
            "canCreate" => in_array($role, ['Administrator', 'Pegawai']),
            "canManage" => $this->user->isAdmin,
            'akuisisis' => $query->paginate(10)
                ->through(function ($item) {
                    return $item->append('display_nominal');
                })
                ->withQueryString(),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byStatus"   => $params['byStatus'] ?? "Semua Kategori",
            ],
            "filtersList"   => [
                "status"   => ['pending', 'verified', 'rejected'],
            ],
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $page = ($this->user->isAdmin ? 'Administrator' : 'Pegawai') . '/Akuisisi/CreateEdit';
        $supervisors = User::role('Supervisor')->get()->map(function ($u) {
            return [
                'value' => $u->id,
                'label' => $u->name,
            ];
        });
        $produks = Produk::where('status', 'tersedia')
            ->get()
            ->map(function ($p) {
                return [
                    'value' => $p->id,
                    'label' => $p->nama_produk,
                    'kategori' => $p->kategori_produk,
                ];
            });
        $pegawais = [];
        if ($this->user->isAdmin) {
            $pegawais = User::role('Pegawai')->get()->map(function ($u) {
                return [
                    'value' => $u->id,
                    'label' => $u->name . ' - ' . $u->nip,
                ];
            });
        }
        return Inertia::render($page, [
            'title' => 'Input Laporan Akuisisi',
            'isAdmin' => $this->user->isAdmin ,
            'filtersList' => [
                'produks' => $produks,
                'supervisors' => $supervisors,
                "pegawais" => $pegawais
            ],
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(AkuisisiRequest $request)
    {
        $validated = $request->validated();
        $validated['status_verifikasi'] = 'pending';
        if ($this->user->isAdmin) {
            $validated['user_id'] = $request->input('user_id');
        } else {
            $validated['user_id'] = $this->user->id;
        }
        $validated['supervisor_id'] = $request->input('supervisor_id');
        if ($request->hasFile('lampiran_bukti')) {
            $file = $request->file('lampiran_bukti');
            $fileName = 'bukti_akuisisi_' . date('Ymd_His') . '_' . Str::random(4) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('bukti_akuisisi', $fileName, 'public');
            $validated['lampiran_bukti'] = $path;
        }
        Akuisisi::create($validated);
        $routeName = $this->user->isAdmin ? 'admin.akuisisi.index' : 'pegawai.akuisisi.index';
        return redirect()->route($routeName)->with('message', 'Akuisisi berhasil dibuat!');
    }
    /**
     * Display the specified resource.
     */
    public function show(Akuisisi $akuisisi)
    {
        return Inertia::render('Admin/Akuisisi/Show', [
            'title' => 'Detail Data Akuisisi',
            'akuisisi' => $akuisisi
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Akuisisi $akuisisi)
    {
        $page = ($this->user->isAdmin ?  : 'Pegawai') . '/Akuisisi/CreateEdit';
        $supervisors = User::role('Supervisor')->get()->map(fn($u) => ['value' => $u->id, 'label' => $u->name]);
        $produks = Produk::where('status', 'tersedia')->get()->map(fn($p) => [
            'value' => $p->id,
            'label' => $p->nama_produk,
            'kategori' => $p->kategori_produk
        ]);
        $pegawais = [];
        if ($this->user->isAdmin) {
            $pegawais = User::role('Pegawai')->get()->map(fn($u) => [
                'value' => $u->id,
                'label' => $u->name . ' - ' . $u->nip
            ]);
        }
        return Inertia::render($page, [
            'title' => 'Edit Laporan Akuisisi',
            'isEdit' => true,
            'isAdmin' => $this->user->isAdmin,
            'akuisisi' => $akuisisi,
            'filtersList' => [
                'produks' => $produks,
                'supervisors' => $supervisors,
                'pegawais' => $pegawais,
            ],
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(AkuisisiRequest $request, Akuisisi $akuisisi)
    {
        $validated['user_id'] = $this->user->isAdmin ? $request->input('user_id') : $this->user->id;
        $validated = $request->validated();
        if ($this->user->isAdmin) {
            $validated['user_id'] = $request->input('user_id');
        } else {
            unset($validated['user_id']);
        }

        if ($request->boolean('delete_file')) {
            if ($akuisisi->lampiran_bukti) {
                Storage::disk('public')->delete($akuisisi->lampiran_bukti);
            }
            $validated['lampiran_bukti'] = null;
        }

        if ($request->hasFile('lampiran_bukti')) {
            if ($akuisisi->lampiran_bukti && !$request->boolean('delete_file')) {
                Storage::disk('public')->delete($akuisisi->lampiran_bukti);
            }
            $file = $request->file('lampiran_bukti');
            $fileName = 'bukti_akuisisi_' . date('Ymd_His') . '_' . Str::random(4) . '.' . $file->getClientOriginalExtension();
            $validated['lampiran_bukti'] = $file->storeAs('bukti_akuisisi', $fileName, 'public');
        }
        // kalo revisi dari pegawai
        if(!$this->user->isAdmin) {
            $validated['status_verifikasi'] = 'pending';
        }
        $akuisisi->update($validated);
        $routeName = $this->user->isAdmin ? 'admin.akuisisi.index' : 'pegawai.akuisisi.index';
        return redirect()->route($routeName)->with('message', 'Akuisisi berhasil diperbarui!');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Akuisisi $akuisisi)
    {
        if ($akuisisi->lampiran_bukti) {
            Storage::delete($akuisisi->lampiran_bukti);
        }
        $akuisisi->delete();
        return redirect()->back()->with('message', 'Data Akuisisi Berhasil DiHapus!');
    }
}
