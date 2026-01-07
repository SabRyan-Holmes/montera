import React, { useEffect } from "react";
import { initFlowbite } from "flowbite";
import ApexCharts from "apexcharts"; // Pastikan ApexCharts terinstal

export default function AkuisisiGraph({ data }) {
    // data sekarang berisi: { Verified: X, Pending: Y, Rejected: Z }

    useEffect(() => {
        // Inisialisasi popover flowbite jika diperlukan
        initFlowbite();

        if (document.getElementById("donut-chart") && data) {
            const seriesData = Object.values(data);
            const labels = Object.keys(data);

            // Mapping warna sesuai status: Verified (Success/Emerald), Pending (Info/Blue), Rejected (Error/Red)
            const statusColors = {
                Verified: "#10B981", // Success Emerald
                Pending: "#3ABFF8",  // Info Blue
                Rejected: "#EF4444", // Error Red
            };

            const filteredColors = labels.map(label => statusColors[label] || "#D4AF37");

            const options = getChartOptions(seriesData, labels, filteredColors);
            const chart = new ApexCharts(document.getElementById("donut-chart"), options);
            chart.render();

            return () => chart.destroy();
        }
    }, [data]);

    const getChartOptions = (seriesData, labels, colors) => {
        return {
            series: seriesData,
            colors: colors,
            chart: {
                height: 320,
                width: "100%",
                type: "donut",
            },
            stroke: { colors: ["transparent"] },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontFamily: "Inter, sans-serif",
                                offsetY: 20,
                            },
                            total: {
                                showAlways: true,
                                show: true,
                                label: "Total Akuisisi",
                                fontFamily: "Inter, sans-serif",
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                },
                            },
                            value: {
                                show: true,
                                fontFamily: "Inter, sans-serif",
                                offsetY: -20,
                                formatter: (value) => value + " Data",
                            },
                        },
                        size: "75%",
                    },
                },
            },
            labels: labels,
            dataLabels: { enabled: false },
            legend: {
                position: "bottom",
                fontFamily: "Inter, sans-serif",
            },
            tooltip: {
                enabled: true,
                y: { formatter: (value) => value + " Laporan" }
            }
        };
    };

    return (
        <section className="w-full max-w-md p-4 mx-auto bg-white border shadow-sm rounded-xl dark:bg-gray-800 md:p-6 border-slate-200">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <h5 className="text-xl font-bold leading-none text-secondary pe-1">
                        Status Verifikasi
                    </h5>
                    {/* Popover Info Konteks Akuisisi */}
                    <svg
                        data-popover-target="chart-info"
                        data-popover-placement="bottom"
                        className="w-3.5 h-3.5 text-gray-400 hover:text-primary cursor-pointer ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
                    </svg>
                    <div
                        data-popover
                        id="chart-info"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                    >
                        <div className="p-3 space-y-2">
                            <h3 className="font-semibold text-secondary">Alur Verifikasi MONTERA</h3>
                            <p className="text-[12px]">
                                Grafik ini menunjukkan kesehatan proses data akuisisi:
                            </p>
                            <ul className="text-[12px] space-y-1">
                                <li><strong>Verified</strong>: Data sah dan sudah masuk ke poin realisasi.</li>
                                <li><strong>Pending</strong>: Menunggu pemeriksaan oleh Supervisor.</li>
                                <li><strong>Rejected</strong>: Data ditolak karena ketidaksesuaian bukti.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Tombol Export yang sudah disesuaikan fungsinya */}
                <a href={route('admin.akuisisi.index')} title="Lihat Detail">
                    <button className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </button>
                </a>
            </div>

            {/* Donut Chart Center */}
            <div className="py-6" id="donut-chart"></div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs font-semibold tracking-widest text-center text-gray-400 uppercase">
                    Data Real-time Sistem MONTERA
                </p>
            </div>
        </section>
    );
}
