import { InputError, InputLabel, TextInput } from "@/Components";
import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

export default function PopUpCatatan({ onClose, popUpData: {id} }) {
    console.log('isi Id Pop Up Data ')
    console.log(id)
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        id: id ?? '',
        catatan: ''
    });

    // Handler untuk update field dinamis
    const handleSetData = (fieldName, value) => {
        setData("datas", {
            ...data.datas,
            [fieldName]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            patch(routeName, {
                preserveState: true,
                preserveScroll: true,
                onError: (errors) => {
                    console.error("Error:", errors);
                },
                onSuccess: () => {},
            });
            // console.log('Form Data:', formData);
            onClose(); // Tutup pop-up setelah submit
        } else {
            post(routeName, {
                preserveState: true,
                preserveScroll: true,
                onError: (errors) => {
                    console.error("Error:", errors);
                },
                onSuccess: () => {},
            });
            // console.log('Form Data:', formData);
            onClose(); // Tutup pop-up setelah submit
        }
    };

    // ANCHOR
    console.log("data");
    console.log(data);
    // console.log("FormState");
    // console.log(formState);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-bold text-gray-800">
                    Alasan Penolakan & Catatan Perbaikan
                </h2>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="relative laptop:w-full">
                            <textarea
                                name="catatan"
                                className="relative h-24 px-2 border laptop:w-full textarea border-gradient placeholder:text-accent"
                                placeholder="Ketikkan catatan untuk penolakan pengusulan ini.."
                                maxLength={1000}
                                onChange={(e) =>
                                    setData("catatan", e.target.value)
                                }
                            ></textarea>

                        </div>
                        <InputError
                            message={errors.catatan}
                            className="mt-2"
                        />
                    </fieldset>

                    <div className="flex justify-end mt-4 space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 text-sm font-medium text-white transition duration-200 rounded-md bg-sky-600 hover:bg-sky-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
