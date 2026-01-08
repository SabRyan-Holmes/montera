<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProdukStoreUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // ambil ID produk dari route (admin.produk.update / edit)
        $produkId = $this->route('produk');

        return [
            'nama_produk' => ['required', 'string', 'max:255'],
            'kode_produk' => [
                'required',
                'string',
                'max:255',
                Rule::unique('produks', 'kode_produk')->ignore($produkId),
            ],
            'kategori' => ['required', 'in:tabungan,kredit,asuransi,retail,corporate,digital'],
            'harga_satuan' => ['required', 'numeric', 'min:0'],
            'komisi_poin' => ['nullable', 'numeric', 'min:0'],
            'deskripsi_produk' => ['nullable', 'string'],
            'status' => ['required', 'in:tersedia,discontinued,aktif'],
        ];
    }

    public function messages(): array
    {
        return [
            'kode_produk.unique' => 'Kode produk sudah digunakan.',
            'kategori.in' => 'Kategori produk tidak valid.',
            'status.in' => 'Status produk tidak valid.',
        ];
    }
}
