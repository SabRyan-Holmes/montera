import { InputError, Modal } from "@/Components"; // Adjust imports
import React, { useState } from "react";

export default function RevisionModal({
    onClose,
    dataId, // Received from parent
    onSubmit, // Received from parent
    title,
    placeholder = "",
}) {
    const [catatan, setCatatan] = useState("");
    const [processing, setProcessing] = useState(false);
    const [localError, setLocalError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!catatan.trim() || catatan.length < 5) {
            setLocalError("Alasan wajib diisi minimal 5 karakter.");
            return;
        }

        setProcessing(true);
        // Call the parent's function
        onSubmit(dataId, catatan);
        // Note: processing state will stick until component unmounts or parent handles it.
        // In Inertia, usually the page reloads or props change, closing this modal.
    };

    return (
        <Modal
            show={true} // Always show when rendered conditionally by parent
            closeButton={false}
            onClose={onClose}
            maxWidth="md"
        >
            <section className="w-full max-w-md p-6 mx-auto rounded-lg">
                <h2 className="mb-4 text-xl font-bold text-gray-800">
                    {title ?? "Alasan Penolakan/Catatan Perbaikan"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="relative laptop:w-full">
                            <textarea
                                name="catatan"
                                className="relative w-full h-24 p-2 px-2 border rounded-md text-secondary laptop:w-full textarea border-gradient placeholder:text-accent focus:ring focus:ring-opacity-50 focus:ring-blue-300" // Added basic styling
                                placeholder={placeholder}
                                maxLength={255}
                                value={catatan}
                                onChange={(e) => {
                                    setCatatan(e.target.value);
                                    if (localError) setLocalError("");
                                }}
                            ></textarea>
                        </div>
                        {localError && (
                            <InputError message={localError} className="mt-2" />
                        )}
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
                            className="px-4 py-2 text-sm font-medium text-white transition duration-200 bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
                        >
                            {processing ? "Memproses..." : "Tolak"}
                        </button>
                    </div>
                </form>
            </section>
        </Modal>
    );
}

// import { InputError, InputLabel, Modal, TextInput } from "@/Components";
// import { useForm } from "@inertiajs/react";
// import React, { useState, useEffect } from "react";

// export default function ModalCatatan({
//     onClose,
//     activeModal,
//     routeName,
//     title,
//     placeholder = "",
// }) {
//     const { data, setData, post, processing, errors } = useForm({
//         id: "",
//         catatan: "",
//     });
//     useEffect(() => {
//         const dataId = activeModal?.split("-")[1]; // ambil bagian setelah "ModalCatatan-"
//         if (dataId) {
//             setData("id", dataId);
//         }
//     }, [activeModal]);

//     const modalId = `ModalCatatan-${data.id}`;
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         post(route(routeName, data.id), {
//             preserveState: true,
//             preserveScroll: true,
//             onError: (errors) => {
//                 console.error("Error:", errors);
//             },
//             onSuccess: onClose,
//         });
//     };

//     return (
//         <Modal
//             id={modalId}
//             show={activeModal === modalId}
//             closeButton={false}
//             onClose={onClose}
//             maxWidth="md"
//         >
//             <section className="w-full max-w-md p-6 mx-auto rounded-lg ">
//                 <h2 className="mb-4 text-xl font-bold text-gray-800">
//                     {title ?? "Alasan Penolakan/Catatan Perbaikan"}
//                 </h2>
//                 <form onSubmit={handleSubmit}>
//                     <fieldset>
//                         <div className="relative laptop:w-full">
//                             <textarea
//                                 name="catatan"
//                                 className="relative h-24 px-2 border laptop:w-full textarea border-gradient placeholder:text-accent"
//                                 placeholder={placeholder}
//                                 maxLength={1000}
//                                 onChange={(e) =>
//                                     setData("catatan", e.target.value)
//                                 }
//                             ></textarea>
//                         </div>
//                         <InputError message={errors.catatan} className="mt-2" />
//                     </fieldset>

//                     <div className="flex justify-end mt-4 space-x-3">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 bg-gray-100 rounded-md hover:bg-gray-200"
//                         >
//                             Batal
//                         </button>
//                         <button
//                             type="submit"
//                             disabled={processing}
//                             className="px-4 py-2 text-sm font-medium text-white transition duration-200 rounded-md bg-sky-600 hover:bg-sky-700"
//                         >
//                             Submit
//                         </button>
//                     </div>
//                 </form>
//             </section>
//         </Modal>
//     );
// }
