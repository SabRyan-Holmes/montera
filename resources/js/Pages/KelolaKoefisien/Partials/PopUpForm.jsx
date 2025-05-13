import { InputError, InputLabel, TextInput } from "@/Components";
import { useForm } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

const PopUpForm = ({
    onClose,
    isEdit,
    dataEdit,
    popUpData: { title, fields, routeName },
}) => {
    // Membuat objek datas dengan field dinamis
    const dynamicFields = {};
    if (isEdit && dataEdit) {
      fields.forEach(field => {
        // Cek semua kemungkinan struktur
        dynamicFields[field] =
          dataEdit.datas?.[field] ??
          dataEdit?.data?.attributes?.[field] ??
          dataEdit?.[field] ??
          '';
      });
    }

    const formState = {
        datas: dynamicFields, // Field dinamis disimpan dalam objek datas
        id: dataEdit?.id ?? null,
        storeName: !isEdit ? title : null,
        updateName: isEdit ? title : null,
    };

    /*
    Hasilnya akan seperti:
    {
        datas: {
            // Field custom
            jabatan: '',  // atau nilai dari dataEdit jika isEdit
            nilai: '',    // atau nilai dari dataEdit jika isEdit
            // ... field lainnya
        },
        id: dataEdit?.id ?? null,
        storeName: !isEdit ? title : null,
        updateName: isEdit ? title : null,
    }
    */

    const { data, setData, post, patch, processing, errors, reset } =
        useForm(formState);

    // Handler untuk update field dinamis
    const handleSetData = (fieldName, value) => {
        setData("datas", {
            ...data.datas,
            [fieldName]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isEdit) {
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

    useEffect(() => {
        if (isEdit && dataEdit) {
            console.log("Memproses dataEdit:", dataEdit);

            // Pastikan kita mengambil dari property yang benar
            const initialData = {};
            fields.forEach((field) => {
                // Cek beberapa kemungkinan lokasi data
                initialData[field] =
                    dataEdit.datas?.[field] || dataEdit?.[field] || "";
            });

            reset({
                datas: initialData,
                id: dataEdit.id,
                storeName: null,
                updateName: title,
            });

            console.log("Form setelah reset:", {
                datas: initialData,
                id: dataEdit.id,
                storeName: null,
                updateName: title,
            });
        }
    }, [isEdit, dataEdit, fields, reset, title]);

    function toUpperCase(fieldName) {
        return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    }

    // ANCHOR
    console.log("data");
    console.log(data);
    // console.log("FormState");
    // console.log(formState);

    if (isEdit && !dataEdit) {
        return <div>Loading...</div>;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
            <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-bold text-gray-800">
                    {isEdit ? "Edit " : "Tambah "} {title}
                </h2>
                <form onSubmit={handleSubmit}>
                    {fields.map((fieldName) => (
                        <div className="mb-4" key={fieldName}>
                            <InputLabel>{fieldName =='choice' ? 'Pihak Tebusan' : toUpperCase(fieldName)}</InputLabel>

                            <TextInput
                                key={fieldName}
                                name={fieldName}
                                value={data.datas[fieldName] || ""}
                                type={fieldName == "nilai" ? "number" : "text"}
                                {...(fieldName === "nilai" && {
                                    step: "0.5",
                                    min: 0,
                                    max: 100,
                                    onInput: (e) => {
                                        // Untuk memastikan 1 digit desimal
                                        e.target.value = parseFloat(
                                            e.target.value
                                        ).toFixed(1);
                                    },
                                })}
                                // disabled={isEdit && fieldName === "jabatan"} // contoh: hanya disable field 'jabatan'
                                onChange={(e) =>
                                    handleSetData(fieldName, e.target.value)
                                }
                                maxLength={25}
                                placeholder={`Masukkan ${fieldName}`}
                                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                required
                            />

                            <InputError
                                message={errors[fieldName]}
                                className="mt-2"
                            />
                        </div>
                    ))}

                    {/* <div className="mb-4">
                        <InputLabel>Nilai</InputLabel>
                        <TextInput
                            type="t




                            ext"
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
                    </div> */}
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
                            disabled={processing}
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
