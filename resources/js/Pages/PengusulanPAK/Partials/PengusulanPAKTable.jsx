import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";
import moment from "moment/min/moment-with-locales";
import { RiLoader2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

export default function PengusulanPAKTable({ data, collapse = true }) {
    moment.locale("id");

    const [isCollapsed, setIsCollapsed] = useState(collapse);
    const bulan = {
        1: "Januari",
        2: "Februari",
        3: "Maret",
        4: "April",
        5: "Mei",
        6: "Juni",
        7: "Juli",
        8: "Agustus",
        9: "September",
        10: "Oktober",
        11: "November",
        12: "Desember",
    };

    function getBulan(angka) {
        return bulan[angka];
    }

    return (
        <section className="mb-4">
            <table className="table w-full text-base table-bordered">
                <thead
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-lg cursor-pointer select-none bg-primary hover:bg-primary/80"
                >
                    <tr>
                        <th colSpan={2}>
                            Detail Pengusulan PAK
                            {isCollapsed ? (
                                <span className="float-right text-sm font-normal">
                                    [Tampilkan]
                                    <HiBarsArrowDown className="inline mx-2 scale-150" />
                                </span>
                            ) : (
                                <span className="float-right text-sm font-normal ">
                                    [Sembunyikan]{" "}
                                    <HiBarsArrowUp className="inline mx-2 scale-150" />
                                </span>
                            )}
                        </th>
                    </tr>
                </thead>
                {!isCollapsed && (
                    <tbody>
                        <tr>
                            <td width="40%">Tanggal Pengusulan</td>
                            <td className="text-base font-normal">
                                {moment(data.created_at).format("LL")} (
                                {moment(data.created_at).fromNow()})
                            </td>
                        </tr>
                        <tr>
                            <td width="40%">Jabatan </td>
                            <td className="text-base font-normal">
                                {data["jabatan"]}
                            </td>
                        </tr>
                        <tr>
                            <td>Periode Penilaian</td>
                            <td className="text-base font-normal">
                                {data.periode_penilaian}
                            </td>
                        </tr>

                        <tr>
                            <td>Jumlah Angka Kredit Terakhir</td>
                            <td className="text-base font-normal">
                                {data["jumlah_ak_terakhir"]}
                            </td>
                        </tr>
                        <tr>
                            <td>Jumlah Angka Kredit Diajukan</td>
                            <td className="text-base font-normal">
                                {data["jumlah_ak_diajukan"]}
                            </td>
                        </tr>

                        <tr>
                            <td>Uraian Tugas</td>
                            <td className="text-base font-normal">
                                {data["uraian_tugas"] ?? '-' }
                            </td>
                        </tr>
                        <tr>
                            <td>Data Pendukung</td>
                            <td className="text-base font-normal">
                                {!data["dokumen_pendukung_path"] ? 'Tidak Ada' :

                                <div>
                                        {/* TODO: Bikin Preview Dokumen disini  */}
                                </div> }
                            </td>
                        </tr>
                        <tr>
                            <td>Catatan Tambahan</td>
                            <td className="text-wrap">
                                {data["catatan"] ? data["catatan"]['isi'] : '-' }
                            </td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td className="p-0 m-0 text-wrap">
                                {
                                    data.status == "diproses" &&
                                    <button
                                    disabled
                                    className="label-base bg-accent/50 text-slate-500"
                                >
                                    diproses
                                    <RiLoader2Fill className="ml-1 scale-125 fill-slate-500 stroke-slate-500 group-hover/item:fill-white" />
                                </button>
                                }
                                {
                                    data.status == "ditolak" &&
                                    <button
                                    disabled
                                    className="inline-flex items-center label-base bg-warning/10 text-warning/80"
                                >
                                    ditolak
                                    <IoClose className="ml-1 scale-150 fill-warning/80 stroke-warning/80 group-hover/item:fill-white" />
                                </button>
                                }
                                {
                                    data.status == "disetujui" &&
                                    <button
                                    disabled
                                    className="inline-flex items-center label-base bg-hijau/10 text-hijau/80"
                                >
                                    disetujui
                                    <IoClose className="ml-1 scale-150 fill-hijau/80 stroke-hijau/80 group-hover/item:fill-white" />
                                </button>
                                }

                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </section>
    );
}
