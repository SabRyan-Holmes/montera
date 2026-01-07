import React, { useState, useRef, useEffect } from "react";
import { HiCloudArrowUp, HiDocumentText, HiTrash, HiCheckCircle } from "react-icons/hi2"; // Menggunakan Heroicons agar konsisten dengan Admin Sidebar

export default function FileInput({
    name,
    accept = ".pdf", // Default PDF
    file, // Object file yang dipilih
    onChange, // Callback function (file) => void
    error, // Pesan error jika ada
}) {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState(null);
    const inputRef = useRef(null);

    // Generate preview URL lokal saat file berubah
    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview(null);
        }
    }, [file]);

    // --- Drag & Drop Handlers ---
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            // Validasi tipe file sederhana
            if (accept.includes("pdf") && droppedFile.type !== "application/pdf") {
                alert("Hanya file PDF yang diperbolehkan!");
                return;
            }
            onChange(droppedFile); // Kirim file ke parent
        }
    };

    // --- Manual Select Handler ---
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onChange(e.target.files[0]);
        }
    };

    // --- Remove File Handler ---
    const handleRemove = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Mencegah trigger klik label
        onChange(null); // Reset di parent
        if (inputRef.current) inputRef.current.value = ""; // Reset input value
    };

    return (
        <div className="w-full">
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => inputRef.current.click()} // Klik container memicu input
                className={`
                    relative flex flex-col items-center justify-center w-full h-56
                    transition-all duration-300 border-2 border-dashed rounded-xl cursor-pointer
                    ${isDragging
                        ? "border-primary bg-primary/10 scale-[1.02]" // Efek saat drag
                        : error
                            ? "border-error bg-red-50"
                            : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-primary/50"
                    }
                `}
            >
                {/* Hidden Input */}
                <input
                    ref={inputRef}
                    id={name}
                    name={name}
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    className="hidden"
                />

                {!file ? (
                    // --- STATE: Belum Ada File ---
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center pointer-events-none">
                        <div className={`p-3 mb-3 rounded-full ${isDragging ? 'bg-primary/20' : 'bg-gray-100'}`}>
                            <HiCloudArrowUp className={`w-8 h-8 ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
                        </div>
                        <p className="mb-1 text-sm text-gray-500">
                            <span className="font-bold text-secondary">Klik untuk upload</span> atau seret file ke sini
                        </p>
                        <p className="text-xs text-gray-400">
                            PDF (Maks. 2MB)
                        </p>
                    </div>
                ) : (
                    // --- STATE: File Sudah Dipilih ---
                    <div className="relative flex flex-col items-center w-full h-full p-4 overflow-hidden rounded-xl group">

                        {/* Background Icon (Watermark effect) */}
                        <HiDocumentText className="absolute z-0 w-40 h-40 text-gray-200 -bottom-10 -right-10 rotate-12" />

                        <div className="z-10 flex flex-col items-center justify-center flex-1 w-full gap-2">
                            {/* Icon PDF Besar */}
                            <div className="p-3 bg-red-100 rounded-lg shadow-sm">
                                <HiDocumentText className="w-10 h-10 text-red-500" />
                            </div>

                            <div className="text-center">
                                <p className="text-sm font-semibold text-secondary line-clamp-1 max-w-[250px]">
                                    {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>

                            <div className="flex items-center gap-1 px-3 py-1 mt-2 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                <HiCheckCircle className="w-4 h-4" />
                                <span>Siap Diupload</span>
                            </div>
                        </div>

                        {/* Tombol Hapus & Preview */}
                        <div className="absolute z-20 flex gap-2 top-2 right-2">
                            {/* Tombol Hapus */}
                            <button
                                onClick={handleRemove}
                                type="button"
                                className="p-1.5 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                title="Hapus file"
                            >
                                <HiTrash className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Preview PDF Link (Opsional, di bawah) */}
                        {preview && file.type === "application/pdf" && (
                            <a
                                href={preview}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()} // Supaya tidak memicu klik input lagi
                                className="absolute z-20 text-xs bottom-2 text-primary hover:underline"
                            >
                                Lihat Preview
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && <p className="mt-2 text-sm text-error">{error}</p>}
        </div>
    );
}
