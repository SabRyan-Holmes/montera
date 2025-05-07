import { InputError, InputLabel, TextInput } from "@/Components";
import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

const PopUpForm = ({ onClose, isEdit, dataEdit }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        id: null,
        jabatan: "",
        nilai: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lakukan sesuatu dengan data form, misalnya kirim ke API

        post(route("divisi-sdm.koefisien.store"), data);
        // console.log('Form Data:', formData);
        onClose(); // Tutup pop-up setelah submit
    };

    useEffect(() => {
        if (isEdit && dataEdit) {
            setData({
                id: dataEdit.id ?? null,
                jabatan: dataEdit.jabatan ?? "",
                nilai: dataEdit.nilai ?? "",
            });
        } else {
            reset(); // Jika bukan edit, kosongkan form
        }
    }, [isEdit, dataEdit]);




    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-bold text-gray-800">
                    {isEdit ? "Edit" : "Tambah"} Aturan Koefisien
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <InputLabel>Jabatan</InputLabel>
                        <TextInput
                            type="text"
                            name="jabatan"
                            disabled= {isEdit}
                            defaultValue={data.jabatan}
                            maxLength={25}
                            onChange={(e) => {
                                setData("jabatan", e.target.value);
                                data.jabatan = e.target.value;
                                console.log(
                                    "jabatan sekarang : ",
                                    data.jabatan
                                );
                            }}
                            placeholder="masukkan jabatan, contoh: penyelia, pertama.."
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            required
                        />
                        <InputError message={errors.jabatan} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <InputLabel>Nilai</InputLabel>
                        <TextInput
                            type="text"
                            name="nilai"
                            defaultValue={data.nilai}
                            placeholder="masukkan nilai angka, contoh: 12.5, 25.."
                            onChange={(e) => {
                                setData("nilai", e.target.value);
                                data.nilai = e.target.value;
                                console.log("nilai sekarang : ", data.nilai);
                            }}
                            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            required
                        />
                        <InputError message={errors.nilai} className="mt-2" />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white transition duration-200 rounded-md bg-sky-600 hover:bg-sky-700"
                        >
                            {isEdit ? "Simpan" : "Tambah"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopUpForm;
