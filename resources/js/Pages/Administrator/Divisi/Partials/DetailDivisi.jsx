import moment from "moment";
import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

export default function DetailDivisi({ divisi, collapse = true }) {
    const [isCollapsed, setIsCollapsed] = useState(collapse);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);
    const RowData = ({ label, value }) => (
        <tr>
            <td width="50%">{label}</td>
            <td className="text-base font-normal">{value}</td>
        </tr>
    );

    return (
        <table className="table w-full text-base table-bordered">
            <thead
                onClick={toggleCollapse}
                className="text-lg cursor-pointer select-none bg-primary hover:bg-primary/80"
            >
                <tr>
                    <th colSpan={2}>
                        Detail Divisi
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
                {!divisi ? (
                    <tr>
                        <td
                            colSpan={2}
                            className="text-base text-center text-warning"
                        >
                            Pilih Nama Divisi Terlebih Dahulu!
                        </td>
                    </tr>
                ) : !isCollapsed ? (
                    <>
                        <RowData
                            label="Nama Divisi"
                            value={divisi["nama_divisi"]}
                        />

                        <RowData
                            label="Kode Divisi"
                            value={divisi["kode_divisi"]}
                        />

                        <RowData
                            label="Lokasi Lantai"
                            value={divisi["lokasi_lantai"] ?? "-"}
                        />

                        <RowData
                            label="Kepala Divisi"
                            value={divisi["kepala_divisi"] ?? "-"}
                        />

                        <RowData
                            label="Tanggal Dibuat"
                            value={moment(divisi["created_at"]).format("LL")}
                        />

                        <RowData
                            label="Terakhir Diperbarui"
                            value={moment(divisi["updated_at"]).format("LL")}
                        />
                    </>
                ) : null}
            </tbody>
        </table>
    );
}
