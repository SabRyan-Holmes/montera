<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdatePegawaiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'Nomor Seri Karpeg' => 'nullable|string|max:40',
            'Pangkat/Golongan Ruangan/TMT' => 'required|string|max:150',
            'Pendidikan' => 'required|string|max:50',
            'Jabatan/TMT' => 'required|string|max:100',
            'Masa Kerja Golongan' => 'required|string|max:40',
            'Unit Kerja' => 'required|string|max:40',
            'Daerah' => 'required|string|max:40',
        ];
    }

    public function messages(): array
    {
        return [
            'required' => ':attribute wajib diisi.',
            'string' => ':attribute harus berupa teks.',
            'max' => ':attribute maksimal :max karakter.',
        ];
    }

    public function attributes(): array
    {
        return [
            'Nomor Seri Karpeg' => 'Nomor Seri Karpeg',
            'Pangkat/Golongan Ruangan/TMT' => 'Pangkat/Golongan Ruangan/TMT',
            'Pendidikan' => 'Pendidikan',
            'Jabatan/TMT' => 'Jabatan/TMT',
            'Masa Kerja Golongan' => 'Masa Kerja Golongan',
            'Unit Kerja' => 'Unit Kerja',
            'Daerah' => 'Daerah',
        ];
    }
}
