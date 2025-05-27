// ModalCekValidasi.jsx
import {
    DetailPAKTable,
    DetailPegawai,
    SecondaryButton,
    SuccessButton,
} from "@/Components";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import {
    FaCheck,
    FaEraser,
    FaFileSignature,
    FaRegCircleCheck,
    FaTrash,
} from "react-icons/fa6";
import { IoCloseOutline, IoDocument } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SignatureCanvas from "react-signature-canvas";
import { usePage } from "@inertiajs/react";
import { PiSignature } from "react-icons/pi";
import Swal from "sweetalert2";
import { MdCancel } from "react-icons/md";
import PengusulanPAKTable from "./PengusulanPAKTable";
import PopUpCatatan from "./PopUpCatatan";
import { CgCloseO } from "react-icons/cg";
export default function ModalCekPengusulan({
    pengusulanPAK,
    setActiveModalId,
    canValidate,
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
                setLoading(false);
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
    return (
        <dialog
            id={`DialogCekPengusulan-${pengusulanPAK.id}`}
            onClose={() => setActiveModalId(null)}
            className="modal z-[100]"
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

                <h3 className="mb-2 text-xl font-bold">
                    Detail Pengusulan PAK
                </h3>

                <div className="px-2 overflow-x-auto">
                    <h1 className="my-4 text-xl font-medium">
                        Data Ringkasan dalam Pengusulan PAK
                    </h1>
                    <PengusulanPAKTable data={pengusulanPAK} collapse={false} />
                </div>

                <div className="px-2 my-10 mb-16 overflow-x-auto">
                    <h1 className="my-4 text-xl font-medium">
                        Data Pegawai dalam Pengusulan
                    </h1>
                    <DetailPegawai pegawai={pengusulanPAK.pegawai} />
                </div>

                {canValidate ? (
                    <>
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
                                        Pengusulan PAK ini sudah telah ditolak!
                                    </span>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <></>
                )}
            </div>

            {canValidate && (
                <>
                    {/* SECTION Floating Action Button DIPROSES */}
                    {pengusulanPAK.status === "diproses" && (
                        <section className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-12 left-1/2">
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
                    {/* !SECTION Floating Action Button DIPROSES */}

                    {/* SECTION Floating Action Button DITOLAK */}
                    {pengusulanPAK.status === "ditolak" && (
                        <section className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-12 left-1/2">
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
                        <section className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-12 left-1/2">
                               <SuccessButton
                                asLink
                                href={route('divisi-sdm.pak.create-by-pengusulan',data.id)}
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
        </dialog>
    );
}
