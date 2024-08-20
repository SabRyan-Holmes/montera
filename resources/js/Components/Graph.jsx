import React, { useEffect } from "react";
import { Checkbox, InputLabel } from "@/Components";
import { initFlowbite } from "flowbite";
import { Link } from "@inertiajs/react";


export default function Graph({ data }) {
    useEffect(() => {
        // Panggil fungsi yang diimpor
        // initializeChart();
        if (document.getElementById("donut-chart")) {
            const seriesData = [
                data.terampil,
                data.mahir,
                data.penyelia,
                data.pertama,
                data.muda,
                data.madya,
            ];

            const chart = new ApexCharts(
                document.getElementById("donut-chart"),
                getChartOptions(seriesData)
            );
            chart.render();
        }
    }, [data]);

    const getChartOptions = (seriesData) => {
        return {
            series: seriesData,
            colors: [
                "#1C64F2",
                "#16BDCA",
                "#FDBA8C",
                "#E74694",
                "#fb923c",
                "#78dcca",
            ],
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
                                        (a, b) => {
                                            return a + b;
                                        },
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
            labels: [
                "Terampil",
                "Mahir",
                "Penyelia",
                "Pertama",
                "Muda",
                "Madya",
            ],
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
        <div class="max-w-md w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mx-auto mt-5 border border-gradient">

            <div class="flex justify-around mb-3 items-center">
                <div class="flex justify-center items-center">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
                        Data Pegawai Fungsional
                    </h5>
                    <svg
                        data-popover-target="chart-info"
                        data-popover-placement="bottom"
                        class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
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
                        class="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                    >
                        <div class="p-3 space-y-2">
                            <h3 class="font-semibold text-gray-900 dark:text-white">
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
                                {/* <li>
                            <strong>
                                AMDYA (Administrasi Umum)
                            </strong>
                            <span className="text-[12px] block">

                            : Jabatan ini merupakan tingkatan
                            awal bagi pegawai fungsional, yang
                            bertugas dalam kegiatan
                            administratif umum.
                            </span>
                        </li> */}
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
                                class="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
                            >
                                Read more{" "}
                                <svg
                                    class="w-2 h-2 ms-1.5 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                            </a>
                        </div>
                        <div data-popper-arrow></div>
                    </div>
                </div>

                    <a href={route('export-csv')}>
                        <button
                            type="button"
                            data-tooltip-target="data-tooltip"
                            data-tooltip-placement="bottom"
                            class="hidden sm:inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm"
                        >
                            <svg
                                class="w-3.5 h-3.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 18"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                                />
                            </svg>
                            <span class="sr-only">Download data</span>
                        </button>
                    </a>

                    <div
                        id="data-tooltip"
                        role="tooltip"
                        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                    >
                        Unduh CSV
                        <div class="tooltip-arrow" data-popper-arrow></div>
                    </div>
            </div>

            <div className="visible hidden">
                <div
                    class="grid grid-cols-4 gap-4 items-center place-content-center"
                    id="devices"
                >
                    <div class="flex items-center me-4">
                        <Checkbox id="terampil" value="terampil" />
                        <InputLabel
                            value="Terampil"
                            htmlFor="terampil"
                            className="ml-2 font-normal"
                        />
                    </div>
                    <div class="flex items-center me-4">
                        <Checkbox id="mahir" value="mahir" />
                        <InputLabel
                            value="Mahir"
                            htmlFor="mahir"
                            className="ml-2 font-normal"
                        />
                    </div>

                    <div class="flex items-center me-4">
                        <Checkbox id="penyelia" value="penyelia" />
                        <InputLabel
                            value="Penyelia"
                            htmlFor="penyelia"
                            className="ml-2 font-normal"
                        />
                    </div>
                    <div class="flex items-center me-4">
                        <Checkbox id="pertama" value="pertama" />
                        <InputLabel
                            value="Pertama"
                            htmlFor="pertama"
                            className="ml-2 font-normal"
                        />
                    </div>
                    <div class="flex items-center me-4 justify-self-center col-span-2">
                        <Checkbox id="muda" value="muda" />
                        <InputLabel
                            value="Muda"
                            htmlFor="muda"
                            className="ml-2 font-normal"
                        />
                    </div>
                    <div class="flex items-center me-4 justify-self-center col-span-2">
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
            <div class="py-6" id="donut-chart"></div>

            <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                <div class="flex justify-between items-center pt-5">
                    {/* <!-- Button --> */}
                    {/* <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="lastDaysdropdown"
                        data-dropdown-placement="bottom"
                        class="text-sm font-medium text-gray-500 dark:text-gray-400  hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                        type="button"
                    >
                        Semua Waktu
                        <svg
                            class="w-2.5 m-2.5 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button> */}
                    <div
                        id="lastDaysdropdown"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                        {/* Todo? */}
                        {/* <ul
                            class="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownDefaultButton"
                        >
                            <li>
                                <a
                                    href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    7 Hari Terakhir
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    30 Hari Terakhir
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    90 Hari Terakhir
                                </a>
                            </li>
                        </ul> */}
                    </div>
                    {/* <a
                        href="#"
                        class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
                    >
                        Analisis
                        <svg
                            class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                    </a> */}
                </div>
            </div>
        </div>
    );
}
