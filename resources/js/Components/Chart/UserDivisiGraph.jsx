import React, { useEffect, useRef } from "react";
import { initFlowbite } from "flowbite";
import ApexCharts from "apexcharts";

export default function UserDivisiGraph({ data }) {
    // data dari backend: [{name: 'Kredit', count: 10}, {name: 'Tabungan', count: 5}]
    const chartRef = useRef(null);

    useEffect(() => {
        initFlowbite();

        const chartElement = document.getElementById("user-divisi-chart");

        if (chartElement && data && data.length > 0) {
            // Transformasi data array menjadi format ApexCharts
            const seriesData = data.map(item => item.count);
            const labels = data.map(item => item.name);

            // Palette warna elegan (Navy, Gold, Emerald, dan variasinya)
            const colorPalette = ["#1E293B", "#D4AF37", "#10B981", "#3ABFF8", "#F59E0B", "#6366F1"];

            const options = {
                series: seriesData,
                colors: colorPalette,
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
                                    label: "Total User",
                                    fontFamily: "Inter, sans-serif",
                                    formatter: function (w) {
                                        return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                    },
                                },
                                value: {
                                    show: true,
                                    fontFamily: "Inter, sans-serif",
                                    offsetY: -20,
                                    formatter: (value) => value + " Orang",
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
                    y: { formatter: (value) => value + " Pegawai" }
                }
            };

            if (chartRef.current) {
                chartRef.current.destroy();
            }

            chartRef.current = new ApexCharts(chartElement, options);
            chartRef.current.render();
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);

    return (
        <section className="w-full max-w-md p-4 mx-auto bg-white border shadow-sm rounded-xl dark:bg-gray-800 md:p-6 border-slate-200">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <h5 className="text-xl font-bold leading-none text-secondary pe-1">
                        Sebaran User per Divisi
                    </h5>
                    <svg
                        data-popover-target="user-info"
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
                        id="user-info"
                        role="tooltip"
                        className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                    >
                        <div className="p-3 space-y-2">
                            <h3 className="font-semibold text-secondary">Manajemen Divisi</h3>
                            <p className="text-[12px]">
                                Grafik ini menampilkan komposisi jumlah pegawai aktif berdasarkan unit kerja/divisi yang terdaftar di sistem.
                            </p>
                        </div>
                    </div>
                </div>

                <a href={route('admin.user.index')} title="Kelola User">
                    <button className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </button>
                </a>
            </div>

            {/* Pastikan ID ini unik, jangan sama dengan chart status verifikasi */}
            <div className="py-6" id="user-divisi-chart"></div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs font-semibold tracking-widest text-center text-gray-400 uppercase">
                    Struktur Organisasi Bank XYZ
                </p>
            </div>
        </section>
    );
}
