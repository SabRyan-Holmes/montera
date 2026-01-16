import { RadialChart } from "@/Components";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react"; // Import Router untuk filter
import { useState } from "react";
import {
    HiOutlineBanknotes,
    HiOutlineChartPie,
    HiArrowTrendingUp,
    HiArrowTrendingDown,
} from "react-icons/hi2";
import { FaListUl } from "react-icons/fa6";
import { HiOutlineFilter } from "react-icons/hi";

export default function Realisasi({
    auth,
    title,
    overview,
    breakdownKategori,
    breakdownProduk, // Data Baru
    periodeLabel,
    filters, // Props Filter dari backend
}) {
    // State lokal untuk filter (agar UI responsif sebelum reload)
    const [selectedYear, setSelectedYear] = useState(filters.year || "");
    const [selectedMonth, setSelectedMonth] = useState(filters.month || "");

    // Helper Format Rupiah
    const formatRupiah = (val) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(val);

    // --- HANDLE FILTER ---
    const handleFilterChange = (key, value) => {
        const newFilters = {
            year: key === "year" ? value : selectedYear,
            month: key === "month" ? value : selectedMonth,
        };

        // Update state lokal
        if (key === "year") setSelectedYear(value);
        if (key === "month") setSelectedMonth(value);

        // Reload halaman dengan parameter baru
        router.get(route("kacab.realisasi"), newFilters, {
            preserveState: true,
            preserveScroll: true,
            only: [
                "overview",
                "breakdownKategori",
                "breakdownProduk",
                "periodeLabel",
                "filters",
            ],
        });
    };

    // Generate List Tahun (Misal 5 tahun ke belakang)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    const months = [
        { val: "1", label: "Januari" },
        { val: "2", label: "Februari" },
        { val: "3", label: "Maret" },
        { val: "4", label: "April" },
        { val: "5", label: "Mei" },
        { val: "6", label: "Juni" },
        { val: "7", label: "Juli" },
        { val: "8", label: "Agustus" },
        { val: "9", label: "September" },
        { val: "10", label: "Oktober" },
        { val: "11", label: "November" },
        { val: "12", label: "Desember" },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            title={title}
            header={"Monitoring Realisasi Cabang"}
        >
            <main className="w-full px-6 py-6 mx-auto space-y-6">
                {/* --- HEADER & FILTER SECTION --- */}
                <div className="flex flex-col justify-between gap-4 p-4 bg-white border border-gray-200 shadow-sm md:flex-row md:items-center rounded-xl">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Rekapitulasi Realisasi
                        </h2>
                        <p className="text-sm text-gray-500">
                            Periode Data:{" "}
                            <span className="font-bold text-blue-600">
                                {periodeLabel}
                            </span>
                        </p>
                    </div>

                    {/* AREA FILTER HISTORIS */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50">
                            <HiOutlineFilter className="text-gray-400" />
                            <span className="font-semibold text-gray-600">Filter:</span>
                        </div>

                        {/* Dropdown Tahun */}
                        <select
                            className="text-sm border-gray-300 rounded-lg focus:border-primary focus:ring-primary"
                            value={selectedYear}
                            onChange={(e) =>
                                handleFilterChange("year", e.target.value)
                            }
                        >
                            <option value="">Semua Tahun</option>
                            {years.map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>

                        {/* Dropdown Bulan (Hanya aktif jika tahun dipilih) */}
                        <select
                            className="text-sm border-gray-300 rounded-lg focus:border-primary focus:ring-primary disabled:bg-gray-100 disabled:text-gray-400"
                            value={selectedMonth}
                            onChange={(e) =>
                                handleFilterChange("month", e.target.value)
                            }
                            disabled={!selectedYear} // Disable jika tahun belum pilih
                        >
                            <option value="">Semua Bulan</option>
                            {months.map((m) => (
                                <option key={m.val} value={m.val}>
                                    {m.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* --- BAGIAN 1: KPI CARDS --- */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Card Target */}
                    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                                Total Target
                            </h3>
                            <HiOutlineBanknotes className="w-6 h-6 text-gray-400" />
                        </div>
                        <p className="text-2xl font-black text-gray-800">
                            {formatRupiah(overview.total_target)}
                        </p>
                    </div>

                    {/* Card Realisasi */}
                    <div className="p-6 bg-white border-l-4 border-r border-gray-200 border-blue-500 shadow-sm border-y rounded-xl">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                                Realisasi (Verified)
                            </h3>
                            <HiArrowTrendingUp className="w-6 h-6 text-blue-500" />
                        </div>
                        <p className="text-2xl font-black text-blue-600">
                            {formatRupiah(overview.total_realisasi)}
                        </p>
                    </div>

                    {/* Card Gap */}
                    <div
                        className={`p-6 bg-white border-l-4 border-y border-r border-gray-200 shadow-sm rounded-xl ${
                            overview.gap > 0
                                ? "border-l-red-500"
                                : "border-l-emerald-500"
                        }`}
                    >
                        <div className="flex justify-between mb-4">
                            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                                {overview.gap > 0 ? "Defisit" : "Surplus"}
                            </h3>
                            <HiArrowTrendingDown className="w-6 h-6 text-gray-400" />
                        </div>
                        <p
                            className={`text-2xl font-black ${
                                overview.gap > 0
                                    ? "text-red-500"
                                    : "text-emerald-500"
                            }`}
                        >
                            {overview.gap > 0 ? "-" : "+"}
                            {formatRupiah(Math.abs(overview.gap))}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* --- BAGIAN 2: CHART PERSENTASE --- */}
                    <div className="flex flex-col justify-center p-6 bg-white border border-gray-200 shadow-sm rounded-xl lg:col-span-1">
                        <h3 className="mb-4 text-lg font-bold text-center text-gray-800">
                            Persentase Capaian
                        </h3>
                        <RadialChart
                            title="Capaian"
                            data={{
                                Tercapai: overview.persentase,
                                Sisa: Math.max(0, 100 - overview.persentase),
                            }}
                            chartId="realisasi-radial"
                        />
                        <div className="mt-4 text-center">
                            <span
                                className={`px-4 py-1 text-sm font-bold rounded-full ${
                                    overview.persentase >= 100
                                        ? "bg-green-100 text-green-800"
                                        : "bg-blue-100 text-blue-800"
                                }`}
                            >
                                {overview.status} ({overview.persentase}%)
                            </span>
                        </div>
                    </div>

                    {/* --- BAGIAN 3: TABEL KONTRIBUSI KATEGORI --- */}
                    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <HiOutlineChartPie className="w-5 h-5 text-gray-500" />
                            <h3 className="text-lg font-bold text-gray-800">
                                Kontribusi per Kategori
                            </h3>
                        </div>
                        <div className="space-y-4">
                            {breakdownKategori.map((item, idx) => {
                                const percent =
                                    overview.total_realisasi > 0
                                        ? (item.value /
                                              overview.total_realisasi) *
                                          100
                                        : 0;
                                return (
                                    <div key={idx}>
                                        <div className="flex justify-between mb-1 text-sm">
                                            <span className="font-semibold text-gray-700">
                                                {item.label}
                                            </span>
                                            <span className="font-mono font-bold text-gray-900">
                                                {formatRupiah(item.value)}
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-100 rounded-full">
                                            <div
                                                className="h-2 bg-blue-500 rounded-full"
                                                style={{ width: `${percent}%` }}
                                            ></div>
                                        </div>
                                        <p className="mt-1 text-xs text-right text-gray-400">
                                            {percent.toFixed(1)}%
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* --- BAGIAN 4: TABEL DETAIL PRODUK (DATA BARU) --- */}
                <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <FaListUl className="w-5 h-5 text-gray-500" />
                            <h3 className="text-lg font-bold text-gray-800">
                                Detail Performa per Produk
                            </h3>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded">
                            {breakdownProduk.length} Produk Terdaftar
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 font-semibold">Nama Produk</th>
                                    <th className="px-6 py-3 font-semibold">Kategori</th>
                                    <th className="px-6 py-3 font-semibold text-right">Nominal Realisasi</th>
                                    <th className="px-6 py-3 font-semibold text-right">Kontribusi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {breakdownProduk.length > 0 ? (
                                    breakdownProduk.map((item, index) => {
                                        const percent =
                                            overview.total_realisasi > 0
                                                ? (item.realisasi /
                                                      overview.total_realisasi) *
                                                  100
                                                : 0;
                                        return (
                                            <tr
                                                key={index}
                                                className="transition-colors hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 font-bold text-gray-800">
                                                    {item.nama_produk}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded">
                                                        {item.kategori}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-mono font-medium text-right text-blue-700">
                                                    {formatRupiah(item.realisasi)}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-emerald-500"
                                                                style={{
                                                                    width: `${percent}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <span className="w-10 text-xs font-medium text-gray-500">
                                                            {percent.toFixed(1)}%
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-8 italic text-center text-gray-400"
                                        >
                                            Tidak ada data realisasi verified pada periode ini.
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
