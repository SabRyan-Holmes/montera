import React, { useEffect } from "react";
import { Checkbox, InputLabel } from "@/Components";
import { initFlowbite } from "flowbite";


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

    return (
        <section className="w-full max-w-md p-4 mx-auto mt-5 bg-white border rounded-lg shadow cursor-pointer dark:bg-gray-800 md:p-6 border-gradient">

        <div className="flex items-center justify-around mb-3 ">
            <div className="flex items-center justify-center">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
                    Data Pegawai Fungsional
                </h5>
                <svg
                    data-popover-target="chart-info"
                    data-popover-placement="bottom"
                    className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
                    ariaHidden="true"
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
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            Pegawai Fungsional di BPS Provinsi Jambi
                        </h3>
                        <p className="text-[12px]">
                            Pegawai fungsional di BPS Provinsi Jambi adalah
                            pegawai yang memiliki tugas dan tanggung jawab
                            khusus sesuai dengan bidang keahlian
                            masing-masing. Jabatan fungsional ini terdiri
                            dari beberapa tingkatan, yaitu:
                        </p>
                        <ul>
                            <li  className="text-[12px]">
                                <strong>Penyelia</strong>: Bertanggung jawab atas
                                pengawasan dan koordinasi pekerjaan tim
                                dalam proyek atau tugas-tugas statistik.
                            </li>
                            <li className="text-[12px]">
                                <strong>Mahir</strong>: Melibatkan kemampuan statistik yang mendalam
                                dan aplikasi metode analisis tingkat lanjut
                                dalam berbagai proyek.
                            </li>
                            <li className="text-[12px]">
                                <strong>Terampil</strong>: Level yang menunjukkan kemampuan dalam
                                menggunakan teknik statistik standar dan
                                alat analisis untuk melakukan pekerjaan.
                            </li>
                            <li className="text-[12px]">
                                <strong>Madya</strong>: Melibatkan tingkat keterampilan dan
                                pengalaman yang lebih tinggi dibandingkan
                                dengan level Muda dan melibatkan tanggung
                                jawab tambahan dalam analisis statistik.
                            </li>
                            <li className="text-[12px]">
                                <strong>Muda</strong>: Merupakan posisi awal atau tingkat menengah
                                dalam karir statistik yang memerlukan
                                kemampuan dasar dan pengalaman dalam
                                analisis data.
                            </li>
                            <li className="text-[12px]">
                                <strong>Pertama</strong>:
                                adalah level entry-level yang biasanya
                                melibatkan tugas-tugas dasar dan pelatihan
                                awal dalam statistik.
                            </li>
                        </ul>
                        {/* <p className="text-xs">
                            Setiap tingkatan jabatan memiliki peran dan
                            kontribusi yang penting dalam mendukung kegiatan
                            dan program di BPS Provinsi Jambi, serta
                            berperan dalam mencapai tujuan organisasi secara
                            keseluruhan.
                        </p> */}
                        <a
                            href="https://infoasn.id/jabatan-fungsional/uraian-tugas-jabatan-fungsional-statistisi-ahli-muda.html"
                            className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Read more{" "}
                            <svg
                                className="w-2 h-2 ms-1.5 rtl:rotate-180"
                                ariaHidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                        </a>
                    </div>
                    <div data-popper-arrow></div>
                </div>
            </div>

                <a href={route('divisi-sdm.export-csv')}>
                    <button
                        type="button"
                        dataTooltipTarget="data-tooltip"
                        dataTooltipPlacement="bottom"
                        className="items-center justify-center hidden w-8 h-8 text-sm text-gray-500 rounded-lg sm:inline-flex dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
                    >
                        <svg
                            className="w-3.5 h-3.5"
                            ariaHidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 18"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                            />
                        </svg>
                        <span className="sr-only">Download data</span>
                    </button>
                </a>

                <div
                    id="data-tooltip"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                >
                    Unduh CSV
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
        </div>

        <div className="visible hidden">
            <div
                className="grid items-center grid-cols-4 gap-4 place-content-center"
                id="devices"
            >
                <div className="flex items-center me-4">
                    <Checkbox id="terampil" value="terampil" />
                    <InputLabel
                        value="Terampil"
                        htmlFor="terampil"
                        className="ml-2 font-normal"
                    />
                </div>
                <div className="flex items-center me-4">
                    <Checkbox id="mahir" value="mahir" />
                    <InputLabel
                        value="Mahir"
                        htmlFor="mahir"
                        className="ml-2 font-normal"
                    />
                </div>

                <div className="flex items-center me-4">
                    <Checkbox id="penyelia" value="penyelia" />
                    <InputLabel
                        value="Penyelia"
                        htmlFor="penyelia"
                        className="ml-2 font-normal"
                    />
                </div>
                <div className="flex items-center me-4">
                    <Checkbox id="pertama" value="pertama" />
                    <InputLabel
                        value="Pertama"
                        htmlFor="pertama"
                        className="ml-2 font-normal"
                    />
                </div>
                <div className="flex items-center col-span-2 me-4 justify-self-center">
                    <Checkbox id="muda" value="muda" />
                    <InputLabel
                        value="Muda"
                        htmlFor="muda"
                        className="ml-2 font-normal"
                    />
                </div>
                <div className="flex items-center col-span-2 me-4 justify-self-center">
                    <Checkbox id="madya" value="madya" />
                    <InputLabel
                        value="Madya"
                        htmlFor="madya"
                        className="ml-2 font-normal"
                    />
                </div>
            </div>
        </div>

        {/* <!-- Donut Chart --> */}
        <div className="py-6" id="donut-chart"></div>


    </section>
    );
}