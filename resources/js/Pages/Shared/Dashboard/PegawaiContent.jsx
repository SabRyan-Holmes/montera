import { RadialChart } from "@/Components";
import React from "react";
import {
    HiOutlineDocumentPlus,
    HiOutlineCheckBadge,
    HiOutlineClipboardDocumentList,
    HiOutlineExclamationTriangle,
    HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import { TbTargetArrow } from "react-icons/tb";

export default function PegawaiContent({ dataByRole }) {
    console.log("Data by Role :", dataByRole);
    const {
        totalTarget,
        akuisisiVerified,
        akuisisiRejected,
        totalAkuisisi,
        transaksiCount,
        totalNominalRealisasi,
        progresTargetNasabah,
        progresTargetNominal,
    } = dataByRole;

    const formatRupiah = (val) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(val);

    return (
        <main className="w-full py-6 mx-auto px-7">
            {/* Row 1: Status Performa (Cards Besar) */}
            <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Total Realisasi Sah (Nominal) */}
                <div className="flex items-center p-6 bg-white border border-l-8 shadow-sm border-primary rounded-xl border-l-primary">
                    <div className="p-3 rounded-full bg-primary/10">
                        <HiOutlineCurrencyDollar className="w-10 h-10 text-primary" />
                    </div>
                    <div className="ml-5">
                        <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                            Realisasi Nominal
                        </h3>
                        <p className="text-2xl font-black text-secondary">
                            {formatRupiah(totalNominalRealisasi)}
                        </p>
                    </div>
                </div>

                {/* Status Verified vs Target */}
                <div className="flex items-center p-6 bg-white border border-l-8 shadow-sm border-success rounded-xl border-l-success">
                    <div className="p-3 rounded-full bg-success/10">
                        <HiOutlineCheckBadge className="w-10 h-10 text-success" />
                    </div>
                    <div className="ml-5">
                        <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                            Transaksi Sah
                        </h3>
                        <p className="text-2xl font-black text-secondary">
                            {transaksiCount}{" "}
                            <span className="text-sm font-normal text-gray-400">
                                Poin
                            </span>
                        </p>
                    </div>
                </div>

                {/* Status Kerja Lapangan */}
                <div className="flex items-center p-6 bg-white border border-l-8 shadow-sm border-secondary rounded-xl border-l-secondary">
                    <div className="p-3 rounded-full bg-secondary/10">
                        <TbTargetArrow className="w-10 h-10 text-secondary" />
                    </div>
                    <div className="ml-5">
                        <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                            Target Aktif
                        </h3>
                        <p className="text-2xl font-black text-secondary">
                            {totalTarget}{" "}
                            <span className="text-sm font-normal text-gray-400">
                                Item
                            </span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Row 2: Statistik Operasional */}
            <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                <div className="flex items-center p-4 bg-white border rounded-lg shadow-sm">
                    <HiOutlineDocumentPlus className="mr-3 text-2xl text-primary" />
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">
                            Total Laporan
                        </p>
                        <p className="text-xl font-bold">{totalAkuisisi}</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white border rounded-lg shadow-sm">
                    <HiOutlineClipboardDocumentList className="mr-3 text-2xl text-sky-500" />
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">
                            Laporan Verified
                        </p>
                        <p className="text-xl font-bold">{akuisisiVerified}</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white border rounded-lg shadow-sm">
                    <HiOutlineExclamationTriangle className="mr-3 text-2xl text-error" />
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">
                            Ditolak/Revisi
                        </p>
                        <p className="text-xl font-bold text-error">
                            {akuisisiRejected}
                        </p>
                    </div>
                </div>
            </section>

            {/* Row 3: Visual Progress */}
            {/* Row 3: Visual Progress */}
            {/* <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                    <RadialChart
                        title={"Progress Nasabah (NOA)"}
                        // Kirim dalam bentuk Objek agar ada Labelnya
                        data={{
                            Realisasi: progresTargetNasabah ?? 0,
                            "Sisa Target": 100 - (progresTargetNasabah ?? 0),
                        }}
                        chartId={"chart-noa-pegawai"}
                    />
                </div>
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                    <RadialChart
                        title={"Progres Volume (Nominal)"}
                        data={{
                            Tercapai: progresTargetNominal ?? 0,
                            Sisa: 100 - (progresTargetNominal ?? 0),
                        }}
                        chartId={"chart-vol-pegawai"}
                    />
                </div>
            </section> */}

        </main>
    );
}
