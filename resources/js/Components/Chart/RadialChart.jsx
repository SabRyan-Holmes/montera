import React, { useEffect, useRef } from "react";
import ColorCard from "./Partials/ColorCard"; // Pastikan path ini benar
import ApexCharts from "apexcharts";

export default function RadialChart({ title, data, chartId }) {
    // data dari props sekarang berupa Object: { 'Realisasi': 75, 'Sisa Target': 25 }
    const chartRef = useRef(null);

    // Mengambil nilai dan label dari props data
    const seriesData = data ? Object.values(data) : [];
    const labels = data ? Object.keys(data) : [];

    // Warna konsisten dengan tema Bank XYZ Gold & Navy
    const colors = ["#D4AF37", "#1E293B", "#10B981", "#EF4444"];

    useEffect(() => {
        const chartElement = document.getElementById(chartId);

        if (chartElement && seriesData.length > 0) {
            const options = {
                series: seriesData,
                labels: labels,
                colors: colors,
                chart: {
                    height: "350px",
                    width: "100%",
                    type: "radialBar",
                    sparkline: { enabled: true },
                },
                plotOptions: {
                    radialBar: {
                        track: { background: "#F3F4F6" },
                        hollow: { size: "40%" },
                        dataLabels: {
                            name: { show: true, fontSize: "16px", offsetY: 10 },
                            value: {
                                show: true,
                                fontSize: "20px",
                                fontWeight: "bold",
                                formatter: (val) => val + "%"
                            },
                            total: {
                                show: true,
                                label: "Capaian",
                                formatter: function (w) {
                                    // Mengambil nilai pertama (biasanya realisasi)
                                    return w.config.series[0] + "%";
                                }
                            }
                        },
                    },
                },
                legend: {
                    show: true,
                    position: "bottom",
                    fontFamily: "Inter, sans-serif",
                },
                tooltip: {
                    enabled: true,
                    y: { formatter: (val) => val + "%" }
                }
            };

            if (chartRef.current) {
                chartRef.current.destroy();
            }

            chartRef.current = new ApexCharts(chartElement, options);
            chartRef.current.render();
        }

        return () => {
            if (chartRef.current) chartRef.current.destroy();
        };
    }, [data, chartId]);

    return (
        <section className="w-full max-w-sm p-4 mx-auto bg-white border shadow-sm rounded-xl border-slate-100 md:p-6">
            <div className="flex justify-between mb-4">
                <div className="flex items-center">
                    <h5 className="text-lg font-bold leading-none text-secondary">
                        {title}
                    </h5>
                    <svg
                        data-popover-target={"chart-info" + chartId}
                        className="w-4 h-4 text-gray-400 cursor-pointer hover:text-primary ms-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM11 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0-3a1 1 0 0 1-2 0V7a1 1 0 1 1 2 0v4Z" />
                    </svg>
                    {/* Popover Content */}
                    <div data-popover id={"chart-info" + chartId} role="tooltip" className="absolute z-10 invisible inline-block p-3 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72">
                        <h3 className="mb-1 font-semibold text-secondary">Panduan Capaian</h3>
                        <p className="text-xs">Persentase ini dihitung dari perbandingan total realisasi transaksi yang sudah sah (Verified) terhadap target yang ditetapkan di awal bulan.</p>
                        <div data-popper-arrow></div>
                    </div>
                </div>
            </div>

            {/* Render Color Cards (Legends) */}
            <div className="grid grid-cols-2 gap-3 p-3 mb-4 rounded-lg bg-slate-50">
                {seriesData.map((value, index) => (
                    <ColorCard
                        key={index}
                        value={value + "%"}
                        label={labels[index]}
                        color={index === 0 ? "primary" : "secondary"}
                    />
                ))}
            </div>

            {/* Radial Chart Container */}
            <div id={chartId} className="min-h-[350px]"></div>

            <div className="flex items-center justify-center pt-5 border-t border-slate-100">
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Progres Realisasi Akuisisi
                </span>
            </div>
        </section>
    );
}
