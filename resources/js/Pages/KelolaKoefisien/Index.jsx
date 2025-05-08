import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, router } from "@inertiajs/react";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import { FaEye, FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import moment from "moment/min/moment-with-locales";
import PopUpForm from "./Partials/PopUpForm";
import {
    InputError,
    InputLabel,
    InputLabelCustom,
    PrimaryButton,
    RadioWithLabel,
    TextInput,
} from "@/Components";

export default function Index({ auth, koefisiens, title, flash }) {
    // Jadiin format bahasa indonesia
    moment.locale("id");

    useEffect(() => {
        if (flash.message) {
            Swal.fire({
                title: "Berhasil!",
                text: `${flash.message}`,
                icon: "success",
                iconColor: "#50C878",
                confirmButtonText: "Oke",
                confirmButtonColor: "#2D95C9",
            });
            setTimeout(() => {
                flash.message = null;
            }, 3000);
        }
    }, [flash.message]);

    function handleDelete(id) {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin menghapus data koefisien ini?",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#2D95C9",
            cancelButtonColor: "#9ca3af",
            customClass: {
                actions: "my-actions",
                cancelButton: "order-1 right-gap",
                confirmButton: "order-2",
                denyButton: "order-3",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("divisi-sdm.koefisien.destroy", id), {
                    onSuccess: () => {
                        // console.log(
                        //     "data aturan koefisien dengan id ",
                        //     id,
                        //     "berhasil di delete!"
                        // );
                    },
                    onError: () => {
                        console.log("Gagal Menghapus Data");
                    },
                });
            }
        });
    }

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    return (
        <Authenticated user={auth.user} title={title}>
            <main className="grid w-full grid-cols-2 mx-auto mt-5 bg-white rounded-lg shadow cursor-pointer max-w-screen-laptop dark:bg-gray-800 p-7 md:p-6">
                {/* SECTION Pendanda Tangan */}
                <section className="w-full max-w-md p-4 mx-auto mt-5 bg-white border rounded-lg shadow cursor-pointer dark:bg-gray-800 md:p-6 border-gradient">
                    <div className="flex justify-between"></div>

                    <div className="pt-3">
                        <form>
                            <div className="grid ">
                                <div>
                                    <h1 className="text-3xl my-7">
                                        Penanda Tangan
                                    </h1>
                                    <InputLabelCustom
                                        htmlFor="nama"
                                        value="Nama"
                                        className="text-xl"
                                    />

                                    <RadioWithLabel
                                        name={"Agus Subidyo"}
                                        value={"Agus Subidyo"}
                                    />
                                    <RadioWithLabel
                                        name={"Agus Subidyo"}
                                        value={"Nama Lain"}
                                    />

                                    <div className="flex">
                                        <RadioWithLabel />
                                        <TextInput
                                            id="nama"
                                            type="text"
                                            name="nama"
                                            className="block w-full mt-1 h-11"
                                            placeholder="Tambahkan Nama Baru"
                                            isFocused={true}
                                            // value={data.nama}
                                            // autoComplete={data.nama}
                                            // onChange={(e) =>
                                            //     setData("nama", e.target.value)
                                            // }
                                        />
                                    </div>

                                    <InputError
                                        // message={errors.nama}
                                        className="mt-2"
                                    />
                                </div>

                                <PrimaryButton
                                    className="my-5 place-self-end"
                                    // disabled={processing}
                                >
                                    Simpan
                                </PrimaryButton>
                            </div>
                        </form>

                        {/* <div className="mt-4">
                                <InputLabel htmlFor="nip" value="NIP" />

                                <TextInput
                                    id="nip"
                                    type="text"
                                    name="nip"
                                    className="block w-full mt-1 h-11"
                                    placeholder="Masukkan Nip Penanda Tangan"
                                    isFocused={true}
                                    // value={data.nama}
                                    // autoComplete={data.nama}
                                    // onChange={(e) =>
                                    //     setData("nama", e.target.value)
                                    // }
                                />

                                <InputError
                                    // message={errors.password}
                                    className="mt-2"
                                />
                            </div> */}
                    </div>
                </section>

                {/*  SECTION : Penanda Tangan  */}
                <section className="w-full max-w-md p-4 mx-auto mt-5 bg-white border rounded-lg shadow cursor-pointer dark:bg-gray-800 md:p-6 border-gradient">
                    <div className="flex justify-between">
                        <h1 className="text-3xl my-7">Data Aturan Koefisien</h1>
                    </div>

                    <div className="pt-3">
                        <table className="table text-xs table-bordered">
                            <thead className="text-sm font-medium text-white bg-primary ">
                                <tr>
                                    <th
                                        scope="col"
                                        dir="rtl"
                                        className="rounded-tl-xl"
                                    >
                                        No
                                    </th>
                                    <th scope="col" width="15%">
                                        Jabatan
                                    </th>
                                    <th scope="col" width="25%">
                                        Nilai
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-center rounded-tr-xl"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="border-secondary/15 ">
                                {koefisiens?.map((koefisien, i) => (
                                    <tr
                                        key={i}
                                        className="group/item hover:bg-secondary/50 hover:cursor-pointer"
                                    >
                                        <td className="text-center">{i + 1}</td>
                                        <td>{koefisien["jabatan"]}</td>
                                        <td>{koefisien["nilai"]}</td>
                                        <td className="text-center whitespace-nowrap text-nowrap">
                                            <span className="inline-block mx-2"></span>
                                            <a
                                                onClick={() => {
                                                    setIsPopUpOpen(
                                                        !isPopUpOpen
                                                    );
                                                    setIsEdit(true);
                                                    setDataEdit(koefisien);
                                                }}
                                                className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center scale-125 hover:scale-[1.3] transition-all group/button group-hover/item:bg-secondary group-hover/item:text-white text-secondary action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                            >
                                                <FaEdit className="fill-secondary group-hover/item:fill-white" />
                                            </a>

                                            <span className="inline-block mx-2"></span>

                                            <button
                                                onClick={() =>
                                                    handleDelete(koefisien.id)
                                                }
                                                className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center text-red-500  hover:scale-[1.3] transition-all scale-125 group/button group-hover/item:bg-red-500 group-hover/item:text-white action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                            >
                                                <FaTrash className="fill-red-500 group-hover/item:fill-white" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => {
                                setIsPopUpOpen(!isPopUpOpen);
                                setIsEdit(false);
                                setDataEdit(null);
                            }}
                            className="mt-6 text-white btn glass bg-sky-600 hover:bg-primary/90"
                        >
                            Tambah Koefisien
                            <IoMdAdd className="w-6 h-6" />
                        </button>
                        {isPopUpOpen && (
                            <PopUpForm
                                onClose={() => setIsPopUpOpen(!isPopUpOpen)}
                                isEdit={isEdit}
                                dataEdit={dataEdit}
                            />
                        )}
                    </div>
                </section>
            </main>
        </Authenticated>
    );
}
