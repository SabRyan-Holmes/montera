import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import { FaEye, FaEdit } from "react-icons/fa";
import { Link, router } from "@inertiajs/react";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import {
    InputLabel,
    Pagination,
    TooltipHover,
    useFilterSearch,
} from "@/Components";
import { FaEyeSlash, FaTrash } from "react-icons/fa6";
import moment from "moment/min/moment-with-locales";
import FilterSearchPegawai from "./Partials/FilterSearchPegawai";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";

export default function Index({
    auth,
    pegawais,
    title,
    flash,
    searchReq: initialSearch,
    byDaerahReq: initialDaerah,
    byJabatanReq: initialJabatan,
}) {
    // ===========================================Pop Up, Modal, Dialog Swal Message===========================================

    function handleDelete(id) {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin menghapus data pegawai ini?",
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
                router.delete(route("divisi-sdm.pegawai.destroy", id), {
                    onSuccess: () => {
                        // console.log(
                        //     "data pegawai dengan id ",
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

    // ===========================================Handling Search & Filter===========================================
    const {
        search,
        setSearch,
        byDaerah,
        setByDaerah,
        byJabatan,
        setByJabatan,
    } = useFilterSearch({
        initialSearch,
        initialDaerah,
        initialJabatan,
        routeName: "/divisi-sdm/pegawai", // bisa diganti tergantung endpoint-nya
    });

    // ===========================================Other Logics===========================================
    moment.locale("id");
    const [showLastUpdated, setShowLastUpdated] = useState(false); // Default false

    return (
        <Authenticated user={auth.user} title={title}>
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section>
                    <FilterSearchPegawai
                        byJabatan={byJabatan}
                        setByJabatan={setByJabatan}
                        byDaerah={byDaerah}
                        setByDaerah={setByDaerah}
                        search={search}
                        setSearch={setSearch}
                    />
                </section>

                <section className="pt-3 overflow-auto">
                    <table className="table text-xs table-bordered">
                        <thead className="text-sm font-medium text-white bg-primary ">
                            <tr>
                                <th
                                    scope="col"
                                    dir="rtl"
                                    width="5%"
                                    className="text-center rounded-tl-xl"
                                >
                                    No
                                </th>
                                <th scope="col" width="15%">
                                    Nama & NIP
                                </th>

                                <th scope="col" width="20%">
                                    Jabatan/TMT
                                </th>
                                <th scope="col" width="15%">
                                    Daerah/Unit Kerja
                                </th>
                                <th scope="col" width="15%">
                                    Pangkat/Golongan Ruangan/TMT
                                    <span className="block text-center">
                                        /Masa Kerja Golongan
                                    </span>
                                </th>

                                <th
                                    scope="col"
                                    width="15%"
                                    className="cursor-pointer"

                                >
                                    <div className="flex items-center justify-center gap-2">
                                        {showLastUpdated ? (
                                            <>
                                                <button
                                                className="action-btn hover:scale-[1.15] hover:bg-primary-dark/30"
                                                    onClick={() =>
                                                        setShowLastUpdated(
                                                            !showLastUpdated
                                                        )
                                                    }
                                                >
                                                <FaEyeSlash className="mr-1 text-white " />
                                                    Terakhir Diperbarui
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                            <button
                                                className="action-btn hover:scale-125 hover:bg-primary-dark/30"
                                                    onClick={() =>
                                                        setShowLastUpdated(
                                                            !showLastUpdated
                                                        )
                                                    }
                                                >
                                            <TbLayoutSidebarLeftCollapse  className="mr-1 text-white" />
                                            Aksi
                                            </button>
                                            </>
                                        )}
                                    </div>
                                </th>
                                {
                                    showLastUpdated &&
                                    <th
                                    scope="col"
                                    className="text-center rounded-tr-xl"
                                >
                                    Aksi
                                </th>
                                }

                            </tr>
                        </thead>
                        <tbody>
                            {pegawais.data?.map((pegawai, i) => (
                                <tr
                                    key={i}
                                    className="group/item hover:bg-secondary/35"
                                >
                                    <td className="text-center">{i + 1}</td>
                                    <td>
                                        <span className="block">
                                            {pegawai["Nama"]}{" "}
                                            {pegawai["Gelar Tambahan"] ?? ""}
                                        </span>
                                        <span className="block p-1 mt-1 font-medium rounded-md bg-primary/10">
                                            {pegawai["NIP"]}
                                        </span>
                                    </td>
                                    <td>
                                        {pegawai["Jabatan/TMT"]}
                                        {/* {pegawai["Jabatan/TMT"]
                                            .split("/")[0]
                                            .trim()} */}
                                    </td>
                                    <td>
                                        {pegawai["Daerah"]} / <br />{" "}
                                        <span className="block">
                                            {" "}
                                            {pegawai["Unit Kerja"]}
                                        </span>{" "}
                                    </td>
                                    <td>
                                        <span className="block text-center">
                                            {
                                                pegawai[
                                                    "Pangkat/Golongan Ruangan/TMT"
                                                ]
                                            }
                                        </span>
                                        <span className="block mt-1 text-center">
                                            /
                                            {pegawai["Masa Kerja Golongan"] ??
                                                "-"}
                                        </span>
                                    </td>
                                    <td
                                        className={`font-normal text-center ${
                                            !showLastUpdated && "hidden"
                                        }`}
                                    >
                                        <span className="block">
                                            {moment(
                                                pegawai["updated_at"]
                                            ).format("LL")}
                                        </span>
                                        <span className="block text-[12px]">
                                            {moment(
                                                pegawai.updated_at
                                            ).fromNow()}
                                        </span>
                                    </td>
                                    <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                        <div className="relative inline-flex group">
                                            <Link
                                                as="a"
                                                href={route(
                                                    "divisi-sdm.pegawai.show",
                                                    pegawai["NIP"]
                                                )}
                                                className="action-btn group/button group-hover/item:bg-hijau text-hijau"
                                            >
                                                <FaEye className="scale-125 fill-hijau/75 group-hover/item:fill-white" />
                                            </Link>
                                            <TooltipHover
                                                message={"Lihat Data"}
                                            />
                                        </div>

                                        {/* EDIT */}

                                        <div className="relative inline-flex group">
                                            <Link
                                                as="a"
                                                href={route(
                                                    "divisi-sdm.pegawai.edit",
                                                    pegawai["NIP"]
                                                )}
                                                className="action-btn group/button group-hover/item:bg-secondary/70 text-secondary/70"
                                            >
                                                <FaEdit className=" fill-secondary group-hover/item:fill-white" />
                                            </Link>
                                            <TooltipHover
                                                message={"Edit Data"}
                                            />
                                        </div>

                                        {/* DELETE */}
                                        <div className="relative inline-flex group">
                                            <button
                                                onClick={() =>
                                                    handleDelete(pegawai["NIP"])
                                                }
                                                className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center text-red-500  hover:scale-[1.3] transition-all scale-110 group/button group-hover/item:bg-red-500 group-hover/item:text-white action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                            >
                                                <FaTrash className="scale-125 fill-red-500 group-hover/item:fill-white" />
                                            </button>
                                            <TooltipHover
                                                message={"Hapus Data"}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Pagination */}
                <Pagination
                    datas={pegawais}
                    urlRoute={`/divisi-sdm/pegawai`}
                    filters={{
                        filter1: byDaerah,
                        filter2: byJabatan,
                        filterSearch: search,
                    }}
                />
            </main>
        </Authenticated>
    );
}
