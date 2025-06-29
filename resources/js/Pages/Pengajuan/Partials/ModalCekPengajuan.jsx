import {
    DetailPAKTable,
    DetailPegawai,
    Modal,
    SecondaryButton,
    SuccessButton,
} from "@/Components";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { FaCheck, FaFileSignature, FaRegFilePdf } from "react-icons/fa6";
import { IoCloseOutline, IoDocument } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import { MdCancel } from "react-icons/md";
import PengusulanPAKTable from "@/Pages/PengusulanPAK/Partials/DetailPengusulanPAKTable";
import DetailPengajuan from "./DetailPengajuanPAKTable";
import { FaEdit } from "react-icons/fa";
import { BiSolidArchiveIn } from "react-icons/bi";
import ModalArsipDokumen from "./ModalArsipDokumen";
import axios from "axios";

export default function ModalCekPengajuan({
    id,
    onClose,
    handleAction: {
        handleCancel,
        handleApprove,
        handleViewDocument,
        handleArchive,
        handleReject,
        showIframeWithFile
    },
}) {
    // =========================================================================SWAL POP UP=========================================================================
    const { isDivisiSDM, isPimpinan } = usePage().props;
    const [data, setData] = useState(null);

    const resetValidate = (id) => {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin mereset validasi PAK ini?",
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
                    route("pimpinan.pengajuan.reset-validate", id),
                    {},
                    {
                        preserveState: false,
                        onError: (err) => alert(JSON.stringify(err)),
                        onSuccess: fetchData(),
                    }
                );
            }
        });
    };

    // =========================================================================ANOTHER LOGIC, ETC=========================================================================

    // Handle View PDF
    const [showIframe, setShowIframe] = useState(false);
    const [linkIframe, setLinkIframe] = useState("");

    const pegawai = data?.riwayat_pak.pegawai;
    const pengusulanPAK = data?.riwayat_pak.pengusulan_pak;
    const pengusulanPAKRef = useRef(null);
    const scrollToPengusulanPAK = () => {
        if (pengusulanPAKRef.current) {
            pengusulanPAKRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
            });
        }
    };

    const fetchData = () => {
        if (id) {
            axios
                .get(route("pengajuan.show", id))
                .then((res) => setData(res.data))
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        fetchData();
        return () => setData(null);
    }, [id]);

    return (
        <Modal
            id={`ModalCekPengajuan-${id}`}
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
                <main className="w-full mx-auto my-4 text-center ">
                    <section className="relative w-full max-w-4xl mx-auto modal-box">
                        <h3 className="my-5 text-3xl font-bold">
                            Detail Pengajuan PAK
                        </h3>

                        <div className="px-2 overflow-x-auto">
                            <DetailPengajuan
                                collapse={false}
                                data={data}
                               handleViewDocument={handleViewDocument}
                            />
                        </div>
                        <div className="px-2 overflow-x-auto">
                            <h1 className="mb-3 text-xl font-medium mt-7 ">
                                Data Penetapan Angka Kredit dalam Pengajuan
                            </h1>
                            <DetailPAKTable
                                data={data.riwayat_pak}
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
                                    Data Pengusulan Sebagai Sumber Penetapan
                                    Angka Kredit
                                </h1>

                                <PengusulanPAKTable
                                    collapse={false}
                                    data={pengusulanPAK}
                                    showIframeWithFile={showIframeWithFile}
                                />
                            </div>
                        )}

                        <div className="px-2 mb-6 overflow-x-auto">
                            <h1 className="mb-3 text-xl font-medium mt-7">
                                Data Pegawai dalam Penetapan Angka Kredit
                            </h1>
                            <DetailPegawai pegawai={pegawai} />
                        </div>
                    </section>

                    {/* Floating Action Button */}
                    <section className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 text-nowrap bottom-3 left-1/2">
                        {/* Tombol lihat/pratinjau dokumen */}
                        <SecondaryButton
                            onClick={() => handleViewDocument(data)}
                            type="submit"
                        >
                            <FaRegFilePdf className="w-4 h-4 mr-1 fill-secondary" />
                            {data.status === "divalidasi"
                                ? "Lihat"
                                : "Pratinjau"}{" "}
                            Dokumen
                        </SecondaryButton>

                        {/* Untuk Pimpinan */}
                        {isPimpinan ? (
                            <>
                                {["diajukan", "direvisi"].includes(
                                    data.status
                                ) && (
                                    <>
                                        <SuccessButton
                                            onClick={() =>
                                                handleApprove(data.id)
                                            }
                                            className="gap-1 hover:scale-105 hover:bg-hijau/80 text-hijau/75"
                                        >
                                            <FaCheck className="w-4 h-4 fill-white" />
                                            Validasi
                                        </SuccessButton>
                                        <SecondaryButton
                                            type="button"
                                            onClick={() =>
                                                handleReject(data.id)
                                            }
                                            className="text-white bg-error/80 hover:scale-105"
                                        >
                                            <IoCloseOutline className="w-6 h-6" />
                                            Tolak
                                        </SecondaryButton>
                                    </>
                                )}

                                {["ditolak", "divalidasi"].includes(
                                    data.status
                                ) && (
                                    <SecondaryButton
                                        onClick={() => resetValidate(data?.id)}
                                        className="text-white bg-error/80 hover:scale-105"
                                    >
                                        <MdCancel className="w-5 h-5 mr-1" />
                                        Reset Validasi
                                    </SecondaryButton>
                                )}
                            </>
                        ) : (
                            <>
                                {isDivisiSDM && data.status === "ditolak" && (
                                    <SecondaryButton
                                        asLink
                                        href={route(
                                            "divisi-sdm.pengajuan.revisi",
                                            {
                                                pakId: data.riwayat_pak.id,
                                                isRevisi: true,
                                                pengajuanId: data.id,
                                            }
                                        )}
                                        className="text-white border rounded shadow bg-secondary hover:scale-105"
                                    >
                                        <FaEdit className="mr-1 scale-125" />
                                        Revisi Data
                                    </SecondaryButton>
                                )}

                                {isDivisiSDM &&
                                    data.status !== "divalidasi" && (
                                        <SecondaryButton
                                            onClick={handleCancel}
                                            className="text-white border rounded shadow bg-error/80 hover:scale-105"
                                        >
                                            <MdCancel className="mr-2 scale-125" />
                                            Batalkan Pengajuan
                                        </SecondaryButton>
                                    )}

                                {data.status === "divalidasi" && (
                                    <>
                                        <SecondaryButton
                                            onClick={() =>
                                                handleArchive(data.id)
                                            }
                                            className="text-white border rounded shadow bg-hijau hover:border-hijau hover:scale-105"
                                        >
                                            <BiSolidArchiveIn className="mr-2 scale-125" />
                                            Arsipkan
                                        </SecondaryButton>
                                        <ModalArsipDokumen pengajuan={data} />
                                    </>
                                )}
                            </>
                        )}
                    </section>
                </main>
            )}
        </Modal>
    );
}
