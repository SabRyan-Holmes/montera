import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa";

export default function FileInput({
    name,
    type = "file",
    file,
    previewUrl,
    onChange,
}) {
    // const isImage = file && file.type.startsWith("image/");
    const isPDF = file && file.type === "application/pdf";

    return (
        <div className="flex items-center justify-center w-full">
            <label
                htmlFor={name}
                className="flex flex-col items-center justify-center w-full h-64 transition duration-300 ease-in-out border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
            >
                {!file ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                        <IoCloudUploadOutline className="w-10 h-10 text-green-500" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                                Klik untuk Upload
                            </span>{" "}
                            atau seret dan jatuhkan
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            PDF (max 2MB)
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
                        {isPDF && (
                            <div className="flex flex-col items-center w-full gap-2">
                                <iframe
                                    src={previewUrl}
                                    title="PDF Preview"
                                    className="w-32 h-40 border border-gray-300 rounded shadow-sm"
                                />
                            </div>
                        )}
                        <a
                            href={previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="max-w-xs text-sm font-medium text-blue-600 underline truncate hover:text-blue-800 dark:text-blue-400"
                        >
                            {file.name}
                        </a>

                        <p className="text-xs text-gray-400">
                            {(file.size / 1024).toFixed(1)} KB
                        </p>
                        <p className="text-xs font-semibold text-green-500">
                            File berhasil dipilih
                        </p>
                    </div>
                )}
                <input
                    id={name}
                    name={name}
                    type={type}
                    accept=".pdf"
                    onChange={onChange}
                    className="hidden"
                />
            </label>
        </div>
    );
}
