import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SelectInput } from "@/Components";
import { router } from "@inertiajs/react";
import { useState } from "react";
import {
    HiOutlineBriefcase,
    HiOutlineFilter,
    HiOutlineBadgeCheck,
    HiOutlineInformationCircle,
} from "react-icons/hi";

export default function PegawaiPromotion({
    title,
    auth,
    candidates,
    filters,
    options,
}) {
    // State Filter (Default kosong = All Time)
    const [selectedYear, setSelectedYear] = useState(filters.year || "");
    const [selectedDivisi, setSelectedDivisi] = useState(
        filters.divisi_id || ""
    );

    const formatRupiah = (val) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(val);

    // Handler Filter
    const handleFilterChange = (key, value) => {
        const newFilters = {
            year: key === "year" ? value : selectedYear,
            divisi_id: key === "divisi" ? value : selectedDivisi,
        };

        if (key === "year") setSelectedYear(value);
        if (key === "divisi") setSelectedDivisi(value);

        router.get(route("kacab.pegawai_promotion"), newFilters, {
            preserveState: true,
            preserveScroll: true,
            only: ["candidates", "filters"],
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            <main className="w-full px-6 py-6 mx-auto space-y-8">
                {/* --- HEADER & INFO --- */}
                <div className="p-6 text-white shadow-lg bg-gradient-to-r from-secondary to-secondary/90 rounded-xl">
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h2 className="flex items-center gap-2 text-2xl font-bold">
                                <HiOutlineBadgeCheck className="text-yellow-400" />
                                {title}
                            </h2>
                            <p className="max-w-2xl mt-1 text-sm text-primary">
                                Analisis otomatis sistem berdasarkan pencapaian
                                target{" "}
                                <span className="font-bold text-white uppercase">
                                    {selectedYear
                                        ? `Tahun ${selectedYear}`
                                        : "Sejak Awal (All Time)"}
                                </span>
                                .
                            </p>
                        </div>

                        {/* Summary Card Kecil */}
                        <div className="p-4 border rounded-lg bg-primary-dark/10 backdrop-blur-sm border-primary/70">
                            <p className="text-xs font-bold uppercase text-primary">
                                Kandidat High Potential
                            </p>
                            <p className="text-2xl font-bold">
                                {
                                    candidates.filter((c) => c.score >= 100)
                                        .length
                                }{" "}
                                <span className="text-sm font-normal">
                                    Pegawai
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- FILTER BAR --- */}
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                        <HiOutlineFilter className="w-5 h-5" />
                        Filter Data:
                    </div>
                    <div className="flex gap-3">
                        <div className="w-36">
                            <SelectInput
                                value={selectedYear}
                                options={options.years}
                                placeholder="Semua Tahun" // Label default
                                className="w-full h-10 text-sm"
                                // Penting: Biar bisa pilih 'Semua Tahun' lagi
                                disablePlaceholder={false}
                                onChange={(e) =>
                                    handleFilterChange("year", e.target.value)
                                }
                            />
                        </div>
                        <div className="w-48">
                            <SelectInput
                                value={selectedDivisi}
                                options={options.divisi}
                                placeholder="Semua Divisi"
                                className="w-full h-10 text-sm"
                                disablePlaceholder={false}
                                onChange={(e) =>
                                    handleFilterChange("divisi", e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* --- TABEL KANDIDAT --- */}
                <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
                    <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gray-50/50">
                        <h3 className="flex items-center gap-2 font-bold text-gray-700">
                            <HiOutlineBriefcase className="text-gray-500" />
                            Daftar Evaluasi Pegawai
                        </h3>
                        {!selectedYear && (
                            <div className="flex items-center gap-1 px-2 py-1 text-xs text-orange-600 rounded bg-orange-50">
                                <HiOutlineInformationCircle />
                                Menampilkan akumulasi total (All Time).
                            </div>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase border-b bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4">Pegawai</th>
                                    <th className="px-6 py-4">Divisi</th>
                                    <th className="px-6 py-4 text-right">
                                        Target{" "}
                                        {selectedYear
                                            ? `(${selectedYear})`
                                            : "(Total)"}
                                    </th>
                                    <th className="px-6 py-4 text-right">
                                        Realisasi
                                    </th>
                                    <th className="px-6 py-4 text-center">
                                        Skor Kinerja
                                    </th>
                                    <th className="px-6 py-4 text-center">
                                        Rekomendasi Sistem
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {candidates.length > 0 ? (
                                    candidates.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="transition-colors hover:bg-gray-50 group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-4 font-mono text-xs text-gray-400">
                                                        #{index + 1}
                                                    </span>
                                                    <div>
                                                        <p className="font-bold text-gray-800">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {item.nip}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {item.divisi}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-right text-gray-500">
                                                {formatRupiah(item.target)}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-right text-gray-800">
                                                {formatRupiah(item.realisasi)}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-16 h-1.5 overflow-hidden bg-gray-200 rounded-full">
                                                        <div
                                                            className={`h-full rounded-full ${
                                                                item.score >=
                                                                100
                                                                    ? "bg-bermuda"
                                                                    : item.score >=
                                                                      80
                                                                    ? "bg-green-500"
                                                                    : "bg-red-500"
                                                            }`}
                                                            style={{
                                                                width: `${Math.min(
                                                                    item.score,
                                                                    100
                                                                )}%`,
                                                            }}
                                                        ></div>
                                                    </div>

                                                    {/* LOGIC TAMPILAN BARU */}
                                                    <span className="font-bold text-gray-700">
                                                        {/* Jika lebih dari 200, tampilkan 200%+, jika tidak tampilkan aslinya */}
                                                        {item.score > 250
                                                            ? "250%+"
                                                            : item.score + "%"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                                                        item.badge_color ===
                                                        "purple"
                                                            ? "bg-bermuda/30 text-dark-primary border-purple-200"
                                                            : item.badge_color ===
                                                              "green"
                                                            ? "bg-green-100 text-green-700 border-green-200"
                                                            : item.badge_color ===
                                                              "yellow"
                                                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                                            : "bg-red-50 text-red-600 border-red-200"
                                                    }`}
                                                >
                                                    {item.recommendation}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-10 italic text-center text-gray-400"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <span>
                                                    Belum ada data evaluasi
                                                    untuk periode ini.
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
