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
            'jabatan' => 'required|string|max:25|min:1',
            'nilai' => 'required|numeric|max:100',
        ];
    }
    public function messages(): array
    {
        return [
            'required' => ':attribute wajib diisi.',
            'string' => ':attribute harus berupa teks.',
            'numeric' => ':attribute harus berupa angka.',
            // 'double' => ':attribute harus berupa bilangan berkoma.',
            'max' => ':attribute maksimal :max karakter.',
            'min' => ':attribute minimal :min karakter.',
            'in' => ':attribute harus salah satu dari :values.',
            'unique' => ':attribute sudah ada, silakan gunakan :attribute yang lain.',
        ];
    }

    public function attributes(): array
    {
        return [
            'jabatan' => 'Jabatan',
            'nilai' => 'Nilai',
        ];
    }
}
