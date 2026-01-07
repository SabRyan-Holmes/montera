import { RadialChart, DivisiBarChart } from "@/Components"; // Buat BarChart baru jika perlu
import React from "react";
import {
    HiOutlineBanknotes,
    HiOutlineTrophy,
    HiOutlineChartBarSquare,
    HiOutlineUsers,
} from "react-icons/hi2";

export default function KepalaCabangContent({ dataByRole }) {
    const {
        totalRealisasiCabang,
        totalTargetCabang,
        totalNasabahCabang,
        topPerformer,
        cabangProgressGraph,
        divisiPerformanceGraph,
    } = dataByRole;

    const formatRupiah = (val) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(val);

    return (
        <main className="w-full py-6 mx-auto px-7">
            {/* Row 1: Executive Summary Cards */}
            <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Uang Masuk Cabang */}
                <div className="p-6 bg-white border border-t-4 shadow-sm rounded-2xl border-t-primary">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                                Total Realisasi
                            </p>
                            <h3 className="text-xl font-black text-secondary">
                                {formatRupiah(totalRealisasiCabang)}
                            </h3>
                        </div>
                        <HiOutlineBanknotes className="text-3xl text-primary" />
                    </div>
                </div>

                {/* Top Performer Pegawai */}
                <div className="p-6 bg-white border border-t-4 shadow-sm rounded-2xl border-t-success">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                                Top Performer
                            </p>
                            <h3 className="text-lg font-bold text-secondary">
                                {topPerformer?.name ?? "N/A"}
                            </h3>
                        </div>
                        <HiOutlineTrophy className="text-3xl text-success" />
                    </div>
                </div>

                {/* Total Target Kantor */}
                <div className="p-6 bg-white border border-t-4 shadow-sm rounded-2xl border-t-secondary">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                                Total Target
                            </p>
                            <h3 className="text-xl font-black text-secondary">
                                {formatRupiah(totalTargetCabang)}
                            </h3>
                        </div>
                        <HiOutlineChartBarSquare className="text-3xl text-secondary" />
                    </div>
                </div>

                {/* Total Nasabah (NOA) */}
                <div className="p-6 bg-white border border-t-4 shadow-sm rounded-2xl border-t-info">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                                Total Nasabah
                            </p>
                            <h3 className="text-xl font-black text-secondary">
                                {totalNasabahCabang}{" "}
                                <span className="text-sm font-normal">NOA</span>
                            </h3>
                        </div>
                        <HiOutlineUsers className="text-3xl text-info" />
                    </div>
                </div>
            </section>

            {/* Row 2: Strategic Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Visual Progres Cabang */}
                <div className="p-6 bg-white border shadow-sm rounded-xl lg:col-span-1">
                    <RadialChart
                        title={"Capaian Kantor Cabang"}
                        data={cabangProgressGraph}
                        chartId={"chart-cabang-total"}
                    />
                </div>

                {/* Perbandingan Antar Divisi (Bar Chart) */}

                <div className="p-6 bg-white border shadow-sm rounded-xl lg:col-span-2">
                    <h5 className="mb-4 text-lg font-bold text-secondary">
                        Efektivitas Per Divisi
                    </h5>
                    <DivisiBarChart data={divisiPerformanceGraph} />
                </div>
            </div>
        </main>
    );
}
