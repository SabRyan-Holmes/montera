import { StatusLabel } from "@/Components";
import moment from "moment/min/moment-with-locales";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";
import { getFileUrl, getFileName } from "@/Utils/fileUtils";
export default function DetailAkuisisi({ akuisisi, collapse = true }) {
    moment.locale("id");
    const [isCollapsed, setIsCollapsed] = useState(collapse);
    const RowData = ({ label, value }) => (
        <tr>
            <td width="50%">{label}</td>
            <td className="text-base font-normal">{value}</td>
        </tr>
    );



    return (
        <table className="table w-full text-base table-bordered">
            <thead
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-lg cursor-pointer select-none bg-primary hover:bg-primary/80"
            >
                <tr>
                    <th colSpan={2}>
                        Detail Akuisisi
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

            <tbody>
                {!akuisisi ? (
                    <tr>
                        <td
                            colSpan={2}
                            className="text-base text-center text-warning"
                        >
                            Pilih Data Akuisisi Terlebih Dahulu!
                        </td>
                    </tr>
                ) : !isCollapsed ? (
                    <>
                        {/* Pegawai */}
                        <RowData
                            label="Pegawai"
                            value={akuisisi.pegawai?.name ?? "-"}
                        />

                        {/* Produk */}
                        <RowData
                            label="Produk"
                            value={akuisisi.produk?.nama_produk ?? "-"}
                        />

                        {/* Nasabah */}
                        <RowData
                            label="Nama Nasabah"
                            value={akuisisi.nama_nasabah ?? "-"}
                        />

                        <RowData
                            label="No Identitas Nasabah"
                            value={akuisisi.no_identitas_nasabah ?? "-"}
                        />

                        {/* Nominal */}
                        <RowData
                            label="Nominal Realisasi"
                            value={akuisisi.nominal_realisasi ?? "-"}
                        />

                        {/* --- LAMPIRAN BUKTI (NEW) --- */}
                        <tr>
                            <td>Lampiran Bukti</td>
                            <td className="text-base font-normal">
                                {akuisisi.lampiran_bukti ? (
                                    <a
                                        href={getFileUrl(
                                            akuisisi.lampiran_bukti,
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                                        title="Buka File PDF"
                                    >
                                        <FaFilePdf className="w-4 h-4" />
                                        <span>
                                            {getFileName(
                                                akuisisi.lampiran_bukti,
                                            )}
                                        </span>
                                        <FaExternalLinkAlt className="w-3 h-3 ml-1 opacity-50" />
                                    </a>
                                ) : (
                                    <span className="italic text-gray-400">
                                        - Tidak ada lampiran -
                                    </span>
                                )}
                            </td>
                        </tr>

                        {/* Tanggal Akuisisi */}
                        <RowData
                            label="Tanggal Akuisisi"
                            value={
                                akuisisi.tanggal_akuisisi
                                    ? moment(akuisisi.tanggal_akuisisi).format(
                                          "LL",
                                      )
                                    : "-"
                            }
                        />

                        {/* Status */}

                        <tr>
                            <td>Status</td>
                            <td className="text-base font-normal ">
                                <div className="-ml-3">
                                    <StatusLabel
                                        status={akuisisi.status_verifikasi}
                                    />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>Catatan Revisi</td>
                            <td className="text-base font-normal ">
                                <span className="italic text-gray-400">
                                    - Belum Ada Catatan -
                                </span>
                            </td>
                        </tr>

                        <RowData
                            label="Status Verifikasi"
                            value={akuisisi.status_verifikasi ?? "-"}
                        />

                        {/* Verifikator */}
                        <RowData
                            label="Diajukan Kepada Supervisor"
                            value={akuisisi.supervisor?.name ?? "-"}
                        />

                        {/* Verifikator */}
                        <RowData
                            label="Verifikator"
                            value={akuisisi.verifikator?.name ?? "-"}
                        />

                        {/* Last Updated */}
                        <RowData
                            label="Tanggal Dibuat"
                            value={
                                akuisisi.created_at
                                    ? `${moment(akuisisi.created_at).format(
                                          "LL",
                                      )} (${moment(
                                          akuisisi.created_at,
                                      ).fromNow()})`
                                    : "-"
                            }
                        />
                        <RowData
                            label="Terakhir Diperbarui"
                            value={
                                akuisisi.updated_at
                                    ? `${moment(akuisisi.updated_at).format(
                                          "LL",
                                      )} (${moment(
                                          akuisisi.updated_at,
                                      ).fromNow()})`
                                    : "-"
                            }
                        />
                    </>
                ) : null}
            </tbody>
        </table>
    );
}
