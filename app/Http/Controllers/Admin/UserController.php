<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\Divisi;
use App\Models\Jabatan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subTitle = "";
        $params = request()->all(['search', 'byJabatan', 'byDivisi', 'byStatus']);
        $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Administrator/User/Index', [
            "title" => "Data User",
            "subTitle"  => $subTitle,
            "users"    => User::with(['jabatan:id,nama_jabatan', 'divisi:id,nama_divisi'])->filter($params)->paginate(10)->withQueryString(),
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
        return Inertia::render('Administrator/User/Create', [
            'title' => "Tambah Data User",
            "filtersList"   => [
                "kategori" => User::getEnumValues('kategori'),
                "status"   => User::getEnumValues('status'),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validated();
        User::create($validated);
        return Redirect::route('admin.user.index')->with('message', 'Data User Berhasil Ditambahkan!');
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
        return Inertia::render('Administrator/User/Edit', [
            'title' => "Edit Data User",
            'user' => $user,
            "filtersList"   => [
                "kategori" => User::getEnumValues('kategori'),
                "status"   => User::getEnumValues('status'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validated();
        $user->update($validated); // update data
        // $userOld = $user->toArray(); // ambil data lama sebelum update
        // app(LoguserChangesService::class)->logChanges($userOld, $validated);

        return redirect()->back()->with('message', 'Data User Berhasil Diupdate!');
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
