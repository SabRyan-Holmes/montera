import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";
import moment from "moment/min/moment-with-locales";
import { RiLoader2Fill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { StatusLabel } from "@/Components";

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
                            <td width="40%">Tujuan Pengusulan </td>
                            <td className="text-base font-normal">
                                {data["tujuan"]}
                            </td>
                        </tr>
                        <tr>
                            <td>Periode Penilaian</td>
                            <td className="text-base font-normal">
                            {moment(data.periode_mulai).format('MMMM')} - {moment(data.periode_berakhir).format('MMMM YYYY')}                            </td>
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
                                {data["catatan_pegawai"] ? <p>{data["catatan_pegawai"]['isi']}</p> : '-' }
                            </td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td className="p-0 m-0 text-wrap">
                               <StatusLabel status={data.status} />
                            </td>
                        </tr>

                        {data.status === "ditolak" &&
                            <tr>
                            <td className="text-warning/80">Catatan Perbaikan :</td>
                            <td className="text-wrap">
                                {data["catatan_sdm"] ?
                                <p className="block text-red-800">
                                {data["catatan_sdm"]['isi']}
                                </p>
                                : '-' }
                            </td>
                        </tr>
                        }
                    </tbody>
                )}
            </table>
        </section>
    );
}
