import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SelectInput } from "@/Components"; // Pastikan path import SelectInput benar
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
    Cell,
} from "recharts";
import {
    HiOutlineOfficeBuilding,
    HiOutlineUserGroup,
    HiOutlineCurrencyDollar,
    HiOutlineFilter,
    HiOutlineStar,
} from "react-icons/hi";

export default function DivisiPerform({
    title,
    auth,
    divisiStats,
    chartData,
    filters,
    options,
    periodeLabel,
}) {
    // State lokal filter
    const [selectedYear, setSelectedYear] = useState(filters.year || "");
    const [selectedMonth, setSelectedMonth] = useState(filters.month || "");

    const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

    // Helper Rupiah
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
            month: key === "month" ? value : selectedMonth,
        };

        if (key === "year") setSelectedYear(value);
        if (key === "month") setSelectedMonth(value);

        router.get(route("kacab.divisi"), newFilters, {
            preserveState: true,
            preserveScroll: true,
            only: ["divisiStats", "chartData", "filters", "periodeLabel"],
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            <main className="w-full px-6 py-6 mx-auto space-y-8">
                {/* --- HEADER & FILTER --- */}
                <div className="flex flex-col justify-between gap-4 p-5 bg-white border border-gray-200 shadow-sm md:flex-row md:items-center rounded-xl">
                    <div>
                        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                            <HiOutlineOfficeBuilding className="text-blue-600" />
                            {title}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Periode: <span className="font-semibold text-blue-600">{periodeLabel}</span>
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-3 md:flex-row md:items-center">
                        <div className="flex items-center gap-2 mr-2 text-sm text-gray-500">
                            <HiOutlineFilter className="w-4 h-4" />
                            Filter:
                        </div>

                        {/* Custom SelectInput Tahun */}
                        <div className="w-32">
                            <SelectInput
                                value={selectedYear}
                                options={options.years}
                                placeholder="Semua Tahun"
                                className="w-full h-10 text-sm"
                                onChange={(e) => handleFilterChange("year", e.target.value)}
                            />
                        </div>

                        {/* Custom SelectInput Bulan */}
                        <div className="w-40">
                            <SelectInput
                                value={selectedMonth}
                                options={options.months}
                                placeholder="Semua Bulan"
                                className="w-full h-10 text-sm"
                                disabled={!selectedYear} // Disable jika tahun belum pilih
                                onChange={(e) => handleFilterChange("month", e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* --- SECTION 1: GRAFIK KOMPARASI --- */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Grafik Utama */}
                    <div className="p-6 bg-white border border-gray-200 shadow-sm lg:col-span-2 rounded-xl">
                        <h3 className="mb-6 text-lg font-bold text-gray-700">Komparasi Realisasi Divisi</h3>
                        <div className="w-full h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        width={100}
                                        tick={{ fontSize: 12, fill: '#4b5563', fontWeight: 600 }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        formatter={(val) => formatRupiah(val)}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Summary Singkat */}
                    <div className="flex flex-col gap-4 lg:col-span-1">
                        <div className="p-6 text-white shadow-lg bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl">
                            <h4 className="text-sm font-medium tracking-wider text-blue-100 uppercase">Top Divisi</h4>
                            <p className="mt-1 text-2xl font-bold">
                                {divisiStats[0]?.nama_divisi || "-"}
                            </p>
                            <p className="mt-4 text-3xl font-black">
                                {formatRupiah(divisiStats[0]?.total_realisasi || 0)}
                            </p>
                            <div className="inline-block px-3 py-1 mt-4 text-sm rounded-full bg-white/20">
                                {divisiStats[0] ? ((divisiStats[0].total_realisasi / (divisiStats.reduce((a, b) => a + b.total_realisasi, 0) || 1)) * 100).toFixed(1) : 0}% dari Total
                            </div>
                        </div>

                        <div className="flex-1 p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Total Kontribusi</h4>
                            <div className="mt-4 space-y-4">
                                {divisiStats.slice(0, 4).map((d, i) => (
                                    <div key={d.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                                            <span className="text-sm font-medium text-gray-600">{d.kode_divisi}</span>
                                        </div>
                                        <span className="text-sm font-bold text-gray-800">{formatRupiah(d.total_realisasi)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- SECTION 2: DETAIL KARTU DIVISI --- */}
                <div>
                    <h3 className="mb-4 text-lg font-bold text-gray-700">Rincian Performa</h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {divisiStats.map((divisi, idx) => {
                             // Hitung persentase terhadap juara 1 (untuk progress bar)
                             const maxVal = divisiStats[0]?.total_realisasi || 1;
                             const percent = (divisi.total_realisasi / maxVal) * 100;

                            return (
                                <div key={divisi.id} className="overflow-hidden transition-shadow bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md group">
                                    {/* Header Kartu */}
                                    <div className="flex items-start justify-between p-5 border-b border-gray-100 bg-gray-50/50">
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-800">{divisi.nama_divisi}</h4>
                                            <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                                                {divisi.kode_divisi}
                                            </span>
                                        </div>
                                        <div className={`p-2 rounded-lg bg-white shadow-sm border border-gray-100 text-${COLORS[idx % COLORS.length] || 'gray-500'}`}>
                                            <HiOutlineOfficeBuilding className="w-6 h-6" style={{ color: COLORS[idx % COLORS.length] }} />
                                        </div>
                                    </div>

                                    {/* Body Kartu */}
                                    <div className="p-5 space-y-5">
                                        {/* Total Realisasi */}
                                        <div>
                                            <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Total Realisasi</p>
                                            <p className="mt-1 text-2xl font-black text-gray-800">
                                                {formatRupiah(divisi.total_realisasi)}
                                            </p>

                                            {/* Progress Bar relative to Top 1 */}
                                            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                                                <div
                                                    className="h-1.5 rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${percent}%`,
                                                        backgroundColor: COLORS[idx % COLORS.length]
                                                    }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Grid Info Kecil */}
                                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 border-dashed">
                                            <div>
                                                <div className="flex items-center gap-1 mb-1 text-xs text-gray-500">
                                                    <HiOutlineUserGroup /> Pegawai
                                                </div>
                                                <p className="font-bold text-gray-700">{divisi.jumlah_pegawai} Org</p>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1 mb-1 text-xs text-gray-500">
                                                    <HiOutlineCurrencyDollar /> Transaksi
                                                </div>
                                                <p className="font-bold text-gray-700">{divisi.total_transaksi} Trx</p>
                                            </div>
                                        </div>

                                        {/* Top Performer Badge */}
                                        {divisi.top_performer ? (
                                            <div className="flex items-center gap-3 p-3 border border-yellow-100 rounded-lg bg-yellow-50">
                                                <div className="p-2 bg-yellow-100 rounded-full">
                                                    <HiOutlineStar className="w-4 h-4 text-yellow-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-semibold text-yellow-700 uppercase">Top Contributor</p>
                                                    <p className="text-sm font-bold text-gray-800 truncate">{divisi.top_performer.name}</p>
                                                    <p className="text-xs text-gray-500">{formatRupiah(divisi.top_performer.nominal)}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-3 text-xs italic text-center text-gray-400 border border-gray-100 rounded-lg bg-gray-50">
                                                Belum ada kontribusi
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
