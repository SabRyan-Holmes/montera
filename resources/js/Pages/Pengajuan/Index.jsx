import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import {
    MdCancel,
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
    MdPersonSearch,
} from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Link, router, useRemember } from "@inertiajs/react";
import Swal from "sweetalert2";
import {
    FilterSearchCustom,
    InputLabel,
    Pagination,
    PrimaryButton,
    StatusLabel,
    TooltipHover,
    useFilterSearch,
} from "@/Components";
import { TbEyeCheck } from "react-icons/tb";
import { IoCloseOutline, IoDocument } from "react-icons/io5";
import ModalCekValidasi from "./Partials/ModalCekValidasi";
import { FaCheck, FaDownload, FaEye } from "react-icons/fa6";
import { FaEdit, FaFileDownload } from "react-icons/fa";
import FilterSearchPegawai from "../KelolaPegawai/Partials/FilterSearchPegawai";
import moment from "moment/min/moment-with-locales";
import ModalCekPengajuan from "./Partials/ModalCekPengajuan";
import { BiSolidArchiveIn } from "react-icons/bi";
import ModalArsipDokumen from "./Partials/ModalArsipDokumen";
import ModalCatatan from "../../Components/ModalCatatan";

export default function Index({
    auth,
    pengajuans,
    title,
    flash,
    subTitle,
    isPimpinan,
    isDivisiSDM,
    isPegawai,
    searchReq,
    byStatusReq,
    byJabatanReq,
    byKesimpulanReq,
    jabatanList,
    kesimpulanList,
    folderArsipList,
}) {
    // ===========================================Pagination===========================================
    moment.locale("id");

    // ===========================================Handling Pop Up,Dialog & Message===========================================
    // SWAL POP UP
    const [shownMessages, setShownMessages] = useRemember([]);
    const [activeModal, setActiveModal] = useState(null);

    // Cek message dan status modal
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
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    useEffect(() => {
        if (flash.toast) {
            Toast.fire({
                icon: "success",
                title: flash.toast,
            });
        }
    }, [flash.toast]);

    // UndoSubmit divisi SDM
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
                        alert("Gagal Menghapus Data");
                    },
                });
            }
        });
    };

    // ===========================================Handling Search & Filter===========================================

    // ANCHOR

    const [expandedRows, setExpandedRows] = useState({}); //Handling wrapped text on pengajuan.kesimpulan
    const [showIframe, setShowIframe] = useState(false);

    const role = auth.user.role;
    function formatRole(label) {
        return label.trim().toLowerCase().replace(/\s+/g, "-");
    }
    return (
        <Authenticated user={auth.user} title={title}>
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
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

                <ModalCatatan
                    activeModal={activeModal}
                    setActiveModal={setActiveModal}
                    routeName={"pimpinan.pengajuan.reject"}
                />

                <section className="flex items-center justify-between w-full">
                    <FilterSearchCustom
                        routeName={`/${formatRole(role)}/${
                            isPegawai ? "proses-pak/pengajuan" : "pengajuan"
                        }`}
                        initialFilters={{
                            byJabatan: byJabatanReq,
                            byStatus: byStatusReq,
                            byKesimpulan: byKesimpulanReq,
                        }}
                        filtersConfig={[
                            // TODO: saya ingin filetJbaatan ini ada kalo !isPegawai doang
                            ...(!isPegawai
                                ? [
                                      {
                                          name: "byJabatan",
                                          label: "Jabatan",
                                          options: jabatanList,
                                      },
                                  ]
                                : []),
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
                            {
                                name: "byKesimpulan",
                                label: "Kesimpulan ",
                                options: kesimpulanList,
                            },
                        ]}
                        searchConfig={
                            !isPegawai && {
                                name: "search",
                                label: "Nama/NIP Pegawai",
                                placeholder: "Ketik Nama/NIP Pegawai..",
                                initialValue: searchReq,
                            }
                        }
                    />
                </section>

                <div className="pt-3 ">
                    {isPegawai && (
                        <div className="mb-2">
                            <strong className="text-2xl font-bold text-gray-600 ">
                                Proses PAK Saya
                            </strong>
                        </div>
                    )}
                    {subTitle && (
                        <div className="my-4">
                            <strong className="text-2xl font-bold text-gray-600">
                                {subTitle}
                            </strong>
                        </div>
                    )}

                    {pengajuans.data.length ? (
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
                                        <th scope="col" width="10%">
                                            No PAK
                                        </th>
                                        {!isPegawai ? (
                                            <>
                                                <th
                                                    scope="col"
                                                    width="20%"
                                                    className=""
                                                >
                                                    Nama & NIP Pegawai
                                                </th>
                                                <th scope="col" width="20%">
                                                    Jabatan
                                                </th>
                                            </>
                                        ) : (
                                            <>
                                                <th scope="col" width="10%">
                                                    AK Terakhir
                                                </th>
                                                <th scope="col" width="10%">
                                                    AK Terbaru
                                                </th>
                                            </>
                                        )}

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
                                        const isValidated = [
                                            "ditolak",
                                            "divalidasi",
                                        ].includes(pengajuan.status);
                                        return (
                                            <tr
                                                role="list"
                                                key={i}
                                                className="text-center"
                                            >
                                                <td>{i + 1}</td>
                                                <td>
                                                    {
                                                        pengajuan.riwayat_pak[
                                                            "no_surat3"
                                                        ]
                                                    }
                                                </td>
                                                {!isPegawai ? (
                                                    <>
                                                        <td>
                                                            <span className="block">
                                                                {
                                                                    pegawai[
                                                                        "Nama"
                                                                    ]
                                                                }
                                                                {pegawai[
                                                                    "Gelar Tambahan"
                                                                ] ?? ""}
                                                            </span>
                                                            <span className="block p-1 mt-1 font-medium rounded-md bg-primary/10">
                                                                {pegawai["NIP"]}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {
                                                                pegawai[
                                                                    "Jabatan/TMT"
                                                                ]
                                                            }
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>
                                                            {parseFloat(
                                                                pengajuan
                                                                    .riwayat_pak[
                                                                    "ak_terakhir"
                                                                ]
                                                            ).toFixed(3)}
                                                        </td>
                                                        <td>
                                                            {parseFloat(
                                                                pengajuan
                                                                    .riwayat_pak[
                                                                    "angka_kredit"
                                                                ]
                                                            ).toFixed(3)}
                                                        </td>
                                                    </>
                                                )}

                                                <td>
                                                    {parseFloat(
                                                        pengajuan.riwayat_pak[
                                                            "jakk"
                                                        ]["jumlah"]
                                                    ).toFixed(3)}
                                                </td>
                                                <td
                                                    className="relative text-left group cursor-pointer max-w-[300px] text-xs"
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
                                                <td className="w-5 p-0 py-2 m-0">
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
                                                {isPimpinan && (
                                                    <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                        {/* Actor Pimpinan */}

                                                        <>
                                                            <ModalCekPengajuan
                                                                pengajuan={
                                                                    pengajuan
                                                                }
                                                                setActiveModal={
                                                                    setActiveModal
                                                                }
                                                                activeModal={
                                                                    activeModal
                                                                }
                                                            />
                                                            <div className="relative inline-flex group">
                                                                <button
                                                                    className="action-btn-primary action-btn group"
                                                                    onClick={() => {
                                                                        setActiveModal(
                                                                            `ModalCekPengajuan-${pengajuan.id}`
                                                                        );
                                                                    }}
                                                                >
                                                                    <FaEye className="scale-125 group-hover:fill-white " />
                                                                </button>
                                                                <TooltipHover
                                                                    message={
                                                                        "Lihat Data"
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="relative inline-flex group">
                                                                <Link
                                                                    as="button"
                                                                    href={route(
                                                                        "pimpinan.pengajuan.approve",
                                                                        pengajuan.id
                                                                    )}
                                                                    className="action-btn-success action-btn group/button"
                                                                    disabled={
                                                                        isValidated
                                                                    }
                                                                    method="post"
                                                                    preserveScroll={
                                                                        true
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
                                                                        "Validasi Pengajuan" +
                                                                        (pengajuan.status !==
                                                                        "diajukan"
                                                                            ? `(Telah ${pengajuan.status})`
                                                                            : "")
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="relative inline-flex group">
                                                                <button
                                                                    disabled={
                                                                        isValidated
                                                                    }
                                                                    onClick={() => {
                                                                        setActiveModal(
                                                                            `ModalCatatan-${pengajuan.id}`
                                                                        );
                                                                    }}
                                                                    className="action-btn-warning action-btn group/button"
                                                                >
                                                                    <IoCloseOutline className="scale-150 group-hover/button:stroke-white" />
                                                                </button>
                                                                <TooltipHover
                                                                    message={
                                                                        "Tolak Pengajuan" +
                                                                        (pengajuan.status !==
                                                                        "diajukan"
                                                                            ? `(Telah ${pengajuan.status})`
                                                                            : "")
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
                                                            setActiveModal={
                                                                setActiveModal
                                                            }
                                                            activeModal={
                                                                activeModal
                                                            }
                                                            pengajuan={
                                                                pengajuan
                                                            }
                                                        />
                                                        <div className="relative inline-flex group">
                                                            <button
                                                                onClick={() => {
                                                                    setActiveModal(
                                                                        `ModalCekPengajuan-${pengajuan.id}`
                                                                    );
                                                                }}
                                                                className="action-btn action-btn-primary group/button"
                                                            >
                                                                <FaEye className="scale-125 group-hover/button:fill-white" />
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
                                                                    href={route(
                                                                        "divisi-sdm.pengajuan.revisi",
                                                                        {
                                                                            pakId: pengajuan
                                                                                .riwayat_pak
                                                                                .id,
                                                                            isRevisi: true,
                                                                            pengajuanId:
                                                                                pengajuan.id,
                                                                        }
                                                                    )}
                                                                    className="transition-all scale-110 group/button action-btn border-secondary/20 hover:bg-secondary"
                                                                >
                                                                    <FaEdit className="scale-125 fill-secondary group-hover/button:fill-white" />
                                                                </Link>

                                                                <TooltipHover
                                                                    message={
                                                                        "Revisi Data"
                                                                    }
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="relative inline-flex group">
                                                                {pengajuan.status !==
                                                                "divalidasi" ? (
                                                                    <>
                                                                        <Link
                                                                            as="a"
                                                                            href={route(
                                                                                "pak.process"
                                                                            )}
                                                                            download
                                                                            onSuccess={() => {
                                                                                setShowIframe(
                                                                                    true
                                                                                );
                                                                            }}
                                                                            data={
                                                                                pengajuan.riwayat_pak
                                                                            }
                                                                            method="post"
                                                                            className="transition-all scale-110 group action-btn action-btn-secondary"
                                                                        >
                                                                            <IoDocument className="scale-125 group-hover:fill-white" />
                                                                        </Link>
                                                                        <TooltipHover
                                                                            message={
                                                                                "Pratinjau Dokumen"
                                                                            }
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <a
                                                                            href={`/storage/${pengajuan.approved_pak_path}`}
                                                                            download
                                                                            onContextMenu={(
                                                                                e
                                                                            ) => {
                                                                                e.preventDefault();
                                                                                router.post(
                                                                                    "/pak/process",
                                                                                    pengajuan.riwayat_pak,
                                                                                    {
                                                                                        onSuccess:
                                                                                            () => {
                                                                                                setShowIframe(
                                                                                                    true
                                                                                                );
                                                                                            },
                                                                                    }
                                                                                );
                                                                            }}
                                                                            className="transition-all scale-110 group action-btn action-btn-secondary"
                                                                        >
                                                                            <IoDocument className="scale-125 group-hover:fill-white" />
                                                                        </a>
                                                                        <TooltipHover
                                                                            message={
                                                                                "Klik Kiri untuk download,klik kanan untuk lihat dokumen"
                                                                            }
                                                                        />
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}
                                                        {pengajuan.status ===
                                                        "divalidasi" ? (
                                                            <>
                                                                {/* <div className="relative inline-flex group">
                                                                    <a
                                                                        href={`/storage/${pengajuan.approved_pak_path}`}
                                                                        download
                                                                        // saya ingin ketika tombol ini dtiken mendownload file pengajuan.approved_pak_path
                                                                        className="transition-all scale-110 group action-btn action-btn-success "
                                                                    >
                                                                        <FaFileDownload className="scale-125 group-hover:fill-white" />
                                                                    </a>
                                                                    <TooltipHover
                                                                        message={
                                                                            "Download Dokumen"
                                                                        }
                                                                    />
                                                                </div> */}
                                                                <div className="relative inline-flex group">
                                                                    <ModalArsipDokumen
                                                                        pengajuan={
                                                                            pengajuan
                                                                        }
                                                                        setActiveModal={
                                                                            setActiveModal
                                                                        }
                                                                        activeModal={
                                                                            activeModal
                                                                        }
                                                                    />
                                                                    <button
                                                                        onClick={() => {
                                                                            setActiveModal(
                                                                                `ModalArsipDokumen-${pengajuan.id}`
                                                                            );
                                                                        }}
                                                                        disabled={
                                                                            pengajuan.status !==
                                                                            "divalidasi"
                                                                        }
                                                                        className="action-btn-success action-btn group/button"
                                                                    >
                                                                        <BiSolidArchiveIn className="scale-150 group-hover/button:fill-white" />
                                                                    </button>
                                                                    <TooltipHover
                                                                        message={
                                                                            "Arsipkan Dokumen" +
                                                                            (pengajuan.status !==
                                                                            "divalidasi"
                                                                                ? "(PAK harus divalidasi terlebih dahulu)"
                                                                                : "")
                                                                        }
                                                                    />
                                                                </div>
                                                            </>
                                                        ) : (
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
                                                        )}
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
                                                                disabled={
                                                                    pengajuan.status !==
                                                                    "divalidasi"
                                                                }
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
                                                                    "Lihat/Download Dokumen" +
                                                                    (pengajuan.status !==
                                                                    "divalidasi"
                                                                        ? "(PAK harus divalidasi terlebih dahulu)"
                                                                        : "")
                                                                }
                                                            />
                                                        </div>
                                                        {/* ANCHOR */}
                                                        <ModalArsipDokumen
                                                            pengajuan={
                                                                pengajuan
                                                            }
                                                            setActiveModal={
                                                                setActiveModal
                                                            }
                                                        />
                                                        {/* NOTE: Di Iterasi Awal Arsip Dokumen Belum ada */}
                                                        <div className="relative inline-flex group">
                                                            <button
                                                                onClick={() => {
                                                                    setActiveModal(
                                                                        `ModalArsipDokumen-${pengajuan.id}`
                                                                    );
                                                                    // open modal
                                                                    document
                                                                        .getElementById(
                                                                            `ModalArsipDokumen-${pengajuan.id}`
                                                                        )
                                                                        .showModal();
                                                                }}
                                                                disabled={
                                                                    pengajuan.status !==
                                                                    "divalidasi"
                                                                }
                                                                className="action-btn-success action-btn group/button"
                                                            >
                                                                <BiSolidArchiveIn className="scale-150 group-hover/button:fill-white" />
                                                            </button>
                                                            <TooltipHover
                                                                message={
                                                                    "Arsipkan Dokumen" +
                                                                    (pengajuan.status !==
                                                                    "divalidasi"
                                                                        ? "(PAK harus divalidasi terlebih dahulu)"
                                                                        : "")
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
                                urlRoute={`/${formatRole(role)}/${
                                    isPegawai
                                        ? "proses-pak/pengajuan"
                                        : "pengajuan"
                                }`}
                                filters={{
                                    byJabatan: byJabatanReq,
                                    byStatus: byStatusReq,
                                    byKesimpulan: byKesimpulanReq,
                                    search: searchReq, // ikutkan juga kalau ada search
                                }}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                {!subTitle
                                    ? "Belum Ada Proses Pengajuan PAK Terbaru Untuk Saat Ini"
                                    : "Tidak Ditemukan"}
                            </h2>
                        </div>
                    )}
                </div>
            </main>
        </Authenticated>
    );
}
