import {
    DetailPAKTable,
    DetailPegawai,
    Modal,
    SecondaryButton,
    SuccessButton,
} from "@/Components";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { FaFileSignature, FaRegFilePdf } from "react-icons/fa6";
import { IoCloseOutline, IoDocument } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import { MdCancel } from "react-icons/md";
import PengusulanPAKTable from "@/Pages/PengusulanPAK/Partials/DetailPengusulanPAKTable";
import DetailPengajuan from "./DetailPengajuanPAKTable";

export default function ModalCekPengajuan({
    pengajuan,
    setActiveModal,
    activeModal,
    isDivisiSDM,
    isPimpinan,
}) {
    const { data, setData, reset, post, processing, errors, clearErrors } =
        useForm({
            id: pengajuan.id,
        });

    // =========================================================================SWAL POP UP=========================================================================

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
                router.post(
                    route("pimpinan.pengajuan.undo-validate", pengajuan.id),
                    {
                        onSuccess: () => {
                            //
                        },
                        onError: () => {
                            console.log("Gagal Menghapus Data");
                        },
                    }
                );
            }
        });
    };

    // LOGIC MODAL belum selesai ad beberapa dk muncul, seprti setelah handel
    // =========================================================================ANOTHER LOGIC, ETC=========================================================================

    // Handle View PDF
    const [showIframe, setShowIframe] = useState(false);
    const [linkIframe, setLinkIframe] = useState("");

    const handleViewPdf = async (pengajuan) => {
        if (pengajuan.status === "divalidasi") {
            const url = `/storage/${pengajuan.approved_pak_path}`;
            setLinkIframe(url);
            setShowIframe(true);
        } else {
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
        }
    };

    const [loading, setLoading] = useState(false);

    const { props } = usePage();

    const handleApprove = () => {
        post(route("pimpinan.pengajuan.approve", pengajuan.id), {
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
                        setLinkIframe(url);
                        setShowIframe(true);
                    }
                });

                console.log("Sukses Menvalidasi");
            },
        });
    };

    const pegawai = pengajuan.riwayat_pak.pegawai;
    const pengusulanPAK = pengajuan.riwayat_pak.pengusulan_pak;
    const pengusulanPAKRef = useRef(null); // <-- buat ref
    const scrollToPengusulanPAK = () => {
        if (pengusulanPAKRef.current) {
            pengusulanPAKRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
    };
    const modalId = `ModalCekPengajuan-${pengajuan.id}`;
    const isByPengusulan = pengajuan.riwayat_pak.pengusulan_pak_id ?? null;

    return (
        <Modal
            id={`ModalCekPengajuan-${pengajuan.id}`} // agar Swal bisa target
            show={activeModal === modalId}
            onClose={() => setActiveModal(null)} // agar modal bisa ditutup dengan onClose
            maxWidth="4xl"
        >
            {showIframe && (
                <div className="w-full max-w-screen-laptop fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
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

            <main className="w-full mx-auto my-4 text-center ">
                <section className="relative w-full max-w-4xl mx-auto modal-box">
                    <h3 className="my-5 text-3xl font-bold">
                        Detail Pengajuan PAK
                    </h3>
                    <div className="px-2 overflow-x-auto">
                        <DetailPengajuan
                            collapse={false}
                            data={pengajuan}
                            setLinkIframe={setLinkIframe}
                            setShowIframe={setShowIframe}
                        />
                    </div>
                    <div className="px-2 overflow-x-auto">
                        <h1 className="mb-3 text-xl font-medium mt-7 ">
                            Data Penetapan Angka Kredit dalam Pengajuan
                        </h1>
                        <DetailPAKTable
                            data={pengajuan.riwayat_pak}
                            collapse={false}
                            onScrollToPengusulanPAK={scrollToPengusulanPAK}
                        />
                    </div>

                    {pengusulanPAK && (
                        <div
                            className="px-2 overflow-x-auto"
                            ref={pengusulanPAKRef}
                        >
                            <h1 className="mb-3 text-xl font-medium mt-7 ">
                                Data Pengusulan Sebagai Sumber Penetapan Angka
                                Kredit
                            </h1>

                            <PengusulanPAKTable
                                collapse={false}
                                data={pengusulanPAK}
                                setLinkIframe={setLinkIframe}
                                setShowIframe={setShowIframe}
                            />
                        </div>
                    )}

                    <div className="px-2 overflow-x-auto">
                        <h1 className="mb-3 text-xl font-medium mt-7">
                            Data Pegawai dalam Penetapan Angka Kredit
                        </h1>
                        <DetailPegawai pegawai={pegawai} />
                    </div>

                    {pengajuan.status === "divalidasi" && (
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
                                    Dokumen Penetapan Angka Kredit untuk
                                    pengajuan ini sudah diValidasi!
                                </span>
                            </div>
                        </>
                    )}
                </section>

                {/* Floating Action Button */}
                {isDivisiSDM ? (
                    <section className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 text-nowrap bottom-3 left-1/2">
                        <SecondaryButton
                            onClick={() => handleViewPdf(pengajuan)}
                            type="submit"
                        >
                            <FaRegFilePdf className="w-4 h-4 mr-1 fill-secondary" />
                            {pengajuan.status === "divalidasi"
                                ? "Lihat"
                                : "Pratinjau"}{" "}
                            Dokumen
                        </SecondaryButton>

                        {/* ANCHOR */}
                        {isDivisiSDM && pengajuan.status === "diajukan" && (
                            <SecondaryButton
                                onClick={() => handleCancel()}
                                className="border rounded shadow bg-warning/15 text-warning/80 hover:bg-warning/20 hover:border-warning/20 border-warning/20 hover:scale-105"
                            >
                                <MdCancel className="mr-2 scale-125 fill-warning " />
                                Batalkan Pengajuan
                            </SecondaryButton>
                        )}
                    </section>
                ) : (
                    //IF Pimpinan
                    <section>
                        {pengajuan.status === "diajukan" && (
                            <div className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-3 left-1/2">
                                <SecondaryButton
                                    onClick={() => handleViewPdf(pengajuan)}
                                    type="submit"
                                    className="rounded shadow hover:scale-105"
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
                        )}

                        {pengajuan.status === "divalidasi" && (
                            <div className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-3 left-1/2">
                                <SecondaryButton
                                    onClick={() => {
                                        const url = `/storage/${pengajuan.approved_pak_path}`;
                                        setLinkIframe(url);
                                        setShowIframe(true);
                                    }}
                                    className="rounded shadow hover:scale-105"
                                >
                                    <IoDocument className="mr-2 scale-125 fill-secondary" />
                                    Lihat Dokumen
                                </SecondaryButton>

                                <SecondaryButton
                                    onClick={() => handleCancel()}
                                    className="border rounded shadow bg-warning/15 text-warning/80 hover:bg-warning/20 hover:border-warning/20 border-warning/20 hover:scale-105"
                                >
                                    <MdCancel className="mr-2 scale-125 fill-warning " />
                                    Batalkan Validasi
                                </SecondaryButton>
                            </div>
                        )}

                        {pengajuan.status === "ditolak" && (
                            <div className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-3 left-1/2">
                                <SecondaryButton
                                    onClick={() => handleViewPdf(pengajuan)}
                                    type="submit"
                                    className="rounded shadow hover:scale-105"
                                >
                                    <IoDocument className="w-4 h-4 fill-secondary" />
                                    Lihat Dokumen
                                </SecondaryButton>

                                <SecondaryButton
                                    onClick={() => handleCancel()}
                                    className="border rounded shadow bg-warning/15 text-warning/80 hover:bg-warning/20 hover:border-warning/20 border-warning/20 hover:scale-105"
                                >
                                    <MdCancel className="mr-2 scale-125 fill-warning " />
                                    Reset Validasi
                                </SecondaryButton>
                            </div>
                        )}
                    </section>
                )}
            </main>
        </Modal>
    );
}
