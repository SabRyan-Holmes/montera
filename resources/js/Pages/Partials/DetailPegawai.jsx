import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

export default function DetailPegawai({ pegawai, collapse = true }) {
    const [isCollapsed, setIsCollapsed] = useState(collapse);

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);
    // console.log('isi props Collapse :', collapse )
    // console.log('isi state Collapse :', isCollapsed )
    const RowData = ({ label, value }) => (
        <tr>
            <td width="50%" >{label}</td>
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
    return (
        <table className="table w-full text-base table-bordered">
            <thead
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-lg cursor-pointer select-none bg-primary hover:bg-primary/80"
            >
                <tr>
                    <th colSpan={2}>
                        Detail Pegawai
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
                {!pegawai ? (
                    <tr>
                        <td
                            colSpan={2}
                            className="text-base text-center text-warning"
                        >
                            Pilih Nama Pegawai Terlebih Dahulu!
                        </td>
                    </tr>
                ) : !isCollapsed ? (
                    <>
                        <RowData
                            label="Nama"
                            value={`${pegawai.Nama} ${
                                pegawai["Gelar Tambahan"] ?? ""
                            }`}
                        />
                        <RowData label="NIP/NRP" value={formatNIP(pegawai["NIP"])} />
                        <RowData
                            label="NOMOR SERI KARPEG"
                            value={pegawai["NOMOR SERI KARPEG"] || "-"}
                        />
                        <RowData
                            label="PANGKAT/GOLONGAN RUANGAN/TMT"
                            value={pegawai["Pangkat/Golongan Ruangan/TMT"]}
                        />
                        <RowData
                            label="TEMPAT/TANGGAL LAHIR"
                            value={pegawai["Tempat/Tanggal Lahir"]}
                        />
                        <RowData
                            label="JENIS KELAMIN"
                            value={pegawai["Jenis Kelamin"]}
                        />
                        <RowData
                            label="PENDIDIKAN"
                            value={pegawai["Pendidikan"]}
                        />
                        <RowData
                            label="JABATAN/TMT"
                            value={pegawai["Jabatan/TMT"]}
                        />
                        <RowData
                            label="UNIT KERJA"
                            value={pegawai["Unit Kerja"]}
                        />
                        <RowData
                            label="Gelar Tambahan"
                            value={pegawai["Gelar Tambahan"] || "-"}
                        />
                    </>
                ) : null}
            </tbody>
        </table>
    );
}
