<?php

namespace App\Http\Requests;

use Illuminate\Container\Attributes\Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TargetStoreUpdateRequest extends FormRequest
{
    /**
     * Tentukan siapa yang boleh akses request ini.
     */
    public function authorize(): bool
    {
        // Asumsi sudah diautentikasi lewat middleware di route
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */

    public function rules(): array

    {
        // 2. Gunakan 'user()' helper bawaan request atau Auth facade dengan null safety (?->)
        $user = $this->user();

        // Cek jabatan dengan aman. Jika jabatan null, anggap bukan administrator.
        $isAdmin = $user->jabatan?->nama_jabatan === "Administrator";
        return [
            // Validasi Relasi
            'user_id' => ['required', 'exists:users,id'],
            'supervisor_id' => [
                // Jika user punya akses 'manage all' (admin), wajib ada di request.
                // Jika tidak (supervisor biasa), boleh nullable (nanti diisi otomatis di controller store/update).
                $isAdmin ? 'required' : 'nullable',
                'exists:users,id'
            ],

            'produk_id' => ['nullable', 'exists:produks,id'], // Boleh null jika target umum (non-produk)

            // Validasi Angka & Enum
            'nilai_target' => ['required', 'numeric', 'min:0'],
            'tipe_target' => ['required', Rule::in(['nominal', 'noa'])],
            'periode' => ['required', Rule::in(['mingguan', 'bulanan', 'tahunan'])],
            'tahun' => ['required', 'integer', 'digits:4', 'min:2020'],

            // Validasi Tanggal (Logic Penting)
            'tanggal_mulai' => ['required', 'date'],
            'tanggal_selesai' => ['required', 'date', 'after_or_equal:tanggal_mulai'],
            'deadline_pencapaian' => ['required', 'date', 'after_or_equal:tanggal_mulai'],

            // Opsional
            'keterangan_tambahan' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Custom attributes (untuk mengganti nama field di pesan error).
     */
    public function attributes(): array
    {
        return [
            'user_id' => 'Pegawai',
            'supervisor_id' => 'Supervisor',
            'produk_id' => 'Produk',
            'nilai_target' => 'Nilai Target',
            'tipe_target' => 'Tipe Target',
            'periode' => 'Periode',
            'tahun' => 'Tahun',
            'tanggal_mulai' => 'Tanggal Mulai',
            'tanggal_selesai' => 'Tanggal Selesai',
            'deadline_pencapaian' => 'Deadline Pencapaian',
            'keterangan_tambahan' => 'Keterangan',
        ];
    }

    /**
     * Custom error messages (Bahasa Indonesia).
     */
    public function messages(): array
    {
        return [
            'required' => ':attribute wajib diisi.',
            'exists' => 'Data :attribute yang dipilih tidak valid.',
            'numeric' => ':attribute harus berupa angka.',
            'min' => ':attribute tidak boleh kurang dari :min.',
            'in' => 'Pilihan :attribute tidak valid.',
            'date' => 'Format :attribute tidak valid.',
            'digits' => ':attribute harus terdiri dari :digits digit.',

            // Custom logic tanggal
            'tanggal_selesai.after_or_equal' => 'Tanggal selesai tidak boleh sebelum tanggal mulai.',
            'deadline_pencapaian.after_or_equal' => 'Deadline tidak boleh sebelum tanggal mulai.',
        ];
    }
}
