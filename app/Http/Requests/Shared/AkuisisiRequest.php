<?php

namespace App\Http\Requests\Shared;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use App\Models\Produk;
use App\Models\Akuisisi;

class AkuisisiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $user = Auth::user();
        $isAdmin = $user->jabatan && $user->jabatan->nama_jabatan === 'Administrator';
        $akuisisiId = $this->route('akuisisi') ? $this->route('akuisisi')->id : null;

        // Daftar Produk yang BOLEH Duplikat (Whitelist)
        // Tabungan Reguler & Online sudah dihapus dari sini, jadi akan kena validasi ketat
        $allowedDuplicates = [
            'EDC',
            'LIVIN/MOBILE BANKING',
            'LIVIN MERCHANT/QRIS',
            'KOPRA BANKING PERUSAHAAN',
        ];

        $rules = [
            'produk_id' => ['required', 'exists:produks,id'],
            'no_transaksi' => [
                'required',
                'string',
                'max:30',
                Rule::unique('akuisisis', 'no_transaksi')->ignore($akuisisiId),
            ],
            'nama_nasabah' => ['required', 'string', 'max:255'],

            // --- VALIDASI CUSTOM NOMOR IDENTITAS (REKENING/KTP/POLIS) ---
            'no_identitas_nasabah' => [
                'nullable',
                'string',
                'max:50',
                function ($attribute, $value, $fail) use ($allowedDuplicates, $akuisisiId) {
                    // 1. Ambil Produk
                    $produkId = $this->input('produk_id');
                    $produk = Produk::find($produkId);

                    if ($produk) {
                        // 2. Cek apakah produk ini ada di Whitelist?
                        // Karena Tabungan Reguler/Online sudah dihapus dari array $allowedDuplicates,
                        // maka dia akan masuk ke blok IF ini (Kena Validasi Ketat).
                        if (!in_array(strtoupper($produk->nama_produk), $allowedDuplicates)) {

                            // 3. LOGIC KETAT: Cek Nomor Identitas saja! (Hapus where nama_nasabah)
                            $exists = Akuisisi::where('no_identitas_nasabah', $value)
                                ->where('id', '!=', $akuisisiId) // Abaikan diri sendiri saat edit
                                ->where('status_verifikasi', '!=', 'rejected') // Abaikan data yang sudah direject (boleh diajukan ulang)
                                ->exists();

                            if ($exists) {
                                // Ambil info siapa yang input (opsional, biar pesan error jelas)
                                $existingData = Akuisisi::where('no_identitas_nasabah', $value)
                                    ->where('id', '!=', $akuisisiId)
                                    ->where('status_verifikasi', '!=', 'rejected')
                                    ->with('pegawai')
                                    ->first();

                                $namaPemilik = $existingData && $existingData->pegawai ? $existingData->pegawai->name : 'User Lain';

                                // TOLAK!
                                $fail("Pengajuan Ditolak! Nomor Identitas/Rekening '{$value}' sudah terdaftar aktif di sistem (oleh: {$namaPemilik}). Produk '{$produk->nama_produk}' tidak mengizinkan nomor ganda.");
                            }
                        }
                    }
                },
            ],

            'nominal_realisasi' => ['required', 'numeric', 'min:0'],
            'tanggal_akuisisi' => ['required', 'date'],
            'supervisor_id' => ['required', 'exists:users,id'],
            'catatan_revisi' => ['nullable', 'string'],

            'no_rek_ops' => [
                // 1. Logic Penentu: Kapan dia WAJIB diisi?
                Rule::requiredIf(function () {
                    $produkId = $this->input('produk_id');
                    $produk = Produk::find($produkId);
                    $wajibOps = ['EDC', 'LIVIN MERCHANT/QRIS', 'KOPRA BANKING PERUSAHAAN'];

                    // Return TRUE jika produk termasuk yang wajib isi
                    return $produk && in_array(strtoupper($produk->nama_produk), $wajibOps);
                }),

                // 2. Logic Penyelamat: Kalau kondisi diatas FALSE, maka dia boleh NULL
                'nullable',

                // 3. Validasi Tipe Data (Hanya jalan kalau tidak null)
                'string',
                'max:50',
            ],
        ];

        if ($isAdmin) {
            $rules['user_id'] = ['required', 'exists:users,id'];
        }

        $rules['lampiran_bukti'] = ['nullable', 'file', 'mimes:pdf', 'max:2048'];

        return $rules;
    }

    // Messages tetap sama seperti sebelumnya...
    public function messages(): array
    {
        return [
            'user_id.required' => 'Pegawai pemilik akuisisi wajib dipilih (Mode Admin).',
            'produk_id.required' => 'Mohon pilih Jenis Produk terlebih dahulu.',
            'no_transaksi.required' => 'Nomor Transaksi wajib diisi.',
            'no_transaksi.unique' => 'Nomor Transaksi sudah ada.',
            'nama_nasabah.required' => 'Nama Nasabah wajib diisi.',
            'nominal_realisasi.required' => 'Nominal Realisasi wajib diisi.',
            'tanggal_akuisisi.required' => 'Tanggal Akuisisi wajib dipilih.',
            'supervisor_id.required' => 'Mohon pilih Supervisor.',
            'lampiran_bukti.mimes' => 'Lampiran harus format PDF.',
            'lampiran_bukti.max' => 'Ukuran lampiran maksimal 2MB.',
        ];
    }
}
