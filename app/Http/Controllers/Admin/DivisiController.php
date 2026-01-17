<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\DivisiRequest;
use App\Models\Divisi;
use Inertia\Inertia;

class DivisiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subTitle = "";
        $params = request()->all(['search']);
        $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('Administrator/Divisi/Index', [
            "title" => "Data Divisi",
            "subTitle"  => $subTitle,
            "divisis"    => Divisi::filter($params)->latest()->paginate(10)->withQueryString(),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byLevel"     => $params['byLevel'] ?? "", //level/lokasi lantai
            ],

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Administrator/Divisi/CreateEdit', [
            'title' => "Tambah Data Divisi",
            'isEdit' => false,
        ]);
    }

    /**
     * Menyimpan data baru.
     */
    public function store(DivisiRequest $request)
    {
        Divisi::create($request->validated());

        return redirect()->route('admin.divisi.index')
            ->with('success', 'Divisi berhasil ditambahkan.');
    }

    /**
     * Menampilkan form edit.
     */
    public function edit(Divisi $divisi)
    {
        return Inertia::render('Administrator/Divisi/CreateEdit', [
            'title' => "Edit Data Divisi",
            'divisi' => $divisi,
            'isEdit' => true,
        ]);
    }

    /**
     * Update data yang ada.
     */
    public function update(DivisiRequest $request, Divisi $divisi)
    {
        $divisi->update($request->validated());

        return redirect()->route('admin.divisi.index')
            ->with('success', 'Data Divisi berhasil diperbarui.');
    }

    /**
     * Menghapus data.
     */
    public function destroy(Divisi $divisi)
    {
        $divisi->delete();

        return redirect()->route('admin.divisi.index')
            ->with('success', 'Divisi berhasil dihapus.');
    }
}
