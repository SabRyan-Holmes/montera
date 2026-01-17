<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class JabatanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Ambil parameter ID dari route jika sedang Edit
        $jabatan = $this->route('jabatan');
        $jabatanId = $jabatan ? $jabatan->id : null;

        return [
            'nama_jabatan' => ['required', 'string', 'max:255'],

            // Kode Jabatan harus unik, kecuali milik diri sendiri saat update
            'kode_jabatan' => [
                'required',
                'string',
                'max:10',
                'uppercase', // Opsional: memaksa huruf besar
                Rule::unique('jabatans', 'kode_jabatan')->ignore($jabatanId)
            ],

            'level_otoritas' => ['required', 'integer', 'min:0'],

            'deskripsi_tugas' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'kode_jabatan.unique' => 'Kode Jabatan sudah digunakan.',
            'level_otoritas.integer' => 'Level otoritas harus berupa angka.',
        ];
    }
}
