import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { FilterSearchCustom, Pagination, TooltipHover } from "@/Components";
import { FaFileImage, FaEyeSlash } from "react-icons/fa6";
import { HiOutlineDownload } from "react-icons/hi";
export default function FinalReport({
    auth,
    title,
    subTitle,
    reports,
    filtersReq,
    filtersList,
}) {
    // State View Mode (Opsional, bawaan template)
    const [showLastUpdated, setShowLastUpdated] = useState(false);
    const monthOptions = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];
    return (
        <Authenticated user={auth.user} title={title}>
            <div className="mx-auto phone:h-screen laptop:h-screen laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                {/* --- HEADER & FILTER SECTION --- */}
                <section className="flex flex-col gap-4 mb-6 md:flex-row md:items-end md:justify-between">
                    <section className="mb-6">
                        <FilterSearchCustom
                            routeName="/kacab/report/final-report"
                            initialFilters={{
                                year: filtersReq.year,
                                month: filtersReq.month,
                                byKategori: filtersReq.byKategori,
                            }}
                            filtersConfig={[
                                {
                                    name: "year",
                                    label: "Tahun",
                                    options: filtersList.year, // Array string tahun ["2026", "2025"]
                                },
                                {
                                    name: "month",
                                    label: "Bulan",
                                    // Kita override options dari backend biar tampil nama bulan (Januari dll)
                                    // Backend kirim ["1", "2"], kita mapping jadi [{value:"1", label:"Januari"}]
                                    options: monthOptions,
                                },
                                {
                                    name: "byKategori",
                                    label: "Kategori",
                                    options: filtersList.kategori, // Array string kategori
                                },
                            ]}
                            searchConfig={{
                                name: "search",
                                label: "Cari Data",
                                placeholder: "Nama Pegawai / NIP...",
                                initialValue: filtersReq.search,
                            }}
                        />
                    </section>
                </section>

                {/* --- TITLE SECTION --- */}
                <section className="pt-2">
                    {subTitle && (
                        <div className="flex items-center justify-between mb-4">
                            <strong className="text-2xl font-bold text-gray-700">
                                {subTitle}
                            </strong>
                            {/* Tombol Export (Hiasan/Placeholder) */}
                            <div className="flex-none pb-1">
                                <button className="flex items-center gap-2 px-4 py-2 text-white transition-colors rounded-lg shadow-sm bg-success hover:bg-success/80">
                                    <HiOutlineDownload className="w-5 h-5" />
                                    <span>Export Excel</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* --- TABLE DATA --- */}
                    {reports.data.length > 0 ? (
                        <div className="overflow-hidden">
                            <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-md">
                                <table className="table w-full text-xs text-left border-collapse">
                                    {/* HEADER WARNA UNGU (Sesuai Gambar Excel) */}
                                    <thead className="text-white uppercase bg-[#5c4087] tracking-wide text-[11px]">
                                        <tr>
                                            <th className="px-3 py-3 border-r border-purple-400 whitespace-nowrap">
                                                Timestamp
                                            </th>
                                            <th className="px-3 py-3 border-r border-purple-400 whitespace-nowrap">
                                                Nama Pegawai
                                            </th>
                                            <th className="px-3 py-3 border-r border-purple-400 whitespace-nowrap">
                                                Produk Akuisisi
                                            </th>

                                            {/* Kolom Dinamis 1 */}
                                            <th className="px-3 py-3 border-r border-purple-400 whitespace-nowrap">
                                                Nomor Rekening
                                            </th>

                                            {/* Kolom Dinamis 2 */}
                                            <th className="px-3 py-3 border-r border-purple-400 whitespace-nowrap">
                                                Nomor Polish AXA
                                            </th>

                                            <th className="px-3 py-3 border-r border-purple-400 whitespace-nowrap">
                                                Tanggal Akuisisi
                                            </th>
                                            <th className="px-3 py-3 text-center border-r border-purple-400 whitespace-nowrap">
                                                Bukti LVM/LIV
                                            </th>

                                            {/* Kolom Dinamis 3 */}
                                            <th className="px-3 py-3 border-r border-purple-400 whitespace-nowrap">
                                                Nama Merchant
                                            </th>

                                            {/* Kolom Dinamis 4 */}
                                            <th className="px-3 py-3 whitespace-nowrap">
                                                MID EDC
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {reports.data.map((item, i) => {
                                            // LOGIC DETEKSI TIPE PRODUK
                                            const lowerKat =
                                                item.kategori?.toLowerCase() ||
                                                "";
                                            const lowerProd =
                                                item.produk?.toLowerCase() ||
                                                "";

                                            const isInsurance =
                                                lowerKat.includes("asuransi") ||
                                                lowerProd.includes("axa");
                                            const isMerchant =
                                                lowerKat.includes("merchant") ||
                                                lowerProd.includes("edc") ||
                                                lowerProd.includes("qris");

                                            return (
                                                <tr
                                                    key={i}
                                                    className="text-gray-700 transition-colors hover:bg-purple-50"
                                                >
                                                    {/* 1. Timestamp */}
                                                    <td className="px-3 py-3 font-mono text-gray-500 border-r border-gray-100 whitespace-nowrap">
                                                        {item.timestamp}
                                                    </td>

                                                    {/* 2. Pegawai */}
                                                    <td className="px-3 py-3 border-r border-gray-100 whitespace-nowrap">
                                                        <div className="font-bold text-gray-800">
                                                            {item.nama_pegawai}
                                                        </div>
                                                        <div className="text-[10px] text-gray-400">
                                                            {item.nip_pegawai}
                                                        </div>
                                                    </td>

                                                    {/* 3. Produk */}
                                                    <td className="px-3 py-3 border-r border-gray-100 whitespace-nowrap">
                                                        <span className="px-2 py-1 text-[10px] font-semibold rounded bg-gray-100 border border-gray-200">
                                                            {item.produk}
                                                        </span>
                                                    </td>

                                                    {/* 4. No Rekening (Show jika BUKAN Asuransi & BUKAN Merchant) */}
                                                    <td className="px-3 py-3 font-mono border-r border-gray-100 whitespace-nowrap">
                                                        {!isInsurance &&
                                                        !isMerchant
                                                            ? item.no_rekening
                                                            : "-"}
                                                    </td>

                                                    {/* 5. No Polis (Show HANYA jika Asuransi) */}
                                                    <td className="px-3 py-3 font-mono border-r border-gray-100 whitespace-nowrap">
                                                        {isInsurance
                                                            ? item.no_rekening
                                                            : "-"}
                                                    </td>

                                                    {/* 6. Tanggal */}
                                                    <td className="px-3 py-3 border-r border-gray-100 whitespace-nowrap">
                                                        {item.tanggal_akuisisi}
                                                    </td>

                                                    {/* 7. Bukti (Tombol Lihat) */}
                                                    <td className="px-3 py-3 text-center border-r border-gray-100">
                                                        {item.bukti_url ? (
                                                            <a
                                                                href={
                                                                    item.bukti_url
                                                                }
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark hover:underline"
                                                            >
                                                                <FaFileImage />{" "}
                                                                Lihat
                                                            </a>
                                                        ) : (
                                                            <span className="text-gray-300">
                                                                -
                                                            </span>
                                                        )}
                                                    </td>

                                                    {/* 8. Nama Merchant (Show HANYA jika Merchant) */}
                                                    <td className="px-3 py-3 border-r border-gray-100 whitespace-nowrap">
                                                        {isMerchant
                                                            ? item.nama_nasabah
                                                            : "-"}
                                                    </td>

                                                    {/* 9. MID EDC (Show HANYA jika Merchant) */}
                                                    <td className="px-3 py-3 font-mono whitespace-nowrap">
                                                        {isMerchant
                                                            ? item.no_rekening
                                                            : "-"}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Component */}
                            <Pagination
                                datas={reports}
                                // Pastikan route ini benar
                                urlRoute="/kacab/report/final-report"
                                filters={{
                                    year: filtersReq.year,
                                    month: filtersReq.month,
                                    byKategori: filtersReq.byKategori,
                                    search: filtersReq.search,
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-500">
                                Tidak ada data laporan sah untuk periode ini.
                            </h2>
                            <p className="text-sm text-gray-400">
                                Coba ubah filter atau cari kata kunci lain.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </Authenticated>
    );
}
