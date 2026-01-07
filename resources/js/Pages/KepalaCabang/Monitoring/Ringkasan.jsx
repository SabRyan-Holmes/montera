import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import {
    HiCurrencyDollar,
    HiUserGroup,
    HiTrendingUp,
    HiOfficeBuilding,
} from "react-icons/hi"; // Pastikan install react-icons

export default function Ringkasan({
    auth,
    title,
    chartData,
    trendData,
    ranking,
    divisiData,
    quickStats,
}) {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

    // Helper Format Rupiah
    const formatRupiah = (val) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(val);

    return (
        <Authenticated user={auth.user} title={title}>
            <main className="min-h-screen p-6 mx-auto space-y-6 bg-gray-50/50">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Ringkasan Kinerja
                        </h1>
                        <p className="text-sm text-gray-500 normal">
                            Operasional & Finansial Cabang Tahun{" "}
                            {new Date().getFullYear()}
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        {/* Bisa tambah filter tahun/bulan di sini nanti */}
                        <span className="px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                            Update Real-time
                        </span>
                    </div>
                </div>

                {/* --- BAGIAN 1: QUICK STATS (KPI CARDS) --- */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Card 1: Total Realisasi */}
                    <div className="flex items-center justify-between p-6 bg-white border-l-4 border-blue-500 shadow-sm rounded-xl">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase">
                                Total Realisasi (YTD)
                            </p>
                            <p className="mt-1 text-2xl font-bold text-gray-800">
                                {formatRupiah(
                                    quickStats.total_realisasi_tahun_ini
                                )}
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-blue-50">
                            <HiCurrencyDollar className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>

                    {/* Card 2: Nasabah Baru */}
                    <div className="flex items-center justify-between p-6 bg-white border-l-4 border-green-500 shadow-sm rounded-xl">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase">
                                Nasabah Baru
                            </p>
                            <p className="mt-1 text-2xl font-bold text-gray-800">
                                {quickStats.total_nasabah_baru}{" "}
                                <span className="text-sm font-normal text-gray-400">
                                    Orang
                                </span>
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-green-50">
                            <HiUserGroup className="w-8 h-8 text-green-500" />
                        </div>
                    </div>

                    {/* Card 3: Rata-rata Transaksi */}
                    <div className="flex items-center justify-between p-6 bg-white border-l-4 border-orange-500 shadow-sm rounded-xl">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase">
                                Avg. per Transaksi
                            </p>
                            <p className="mt-1 text-2xl font-bold text-gray-800">
                                {formatRupiah(quickStats.avg_realisasi_per_trx)}
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-orange-50">
                            <HiTrendingUp className="w-8 h-8 text-orange-500" />
                        </div>
                    </div>
                </div>

                {/* --- BAGIAN 2: GRAFIK UTAMA --- */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Grafik Kiri: Tren Bulanan (Lebih Lebar) */}
                    <div className="p-6 bg-white border border-gray-100 shadow-sm lg:col-span-2 rounded-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                                <HiTrendingUp className="text-blue-500" />
                                Tren Pertumbuhan Realisasi
                            </h2>
                        </div>
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={trendData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke="#f3f4f6"
                                />
                                <XAxis
                                    dataKey="bulan"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#6b7280" }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#6b7280" }}
                                    tickFormatter={(val) =>
                                        `${val / 1000000}Jt`
                                    }
                                />
                                <Tooltip
                                    cursor={{ fill: "#f9fafb" }}
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "none",
                                        boxShadow:
                                            "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                    }}
                                    formatter={(value) => formatRupiah(value)}
                                />
                                <Bar
                                    dataKey="total"
                                    fill="#3b82f6"
                                    radius={[4, 4, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Grafik Kanan: Pie Chart Kategori */}
                    <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                        <h2 className="mb-6 text-lg font-bold text-center text-gray-800">
                            Komposisi Produk
                        </h2>
                        <ResponsiveContainer width="100%" height={320}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="total"
                                    nameKey="kategori"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => formatRupiah(value)}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* --- BAGIAN 3: ANALISIS DETAIL (Ranking & Divisi) --- */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Tabel Ranking Pegawai */}
                    <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                        <h2 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-800">
                            🏆 Top 5 Performa Pegawai
                        </h2>
                        <div className="space-y-3">
                            {ranking.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 transition-colors border rounded-lg hover:bg-gray-50 border-gray-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                                                index === 0
                                                    ? "bg-yellow-400"
                                                    : index === 1
                                                    ? "bg-gray-400"
                                                    : index === 2
                                                    ? "bg-orange-400"
                                                    : "bg-blue-100 text-blue-600"
                                            }`}
                                        >
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {item.pegawai?.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {item.pegawai?.divisi
                                                    ?.nama_divisi ||
                                                    "Tanpa Divisi"}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-blue-600">
                                        {formatRupiah(item.total_capaian)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* [BARU] Tabel Performa Divisi */}
                    <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                        <h2 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-800">
                            <HiOfficeBuilding className="text-gray-500" />
                            Kontribusi per Divisi
                        </h2>
                        <div className="space-y-4">
                            {divisiData.map((divisi, index) => {
                                // Hitung persentase kontribusi (relatif thd total realisasi di quickStats)
                                const percentage =
                                    quickStats.total_realisasi_tahun_ini > 0
                                        ? (divisi.total_realisasi /
                                              quickStats.total_realisasi_tahun_ini) *
                                          100
                                        : 0;

                                return (
                                    <div key={index}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">
                                                {divisi.nama_divisi}
                                            </span>
                                            <span className="text-sm font-bold text-gray-900">
                                                {formatRupiah(
                                                    divisi.total_realisasi
                                                )}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-purple-600 h-2.5 rounded-full"
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="mt-1 text-right">
                                            <span className="text-xs text-gray-400">
                                                {percentage.toFixed(1)}%
                                                Kontribusi
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </Authenticated>
    );
}
