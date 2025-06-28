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
import axios from "axios";
export default function ModalCekPengusulan({
    id,
    handleApprove,
    handleReject,
    onClose,
}) {
    const { isDivisiSDM } = usePage().props;

    // =========================================================================SWAL POP UP=========================================================================

    const handleCancel = () => {
        Swal.fire({
            target: `#DialogCekPengusulan-${id}`,
            icon: "warning",
            text: "Anda yakin ingin membatalkan penolakan?",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#2D95C9",
            cancelButtonColor: "#9ca3af",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("divisi-sdm.pengusulan-pak.undo-validate", id), {
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

    const [data, setData] = useState(null);
    useEffect(() => {
        if (id) {
            axios
                .get(route("pengusulan-pak.show", id))
                .then((res) => setData(res.data))
                .catch((err) => console.error(err));
        }
        return () => {
            setData(null); // Bersihkan data saat modal ditutup
        };
    }, [id]);

    if (!data) {
        return (
            <dialog id={`Loading-${id}`} className="modal">
                <div className="text-center modal-box">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-4 text-gray-600">Memuat data detail...</p>
                </div>
            </dialog>
        );
    }

    const onProcess = data && ["diusulkan", "direvisi"].includes(data?.status);
    const isValidated = data && ["ditolak", "disetujui"].includes(data?.status);
    return (
        <Modal
            id={`ModalCekPengusulan-${id}`}
            show={true}
            onClose={onClose}
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
                            data={data}
                            collapse={false}
                            setLinkIframe={setLinkIframe}
                            setShowIframe={setShowIframe}
                        />
                    </div>

                    <div className="px-2 mb-16 overflow-x-auto">
                        <h1 className="my-4 text-xl font-medium">
                            Data Pegawai dalam Pengusulan
                        </h1>
                        <DetailPegawai pegawai={data.pegawai} />
                    </div>
                </section>
            </main>
            {isDivisiSDM && (
                <section className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-4 left-1/2">
                    {onProcess && (
                        <>
                            <SuccessButton
                                onClick={() => handleApprove(data.id)}
                                className="gap-1 hover:scale-105 hover:bg-hijau/80 text-hijau/75"
                            >
                                <FaFileSignature className="w-4 h-4 fill-white " />
                                Setujui Pengusulan
                            </SuccessButton>
                            <SecondaryButton
                                type="submit"
                                onClick={handleReject}
                                className="bg-red-100 border border-red-300 rounded shadow hover:scale-105"
                            >
                                <MdCancel className="mr-2 scale-125 fill-red-500 " />
                                Tolak Pengusulan
                            </SecondaryButton>
                        </>
                    )}

                    {data?.status === "disetujui" && (
                        <SuccessButton
                            asLink
                            href={route(
                                "divisi-sdm.pak.create-by-pengusulan",
                                data.id
                            )}
                            className="gap-1 hover:scale-105 hover:bg-hijau/80 text-hijau/75"
                        >
                            <FaFileSignature className="w-4 h-4 fill-white " />
                            Proses PAK
                        </SuccessButton>
                    )}

                    {isValidated && (
                        <SecondaryButton
                            onClick={() => handleCancel()}
                            className="bg-red-100 border border-red-300 rounded shadow hover:scale-105"
                        >
                            <MdCancel className="mr-2 scale-125 fill-red-500 " />
                            Reset Validasi
                        </SecondaryButton>
                    )}
                </section>
            )}
        </Modal>
    );
}
