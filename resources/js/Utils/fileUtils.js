// resources/js/Utils/FileUtils.js

/**
 * 1. GETTER: Mengubah path database jadi URL lengkap
 * @param {string|null} path
 * @returns {string}
 */
export const getFileUrl = (path) => {
    if (!path) return "#";
    // Cek apakah ini link eksternal (http) atau lokal storage
    return path.startsWith("http") ? path : `/storage/${path}`;
};

/**
 * 2. GETTER: Mengambil nama file asli dari path panjang
 * Contoh: "uploads/2024/sk-target.pdf" -> "sk-target.pdf"
 * @param {string|null} path
 * @returns {string}
 */
export const getFileName = (path) => {
    if (!path) return "";
    return path.split("/").pop();
};

/**
 * 3. CHECKER: Mengecek apakah file adalah PDF (opsional, buat styling icon)
 * @param {string} path
 * @returns {boolean}
 */
export const isPdf = (path) => {
    if (!path) return false;
    return path.toLowerCase().endsWith('.pdf');
};

/**
 * 4. HANDLER: Aksi konfirmasi hapus file
 * Fungsi ini menerima `setData` milik Inertia useForm
 * @param {Function} setData - Fungsi dari useForm
 * @param {string} fieldName - Nama field di database/form (default: 'delete_file')
 */
export const handleConfirmDeleteFile = (setData, fieldName = "delete_file") => {
    // Menggunakan window.confirm bawaan browser (bisa diganti SweetAlert nanti)
    if (window.confirm("Apakah Anda yakin ingin menghapus lampiran ini?")) {
        // Set field delete_file menjadi true agar backend tahu file harus dihapus
        setData(fieldName, true);
    }
};
