// Config Static (Sama kayak JSON kamu, tapi dalam JS object biar cepat)
// Atau bisa fetch dari JSON di public jika mau strict kayak sebelumnya.
// Tapi untuk report table, static JS object lebih performant.

export const LABEL_CONFIG = {
    "PRODUK FUNDING": {
        nama: "Nama Nasabah",
        identitas: "Nomor Rekening",
        nominal: "Dana Terhimpun",
        tanggal: "Tgl Buka Rekening",
        extra1: "Nomor Rekening", // Mapping kolom identitas
    },
    "PRODUK KREDIT": {
        nama: "Nama Debitur",
        identitas: "No. Aplikasi",
        nominal: "Plafond Kredit",
        tanggal: "Tgl Pencairan",
        extra1: "No. Aplikasi Kredit",
    },
    "PRODUK ANAK PERUSAHAAN": {
        nama: "Nama Pelanggan",
        identitas: "No. Polis/Akun",
        nominal: "Nilai Premi/Inv.",
        tanggal: "Tgl Pembelian",
        extra1: "Nomor Polis",
    },
    "DEFAULT": {
        nama: "Nama Nasabah",
        identitas: "No. Identitas",
        nominal: "Nominal (Rp)",
        tanggal: "Tanggal Akuisisi",
        extra1: "No. Identitas",
    }
};

export const getLabelByKategori = (kategori) => {
    const key = kategori ? kategori.toUpperCase() : "DEFAULT";
    return LABEL_CONFIG[key] || LABEL_CONFIG["DEFAULT"];
};
