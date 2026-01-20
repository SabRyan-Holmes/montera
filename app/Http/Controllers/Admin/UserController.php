<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use App\Models\Divisi;
use App\Models\Jabatan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
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
        $subTitle = "";
        $params = request()->all(['search', 'byJabatan', 'byDivisi', 'byStatus']);
        $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Administrator/User/Index', [
            "title" => "Data User",
            "subTitle"  => $subTitle,
            "users"    => User::latest()->with(['jabatan:id,nama_jabatan', 'divisi:id,nama_divisi,main_divisi'])->filter($params)->paginate(10)->withQueryString(),
            "canManage" => $this->user->hasRole('Administrator'),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byJabatan" => $params['byJabatan'] ?? "Semua Kategori",
                "byDivisi"   => $params['byDivisi'] ?? "Semua Kategori",
                "byStatus"   => $params['byStatus'] ?? "Semua Kategori",
            ],
            "filtersList"   => [
                "jabatan" => Jabatan::pluck('nama_jabatan')->toArray(),
                "divisi"   => Divisi::pluck('nama_divisi')->toArray(),
                "status"   => ['aktif', 'nonaktif'],
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Administrator/User/CreateEdit', [
            'title' => "Tambah Data User",
            "optionList" => [
                // Saya pengen ini dipper dr backedn aj ato yg buata dapetin value label itu kek dibuat
                //bikin funsgi khsusu global karn aemg bakal sering dipake gitu
                "jabatan" => Jabatan::getOptions('nama_jabatan'),
                "divisi"  => Divisi::getOptions('nama_divisi'),
                "status"  => [
                    ['id' => 'aktif', 'label' => 'Aktif'],
                    ['id' => 'nonaktif', 'label' => 'Non-Aktif'],
                ]
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        // 1. Ambil data yang sudah lolos validasi
        $validated = $request->validated();

        // 2. Hash Password
        $validated['password'] = Hash::make($request->password);

        // 3. SIMPAN KE DB (Ini yang tadi kurang)
        User::create($validated);

        return redirect()->route('admin.user.index')->with('message', 'User berhasil ditambahkan.');
    }


    /**
     * Display the specified resource.
     */
    public function show(User $user) //Unused
    {
        return Inertia::render('Administrator/User/Show', [
            'title' => 'Detail Data User',
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Administrator/User/CreateEdit', [
            'title' => "Edit Data User",
            'user' => $user, // Kirim data user yang mau diedit
            'isEdit' => true, // Flag penanda ini mode edit
            "optionList" => [
                "jabatan" => Jabatan::getOptions('nama_jabatan'),
                "divisi"  => Divisi::getOptions('nama_divisi'),
                "status"  => [
                    ['id' => 'aktif', 'label' => 'Aktif'],
                    ['id' => 'nonaktif', 'label' => 'Non-Aktif'],
                ]
            ],
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        // Validasi manual atau buat UserUpdateRequest terpisah (Recommended)
        $rules = [
            'name' => 'required|string|max:255',
            'nip' => 'required|string|max:20|unique:users,nip,' . $user->id, // Ignore unique punya sendiri
            'email' => 'required|email|unique:users,email,' . $user->id,
            'jabatan_id' => 'required',
            'status_aktif' => 'required',
            'password' => 'nullable|min:8' // Password optional saat edit
        ];

        $validated = $request->validate($rules);

        // Logic Password: Kalau diisi update, kalau kosong skip
        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        } else {
            unset($validated['password']); // Hapus key password biar ga ke-update jadi null/kosong
        }

        $user->update($validated);

        return redirect()->route('admin.user.index')->with('message', 'User berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->back()->with('message', 'Data User Berhasil DiHapus!');
    }
}
