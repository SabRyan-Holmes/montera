import moment from "moment";
import { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

export default function DetailTransaksi({ transaksi, collapse = true }) {
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
                        Detail Transaksi
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
                {!transaksi ? (
                    <tr>
                        <td
                            colSpan={2}
                            className="text-base text-center text-warning"
                        >
                            Pilih Data Transaksi Terlebih Dahulu!
                        </td>
                    </tr>
                ) : !isCollapsed ? (
                    <>
                        {/* Pegawai */}
                        <RowData
                            label="Pegawai"
                            value={transaksi.pegawai?.name ?? "-"}
                        />



                        {/* Last Updated */}
                        <RowData
                            label="Terakhir Diperbarui"
                            value={
                                transaksi.updated_at
                                    ? `${moment(transaksi.updated_at).format(
                                          "LL"
                                      )} (${moment(
                                          transaksi.updated_at
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
