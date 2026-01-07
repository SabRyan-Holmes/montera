import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

export default function DivisiBarChart({ data }) {
    // data dari backend: [{name: 'Kredit', realisasi: 500, target: 1000}, ...]
    const chartRef = useRef(null);

    useEffect(() => {
        const chartElement = document.getElementById("divisi-bar-chart");

        if (chartElement && data && data.length > 0) {
            const options = {
                series: [
                    {
                        name: "Realisasi",
                        data: data.map((d) => d.realisasi), // Ambil angka realisasi
                    },
                    {
                        name: "Target",
                        data: data.map((d) => d.target), // Ambil angka target
                    },
                ],
                chart: {
                    type: "bar",
                    height: 350,
                    toolbar: { show: false },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: "55%",
                        endingShape: "rounded",
                        borderRadius: 4,
                    },
                },
                dataLabels: { enabled: false },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"],
                },
                xaxis: {
                    categories: data.map((d) => d.name), // Nama-nama Divisi
                    labels: {
                        style: { fontFamily: "Inter, sans-serif", fontWeight: 500 },
                    },
                },
                yaxis: {
                    title: { text: "Nominal (Rp)", style: { fontWeight: 600 } },
                    labels: {
                        formatter: (val) => "Rp " + val.toLocaleString("id-ID"),
                    },
                },
                // Warna: Gold untuk Realisasi, Navy untuk Target
                colors: ["#D4AF37", "#1E293B"],
                fill: { opacity: 1 },
                tooltip: {
                    y: {
                        formatter: (val) => "Rp " + val.toLocaleString("id-ID"),
                    },
                },
                legend: {
                    position: "top",
                    horizontalAlign: "right",
                    fontFamily: "Inter, sans-serif",
                },
                grid: {
                    borderColor: "#f1f1f1",
                },
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
        <div className="w-full">
            <div id="divisi-bar-chart" className="min-h-[350px]"></div>
        </div>
    );
}
