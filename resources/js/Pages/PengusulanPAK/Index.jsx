import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";

import { FaCheck, FaEye, FaTrash } from "react-icons/fa6";
import FilterSearchPegawai from "../KelolaPegawai/Partials/FilterSearchPegawai";
import { IoClose, IoCloseOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link, router, useRemember } from "@inertiajs/react";
import Swal from "sweetalert2";
import {
    Pagination,
    TooltipHover,
    useFilterSearch,
    FilterSearchCustom,
    StatusLabel,
} from "@/Components";
import ModalCekPengusulan from "./Partials/ModalCekPengusulan";
import moment from "moment/min/moment-with-locales";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import PopUpCatatan from "./Partials/PopUpCatatan";
import { BsFillSendArrowUpFill, BsFillSendFill } from "react-icons/bs";

export default function Index({
    auth,
    pengusulanPAK,
    title,
    subTitle,
    flash,
    isDivisiSDM,
    searchReq,
    byStatusReq,
    byJabatanReq,
    jabatanList,
}) {
    moment.locale("id");
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

    const [activeModalId, setActiveModalId] = useState(null);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [popUpData, setPopUpData] = useState({
        id: "",
    });

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
            } else {
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

    const handleReject = (id) => {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin menolak pengusulan ini?",
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
                router.post(route("divisi-sdm.pengusulan-pak.reject", id), {
                    onSuccess: () => {
                        //
                    },
                    onError: (err) => {
                        console.log("Gagal Menolak Pengajuan");
                        console.log(err);
                    },
                });
            }
        });
    };

    const role = auth.user.role;
    function formatRole(label) {
        return label.trim().toLowerCase().replace(/\s+/g, "-");
    }

    const [activeModal, setActiveModal] = useState(null);
    return (
        <Authenticated user={auth.user} title={title}>
            <section className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <div className="flex items-center justify-between w-full">
                    <FilterSearchCustom
                        routeName={`/${formatRole(role)}/pengusulan-pak`}
                        initialFilters={{
                            byJabatan: byJabatanReq,
                            byStatus: byStatusReq,
                        }}
                        filtersConfig={[
                            {
                                name: "byJabatan",
                                label: "Jabatan",
                                options: jabatanList,
                            },
                            {
                                name: "byStatus",
                                label: "Status ",
                                options: [
                                    "diajukan",
                                    "direvisi",
                                    "ditolak",
                                    "divalidasi",
                                ],
                            },
                        ]}
                        searchConfig={
                            isDivisiSDM && {
                                name: "search",
                                label: "Nama/NIP Pegawai",
                                placeholder: "Ketik Nama/NIP Pegawai..",
                                initialValue: searchReq,
                            }
                        }
                    />

                    {!isDivisiSDM && (
                        <Link
                            as="button"
                            href={route("pegawai.pengusulan-pak.create")}
                            className="flex justify-end mx-2 mt-6 text-white btn glass bg-sky-600 hover:bg-primary/90"
                        >
                            Ajukan Pengusulan Baru
                            <BsFillSendFill className="w-5 h-5" />
                        </Link>
                    )}
                </div>

                <div className="pt-3 ">
                    {role === "Pegawai" && (
                        <strong className="block py-3 text-xl">
                            Pengusulan Saya
                        </strong>
                    )}
                    {subTitle && (
                        <div className="my-4">
                            <strong className="text-2xl font-bold text-gray-600">
                                {subTitle}
                            </strong>
                        </div>
                    )}

                    {pengusulanPAK.data.length ? (
                        <>
                            <table className="table text-xs table-bordered">
                                <thead className="text-sm font-medium text-center text-white bg-primary ">
                                    <tr>
                                        <th
                                            scope="col"
                                            dir="rtl"
                                            className="rounded-tl-xl"
                                            width="5%"
                                        >
                                            No
                                        </th>
                                        <th scope="col" width="25%">
                                            NAMA & NIP
                                        </th>
                                        <th scope="col" width="15%">
                                            <span className="flex justify-center">
                                                Jabatan/TMT
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
                                            width="10%"
                                            className="p-0 text-xs text-center "
                                        >
                                            <span>Penilaian</span>
                                            <span className="block">
                                                Pendidikan
                                            </span>
                                        </th>
                                        <th
                                            scope="col"
                                            width="10%"
                                            className="text-center "
                                        >
                                            Status & Waktu
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
                                            <td>{i + 1}</td>
                                            <td className="">
                                                {/* TODO: Bikin bisa expanded nanti */}
                                                <span className="block text-ellipsis">
                                                    {data.pegawai["Nama"]}{" "}
                                                    {data.pegawai[
                                                        "Gelar Tambahan"
                                                    ] ?? ""}
                                                </span>
                                                <span className="block p-1 mt-1 font-medium rounded-md bg-primary/10">
                                                    {data.pegawai["NIP"]}
                                                </span>
                                            </td>
                                            <td>
                                                {data.pegawai["Jabatan/TMT"]}
                                            </td>
                                            <td>
                                                {moment(
                                                    data.periode_mulai
                                                ).format("MMMM")}
                                                {" - "}
                                                {moment(
                                                    data.periode_berakhir
                                                ).format("MMMM YYYY")}
                                            </td>
                                            <td className="text-base">
                                                <span className="block">
                                                    {data.ak_terakhir}
                                                </span>
                                                <span className="block mt-1">
                                                    {data.ak_diajukan}
                                                </span>
                                            </td>
                                            <td className="text-base">
                                                {data.dokumen_pendukung_path
                                                    ? "Ada"
                                                    : "Tidak Ada"}
                                            </td>
                                            <td className="p-0 m-0">
                                                <StatusLabel
                                                    status={data.status}
                                                />
                                                {/* ANCHOR */}
                                                <div className="mt-2 font-normal">
                                                    <span className="block">
                                                        {moment(
                                                            data.updated_at
                                                        ).format("LL")}
                                                    </span>
                                                    <span className="block text-[12px]">
                                                        {moment(
                                                            data.updated_at
                                                        ).fromNow()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="text-center whitespace-nowrap text-nowrap">
                                                <ModalCekPengusulan
                                                    pengusulanPAK={data}
                                                    setActiveModal={
                                                        setActiveModal
                                                    }
                                                    activeModal={
                                                        activeModal
                                                    }
                                                    handleReject={handleReject}
                                                    isDivisiSDM={isDivisiSDM}
                                                    setPopUpData={setPopUpData}
                                                    setIsPopUpOpen={
                                                        setIsPopUpOpen
                                                    }
                                                />

                                                <div className="z-[999]">
                                                    {isPopUpOpen && (
                                                        <PopUpCatatan
                                                            onClose={() =>
                                                                setIsPopUpOpen(
                                                                    !isPopUpOpen
                                                                )
                                                            }
                                                            popUpData={
                                                                popUpData
                                                            }
                                                        />
                                                    )}
                                                </div>

                                                {isDivisiSDM ? (
                                                    <section className="space-x-2">
                                                        <div className="relative inline-flex group">
                                                            <button
                                                                className="transition-all scale-110 group/button action-btn border-primary/20 hover:bg-primary"
                                                                onClick={() => {
                                                                    setActiveModal(
                                                                        `ModalCekPengusulan-${data.id}`
                                                                    );
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
                                                                as="button"
                                                                href={route(
                                                                    "divisi-sdm.pengusulan-pak.approve"
                                                                )}
                                                                className="transition-all scale-110 group/button action-btn border-hijau/20 hover:bg-hijau disabled:bg-accent/25 disabled:cursor-not-allowed "
                                                                disabled={
                                                                    data.status !==
                                                                    "diproses"
                                                                }
                                                                method="post"
                                                                data={{
                                                                    id: data.id,
                                                                }}
                                                                onSuccess={() => {
                                                                    Swal.fire({
                                                                        title: "Berhasil!",
                                                                        text: "Pengusulan PAK telah disetujui. Proses PAK Sekarang?",
                                                                        icon: "success",
                                                                        showCancelButton: true,
                                                                        confirmButtonText:
                                                                            "Proses Sekarang",
                                                                        cancelButtonText:
                                                                            "Nanti Saja",
                                                                        confirmButtonColor:
                                                                            "#2D95C9",
                                                                        cancelButtonColor:
                                                                            "#9ca3af",
                                                                        customClass:
                                                                            {
                                                                                actions:
                                                                                    "my-actions",
                                                                                cancelButton:
                                                                                    "order-1 right-gap",
                                                                                confirmButton:
                                                                                    "order-2",
                                                                                denyButton:
                                                                                    "order-3",
                                                                            },
                                                                    }).then(
                                                                        (
                                                                            result
                                                                        ) => {
                                                                            if (
                                                                                result.isConfirmed
                                                                            ) {
                                                                                router.get(
                                                                                    route(
                                                                                        "divisi-sdm.pak.create-by-pengusulan",
                                                                                        data.id
                                                                                    )
                                                                                );
                                                                            }
                                                                        }
                                                                    );
                                                                }}
                                                                preserveScroll={
                                                                    true
                                                                }
                                                                onError={() =>
                                                                    console.log(
                                                                        "Error:",
                                                                        errors
                                                                    )
                                                                }
                                                            >
                                                                <FaCheck
                                                                    className={
                                                                        "scale-125 group-hover/button:fill-white " +
                                                                        (data.status !==
                                                                        "diproses"
                                                                            ? "fill-accent"
                                                                            : "fill-hijau")
                                                                    }
                                                                />
                                                            </Link>
                                                            <TooltipHover
                                                                message={
                                                                    "Setujui Pengusulan"
                                                                }
                                                            />
                                                        </div>
                                                        <div className="relative inline-flex group">
                                                            <button
                                                                disabled={
                                                                    data.status !==
                                                                    "diproses"
                                                                }
                                                                onClick={() => {
                                                                    setPopUpData(
                                                                        {
                                                                            id: data.id,
                                                                        }
                                                                    );
                                                                    setIsPopUpOpen(
                                                                        true
                                                                    );
                                                                }}
                                                                className="transition-all scale-110 group/button action-btn border-warning/20 hover:bg-warning disabled:bg-accent/25 disabled:cursor-not-allowed"
                                                            >
                                                                <IoClose
                                                                    className={
                                                                        "scale-125 group-hover/button:fill-white " +
                                                                        (data.status !==
                                                                        "diproses"
                                                                            ? "fill-accent"
                                                                            : "fill-warning")
                                                                    }
                                                                />
                                                            </button>
                                                            <TooltipHover
                                                                message={
                                                                    "Tolak Pengusulan"
                                                                }
                                                            />
                                                        </div>
                                                    </section>
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
                                                                as="button"
                                                                href={route(
                                                                    "pegawai.pengusulan-pak.edit",
                                                                    data.id
                                                                )}
                                                                disabled={
                                                                    data.status !==
                                                                    "ditolak"
                                                                }
                                                                className="action-btn action-btn-secondary group/button"
                                                            >
                                                                <FaEdit className="scale-125 group-hover/button:fill-white" />
                                                            </Link>
                                                            <TooltipHover
                                                                message={
                                                                    "Revisi Data" +
                                                                    (data.status !==
                                                                    "ditolak"
                                                                        ? "(setelah ditolak)"
                                                                        : "")
                                                                }
                                                            />
                                                        </div>

                                                        <div className="relative inline-flex group">
                                                            <Link
                                                                as="button"
                                                                method="delete"
                                                                href={route(
                                                                    "pegawai.pengusulan-pak.destroy",
                                                                    data.id
                                                                )}
                                                                disabled={
                                                                    data.status !==
                                                                    "diproses"
                                                                }
                                                                className="action-btn group/button action-btn-warning "
                                                            >
                                                                <MdCancel className="scale-125 group-hover/button:fill-white" />
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
                                    (!isDivisiSDM
                                        ? "/pegawai"
                                        : "/divisi-sdm") + "/pengusulan-pak"
                                }
                                filters={{
                                    filter1: byJabatanReq,
                                    filter2: byStatusReq,
                                    filterSearch: searchReq,
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
