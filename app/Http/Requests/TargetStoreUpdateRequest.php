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
        $isAdmin = $user->isAdmin;
        $isAdminOrKacab = $user->isAdmin || ($user->hasRole('Kepala Cabang') ?? false);
        return [
            // Validasi Relasi
            'user_id' => [
                $isAdminOrKacab ? 'nullable' : 'required',
                $isAdminOrKacab ? 'required_without:divisi_id' : '',
                'exists:users,id'
            ],
            'divisi_id' => [
                // Jika Admin/Kacab: Wajib diisi HANYA JIKA user_id kosong
                // Jika Supervisor: Boleh kosong (nullable)
                $isAdminOrKacab ? 'required_without:user_id' : 'nullable',
                'nullable',
                'exists:divisis,id' // Pastikan nama tabel benar
            ],
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
            'user_id' => 'Pegawai Target',
            'divisi_id' => 'Divisi Target',
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
            // General
            'required' => ':attribute wajib diisi.',
            'numeric'  => ':attribute harus berupa angka.',
            'date'     => 'Format :attribute tidak valid.',

            // Logic Silang (Pesan ini yang akan muncul kalau user_id & divisi_id kosong dua-duanya)
            'user_id.required_without'   => 'Mohon pilih salah satu: Target untuk Pegawai atau Target untuk Divisi.',
            'divisi_id.required_without' => 'Mohon pilih salah satu: Target untuk Divisi atau Target untuk Pegawai.',

            // Logic Supervisor
            'supervisor_id.required' => 'Sebagai Administrator, Anda wajib menentukan Supervisor untuk target ini.',

            // Logic Tanggal
            'tanggal_selesai.after_or_equal'     => 'Tanggal selesai tidak boleh lebih dulu dari tanggal mulai.',
            'deadline_pencapaian.after_or_equal' => 'Deadline tidak boleh lebih dulu dari tanggal mulai.',
        ];
    }
}
