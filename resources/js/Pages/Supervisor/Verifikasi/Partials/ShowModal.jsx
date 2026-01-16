import { InputError, SecondaryButton, SuccessButton } from "@/Components";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import DetailAkuisisi from "@/Pages/Administrator/Akuisisi/Partials/DetailAkuisisi";
export default function ShowModal({
    akuisisi,
    onClose,
    handleApprove,
    handleReject,
    canApprove = false,
}) {
    const [isRejectMode, setIsRejectMode] = useState(false);
    const [catatan, setCatatan] = useState("");
    const [error, setError] = useState("");
    const handleClose = () => {
        setIsRejectMode(false);
        setCatatan("");
        setError("");
        onClose();
    };
    const submitReject = (e) => {
        e.preventDefault();
        if (!catatan.trim()) {
            setError("Alasan penolakan wajib diisi.");
            return;
        }
        handleReject(catatan);
        handleClose();};

    const isValidated = akuisisi?.status_verifikasi !== "pending";

    return (
        <dialog id={`Show-${akuisisi?.id}`} className="modal modal-open">
            <div className="relative w-full max-w-3xl modal-box">
                {/* Tombol Close Pojok Kanan Atas */}
                <button
                    onClick={handleClose}
                    className="absolute btn btn-md btn-circle btn-ghost right-2 top-2"
                >
                    <IoCloseOutline className="w-10 h-10 stroke-accent" />
                </button>
                {/* --- LOGIC TAMPILAN BERGANTIAN --- */}
                {!isRejectMode ? (
                    <div className="px-2 my-5 mb-16 overflow-x-auto">
                        <h3 className="mb-4 text-xl font-bold text-gray-800">
                            Lihat Detail Data Akuisisi
                        </h3>
                        {/* Komponen Detail User Anda */}
                        <DetailAkuisisi akuisisi={akuisisi} collapse={false} />
                    </div>
                ) : (
                    <div className="px-2 my-5 mb-5">
                        <div className="flex items-center gap-2 mb-4">
                            <button
                                onClick={() => setIsRejectMode(false)}
                                className="btn btn-sm btn-ghost btn-circle"
                            >
                                <FaArrowLeft />
                            </button>
                            <h3 className="text-xl font-bold text-gray-800">
                                Alasan Penolakan / Revisi
                            </h3>
                        </div>
                        <form onSubmit={submitReject}>
                            <div className="relative w-full">
                                <textarea
                                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-primary textarea-bordered placeholder:text-gray-400"
                                    placeholder="Tuliskan alasan kenapa data ini ditolak agar pegawai dapat memperbaikinya..."
                                    value={catatan}
                                    onChange={(e) => setCatatan(e.target.value)}
                                    maxLength={1000}
                                    autoFocus
                                ></textarea>
                            </div>
                            {error && (
                                <InputError message={error} className="mt-2" />
                            )}
                            <div className="flex justify-end gap-3 mt-6">
                                <SecondaryButton
                                    onClick={() => setIsRejectMode(false)}
                                >
                                    Batal
                                </SecondaryButton>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white transition duration-200 bg-red-600 rounded-md hover:bg-red-700"
                                >
                                    Konfirmasi Tolak
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            {/* --- FLOATING ACTION BUTTONS (Hanya muncul di Mode Detail) --- */}
            {(canApprove && !isRejectMode && !isValidated) && (
                <div className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-14 left-1/2">
                    {/* Tombol Approve */}
                    <SuccessButton
                        onClick={handleApprove}
                        className="gap-1 hover:scale-105 hover:bg-hijau/80 text-hijau/75"
                    >
                        <FaCheck className="w-4 h-4 fill-white" />
                        Validasi
                    </SuccessButton>
                    {/* Tombol Reject (Pindah ke Mode Form) */}
                    <SecondaryButton
                        type="button"
                        onClick={() => setIsRejectMode(true)}
                        className="text-white bg-error/80 hover:scale-105"
                    >
                        <IoCloseOutline className="w-6 h-6" />
                        Tolak
                    </SecondaryButton>
                </div>
            )}
        </dialog>
    );
}
