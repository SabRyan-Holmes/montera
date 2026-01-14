import moment from "moment";
import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

export default function DetailTarget({ target, collapse = true }) {
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
                        Detail Jabatan
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
                {!target ? (
                    <tr>
                        <td
                            colSpan={2}
                            className="text-base text-center text-warning"
                        >
                            Pilih Nama Jabatan Terlebih Dahulu!
                        </td>
                    </tr>
                ) : !isCollapsed ? (
                    <>
                        {/* TODO lengkapi */}
                        {/* <RowData
                            label="Nama Jabatan"
                            value={target["nama_target"]}
                        />

                        <RowData
                            label="Jabatan"
                            value={target["kode_target"]}
                        />
                        <RowData
                            label="Divisi"
                            value={target["level_otoritas"]}
                        />
                        <RowData
                            label="Deskripsi Tugas"
                            value={target["deskripsi_tugas"]}
                        />
                        <RowData
                            label="Tanggal Dibuat"
                            value={moment(target["created_at"]).format("LL")}
                        />
                        <RowData
                            label="Terakhir Diperbarui"
                            value={moment(target["updated_at"]).format("LL")}
                        /> */}
                    </>
                ) : null}
            </tbody>
        </table>
    );
}
