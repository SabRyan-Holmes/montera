import { useState, useEffect } from "react";
import axios from "axios";

// Default fallback biar ga error pas loading/gagal fetch
const DEFAULT_LABELS = {
    nama: "Nama Nasabah",
    identitas: "No. Identitas / Rekening",
    placeholder_identitas: "NIK atau Nomor Rekening",
    nominal: "Nominal Realisasi (Rp)",
    tanggal: "Tanggal Akuisisi",
};

export default function useDynamicLabels() {
    const [config, setConfig] = useState(null);
    const [currentLabels, setCurrentLabels] = useState(DEFAULT_LABELS);
    const [loading, setLoading] = useState(true);

    // 1. Load JSON dari folder Public saat pertama kali component diload
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                // Akses langsung ke file di folder public
                const response = await axios.get("/data/label-akuisisi-form-config.json");
                setConfig(response.data);
            } catch (error) {
                console.error("Gagal memuat konfigurasi label:", error);
                // Kalau gagal, tetap pakai default biar aplikasi ga crash
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    // 2. Fungsi untuk mengubah label berdasarkan kategori
    const setCategory = (kategoriName) => {
        // Normalisasi teks biar match sama key di JSON (Uppercase)
        const key = kategoriName ? kategoriName.toUpperCase() : "DEFAULT";

        if (config && config[key]) {
            setCurrentLabels(config[key]);
        } else if (config && config["DEFAULT"]) {
            setCurrentLabels(config["DEFAULT"]);
        } else {
            setCurrentLabels(DEFAULT_LABELS);
        }
    };

    return {
        labels: currentLabels, // Data label aktif
        setCategory, // Fungsi buat ganti kategori
        loading, // Status loading (opsional kalo mau dipake)
    };
}
