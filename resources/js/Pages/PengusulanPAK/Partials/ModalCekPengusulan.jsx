import {
    DetailPAKTable,
    DetailPegawai,
    Modal,
    SecondaryButton,
    SuccessButton,
} from "@/Components";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { FaFileSignature, FaRegCircleCheck } from "react-icons/fa6";
import { IoCloseOutline, IoDocument } from "react-icons/io5";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import { MdCancel } from "react-icons/md";
import PengusulanPAKTable from "./DetailPengusulanPAKTable";
import { CgCloseO } from "react-icons/cg";
export default function ModalCekPengusulan({
    pengusulanPAK,
    setActiveModal,
    activeModal,
    isDivisiSDM,
    setPopUpData,
    setIsPopUpOpen,
}) {
    const { data, setData, reset, post, processing, errors, clearErrors } =
        useForm({
            id: pengusulanPAK.id,
            other: "",
        });

    // =========================================================================SWAL POP UP=========================================================================

    useEffect(() => {
        if (errors && Object.values(errors).length > 0) {
            const firstErrorMessage = Object.values(errors)[0];
            Swal.fire({
                target: `#DialogCekPengusulan-${pengusulanPAK.id}`,
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
            target: `#DialogCekPengusulan-${pengusulanPAK.id}`,
            icon: "warning",
            text: "Anda yakin ingin membatalkan penolakan?",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#2D95C9",
            cancelButtonColor: "#9ca3af",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("divisi-sdm.pengusulan-pak.undo-reject", data), {
                    preserveState: false,
                    onSuccess: () => {},
                    onError: () => {},
                });
            }
        });
    };

    // =========================================================================ANOTHER LOGIC, ETC=========================================================================

    // Handle View PDF
    const [showIframe, setShowIframe] = useState(false);
    const [linkIframe, setLinkIframe] = useState("");

    const handleApprove = () => {
        post(route("divisi-sdm.pengusulan-pak.approve", data), {
            preserveScroll: true,
            preserveState: true,
            onError: (errors) => {
                console.log("Error:", errors);
            },
            onSuccess: () => {
                Swal.fire({
                    target: `#DialogCekPengusulan-${pengusulanPAK.id}`,
                    title: "Berhasil!",
                    text: "Pengusulan PAK telah disetujui.",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonText: "Proses PAK Sekarang?",
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
                            route(
                                "divisi-sdm.pak.create-by-pengusulan",
                                pengusulanPAK.id
                            )
                        );
                        setShowIframe(false);
                    }
                });
                // console.log("Sukses Menyetujui");
            },
        });
    };

    const { props } = usePage();
    // alert(pengusulanPAK.status)
    const modalId = `ModalCekPengusulan-${pengusulanPAK.id}`;
    return (
        <Modal
            id={`ModalCekPengusulan-${pengusulanPAK.id}`}
            show={activeModal === modalId}
            onClose={() => setActiveModal(null)}
            maxWidth="4xl"
        >
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
                            src={linkIframe}
                            width="100%"
                            height="100%"
                            className="border-0"
                        ></iframe>
                    </div>
                </div>
            )}
            {/*  CONTENT START */}

            <main className="relative w-full max-w-4xl mx-auto my-4 text-center modal-box">
                <section className="mx-auto ">
                    <h3 className="mb-2 text-xl font-bold">
                        Detail Pengusulan PAK
                    </h3>

                    <div className="px-2 overflow-x-auto">
                        <h1 className="my-4 text-xl font-medium">
                            Data Ringkasan dalam Pengusulan PAK
                        </h1>
                        <PengusulanPAKTable
                            data={pengusulanPAK}
                            collapse={false}
                            setLinkIframe={setLinkIframe}
                            setShowIframe={setShowIframe}
                        />
                    </div>

                    <div className="px-2 my-10 mb-16 overflow-x-auto">
                        <h1 className="my-4 text-xl font-medium">
                            Data Pegawai dalam Pengusulan
                        </h1>
                        <DetailPegawai pegawai={pengusulanPAK.pegawai} />
                    </div>

                    {isDivisiSDM && (
                        <div>
                            {/* IF Approved */}
                            {pengusulanPAK.status === "disetujui" && (
                                <>
                                    <div
                                        role="alert"
                                        className="mb-20 alert bg-hijau"
                                    >
                                        <FaRegCircleCheck className="w-5 h-5" />
                                        <span className="text-base font-medium text-black">
                                            Pengusulan PAK ini sudah disetujui!
                                        </span>
                                    </div>
                                </>
                            )}
                            {/* IF Rejected */}
                            {pengusulanPAK.status === "ditolak" && (
                                <>
                                    <div
                                        role="alert"
                                        className="mb-20 alert bg-warning"
                                    >
                                        <CgCloseO className="w-6 h-6" />
                                        <span className="text-base font-medium text-black">
                                            Pengusulan PAK ini sudah telah
                                            ditolak!
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </section>
                {/*  CONTENT START */}


            </main>
            {isDivisiSDM && (
                    <>
                        {/* SECTION Floating Action Button DIUSULKAN */}
                        {pengusulanPAK.status === "diusulkan" && (
                            <section className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-4 left-1/2">
                                {/* TODO: Harusny dialog catatan bisa muncul tanpa harus menutup dialogCek Pengusulan terlebih dahulu  */}
                                <form method="dialog">
                                    <SecondaryButton
                                        type="submit"
                                        onClick={() => {
                                            setPopUpData({
                                                id: pengusulanPAK.id,
                                            });
                                            setIsPopUpOpen(true); //saya ingin ini dijalankan  setelah modal penguisulan tersebut ditututup
                                        }}
                                        className="bg-red-100 border border-red-300 rounded shadow hover:scale-105"
                                    >
                                        <MdCancel className="mr-2 scale-125 fill-red-500 " />
                                        Tolak Pengusulan
                                    </SecondaryButton>
                                </form>

                                <SuccessButton
                                    onClick={handleApprove}
                                    disabled={processing}
                                    className="gap-1 hover:scale-105 hover:bg-hijau/80 text-hijau/75"
                                >
                                    <FaFileSignature className="w-4 h-4 fill-white " />
                                    Setujui Pengusulan
                                </SuccessButton>
                            </section>
                        )}
                        {/* !SECTION Floating Action Button DIUSULKAN */}

                        {/* SECTION Floating Action Button DITOLAK */}
                        {pengusulanPAK.status === "ditolak" && (
                            <section className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-4 left-1/2">
                                <SecondaryButton
                                    onClick={() => handleCancel()}
                                    className="bg-red-100 border border-red-300 rounded shadow hover:scale-105"
                                >
                                    <MdCancel className="mr-2 scale-125 fill-red-500 " />
                                    Batalkan Penolakan
                                </SecondaryButton>
                            </section>
                        )}
                        {/* !SECTION Floating Action Button DITOLAK */}

                        {/* SECTION Floating Action Button DISETUJUI */}
                        {pengusulanPAK.status === "disetujui" && (
                            <section className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-4 left-1/2">
                                <SuccessButton
                                    asLink
                                    href={route(
                                        "divisi-sdm.pak.create-by-pengusulan",
                                        data.id
                                    )}
                                    disabled={processing}
                                    className="gap-1 hover:scale-105 hover:bg-hijau/80 text-hijau/75"
                                >
                                    <FaFileSignature className="w-4 h-4 fill-white " />
                                    Proses PAK
                                </SuccessButton>
                                <SecondaryButton
                                    onClick={() => handleCancel()}
                                    className="bg-red-100 border border-red-300 rounded shadow hover:scale-105"
                                >
                                    <MdCancel className="mr-2 scale-125 fill-red-500 " />
                                    Batalkan Persetujuan
                                </SecondaryButton>
                            </section>
                        )}
                        {/* !SECTION Floating Action Button DISETUJUI */}
                    </>
                )}
        </Modal>
    );
}
