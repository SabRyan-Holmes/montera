import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

export default function DetailIndikator({ indikator, collapse = true }) {
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
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-lg cursor-pointer select-none bg-primary hover:bg-primary/80"
            >
                <tr>
                    <th colSpan={2}>
                        Detail Indikator
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
                {!indikator ? (
                    <tr>
                        <td
                            colSpan={2}
                            className="text-base text-center text-warning"
                        >
                            Pilih Nama Indikator Terlebih Dahulu!
                        </td>
                    </tr>
                ) : !isCollapsed ? (
                    <>
                        <RowData
                            label="Nama KPI/Indikator"
                            value={indikator["nama_kpi"] || "-"}
                        />
                        <RowData
                            label="Satuan"
                            value={indikator["satuan"] || "-"}
                        />
                        <RowData
                            label="Bobot Nilai"
                            value={indikator["bobot_nilai"]}
                        />
                        <RowData
                            label="Target Minimal"
                            value={indikator["target_minimal"]}
                        />
                        <RowData
                            label="Metode Perhitungan"
                            value={
                                indikator["metode_perhitungan"] ??
                                "Tidak ada deskripsi"
                            }
                        />
                    </>
                ) : null}
            </tbody>
        </table>
    );
}
