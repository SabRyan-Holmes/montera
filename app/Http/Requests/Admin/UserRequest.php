<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Route;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // 1. Ambil ID User dari Route (Hanya ada saat mode Edit/Update)
        // Asumsi route resource kamu menggunakan parameter 'user' (admin/users/{user})
        $user = $this->route('user');

        // Jika $user object (binding model), ambil ID-nya. Jika null, berarti Create.
        $userId = $user ? $user->id : null;

        return [
            'name' => ['required', 'string', 'max:255'],

            // LOGIC UNIQUE: Cek unik di tabel users kolom nip, TAPI abaikan $userId saat update
            'nip' => [
                'required',
                'string',
                'max:18',
                Rule::unique('users', 'nip')->ignore($userId)
            ],

            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')->ignore($userId)
            ],

            'jabatan_id' => ['required', 'exists:jabatans,id'],
            'divisi_id'  => ['nullable', 'exists:divisis,id'],
            'status_aktif' => ['required', 'in:aktif,nonaktif'],

            // LOGIC PASSWORD:
            // Jika Method POST (Create) -> Wajib
            // Jika Method PUT/PATCH (Update) -> Boleh Kosong (Nullable)
            'password' => [
                $this->isMethod('post') ? 'required' : 'nullable',
                'string',
                'min:8'
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'nip.unique' => 'NIP sudah digunakan pegawai lain.',
            'email.unique' => 'Email sudah terdaftar.',
            'jabatan_id.required' => 'Jabatan wajib dipilih.',
            'password.min' => 'Password minimal 8 karakter.',
        ];
    }
}
