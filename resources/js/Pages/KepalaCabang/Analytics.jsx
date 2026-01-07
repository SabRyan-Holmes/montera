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
} from "recharts";

export default function Analytics({
    auth,
    title,
    chartData,
    trendData,
    ranking,
}) {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <Authenticated user={auth.user} title={title}>
            <main className="p-6 mx-auto space-y-6">
                <h1 className="text-2xl font-bold">
                    Dashboard Monitoring Strategis
                </h1>

                {/* Baris Atas: Tren Bulanan (Gunakan trendData di sini) */}
                <div className="p-4 bg-white border shadow-sm rounded-xl">
                    <h2 className="mb-4 font-semibold">
                        Tren Realisasi Bulanan ({new Date().getFullYear()})
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={trendData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                            />
                            <XAxis dataKey="bulan" />
                            <YAxis />
                            <Tooltip
                                formatter={(value) =>
                                    `Rp ${new Intl.NumberFormat("id-ID").format(
                                        value
                                    )}`
                                }
                            />
                            <Bar
                                dataKey="total"
                                fill="#0284c7"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Visualisasi Pie: Komposisi Produk */}
                    <div className="p-4 bg-white border shadow-sm rounded-xl">
                        <h2 className="mb-4 font-semibold">
                            Komposisi Realisasi per Kategori
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="total"
                                    nameKey="kategori"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) =>
                                        `Rp ${new Intl.NumberFormat(
                                            "id-ID"
                                        ).format(value)}`
                                    }
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Ranking Pegawai */}
                    <div className="p-4 bg-white border shadow-sm rounded-xl">
                        <h2 className="mb-4 font-semibold">
                            🏆 Top 5 Performa Pegawai
                        </h2>
                        <div className="space-y-4">
                            {ranking.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
                                >
                                    <span className="font-medium">
                                        {index + 1}.{" "}
                                        {item.pegawai?.name ||
                                            "User Tidak Ditemukan"}
                                    </span>
                                    <span className="font-bold text-sky-600">
                                        Rp{" "}
                                        {new Intl.NumberFormat("id-ID").format(
                                            item.total_capaian
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </Authenticated>
    );
}
