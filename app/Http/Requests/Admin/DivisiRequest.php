<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DivisiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Ambil ID Divisi jika sedang mode update (untuk ignore unique)
        $divisi = $this->route('divisi');
        $divisiId = $divisi ? $divisi->id : null;

        return [
            'nama_divisi' => ['required', 'string', 'max:255'],

            'kode_divisi' => [
                'required',
                'string',
                'max:10',
                'uppercase',
                Rule::unique('divisis', 'kode_divisi')->ignore($divisiId)
            ],

            'main_divisi' => ['required', 'in:Front Liner,kredit'], // Sesuai Enum migrasi

            'kepala_divisi' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'kode_divisi.unique' => 'Kode Divisi sudah digunakan.',
            'main_divisi.in' => 'Pilihan Main Divisi tidak valid.',
        ];
    }
}
