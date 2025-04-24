import React from "react";

export default function DetailPegawai({ pegawai }) {
    return (
        <table className="table text-base table-bordered">
            {/* head */}
            <thead>
                <tr className="text-lg bg-primary/70">
                    <th colSpan={2}>Detail Pegawai</th>
                </tr>
            </thead>
            <tbody>
                {/* row 1 */}
                <tr>
                    <td>Nama</td>
                    <td>{pegawai.Nama}</td>
                </tr>
                {/* row 2 */}
                <tr>
                    <td>NIP/NRP</td>
                    <td>{pegawai["NIP"]}</td>
                </tr>
                {/* row 3 */}
                <tr>
                    <td>NOMOR SERI KARPEG</td>
                    <td>{pegawai["NOMOR SERI KARPEG"]}</td>
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
                {/* <tr>
                                <td>MASA KERJA GOLONGAN</td>
                                <td>{pegawai["Masa Kerja Golongan"]}</td>
                            </tr> */}
                <tr>
                    <td>UNIT KERJA</td>
                    <td>{pegawai["Unit Kerja"]}</td>
                </tr>
                {/* Nambahin Gelar Tambahan / 10 April 2025 */}
                <tr>
                    <td>Gelar Tambahan</td>
                    <td>
                        {pegawai["Gelar Tambahan"]
                            ? pegawai["Gelar Tambahan"]
                            : "-"}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
