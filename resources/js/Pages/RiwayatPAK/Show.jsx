// ModalCekValidasi.jsx
import {
    DetailPAKTable,
    DetailPegawai,
    PrimaryButton,
    SecondaryButton,
    SuccessButton,
} from "@/Components";
import { router } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import { IoCloseOutline, IoDocument } from "react-icons/io5";
import { usePage } from "@inertiajs/react";
import { FaEdit } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

export default function Show({ riwayatPAK }) {
    const [showIframe, setShowIframe] = useState(false);

    const previewPdf = async (pak) => {
        await router.post("/divisi-sdm/pak/process", pak, {
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

    const { props } = usePage();

    return (
        <dialog id={`Show-${riwayatPAK.id}`} className="modal">
            {/* Saya ingin ditampilkan iframe pdf ini setelah ditekan tombol Lihat Dokumen, dan ditampilkan diatas dialog, gimana caranya? */}
            {/* ✅ IFRAME ditampilkan di atas modal jika showIframe true */}
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
                    <DetailPAKTable data={riwayatPAK} />
                </div>

                <div className="px-2 my-10 mb-16 overflow-x-auto">
                    <h1 className="my-4 text-xl font-medium">
                        Data Pegawai dalam Penetapan Angka Kredit
                    </h1>
                    <DetailPegawai pegawai={riwayatPAK.pegawai} />
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-12 left-1/2">
                <PrimaryButton
                    as="button"
                    onClick={() => previewPdf(riwayatPAK)}
                    type="submit"
                    className=""
                >
                    <FaFilePdf className="w-4 h-4 mr-1 fill-white" />
                    LIHAT DOKUMEN
                </PrimaryButton>

                <SecondaryButton
                asLink
                href={route('divisi-sdm.riwayat-pak.edit', riwayatPAK.id)}
                 className="bg-white"
                >
                    <FaEdit className="inline-flex items-center justify-center w-4 h-4 mr-1 fill-secondary " />
                    Edit Data
                </SecondaryButton>
            </div>
            {/* Floating Action Button */}
        </dialog>
    );
}
