import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

export default function DetailData({ data, collapse = true }) {
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
        return bulan[angka]
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
                                [Sembunyikan] <HiBarsArrowUp className="inline mx-2 scale-150" />
                            </span>
                            )}
                        </th>
                    </tr>
                </thead>
                {!isCollapsed && (
                    <tbody>
                        <tr>
                            <td width="40%">Tanggal Pengajuan </td>
                            <td>{data["tanggal_pengajuan"]}</td>
                        </tr>
                        <tr>
                            <td width="40%">Jabatan </td>
                            <td>{data["jabatan"]}</td>
                        </tr>
                        <tr>
                            <td>Periode Penilaian</td>
                            <td>{data.periode_penilaian}</td>
                        </tr>

                        <tr>
                            <td>Jumlah Angka Kredit Terakhir</td>
                            <td>{data["jumlah_ak_terakhir"]}</td>
                        </tr>
                        <tr>
                            <td>Jumlah Angka Kredit Diajukan</td>
                            <td>{data["jumlah_ak_diajukan"]}</td>
                        </tr>

                        <tr>
                            <td>Uraian Tugas</td>
                            <td>{data["uraian_tugas"]}</td>
                        </tr>
                        <tr>
                            <td>Jumlah Angka Kredit Kumulatif</td>
                            <td>
                                {data["dokumen_pendukung_path"]}
                            </td>
                        </tr>
                        <tr>
                            <td>Catatan Tambahan</td>
                            <td className="text-wrap">{data["catatan_pegawai_id"]}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td className="text-wrap">{data["status"]}</td>
                        </tr>
                    </tbody>
                )}
            </table>
        </section>
    );
}
