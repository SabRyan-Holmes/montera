<?php

namespace App\Http\Controllers\Shared;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\Indikator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class IndikatorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index()
    {
        $subTitle = "";
        $params = request()->all(['search']);
        // $subTitle = GetSubtitle::getSubtitle(...$params);

        return Inertia::render('_Shared/Indikator/Index', [
            "title" => "Data Indikator",
            "subTitle"  => $subTitle,
            "indikators"    => Indikator::filter($params)->paginate(10)->withQueryString(),
            "filtersReq"   => [
                "search"     => $params['search'] ?? "",
                "byTargetMinimal" => $params['byTargetMinimal'] ?? "Semua Kategori",
                // "byStatus"   => $params['byStatus'] ?? "Semua Status",
            ],
            "filtersList"   => [
                "targetMinimal" => [30, 50, 70, 80, 90, 100],
                // "status"   => Indikator::getEnumValues('status'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('_Shared/Indikator/Create', [
            'title' => "Tambah Data Indikator",
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validated();
        Indikator::create($validated);
        return Redirect::route('shared.indikator.index')->with('message', 'Data Indikator Berhasil Ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Indikator $indikator)
    {
        return Inertia::render('_Shared/Indikator/Show', [
            'title' => 'Detail Data Indikator',
            'indikator' => $indikator
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Indikator $indikator)
    {
        return Inertia::render('_Shared/Indikator/Edit', [
            'title' => "Edit Data Indikator",
            'indikator' => $indikator,
            //  "filtersList"   => [
            //     "kategori" => Indikator::getEnumValues('kategori'),
            //     "status"   => Indikator::getEnumValues('status'),
            // ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Indikator $indikator)
    {
        $validated = $request->validated();

        $pegawaiOld = $indikator->toArray(); // ambil data lama sebelum update

        $indikator->update($validated); // update data

        // app(LogPegawaiChangesService::class)->logChanges($pegawaiOld, $validated);

        return redirect()->back()->with('message', 'Data Indikator Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Indikator $indikator)
    {
        $indikator->delete();
        return redirect()->back()->with('message', 'Data Indikator Berhasil DiHapus!');
    }
}
