// ModalCekValidasi.jsx
import {
    DetailPAKTable,
    DetailPegawai,
    SecondaryButton,
    SuccessButton,
} from "@/Components";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { FaCheck, FaEraser, FaFileSignature, FaTrash } from "react-icons/fa6";
import { IoCloseOutline, IoDocument } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SignatureCanvas from "react-signature-canvas";
import { usePage } from "@inertiajs/react";
import { PiSignature } from "react-icons/pi";
import Swal from "sweetalert2";
import { MdCancel } from "react-icons/md";

export default function ModalCekPengajuan({ pengajuan, setActiveModalId, isDivisiSDM }) {
    const { data, setData, reset, post, processing, errors, clearErrors } =
        useForm({
            id: pengajuan.id,
        });

    // =========================================================================SWAL POP UP=========================================================================
    // useEffect(() => {
    //     if (message) {
    //         Swal.fire({
    //             target: `#DialogCekValidasi-${pengajuan.id}`,
    //             title: "Berhasil!",
    //             text: `${message}`,
    //             icon: "success",
    //             iconColor: "#50C878",
    //             confirmButtonText: "Oke",
    //             confirmButtonColor: "#2D95C9",
    //         });
    //         // setTimeout(() => {
    //         //     message = null;
    //         // }, 3000);
    //     }
    // }, [message]);

    useEffect(() => {
        if (errors && Object.values(errors).length > 0) {
            const firstErrorMessage = Object.values(errors)[0];
            Swal.fire({
                target: `#ModalCekPengajuan-${pengajuan.id}`,
                title: "Ups!",
                text: `${firstErrorMessage}`,
                icon: "warning",
                iconColor: "#fb7185",
                confirmButtonText: "Oke",
                confirmButtonColor: "#2D95C9",
            });
            setTimeout(() => {
                clearErrors();
            }, 1000);
        }
    }, [errors]);

    const handleCancel = () => {
        Swal.fire({
            target: `#ModalCekPengajuan-${pengajuan.id}`,
            icon: "warning",
            text: "Anda yakin ingin membatalkan validasi PAK ini?",
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
                router.post(route("pimpinan.pengajuan.cancel", pengajuan.id), {
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

    // LOGIC MODAL belum selesai ad beberapa dk muncul, seprti setelah handel
    // =========================================================================ANOTHER LOGIC, ETC=========================================================================

    // Handle View PDF
    const [showIframe, setShowIframe] = useState(false);
    const [linkIframe, setLinkIframe] = useState("");

    const handleViewPdf = async (pengajuan) => {
        router.post("/pak/process", pengajuan.riwayat_pak, {
            preserveScroll: true,
            preserveState: true,
            onStart: () => setLoading(true),
            onFinish: () => setLoading(false),
            onError: (errors) => {
                console.error("Error:", errors);
            },
            onSuccess: () => {
                setLinkIframe(route("pak.preview"));
                setShowIframe(true); // Munculkan iframe setelah data dikirim
            },
        });
    };

    const [loading, setLoading] = useState(false);

    const handleApprove = () => {
        post(route("pimpinan.pengajuan.approve", data), {
            preserveScroll: true,
            preserveState: true,
            onError: (errors) => {
                setLoading(false);
                console.error("Error:", errors);
            },
            onSuccess: () => {
                Swal.fire({
                    target: `#ModalCekPengajuan-${pengajuan.id}`,
                    title: "Berhasil!",
                    text: "Dokumen berhasil divalidasi.",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonText: "Lihat Dokumen",
                    cancelButtonText: "Oke",
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
                        const url = `/storage/${pengajuan.approved_pak_path}`; // Sesuaikan dengan path yang ada di pengajuan
                        // const iframeHTML = `<iframe src="${url}" width="100%" height="600px"></iframe>`;
                        // // Menambahkan iframe ke dalam elemen HTML untuk menampilkan PDF
                        // document.getElementById("approved_pak_view").innerHTML =
                        //     iframeHTML;
                        setLinkIframe(url);
                        setShowIframe(true);
                    }
                });

                // console.log("Sukses Menvalidasi");
            },
        });
    };

    const { props } = usePage();

    // TODO ? Mungkin sebaiknya tamabhakna juga Catatan Evaluasi/Review Dari Pimpinan
    console.log("isi data Sekarang");

    console.log(pengajuan);
    const pegawai = pengajuan.riwayat_pak.pegawai;
    return (
        <dialog
            id={`ModalCekPengajuan-${pengajuan.id}`}
            onClose={() => setActiveModalId(null)}
            className="modal z-[100]"
        >
            {/* Saya ingin ditampilkan iframe pdf ini setelah ditekan tombol Lihat Dokumen, dan ditampilkan diatas dialog, gimana caranya? */}
            {/* ✅ IFRAME ditampilkan di atas modal jika showIframe true dan linkIframe ada */}
            {showIframe && (
                <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-7xl h-[80vh] bg-white rounded shadow-lg overflow-hidden">
                        <button
                            className="absolute z-10 p-2 transition bg-white rounded-full shadow group top-2 right-2 hover:bg-red-500 hover:text-white"
                            onClick={() => setShowIframe(false)}
                        >
                            <IoCloseOutline className="w-6 h-6 stroke-red-500 group-hover:stroke-white" />
                        </button>

                        {/* Indikator Loading */}
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <AiOutlineLoading3Quarters className="w-12 h-12 text-white animate-spin" />
                            </div>
                        )}

                        {/* Iframe muncul setelah loading selesai */}
                        {!loading && (
                            <iframe
                                // src={route("pak.preview")}
                                src={linkIframe}
                                width="100%"
                                height="100%"
                                className="border-0"
                            ></iframe>
                        )}
                    </div>
                </div>
            )}

            <div className="relative w-full max-w-3xl modal-box">
                <form method="dialog">
                    <button className="absolute btn btn-md btn-circle btn-ghost right-2 top-2">
                        <IoCloseOutline className="w-10 h-10 stroke-accent group-hover/item:fill-white" />
                    </button>
                </form>

                <h3 className="mb-2 text-xl font-bold">Detail Pengajuan</h3>

                <div className="px-2 overflow-x-auto">
                    <h1 className="my-4 text-xl font-medium">
                        Data Ringkasan dalam Penetapan Angka Kredit
                    </h1>
                    <DetailPAKTable
                        data={pengajuan.riwayat_pak}
                        collapse={false}
                    />
                </div>

                <div className="px-2 my-10 mb-16 overflow-x-auto">
                    <h1 className="my-4 text-xl font-medium">
                        Data Pegawai dalam Penetapan Angka Kredit
                    </h1>
                    <DetailPegawai pegawai={pegawai} />
                </div>

                {pengajuan.status === "diproses" && (
                    <>
                        <div role="alert" className="mb-20 alert bg-hijau">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 stroke-current shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="text-base font-medium text-black">
                                Dokumen Penetapan Angka Kredit untuk pengajuan
                                ini sudah diValidasi!
                            </span>
                        </div>
                    </>
                )}
            </div>

            {/* Floating Action Button */}
                <div className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-12 left-1/2">
                    <SecondaryButton
                        onClick={pengajuan.status === "divalidasi" ?
                            () => handleViewPdf(pengajuan)
                            :
                            () => {
                                const url = `/storage/${pengajuan.approved_pak_path}`;
                                setLinkIframe(url);
                                setShowIframe(true);
                            }
                        }
                        type="submit"
                    >
                        <IoDocument className="w-4 h-4 fill-secondary" />
                        Lihat Dokumen
                    </SecondaryButton>

                    {/* ANCHOR */}
                    {
                        isDivisiSDM && pengajuan.status ==="diajukan" &&
                        <SecondaryButton
                        onClick={() => handleCancel()}
                        className="border rounded shadow bg-warning/15 text-warning/80 border-warning/20 hover:scale-105"
                    >
                        <MdCancel className="mr-2 scale-125 fill-warning " />
                        Batalkan Pengajuan
                    </SecondaryButton>
                    }
                </div>

            {/* Floating Action Button */}
            {/* {pengajuan.status === "diajukan" && (
                <div className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-12 left-1/2">
                    <SecondaryButton
                        onClick={() => handleViewPdf(pengajuan)}
                        type="submit"
                    >
                        <IoDocument className="w-4 h-4 fill-secondary" />
                        Lihat Dokumen
                    </SecondaryButton>

                    <SuccessButton
                        onClick={handleApprove}
                        className="gap-1 hover:scale-105 hover:bg-hijau/80 text-hijau/75"
                    >
                        <FaFileSignature className="w-4 h-4 fill-white " />
                        Validasi Dokumen
                    </SuccessButton>
                </div>
            )} */}

            {/* {pengajuan.status === "divalidasi" && (
                <div className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-12 left-1/2">
                    <SecondaryButton
                        onClick={() => {
                            const url = `/storage/${pengajuan.approved_pak_path}`;
                            setLinkIframe(url);
                            setShowIframe(true);
                        }}
                    >
                        <IoDocument className="w-4 h-4 fill-secondary" />
                        Lihat Dokumen
                    </SecondaryButton>

                    <SecondaryButton
                        onClick={() => handleCancel()}
                        className="bg-red-100 border border-red-300 rounded shadow hover:scale-105"
                    >
                        <MdCancel className="mr-2 scale-125 fill-red-500 " />
                        Batalkan Validasi
                    </SecondaryButton>
                </div>
            )} */}
{/*
            {pengajuan.status === "ditolak" && (
                <div className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-12 left-1/2">
                     <SecondaryButton
                        onClick={() => handleViewPdf(pengajuan)}
                        type="submit"
                    >
                        <IoDocument className="w-4 h-4 fill-secondary" />
                        Lihat Dokumen
                    </SecondaryButton>

                    <SecondaryButton
                        onClick={() => handleCancel()}
                        className="bg-red-100 border border-red-300 rounded shadow hover:scale-105"
                    >
                        <MdCancel className="mr-2 scale-125 fill-red-500 " />
                        Batalkan Penolakan
                    </SecondaryButton>
                </div>
            )} */}

            {/* Floating Action Button */}
        </dialog>
    );
}
