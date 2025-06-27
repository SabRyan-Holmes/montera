<?php

namespace App\Http\Controllers\Shared;

use App\Helpers\GetSubtitle;
use App\Http\Controllers\Controller;
use App\Models\LogAktivitas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use function Laravel\Prompts\search;

class LogAktivitasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $logAktivitas = LogAktivitas::latest();
        $subTitle = GetSubtitle::getSubtitle(
            byJenisAktivitas: request('byJenisAktivitas'),
            byRole: request('byRole'),
            search: request('search')
        );

        return Inertia::render('LogAktivitas/Index', [
            "title" => "Log Aktivitas ",
            "subTitle" => $subTitle,
            "logAktivitas" => $logAktivitas->filter(request(['search', 'byJenisAktivitas', 'byRole']))->paginate(10),
            'byRoleReq' => request('byRole'),
            'byJenisReq' => request('byJenisAktivitas'),
            'searchReq' => request('search'),
            'aktivitasList' => LogAktivitas::distinct()->pluck('aktivitas')->toArray()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(LogAktivitas $logAktivitas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LogAktivitas $logAktivitas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LogAktivitas $logAktivitas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LogAktivitas $logAktivitas)
    {
        //
    }
}
