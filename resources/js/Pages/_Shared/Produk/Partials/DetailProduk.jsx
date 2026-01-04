import React, { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

export default function DetailProduk({ produk, collapse = true }) {
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
                        Detail Produk
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
                {!produk ? (
                    <tr>
                        <td
                            colSpan={2}
                            className="text-base text-center text-warning"
                        >
                            Pilih Nama Produk Terlebih Dahulu!
                        </td>
                    </tr>
                ) : !isCollapsed ? (
                    <>
                        <RowData label="Nama" value={produk.nama_produk} />

                        {/* TODO : Jadiin Dropdown */}
                        <RowData
                            label="Kode Produk"
                            value={produk["kode_produk"] || "-"}
                        />
                        <RowData
                            label="Kategori"
                            value={produk["kategori"] || "-"}
                        />
                        <RowData
                            label="Harga satuan"
                            value={produk["harga_satuan"]}
                        />
                        <RowData
                            label="Komisi Poin"
                            value={produk["komisi_poin"]}
                        />
                        <RowData
                            label="Deskripsi Produk"
                            value={produk["deskripsi_produk"]  ?? "Tidak ada deskripsi"}
                        />
                        {/* TODO : Jadiin Dropdown */}
                        <RowData
                            label="Status"
                            value={produk["status"] || "-"}
                        />
                    </>
                ) : null}
            </tbody>
        </table>
    );
}
