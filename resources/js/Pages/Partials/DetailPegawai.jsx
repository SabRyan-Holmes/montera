import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

export default function DetailPegawai({ pegawai , collapse = true}) {
    const [isCollapsed, setIsCollapsed] = useState(collapse);

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);
    // console.log('isi props Collapse :', collapse )
    // console.log('isi state Collapse :', isCollapsed )
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
                                [Sembunyikan] <HiBarsArrowUp className="inline mx-2 scale-150" />
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
                        <tr>
                            <td>Nama</td>
                            <td>{pegawai.Nama}</td>
                        </tr>
                        <tr>
                            <td>NIP/NRP</td>
                            <td>{pegawai["NIP"]}</td>
                        </tr>
                        <tr>
                            <td>NOMOR SERI KARPEG</td>
                            <td>{pegawai["NOMOR SERI KARPEG"] || "-"}</td>
                        </tr>
                        <tr>
                            <td>PANGKAT/GOLONGAN/TMT</td>
                            <td>{pegawai["Pangkat/Golongan Ruangan/TMT"]}</td>
                        </tr>
                        <tr>
                            <td>TEMPAT/TANGGAL LAHIR</td>
                            <td>{pegawai["Tempat/Tanggal Lahir"]}</td>
                        </tr>
                        <tr>
                            <td>JENIS KELAMIN</td>
                            <td>{pegawai["Jenis Kelamin"]}</td>
                        </tr>
                        <tr>
                            <td>PENDIDIKAN</td>
                            <td>{pegawai["Pendidikan"]}</td>
                        </tr>
                        <tr>
                            <td>JABATAN/TMT</td>
                            <td>{pegawai["Jabatan/TMT"]}</td>
                        </tr>
                        <tr>
                            <td>UNIT KERJA</td>
                            <td>{pegawai["Unit Kerja"]}</td>
                        </tr>
                        <tr>
                            <td>Gelar Tambahan</td>
                            <td>{pegawai["Gelar Tambahan"] || "-"}</td>
                        </tr>
                    </>
                ) : null}
            </tbody>
        </table>

    );
}
