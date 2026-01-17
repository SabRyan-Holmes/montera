<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\JabatanRequest;
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
        $params = request()->all(['search', 'byLevel']);
        $subTitle = GetSubtitle::getSubtitle(...$params);
        return Inertia::render('Administrator/Jabatan/Index', [
            "title" => "Data Jabatan",
            "subTitle"  => $subTitle,
            "canManage" => $this->user->role('Administrator'),
            "jabatans"    => Jabatan::filter($params)->latest()->paginate(10)->withQueryString(),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byLevel"     => $params['byLevel'] ?? "",
            ],
            "filtersList"   => [
                "level" => [0, 1, 2, 3]
            ],
        ]);
    }


    public function create()
    {
        return Inertia::render('Administrator/Jabatan/CreateEdit', [
            'title' => "Tambah Data Jabatan",
            'isEdit' => false,
        ]);
    }

    /**
     * Menyimpan data baru.
     */
    public function store(JabatanRequest $request)
    {
        Jabatan::create($request->validated());

        return redirect()->route('admin.jabatan.index')
            ->with('message', 'Jabatan berhasil ditambahkan.');
    }

    /**
     * Menampilkan form edit.
     */
    public function edit(Jabatan $jabatan)
    {
        return Inertia::render('Administrator/Jabatan/CreateEdit', [
            'title' => "Edit Data Jabatan",
            'jabatan' => $jabatan, // Data untuk diisi ke form
            'isEdit' => true,
        ]);
    }

    /**
     * Update data yang ada.
     */
    public function update(JabatanRequest $request, Jabatan $jabatan)
    {
        $jabatan->update($request->validated());

        return redirect()->route('admin.jabatan.index')
            ->with('message', 'Data Jabatan berhasil diperbarui.');
    }
    /**
     * Show the form for creating a new resource.
     */




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

    /**
     * Update the specified resource in storage.

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jabatan $jabatan)
    {
        $jabatan->delete();
        return redirect()->back()->with('message', 'Data Jabatan Berhasil DiHapus!');
    }
}
