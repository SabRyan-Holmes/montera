import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";

import { FaCheck, FaEye, FaTrash } from "react-icons/fa6";
import FilterSearchPegawai from "../KelolaPegawai/Partials/FilterSearchPegawai";
import { RiLoader2Fill } from "react-icons/ri";
import { TbEyeCheck } from "react-icons/tb";
import { IoClose, IoCloseOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link, router, useRemember } from "@inertiajs/react";
import Swal from "sweetalert2";
import {
    Pagination,
    TooltipHover,
    useFilterSearch,
    FilterSearchCustom,
} from "@/Components";
import ModalCekPengusulan from "./Partials/ModalCekPengusulan";
import moment from "moment/min/moment-with-locales";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

// ANCHOR

export default function Index({
    auth,
    pengusulanPAK,
    title,
    subTitle,
    flash,
    canValidate,
    searchReq: initialSearch,
    byStatusReq: initialStatus,
    byJabatanReq: initialJabatan,
    jabatanList,
}) {
    moment.locale("id");
    const {
        search,
        setSearch,
        byFilter1,
        setByFilter1,
        byFilter2,
        setByFilter2,
    } = useFilterSearch({
        initialSearch,
        initialStatus,
        initialJabatan,
        routeName: canValidate
            ? "/divisi-sdm/pengusulan-pak"
            : "/pegawai/pengusulan-pak",
    });

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
                    target: `#DialogCekPengusulan-${activeModalId}`,
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
            <section className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <div className="flex items-center justify-between w-full">
                    <FilterSearchCustom
                        filter1Label={"Status"}
                        byFilter1={byFilter1}
                        setByFilter1={setByFilter1}
                        filter1List={["diproses", "ditolak", "disetujui"]}
                        filter2Label={"Jabatan"}
                        byFilter2={byFilter2}
                        setByFilter2={setByFilter2}
                        filter2List={jabatanList}
                        search={search}
                        setSearch={setSearch}
                    />
                    {!canValidate && (
                        <Link
                            as="button"
                            href={route("pegawai.pengusulan-pak.create")}
                            className="flex justify-end mx-2 mt-6 text-white btn glass bg-sky-600 hover:bg-primary/90"
                        >
                            Tambah
                            <IoMdAdd className="w-6 h-6" />
                        </Link>
                    )}
                </div>

                <div className="pt-3 ">
                    {subTitle && (
                        <div className="my-4">
                            <strong className="text-2xl font-bold text-gray-600">
                                {subTitle}
                            </strong>
                        </div>
                    )}
                    {pengusulanPAK.data.length ? (
                        // ANCHOR
                        <>
                            {/* Table Content */}
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
                                        <th scope="col" width="15%">
                                            <span className="flex justify-center">
                                                Jabatan
                                            </span>
                                        </th>
                                        <th
                                            scope="col"
                                            width="12%"
                                            className="text-xs text-center"
                                        >
                                            <span>Periode </span>
                                            <span className="block">
                                                Penilaian
                                            </span>
                                        </th>
                                        <th
                                            scope="col"
                                            width="5%"
                                            className="p-1 text-center"
                                        >
                                            <span>AK Terakhir & </span>
                                            <span className="block">
                                                AK Diajukan
                                            </span>
                                        </th>

                                        <th
                                            scope="col"
                                            width="15%"
                                            className="w-16 p-1 text-xs text-center"
                                        >
                                            <span>Data </span>
                                            <span className="block">
                                                Pendukung
                                            </span>
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
                                            width="2%"
                                            className="text-center "
                                        >
                                            <span>Waktu</span>
                                            <span className="block">
                                                Pengusulan
                                            </span>
                                        </th>
                                        <th
                                            scope="col"
                                            width="10%"
                                            className="text-center rounded-tr-xl"
                                        >
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* ANCHOR */}
                                    {pengusulanPAK.data?.map((data, i) => (
                                        <tr className="font-semibold text-center">
                                            <td>1</td>
                                            <td className="text-left">
                                                <strong className="">
                                                    {data.pegawai.Nama}{" "}
                                                    {data.pegawai[
                                                        "Gelar Tambahan"
                                                    ] ?? ""}
                                                </strong>
                                                <strong className="block mt-1">
                                                    {data.nip}
                                                </strong>
                                            </td>
                                            <td>{data.jabatan}</td>
                                            <td>{data.periode_penilaian}</td>
                                            <td>
                                                <span className="block">
                                                    {data.jumlah_ak_terakhir}
                                                </span>
                                                <span className="block mt-1">
                                                    {data.jumlah_ak_diajukan}
                                                </span>
                                            </td>
                                            <td>
                                                {data.dokumen_pendukung_path
                                                    ? "Ada"
                                                    : "Tidak Ada"}
                                            </td>
                                            <td className="p-0 m-0">
                                                <button
                                                    disabled
                                                    className=" label-base bg-accent/50 text-slate-500"
                                                >
                                                    {data.status}
                                                    <RiLoader2Fill className="ml-1 scale-125 fill-slate-500 stroke-slate-500 group-hover/item:fill-white" />
                                                </button>
                                            </td>

                                            <td className="p-0 m-0 font-normal">
                                                {/* ANCHOR */}
                                                <span className="block">
                                                    {moment(
                                                        data.created_at
                                                    ).format("LL")}
                                                </span>
                                                <span className="block text-[12px]">
                                                    {moment(
                                                        data.created_at
                                                    ).fromNow()}
                                                </span>
                                            </td>
                                            <td className="text-center whitespace-nowrap text-nowrap">
                                                <ModalCekPengusulan
                                                    pengusulanPAK={data}
                                                    setActiveModalId={
                                                        setActiveModalId
                                                    }
                                                    canValidate={canValidate}
                                                    message={modalMessage}
                                                />
                                                {canValidate ? (
                                                    <>
                                                        <div className="relative inline-flex group">
                                                            <button
                                                                className="transition-all scale-110 group/button action-btn border-primary/20 hover:bg-primary"
                                                                onClick={() => {
                                                                    setActiveModalId(
                                                                        data.id
                                                                    );
                                                                    document
                                                                        .getElementById(
                                                                            `DialogCekPengusulan-${data.id}`
                                                                        )
                                                                        .showModal();
                                                                }}
                                                            >
                                                                <FaEye className="scale-125 fill-primary stroke-primary group-hover/button:fill-white" />
                                                            </button>
                                                            <TooltipHover
                                                                message={
                                                                    "Lihat Detail"
                                                                }
                                                            />
                                                        </div>
                                                        <span className="inline-block mx-1"></span>
                                                        <div className="relative inline-flex group">
                                                            <button
                                                                className="transition-all scale-110 group/button action-btn border-hijau/20 hover:bg-hijau"
                                                                onClick={() => {
                                                                    setActiveModalId(
                                                                        data.id
                                                                    );
                                                                    document
                                                                        .getElementById(
                                                                            `DialogCekPengusulan-${data.id}`
                                                                        )
                                                                        .showModal();
                                                                }}
                                                            >
                                                                <FaCheck className="scale-125 fill-hijau group-hover/button:fill-white" />
                                                            </button>
                                                            <TooltipHover
                                                                message={
                                                                    "Setujui Pengusulan"
                                                                }
                                                            />
                                                        </div>
                                                        <span className="inline-block mx-1"></span>
                                                        <div className="relative inline-flex group">
                                                            <button
                                                                onClick={() =>
                                                                    handleReject(
                                                                        data.id
                                                                    )
                                                                }
                                                                className="transition-all scale-110 group/button action-btn border-warning/20 hover:bg-warning"
                                                            >
                                                                <IoClose className="scale-150 fill-warning group-hover/button:fill-white" />
                                                            </button>
                                                            <TooltipHover
                                                                message={
                                                                    "Tolak Pengusulan"
                                                                }
                                                            />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <td className="space-x-2 text-center text-nowrap">
                                                        <div className="relative inline-flex group">
                                                            <button
                                                                className="transition-all scale-110 group/button action-btn border-primary/20 hover:bg-primary"
                                                                onClick={() => {
                                                                    setActiveModalId(
                                                                        data.id
                                                                    );
                                                                    document
                                                                        .getElementById(
                                                                            `DialogCekPengusulan-${data.id}`
                                                                        )
                                                                        .showModal();
                                                                }}
                                                            >
                                                                <FaEye className="scale-125 fill-primary stroke-primary group-hover/button:fill-white" />
                                                            </button>
                                                            <TooltipHover
                                                                message={
                                                                    "Lihat Detail"
                                                                }
                                                            />
                                                        </div>

                                                        <div className="relative inline-flex group">
                                                            <Link
                                                                as="a"
                                                                href={route(
                                                                    "pegawai.pengusulan-pak.edit",
                                                                    data.id
                                                                )}
                                                                disabled= {data.status === "diproses"}
                                                                className={"action-btn group/button group-hover/item:bg-secondary/70 text-secondary/70 " + (data.status=== "diproses" ? 'cursor-not-allowed': 'cursor-default' )}
                                                            >
                                                                <FaEdit
                                                                    className={
                                                                        "scale-125" +
                                                                            data.status ===
                                                                        "ditolak"
                                                                            ? "fill-secondary group-hover/item:fill-white"
                                                                            : "fill-accent"
                                                                    }
                                                                />
                                                            </Link>
                                                            <TooltipHover
                                                                message={
                                                                    "Edit Usulan PAK "
                                                                }
                                                            />
                                                        </div>

                                                        <div className="relative inline-flex group">
                                                            <Link
                                                                as="a"
                                                                href={route(
                                                                    "pegawai.pengusulan-pak.edit",
                                                                    data.id
                                                                )}
                                                                disabled= {data.status === "diproses"}
                                                                className={"action-btn group/button group-hover/item:bg-secondary/70 text-secondary/70 " + (data.status=== "diproses" ? 'cursor-not-allowed': 'cursor-default' )}
                                                            >
                                                                <MdCancel
                                                                    className={
                                                                        "scale-125" +
                                                                            data.status ===
                                                                        "ditolak"
                                                                            ? "fill-secondary group-hover/item:fill-white"
                                                                            : "fill-accent"
                                                                    }
                                                                />
                                                            </Link>
                                                            <TooltipHover
                                                                message={
                                                                    "Batalkan Usulan PAK "
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Pagination */}

                            {/* ANCHOR */}
                            <Pagination
                                datas={pengusulanPAK}
                                urlRoute={
                                    (!canValidate
                                        ? "/pegawai"
                                        : "/divisi-sdm") + "/pengusulan-pak"
                                }
                                filters={{
                                    filter1: byFilter1,
                                    filter2: byFilter2,
                                    filterSearch: search,
                                }}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                {!subTitle
                                    ? "Belum Ada Pengusulan PAK Terbaru Untuk Saat Ini"
                                    : "Tidak Ditemukan"}
                            </h2>
                        </div>
                    )}
                </div>
            </section>
        </Authenticated>
    );
}
