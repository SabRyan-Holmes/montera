import { usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

export default function DetailUser({ user, collapse = true }) {
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
                        Detail User
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
                {!user ? (
                    <tr>
                        <td
                            colSpan={2}
                            className="text-base text-center text-warning"
                        >
                            Pilih Nama User Terlebih Dahulu!
                        </td>
                    </tr>
                ) : !isCollapsed ? (
                    <>
                        <RowData label="Nama" value={user.name} />

                        <RowData label="NIP" value={user["nip"]} />
                        <RowData
                            label="Jabatan"
                            value={user["jabatan"]["nama_jabatan"]}
                        />
                        <RowData
                            label="Divisi"
                            value={user.divisi?.["nama_divisi"]}
                        />
                        <RowData label="email" value={user["email"]} />
                        <RowData
                            label="Status Aktif"
                            value={user["status_aktif"]}
                        />
                    </>
                ) : null}
            </tbody>
        </table>
    );
}
