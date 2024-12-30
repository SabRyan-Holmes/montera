<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KoefisienStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'jabatan' => 'required|string|max:15|min:1',
            'nilai' => 'required|double||max:100',
        ];
    }
    public function messages(): array
    {
        return [
            'required' => ':attribute wajib diisi.',
            'string' => ':attribute harus berupa teks.',
            'max' => ':attribute maksimal :max karakter.',
            'min' => ':attribute minimal :min karakter.',
            'in' => ':attribute harus salah satu dari :values.',
            'unique' => ':attribute sudah ada, silakan gunakan NIP yang lain.',
        ];
    }

    public function attributes(): array
    {
        return [
            'nama' => 'Nama',
            'NIP' => 'NIP',
            'Nomor Seri Karpeg' => 'Nomor Seri Karpeg',
            'Pangkat/Golongan Ruangan/TMT' => 'Pangkat/Golongan Ruangan/TMT',
            'Tempat/Tanggal Lahir' => 'Tempat/Tanggal Lahir',
            'Jenis Kelamin' => 'Jenis Kelamin',
            'Pendidikan' => 'Pendidikan',
            'Jabatan/TMT' => 'Jabatan/TMT',
            'Masa Kerja Golongan' => 'Masa Kerja Golongan',
            'Unit Kerja' => 'Unit Kerja',
            'Daerah' => 'Daerah',
        ];
    }
}
