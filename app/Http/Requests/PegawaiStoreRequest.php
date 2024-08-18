<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PegawaiStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'Nama' => 'required|string|max:60|min:1',
            'NIP/NRP' => 'required|string|max:18',
            'Nomor Seri Karpeg' => 'required|string|max:40',
            'Pangkat/Golongan Ruangan/TMT' => 'required|string|max:150',
            'Tempat/Tanggal Lahir' => 'required|string|max:50',
            'Jenis Kelamin' => 'required|string|in:PRIA,WANITA',
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
            'min' => ':attribute minimal :min karakter.',
            'in' => ':attribute harus salah satu dari :values.',
        ];
    }

    public function attributes(): array
    {
        return [
            'Nama' => 'Nama',
            'NIP/NRP' => 'NIP/NRP',
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
