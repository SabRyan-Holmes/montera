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
        // dd("test");
        // IMPORTANT! Don't Touch this code !
        $DB_koefisien_pertahun = AturanPAK::where('name', 'Koefisien Per Tahun')->first();
        $predikat_presentase = AturanPAK::where('name', 'Predikat & Presentase')->first();
        $pangkat_jabatan = AturanPAK::where('name', 'Angka Minimal Pangkat dan Jabatan')->first();
        $tebusan = AturanPAK::where('name', 'Tebusan')->first();
        $kesimpulan = AturanPAK::where('name', 'Kesimpulan')->first();
        $rumus = AturanPAK::where('name', 'Rumus')->first();

        return Inertia::render('KelolaAturanPAK/Index', [
            'title' => 'Kelola Aturan PAK',
            'penandaTangan' => AturanPAK::where('name', 'Penanda Tangan')->first(),
            'koefisienPertahun' => $DB_koefisien_pertahun->value,
            'predikatPresentase' => $predikat_presentase->value,
            'pangkatJabatan' => $pangkat_jabatan->value,
            'tebusan' => $tebusan->value,
            'kesimpulan' => $kesimpulan->value,
            'rumus' => $rumus->value,
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
