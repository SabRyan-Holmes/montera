import moment from "moment/min/moment-with-locales";
import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

export default function DetailTarget({ target, collapse = true }) {
    const [isCollapsed, setIsCollapsed] = useState(collapse);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);
    moment.locale("id");

    // Helper Rupiah
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka);
    };

    // Helper Row Sederhana
    const RowData = ({ label, value }) => (
        <tr>
            <td className="font-semibold align-middle bg-gray-50" width="35%">
                {label}
            </td>
            <td className="text-base align-middle">{value}</td>
        </tr>
    );

    return (
        <table className="table w-full text-base table-bordered">
            {/* --- HEADER --- */}
            <thead
                onClick={toggleCollapse}
                className="text-lg text-white transition-colors cursor-pointer select-none bg-primary hover:bg-primary/90"
            >
                <tr>
                    <th colSpan={2}>
                        Detail Target Kinerja
                        <span className="flex items-center float-right gap-1 mt-1 text-sm font-normal opacity-90">
                            {isCollapsed ? "[Tampilkan]" : "[Sembunyikan]"}
                            {isCollapsed ? (
                                <HiBarsArrowDown />
                            ) : (
                                <HiBarsArrowUp />
                            )}
                        </span>
                    </th>
                </tr>
            </thead>

            {/* --- BODY --- */}
            <tbody>
                {!target ? (
                    <tr>
                        <td
                            colSpan={2}
                            className="py-6 text-base italic text-center text-gray-500"
                        >
                            Pilih Data Target Terlebih Dahulu.
                        </td>
                    </tr>
                ) : !isCollapsed ? (
                    <>
                        {/* 1. Nama & Kode Produk */}
                        <RowData
                            label="Produk"
                            value={
                                <>
                                    <div className="font-bold text-gray-800">
                                        {target.produk?.nama_produk ?? "-"}
                                    </div>
                                    <span className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
                                        {target.produk?.kode_produk ?? "-"}
                                    </span>
                                </>
                            }
                        />

                        {/* 2. Kategori Produk */}
                        <RowData
                            label="Kategori Produk"
                            value={
                                <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 border border-blue-100 rounded-full bg-blue-50">
                                    {target.produk?.kategori_produk ?? "-"}
                                </span>
                            }
                        />

                        {/* 3. Nilai Target */}
                        <RowData
                            label="Nilai Target"
                            value={
                                <span className="text-lg font-bold text-emerald-600">
                                    {formatRupiah(target.nilai_target ?? 0)}
                                </span>
                            }
                        />

                        {/* 4. Tipe Target (Nominal / NOA) */}
                        <RowData
                            label="Tipe Target"
                            value={
                                <span className="font-medium text-gray-700 capitalize">
                                    {target.tipe_target ?? "-"}
                                </span>
                            }
                        />

                        {/* 5. Periode & Tahun */}
                        <RowData
                            label="Periode & Tahun"
                            value={
                                <div className="flex items-center gap-2">
                                    <span className="font-medium capitalize">
                                        {target.periode ?? "-"}
                                    </span>
                                    <span className="text-gray-400">|</span>
                                    <span className="font-bold text-gray-800">
                                        {target.tahun ?? "-"}
                                    </span>
                                </div>
                            }
                        />

                        {/* 6. Tanggal Mulai */}
                        <RowData
                            label="Tanggal Mulai"
                            value={
                                target.tanggal_mulai
                                    ? moment(target.tanggal_mulai).format(
                                          "dddd, D MMMM YYYY",
                                      )
                                    : "-"
                            }
                        />

                        {/* 7. Tanggal Selesai */}
                        <RowData
                            label="Tanggal Selesai"
                            value={
                                target.tanggal_selesai
                                    ? moment(target.tanggal_selesai).format(
                                          "dddd, D MMMM YYYY",
                                      )
                                    : "-"
                            }
                        />

                        {/* 8. Deadline Pencapaian */}
                        <RowData
                            label="Deadline Pencapaian"
                            value={
                                target.deadline_pencapaian ? (
                                    <span className="font-semibold text-red-600">
                                        {moment(
                                            target.deadline_pencapaian,
                                        ).format("D MMMM YYYY")}
                                        <span className="ml-2 text-xs font-normal text-gray-500">
                                            (
                                            {moment(
                                                target.deadline_pencapaian,
                                            ).fromNow()}
                                            )
                                        </span>
                                    </span>
                                ) : (
                                    "-"
                                )
                            }
                        />

                        {/* 9. Meta Data (Dibuat & Diupdate) */}
                        <RowData
                            label="Terakhir Diperbarui"
                            value={
                                target.updated_at ? (
                                    <div className="flex flex-col text-sm">
                                        <span>
                                            {moment(target.updated_at).format(
                                                "D MMM YYYY, HH:mm",
                                            )}
                                        </span>
                                        <span className="text-xs italic text-gray-400">
                                            {moment(
                                                target.updated_at,
                                            ).fromNow()}
                                        </span>
                                    </div>
                                ) : (
                                    "-"
                                )
                            }
                        />
                    </>
                ) : null}
            </tbody>
        </table>
    );
}
