// ModalCekValidasi.jsx
import {
    DetailPAKTable,
    DetailPegawai,
    SecondaryButton,
    SuccessButton,
} from "@/Components";
import { router, useForm } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import { FaFileSignature } from "react-icons/fa6";
import { IoCloseOutline, IoDocument } from "react-icons/io5";
import SignatureCanvas from "react-signature-canvas";
import { usePage } from "@inertiajs/react";
import SignaturePad from "signature_pad";

export default function ModalCekValidasi({ pengajuan }) {
    const [showIframe, setShowIframe] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        id: pengajuan.id,
        signature: "", // nanti diisi base64 image
        // data lain jika perlu
    });

    const handleLihatDokumen = async (pengajuan) => {
        await router.post("/riwayat-pak/cetak-saja", pengajuan.document, {
            preserveScroll: true,
            preserveState: true,

            onFinish: () => setIsLoading(false),
            onError: (errors) => {
                console.error("Error:", errors);
            },
            onSuccess: () => {
                setShowIframe(true); // Munculkan iframe setelah data dikirim
                const url = page.props.url;
                window.open(url, "_blank");
            },
        });
    };
    const canvasRef = useRef(null);
    const sigPad = useRef(null);
    const [mode, setMode] = useState("draw"); // 'draw' or 'upload'

    // const signaturePad = new SignaturePad(canvas);

    // useEffect(() => {
    //     const signaturePad = new SignaturePad(canvasRef.current)
    //     // simpan signaturePad ke state jika perlu
    //   }, [])

    const handleSave = () => {
        const canvas = canvasRef.current;
        const signaturePad = new SignaturePad(canvas);

        if (signaturePad.isEmpty()) {
            alert("Tanda tangan masih kosong");
            return;
        }

        const base64Image = signaturePad.toDataURL("image/png");
        setData("signature", base64Image);
        data.signature = base64Image
        console.log(data)
        post.route("pengajuan.validasi"),
            data,
            {
                onSuccess: () => {
                    console.log("Sukses kirim tanda tangan");
                },
            };
    };

    const { props } = usePage();
    const signaturePath = props.flash.signature_path;
    // TODO ? Mungkin sebaiknya tamabhakna juga Catatan Evaluasi/Review Dari Pimpinan
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
                        <iframe
                            src={route("pak.preview")}
                            width="100%"
                            height="100%"
                            className="border-0"
                        ></iframe>
                    </div>
                </div>
            )}

            {signaturePath && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">
                        Preview Tanda Tangan
                    </h2>
                    <img
                        src={`/${signaturePath}`}
                        alt="Signature"
                        className="w-64 h-auto border"
                    />

                    {/* Atau pakai iframe */}
                    {/* <iframe src={`/${signaturePath}`} className="w-64 h-40 border" /> */}
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
                    <DetailPAKTable document={pengajuan.document} />
                </div>

                <div className="px-2 my-10 mb-16 overflow-x-auto">
                    <h1 className="my-4 text-xl font-medium">
                        Data Pegawai dalam Penetapan Angka Kredit
                    </h1>
                    <DetailPegawai pegawai={pengajuan.pegawai} />
                </div>

                <div className="my-20">
                    <div className="mb-2">
                        <button
                            onClick={() => setMode("draw")}
                            className="action-btn"
                        >
                            Tulis TTD
                        </button>
                        <button
                            onClick={() => setMode("upload")}
                            className="action-btn "
                        >
                            Upload Gambar
                        </button>
                    </div>

                    {mode === "draw" && (
                        <>
                            <SignatureCanvas
                                ref={sigPad}
                                penColor="black"
                                canvasProps={{
                                    width: 400,
                                    height: 200,
                                    className:
                                        "border border-accent p-2 m-2 rounded-md flex justify-center mx-auto",
                                }}
                            />
                            <button
                                onClick={() => sigPad.current.clear()}
                                className="mx-10 action-btn "
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleSave}
                                className="mx-10 action-btn"
                            >
                                Gunakan TTD Ini
                            </button>
                        </>
                    )}

                    {mode === "upload" && (
                        <input
                            type="file"
                            accept="image/*"
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
                    href
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
