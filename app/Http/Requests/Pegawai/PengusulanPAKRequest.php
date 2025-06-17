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

    protected function prepareForValidation(): void
    {
        if ($this->has('periode_mulai')) {
            $this->merge([
                'periode_mulai' => $this->periode_mulai . '-01',
            ]);
        }

        if ($this->has('periode_berakhir')) {
            $this->merge([
                'periode_berakhir' => $this->periode_berakhir . '-01',
            ]);
        }
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tujuan' => 'string|max:150',
            'periode_mulai' => 'required|date|date_format:Y-m-d',
            'periode_berakhir' => 'required|date|date_format:Y-m-d|after_or_equal:periode_mulai',
            'ak_terakhir' => 'required|decimal:0,5000',
            'ak_diajukan' => 'required|decimal:0,5000',
            'is_penilaian_pdd' => 'required|boolean',
            'dokumen_utama_path' => 'required|file|mimes:pdf|max:2048',
            'dokumen_pendukung_path' => 'required_if:is_penilaian_pdd,true|file|mimes:pdf|max:2048',
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
            'date' => ':attribute harus berupa tanggal.',
            'unique' => ':attribute sudah ada, silakan gunakan id yang lain.',
            'dokumen_pendukung_path.required_if' => 'Dokumen penilaian pendidikan wajib diisi jika memilih mengajukan penilaian pendidikan.',
        ];
    }

    public function attributes(): array
    {
        return [
            'periode_mulai' => 'periode mulai',
            'periode_berakhir' => 'periode berakhir',
            'ak_terakhir' => 'jumlah angka kredit terakhir',
            'ak_diajukan' => 'jumlah angka kredit diajukan',
            'is_penilaian_pdd' => 'pengajuan penilaian pendidikan terbaru',
            'dokumen_utama_path' => 'dokumen penilaian kinerja',
            'dokumen_pendukung_path' => 'dokumen penilaian pendidikan',
        ];
    }
}
