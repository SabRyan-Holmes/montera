import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import {
    MdCancel,
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
    MdPersonSearch,
} from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import {
    InputLabel,
    Pagination,
    PrimaryButton,
    StatusLabel,
    TooltipHover,
    useFilterSearch,
} from "@/Components";
import { TiArrowRight } from "react-icons/ti";
import { TbEyeCheck } from "react-icons/tb";
import { IoCloseOutline, IoDocument } from "react-icons/io5";
import ModalCekValidasi from "./Partials/ModalCekValidasi";
import { FaCheck, FaEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import FilterSearchPegawai from "../KelolaPegawai/Partials/FilterSearchPegawai";
import moment from "moment/min/moment-with-locales";
import ModalCekPengajuan from "./Partials/ModalCekPengajuan";
import { RiInboxArchiveLine } from "react-icons/ri";
import { BiSolidArchiveIn } from "react-icons/bi";

export default function Index({
    auth,
    pengajuans,
    title,
    flash,
    subTitle,
    canValidate,
    isDivisiSDM,
    isPegawai,
    searchReq: initialSearch,
    byStatusReq: initialStatus,
    byJabatanReq: initialJabatan,
    byKesimpulan: initialKesimpulan,
    jabatanList,
    kesimpulanList,
}) {
    // ===========================================Pagination===========================================
    moment.locale("id");

    // ===========================================Handling Pop Up,Dialog & Message===========================================
    // SWAL POP UP
    const [modalMessage, setModalMessage] = useState(null);
    const [activeModalId, setActiveModalId] = useState(null);
    // Cek message dan status modal
    useEffect(() => {
        if (flash.message) {
            if (activeModalId !== null) {
                Swal.fire({
                    target: `#ModalCekValidasi-${activeModalId}`,
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

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    useEffect(() => {
        if (flash.message == "Berhasil Divalidasi") {
            Toast.fire({
                icon: "success",
                title: flash.message,
            });
            setTimeout(() => {
                flash.message = null;
            }, 3000);
        }
    }, [flash.message]);

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

    // ===========================================Handling Search & Filter===========================================

    // ANCHOR
    const [search, setSearch] = useState(initialSearch);
    const [byStatus, setByStatus] = useState(initialStatus);
    const [byJabatan, setByJabatan] = useState(initialJabatan);
    const [byKesimpulan, setByKesimpulan] = useState(initialKesimpulan);

    useEffect(() => {
        if (
            (byJabatan && byJabatan !== initialJabatan) ||
            (byStatus && byStatus !== initialStatus) ||
            (byKesimpulan && byKesimpulan !== initialKesimpulan)
        ) {
            router.get(
                routeName,
                { byJabatan, byStatus, byKesimpulan },
                { replace: true, preserveState: true }
            );
        } else if (
            (byJabatan !== initialJabatan && search !== initialSearch) ||
            (byStatus !== initialStatus && search !== initialSearch) ||
            (byKesimpulan !== initialKesimpulan && search !== initialSearch)
        ) {
            router.get(
                routeName,
                { byJabatan, byStatus, byKesimpulan, search },
                { replace: true, preserveState: true }
            );
        }
    }, [byJabatan, byStatus, byKesimpulan]); // Tambahkan byKesimpulan di sini

    useEffect(() => {
        if (
            byJabatan === "Semua Kategori" &&
            byStatus === "Semua Kategori" &&
            byKesimpulan === "Semua Kategori"
        ) {
            router.get(
                routeName,
                { search },
                { replace: true, preserveState: true }
            );
        } else if (
            byJabatan === "Semua Kategori" &&
            byStatus === "Semua Kategori"
        ) {
            router.get(
                routeName,
                { byKesimpulan, search },
                { replace: true, preserveState: true }
            );
        } else if (
            byJabatan === "Semua Kategori" &&
            byKesimpulan === "Semua Kategori"
        ) {
            router.get(
                routeName,
                { byStatus, search },
                { replace: true, preserveState: true }
            );
        } else if (
            byStatus === "Semua Kategori" &&
            byKesimpulan === "Semua Kategori"
        ) {
            router.get(
                routeName,
                { byJabatan, search },
                { replace: true, preserveState: true }
            );
        } else if (byJabatan === "Semua Kategori") {
            router.get(
                routeName,
                { byStatus, byKesimpulan, search },
                { replace: true, preserveState: true }
            );
        } else if (byStatus === "Semua Kategori") {
            router.get(
                routeName,
                { byJabatan, byKesimpulan, search },
                { replace: true, preserveState: true }
            );
        } else if (byKesimpulan === "Semua Kategori") {
            router.get(
                routeName,
                { byJabatan, byStatus, search },
                { replace: true, preserveState: true }
            );
        } else if (search && search !== initialSearch) {
            router.get(
                routeName,
                { search },
                { replace: true, preserveState: true }
            );
        }
    }, [search]);

    const [expandedRows, setExpandedRows] = useState({}); //Handling wrapped text on pengajuan.kesimpulan
    const [showIframe, setShowIframe] = useState(false);

    // Console

    return (
        <Authenticated user={auth.user} title={title}>
            <section className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                {/* Preview PDF di iframe */}
                {showIframe && (
                    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
                        <div className="relative w-full max-w-7xl h-[80vh] bg-white rounded shadow-lg overflow-hidden">
                            <button
                                className="absolute z-10 p-2 transition bg-white rounded-full shadow group top-2 right-2 hover:bg-red-500 hover:text-white"
                                onClick={() => setShowIframe(false)}
                            >
                                <IoCloseOutline className="w-6 h-6 stroke-red-500 group-hover:stroke-white" />
                            </button>
                            <iframe
                                src={route("pak.preview")}
                                width="100%"
                                height="100%"
                                className="border-0"
                            ></iframe>
                        </div>
                    </div>
                )}
                {/* Preview PDF di iframe */}

                <form className="flex items-center justify-between w-full gap-3 my-3">
                    <div className="flex items-center justify-start gap-3">
                        <div className="flex-none laptop:w-fit">
                            <InputLabel
                                value="Jabatan"
                                Htmlfor="byJabatan"
                                className="max-w-sm ml-1 text-lg"
                            />
                            <select
                                className="w-full max-w-xs text-sm border select border-gradient selection:text-primary disabled:text-accent"
                                name="byJabatan"
                                value={byJabatan}
                                onChange={(e) => setByJabatan(e.target.value)}
                            >
                                <option value="">Semua Kategori</option>
                                {jabatanList.map((item) => (
                                    <option className="capitalize">
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-none laptop:w-fit">
                            <InputLabel
                                value="Status"
                                Htmlfor="byStatus"
                                className="max-w-sm ml-1 text-lg"
                            />

                            <select
                                className="w-full max-w-xs text-sm border select border-gradient selection:text-primary disabled:text-accent"
                                name="byStatus"
                                id="byStatus"
                                value={byStatus}
                                onChange={(e) => setByStatus(e.target.value)}
                            >
                                <option value="">Semua Kategori</option>
                                <option>diproses</option>
                                <option>ditolak</option>
                                <option>disetujui</option>
                            </select>
                        </div>
                        <div className="flex-none laptop:w-fit">
                            <InputLabel
                                value="Kesimpulan"
                                Htmlfor="byKesimpulan"
                                className="max-w-sm ml-1 text-lg"
                            />

                            <select
                                className="w-full max-w-xs text-sm border select border-gradient selection:text-primary disabled:text-accent"
                                name="byKesimpulan"
                                id="byKesimpulan"
                                value={byKesimpulan}
                                onChange={(e) =>
                                    setByKesimpulan(e.target.value)
                                }
                            >
                                <option value="">Semua Kategori</option>
                                {kesimpulanList.map((item) => (
                                    <option className="capitalize">
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="w-80">
                        <InputLabel
                            value="Nama/NIP"
                            Htmlfor="search"
                            className="max-w-sm ml-1 text-lg"
                        />

                        <label
                            htmlFor="search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                                <MdPersonSearch className="w-6 h-6 fill-primary" />
                            </div>
                            <input
                                type="search"
                                id="search"
                                defaultValue={search}
                                onSubmit={(e) => setSearch(e.target.value)}
                                name="search"
                                className=" w-full p-4 py-[13px] pl-10 text-sm placeholder:text-accent text-gray-900 border border-gradient rounded-md"
                                placeholder="Cari Nama Pegawai/NIP.."
                            />
                            <PrimaryButton
                                type="submit"
                                className=" absolute end-2 bottom-[6px] "
                            >
                                Search
                            </PrimaryButton>
                        </div>
                    </div>
                </form>

                <div className="pt-3 ">
                    {pengajuans.data.length ? (
                        <>
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
                                        <th scope="col" width="10%">
                                            No PAK
                                        </th>
                                        <th
                                            scope="col"
                                            width="20%"
                                            className=""
                                        >
                                            Nama & NIP
                                        </th>
                                        <th scope="col" width="15%">
                                            <span className="flex justify-center">
                                                Jabatan
                                            </span>
                                        </th>
                                        <th
                                            scope="col"
                                            width="7%"
                                            className="w-16 p-1 text-xs"
                                        >
                                            <span>Jumlah Angka </span>
                                            <span className="block">
                                                Kredit Kumulatif
                                            </span>
                                        </th>
                                        <th scope="col" width="60%">
                                            <span className="flex justify-center">
                                                Kesimpulan
                                            </span>
                                        </th>
                                        <th
                                            scope="col"
                                            width="2rem"
                                            className="text-center "
                                        >
                                            Status & Waktu
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
                                    {pengajuans.data?.map((pengajuan, i) => {
                                        let pegawai =
                                            pengajuan.riwayat_pak.pegawai;
                                        return (
                                            <tr role="list" key={i}>
                                                <td className="text-center">
                                                    {i + 1}
                                                </td>
                                                <td>
                                                    {
                                                        pengajuan.riwayat_pak[
                                                            "no_surat3"
                                                        ]
                                                    }
                                                </td>
                                                <td>
                                                    <span className="block">
                                                        {pegawai["Nama"]}
                                                        {pegawai[
                                                            "Gelar Tambahan"
                                                        ] ?? ""}
                                                    </span>
                                                    <span className="block p-1 mt-1 font-medium rounded-md bg-primary/10">
                                                        {pegawai["NIP"]}
                                                    </span>
                                                </td>
                                                <td>
                                                    {pegawai["Jabatan/TMT"]
                                                        .split("/")[0]
                                                        .trim()}
                                                </td>
                                                <td className="text-center">
                                                    {parseFloat(
                                                        pengajuan.riwayat_pak[
                                                            "jakk"
                                                        ]["jumlah"]
                                                    ).toFixed(3)}
                                                </td>
                                                <td
                                                    className="relative group cursor-pointer max-w-[300px] text-xs"
                                                    onClick={() =>
                                                        setExpandedRows(
                                                            (prev) => ({
                                                                ...prev,
                                                                [pengajuan.id]:
                                                                    !prev[
                                                                        pengajuan
                                                                            .id
                                                                    ],
                                                            })
                                                        )
                                                    }
                                                >
                                                    {/* Konten teks */}
                                                    <span>
                                                        {expandedRows[
                                                            pengajuan.id
                                                        ]
                                                            ? pengajuan
                                                                  .riwayat_pak[
                                                                  "kesimpulan"
                                                              ]
                                                            : pengajuan
                                                                  .riwayat_pak[
                                                                  "kesimpulan"
                                                              ].length > 70
                                                            ? pengajuan.riwayat_pak[
                                                                  "kesimpulan"
                                                              ].slice(0, 70) +
                                                              "..."
                                                            : pengajuan
                                                                  .riwayat_pak[
                                                                  "kesimpulan"
                                                              ]}
                                                    </span>

                                                    {/* Tooltip bubble */}
                                                    {!expandedRows[
                                                        pengajuan.id
                                                    ] && (
                                                        <div
                                                            className="absolute z-[999] w-20 px-3 py-1 mt-2 text-xs text-white transition-opacity duration-200
                                                             -translate-x-1/2 bg-accent rounded shadow-lg opacity-0 pointer-events-none left-1/2 top-full group-hover:opacity-100"
                                                        >
                                                            Klik untuk tampilkan
                                                            lengkap
                                                            {/* Segitiga bawah tooltip */}
                                                            <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-accent -top-1 left-1/2"></div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="w-5 p-0 m-0 text-center ">
                                                    <StatusLabel
                                                        status={
                                                            pengajuan.status
                                                        }
                                                    />
                                                    {/* ANCHOR */}
                                                    <div className="mt-2">
                                                        <span className="block">
                                                            {moment(
                                                                pengajuan.updated_at
                                                            ).format("LL")}
                                                        </span>
                                                        <span className="block text-[12px]">
                                                            {moment(
                                                                pengajuan.updated_at
                                                            ).fromNow()}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* SECTION Action Button-Role Pimpinan  */}

                                                {canValidate && (
                                                    <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                        {/* Actor Pimpinan */}

                                                        {/* Dialog Cek dan Validasi, Membuat Tanda Tangan/sign, dan melihat PDF */}
                                                        {/* Jika Belum divalidasi */}

                                                        <>
                                                            <ModalCekValidasi
                                                                pengajuan={
                                                                    pengajuan
                                                                }
                                                                setActiveModalId={
                                                                    setActiveModalId
                                                                }
                                                                message={
                                                                    modalMessage
                                                                }
                                                            />
                                                            <button
                                                                className="action-btn-secondary action-btn group/button"
                                                                onClick={() => {
                                                                    setActiveModalId(
                                                                        pengajuan.id
                                                                    );
                                                                    document
                                                                        .getElementById(
                                                                            `ModalCekValidasi-${pengajuan.id}`
                                                                        )
                                                                        .showModal();
                                                                }}
                                                            >
                                                                <TbEyeCheck className="scale-150 group-hover/button:stroke-white " />
                                                            </button>
                                                            <div className="relative inline-flex group">
                                                                <Link
                                                                    as="button"
                                                                    href={route(
                                                                        "pimpinan.pengajuan.approve"
                                                                    )}
                                                                    className="action-btn-success action-btn group/button"
                                                                    disabled={
                                                                        pengajuan.status !==
                                                                        "diajukan"
                                                                    }
                                                                    method="post"
                                                                    data={{
                                                                        fast_approve: true,
                                                                        id: pengajuan.id,
                                                                    }}
                                                                    preserveScroll={
                                                                        true
                                                                    }
                                                                    onError={(
                                                                        err
                                                                    ) =>
                                                                        alert(
                                                                            err.signature
                                                                        )
                                                                    }
                                                                >
                                                                    <FaCheck
                                                                        className={
                                                                            "scale-125 group-hover/button:stroke-white group-hover/button:fill-white"
                                                                        }
                                                                    />
                                                                </Link>
                                                                <TooltipHover
                                                                    message={
                                                                        "Validasi Cepat" +
                                                                        (pengajuan.status !==
                                                                            "diajukan" &&
                                                                            `(Telah ${pengajuan.status})`)
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="relative inline-flex group">
                                                                <button
                                                                    disabled={
                                                                        pengajuan.status !==
                                                                        "diajukan"
                                                                    }
                                                                    onClick={() =>
                                                                        handleReject(
                                                                            pengajuan.id
                                                                        )
                                                                    }
                                                                    className="action-btn-warning action-btn group/button"
                                                                >
                                                                    <IoCloseOutline className="scale-150 fill-warning stroke-warning/80 group-hover/button:stroke-white" />
                                                                </button>
                                                                <TooltipHover
                                                                    message={
                                                                        "Tolak Pengajuan" +
                                                                        (pengajuan.status !==
                                                                            "diajukan" &&
                                                                            `(Telah ${pengajuan.status})`)
                                                                    }
                                                                />
                                                            </div>
                                                        </>
                                                    </td>
                                                )}
                                                {/* !SECTION Action Button-Role Pimpinan  */}

                                                {/* SECTION Action Button-Role Divisi SDM  */}
                                                {/* ANCHOR */}
                                                {isDivisiSDM && (
                                                    <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                        {/* Actor Divisi SDM */}
                                                        {/* Tombol Lihat Detail Riwayat PAK */}
                                                        <ModalCekPengajuan
                                                            pengajuan={
                                                                pengajuan
                                                            }
                                                            isDivisiSDM={isDivisiSDM}
                                                        />
                                                        <div className="relative inline-flex group">
                                                            <button
                                                                onClick={() =>
                                                                    document
                                                                        .getElementById(
                                                                            `ModalCekPengajuan-${pengajuan.id}`
                                                                        )
                                                                        .showModal()
                                                                }
                                                                className="transition-all scale-110 group/button action-btn border-hijau/20 hover:bg-hijau"
                                                            >
                                                                <FaEye className="scale-125 fill-hijau stroke-hijau group-hover/button:fill-white" />
                                                            </button>
                                                            <TooltipHover
                                                                message={
                                                                    "Lihat Detail PAK"
                                                                }
                                                            />
                                                        </div>
                                                        {/* TODO : bikin nanti logic kalo ditolak baru bisa diedit */}
                                                        {pengajuan.status ===
                                                        "ditolak" ? (
                                                            <div className="relative inline-flex group">
                                                                <Link
                                                                    as="a"
                                                                    className="transition-all scale-110 group/button action-btn border-secondary/20 hover:bg-secondary"
                                                                >
                                                                    <FaEdit className="scale-125 fill-secondary group-hover/button:fill-white" />
                                                                </Link>

                                                                <TooltipHover
                                                                    message={
                                                                        "Lihat Detail PAK"
                                                                    }
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="relative inline-flex group">
                                                                <Link
                                                                    as="button"
                                                                    href={route(
                                                                        "pak.process"
                                                                    )}
                                                                    onSuccess={() => {
                                                                        setShowIframe(
                                                                            true
                                                                        );
                                                                    }}
                                                                    data={
                                                                        pengajuan.riwayat_pak
                                                                    }
                                                                    method="post"
                                                                    className="transition-all scale-110 group/button action-btn border-secondary/20 hover:bg-secondary"
                                                                >
                                                                    <IoDocument className="scale-125 fill-secondary group-hover/button:fill-white" />
                                                                </Link>
                                                                {/* Tooltip Hover  */}
                                                                <TooltipHover
                                                                    message={
                                                                        "Lihat Tampilan PDF"
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="relative inline-flex group">
                                                            <button
                                                                onClick={() =>
                                                                    handleCancel(
                                                                        pengajuan.id
                                                                    )
                                                                }
                                                                className="transition-all scale-110 group/button action-btn border-warning/20 hover:bg-warning"
                                                            >
                                                                <MdCancel className="scale-125 fill-warning/80 group-hover/button:fill-white" />
                                                            </button>
                                                            <TooltipHover
                                                                message={
                                                                    "Batalkan"
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                )}
                                                {/* !SECTION Action Button-Role Divisi SDM  */}

                                                {/* SECTION Action Button-Role Pegawai */}
                                                {isPegawai && (
                                                    <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                        {/* Tombol Lihat Detail Riwayat PAK */}
                                                        <ModalCekPengajuan
                                                            pengajuan={
                                                                pengajuan
                                                            }
                                                        />
                                                        <div className="relative inline-flex group">
                                                            <button
                                                                onClick={() =>
                                                                    document
                                                                        .getElementById(
                                                                            `ModalCekPengajuan-${pengajuan.id}`
                                                                        )
                                                                        .showModal()
                                                                }
                                                                className="action-btn-primary action-btn group/button"
                                                            >
                                                                <FaEye className="scale-125 group-hover/button:fill-white" />
                                                            </button>
                                                            <TooltipHover
                                                                message={
                                                                    "Lihat Detail PAK"
                                                                }
                                                            />
                                                        </div>

                                                            <div className="relative inline-flex group">
                                                                <Link
                                                                    as="button"
                                                                    href={route(
                                                                        "pak.process"
                                                                    )}
                                                                    onSuccess={() => {
                                                                        setShowIframe(
                                                                            true
                                                                        );
                                                                    }}
                                                                    data={
                                                                        pengajuan.riwayat_pak
                                                                    }
                                                                    method="post"
                                                                    className="action-btn-secondary action-btn group/button"
                                                                >
                                                                    <IoDocument className="scale-125 group-hover/button:fill-white" />
                                                                </Link>
                                                                {/* Tooltip Hover  */}
                                                                <TooltipHover
                                                                    message={
                                                                        "Lihat/Download Dokumen"
                                                                    }
                                                                />
                                                            </div>

                                                        <div className="relative inline-flex group">
                                                            <button
                                                                onClick={() =>
                                                                    handleCancel(
                                                                        pengajuan.id
                                                                    )
                                                                }
                                                                disabled={pengajuan.status !== "divalidasi"}
                                                                className="action-btn-success action-btn group/button"
                                                            >
                                                                <BiSolidArchiveIn  className="scale-150 group-hover/button:fill-white" />
                                                            </button>
                                                            <TooltipHover
                                                                message={
                                                                    "Arsipkan Dokumen"
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                )}



                                                {/* !SECTION Action Button-Role Pegawai */}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            <Pagination
                                datas={pengajuans}
                                urlRoute={
                                    (canValidate
                                        ? "/pimpinan"
                                        : "/divisi-sdm") + "/pengajuan"
                                }
                                filters={{
                                    filter1: byStatus,
                                    filter2: byJabatan,
                                    filterSearch: search,
                                }}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                Belum Ada Pengajuan Untuk Saat Ini
                            </h2>
                        </div>
                    )}
                </div>
            </section>
        </Authenticated>
    );
}
