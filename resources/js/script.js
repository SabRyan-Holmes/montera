import { router } from "@inertiajs/react";

const getChartOptions = () => {
    return {
        series: [35.1, 23.5, 2.4, 5.4],
        colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694", "#fb923c", "#78dcca" ],
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
                            label: "Pejabat Fungsional",
                            fontFamily: "Inter, sans-serif",
                            formatter: function (w) {
                                const sum = w.globals.seriesTotals.reduce(
                                    (a, b) => {
                                        return a + b;
                                    },
                                    0
                                );
                                // Jumlah Pegawai
                                return sum ;
                            },
                        },
                        value: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            offsetY: -20,
                            formatter: function (value) {
                                return value + "k";
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
        labels: ["Terampil", "Mahir", "Penyelia", "Pertama", "Muda", "Madya"],
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
                    return value + "k";
                },
            },
        },
        xaxis: {
            labels: {
                formatter: function (value) {
                    return value + "k";
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
export default function initializeChart() {
    if (
        document.getElementById("donut-chart") &&
        typeof ApexCharts !== "undefined"
    ) {
        // Mengambil data dari backend menggunakan Inertia
        Inertia.get('/get-chart-data', {}, {
            onSuccess: (page) => {
                const data = page.props;

                // Mengambil data dari props yang diterima
                const seriesData = [
                    data.terampil,
                    data.mahir,
                    data.penyelia,
                    data.pertama,
                    data.muda,
                    data.madya
                ];

                // Membuat chart dengan data yang telah diambil
                const chart = new ApexCharts(
                    document.getElementById("donut-chart"),
                    getChartOptions(seriesData)
                );
                chart.render();
            },
            onError: (error) => {
                console.error("Error fetching chart data:", error);
            }
        });
    }
}

// Ubah fungsi getChartOptions agar menerima parameter seriesData
function getChartOptions(seriesData) {
    return {
        series: seriesData, // Gunakan data yang diterima dari backend
        colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694", "#fb923c", "#78dcca" ],
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
                            label: "Pejabat Fungsional",
                            fontFamily: "Inter, sans-serif",
                            formatter: function (w) {
                                const sum = w.globals.seriesTotals.reduce(
                                    (a, b) => {
                                        return a + b;
                                    },
                                    0
                                );
                                // Jumlah Pegawai
                                return sum ;
                            },
                        },
                        value: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            offsetY: -20,
                            formatter: function (value) {
                                return value;
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
        labels: ["Terampil", "Mahir", "Penyelia", "Pertama", "Muda", "Madya"], // Label harus sesuai dengan data yang ditampilkan
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
                    return value;
                },
            },
        },
        xaxis: {
            labels: {
                formatter: function (value) {
                    return value;
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
}
