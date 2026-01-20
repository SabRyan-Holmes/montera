<?php

namespace App\Http\Requests\Shared;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AkuisisiRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $user = Auth::user();
        $isAdmin = $user->jabatan->nama_jabatan === 'Administrator'; // Sesuaikan logic admin kamu
$akuisisiId = $this->route('akuisisi') ? $this->route('akuisisi')->id : null;
        $rules = [
            'produk_id' => ['required', 'exists:produks,id'],
            'no_transaksi' => [
                'required',
                'string',
                'max:30',
                // Cek Unik: Abaikan ID ini jika sedang update
                // Rule::unique('akuisisis', 'no_transaksi')->ignore($akuisisiId),
            ],
            'nama_nasabah' => ['required', 'string', 'max:255'],
            'no_identitas_nasabah' => ['nullable', 'string', 'max:50'],
            'nominal_realisasi' => ['required', 'numeric', 'min:0'],
            'tanggal_akuisisi' => ['required', 'date'],
            'supervisor_id' => ['required', 'exists:users,id'],
            'catatan_revisi' => ['nullable', 'string'],
        ];

        // LOGIC ADMIN: Wajib pilih pegawai
        if ($isAdmin) {
            $rules['user_id'] = ['required', 'exists:users,id'];
        }

        // LOGIC FILE UPLOAD
        if ($this->isMethod('post')) {
            $rules['lampiran_bukti'] = ['nullable', 'file', 'mimes:pdf', 'max:2048'];
        } else {
            $rules['lampiran_bukti'] = ['nullable', 'file', 'mimes:pdf', 'max:2048'];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'Pegawai pemilik akuisisi wajib dipilih (Mode Admin).',
            'produk_id.required' => 'Produk wajib dipilih.',
            'nominal_realisasi.required' => 'Nominal wajib diisi.',
            'supervisor_id.required' => 'Supervisor wajib dipilih.',
        ];
    }
}
