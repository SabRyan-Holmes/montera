import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";
import moment from "moment/min/moment-with-locales";
import { StatusLabel } from "@/Components";

export default function DetailDataTable({
    data,
    collapse = true,
    setLinkIframe,
    setShowIframe,
}) {
    moment.locale("id");
    const [isCollapsed, setIsCollapsed] = useState(collapse);

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    const RowData = ({ label, value }) => (
        <tr>
            <td width="50%">{label}</td>
            <td className="text-base font-normal">{value}</td>
        </tr>
    );
    function formatNIP(nip) {
        if (!nip || nip.length !== 18) return nip; // Validasi

        const part1 = nip.slice(0, 8); // Tanggal lahir
        const part2 = nip.slice(8, 14); // TMT CPNS
        const part3 = nip.slice(14, 15); // Jenis kelamin
        const part4 = nip.slice(15); // Kode urut

        return `${part1} ${part2} ${part3} ${part4}`;
    }
    const fileName = data.approved_pak_path
        ?.split("/")
        .pop()
        .replace(".pdf", "");
    return (
        <table className="table w-full text-base table-bordered">
            <thead
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-lg cursor-pointer select-none bg-primary hover:bg-primary/80"
            >
                <tr>
                    <th colSpan={2}>
                        Detail Pengajuan PAK
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

            <tbody>
                {!isCollapsed && (
                    <>
                        <RowData
                            label="Tanggal Diajukan"
                            value={`${moment(data.created_at).format(
                                "LL"
                            )} (${moment(data.created_at).fromNow()})`}
                        />
                        <tr>
                            <td>Diajukan Oleh</td>
                            <td>
                                <span className="block">
                                    {data.pengaju?.name}
                                </span>
                                <span className="block p-1 mt-1 font-medium rounded-md bg-primary/10">
                                    {data.pengaju?.nip}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td className="p-0 m-0 text-wrap">
                                <StatusLabel status={data.status} />
                            </td>
                        </tr>
                        <tr>
                            <td>Divalidasi Oleh</td>
                            {data.validator ? (
                                <td>
                                    <span className="block">
                                        {data.validator?.nama ?? "-"}
                                    </span>
                                    <span className="block p-1 mt-1 font-medium rounded-md bg-primary/10">
                                        {data.validator?.nip ?? "-"}
                                    </span>
                                </td>
                            ) : (
                                <td>-</td>
                            )}
                        </tr>
                        <RowData
                            label="Riwayat PAK"
                            value={`ID: #${data.riwayat_pak_id} `}
                        />
                        <RowData
                            label="Catatan Dari Pengaju "
                            value={data.catatan_pengaju?.isi ?? "-"}
                        />
                        <RowData
                            label="Catatan Dari Validator "
                            value={data.catatan_validator?.isi ?? "-"}
                        />

                        <tr>
                            <td>Dokumen Tervalidasi</td>
                            <td className="text-base font-normal">
                                {data["approved_pak_path"] ? (
                                    <button
                                        onClick={() => {
                                            setLinkIframe(
                                                `/storage/${data["approved_pak_path"]}`
                                            );
                                            setShowIframe(true);
                                        }}
                                        className="inline-flex items-center justify-start gap-1 text-primary-dark hover:text-primary hover:underline"
                                    >
                                        <FaFilePdf className="w-5 h-5" />
                                        <span className="text-left ">
                                            {`Dokumen-PAK-Tervalidasi.pdf`}
                                        </span>
                                    </button>
                                ) : (
                                    <span className="text-secondary">
                                        Menunggu Validasi..
                                    </span>
                                )}
                            </td>
                        </tr>
                        <RowData
                            label="Tanggal Ditolak"
                            value={
                                data.tanggal_ditolak
                                    ? `${moment(data.tanggal_ditolak).format(
                                          "LL"
                                      )} (${moment(
                                          data.tanggal_ditolak
                                      ).fromNow()})`
                                    : "Belum Pernah Ditolak"
                            }
                        />
                        <RowData
                            label="Tanggal Direvisi"
                            value={
                                data.tanggal_direvisi
                                    ? `${moment(data.tanggal_direvisi).format(
                                          "LL"
                                      )} (${moment(
                                          data.tanggal_direvisi
                                      ).fromNow()})`
                                    : "Belum Pernah Direvisi"
                            }
                        />
                        <RowData
                            label="Tanggal Divalidasi"
                            value={
                                data.tanggal_divalidasi
                                    ? `${moment(data.tanggal_divalidasi).format(
                                          "LL"
                                      )} (${moment(
                                          data.tanggal_divalidasi
                                      ).fromNow()})`
                                    : "Belum Divalidasi"
                            }
                        />
                    </>
                )}
            </tbody>
        </table>
    );
}
