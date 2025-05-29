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
                            Detail Penetapan Angka Kredit
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
                            <td width="40%">No PAK</td>
                            <td>{data["no_surat3"]}</td>
                        </tr>
                        <tr>
                            <td>Tujuan Penetapan</td>
                            <td>{data["pengusulanPAK"] ? data["pengusulanPAK"]['tujuan'] : '-'  }</td>
                        </tr>
                        <tr>
                            <td>Tanggal Ditetapkan</td>
                            <td>{data.tgl_ditetapkan}</td>
                        </tr>
                        <tr>
                            <td>Periode Mulai</td>
                            <td>{getBulan(data["periode_mulai"])} {data['tahun_periode']}</td>
                        </tr>
                        <tr>
                            <td>Periode Berakhir</td>
                            <td>{getBulan(data["periode_berakhir"])} {data['tahun_periode']}</td>
                        </tr>
                        <tr>
                            <td>Presentase</td>
                            <td>{data["presentase"]}</td>
                        </tr>
                        <tr>
                            <td>Angka Kredit Normatif</td>
                            <td>{data["ak_normatif"]}</td>
                        </tr>
                        <tr>
                            <td>Angka Kredit Terakhir</td>
                            <td>{data["ak_terakhir"]}</td>
                        </tr>
                        <tr>
                            <td>Jumlah Angka Kredit</td>
                            <td>{data["jumlah_ak_kredit"]}</td>
                        </tr>
                        <tr>
                            <td>Jumlah Angka Kredit Kumulatif</td>
                            <td>
                                {parseFloat(data["jakk"]["jumlah"]).toFixed(3)}
                            </td>
                        </tr>
                        <tr>
                            <td>Kesimpulan</td>
                            <td className="text-wrap">{data["kesimpulan"]}</td>
                        </tr>
                    </tbody>
                )}
            </table>
        </section>
    );
}
