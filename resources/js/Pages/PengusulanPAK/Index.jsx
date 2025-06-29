import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useRef, useState } from "react";

import { FaCheck, FaEye } from "react-icons/fa6";
import { IoClose, IoCloseOutline } from "react-icons/io5";
import { Link, router, useRemember } from "@inertiajs/react";
import Swal from "sweetalert2";
import {
    Pagination,
    TooltipHover,
    FilterSearchCustom,
    StatusLabel,
} from "@/Components";
import ModalCekPengusulan from "./Partials/ModalCekPengusulan";
import moment from "moment/min/moment-with-locales";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import ModalCatatan from "@/Components/ModalCatatan";

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
    processed,
}) {
    moment.locale("id");
    const [shownMessages, setShownMessages] = useRemember([]);
    const [activeModal, setActiveModal] = useState(null);
    const [showIframe, setShowIframe] = useState(false);
    const [linkIframe, setLinkIframe] = useState("");
    useEffect(() => {
        if (flash.message) {
            Swal.fire({
                ...(activeModal && { target: `#${activeModal}` }),
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

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    const shown = useRef(new Set());

    useEffect(() => {
        if (
            flash.toast &&
            flash.toast_id &&
            !shown.current.has(flash.toast_id)
        ) {
            Toast.fire({
                icon: "success",
                title: flash.toast,
            });

            shown.current.add(flash.toast_id);

            // Optional: reset biar bisa muncul lagi setelah beberapa detik
            setTimeout(() => {
                shown.current.delete(flash.toast_id);
            }, 3000);
        }
    }, [flash.toast_id]);

    const handleApprove = (id) => {
        router.post(
            route("divisi-sdm.pengusulan-pak.approve", id),
            {},
            {
                onError: (err) => alert(err),
                onSuccess: () => {
                    setActiveModal(null);
                    Swal.fire({
                        title: "Berhasil!",
                        text: "Pengusulan PAK telah disetujui. Proses PAK Sekarang?",
                        icon: "success",
                        showCancelButton: true,
                        confirmButtonText: "Proses Sekarang",
                        cancelButtonText: "Nanti Saja",
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
                            router.get(
                                route("divisi-sdm.pak.create-by-pengusulan", id)
                            );
                        }
                    });
                },
            }
        );
    };

    // batal usulan
    const handleDelete = (id) => {
        Swal.fire({
            ...(activeModal && { target: `#${activeModal}` }),
            icon: "warning",
            text: "Anda yakin ingin membatalkan usulan?",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#2D95C9",
            cancelButtonColor: "#9ca3af",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("pegawai.pengusulan-pak.destroy", id), {
                    preserveState: false,
                    onError: (err) => JSON.stringify(err),
                    onSuccess: () => setActiveModal(null),
                });
            }
        });
    };

    const handleReject = (id) => {
        setActiveModal(`ModalCatatan-${id}`);
    };

    const showIframeWithFile = (filePath) => {
        if (!filePath) return;

        setLinkIframe(`/storage/${filePath}`);
        setShowIframe(true);
    };

    const role = auth.user.role;
    function formatRole(label) {
        return label.trim().toLowerCase().replace(/\s+/g, "-");
    }

    const [showDetail, setShowDetail] = useState(null);

    return (
        <Authenticated user={auth.user} title={title}>
            {showIframe && (
                <div className="w-full fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-7xl h-[80vh] bg-white rounded shadow-lg overflow-hidden">
                        <button
                            className="absolute z-10 p-2 transition bg-white rounded-full shadow group top-2 right-2 hover:bg-red-500 hover:text-white"
                            onClick={() => setShowIframe(false)}
                        >
                            <IoCloseOutline className="w-6 h-6 stroke-red-500 group-hover:stroke-white" />
                        </button>

                        {/* Indikator Loading */}
                        {!linkIframe ? (
                            <div className="text-center ">
                                <span className="loading loading-spinner loading-lg"></span>
                                <p className="mt-4 text-gray-600">
                                    Memuat Dokumen...
                                </p>
                            </div>
                        ) : (
                            <iframe
                                src={linkIframe}
                                width="100%"
                                height="100%"
                                className="border-0"
                            ></iframe>
                        )}
                    </div>
                </div>
            )}
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <ModalCatatan
                    activeModal={activeModal}
                    onClose={() => setActiveModal(null)}
                    routeName={"divisi-sdm.pengusulan-pak.reject"}
                    placeholder={
                        "Ketikkan catatan untuk penolakan pengusulan pak ini"
                    }
                />

                {showDetail && (
                    <ModalCekPengusulan
                        id={showDetail}
                        onClose={() => setShowDetail(null)}
                        handleAction={{
                            handleApprove,
                            handleDelete,
                            handleReject,
                            showIframeWithFile,
                        }}
                    />
                )}

                <section className="flex items-center justify-between w-full">
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
                                    "selesai",
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
                </section>

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
                                    {/* TODO: Buat Indikator mana pengusulan PAK yang sudah disetujui tapi belum diproses */}
                                    {pengusulanPAK.data?.map((data, i) => {
                                        const isValidated = [
                                            "ditolak",
                                            "disetujui",
                                            "selesai",
                                        ].includes(data.status);
                                        const isProcessed = processed.includes(
                                            data.id
                                        );
                                        return (
                                            <tr className="font-semibold text-center">
                                                <td>{i + 1}</td>
                                                <td className="">
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
                                                    {
                                                        data.pegawai[
                                                            "Jabatan/TMT"
                                                        ]
                                                    }
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
                                                <td className="relative text-sm font-normal group">
                                                    {data.dokumen_pendukung_path
                                                        ? "Ada"
                                                        : "Tidak Ada"}
                                                </td>
                                                <td className="p-0 m-0">
                                                    <StatusLabel
                                                        status={data.status}
                                                        isDone={isProcessed}
                                                    />
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
                                                <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                    <div className="relative inline-flex group">
                                                        <button
                                                            className="transition-all scale-110 group action-btn border-primary/20 hover:bg-primary"
                                                            onClick={() =>
                                                                setShowDetail(
                                                                    data.id
                                                                )
                                                            }
                                                        >
                                                            <FaEye className="scale-125 fill-primary stroke-primary group-hover:fill-white" />
                                                        </button>
                                                        <TooltipHover
                                                            message={
                                                                "Lihat Detail"
                                                            }
                                                        />
                                                    </div>

                                                    {isDivisiSDM ? (
                                                        <>
                                                            <div className="relative inline-flex group">
                                                                <button
                                                                    className="group action-btn action-btn-success"
                                                                    onClick={() =>
                                                                        handleApprove(
                                                                            data.id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        isValidated
                                                                    }
                                                                >
                                                                    <FaCheck className="scale-125 group-hover:fill-white" />
                                                                </button>
                                                                <TooltipHover
                                                                    message={
                                                                        "Setujui Pengusulan"
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="relative inline-flex group">
                                                                <button
                                                                    disabled={
                                                                        isValidated
                                                                    }
                                                                    onClick={() =>
                                                                        handleReject(
                                                                            data.id
                                                                        )
                                                                    }
                                                                    className="group action-btn action-btn-warning"
                                                                >
                                                                    <IoClose className="scale-125 group-hover:fill-white " />
                                                                </button>
                                                                <TooltipHover
                                                                    message={
                                                                        "Tolak Pengusulan" +
                                                                        (data.status !==
                                                                        "diajukan"
                                                                            ? `(Telah ${data.status})`
                                                                            : "")
                                                                    }
                                                                />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
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
                                                                    className="action-btn action-btn-secondary group"
                                                                >
                                                                    <FaEdit className="scale-125 group-hover:fill-white" />
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
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            data.id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        data.status ===
                                                                            "disetujui" ||
                                                                        data.status ===
                                                                            "selesai"
                                                                    }
                                                                    className="action-btn group action-btn-warning "
                                                                >
                                                                    <MdCancel className="scale-125 group-hover:fill-white" />
                                                                </button>
                                                                <TooltipHover
                                                                    message={
                                                                        "Batalkan Usulan PAK "
                                                                    }
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            <Pagination
                                datas={pengusulanPAK}
                                urlRoute={`/${formatRole(role)}/pengusulan-pak`}
                                filters={{
                                    byJabatan: byJabatanReq,
                                    byStatus: byStatusReq,
                                    search: searchReq,
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
            </main>
        </Authenticated>
    );
}
