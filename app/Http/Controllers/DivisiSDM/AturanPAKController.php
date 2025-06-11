<?php

namespace App\Http\Controllers\DivisiSDM;

use App\Http\Controllers\Controller;
use App\Models\AturanPAK;
use App\Models\Koefisien;
use App\Services\AturanPAKService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AturanPAKController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('AturanPAK/Index', [
            'title' => 'Aturan PAK',
            'aturanPAK' => AturanPAKService::get(),
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

    //atau lebih tepatny update(karna tidak nambah id pada Aturan PAK)
    public function store(Request $request)
    {
        if ($request->storeName) {
            $aturan = AturanPAK::where('name', $request->storeName)->first();

            // Ambil value dan pastikan sebagai array
            $currentValue = is_array($aturan->value)
                ? $aturan->value
                : json_decode($aturan->value, true);

            // Cari ID terakhir
            $lastId = collect($currentValue)->max('id') ?? 0;

            // Data baru - ambil semua field dari request->datas secara dinamis
            $newData = [
                'id' => $lastId + 1,
                'updated_at' => now()->toDateTimeString()
            ];

            // Loop melalui semua field dalam datas
            foreach ($request->datas as $field => $value) {
                // Konversi nilai ke tipe yang sesuai
                $newData[$field] = is_numeric($value) ? (float)$value : $value;
            }

            // Gabungkan data
            $mergedData = [...$currentValue, $newData];

            // Update database
            $aturan->update([
                'value' => $mergedData
            ]);
        }

        return redirect()->back()->with('message', 'Berhasil Menyimpan Data');
    }

    /**
     * Display the specified resource.
     */
    public function show(AturanPAK $aturanPAK)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AturanPAK $aturanPAK)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AturanPAK $aturanPAK)
    {
        if ($request->updateName) {
            $aturan = AturanPAK::where('name', $request->updateName)->first();

            // Get current value and ensure it's an array
            $currentValue = is_array($aturan->value)
                ? $aturan->value
                : json_decode($aturan->value, true);

            // Find and update the specific item by ID
            $updatedValue = array_map(function ($item) use ($request) {
                if ($item['id'] == $request->id) {
                    // Update all fields from request->datas
                    foreach ($request->datas as $field => $value) {
                        // Convert numeric values to float
                        $item[$field] = is_numeric($value) ? (float)$value : $value;
                    }
                    // Update timestamp
                    $item['updated_at'] = now()->toDateTimeString();
                }
                return $item;
            }, $currentValue);

            // Update database
            $aturan->update([
                'value' => $updatedValue
            ]);
        }

        return redirect()->back()->with('message', 'Berhasil Mengupdate Data!');
    }

    public function set_default_config(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'updateName' => 'required|string',
            'value' => 'required'
        ]);

        // TODO buaat pengecekan dan logika lain jika updateName mengandung kata 'Tebusan'
        // Handle khusus tebusan
        $aturan = AturanPAK::where('name', $request->updateName)->firstOrFail();
        if (str_contains($request->updateName, 'Tebusan')) {
            $input = json_decode($request->value, true);
            $currentConfig = $aturan->default_config ?: [];

            // Konversi ke array jika berupa JSON string
            $currentConfig = is_array($currentConfig) ? $currentConfig : json_decode($currentConfig, true);

            // Toggle status
            $updatedConfig = array_map(function($item) use ($input) {
                if ($item['id'] == $input['id']) {
                    $item['checked'] = !$item['checked'];
                }
                return $item;
            }, $currentConfig);

            $aturan->update(['default_config' => $updatedConfig]);
            redirect()->back();
            // return response()->json([
            //     'success' => true,
            //     'message' => 'Status tebusan berhasil diupdate',
            //     'data' => $updatedConfig
            // ]);
        } else
            // Update database
            $aturan->update([
                'default_config' => $request->value
            ]);
            return redirect()->back()->with('message', 'Berhasil Mengupdate Default ' . $request->updateName . '!');
        // } else return redirect()->back()->withErrors('Gagal ');
    }

    // public function set_default_config(Request $request)
    // {
    //     $request->validate([
    //         'updateName' => 'required|string',
    //         'value' => 'required'
    //     ]);

    //     $aturan = AturanPAK::where('name', $request->updateName)->firstOrFail();

    //     // Handle khusus tebusan
    //     if (str_contains($request->updateName, 'Tebusan')) {
    //         $input = json_decode($request->value, true);
    //         $currentConfig = $aturan->default_config ?: [];

    //         // Konversi ke array jika berupa JSON string
    //         $currentConfig = is_array($currentConfig) ? $currentConfig : json_decode($currentConfig, true);

    //         // Toggle status
    //         $updatedConfig = array_map(function($item) use ($input) {
    //             if ($item['id'] == $input['id']) {
    //                 $item['checked'] = !$item['checked'];
    //             }
    //             return $item;
    //         }, $currentConfig);

    //         $aturan->update(['default_config' => $updatedConfig]);

    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Status tebusan berhasil diupdate',
    //             'data' => $updatedConfig
    //         ]);
    //     }

    //     // Handle normal (integer)
    //     $aturan->update([
    //         'default_config' => $request->value
    //     ]);

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Default config berhasil diupdate'
    //     ]);
    // }

    protected function handleTebusanConfig($currentConfig, $selectedId, $aturanPAK)
    {
        // Convert to array jika berupa JSON string
        $config = is_array($currentConfig) ? $currentConfig : json_decode($currentConfig, true);

        // Dapatkan semua id yang valid dari value AturanPAK
        $validIds = collect($aturanPAK->value)->pluck('id')->toArray();

        // Inisialisasi config jika kosong atau tidak sesuai
        if (empty($config) || count($config) !== count($validIds)) {
            $config = array_map(function ($id) {
                return ['id' => $id, 'checked' => false];
            }, $validIds);
        }
        // Toggle status checked untuk id yang dipilih

        // Toggle status checked untuk id yang dipilih
        foreach ($config as &$item) {
            if ($item['id'] == $selectedId) {
                $item['checked'] = !$item['checked'];
                break;
            }
        }
        // $updated = false;
        // foreach ($config as &$item) {
        //     if ($item['id'] == $selectedId) {
        //         $item['checked'] = !$item['checked']; // Toggle true/false
        //         $updated = true;
        //     }
        // }

        // // Jika ID baru, tambahkan entry
        // if (!$updated) {
        //     $config[] = [
        //         'id' => $selectedId,
        //         'checked' => true
        //     ];
        // }

        return $config;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AturanPAK $aturanPAK, Request $request)
    {
        // dd($aturanPAK, $request);
        $aturan = AturanPAK::where('name', $request->name)->first();

        // Ambil value (pastikan sebagai array)
        $currentValue = is_array($aturan->value)
            ? $aturan->value
            : json_decode($aturan->value, true);

        // Filter data: hapus item dengan ID yang sesuai
        $updatedValue = array_filter($currentValue, fn($item) => $item['id'] != $request->id);

        // Update database
        $aturan->update([
            'value' => array_values($updatedValue) // Reset index array
        ]);

        return redirect()->back()->with('message', 'Data Berhasil dihapus!');
    }



    public function store_or_update(Request $request)
    {
        if ($request->storeName) {
            $aturan = AturanPAK::where('name', $request->storeName)->first();

            // Ambil value dan pastikan sebagai array
            $currentValue = is_array($aturan->value)
                ? $aturan->value
                : json_decode($aturan->value, true);

            // Cari ID terakhir
            $lastId = collect($currentValue)->max('id') ?? 0;

            // Data baru - ambil semua field dari request->datas secara dinamis
            $newData = [
                'id' => $lastId + 1,
                'updated_at' => now()->toDateTimeString()
            ];

            // Loop melalui semua field dalam datas
            foreach ($request->datas as $field => $value) {
                // Konversi nilai ke tipe yang sesuai
                $newData[$field] = is_numeric($value) ? (float)$value : $value;
            }

            // Gabungkan data
            $mergedData = [...$currentValue, $newData];

            // Update database
            $aturan->update([
                'value' => $mergedData
            ]);
        }

        return redirect()->back()->with('message', 'Berhasil Menyimpan Data');
    }
}
