import { HiShieldCheck, HiLightningBolt, HiDocumentReport, HiTrendingUp } from "react-icons/hi";
import { HiCheckBadge } from "react-icons/hi2";

export default function ReportContent({ reportData }) {

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(angka);
    };

    const formatCompact = (number) => {
        return new Intl.NumberFormat('id-ID', { notation: "compact", compactDisplay: "short", style: "currency", currency: "IDR" }).format(number);
    };

    const topProducts = reportData?.top_products || [];
    const recentTrx = reportData?.recent_transactions || [];

    return (
        <section className="px-8 py-32 border-t bg-slate-50 border-slate-200">
            <div className="mx-auto max-w-7xl">

                {/* 1. HEADER SECTION (Tetap sama, bagus untuk marketing) */}
                <div className="mb-16 text-center">
                    <span className="text-[#c5a059] font-bold tracking-widest text-xs uppercase bg-orange-50 px-4 py-2 rounded-full border border-orange-100">
                        Transparency & Integrity
                    </span>
                    <h2 className="text-4xl font-black text-[#001f3f] mt-6 mb-4">
                        Laporan Kinerja Terpadu
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-slate-500">
                        Data kinerja valid yang diperbarui secara real-time untuk transparansi operasional Bank XYZ.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

                    {/* LEFT COLUMN: TOP PRODUCTS (Market Leader) */}
                    <div className="flex flex-col lg:col-span-5">
                        <div className="bg-white rounded-[24px] border border-slate-200 shadow-lg p-6 h-full">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#001f3f] flex items-center gap-2">
                                    <HiTrendingUp className="text-[#c5a059]" />
                                    Produk Terlaris
                                </h3>
                                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded">Bulan Ini</span>
                            </div>

                            <div className="space-y-4">
                                {topProducts.map((prod, idx) => (
                                    <div key={idx} className="group">
                                        <div className="flex justify-between mb-1 text-sm">
                                            <span className="font-bold text-slate-700">{prod.nama_produk}</span>
                                            <span className="text-[#001f3f] font-bold">{formatCompact(prod.total_nominal)}</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-[#001f3f] to-[#003366] h-2.5 rounded-full transition-all duration-1000"
                                                style={{ width: `${Math.max(15, Math.min(100, (prod.total_qty * 2)))}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-1 text-right">{prod.total_qty} Transaksi</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: TABEL LAPORAN (Mirip Screenshot Laporan Sah) */}
                    <div className="flex flex-col lg:col-span-7">
                        <div className="bg-white rounded-[24px] border border-slate-200 shadow-xl overflow-hidden h-full flex flex-col">

                            {/* Header Panel */}
                            <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-slate-100">
                                <div>
                                    <h3 className="text-lg font-black text-[#001f3f]">Live Transaction Feed</h3>
                                    <p className="text-xs text-slate-400">Data masuk terakhir: {reportData?.last_update}</p>
                                </div>
                                <div className="flex items-center gap-2 animate-pulse">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span className="text-xs font-bold text-green-600 uppercase">Online</span>
                                </div>
                            </div>

                            {/* TABEL DATA (Style mirip Laporan Sah) */}
                            <div className="flex-grow overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#001f3f] text-white">
                                            <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-blue-200">Waktu</th>
                                            <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-blue-200">Pegawai</th>
                                            <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-blue-200">Produk</th>
                                            <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-blue-200 text-right">Nilai</th>
                                            <th className="py-3 px-4 text-[10px] font-bold uppercase tracking-wider text-blue-200 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {recentTrx.map((item, idx) => (
                                            <tr key={idx} className="text-sm transition-colors hover:bg-blue-50/30">
                                                {/* Waktu & Tanggal */}
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-[#001f3f]">{item.waktu}</span>
                                                        <span className="text-[10px] text-slate-400">{item.tanggal}</span>
                                                    </div>
                                                </td>

                                                {/* Pegawai */}
                                                <td className="px-4 py-3">
                                                    <div className="font-bold text-slate-700">{item.pegawai}</div>
                                                    <div className="text-[10px] text-slate-400">{item.unit}</div>
                                                </td>

                                                {/* Produk */}
                                                <td className="px-4 py-3">
                                                    <span className="inline-block px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-600 text-[11px] font-semibold">
                                                        {item.produk}
                                                    </span>
                                                </td>

                                                {/* Nilai */}
                                                <td className="py-3 px-4 text-right font-bold text-[#001f3f]">
                                                    {item.nominal > 0 ? formatRupiah(item.nominal) : '-'}
                                                </td>

                                                {/* Status (Mirip Badge Screenshot) */}
                                                <td className="px-4 py-3 text-center">
                                                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 border border-green-200 rounded">
                                                        <HiCheckBadge className="w-3 h-3 text-green-600" />
                                                        <span className="text-[10px] font-bold text-green-700 uppercase">Sah</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer Table */}
                            <div className="p-3 text-center border-t bg-slate-50 border-slate-100">
                                <span className="text-[10px] text-slate-400 italic">
                                    *Data ditampilkan secara terbatas untuk kebutuhan publik. Login untuk detail lengkap.
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
