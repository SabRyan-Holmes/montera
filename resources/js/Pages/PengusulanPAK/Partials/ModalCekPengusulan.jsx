import {
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
    handleAction: {
        handleApprove,
        handleReject,
        handleDelete,
        showIframeWithFile,
    },
    onClose,
}) {
    const { isDivisiSDM } = usePage().props;

    // =========================================================================SWAL POP UP=========================================================================

    const resetValidate = () => {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin mereset validasi pengusulan ini?",
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
                    route("divisi-sdm.pengusulan-pak.reset-validate", id),
                    {},
                    {
                        preserveState: false,
                        onSuccess: () => {
                            fetchData();
                            onClose();
                        },
                        onError: (err) => alert(JSON.stringify(err)),
                    }
                );
            }
        });
    };

    // =========================================================================ANOTHER LOGIC, ETC========================================================================

    const [data, setData] = useState(null);
    const fetchData = () => {
        if (id) {
            axios
                .get(route("pengusulan-pak.show", id))
                .then((res) => setData(res.data))
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        fetchData();
        return () => setData(null);
    }, [id]);

    const onProcess = data && ["diusulkan", "direvisi"].includes(data?.status);
    const isValidated =
        data && ["ditolak", "disetujui", "selesai"].includes(data?.status);

    return (
        <Modal
            id={`ModalCekPengusulan-${id}`}
            show={true}
            onClose={onClose}
            maxWidth="4xl"
        >
            {!data ? (
                <div className="py-10 text-center">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-4 text-gray-600">Memuat data detail...</p>
                </div>
            ) : (
                <>
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
                                    showIframeWithFile={showIframeWithFile}
                                />
                            </div>

                            <div className="px-2 mb-16 overflow-x-auto">
                                <h1 className="my-4 text-xl font-medium">
                                    Data Pegawai dalam Pengusulan
                                </h1>
                                {/* <DetailPegawai pegawai={data.pegawai} /> */}
                            </div>
                        </section>
                    </main>
                    {isDivisiSDM ? (
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
                                        onClick={() => handleReject(data.id)}
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
                                    onClick={() => resetValidate()}
                                    className="bg-red-100 border border-red-300 rounded shadow hover:scale-105"
                                >
                                    <MdCancel className="mr-2 scale-125 fill-warning " />
                                    Reset Validasi
                                </SecondaryButton>
                            )}
                        </section>
                    ) : (
                        <section className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-4 left-1/2">
                            {data.status !== "disetujui" &&
                                data.status !== "selesai" && (
                                    <SecondaryButton
                                        onClick={() => handleDelete()}
                                        className="bg-red-100 border border-red-300 rounded shadow hover:scale-105"
                                    >
                                        <MdCancel className="mr-2 scale-125 fill-red-500 " />
                                        Batalkan Usulan
                                    </SecondaryButton>
                                )}
                        </section>
                    )}
                </>
            )}
        </Modal>
    );
}
