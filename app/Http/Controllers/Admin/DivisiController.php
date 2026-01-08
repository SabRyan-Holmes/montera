<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\Divisi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DivisiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subTitle = "";
        $params = request()->all(['search', 'byLevel']);
        $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Administrator/Divisi/Index', [
            "title" => "Data Divisi",
            "subTitle"  => $subTitle,
            "divisis"    => Divisi::filter($params)->latest()->paginate(10)->withQueryString(),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byLevel"     => $params['byLevel'] ?? "", //level/lokasi lantai
            ],
             "filtersList"   => [
                "level" => Divisi::pluck('lokasi_lantai')->toArray()
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Administrator/Divisi/Create', [
            'title' => "Tambah Data Divisi",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validated();
        Divisi::create($validated);
        return Redirect::route('admin.user.index')->with('message', 'Data Divisi Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Divisi $user) //Unused
    {
        return Inertia::render('Administrator/Divisi/Show', [
            'title' => 'Detail Data Divisi',
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Divisi $user)
    {
        return Inertia::render('Administrator/Divisi/Edit', [
            'title' => "Edit Data Divisi",
            'user' => $user,
            "filtersList"   => [
                "kategori" => Divisi::getEnumValues('kategori'),
                "status"   => Divisi::getEnumValues('status'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Divisi $user)
    {
        $validated = $request->validated();
        $user->update($validated); // update data
        // $userOld = $user->toArray(); // ambil data lama sebelum update
        // app(LoguserChangesService::class)->logChanges($userOld, $validated);

        return redirect()->back()->with('message', 'Data Divisi Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Divisi $user)
    {
        $user->delete();
        return redirect()->back()->with('message', 'Data Divisi Berhasil DiHapus!');
    }
}
