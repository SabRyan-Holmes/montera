<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CetakPAKRequest extends FormRequest
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
        dd($this->all());
        return [

            'nama' => ['required', 'string', 'max:36', 'min:1'],
            'periode_mulai' => ['required', 'integer' ],
            'periode_berakhir' => ['required',  'integer'],
            'tgl_ditetapkan' => ['required', 'date'],
            'nip' => ['required', 'numeric', 'digits_between:6,18'],
            'no_surat1' => ['required', 'string', 'max:20'],
            'predikat' => ['required', 'string', 'max:15'],
            'presentase' => ['required', 'numeric', 'max:150'],
            'ak_normatif' => ['required', 'numeric', 'max:1000'],
            'angka_kredit' => ['required', 'numeric', 'max:1000'],
            'ak_normatif_ops' => ['required', 'numeric', 'max:1000'],
            'tebusan1.kepala_reg' => ['nullable', 'boolean'],
            'tebusan1.sekretaris' => ['nullable', 'boolean'],
            'tebusan1.kepala_bps' => ['nullable', 'boolean'],
            'tebusan1.pns' => ['nullable', 'boolean'],
            'tebusan1.kepala_biro' => ['nullable', 'boolean'],
            'tebusan1.arsip' => ['nullable', 'boolean'],
            'no_surat2' => ['required', 'string', 'max:20'],
            'ak_terakhir' => ['required', 'numeric', 'max:1000'],
            'jumlah_ak_kredit' => ['required', 'numeric', 'max:10000'],
            'tahun_terakhir' => ['required', 'numeric', 'digits:4'],
            'tahun_ini' => ['required', 'numeric', 'digits:4'],
            'tebusan2.kepala_reg' => ['nullable', 'boolean'],
            'tebusan2.sekretaris' => ['nullable', 'boolean'],
            'tebusan2.kepala_bps' => ['nullable', 'boolean'],
            'tebusan2.pns' => ['nullable', 'boolean'],
            'tebusan2.kepala_biro' => ['nullable', 'boolean'],
            'tebusan2.arsip' => ['nullable', 'boolean'],
            'no_surat3' => ['required', 'string', 'max:20'],
            'ak_dasar.tipe_ak' => ['required', 'string'],
            'ak_dasar.lama' => ['nullable', 'numeric', 'max:1000'],
            'ak_dasar.baru' => ['nullable', 'numeric', 'max:1000'],
            'ak_dasar.jumlah' => ['nullable', 'numeric', 'max:1000'],
            'ak_dasar.keterangan' => ['nullable', 'string', 'max:15'],
            'ak_jf.tipe_ak' => ['required', 'string'],
            'ak_jf.lama' => ['nullable', 'numeric', 'max:1000'],
            'ak_jf.baru' => ['nullable', 'numeric', 'max:1000'],
            'ak_jf.jumlah' => ['nullable', 'numeric', 'max:1000'],
            'ak_jf.keterangan' => ['nullable', 'string', 'max:15'],
            'ak_penyesuaian.tipe_ak' => ['required', 'string'],
            'ak_penyesuaian.lama' => ['nullable', 'numeric', 'max:1000'],
            'ak_penyesuaian.baru' => ['nullable', 'numeric', 'max:1000'],
            'ak_penyesuaian.jumlah' => ['nullable', 'numeric', 'max:1000'],
            'ak_penyesuaian.keterangan' => ['nullable', 'string', 'max:15'],
            'ak_konversi.tipe_ak' => ['required', 'string'],
            'ak_konversi.lama' => ['nullable', 'numeric', 'max:1000'],
            'ak_konversi.baru' => ['nullable', 'numeric', 'max:1000'],
            'ak_konversi.jumlah' => ['nullable', 'numeric', 'max:1000'],
            'ak_konversi.keterangan' => ['nullable', 'string', 'max:15'],
            'ak_peningkatan.tipe_ak' => ['required', 'string'],
            'ak_peningkatan.lama' => ['nullable', 'numeric', 'max:1000'],
            'ak_peningkatan.baru' => ['nullable', 'numeric', 'max:1000'],
            'ak_peningkatan.jumlah' => ['nullable', 'numeric', 'max:10000'],
            'ak_peningkatan.keterangan' => ['nullable', 'string', 'max:15'],
            'jakk.lama' => ['nullable', 'numeric', 'max:10000'],
            'jakk.baru' => ['nullable', 'numeric', 'max:10000'],
            'jakk.jumlah' => ['required', 'numeric', 'max:10000'],
            'jakk.keterangan' => ['nullable', 'string', 'max:15'],
            'pangkat' => ['required', 'numeric', 'max:10000'],
            'jabatan' => ['required', 'numeric', 'max:10000'],
            'pangkat_keker' => ['required', 'numeric', 'max:10000'],
            'jabatan_keker' => ['required', 'numeric', 'max:10000'],
            'tebusan3.kepala_reg' => ['nullable', 'boolean'],
            'tebusan3.sekretaris' => ['nullable', 'boolean'],
            'tebusan3.kepala_bps' => ['nullable', 'boolean'],
            'tebusan3.pns' => ['nullable', 'boolean'],
            'tebusan3.kepala_biro' => ['nullable', 'boolean'],
            'tebusan3.arsip' => ['nullable', 'boolean'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'required' => 'Field :attribute wajib diisi.',
            'string' => 'Field :attribute harus berupa teks.',
            'max' => 'Field :attribute tidak boleh lebih dari :max karakter.',
            'min' => 'Field :attribute tidak boleh kurang dari :min karakter.',
            'integer' => 'Field :attribute harus berupa angka bilangan bulat.',
            'numeric' => 'Field :attribute harus berupa angka.',
            'digits_between' => 'Field :attribute harus terdiri dari :min hingga :max digit.',
            'boolean' => 'Field :attribute harus berupa true atau false.',
            'date' => 'Field :attribute harus berupa tanggal yang valid.',
            'digits' => 'Field :attribute harus terdiri dari :digits digit.',
            'before_or_equal' => 'Field :attribute harus berupa tanggal sebelum atau sama dengan :date.',
            'after_or_equal' => 'Field :attribute harus berupa tanggal setelah atau sama dengan :date.',
        ];
    }
}
