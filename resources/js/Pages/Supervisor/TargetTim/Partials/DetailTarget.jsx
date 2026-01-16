import moment from "moment/min/moment-with-locales";
import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

export default function DetailTarget({ target, collapse = true }) {
    moment.locale("id"); // Pastikan locale ID
    const [isCollapsed, setIsCollapsed] = useState(collapse);

    // Helper Format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    // Helper Tampilan Nilai Target
    const displayNilai = (item) => {
        if (item.tipe_target === 'nominal') {
            return formatRupiah(item.nilai_target);
        }
        return `${item.nilai_target} Unit/Akun (NoA)`;
    };

    const RowData = ({ label, value }) => (
        <tr className="hover:bg-gray-50">
            <td width="40%" className="font-medium text-gray-600 align-top">
                {label}
            </td>
            <td className="text-base font-normal text-gray-800 align-top">
                {value}
            </td>
        </tr>
    );

    return (
        <table className="table w-full text-base table-bordered">
            <thead
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-lg text-white cursor-pointer select-none bg-primary hover:bg-primary/90"
            >
                <tr>
                    <th colSpan={2}>
                        Detail Data Target
                        {isCollapsed ? (
                            <span className="flex items-center float-right gap-1 mt-1 text-sm font-normal">
                                [Tampilkan]
                                <HiBarsArrowDown className="scale-125" />
                            </span>
                        ) : (
                            <span className="flex items-center float-right gap-1 mt-1 text-sm font-normal">
                                [Sembunyikan]
                                <HiBarsArrowUp className="scale-125" />
                            </span>
                        )}
                    </th>
                </tr>
            </thead>

            <tbody>
                {!target ? (
                    <tr>
                        <td
                            colSpan={2}
                            className="py-4 text-base text-center text-warning"
                        >
                            Data tidak tersedia.
                        </td>
                    </tr>
                ) : !isCollapsed ? (
                    <>
                        {/* --- INFORMASI UTAMA --- */}
                        <RowData
                            label="Pegawai Ditargetkan"
                            value={target.pegawai?.name || "-"}
                        />
                        <RowData
                            label="Produk"
                            value={
                                target.produk
                                    ? `${target.produk.nama_produk} (${target.produk.kategori_produk})`
                                    : "Target Umum (Non-Produk)"
                            }
                        />
                        <RowData
                            label="Nilai Target"
                            value={<span className="font-bold text-emerald-700">{displayNilai(target)}</span>}
                        />

                        {/* --- WAKTU & PERIODE --- */}
                        <RowData
                            label="Periode Target"
                            value={
                                <span className="capitalize">
                                    {target.periode} - Tahun {target.tahun}
                                </span>
                            }
                        />
                        <RowData
                            label="Durasi Pelaksanaan"
                            value={`${moment(target.tanggal_mulai).format("LL")} s/d ${moment(target.tanggal_selesai).format("LL")}`}
                        />
                        <RowData
                            label="Deadline Pencapaian"
                            value={
                                <span className="font-medium text-red-600">
                                    {moment(target.deadline_pencapaian).format("LL")}
                                </span>
                            }
                        />

                        {/* --- INFORMASI TAMBAHAN --- */}
                        <RowData
                            label="Keterangan Tambahan"
                            value={target.keterangan_tambahan || "-"}
                        />

                        {/* --- METADATA --- */}
                        <RowData
                            label="Dibuat Pada"
                            value={moment(target.created_at).format("LLLL")}
                        />
                        <RowData
                            label="Terakhir Diperbarui"
                            value={moment(target.updated_at).fromNow()}
                        />
                    </>
                ) : null}
            </tbody>
        </table>
    );
}
