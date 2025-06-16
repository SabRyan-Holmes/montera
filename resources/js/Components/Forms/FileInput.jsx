import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function FileInput({ name, type = "file", ...props }) {
    return (
        <div className="flex items-center justify-center w-full">
            <label
                forHtml={name}
                className="flex flex-col items-center justify-center w-full h-64 border rounded-lg cursor-pointer border-gradient bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <IoCloudUploadOutline className="w-10 h-10 mx-1 stroke-2 stroke-hijau" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                            Klik untuk Upload{" "}
                        </span>
                        atau seret dan jatuhkan
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF, PNG, OR JPG (MAX. 2MB)
                    </p>
                </div>
                <input
                    {...props}
                    id={name}
                    type={type}
                    accept=".pdf,.jpg,.jpeg,.png"
                    name={name}
                    className="hidden"
                />
            </label>
        </div>
    );
}
