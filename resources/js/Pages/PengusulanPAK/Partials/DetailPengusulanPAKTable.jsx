import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";
import moment from "moment/min/moment-with-locales";
import { RiLoader2Fill } from "react-icons/ri";
import { IoClose, IoCloseOutline } from "react-icons/io5";
import { FaCheck, FaFilePdf } from "react-icons/fa6";
import { StatusLabel } from "@/Components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function PengusulanPAKTable({
    data,
    collapse = true,
    setLinkIframe,
    setShowIframe,
}) {
    moment.locale("id");

    const [isCollapsed, setIsCollapsed] = useState(collapse);

    const _penilaianKinerja = data["dokumen_utama_path"].split("/")[1];
    const _penilaianPendidikan = data["dokumen_pendukung_path"].split("/")[1];

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

    // console.log(setLinkIframe)

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
                            <td width="40%">Tujuan Pengusulan </td>
                            <td className="text-base font-normal">
                                {data["tujuan"]}
                            </td>
                        </tr>
                        <tr>
                            <td>Periode Penilaian</td>
                            <td className="text-base font-normal">
                                {moment(data.periode_mulai).format("MMMM")}{" "}
                                {" - "}{" "}
                                {moment(data.periode_berakhir).format(
                                    "MMMM YYYY"
                                )}{" "}
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
                                    onClick={() => {
                                        setLinkIframe(
                                            `/storage/${data["dokumen_utama_path"]}`
                                        );
                                        setShowIframe(true);
                                    }}
                                    className="inline-flex items-center gap-1 text-primary-dark hover:text-primary hover:underline"
                                >
                                    <FaFilePdf className="w-5 h-5" />
                                    <span className="text-left">{penilaianKinerja}</span>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Dokumen Penilaian Pendidikan</td>
                            <td className="text-base font-normal">
                                {data["dokumen_pendukung_path"] ? (
                                    <button
                                        onClick={() => {
                                            setLinkIframe(
                                                `/storage/${data["dokumen_pendukung_path"]}`
                                            );
                                            setShowIframe(true);
                                        }}
                                        className="inline-flex items-center justify-start gap-1 text-primary-dark hover:text-primary hover:underline"
                                    >
                                        <FaFilePdf className="w-5 h-5" />
                                        <span className="text-left">{penilaianPendidikan}</span>
                                    </button>
                                ) : (
                                    <span>
                                        Tidak Mengajukan Penilaian Pendidikan
                                    </span>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td>Catatan Tambahan</td>
                            <td className="text-wrap">
                                {data["catatan_pegawai"] ? (
                                    <p>{data["catatan_pegawai"]["isi"]}</p>
                                ) : (
                                    "-"
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td className="p-0 m-0 text-wrap">
                                <StatusLabel status={data.status} />
                            </td>
                        </tr>

                        {data.status === "ditolak" && (
                            <tr>
                                <td className="text-warning/80">
                                    Catatan Perbaikan :
                                </td>
                                <td className="text-wrap">
                                    {data["catatan_sdm"] ? (
                                        <p className="block text-red-800">
                                            {data["catatan_sdm"]["isi"]}
                                        </p>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                )}
            </table>
        </section>
    );
}
