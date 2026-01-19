import React, { useEffect, useRef } from "react";
import ColorCard from "./Partials/ColorCard";
import ApexCharts from "apexcharts";

export default function RadialChart({ title, data, chartId }) {
    const chartRef = useRef(null);

    // 1. Separate Data for Chart (Rings) vs Info (Legend)
    // We only want 'Tercapai' and 'Sisa' for the visual rings to avoid clutter
    const chartSeries = [data.Tercapai, data.Sisa];
    const chartLabels = ['Tercapai', 'Sisa'];

    // 2. Prepare Data for Legends (Color Cards)
    // We want to show all useful info here
    const legendItems = [
        { label: 'Tercapai', value: data.Tercapai + '%', color: '#D4AF37' }, // Gold
        { label: 'Sisa Target', value: data.Sisa + '%', color: '#1E293B' }, // Navy
        // Format nominal currency for better readability
        { label: 'Nominal Realisasi', value: formatCurrency(data.NominalTercapai), color: '#10B981' }, // Emerald
        { label: 'Nominal Target', value: formatCurrency(data.NominalTarget), color: '#EF4444' }, // Red
    ];

    // Colors matching the chart rings
    const chartColors = ["#D4AF37", "#1E293B"];

    useEffect(() => {
        const chartElement = document.getElementById(chartId);

        if (chartElement) {
            const options = {
                series: chartSeries, // Only use percentage data for rings
                labels: chartLabels,
                colors: chartColors,
                chart: {
                    height: "300px", // Reduced height slightly
                    width: "100%",
                    type: "radialBar",
                    sparkline: { enabled: true },
                    fontFamily: "Inter, sans-serif",
                },
                plotOptions: {
                    radialBar: {
                        track: { background: "#F3F4F6", strokeWidth: '100%' },
                        hollow: { size: "55%" }, // Increased hollow to give text more room
                        dataLabels: {
                            name: { show: true, fontSize: "14px", color: "#64748B", offsetY: -5 },
                            value: {
                                show: true,
                                fontSize: "24px", // Adjusted font size
                                fontWeight: "700",
                                color: "#1E293B",
                                offsetY: 5,
                                formatter: (val) => val + "%"
                            },
                            total: {
                                show: true,
                                label: "Capaian",
                                fontSize: "14px",
                                color: "#64748B",
                                fontWeight: 600,
                                formatter: function (w) {
                                    // Show the 'Tercapai' value in the center
                                    return w.globals.seriesTotals[0] + "%";
                                }
                            }
                        },
                    },
                },
                stroke: { lineCap: "round" },
                legend: { show: false }, // Hide default legend, we use custom ColorCards
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

    // Helper to format currency (IDR)
    function formatCurrency(val) {
        if (!val) return "Rp 0";
        // Shorten large numbers (e.g. 2.5M, 1.2B) if space is tight, or standard currency
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(val);
    }

    return (
        <section className="flex flex-col justify-between w-full h-full p-6 bg-white border shadow-sm rounded-xl border-slate-100">
            <div className="flex justify-between mb-4">
                <div className="flex items-center">
                    <h5 className="text-lg font-bold text-slate-800">
                        {title}
                    </h5>
                    <div className="relative ml-2 group">
                        <svg className="w-4 h-4 text-gray-400 cursor-help hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM11 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0-3a1 1 0 0 1-2 0V7a1 1 0 1 1 2 0v4Z" />
                        </svg>
                        {/* Simple Tooltip */}
                        <div className="absolute z-10 invisible w-64 p-3 mb-2 text-xs text-center text-white transition-all -translate-x-1/2 rounded shadow-lg opacity-0 left-1/2 bottom-full bg-slate-800 group-hover:visible group-hover:opacity-100">
                            Persentase ini dihitung dari perbandingan total realisasi transaksi (Verified) terhadap target.
                            <div className="absolute w-0 h-0 -translate-x-1/2 border-t-4 left-1/2 top-full border-x-4 border-x-transparent border-t-slate-800"></div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Radial Chart Container */}
            <div id={chartId} className="flex-grow flex items-center justify-center min-h-[250px]"></div>

            <div className="flex items-center justify-center pt-4 mt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    Progres Realisasi Akuisisi
                </span>
            </div>

              {/* Render Custom Legends (Grid Layout) */}
            <div className="grid grid-cols-2 gap-4 mb-2">
                {legendItems.map((item, index) => (
                    <div key={index} className="p-3 border rounded-lg bg-slate-50 border-slate-100">
                        <p className="mb-1 text-xs text-slate-500">{item.label}</p>
                        <p className="text-sm font-bold truncate" style={{ color: item.color }}>
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
