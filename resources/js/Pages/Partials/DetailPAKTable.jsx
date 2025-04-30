import React from "react";

export default function DetailDocument({ document }) {
    return (
        <table className="table text-base table-bordered">
            {/* head */}
            <thead>
                <tr className="text-lg bg-primary/70">
                    <th colSpan={2}>Detail Dokumen PAK</th>
                </tr>
            </thead>
            <tbody >
                {/* row 1 */}
                <tr>
                    <td>Tanggal Ditetapkan</td>
                    <td>{document.tgl_ditetapkan}</td>
                </tr>
                {/* row 2 */}
                <tr>
                    <td>Periode Mulai</td>
                    <td>{document["periode_mulai"]}</td>
                </tr>
                {/* row 3 */}
                <tr>
                    <td>Periode Berakhir</td>
                    <td>{document["periode_berakhir"]}</td>
                </tr>
                <tr>
                    <td>Presentase</td>
                    <td>{document["presentase"]}</td>
                </tr>
                <tr>
                    <td>Angka Kredit Normatif</td>
                    <td>{document["ak_normatif"]}</td>
                </tr>
                <tr>
                    <td>Angka Kredit Terakhir</td>
                    <td>{document["ak_terakhir"]}</td>
                </tr>
                <tr>
                    <td>Jumlah Angka Kredit</td>
                    <td>{document["jumlah_ak_kredit"]}</td>
                </tr>
                <tr>
                    <td>Jumlah Angka Kredit Kumulatif</td>
                    <td>{parseFloat(document["jakk"]["jumlah"]).toFixed(3)}</td>
                </tr>

                <tr>
                    <td>Kesimpulan</td>
                    <td className="text-wrap">{document["kesimpulan"]}</td>
                </tr>
                {/* Nambahin Gelar Tambahan / 10 April 2025 */}
                {/* <tr>
                    <td>Gelar Tambahan</td>
                    <td>
                        {document["Gelar Tambahan"]
                            ? document["Gelar Tambahan"]
                            : "-"}
                    </td>
                </tr> */}
            </tbody>
        </table>
    );
}
