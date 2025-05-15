import React from "react";

export default function FileInput({ name, type = "file" }) {
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ["application/pdf", "image/jpeg", "image/png"];
            const fileType = file.type;

            if (!validTypes.includes(fileType)) {
                alert("Hanya file PDF, JPG, atau PNG yang diizinkan");
                e.target.value = ""; // Reset input file
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                // 2MB
                alert("Ukuran file maksimal 2MB");
                e.target.value = "";
                return;
            }

            if (onChange) {
                onChange(e); // Panggil prop onChange jika ada
            }
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <label
                forHtml={name}
                className="flex flex-col items-center justify-center w-full h-64 border rounded-lg cursor-pointer border-gradient bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        ariaHidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
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
                    id={name}
                    type={type}
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    name={name}
                    className="hidden"
                />
            </label>
        </div>
    );
}
