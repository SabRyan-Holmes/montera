import { RadialChart, AkuisisiGraph } from "@/Components";
import React from "react";
import {
    HiOutlineShieldCheck,
    HiOutlineUserGroup,
    HiOutlineDocumentMagnifyingGlass,
    HiOutlineClock
} from "react-icons/hi2";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";

export default function SupervisorContent({ dataByRole }) {
    const {
        pendingVerification,
        totalTeamMembers,
        verifiedToday,
        totalTeamTarget,
        verificationRateGraph,
        teamProgressGraph
    } = dataByRole;

    return (
        <main className="w-full py-6 mx-auto px-7">
            {/* Header Pengingat */}
            <div className="p-4 mb-8 border-l-4 bg-primary/10 border-primary rounded-r-xl">
                <h2 className="font-bold text-secondary">Halo, Supervisor!</h2>
                <p className="text-sm text-gray-600">Ada <span className="font-bold text-error">{pendingVerification} laporan</span> yang menunggu verifikasi Anda hari ini.</p>
            </div>

            {/* Row 1: Quick Stats (Cards) */}
            <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">

                {/* Card 1: Antrean Verifikasi (Warna Orange agar mencolok) */}
                <div className="flex items-center overflow-hidden bg-white border border-b-4 shadow-sm rounded-xl border-b-warning">
                    <div className="p-4 bg-warning">
                        <HiOutlineClock className="w-10 h-10 text-white" />
                    </div>
                    <div className="px-4 py-2">
                        <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Pending</h3>
                        <p className="text-2xl font-black text-secondary">{pendingVerification}</p>
                    </div>
                </div>

                {/* Card 2: Anggota Tim */}
                <div className="flex items-center overflow-hidden bg-white border border-b-4 shadow-sm rounded-xl border-b-secondary">
                    <div className="p-4 bg-secondary">
                        <HiOutlineUserGroup className="w-10 h-10 text-white" />
                    </div>
                    <div className="px-4 py-2">
                        <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Anggota Tim</h3>
                        <p className="text-2xl font-black text-secondary">{totalTeamMembers} <span className="text-sm font-normal">Orang</span></p>
                    </div>
                </div>

                {/* Card 3: Selesai Hari Ini */}
                <div className="flex items-center overflow-hidden bg-white border border-b-4 shadow-sm rounded-xl border-b-success">
                    <div className="p-4 bg-success">
                        <HiOutlineShieldCheck className="w-10 h-10 text-white" />
                    </div>
                    <div className="px-4 py-2">
                        <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Verified Today</h3>
                        <p className="text-2xl font-black text-secondary">{verifiedToday}</p>
                    </div>
                </div>

                {/* Card 4: Total Target Tim */}
                <div className="flex items-center overflow-hidden bg-white border border-b-4 shadow-sm rounded-xl border-b-primary">
                    <div className="p-4 bg-primary">
                        <MdOutlineAssignmentTurnedIn className="w-10 h-10 text-white" />
                    </div>
                    <div className="px-4 py-2">
                        <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Target Tim</h3>
                        <p className="text-2xl font-black text-secondary">{totalTeamTarget}</p>
                    </div>
                </div>
            </section>

            {/* Row 2: Charts (Dual Analysis) */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Analisis Kecepatan Verifikasi */}
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                    <AkuisisiGraph
                        data={verificationRateGraph}
                        title="Rasio Verifikasi Laporan"
                    />
                </div>

                {/* Analisis Capaian Target Divisi */}
                <div className="p-6 bg-white border shadow-sm rounded-xl">
                    <RadialChart
                        title={"Rata-rata Capaian Divisi"}
                        data={teamProgressGraph}
                        chartId={"chart-team-progress"}
                    />
                </div>
            </div>
        </main>
    );
}
