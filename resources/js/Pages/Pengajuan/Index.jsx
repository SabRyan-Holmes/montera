import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Link, router, useRemember } from "@inertiajs/react";
import Swal from "sweetalert2";
import {
    FilterSearchCustom,
    Pagination,
    StatusLabel,
    TooltipHover,
} from "@/Components";
import { IoCloseOutline, IoDocument } from "react-icons/io5";
import { FaCheck, FaEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
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
                router.delete(route("divisi-sdm.pengajuan.destroy", id), {
                    onError: (err) => alert(`Gagal Menghapus Data : ${err}`),
                });
            }
        });
    };

    const handleViewDocument = async (pengajuan) => {
        const pakId = pengajuan.riwayat_pak_id;
        if (pengajuan.status === "divalidasi") {
            const url = `/storage/${pengajuan.approved_pak_path}`;
            setLinkIframe(url);
            setShowIframe(true);
        } else {
            router.post(
                "/pak/process",
                { riwayat_pak_id: pengajuan.riwayat_pak_id },
                {
                    preserveScroll: true,
                    preserveState: true,
                    onError: (errors) => {
                        console.error("Error:", errors);
                    },
                    onSuccess: () => {
                        setLinkIframe(route("pak.preview"));
                        setShowIframe(true); // Munculkan iframe setelah data dikirim
                    },
                }
            );
        }
    };

    const handleArchive = (id) => {
        setActiveModal(`ModalArsipDokumen-${id}`);
    };

    const handleReject = (id) => {
        setActiveModal(`ModalCatatan-${id}`);
    };

    const handleApprove = (id) => {
        router.post(
            route("pimpinan.pengajuan.approve", id),
            {},
            {
                preserveState:false,
                preserveScroll: true,
            }
        );
    };

    // ===========================================Handling Search & Filter===========================================

    const [expandedRows, setExpandedRows] = useState({}); //Handling wrapped text on pengajuan.kesimpulan
    const [showIframe, setShowIframe] = useState(false);
    const [linkIframe, setLinkIframe] = useState("");
    const [showDetail, setShowDetail] = useState(null);

    const showIframeWithFile = (filePath) => {
        if (!filePath) return;

        setLinkIframe(`/storage/${filePath}`);
        setShowIframe(true);
    };


    const role = auth.user.role;
    function formatRole(label) {
        return label.trim().toLowerCase().replace(/\s+/g, "-");
    }
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
                            <div>
                                <div className="text-center modal-box">
                                    <span className="loading loading-spinner loading-lg"></span>
                                    <p className="mt-4 text-gray-600">
                                        Memuat Dokumen...
                                    </p>
                                </div>
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
                {showDetail && (
                    <ModalCekPengajuan
                        id={showDetail}
                        onClose={() => setShowDetail(null)}
                        handleAction={{
                            handleCancel,
                            handleApprove,
                            handleViewDocument,
                            handleArchive,
                            handleReject,
                            showIframeWithFile
                        }}
                    />
                )}

                <ModalCatatan
                    activeModal={activeModal}
                    onClose={() => setActiveModal(null)}
                    routeName={"pimpinan.pengajuan.reject"}
                    placeholder={
                        "Ketikkan catatan untuk penolakan pengajuan ini"
                    }
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
                                    "selesai",
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
                                            "selesai",
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

                                                <ModalArsipDokumen
                                                    pengajuan={pengajuan}
                                                    onClose={() =>
                                                        setActiveModal(null)
                                                    }
                                                    activeModal={activeModal}
                                                />

                                                <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                    <div className="relative inline-flex group">
                                                        <button
                                                            className="action-btn-primary action-btn group"
                                                            onClick={() =>
                                                                setShowDetail(
                                                                    pengajuan.id
                                                                )
                                                            }
                                                        >
                                                            <FaEye className="scale-125 group-hover:fill-white " />
                                                        </button>
                                                        <TooltipHover
                                                            message={
                                                                "Lihat Data"
                                                            }
                                                        />
                                                    </div>

                                                    {/* SECTION Action Button-Role Pimpinan  */}
                                                    {isPimpinan && (
                                                        <>
                                                            <div className="relative inline-flex group">
                                                                <button
                                                                    as="button"
                                                                    className="action-btn-success action-btn group/button"
                                                                    onClick={() =>
                                                                        handleApprove(
                                                                            pengajuan.id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        isValidated
                                                                    }
                                                                >
                                                                    <FaCheck
                                                                        className={
                                                                            "scale-125 group-hover/button:stroke-white group-hover/button:fill-white"
                                                                        }
                                                                    />
                                                                </button>
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
                                                                    onClick={() =>
                                                                        handleReject(
                                                                            pengajuan.id
                                                                        )
                                                                    }
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
                                                    )}

                                                    {/* !SECTION Action Button-Role Pimpinan  */}

                                                    {/* SECTION Action Button-Role Divisi SDM  */}
                                                    {/* ANCHOR */}
                                                    {isDivisiSDM && (
                                                        <>
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
                                                                            <button
                                                                                onClick={(
                                                                                    e
                                                                                ) =>
                                                                                    handleViewDocument(
                                                                                        pengajuan
                                                                                    )
                                                                                }
                                                                                className="transition-all scale-110 group action-btn action-btn-secondary"
                                                                            >
                                                                                <IoDocument className="scale-125 group-hover:fill-white" />
                                                                            </button>
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
                                                                                    handleViewDocument(
                                                                                        pengajuan
                                                                                    );
                                                                                }}
                                                                                className="transition-all scale-110 group action-btn action-btn-secondary"
                                                                            >
                                                                                <IoDocument className="scale-125 group-hover:fill-white" />
                                                                            </a>
                                                                            <TooltipHover
                                                                                message={
                                                                                    "Klik kiri untuk download,klik kanan untuk lihat dokumen"
                                                                                }
                                                                            />
                                                                        </>
                                                                    )}
                                                                </div>
                                                            )}
                                                            {pengajuan.status ===
                                                            "divalidasi" ? (
                                                                <div className="relative inline-flex group">
                                                                    <button
                                                                        onClick={() =>
                                                                            handleArchive(
                                                                                pengajuan.id
                                                                            )
                                                                        }
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
                                                        </>
                                                    )}
                                                    {/* !SECTION Action Button-Role Divisi SDM  */}

                                                    {/* SECTION Action Button-Role Pegawai */}
                                                    {isPegawai && (
                                                        <>
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

                                                            <div className="relative inline-flex group">
                                                                <button
                                                                    onClick={() =>
                                                                        handleArchive(
                                                                            pengajuan.id
                                                                        )
                                                                    }
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
                                                    )}
                                                    {/* !SECTION Action Button-Role Pegawai */}
                                                </td>
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
                                    search: searchReq,
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
