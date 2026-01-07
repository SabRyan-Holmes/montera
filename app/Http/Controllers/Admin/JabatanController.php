<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\Divisi;
use App\Models\Jabatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class JabatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subTitle = "";
        $params = request()->all(['search', 'byLevel']);
        $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Administrator/Jabatan/Index', [
            "title" => "Data Jabatan",
            "subTitle"  => $subTitle,
            "jabatans"    => Jabatan::filter($params)->paginate(10)->withQueryString(),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byLevel"     => $params['byLevel'] ?? "",
            ],
             "filtersList"   => [
                "level" => [0,1,2,3]
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Administrator/Jabatan/Create', [
            'title' => "Tambah Data Jabatan",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validated();
        Jabatan::create($validated);
        return Redirect::route('admin.user.index')->with('message', 'Data Jabatan Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Jabatan $user) //Unused
    {
        return Inertia::render('Administrator/Jabatan/Show', [
            'title' => 'Detail Data Jabatan',
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jabatan $user)
    {
        return Inertia::render('Administrator/Jabatan/Edit', [
            'title' => "Edit Data Jabatan",
            'user' => $user,
            "filtersList"   => [
                "kategori" => Jabatan::getEnumValues('kategori'),
                "status"   => Jabatan::getEnumValues('status'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Jabatan $user)
    {
        $validated = $request->validated();
        $user->update($validated); // update data
        // $userOld = $user->toArray(); // ambil data lama sebelum update
        // app(LoguserChangesService::class)->logChanges($userOld, $validated);

        return redirect()->back()->with('message', 'Data Jabatan Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jabatan $user)
    {
        $user->delete();
        return redirect()->back()->with('message', 'Data Jabatan Berhasil DiHapus!');
    }
}
