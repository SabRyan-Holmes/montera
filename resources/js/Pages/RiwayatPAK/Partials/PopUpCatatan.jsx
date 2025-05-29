import { InputError, InputLabel, TextInput } from "@/Components";
import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

export default function PopUpCatatan({ onClose, popUpData }) {

    const { data, setData, post, patch, processing, errors, reset } = useForm({
        ...popUpData,
        // id: id ?? '',
        // type: type ?? '',
        // catatan: ''
    });



    const handleSubmit = (e) => {
        let routeName = ""
        if(data.type === "Catatan Pengajuan Divisi SDM") {
            routeName = "divisi-sdm.pengajuan.store"
        }

        e.preventDefault();
            post(route(routeName), {
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

    // ANCHOR
    console.log("data dr catatan");
    console.log(data);
    // console.log("FormState");
    // console.log(formState);
    // console.log('isi Id Pop Up Data ')
    // console.log(id)

    return (
        <section className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-bold text-gray-800">
                    {data.type}
                </h2>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="relative laptop:w-full">
                            <textarea
                                name="catatan"
                                className="relative h-24 px-2 border max-h-64 laptop:w-full textarea border-gradient placeholder:text-accent"
                                placeholder="Masukkan catatan tambahan(opsional).."
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
                            Ajukan
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
