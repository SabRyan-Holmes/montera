<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdatePegawaiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user() ? true : false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'Nomor Seri Karpeg' => ['nullable', 'string', 'max:15'],
            'Pangkat/Golongan Ruangan/TMT' => ['required', 'string', 'max:40'],
            'Pendidikan' => ['required', 'string', 'max:50'],
            'Jabatan/TMT' => ['required', 'string', 'max:50'],
            'Masa Kerja Golongan' => ['required', 'string', 'max:40'],
            'Unit Kerja' => ['required', 'string', 'max:40'],
            'Daerah' => ['required', 'string', 'max:40'],
        ];
    }
}
