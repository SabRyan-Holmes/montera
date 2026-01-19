import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { FilterSearchCustom, TooltipHover } from "@/Components"; // Pagination dihapus krn kita load all
import { FaFileImage } from "react-icons/fa6";
import { HiOutlineDownload } from "react-icons/hi";
import { getLabelByKategori } from "@/Utils/labelConfig"; // Import helper tadi

export default function Report({
    auth,
    title,
    subTitle,
    groupedReports, // Terima data grouped

}) {
    // ... (Options bulan sama) ...

    const formatRupiah = (val) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(val);

    return (
        <Authenticated user={auth.user} title={title}>
            <div className="pb-20 mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                {/* --- HEADER & FILTER SECTION (SAMA) --- */}
                {/* ... kode filter sama persis ... */}

                {/* --- TITLE & EXPORT --- */}
                <section className="flex items-end justify-between pt-2 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {subTitle}
                        </h2>
                        <p className="text-sm text-gray-500">
                            Menampilkan total{" "}
                            {groupedReports.reduce(
                                (acc, curr) => acc + curr.data.length,
                                0
                            )}{" "}
                            data transaksi.
                        </p>
                    </div>
                    {/* <button className="flex items-center gap-2 px-4 py-2 text-white transition-colors rounded-lg shadow-sm bg-success hover:bg-success/80">
                        <HiOutlineDownload className="w-5 h-5" />
                        <span>Export Excel</span>
                    </button> */}
                </section>

                {/* --- LOOPING TABEL PER KATEGORI --- */}
                <section className="pb-20 ">

                {groupedReports.length > 0 ? (
                    <div className="flex flex-col gap-10">
                        {groupedReports.map((group, index) => {
                            // Ambil Label Dinamis berdasarkan Kategori Group ini
                            const labels = getLabelByKategori(group.kategori);

                            return (
                                <div
                                    key={index}
                                    className="flex flex-col gap-3"
                                >
                                    {/* Judul Kategori */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-6 rounded-full bg-primary"></div>
                                        <h3 className="text-lg font-bold tracking-wide uppercase text-primary">
                                            {group.kategori}
                                        </h3>
                                        <span className="text-xs font-semibold bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                                            {group.data.length} Data
                                        </span>
                                    </div>

                                    {/* Tabel */}
                                    <div className="overflow-hidden border border-gray-300 rounded-lg shadow-sm">
                                        <table className="table w-full text-xs text-left border-collapse">
                                            {/* --- HEADER DINAMIS --- */}
                                            <thead className="text-white uppercase bg-secondary tracking-wide text-[11px]">
                                                <tr>
                                                    <th className="px-3 py-3 border-r border-purple-400 w-[120px]">
                                                        Timestamp
                                                    </th>
                                                    <th className="px-3 py-3 border-r border-purple-400">
                                                        Pegawai
                                                    </th>
                                                    <th className="px-3 py-3 border-r border-purple-400">
                                                        Produk
                                                    </th>

                                                    {/* LABEL DINAMIS 1: Nama Nasabah/Debitur */}
                                                    <th className="px-3 py-3 border-r border-purple-400">
                                                        {labels.nama}
                                                    </th>

                                                    {/* LABEL DINAMIS 2: Identitas/Rekening */}
                                                    <th className="px-3 py-3 border-r border-purple-400">
                                                        {labels.identitas}
                                                    </th>

                                                    {/* LABEL DINAMIS 3: Nominal */}
                                                    <th className="px-3 py-3 text-right border-r border-purple-400">
                                                        {labels.nominal}
                                                    </th>

                                                    {/* LABEL DINAMIS 4: Tanggal */}
                                                    <th className="px-3 py-3 text-center border-r border-purple-400">
                                                        {labels.tanggal}
                                                    </th>

                                                    <th className="px-3 py-3 text-center">
                                                        Bukti
                                                    </th>
                                                </tr>
                                            </thead>

                                            {/* --- BODY TABLE --- */}
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {group.data.map((item, i) => (
                                                    <tr
                                                        key={item.id}
                                                        className="transition-colors hover:bg-purple-50"
                                                    >
                                                        <td className="px-3 py-2 font-mono text-gray-500 border-r">
                                                            {item.timestamp}
                                                        </td>
                                                        <td className="px-3 py-2 border-r">
                                                            <div className="font-bold text-gray-800">
                                                                {
                                                                    item.nama_pegawai
                                                                }
                                                            </div>
                                                            <div className="text-[10px] text-gray-400">
                                                                {
                                                                    item.nip_pegawai
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-3 py-2 border-r">
                                                            <span className="px-2 py-0.5 rounded bg-gray-100 border text-[10px] font-semibold">
                                                                {item.produk}
                                                            </span>
                                                        </td>

                                                        {/* DATA NAMA */}
                                                        <td className="px-3 py-2 font-medium text-gray-700 uppercase border-r">
                                                            {item.nama_nasabah}
                                                        </td>

                                                        {/* DATA IDENTITAS */}
                                                        <td className="px-3 py-2 font-mono text-gray-600 border-r">
                                                            {item.no_rekening ||
                                                                "-"}
                                                        </td>

                                                        {/* DATA NOMINAL */}
                                                        <td className="px-3 py-2 font-mono text-right text-gray-700 border-r">
                                                            {formatRupiah(
                                                                item.nominal
                                                            )}
                                                        </td>

                                                        {/* DATA TANGGAL */}
                                                        <td className="px-3 py-2 text-center text-gray-600 border-r">
                                                            {
                                                                item.tanggal_akuisisi
                                                            }
                                                        </td>

                                                        {/* BUKTI */}
                                                        {/* TODO bikin agar bisa mengarahkan ke pdf kalo emg ad bukti file ny  */}
                                                        <td className="px-3 py-2 text-center">
                                                            {item.bukti_url ? (
                                                                <a
                                                                    href={
                                                                        item.bukti_url
                                                                    }
                                                                    target="_blank"
                                                                    className="flex items-center justify-center gap-1 text-primary hover:underline"
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
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // EMPTY STATE
                    <div className="flex flex-col items-center justify-center h-64 mt-10 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-500">
                            Tidak ada data laporan sah.
                        </h2>
                        <p className="text-sm text-gray-400">
                            Coba ubah filter periode atau kategori.
                        </p>
                    </div>
                )}
                </section>

            </div>
        </Authenticated>
    );
}
