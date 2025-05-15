<?php

namespace App\Http\Requests\Pegawai;

use Illuminate\Foundation\Http\FormRequest;

class PengusulanPAKRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'jabatan' => 'nullable|string|max:40',
            'periode_mulai' => 'required',
            'periode_berakhir' => 'required|string|max:50',
            'jumlah_ak_terakhir' => 'required|doubleval',
            'jumlah_ak_diajukan' => 'required|doubleval',
            'uraian_tugas' => 'nullable|string|max:1000',
            'dokumen_pendukung_path' => 'nullable|file|max:2000',
        ];
    }
}
