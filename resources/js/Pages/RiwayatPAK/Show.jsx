import {
    // DetailPegawai,
    Modal,
    PrimaryButton,
    SecondaryButton,
    SuccessButton,
} from "@/Components";
import { router } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline, IoDocument } from "react-icons/io5";
import { usePage } from "@inertiajs/react";
import { FaEdit } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import PengusulanPAKTable from "../PengusulanPAK/Partials/DetailPengusulanPAKTable";
import axios from "axios";

export default function Show({ riwayatPAK, onClose }) {
    const [showIframe, setShowIframe] = useState(false);

    const previewPdf = async (data) => {
        console.log(JSON.stringify(data.id));
        router.post("/pak/process", data, {
            preserveScroll: true,
            preserveState: true,

            onFinish: () => setIsLoading(false),
            onError: (errors) => {
                console.error("Error:", errors);
            },
            onSuccess: () => {
                setShowIframe(true); // Munculkan iframe setelah data dikirim
                // const url = page.props.url;
                // window.open(url, "_blank");
            },
        });
    };

    const [data, setData] = useState(null);

    useEffect(() => {
        if (riwayatPAK?.id) {
            axios
                .get(route("divisi-sdm.riwayat-pak.show-detail", riwayatPAK.id))
                .then((res) => setData(res.data))
                .catch((err) => console.error(err));
        }

        return () => {
            setData(null); // Bersihkan data saat modal ditutup
        };
    }, [riwayatPAK]);

    // const pengusulanPAK = riwayatPAK.pengusulan_pak;
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

    if (!data) {
        return (
            <dialog id={`Show-Detail`} className="modal">
                <div className="text-center modal-box">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-4 text-gray-600">Memuat data detail...</p>
                </div>
            </dialog>
        );
    }

    return (
        <Modal
            id={`Show-Detail-${riwayatPAK?.id}`}
            show={true}
            onClose={onClose}
            maxWidth="4xl"
        >
            {showIframe && (
                <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-7xl h-[80vh] bg-white rounded shadow-lg overflow-hidden">
                        <button
                            className="absolute z-10 p-2 bg-white rounded-full shadow top-2 right-2 hover:bg-red-500 hover:text-white"
                            onClick={() => setShowIframe(false)}
                        >
                            <IoCloseOutline className="w-6 h-6 stroke-red-500 group-hover/button:stroke-white" />
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
            <main className="w-full mx-auto my-4 text-center ">
                <section className="relative w-full max-w-4xl mx-auto modal-box">
                    <h3 className="mb-2 text-xl font-bold">
                        Lihat Detail Data
                    </h3>
                    <div className="px-2 overflow-x-auto">
                        <h1 className="my-4 text-xl font-medium">
                            Data Riwayat dalam Penetapan Angka Kredit
                        </h1>
                        {/* <DetailPAKTable
                            collapse={false}
                            data={data}
                            onScrollToPengusulanPAK={
                                data.pengusulan_pak && scrollToPengusulanPAK
                            }
                        /> */}
                    </div>
                    {data.pengusulan_pak && (
                        <div
                            className="px-2 my-10 mb-16 overflow-x-auto"
                            ref={pengusulanPAKRef}
                        >
                            <h1 className="my-4 text-xl font-medium">
                                Data Pengusulan Sebagai Sumber Penetapan Angka
                                Kredit
                            </h1>
                            <PengusulanPAKTable
                                collapse={false}
                                data={data.pengusulan_pak}
                            />
                        </div>
                    )}
                    <div className="px-2 my-10 mb-16 overflow-x-auto">
                        <h1 className="my-4 text-xl font-medium">
                            Data Pegawai dalam Penetapan Angka Kredit
                        </h1>
                        {/* <DetailPegawai pegawai={data.pegawai} /> */}
                    </div>
                </section>

                {/* Floating Action Button */}
                <div className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-4 left-1/2">
                    <SecondaryButton
                        as="button"
                        onClick={() => previewPdf(data)}
                    >
                        <FaFilePdf className="w-4 h-4 mr-1 fill-secondary" />
                        LIHAT DOKUMEN
                    </SecondaryButton>

                    {data.id && (
                        <SecondaryButton
                            asLink
                            href={route("divisi-sdm.riwayat-pak.edit", data.id)}
                            className="text-white bg-secondary"
                        >
                            <FaEdit className="w-4 h-4 mr-1 " />
                            Edit Data
                        </SecondaryButton>
                    )}
                </div>
            </main>
        </Modal>
    );
}

// Kode Lama
{
    /* <dialog id={`Show-${riwayatPAK.id}`} className="modal">
            {showIframe && (
                <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-7xl h-[80vh] bg-white rounded shadow-lg overflow-hidden">
                        <button
                            className="absolute z-10 p-2 transition bg-white rounded-full shadow group/button top-2 right-2 hover:bg-red-500 hover:text-white"
                            onClick={() => setShowIframe(false)}
                        >
                            <IoCloseOutline className="w-6 h-6 stroke-red-500 group-hover/button:stroke-white " />
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

            <div className="relative w-full max-w-3xl modal-box">
                <form method="dialog">
                    <button className="absolute btn btn-md btn-circle btn-ghost right-2 top-2">
                        <IoCloseOutline className="w-10 h-10 stroke-accent group-hover/item:fill-white" />
                    </button>
                </form>

                <h3 className="mb-2 text-xl font-bold">Lihat Detail Data</h3>

                <div className="px-2 overflow-x-auto">
                    <h1 className="my-4 text-xl font-medium">
                        Data Riwayat dalam Penetapan Angka Kredit
                    </h1>
                    <DetailPAKTable
                        collapse={false}
                        data={riwayatPAK}
                        onScrollToPengusulanPAK={
                            pengusulanPAK && scrollToPengusulanPAK
                        }
                    />
                </div>

                {pengusulanPAK && (
                    <div
                        className="px-2 my-10 mb-16 overflow-x-auto"
                        ref={pengusulanPAKRef}
                    >
                        <h1 className="my-4 text-xl font-medium">
                            Data Pengusulan Sebagai Sumber Penetapan Angka
                            Kredit
                        </h1>
                        <PengusulanPAKTable
                            collapse={false}
                            data={pengusulanPAK}
                        />
                    </div>
                )}

                <div className="px-2 my-10 mb-16 overflow-x-auto">
                    <h1 className="my-4 text-xl font-medium">
                        Data Pegawai dalam Penetapan Angka Kredit
                    </h1>
                    <DetailPegawai pegawai={riwayatPAK.pegawai} />
                </div>
            </div>


            <div className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-12 left-1/2">
                <SecondaryButton
                    as="button"
                    onClick={() => previewPdf(riwayatPAK)}
                    type="submit"
                >
                    <FaFilePdf className="w-4 h-4 mr-1 fill-secondary" />
                    LIHAT DOKUMEN
                </SecondaryButton>

                <PrimaryButton
                    asLink
                    href={route("divisi-sdm.pak.edit", { id: riwayatPAK.id })}
                    className="text-white bg-secondary"
                >
                    <FaEdit className="w-4 h-4 mr-1 " />
                    Edit Data
                </PrimaryButton>
            </div>
        </dialog> */
}
