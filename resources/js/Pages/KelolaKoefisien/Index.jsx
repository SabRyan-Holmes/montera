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
                router.delete(route("koefisien.destroy", id), {
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
            <section className="mx-auto phone:h-screen laptop:h-full max-w-screen-laptop px-7">
                <div className="flex justify-between">
                    <h1 className="text-3xl my-7">Data Aturan Koefisien</h1>
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
                </div>

                <div className="pt-3 overflow-hidden rounded-xl">
                    <table className="table overflow-auto text-xs table-bordered rounded-xl ">
                        <thead className="text-sm font-medium text-white border bg-primary rounded-xl border-secondary/15">
                            <tr>
                                <th scope="col" width="1%">
                                    No
                                </th>
                                <th scope="col" width="15%">
                                    Jabatan
                                </th>
                                <th scope="col" width="25%">
                                    Nilai
                                </th>
                                {/* <th scope="col">No Seri Karpeg</th> */}
                                <th scope="col" width="20%">
                                    <span className="flex justify-center">
                                        Terakhir Diubah
                                    </span>
                                </th>

                                <th scope="col " className="text-center ">
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
                                    <td>
                                        {moment(
                                            koefisien["updated_at"]
                                        ).fromNow()}
                                    </td>

                                    <td className="text-center whitespace-nowrap text-nowrap">
                                        <Link
                                            as="a"
                                            href={route(
                                                "koefisien.show",
                                                koefisien.id
                                            )}
                                            className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center scale-125 hover:scale-[1.3] transition-all group/button group-hover/item:bg-hijau group-hover/item:text-white text-hijau/75 action-btn border-hijau/20 hover:bg-hijau hover:text-white "
                                        >
                                            <FaEye className="fill-hijau/75 group-hover/item:fill-white" />
                                        </Link>
                                        <span className="inline-block mx-2"></span>
                                        <a
                                            onClick={() => {
                                                setIsPopUpOpen(!isPopUpOpen);
                                                setIsEdit(true);
                                                setDataEdit(koefisien)
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
            </section>
        </Authenticated>
    );
}
