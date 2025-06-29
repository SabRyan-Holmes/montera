import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";
import moment from "moment/min/moment-with-locales";
import { StatusLabel } from "@/Components";
import { FaFilePdf } from "react-icons/fa6";

export default function PengusulanPAKTable({
    data,
    collapse = true,
    showIframeWithFile,
}) {
    moment.locale("id");

    const [isCollapsed, setIsCollapsed] = useState(collapse);

    const penilaianKinerja = `${formatNIP(
        data.pegawai["NIP"]
    )} - Penilaian-Kinerja.pdf`;
    const penilaianPendidikan = `${formatNIP(
        data.pegawai["NIP"]
    )} - Penilaian-Pendidikan.pdf`;
    function formatNIP(nip) {
        if (!nip || nip.length !== 18) return nip; // Validasi

        const part1 = nip.slice(0, 8); // Tanggal lahir
        const part2 = nip.slice(8, 14); // TMT CPNS
        const part3 = nip.slice(14, 15); // Jenis kelamin
        const part4 = nip.slice(15); // Kode urut

        return `${part1} ${part2} ${part3} ${part4}`;
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
                                    [Sembunyikan]
                                    <HiBarsArrowUp className="inline mx-2 scale-150" />
                                </span>
                            )}
                        </th>
                    </tr>
                </thead>
                {!isCollapsed && (
                    <tbody>
                        <tr>
                            <td width="50%">Tanggal Pengusulan</td>
                            <td className="text-base font-normal">
                                {moment(data.created_at).format("LL")} (
                                {moment(data.created_at).fromNow()})
                            </td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td className="p-0 m-0 text-wrap">
                                <StatusLabel status={data.status} />
                            </td>
                        </tr>

                        <tr>
                            <td>Tujuan Pengusulan </td>
                            <td className="text-base font-normal">
                                {data["tujuan"]}
                            </td>
                        </tr>
                        <tr>
                            <td>Periode Penilaian</td>
                            <td className="text-base font-normal">
                                {moment(data.periode_mulai).format("MMMM")}
                                {" - "}
                                {moment(data.periode_berakhir).format(
                                    "MMMM YYYY"
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td>Angka Kredit Terakhir</td>
                            <td className="text-base font-normal">
                                {data["ak_terakhir"]}
                            </td>
                        </tr>
                        <tr>
                            <td>Angka Kredit Diajukan</td>
                            <td className="text-base font-normal">
                                {data["ak_diajukan"]}
                            </td>
                        </tr>

                        <tr>
                            <td>Dokumen Penilaian Kinerja</td>
                            <td className="text-base font-normal">
                                <button
                                    onClick={() =>
                                        showIframeWithFile(
                                            data["dokumen_utama_path"]
                                        )
                                    }
                                    className="inline-flex items-center gap-1 text-primary-dark hover:text-primary hover:underline"
                                >
                                    <FaFilePdf className="w-5 h-5" />
                                    <span className="text-left">
                                        {penilaianKinerja}
                                    </span>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Dokumen Penilaian Pendidikan</td>
                            <td className="text-base font-normal">
                                {data["dokumen_pendukung_path"] ? (
                                    <button
                                        onClick={() =>
                                            showIframeWithFile(
                                                data["dokumen_pendukung_path"]
                                            )
                                        }
                                        className="inline-flex items-center justify-start gap-1 text-primary-dark hover:text-primary hover:underline"
                                    >
                                        <FaFilePdf className="w-5 h-5" />
                                        <span className="text-left">
                                            {penilaianPendidikan}
                                        </span>
                                    </button>
                                ) : (
                                    <span>
                                        Tidak Mengajukan Penilaian Pendidikan
                                    </span>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td>Catatan Pengusul</td>
                            <td className="text-wrap">
                                {data["catatan_pengusul"] ? (
                                    <p>{data["catatan_pengusul"]["isi"]}</p>
                                ) : (
                                    "-"
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td>Catatan Validator</td>
                            <td className="text-wrap">
                                {data["catatan_validator"] ? (
                                    <p className="block ">
                                        {data["catatan_validator"]["isi"]}
                                    </p>
                                ) : (
                                    "-"
                                )}
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </section>
    );
}
