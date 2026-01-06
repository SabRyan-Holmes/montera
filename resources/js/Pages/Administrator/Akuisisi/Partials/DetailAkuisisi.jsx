import { usePage } from "@inertiajs/react";
import moment from "moment";
import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

export default function DetailAkuisisi({ akuisisi, collapse = true }) {
    const [isCollapsed, setIsCollapsed] = useState(collapse);
    const RowData = ({ label, value }) => (
        <tr>
            <td width="50%">{label}</td>
            <td className="text-base font-normal">{value}</td>
        </tr>
    );
    moment.locale("id");

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

                        {/* Tanggal Akuisisi */}
                        <RowData
                            label="Tanggal Akuisisi"
                            value={
                                akuisisi.tanggal_akuisisi
                                    ? moment(akuisisi.tanggal_akuisisi).format(
                                          "LL"
                                      )
                                    : "-"
                            }
                        />

                        {/* Status */}
                        <RowData
                            label="Status Verifikasi"
                            value={akuisisi.status_verifikasi ?? "-"}
                        />

                        {/* Verifikator */}
                        <RowData
                            label="Verifikator"
                            value={akuisisi.verifikator?.name ?? "-"}
                        />

                        {/* Last Updated */}
                        <RowData
                            label="Terakhir Diperbarui"
                            value={
                                akuisisi.updated_at
                                    ? `${moment(akuisisi.updated_at).format(
                                          "LL"
                                      )} (${moment(
                                          akuisisi.updated_at
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
