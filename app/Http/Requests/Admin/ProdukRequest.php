<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProdukRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $produk = $this->route('produk');
        $produkId = $produk ? $produk->id : null;

        return [
            'nama_produk' => ['required', 'string', 'max:100'],

            'kode_produk' => [
                'required',
                'string',
                'max:20',
                'uppercase',
                Rule::unique('produks', 'kode_produk')->ignore($produkId)
            ],

            'kategori_produk' => ['required', 'string', 'max:50'],
            'label_input' => ['required', 'string', 'max:50'], // ex: Nominal, Jumlah Akun
            'satuan' => ['required', 'string', 'max:20'], // ex: Rupiah, Unit

            'bobot_frontliner' => ['required', 'integer', 'min:0'],
            'bobot_kredit' => ['required', 'integer', 'min:0'],

            'status' => ['required', 'in:tersedia,discontinued'],
        ];
    }

    public function messages(): array
    {
        return [
            'kode_produk.unique' => 'Kode Produk sudah digunakan.',
            'bobot_frontliner.integer' => 'Bobot harus berupa angka bulat.',
        ];
    }
}
