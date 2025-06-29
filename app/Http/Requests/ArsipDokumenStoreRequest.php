<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArsipDokumenStoreRequest extends FormRequest
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
            'user_nip' => 'nullable|string',
            'folder_name' => 'required|string|max:70',
            'title' => 'required|string|max:150',
            'approved_pak_path' => 'required|string|max:150',
            'tanggal_divalidasi' => 'required|date'
        ];
    }
}
