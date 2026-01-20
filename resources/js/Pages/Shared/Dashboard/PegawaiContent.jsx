import React from "react";
import Chart from "react-apexcharts"; // Import ApexCharts
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaClock } from "react-icons/fa6";
import {
    HiOutlineDocumentPlus,
    HiOutlineCheckBadge,
    HiOutlineExclamationTriangle,
    HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { TbTargetArrow } from "react-icons/tb";

export default function PegawaiContent({ dataByRole }) {
    const {
        totalTarget,
        akuisisiRejected,
        akuisisiPending, // Pastikan controller mengirim ini
        totalAkuisisi,
        transaksiCount,
        totalNominalRealisasi,
        totalNominalTarget,
        persenNominal,
        grafikTren,
        breakdownProduk,
    } = dataByRole;

    const formatRupiah = (val) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(val || 0);

    // --- CONFIG GRAFIK TREN (Area Chart) ---
    const trendOptions = {
        chart: { type: "area", toolbar: { show: false } },
        colors: ["#5c4087"], // Warna Ungu Primary
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "Mei",
                "Jun",
                "Jul",
                "Agu",
                "Sep",
                "Okt",
                "Nov",
                "Des",
            ],
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        tooltip: { y: { formatter: (val) => formatRupiah(val) } },
    };
    const trendSeries = [{ name: "Realisasi", data: grafikTren }];

    // --- CONFIG GRAFIK KATEGORI (Donut Chart) ---
    const kategoriLabels = breakdownProduk.map((d) => d.label);
    const kategoriSeries = breakdownProduk.map((d) => d.value);
    const kategoriOptions = {
        labels: kategoriLabels,
        colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"], // Biru, Hijau, Kuning, Merah
        legend: { position: "bottom" },
        plotOptions: { pie: { donut: { size: "65%" } } },
    };

    return (
        <main className="w-full py-6 mx-auto px-7">
            {/* ROW 1: KARTU UTAMA */}
            <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Realisasi Nominal */}
                <div className="flex items-center p-6 transition-shadow bg-white border border-l-8 shadow-sm border-primary rounded-xl border-l-primary hover:shadow-md">
                    <div className="p-3 rounded-full bg-primary/10">
                        <HiOutlineCurrencyDollar className="w-10 h-10 text-primary" />
                    </div>
                    <div className="ml-5">
                        <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                            Realisasi Nominal
                        </h3>
                        <p className="text-xl font-black text-secondary">
                            {formatRupiah(totalNominalRealisasi)}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            Target: {formatRupiah(totalNominalTarget)}
                        </p>
                    </div>
                </div>

                {/* Transaksi Sah */}
                <div className="flex items-center p-6 transition-shadow bg-white border border-l-8 shadow-sm border-success rounded-xl border-l-success hover:shadow-md">
                    <div className="p-3 rounded-full bg-success/10">
                        <HiOutlineCheckBadge className="w-10 h-10 text-success" />
                    </div>
                    <div className="ml-5">
                        <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                            Transaksi Sah
                        </h3>
                        <p className="text-2xl font-black text-secondary">
                            {transaksiCount}{" "}
                            <span className="text-sm font-normal text-gray-400">
                                Transaksi
                            </span>
                        </p>
                    </div>
                </div>

                {/* Persentase Capaian (Ganti Target Aktif jadi ini biar lebih informatif) */}
                <div className="flex items-center p-6 transition-shadow bg-white border border-l-8 shadow-sm border-secondary rounded-xl border-l-secondary hover:shadow-md">
                    <div className="p-3 rounded-full bg-secondary/10">
                        <TbTargetArrow className="w-10 h-10 text-secondary" />
                    </div>
                    <div className="ml-5">
                        <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                            Capaian Target
                        </h3>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-black text-secondary">
                                {persenNominal > 250
                                    ? "250+%"
                                    : `${persenNominal}%`}
                            </p>
                            <span
                                className={`text-xs font-bold px-2 py-0.5 rounded ${
                                    persenNominal >= 100
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                                {persenNominal >= 100
                                    ? "Achieved"
                                    : "On Progress"}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ROW 2: STATUS OPERASIONAL (Pending, Rejected, Total) */}
            <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                <div className="flex items-center p-4 bg-white border rounded-lg shadow-sm">
                    <HiOutlineDocumentPlus className="mr-3 text-2xl text-gray-500" />
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">
                            Total Pengajuan
                        </p>
                        <p className="text-xl font-bold text-gray-700">
                            {totalAkuisisi}
                        </p>
                    </div>
                </div>

                <div className="flex items-center p-4 bg-white border rounded-lg shadow-sm">
                    <FaClock className="mr-3 text-2xl text-primary animate-spin-slow" />
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">
                            Menunggu Validasi
                        </p>
                        <p className="text-xl font-bold text-primary">
                            {akuisisiPending}
                        </p>
                    </div>
                </div>

                <div className="flex items-center p-4 bg-white border rounded-lg shadow-sm">
                    <HiOutlineExclamationTriangle className="mr-3 text-2xl text-error" />
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">
                            Ditolak / Revisi
                        </p>
                        <p className="text-xl font-bold text-error">
                            {akuisisiRejected}
                        </p>
                    </div>
                </div>
            </section>

            {/* ROW 3: VISUALISASI GRAFIK */}
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Grafik Tren (Lebar 2 Kolom) */}
                <div className="p-6 bg-white border shadow-sm rounded-xl lg:col-span-2">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-700">
                            Tren Kinerja Bulanan
                        </h3>
                        <p className="text-xs text-gray-400">
                            Total nominal realisasi tahun :
                            <span className="rounded-md badge-xs bg-success/20">
                                {new Date().getFullYear()}
                            </span>
                        </p>
                    </div>
                    <div className="w-full h-64">
                        <Chart
                            options={trendOptions}
                            series={trendSeries}
                            type="area"
                            height="100%"
                        />
                    </div>
                </div>

                {/* Grafik Breakdown Kategori (Lebar 1 Kolom) */}
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-700">
                            Komposisi Produk
                        </h3>
                        <p className="text-xs text-gray-400">
                            Distribusi akuisisi berhasil
                        </p>
                    </div>
                    <div className="flex items-center justify-center w-full h-64">
                        {breakdownProduk.length > 0 ? (
                            <Chart
                                options={kategoriOptions}
                                series={kategoriSeries}
                                type="donut"
                                width="100%"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <p className="text-sm">
                                    Belum ada data transaksi
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
