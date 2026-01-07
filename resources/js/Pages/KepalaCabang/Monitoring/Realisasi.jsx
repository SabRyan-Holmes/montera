import { RadialChart } from "@/Components";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    HiOutlineBanknotes,
    HiOutlineChartPie,
    HiArrowTrendingUp,
    HiArrowTrendingDown,
} from "react-icons/hi2";

export default function Realisasi({ auth, title, overview, breakdown }) {
    const formatRupiah = (val) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(val);

    return (
        <AuthenticatedLayout
            user={auth.user}
            title={title}
            header={"Monitoring Realisasi Cabang"}
        >
            <main className="w-full px-6 py-6 mx-auto">
                {/* --- HEADER SECTION --- */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-secondary">
                        Perbandingan Target vs Transaksi Sah Periode Ini
                    </h2>
                </div>

                {/* --- BAGIAN 1: BIG NUMBERS (KPI UTAMA) --- */}
                <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                    {/* Card 1: Target (Ekspektasi) */}
                    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                                Total Target
                            </h3>
                            <div className="p-2 text-gray-600 bg-gray-100 rounded-lg">
                                <HiOutlineBanknotes className="w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-2xl font-black text-secondary">
                            {formatRupiah(overview.total_target)}
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                            Angka yang harus dicapai bulan ini
                        </p>
                    </div>

                    {/* Card 2: Realisasi (Fakta) */}
                    <div className="p-6 bg-white border border-l-4 border-gray-200 shadow-sm rounded-xl border-l-primary">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                                Total Realisasi
                            </h3>
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <HiArrowTrendingUp className="w-6 h-6" />
                            </div>
                        </div>
                        <p className="text-2xl font-black text-primary">
                            {formatRupiah(overview.total_realisasi)}
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                            Total nominal transaksi verified
                        </p>
                    </div>

                    {/* Card 3: GAP (Selisih) - Paling Penting buat Kacab */}
                    <div
                        className={`p-6 bg-white border border-gray-200 rounded-xl shadow-sm border-l-4 ${
                            overview.gap > 0
                                ? "border-l-error"
                                : "border-l-success"
                        }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                                {overview.gap > 0
                                    ? "Kekurangan (Defisit)"
                                    : "Surplus"}
                            </h3>
                            <div
                                className={`p-2 rounded-lg ${
                                    overview.gap > 0
                                        ? "bg-red-100 text-error"
                                        : "bg-green-100 text-success"
                                }`}
                            >
                                <HiArrowTrendingDown className="w-6 h-6" />
                            </div>
                        </div>
                        <p
                            className={`text-2xl font-black ${
                                overview.gap > 0 ? "text-error" : "text-success"
                            }`}
                        >
                            {overview.gap > 0 ? "-" : "+"}
                            {formatRupiah(Math.abs(overview.gap))}
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                            {overview.gap > 0
                                ? "Harus dikejar segera!"
                                : "Target terlampaui, aman."}
                        </p>
                    </div>
                </div>

                {/* --- BAGIAN 2: VISUALISASI & BREAKDOWN --- */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Radial Chart: Persentase Capaian */}
                    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl lg:col-span-1">
                        <RadialChart
                            title="Persentase Capaian"
                            // Format data sesuai komponen RadialChart kamu yg sebelumnya
                            data={{
                                Tercapai: overview.persentase,
                                "Sisa Target": Math.max(
                                    0,
                                    100 - overview.persentase
                                ),
                            }}
                            chartId="chart-realisasi-kacab"
                        />
                        <div className="mt-4 text-center">
                            <span
                                className={`px-3 py-1 text-xs font-bold rounded-full ${
                                    overview.persentase >= 100
                                        ? "bg-green-100 text-green-700"
                                        : overview.persentase >= 80
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                                Status: {overview.status}
                            </span>
                        </div>
                    </div>

                    {/* Breakdown per Kategori Produk */}
                    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="flex items-center gap-2 text-lg font-bold text-secondary">
                                <HiOutlineChartPie className="w-5 h-5 text-gray-400" />
                                Kontribusi per Kategori Produk
                            </h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3">
                                            Kategori Produk
                                        </th>
                                        <th className="px-6 py-3 text-right">
                                            Nominal Realisasi
                                        </th>
                                        <th className="px-6 py-3 text-right">
                                            Kontribusi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {breakdown.map((item, index) => {
                                        // Hitung kontribusi % terhadap total realisasi
                                        const contribution =
                                            overview.total_realisasi > 0
                                                ? (item.realisasi /
                                                      overview.total_realisasi) *
                                                  100
                                                : 0;

                                        return (
                                            <tr
                                                key={index}
                                                className="bg-white border-b hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 font-bold text-gray-900">
                                                    {item.kategori}
                                                </td>
                                                <td className="px-6 py-4 font-medium text-right">
                                                    {formatRupiah(
                                                        item.realisasi
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <span className="text-xs">
                                                            {contribution.toFixed(
                                                                1
                                                            )}
                                                            %
                                                        </span>
                                                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                                            <div
                                                                className="bg-primary h-1.5 rounded-full"
                                                                style={{
                                                                    width: `${contribution}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
