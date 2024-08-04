<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PegawaiStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // return Auth::user() ? true : false;
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
            'Nama' => ['required', 'string', 'max:60', 'min:1'],
            'NIP/NRP' => ['required', 'numeric', 'digits_between:2,18'  ],
            'Nomor Seri Karpeg' => ['required', 'string', 'max:15'],
            'Pangkat/Golongan Ruangan/TMT' => ['required', 'string', 'max:40'],
            'Tempat/Tanggal Lahir' => ['required', 'string', 'max:50'],
            'Jenis Kelamin' => ['required', 'string', 'in:PRIA,WANITA'],
            'Pendidikan' => ['required', 'string', 'max:50'],
            'Jabatan/TMT' => ['required', 'string', 'max:50'],
            'Masa Kerja Golongan' => ['required', 'string', 'max:40'],
            'Unit Kerja' => ['required', 'string', 'max:40'],
            'Daerah' => ['required', 'string', 'max:40'],
        ];
    }
}
