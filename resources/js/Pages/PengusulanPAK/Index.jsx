import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";

import { FaEye, FaTrash } from "react-icons/fa6";
import FilterSearchPegawai from "../KelolaPegawai/Partials/FilterSearchPegawai";
import { RiLoader2Fill } from "react-icons/ri";
import { TbEyeCheck } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link, router, useRemember } from "@inertiajs/react";
import Swal from "sweetalert2";
import ModalCekValidasi from "./Partials/ModalCekValidasi";

export default function Index({
    auth,
    pengusulanPAK,
    title,
    flash,
    canValidate,
    searchReq: initialSearch,
    byDaerahReq: initialDaerah,
    byJabatanReq: initialJabatan,
}) {
    const [shownMessages, setShownMessages] = useRemember([]);
    useEffect(() => {
        if (flash.message && !shownMessages.includes(flash.message)) {
            Swal.fire({
                title: "Berhasil!",
                text: `${flash.message}`,
                icon: "success",
                iconColor: "#50C878",
                confirmButtonText: "Oke",
                confirmButtonColor: "#2D95C9",
            });
            setShownMessages([...shownMessages, flash.message]);
        }
    }, [flash.message]);

    // SWAL POP UP
    const [modalMessage, setModalMessage] = useState(null);
    const [activeModalId, setActiveModalId] = useState(null);
    // Cek message dan status modal
    useEffect(() => {
        if (flash.message) {
            if (activeModalId !== null) {
                Swal.fire({
                    target: `#DialogCekValidasi-${activeModalId}`,
                    title: "Berhasil!",
                    text: `${flash.message}`,
                    icon: "success",
                    iconColor: "#50C878",
                    confirmButtonText: "Oke",
                    confirmButtonColor: "#2D95C9",
                });
                // Kirim pesan ke modal tertentu saja
                setModalMessage(flash.message);
            } else {
                // Tampilkan Swal global
                Swal.fire({
                    title: "Berhasil!",
                    text: `${flash.message}`,
                    icon: "success",
                    iconColor: "#50C878",
                    confirmButtonText: "Oke",
                    confirmButtonColor: "#2D95C9",
                });
            }

            setTimeout(() => {
                flash.message = null;
            }, 3000);
        }
    }, [flash.message, activeModalId]);

    // Cancel penagjaun dari divisi SDM
    const handleCancel = (id) => {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin membatalkan pengajuan PAK ini?",
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
                router.post(route("divisi-sdm.pengajuan.cancel", id), {
                    onSuccess: () => {
                        //
                    },
                    onError: () => {
                        console.log("Gagal Menghapus Data");
                    },
                });
            }
        });
    };

    const handleReject = (id) => {
        console.log("isi id di handleReject");
        console.log(id);
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin menolak pengajuan ini?",
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
                router.post(route("pimpinan.pengajuan.reject", id), {
                    onSuccess: () => {
                        //
                    },
                    onError: () => {
                        console.log("Gagal Menolak Pengajuan");
                    },
                });
            }
        });
    };
    console.log("activeModalId");
    console.log(activeModalId);

    return (
        <Authenticated user={auth.user} title={title}>
            <section className="mx-auto phone:h-screen laptop:h-full max-w-screen-laptop px-7">
                <div className="flex items-center justify-between">
                    <FilterSearchPegawai />
                    {!canValidate && (
                        <Link
                            as="button"
                            href={route("pegawai.pengusulan-pak.create")}
                            className="flex justify-end mt-6 text-white btn glass bg-sky-600 hover:bg-primary/90"
                        >
                            Tambah
                            <IoMdAdd className="w-6 h-6" />
                        </Link>
                    )}
                </div>

                <div className="pt-3 ">
                    {pengusulanPAK.data.length ? (
                        <table className="table text-xs table-bordered">
                            <thead className="text-sm font-medium text-white bg-primary ">
                                <tr>
                                    <th
                                        scope="col"
                                        dir="rtl"
                                        className="rounded-tl-xl"
                                        width="5%"
                                    >
                                        No
                                    </th>
                                    <th scope="col" width="15%">
                                        NAMA & NIP
                                    </th>
                                    <th scope="col" width="10%">
                                        <span className="flex justify-center">
                                            Jabatan
                                        </span>
                                    </th>
                                    <th
                                        scope="col"
                                        width="15%"
                                        className="p-1 text-xs text-center"
                                    >
                                        <span>Periode </span>
                                        <span className="block">Penilaian</span>
                                    </th>
                                    <th
                                        scope="col"
                                        width="7%"
                                        className="p-1 text-center"
                                    >
                                        <span>Jumlah </span>
                                        <span className="block">
                                            AK Terakhir
                                        </span>
                                    </th>
                                    <th
                                        scope="col"
                                        width="7%"
                                        className="p-1 text-xs text-center"
                                    >
                                        <span>Jumlah </span>
                                        <span className="block">
                                            AK Diajukan
                                        </span>
                                    </th>

                                    <th
                                        scope="col"
                                        width="10%"
                                        className="w-16 p-1 text-xs text-center"
                                    >
                                        <span>Data </span>
                                        <span className="block">Pendukung</span>
                                    </th>
                                    <th
                                        scope="col"
                                        width="5%"
                                        className="text-center "
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-center rounded-tr-xl"
                                    >
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pengusulanPAK.data?.map((data, i) => (
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <strong>{data.pegawai.Nama}</strong>
                                            <strong className="block">
                                                {data.nip}
                                            </strong>
                                        </td>
                                        <td>{data.jabatan}</td>
                                        <td>{data.periode_penilaian}</td>
                                        <td>{data.jumlah_ak_terakhir}</td>
                                        <td>{data.jumlah_ak_diajukan}</td>
                                        <td>
                                            {data.dokumen_pendukung_path
                                                ? "Ada"
                                                : "Tidak ADa"}
                                        </td>
                                        <td className="p-0 m-0">
                                            <button
                                                disabled
                                                className="label-base bg-accent/50 text-slate-500"
                                            >
                                                {data.status}
                                                <RiLoader2Fill className="ml-1 scale-125 fill-slate-500 stroke-slate-500 group-hover/item:fill-white" />
                                            </button>
                                        </td>
                                        <td className="text-center whitespace-nowrap text-nowrap">
                                            {canValidate ? (
                                                <>
                                                    <ModalCekValidasi
                                                        pengusulanPAK={data}
                                                        setActiveModalId={
                                                            setActiveModalId
                                                        }
                                                        message={modalMessage}
                                                    />
                                                    <button
                                                        className="action-btn hover:scale-[1.15] group/button group-hover/item:bg-primary/70 group-hover/item:text-white text-primary/70"
                                                        onClick={() => {
                                                            setActiveModalId(
                                                                pengusulanPAK.id
                                                            );
                                                            document
                                                                .getElementById(
                                                                    `DialogCekValidasi-${pengusulanPAK.id}`
                                                                )
                                                                .showModal();
                                                        }}
                                                    >
                                                        Cek & Validasi
                                                        <TbEyeCheck className="w-6 h-6 stroke-hijau/75 group-hover/item:stroke-white " />
                                                    </button>
                                                    <span className="inline-block mx-3"></span>
                                                    <button
                                                        onClick={() =>
                                                            handleReject(
                                                                pengusulanPAK.id
                                                            )
                                                        }
                                                        className="action-btn hover:scale-[1.15] group/button group-hover/item:bg-warning/80 group-hover/item:text-white text-warning/80"
                                                    >
                                                        Tolak
                                                        <IoCloseOutline className="w-6 h-6 fill-secondary stroke-warning/80 group-hover/item:stroke-white" />
                                                    </button>
                                                </>
                                            ) : (
                                                <td className="text-center text-nowrap">
                                                    <button
                                                        className="action-btn hover:scale-[1.15] group/button group-hover/item:bg-primary/70 group-hover/item:text-white text-primary/70"
                                                        onClick={() => {
                                                            setActiveModalId(
                                                                pengusulanPAK.id
                                                            );
                                                            document
                                                                .getElementById(
                                                                    `DialogCekValidasi-${pengusulanPAK.id}`
                                                                )
                                                                .showModal();
                                                        }}
                                                    >
                                                        Lihat
                                                        <FaEye className="w-6 h-6 stroke-hijau/75 group-hover/item:stroke-white " />
                                                    </button>
                                                </td>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                Belum Ada Pengusulan PAK Terbaru Untuk Saat Ini
                            </h2>
                        </div>
                    )}
                </div>
            </section>
        </Authenticated>
    );
}
