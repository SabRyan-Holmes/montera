import React, { useEffect, useState } from "react";

export default function RadialChart({ title, data, chartId }) {
    const [seriesData, setSeriesData] = useState(Object.values(data));
    const [labels, setLabels] = useState(Object.keys(data));

    useEffect(() => {
        if (
            document.getElementById(chartId) &&
            typeof ApexCharts !== "undefined"
        ) {
            // console.log("data", data);
            // console.log("series", seriesData);
            const chart = new ApexCharts(
                document.querySelector(`#${chartId}`),
                getChartOptions({ seriesData, labels })
            );
            chart.render();

            // Cleanup
            return () => {
                chart.destroy();
            };
        }
    }, [data, chartId]); // Re-render ketika data berubah

    const getChartOptions = ({ seriesData, labels }) => {
        return {
            series: seriesData,
            labels: labels,
            colors: ["#2D95C9", "#22c55e", "oklch(64.5% 0.246 16.439)"], // Biru, Hijau, Warning
            chart: {
                height: "350px",
                width: "100%",
                type: "radialBar",
                sparkline: {
                    enabled: true,
                },
            },
            plotOptions: {
                radialBar: {
                    track: {
                        background: "#E5E7EB",
                    },
                    dataLabels: {
                        show: false,
                    },
                    hollow: {
                        margin: 0,
                        size: "32%",
                    },
                },
            },
            grid: {
                show: false,
                strokeDashArray: 4,
                padding: {
                    left: 2,
                    right: 2,
                    top: -23,
                    bottom: -20,
                },
            },
            legend: {
                show: true,
                position: "bottom",
                fontFamily: "Inter, sans-serif",
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
                labels: {
                    formatter: function (value) {
                        return value + "%";
                    },
                },
            },
        };
    };

    return (
        <section className="w-full max-w-sm p-4 mx-auto bg-white rounded-lg shadow-sm dark:bg-gray-800 md:p-6">
            <div className="flex justify-between mb-3">
                <div className="flex items-center">
                    <div className="flex items-center justify-center">
                        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
                            {title}
                        </h5>
                        <svg
                            data-popover-target={"chart-info" + chartId}
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
                            id={"chart-info" + chartId}
                            role="tooltip"
                            className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
                        >
                            <div className="p-3 space-y-2">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {title}
                                </h3>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Eveniet sequi reiciendis
                                    qui, est, quam omnis tempore eum, molestiae
                                    tenetur cum numquam? Cumque aut magnam enim!
                                    Atque magni quaerat accusantium modi.
                                </p>
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    Ketentuan Persetujuan/Validasi {title}
                                </h3>
                                <p>
                                    For each date bucket, the all-time volume of
                                    activities is calculated. This means that
                                    activities in period n contain all
                                    activities up to period n, plus the
                                    activities generated by your community in
                                    period.
                                </p>
                                <a
                                    href="#"
                                    className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Read more
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
                </div>
            </div>

            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="grid grid-cols-3 gap-3 mb-2">
                    <dl className="bg-primary/5 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
                        <dt className="flex items-center justify-center w-8 h-8 mb-1 text-sm font-medium rounded-full bg-primary/10 text-primary dark:bg-gray-500 dark:text-orange-300">
                            {seriesData[0]}
                        </dt>
                        <dd className="text-sm font-medium text-primary dark:text-orange-300">
                            {labels[0]}
                        </dd>
                    </dl>
                    <dl className="bg-hijau/5 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
                        <dt className="flex items-center justify-center w-8 h-8 mb-1 text-sm font-medium rounded-full bg-hijau/10 text-hijau/80 dark:bg-gray-500 dark:text-teal-300">
                            {seriesData[1]}
                        </dt>
                        <dd className="text-sm font-medium text-hijau/80 dark:text-teal-300">
                            {labels[1]}
                        </dd>
                    </dl>
                    <dl className="bg-warning/5 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]">
                        <dt className="flex items-center justify-center w-8 h-8 mb-1 text-sm font-medium rounded-full bg-warning/10 text-warning/80 dark:bg-gray-500 dark:text-blue-300">
                            {seriesData[2]}
                        </dt>
                        <dd className="text-sm font-medium text-warning/80 dark:text-blue-300">
                            {labels[2]}
                        </dd>
                    </dl>
                </div>
                <button
                    data-collapse-toggle={"more-details" + chartId}
                    type="button"
                    className="inline-flex items-center text-xs font-medium text-gray-500 hover:underline dark:text-gray-400"
                >
                    Lihat Detail
                    <svg
                        className="w-2 h-2 ms-1"
                        ariaHidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>
                <div
                    id={"more-details" + chartId}
                    className="hidden pt-3 mt-3 space-y-2 border-t border-gray-200 dark:border-gray-600"
                >
                    <dl className="flex items-center justify-between">
                        <dt className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Rata-rata Proses Diselesaikan:
                        </dt>
                        <dd className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
                            <svg
                                className="w-2.5 h-2.5 me-1.5"
                                ariaHidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13V1m0 0L1 5m4-4 4 4"
                                />
                            </svg>
                            57%
                        </dd>
                    </dl>
                    <dl className="flex items-center justify-between">
                        <dt className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Hari hingga tenggat berakhir:
                        </dt>
                        <dd className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-gray-600 dark:text-gray-300">
                            Tidak ada
                        </dd>
                    </dl>
                    <dl className="flex items-center justify-between">
                        <dt className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Proses Terakhir Diselesaikan:
                        </dt>
                        <dd className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-gray-600 dark:text-gray-300">
                            199928228292992
                        </dd>
                    </dl>
                </div>
            </div>

            {/* <!-- Radial Chart --> */}
            <div className="py-6" id={chartId}></div>

            <div className="grid items-center justify-between grid-cols-1 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between pt-5">
                    {/* <!-- Button --> */}
                    <button
                        id={"dropdownDefaultButton" + chartId}
                        data-dropdown-toggle={"lastDaysdropdown" + chartId}
                        data-dropdown-placement="bottom"
                        className="inline-flex items-center text-sm font-medium text-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        type="button"
                    >
                        Semua Hari
                        <svg
                            className="w-2.5 m-2.5 ms-1.5"
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
                    </button>
                    <div
                        id={"lastDaysdropdown" + chartId}
                        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
                    >
                        <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby={"dropdownDefaultButton" + chartId}
                        >
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Kemarin
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Hari Ini
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    7 Hari Terakhir
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    30 Hari Terakhir
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    Semua Hari
                                </a>
                            </li>
                        </ul>
                    </div>
                    <a
                        href="#"
                        className="inline-flex items-center px-3 py-2 text-sm font-semibold text-blue-600 uppercase rounded-lg hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                        Progress report
                        <svg
                            className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
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
            </div>
        </section>
    );
}
