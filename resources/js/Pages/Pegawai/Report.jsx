import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";

export default function Report({
    auth,
    title,
    matrix,
    columns,
    columnTotals,
    grandTotal,
    filters,
}) {
    const [filter, setFilter] = useState({
        mode: filters.mode,
        month: filters.month,
        year: filters.year,
    });

    // --- LOGIC SCROLLBAR SYNC (SAMA SEPERTI SEBELUMNYA) ---
    const tableContainerRef = useRef(null);
    const topScrollRef = useRef(null);
    const [tableWidth, setTableWidth] = useState(0);

    useEffect(() => {
        if (tableContainerRef.current) {
            setTableWidth(tableContainerRef.current.scrollWidth);
        }
    }, [matrix, columns, filter.mode]);

    const handleTopScroll = (e) => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollLeft = e.target.scrollLeft;
        }
    };

    const handleTableScroll = (e) => {
        if (topScrollRef.current) {
            topScrollRef.current.scrollLeft = e.target.scrollLeft;
        }
    };
    // -----------------------------------------------------

    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1, currentYear - 2,  currentYear - 3,  currentYear - 4] ;
    const months = [
        { v: 1, l: "Januari" }, { v: 2, l: "Februari" }, { v: 3, l: "Maret" },
        { v: 4, l: "April" }, { v: 5, l: "Mei" }, { v: 6, l: "Juni" },
        { v: 7, l: "Juli" }, { v: 8, l: "Agustus" }, { v: 9, l: "September" },
        { v: 10, l: "Oktober" }, { v: 11, l: "November" }, { v: 12, l: "Desember" },
    ];

    const handleChange = (key, value) => {
        const newFilter = { ...filter, [key]: value };
        setFilter(newFilter);
        router.get(route("pegawai.report"), newFilter, {
            preserveState: true,
            preserveScroll: true,
            only: ["matrix", "columns", "columnTotals", "grandTotal", "filters"],
        });
    };

    return (
        <Authenticated user={auth.user} title={title}>
            <Head title={title} />

            <section className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                {/* --- FILTER BAR (JUSTIFY BETWEEN) --- */}
                {/* Container utama pakai 'justify-between' untuk memisah Kiri dan Kanan */}
                <div className="flex flex-col justify-between gap-4 p-5 mb-6 bg-white border border-gray-200 shadow md:flex-row md:items-end rounded-xl">

                    {/* --- BAGIAN KIRI: TOGGLE MODE --- */}
                    <div className="form-control">
                        <span className="mb-2 text-xs font-bold tracking-wide text-gray-500 uppercase">
                            Tampilan Laporan
                        </span>
                        <div className="join">
                            <button
                                className={`btn join-item px-6 ${
                                    filter.mode === "daily"
                                        ? "bg-secondary text-white hover:bg-slate-700 border-slate-800"
                                        : "btn-outline border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                }`}
                                onClick={() => handleChange("mode", "daily")}
                            >
                                Harian
                            </button>
                            <button
                                className={`btn join-item px-6 ${
                                    filter.mode === "monthly"
                                        ? "bg-secondary text-white hover:bg-slate-700 border-slate-800"
                                        : "btn-outline border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                }`}
                                onClick={() => handleChange("mode", "monthly")}
                            >
                                Bulanan
                            </button>
                        </div>
                    </div>

                    {/* --- BAGIAN KANAN: GROUP BULAN & TAHUN --- */}
                    {/* Kita bungkus dalam div flex agar mereka nempel bareng di kanan */}
                    <div className="flex flex-wrap items-end gap-4">

                        {/* Filter Bulan (Hanya muncul jika mode Daily) */}
                        {filter.mode === "daily" && (
                            <div className="form-control">
                                <span className="mb-2 text-xs font-bold tracking-wide text-gray-500 uppercase">
                                    Bulan
                                </span>
                                <select
                                    className="w-40 text-gray-800 bg-white select select-bordered focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                                    value={filter.month}
                                    onChange={(e) => handleChange("month", e.target.value)}
                                >
                                    {months.map((m) => (
                                        <option key={m.v} value={m.v}>
                                            {m.l}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Filter Tahun */}
                        <div className="form-control">
                            <span className="mb-2 text-xs font-bold tracking-wide text-gray-500 uppercase">
                                Tahun
                            </span>
                            <select
                                className="w-32 text-gray-800 bg-white select select-bordered focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                                value={filter.year}
                                onChange={(e) => handleChange("year", e.target.value)}
                            >
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* --- TABEL MATRIX --- */}
                {/* Tambahkan overflow-hidden dan rounded-xl di wrapper utama */}
                <div className="flex flex-col overflow-hidden bg-white border border-gray-300 shadow-xl rounded-xl">

                    {/* Dummy Scrollbar (Hanya Harian) */}
                    {filter.mode === 'daily' && (
                        <div
                            ref={topScrollRef}
                            onScroll={handleTopScroll}
                            className="flex-shrink-0 overflow-x-auto border-b border-gray-200 custom-scrollbar"
                            style={{ height: '20px' }}
                        >
                            <div style={{ width: tableWidth, height: '1px' }}></div>
                        </div>
                    )}

                    {/* Tabel Container */}
                    <div
                        ref={tableContainerRef}
                        onScroll={handleTableScroll}
                        className="overflow-x-auto"
                    >
                        <table className="table w-full border-collapse border-secondary table-xs table-pin-rows table-pin-cols">
                            <thead>
                                <tr className="text-center text-white bg-secondary">

                                    {/* FIX ROUNDED: Sudut Kiri Atas (rounded-tl-xl) */}
                                    <th className="sticky left-0 z-20 w-12 text-base border-r border-slate-600 bg-secondary rounded-tl-xl" height="40">
                                        No
                                    </th>

                                    <th className="sticky left-12 z-20 min-w-[250px] text-lg text-left border-r border-slate-600 bg-secondary px-4">
                                        Produk
                                    </th>

                                    {columns.map((col) => (
                                        <th key={col.key} className="min-w-[45px] border border-secondary/35 px-1 font-bold text-secondary">
                                            {col.label}
                                        </th>
                                    ))}

                                    {/* FIX ROUNDED: Sudut Kanan Atas (rounded-tr-xl) */}
                                    {/* Kita paksa rounded disini agar saat mode bulanan (tidak scroll) sudutnya tetap tumpul */}
                                    <th className="sticky right-0 z-20 min-w-[80px] border-l border-slate-600 bg-secondary font-extrabold text-yellow-400 rounded-tr-xl">
                                        TOTAL
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="text-gray-900">
                                {matrix && matrix.length > 0 ? (
                                    matrix.map((row, idx) => (
                                        <tr key={row.produk_id} className="text-center border-b hover:bg-primary/30">
                                            <td className="sticky left-0 text-base font-bold border border-secondary/20 ">{idx + 1}</td>
                                            <td className="sticky left-12  text-left font-semibold text-gray-800 truncate max-w-[250px]  px-4" title={row.nama_produk}>
                                                <div className="flex flex-col py-1">
                                                    <span className="text-sm">{row.nama_produk}</span>
                                                    <span className="text-[10px] text-gray-500 font-normal uppercase tracking-wide">{row.kategori}</span>
                                                </div>
                                            </td>
                                            {columns.map((col) => {
                                                const val = row.cells[col.key];
                                                return (
                                                    <td key={col.key} className={`border-r border-secondary/10 text-[11px] ${val > 0 ? "bg-green-100 text-green-800 font-bold" : "text-gray-400"}`}>
                                                        {val > 0 ? val : "-"}
                                                    </td>
                                                );
                                            })}
                                            <td className="sticky right-0 font-bold text-blue-900 bg-blue-100 border-l border-gray-300">{row.total}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={columns.length + 3} className="py-10 text-center text-gray-500 bg-gray-50">Data tidak ditemukan.</td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr className="text-sm font-bold text-center text-gray-800 bg-gray-200 border-t-2 border-gray-400">
                                    <td className="sticky left-0 z-10 bg-gray-200 border-r border-gray-400 rounded-bl-xl text-primary" colSpan={2}>GRAND TOTAL</td>
                                    {columns.map((col) => (
                                        <td key={col.key} className="text-gray-900 border-r border-gray-300">
                                            {columnTotals[col.key] > 0 ? columnTotals[col.key] : ""}
                                        </td>
                                    ))}
                                    <td className="sticky right-0 z-10 text-white border-l border-gray-400 bg-secondary rounded-br-xl">{grandTotal}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div className="pb-20 mt-4 text-xs font-medium text-gray-500">
                    * Menampilkan rekapitulasi akuisisi produk dengan status verifikasi: Verified <span className="font-bold text-green-600">(Transaksi Sah)</span>.
                </div>
            </section>
        </Authenticated>
    );
}
