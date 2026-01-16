import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SelectInput } from "@/Components";
import { router } from "@inertiajs/react";
import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Legend,
} from "recharts";
import {
    HiOutlineFilter,
    HiOutlineSearch,
    HiOutlineUserCircle,
} from "react-icons/hi";
import { FaMedal } from "react-icons/fa6";
import { HiOutlineTrophy } from "react-icons/hi2";

export default function PegawaiRank({
    title,
    auth,
    pegawaiList,
    top3,
    chartTop10,
    filters,
    options,
    periodeLabel,
}) {
    // State Filter & Search
    const [selectedYear, setSelectedYear] = useState(filters.year || "");
    const [selectedMonth, setSelectedMonth] = useState(filters.month || "");
    const [selectedDivisi, setSelectedDivisi] = useState(
        filters.divisi_id || ""
    );
    const [search, setSearch] = useState("");

    const formatRupiah = (val) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(val);

    // Handler Filter (Reload Page)
    const handleFilterChange = (key, value) => {
        const newFilters = {
            year: key === "year" ? value : selectedYear,
            month: key === "month" ? value : selectedMonth,
            divisi_id: key === "divisi" ? value : selectedDivisi,
        };

        // Update local state
        if (key === "year") setSelectedYear(value);
        if (key === "month") setSelectedMonth(value);
        if (key === "divisi") setSelectedDivisi(value);

        router.get(route("kacab.pegawai_rank"), newFilters, {
            preserveState: true,
            preserveScroll: true,
            only: [
                "pegawaiList",
                "top3",
                "chartTop10",
                "filters",
                "periodeLabel",
            ],
        });
    };

    // Filter Search Lokal untuk Tabel
    const filteredList = pegawaiList.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.nip.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            <main className="w-full px-6 py-6 mx-auto space-y-8">
                {/* --- HEADER & FILTER --- */}
                <div className="flex flex-col justify-between gap-4 p-5 bg-white border border-gray-200 shadow-sm md:flex-row md:items-center rounded-xl">
                    <div>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                            <HiOutlineTrophy className="text-yellow-600" />
                            {title}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Periode:{" "}
                            <span className="font-semibold text-blue-600">
                                {periodeLabel}
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 mr-2 text-sm text-gray-500">
                            <HiOutlineFilter className="w-4 h-4" /> Filter:
                        </div>
                        <div className="w-32">
                            <SelectInput
                                value={selectedYear}
                                options={options.years}
                                disablePlaceholder={false}
                                placeholder="Semua Thn"
                                className="w-full text-sm h-9"
                                onChange={(e) =>
                                    handleFilterChange("year", e.target.value)
                                }
                            />
                        </div>
                        <div className="w-32">
                            <SelectInput
                                value={selectedMonth}
                                options={options.months}
                                placeholder="Semua Bln"
                                disablePlaceholder={false}
                                className="w-full text-sm h-9"
                                disabled={!selectedYear}
                                onChange={(e) =>
                                    handleFilterChange("month", e.target.value)
                                }
                            />
                        </div>
                        <div className="w-40">
                            <SelectInput
                                value={selectedDivisi}
                                options={options.divisi}
                                disablePlaceholder = {false}
                                placeholder="Semua Divisi"
                                className="w-full text-sm h-9"
                                onChange={(e) =>
                                    handleFilterChange("divisi", e.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* --- SECTION 1: THE PODIUM (TOP 3) --- */}
                {top3.length > 0 && (
                    <div className="grid items-end justify-center grid-cols-1 gap-6 px-4 mb-10 md:grid-cols-3">
                        {/* JUARA 2 (Silver) - Posisi Kiri */}
                        {top3[1] && (
                            <div className="flex flex-col items-center order-2 md:order-1">
                                <div className="relative flex flex-col items-center w-full p-6 mt-8 bg-white border border-gray-200 shadow-sm rounded-t-xl">
                                    <div className="absolute -top-6">
                                        <div className="flex items-center justify-center w-12 h-12 bg-gray-300 border-4 border-white rounded-full shadow-md">
                                            <span className="text-lg font-bold text-gray-700">
                                                2
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-6 text-center">
                                        <h3 className="w-40 font-bold text-gray-800 truncate">
                                            {top3[1].name}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {top3[1].divisi}
                                        </p>
                                        <p className="mt-2 text-lg font-bold text-gray-600">
                                            {formatRupiah(top3[1].realisasi)}
                                        </p>
                                        <div className="px-3 py-1 mt-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
                                            {top3[1].achievement}% Target
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-4 bg-gray-300 shadow-md rounded-b-xl"></div>
                            </div>
                        )}

                        {/* JUARA 1 (Gold) - Posisi Tengah (Paling Tinggi) */}
                        {top3[0] && (
                            <div className="z-10 flex flex-col items-center order-1 md:order-2">
                                <FaMedal className="w-12 h-12 mb-2 text-yellow-400 drop-shadow-md animate-bounce" />
                                <div className="relative flex flex-col items-center w-full p-8 border border-yellow-200 shadow-lg bg-gradient-to-b from-yellow-50 to-white rounded-t-xl">
                                    <div className="absolute -top-8">
                                        <div className="flex items-center justify-center w-16 h-16 bg-yellow-400 border-4 border-white rounded-full shadow-lg">
                                            <span className="text-2xl font-black text-yellow-900">
                                                1
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-8 text-center">
                                        <h3 className="w-48 text-xl font-bold text-gray-900 truncate">
                                            {top3[0].name}
                                        </h3>
                                        <p className="text-sm font-medium text-yellow-700">
                                            {top3[0].divisi}
                                        </p>
                                        <p className="mt-3 text-2xl font-black text-yellow-600">
                                            {formatRupiah(top3[0].realisasi)}
                                        </p>
                                        <div className="px-4 py-1 mt-3 text-sm font-bold text-yellow-800 bg-yellow-100 border border-yellow-200 rounded-full">
                                            {top3[0].achievement}% Achieved
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-6 bg-yellow-400 shadow-lg rounded-b-xl"></div>
                            </div>
                        )}

                        {/* JUARA 3 (Bronze) - Posisi Kanan */}
                        {top3[2] && (
                            <div className="flex flex-col items-center order-3">
                                <div className="relative flex flex-col items-center w-full p-6 mt-16 bg-white border border-gray-200 shadow-sm rounded-t-xl">
                                    <div className="absolute -top-6">
                                        <div className="flex items-center justify-center w-12 h-12 bg-orange-300 border-4 border-white rounded-full shadow-md">
                                            <span className="text-lg font-bold text-orange-900">
                                                3
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-6 text-center">
                                        <h3 className="w-40 font-bold text-gray-800 truncate">
                                            {top3[2].name}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {top3[2].divisi}
                                        </p>
                                        <p className="mt-2 text-lg font-bold text-orange-700">
                                            {formatRupiah(top3[2].realisasi)}
                                        </p>
                                        <div className="px-3 py-1 mt-2 text-xs font-semibold text-orange-800 rounded-full bg-orange-50">
                                            {top3[2].achievement}% Target
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-4 bg-orange-300 shadow-md rounded-b-xl"></div>
                            </div>
                        )}
                    </div>
                )}

                {/* --- SECTION 2: CHART TOP 10 --- */}
                <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
                    <h3 className="mb-6 text-lg font-bold text-gray-800">
                        Top 10 Performance Chart
                    </h3>
                    <div className="w-full h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartTop10}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis hide />
                                <Tooltip
                                    formatter={(value) => formatRupiah(value)}
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "none",
                                        boxShadow:
                                            "0 4px 6px -1px rgba(0,0,0,0.1)",
                                    }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="realisasi"
                                    name="Realisasi"
                                    fill="#3b82f6"
                                    radius={[4, 4, 0, 0]}
                                    barSize={40}
                                />
                                <ReferenceLine y={0} stroke="#000" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* --- SECTION 3: TABEL DATA LENGKAP --- */}
                <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
                    <div className="flex flex-col items-center justify-between gap-4 p-5 border-b border-gray-200 md:flex-row">
                        <h3 className="text-lg font-bold text-gray-800">
                            Data Kinerja Seluruh Pegawai
                        </h3>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-64">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <HiOutlineSearch className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-lg focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:ring focus:ring-blue-200 sm:text-sm"
                                placeholder="Cari Nama / NIP..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase border-b bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3">Rank</th>
                                    <th className="px-6 py-3">Pegawai</th>
                                    <th className="px-6 py-3 text-right">
                                        Target
                                    </th>
                                    <th className="px-6 py-3 text-right">
                                        Realisasi
                                    </th>
                                    <th className="px-6 py-3 text-center">
                                        Achv (%)
                                    </th>
                                    <th className="px-6 py-3 text-center">
                                        Transaksi
                                    </th>
                                    <th className="px-6 py-3 text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredList.length > 0 ? (
                                    filteredList.map((pegawai, index) => (
                                        <tr
                                            key={pegawai.id}
                                            className="transition-colors hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 font-bold text-gray-600">
                                                #{index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-8 h-8 text-blue-600 rounded-full bg-blue-50">
                                                        <HiOutlineUserCircle className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-800">
                                                            {pegawai.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {pegawai.nip} •{" "}
                                                            {
                                                                pegawai.kode_divisi
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-right text-gray-500">
                                                {formatRupiah(pegawai.target)}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-right text-blue-600">
                                                {formatRupiah(
                                                    pegawai.realisasi
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`font-bold ${
                                                        pegawai.achievement >=
                                                        100
                                                            ? "text-green-600"
                                                            : pegawai.achievement >=
                                                              80
                                                            ? "text-blue-600"
                                                            : "text-red-500"
                                                    }`}
                                                >
                                                    {pegawai.achievement}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-center">
                                                {pegawai.transaksi}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full border ${
                                                        pegawai.status ===
                                                            "Star" ||
                                                        pegawai.status.includes(
                                                            "Surplus"
                                                        )
                                                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                                            : pegawai.status ===
                                                              "On Track"
                                                            ? "bg-green-50 text-green-700 border-green-200"
                                                            : "bg-red-50 text-red-700 border-red-200"
                                                    }`}
                                                >
                                                    {pegawai.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-6 py-8 italic text-center text-gray-400"
                                        >
                                            Data pegawai tidak ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 text-xs text-center text-gray-500 border-t border-gray-200 bg-gray-50">
                        Menampilkan {filteredList.length} dari{" "}
                        {pegawaiList.length} pegawai
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
