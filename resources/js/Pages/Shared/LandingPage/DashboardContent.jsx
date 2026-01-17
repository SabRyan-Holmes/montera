import React from "react";
import Chart from 'react-apexcharts';
export default function DashboardContent() {
    const chartOptions = {
        chart: {
            height: 450,
            type: "line",
            fontFamily: "Plus Jakarta Sans, sans-serif",
            toolbar: { show: false },
            dropShadow: {
                enabled: true,
                top: 10,
                left: 0,
                blur: 3,
                opacity: 0.1,
            },
        },
        colors: ["#001f3f", "#c5a059", "#64748b", "#0d9488", "#f59e0b"],
        stroke: {
            width: 4,
            curve: "smooth",
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.5,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 0.8,
                stops: [0, 100],
            },
        },
        markers: {
            size: 0,
            hover: { size: 7 },
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: "#94a3b8", fontWeight: 600 },
            },
        },
        yaxis: {
            title: {
                text: "Jumlah Produk",
                style: { color: "#94a3b8", fontWeight: 700 },
            },
            labels: {
                style: { colors: "#94a3b8", fontWeight: 600 },
            },
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            fontWeight: 700,
            itemMargin: { horizontal: 10, vertical: 0 },
            markers: { radius: 12 },
        },
        grid: {
            borderColor: "#f8fafc",
            row: { colors: ["transparent", "transparent"], opacity: 0.5 },
        },
        tooltip: {
            x: { show: true },
            y: {
                formatter: function (val) {
                    return val + " Produk";
                },
            },
        },
    };

    const chartSeries = [
        { name: "Andi Wijaya", data: [45, 52, 38, 65, 48, 70, 85] },
        { name: "Siti Aminah", data: [35, 41, 62, 42, 13, 18, 29] },
        { name: "Budi Santoso", data: [87, 57, 74, 99, 75, 38, 62] },
        { name: "Rina Rose", data: [23, 35, 27, 43, 22, 17, 31] },
        { name: "Eko Putra", data: [12, 17, 11, 9, 15, 11, 20] },
    ];

    return (
        <>
            <style>{`
                body {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                    background: #fafbff;
                }
                .glass {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                .text-gradient {
                    background: linear-gradient(135deg, #001f3f 0%, #004d99 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .bento-card {
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .bento-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 25px 50px -12px rgba(0, 31, 63, 0.15);
                }
                .blob {
                    position: absolute;
                    width: 500px;
                    height: 500px;
                    background: linear-gradient(135deg, rgba(197, 160, 89, 0.15) 0%, rgba(0, 31, 63, 0.1) 100%);
                    filter: blur(80px);
                    border-radius: 50%;
                    z-index: -1;
                }
            `}</style>
            {/* --- HERO SECTION --- */}

            <section className="px-8 pb-20 pt-44">
                <div className="grid items-center gap-16 mx-auto max-w-7xl lg:grid-cols-2">
                    <div>
                        <span className="px-4 py-1.5 rounded-full bg-blue-50 text-[#001f3f] text-xs font-bold uppercase tracking-widest border border-blue-100">
                            Performance System 2.0
                        </span>
                        <h1 className="text-6xl font-black text-[#001f3f] leading-[1.1] mt-6">
                            Elevate Your <br />
                            <span className="text-gradient">
                                Banking Growth
                            </span>
                        </h1>
                        <p className="max-w-lg mt-8 text-lg leading-relaxed text-slate-600">
                            Monitoring akuisisi produk perbankan kini lebih
                            intuitif. Data real-time untuk pengambilan keputusan
                            yang lebih tajam dan terukur.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="relative z-10 animate-[bounce_4s_infinite] drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]">
                            <img
                                src="https://img.freepik.com/free-gradient/gradient-glassmorphism-background_23-2149447437.jpg"
                                className="rounded-[40px] rotate-3 hover:rotate-0 transition-all duration-700 w-full h-[400px] object-cover shadow-2xl"
                                alt="Showcase"
                            />
                            <div className="absolute p-6 shadow-xl -bottom-6 -left-6 glass rounded-3xl">
                                <p className="text-xs font-bold uppercase text-slate-400">
                                    Growth Rate
                                </p>
                                <p className="text-2xl font-black text-green-500">
                                    +24.8%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- STATS SECTION --- */}
            <section className="px-8 py-12">
                <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl md:grid-cols-3">
                    <div className="bento-card bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-center w-12 h-12 mb-6 text-2xl bg-blue-50 rounded-2xl">
                            📈
                        </div>
                        <h3 className="text-4xl font-black text-[#001f3f]">
                            Rp 1.2B
                        </h3>
                        <p className="mt-2 font-medium text-slate-500">
                            Total Akuisisi Bulan Ini
                        </p>
                    </div>
                    <div className="bento-card bg-[#001f3f] p-8 rounded-[32px] text-white shadow-xl">
                        <div className="flex items-center justify-center w-12 h-12 mb-6 text-2xl bg-white/10 rounded-2xl">
                            🏆
                        </div>
                        <h3 className="text-4xl font-black text-[#c5a059]">
                            89.4%
                        </h3>
                        <p className="mt-2 font-medium text-slate-300">
                            Productivity Index
                        </p>
                    </div>
                    <div className="bento-card bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-center w-12 h-12 mb-6 text-2xl bg-orange-50 rounded-2xl">
                            💳
                        </div>
                        <h3 className="text-4xl font-black text-[#001f3f]">
                            18
                        </h3>
                        <p className="mt-2 font-medium text-slate-500">
                            Produk Unggulan
                        </p>
                    </div>
                </div>
            </section>

            {/* --- CHART SECTION --- */}
            <section className="px-8 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                        <div className="flex flex-col justify-between mb-10 md:flex-row md:items-center">
                            <div>
                                <h2 className="text-2xl font-black text-[#001f3f]">
                                    Komparasi Performa Top 5 Pegawai
                                </h2>
                                <p className="font-medium text-slate-500">
                                    Tren akuisisi produk perbankan selama 30
                                    hari terakhir
                                </p>
                            </div>
                            <div className="bg-slate-50 p-1.5 rounded-xl flex gap-2">
                                <button className="px-4 py-2 bg-white shadow-sm rounded-lg text-xs font-bold text-[#001f3f]">
                                    Volume Produk
                                </button>
                                <button className="px-4 py-2 text-xs font-bold rounded-lg text-slate-400">
                                    Nilai Rupiah
                                </button>
                            </div>
                        </div>

                        {/* Render ApexChart */}
                        <div className="min-h-[450px]">
                            <Chart
                                options={chartOptions}
                                series={chartSeries}
                                type="line"
                                height={450}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
