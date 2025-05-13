import React, { useEffect } from "react";
import { Checkbox, InputLabel } from "@/Components";
import { initFlowbite } from "flowbite";
import { Link } from "@inertiajs/react";

export default function Graph({ data }) {
    useEffect(() => {
        if (document.getElementById("donut-chart")) {
            // Konversi data props menjadi format yang dibutuhkan ApexCharts
            const seriesData = Object.values(data);
            const labels = Object.keys(data);

            // Filter data yang memiliki nilai > 0
            const filteredSeries = [];
            const filteredLabels = [];
            const filteredColors = [];

            const colorPalette = [
                "#1C64F2",
                "#16BDCA",
                "#FDBA8C",
                "#E74694",
                "#fb923c",
                "#78dcca",
                "#8b5cf6",
                "#ec4899",
                "#f97316"
            ];

            labels.forEach((label, index) => {
                if (data[label] > 0) {
                    filteredSeries.push(data[label]);
                    filteredLabels.push(label);
                    filteredColors.push(colorPalette[index % colorPalette.length]);
                }
            });

            const chart = new ApexCharts(
                document.getElementById("donut-chart"),
                getChartOptions(filteredSeries, filteredLabels, filteredColors)
            );
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
            stroke: {
                colors: ["transparent"],
                lineCap: "",
            },
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
                                label: "Pegawai Fungsional",
                                fontFamily: "Inter, sans-serif",
                                formatter: function (w) {
                                    const sum = w.globals.seriesTotals.reduce(
                                        (a, b) => a + b,
                                        0
                                    );
                                    return sum;
                                },
                            },
                            value: {
                                show: true,
                                fontFamily: "Inter, sans-serif",
                                offsetY: -20,
                                formatter: function (value) {
                                    return value + " Pegawai";
                                },
                            },
                        },
                        size: "80%",
                    },
                },
            },
            grid: {
                padding: {
                    top: -2,
                },
            },
            labels: labels,
            dataLabels: {
                enabled: false,
            },
            legend: {
                position: "bottom",
                fontFamily: "Inter, sans-serif",
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value + " Pegawai";
                    },
                },
            },
            xaxis: {
                labels: {
                    formatter: function (value) {
                        return value + " Pegawai";
                    },
                },
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
            },
        };
    };

    // ... (bagian return tetap sama)
    return (
        <section className="w-full max-w-md p-4 mx-auto mt-5 bg-white border rounded-lg shadow cursor-pointer dark:bg-gray-800 md:p-6 border-gradient">
            {/* ... (kode JSX lainnya tetap sama) */}
            <div className="py-6" id="donut-chart"></div>
        </section>
    );
}