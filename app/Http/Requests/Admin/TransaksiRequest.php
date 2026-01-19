<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TransaksiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Sesuaikan jika ada logic otorisasi khusus
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'produk_id' => ['required', 'exists:produks,id'],
            'akuisisi_id' => ['required', 'exists:akuisisis,id'],
            'tanggal_realisasi' => ['required', 'date'],
            'nilai_realisasi' => ['required', 'numeric', 'min:0'],
            'poin_didapat' => ['required', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'Pegawai wajib dipilih.',
            'produk_id.required' => 'Produk wajib dipilih.',
            'akuisisi_id.required' => 'Referensi Akuisisi wajib dipilih.',
            'tanggal_realisasi.required' => 'Tanggal realisasi wajib diisi.',
            'nilai_realisasi.required' => 'Nilai realisasi wajib diisi.',
            'poin_didapat.required' => 'Poin wajib diisi.',
        ];
    }
}
