import { InputError, InputLabel, Modal, TextInput } from "@/Components";
import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

export default function ModalCatatan({ onClose, setActiveModal, activeModal, routeName }) {
    const { data, setData, post, processing, errors } = useForm({
        id: "",
        catatan: "",
    });
    useEffect(() => {
        const dataId = activeModal?.split("-")[1]; // ambil bagian setelah "ModalCatatan-"
        if (dataId) {
            setData("id", dataId);
        }
    }, [activeModal]);

    // ANCHOR
    console.log("data");
    console.log(data);
    // console.log('isi Id Pop Up Data ')
    // console.log(id)

    const modalId = `ModalCatatan-${data.id}`;
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route(routeName, data.id), {
            preserveState: true,
            preserveScroll: true,
            onError: (errors) => {
                console.error("Error:", errors);
            },

            onSuccess: () => setActiveModal(null),
        });
        // console.log('Form Data:', formData);
        onClose(); // Tutup pop-up setelah submit
    };

    return (
        <Modal
            id={modalId} // agar Swal bisa target
            show={activeModal === modalId}
            onClose={() => setActiveModal(null)} // agar modal bisa ditutup dengan onClose
            maxWidth="md"
        >
            <section className="w-full max-w-md p-6 mx-auto rounded-lg ">
                <h2 className="mb-4 text-xl font-bold text-gray-800">
                    Alasan penolakan/catatan perbaikan
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
                        <InputError message={errors.catatan} className="mt-2" />
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
            </section>
        </Modal>
    );
}
