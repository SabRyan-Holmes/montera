<?php

namespace App\Http\Controllers\DivisiSDM;

use App\Http\Controllers\Controller;
use App\Models\AturanPAK;
use App\Models\Koefisien;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AturanPAKController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // IMPORTANT! Don't Touch this code !
        $aturan_pak = [
            'penandaTangan' => AturanPAK::where('name', 'Penanda Tangan')->first(['value', 'default_config']),
            'koefisienPertahun' => AturanPAK::where('name', 'Koefisien Per Tahun')->first()->value,
            'predikatPresentase' => AturanPAK::where('name', 'Predikat & Presentase')->first()->value,
            'pangkat' => AturanPAK::where('name', 'Angka Minimal Pangkat')->first(['value', 'default_config']),
            'jabatan' => AturanPAK::where('name', 'Angka Minimal Jabatan')->first(['value', 'default_config']),
            'tebusanKonversi' => AturanPAK::where('name', 'Tebusan Konversi')->first()->value,
            'tebusanAkumulasi' => AturanPAK::where('name', 'Tebusan Akumulasi')->first()->value,
            'tebusanPenetapan' => AturanPAK::where('name', 'Tebusan Penetapan')->first()->value,
            'kesimpulan' => AturanPAK::where('name', 'Kesimpulan')->first(['value', 'default_config']),
            'rumus' => AturanPAK::where('name', 'Rumus')->first()->value,
        ];

        return Inertia::render('KelolaAturanPAK/Index', [
            'title' => 'Kelola Aturan PAK',
            'aturanPAK' => $aturan_pak,
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
        if ($request->updateName && $request->value) {
            $aturan = AturanPAK::where('name', $request->updateName)->first();

            // Update database
            $aturan->update([
                'default_config' => $request->value
            ]);
            return redirect()->back()->with('message', 'Berhasil Mengupdate Default ' . $request->updateName . '!');
        } else return redirect()->back()->withErrors('Gagal ');

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
