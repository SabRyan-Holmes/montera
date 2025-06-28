<?php

namespace App\Http\Controllers\DivisiSDM;

use App\Http\Controllers\Controller;
use App\Models\AturanPAK;
use App\Models\Koefisien;
use App\Services\AturanPAKService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        $aturan = AturanPAK::where('name', $request->updateName)->firstOrFail();

        if ($request->isTebusan) {
            $targetId = $request->target_id;

            $defaultConfig = $aturan->default_config ?: [];
            if (!is_array($defaultConfig)) {
                $defaultConfig = json_decode($defaultConfig, true);
            }

            $updatedConfig = array_map(function ($item) use ($targetId) {
                if ($item['id'] == $targetId) {
                    $item['checked'] = !$item['checked'];
                }
                return $item;
            }, $defaultConfig);

            $aturan->update(['default_config' => $updatedConfig]);
        } else {
            $aturan->update([
                'default_config' => $request->value
            ]);
        }

        return redirect()->back()->with([
            'toast' => "Berhasil Mengupdate Default {$request->updateName}.",
            'toast_id' => uniqid(),
        ]);
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

    public function setPenandaTangan(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|integer',
            'nama' => 'required|string|max:150',
            'nip' => 'required|string|max:150',
            'ttd_validasi' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Ambil data AturanPAK dengan name 'Penanda Tangan'
        $aturan = AturanPAK::where('name', 'Penanda Tangan')->first();

        if (!$aturan) {
            return back()->withErrors(['msg' => 'Konfigurasi penanda tangan tidak ditemukan.']);
        }

        $list = collect($aturan->value); // Ambil array value
        $id = $validated['id'];

        // Cari index elemen berdasarkan ID
        $index = $list->search(fn($item) => $item['id'] == $id);

        if ($index === false) {
            return back()->withErrors(['id' => 'Penanda tangan tidak ditemukan.']);
        }

        // Ambil elemen lama
        $penandaTangan = $list[$index];

        // Hapus tanda tangan lama jika file baru diupload kecuali default.png
        if (
            $request->hasFile('signature_path') &&
            !empty($penandaTangan['signature_path']) &&
            basename($penandaTangan['signature_path']) !== 'default.png'
        ) {
            Storage::disk('public')->delete($penandaTangan['signature_path']);
        }


        // Proses upload jika ada
        if ($request->hasFile('signature_path')) {
            $file = $request->file('signature_path');
            $fileName = $validated['nip'] . '_ttd_' . now()->format('Ymd_His') . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('validasi_pimpinan', $fileName, 'public');
            $penandaTangan['signature_path'] = $path;
        }

        // Update nama dan nip juga
        $penandaTangan['nama'] = $validated['nama'];
        $penandaTangan['nip'] = $validated['nip'];
        $penandaTangan['updated_at'] = now()->toDateTimeString();

        // Replace item lama dengan item baru di index yang sama
        $list[$index] = $penandaTangan;

        // Simpan perubahan
        $aturan->update([
            'value' => $list->toArray(),
        ]);

        return back()->with('message', 'Penanda tangan berhasil diperbarui.');
    }
}
