import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa6";
import FilterSearchPegawai from "../KelolaPegawai/Partials/FilterSearchPegawai";
import { RiLoader2Fill } from "react-icons/ri";
import { TbEyeCheck } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link, useRemember } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Index({
    auth,
    logAktivitas,
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
    // ANCHOR
    return (
        <Authenticated user={auth.user} title={title}>
            <section className="mx-auto phone:h-screen laptop:h-full max-w-screen-laptop px-7">
                <div className="flex items-center justify-between">
                    <FilterSearchPegawai />
                        <Link
                            as="button"
                            href={route("pegawai.pengusulan-pak.create")}
                            className="flex justify-end mt-6 text-white btn glass bg-sky-600 hover:bg-primary/90"
                        >
                            Tambah
                            <IoMdAdd className="w-6 h-6" />
                        </Link>
                </div>

                <div className="pt-3 ">
                    {logAktivitas.data.length ? (
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
                                        Tanggal
                                    </th>
                                    <th scope="col" width="15%">
                                        NAMA & NIP
                                    </th>
                                    <th scope="col" width="30%">
                                        <span className="flex justify-center">
                                            Aktivitas
                                        </span>
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
                                {
                                    logAktivitas.data?.map((data, i) =>  (
                                        // ANCHOR
                                        <tr>
                                        <td>{i+1}</td>
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
                                        <td>{data.dokumen_pendukung_path ? 'Ada' : 'Tidak ADa'}</td>
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
                                                    {/* <ModalCekValidasi
                                                            pengajuan={
                                                                pengajuan
                                                            }
                                                            setActiveModalId={setActiveModalId}
                                                            message={
                                                                modalMessage
                                                            }
                                                        /> */}
                                                    <button
                                                        className="action-btn hover:scale-[1.15] group/button group-hover/item:bg-primary/70 group-hover/item:text-white text-primary/70"
                                                        // onClick={() => {
                                                        //     setActiveModalId(
                                                        //         pengajuan.id
                                                        //     );
                                                        //     document
                                                        //         .getElementById(
                                                        //             `DialogCekValidasi-${pengajuan.id}`
                                                        //         )
                                                        //         .showModal();
                                                        // }}
                                                    >
                                                        Cek & Validasi
                                                        <TbEyeCheck className="w-6 h-6 stroke-hijau/75 group-hover/item:stroke-white " />
                                                    </button>
                                                    <span className="inline-block mx-3"></span>
                                                    <button
                                                        // onClick={() =>
                                                        //     handleReject(
                                                        //         pengajuan.id
                                                        //     )
                                                        // }
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
                                                        // onClick={() => {
                                                        //     setActiveModalId(
                                                        //         pengajuan.id
                                                        //     );
                                                        //     document
                                                        //         .getElementById(
                                                        //             `DialogCekValidasi-${pengajuan.id}`
                                                        //         )
                                                        //         .showModal();
                                                        // }}
                                                    >
                                                        Lihat
                                                        <FaEye className="w-6 h-6 stroke-hijau/75 group-hover/item:stroke-white " />
                                                    </button>
                                                </td>
                                            )}
                                        </td>
                                    </tr>

                                    ))
                                }

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
