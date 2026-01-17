import moment from "moment/min/moment-with-locales";
import { useState } from "react";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";

export default function DetailTransaksi({ transaksi, collapse = true }) {
    const [isCollapsed, setIsCollapsed] = useState(collapse);
    moment.locale("id");

    // Helper Rupiah Sederhana
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka);
    };

    // Component Baris Sederhana (Tanpa CSS Flex/Grid yang rumit)
    const RowData = ({ label, value }) => (
        <tr>
            <td className="font-semibold bg-gray-50" width="35%">
                {label}
            </td>
            <td className="text-base">{value}</td>
        </tr>
    );

    return (
        <table className="table w-full text-base table-bordered">
            {/* --- HEADER (Toggle) --- */}
            <thead
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-white cursor-pointer select-none bg-primary hover:bg-primary/90"
            >
                <tr>
                    <th colSpan={2} className="text-lg">
                        Detail Transaksi Lengkap
                        <span className="flex items-center float-right gap-1 mt-1 text-sm font-normal">
                            {isCollapsed ? "[Tampilkan]" : "[Sembunyikan]"}
                            {isCollapsed ? (
                                <HiBarsArrowDown />
                            ) : (
                                <HiBarsArrowUp />
                            )}
                        </span>
                    </th>
                </tr>
            </thead>

            {/* --- BODY (Data Mapping) --- */}
            <tbody>
                {!transaksi ? (
                    <tr>
                        <td
                            colSpan={2}
                            className="py-4 text-center text-gray-500"
                        >
                            Data transaksi tidak tersedia.
                        </td>
                    </tr>
                ) : !isCollapsed ? (
                    <>
                        {/* 1. Nama & NIP Pegawai */}
                        <RowData
                            label="Pegawai"
                            value={
                                <>
                                    <div className="font-bold">
                                        {transaksi.pegawai?.name ?? "-"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        NIP: {transaksi.pegawai?.nip ?? "-"}
                                    </div>
                                </>
                            }
                        />

                        {/* 2. Nama & Kode Produk */}
                        <RowData
                            label="Produk"
                            value={
                                <>
                                    <div className="font-bold">
                                        {transaksi.produk?.nama_produk ?? "-"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Kode:{" "}
                                        {transaksi.produk?.kode_produk ?? "-"}
                                    </div>
                                </>
                            }
                        />

                        {/* 3. Kategori Produk */}
                        <RowData
                            label="Kategori"
                            value={transaksi.produk?.kategori_produk ?? "-"}
                        />

                        {/* 4. Nasabah (Dari relasi Akuisisi) */}
                        <RowData
                            label="Nasabah"
                            value={
                                <>
                                    <div className="font-bold">
                                        {transaksi.akuisisi?.nama_nasabah ??
                                            "-"}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        ID:{" "}
                                        {transaksi.akuisisi
                                            ?.no_identitas_nasabah ?? "-"}
                                    </div>
                                </>
                            }
                        />

                        {/* 5. Nilai Realisasi */}
                        <RowData
                            label="Nilai Realisasi"
                            value={
                                <span className="font-bold text-emerald-700">
                                    {formatRupiah(
                                        transaksi.nilai_realisasi ?? 0,
                                    )}
                                </span>
                            }
                        />

                        {/* 6. Poin */}
                        <RowData
                            label="Poin"
                            value={
                                <span className="font-bold text-amber-600">
                                    {transaksi.poin_didapat ?? 0} Poin
                                </span>
                            }
                        />

                        {/* 7. Tanggal Realisasi */}
                        <RowData
                            label="Tanggal Realisasi"
                            value={moment(
                                transaksi.tanggal_realisasi ??
                                    transaksi.tanggal_akuisisi,
                            ).format("dddd, D MMMM YYYY")}
                        />

                        {/* Tambahan: Created At & Updated At */}
                        <RowData
                            label="Dibuat Pada"
                            value={moment(transaksi.created_at).format(
                                "D MMM YYYY, HH:mm",
                            )}
                        />
                        <RowData
                            label="Terakhir Update"
                            value={moment(transaksi.updated_at).fromNow()}
                        />
                    </>
                ) : null}
            </tbody>
        </table>
    );
}
