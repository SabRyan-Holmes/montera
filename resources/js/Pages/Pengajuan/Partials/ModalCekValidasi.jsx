// ModalCekValidasi.jsx
import {
    DetailPAKTable,
    DetailPegawai,
    SecondaryButton,
    SuccessButton,
} from "@/Components";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { FaEraser, FaFileSignature, FaTrash } from "react-icons/fa6";
import { IoCloseOutline, IoDocument } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SignatureCanvas from "react-signature-canvas";
import { usePage } from "@inertiajs/react";
import { PiSignature } from "react-icons/pi";
import Swal from "sweetalert2";

export default function ModalCekValidasi({ pengajuan }) {
    const [showIframe, setShowIframe] = useState(false);

    const { data, setData,get, post, processing, errors } = useForm({
        id: pengajuan.id,
        signature: "", // nanti diisi base64 image
        // data lain jika perlu
    });

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });
    useEffect(() => {
        if (errors && Object.values(errors).length > 0) {
            // Ambil nilai pertama dari object errors
            const firstErrorMessage = Object.values(errors)[0];
            // console.log("firstErrorMessage :");
            // console.log(firstErrorMessage);
            Toast.fire({
                icon: "warning",
                iconColor: "#fb7185",
                title: firstErrorMessage,
                color: "#fb7185",
            });
        }
    }, [errors]);

    const handleLihatDokumen = async (pengajuan) => {
        router.post("/pak/process", pengajuan.document, {
            preserveScroll: true,
            preserveState: true,

            onFinish: () => setLoading(false),
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
    const sigCanvas = useRef(null);
    const [trimmedDataURL, setTrimmedDataURL] = useState(null);
    const [mode, setMode] = useState("draw"); // 'draw' or 'upload'
    const [loading, setLoading] = useState(false);

    const handleUse = () => {
        const canvas = sigCanvas.current;
        const ctx = canvas
            .getCanvas()
            .getContext("2d", { willReadFrequently: true });

        if (canvas.isEmpty()) {
            alert("Tanda tangan belum dibuat!");
        }

        setTrimmedDataURL(canvas.getTrimmedCanvas().toDataURL("image/png"));

        setData("signature", trimmedDataURL);
        console.log("signature : ", data.signature);

        // TODO : Logika TTD dr image belum
        //
    };

    // useEffect(() => {
    //     const canvas = sigCanvas.current;
    //     if (canvas) {
    //         const ctx = canvas.getCanvas().getContext("2d"); // Hapus willReadFrequently: true
    //         // simpan ctx ke state kalau perlu
    //     }
    // }, []);

    const handleApprove = () => {
        post(route("pimpinan.pengajuan.approve", data), {
            preserveScroll: true,
            preserveState: true,
            onStart: () => {
                setLoading(true);
            },
            onError: (errors) => {
                setLoading(false);
                console.error("Error:", errors);
                Toast.fire({
                    icon: "warning",
                    iconColor: "#fb7185",
                    title: errors,
                    color: "#fb7185",
                });
            },
            onSuccess: () => {
                setLoading(false);
                setTimeout(() => {
                    const url= "/pimpinan/pengajuan/approved/show"
                    window.open(url, "_blank");
                }, 1000); // kasih delay kecil kalau memang perlu
                console.log("Sukses Menvalidasi");
            },
        });
    };

    const { props } = usePage();

    // TODO ? Mungkin sebaiknya tamabhakna juga Catatan Evaluasi/Review Dari Pimpinan
    console.log("isi data");

    console.log(data);
    return (
        <dialog id={`DialogCekValidasi-${pengajuan.id}`} className="modal">
            {/* Saya ingin ditampilkan iframe pdf ini setelah ditekan tombol Lihat Dokumen, dan ditampilkan diatas dialog, gimana caranya? */}
            {/* ✅ IFRAME ditampilkan di atas modal jika showIframe true */}
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
                                src={route("pak.preview")}
                                width="100%"
                                height="100%"
                                className="border-0"
                            ></iframe>
                        )}
                    </div>
                </div>
            )}

            {/* TES LIHAT TTD YANG DIGUNAAKN */}
            {/* {trimmedDataURL && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">
                        Preview Tanda Tangan
                    </h2>
                    <img
                        // src={`/${signaturePath}`}
                        src={trimmedDataURL}
                        alt="Signature"
                        className="w-64 h-auto border"
                    />

                </div>
            )} */}
            {/* Atau pakai iframe */}
            {/* <iframe src={`/${signaturePath}`} className="w-64 h-40 border" /> */}

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
                        data={pengajuan.document}
                        collapse={false}
                    />
                </div>

                <div className="px-2 my-10 mb-16 overflow-x-auto">
                    <h1 className="my-4 text-xl font-medium">
                        Data Pegawai dalam Penetapan Angka Kredit
                    </h1>
                    <DetailPegawai pegawai={pengajuan.pegawai} />
                </div>

                <div className="my-20">
                    <div className="flex justify-center w-1/3 gap-2 mx-auto mb-2 ">
                        <button
                            onClick={() => setMode("draw")}
                            className={
                                "action-btn " +
                                (mode === "draw" ? "bg-secondary" : "bg-white")
                            }
                        >
                            Tulis TTD
                            <PiSignature className="ml-1 scale-110" />
                        </button>
                        <button
                            onClick={() => setMode("upload")}
                            className={
                                "action-btn " +
                                (mode === "upload"
                                    ? "bg-secondary"
                                    : "bg-white")
                            }
                        >
                            Upload Gambar
                        </button>
                    </div>

                    {mode === "draw" && (
                        <>
                            <SignatureCanvas
                                ref={sigCanvas}
                                penColor="black"
                                canvasProps={{
                                    width: 400,
                                    height: 200,
                                    className:
                                        "border border-accent p-2 m-2 rounded-md flex justify-center mx-auto",
                                }}
                            />

                            <div className="flex justify-center w-1/3 gap-1 mx-auto mb-2">
                                <button
                                    onClick={() => sigCanvas.current.clear()}
                                    className="mx-10 action-btn "
                                >
                                    Clear
                                    <FaEraser className="" />
                                </button>
                                <button
                                    onClick={handleUse}
                                    className="mx-10 action-btn bg-hijau/50"
                                >
                                    Gunakan TTD Ini
                                </button>
                            </div>
                        </>
                    )}

                    {mode === "upload" && (
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-4"
                            onChange={(e) => {
                                const reader = new FileReader();
                                reader.onload = (event) =>
                                    onChange(event.target.result);
                                reader.readAsDataURL(e.target.files[0]);
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-12 left-1/2">
                <button
                    onClick={() => handleLihatDokumen(pengajuan)}
                    type="submit"
                    className="inline-flex items-center gap-1 px-3 py-2 text-gray-700 scale-110 bg-white border border-gray-300 rounded shadow hover:scale-105"
                >
                    <IoDocument className="w-4 h-4 fill-secondary" />
                    Lihat Dokumen
                </button>

                <SuccessButton
                    onClick={handleApprove}
                    className="gap-1 hover:scale-105 hover:bg-hijau/80 text-hijau/75"
                >
                    <FaFileSignature className="w-4 h-4 fill-white " />
                    Validasi Dokumen
                </SuccessButton>
            </div>
            {/* Floating Action Button */}
        </dialog>
    );
}
