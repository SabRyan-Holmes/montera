import { Graph, RadialChart } from "@/Components";
import React from "react";
import { IconContext } from "react-icons";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { FaUserLarge, FaUsers, FaUserTie } from "react-icons/fa6";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { MdErrorOutline, MdOutlineAssignmentInd, MdWorkHistory } from "react-icons/md";
import { RiArchive2Fill, RiVerifiedBadgeFill } from "react-icons/ri";

export default function PegawaiContent({ dataByRole }) {
    const { PAKCount, pengusulanPAKCount, prosesPAKCount, arsipDokumenCount } =
        dataByRole;
    return (
        <main className="w-full mx-auto px-7 ">
            {/* Grid */}
            <section className="grid grid-cols-1 gap-6 px-4 py-8 md:grid-cols-3">
                {/* Card 1: Total Target */}
                <div className="flex items-center overflow-hidden bg-white border shadow-sm rounded-xl">
                    <div className="p-4 bg-sky-600">
                        <IconContext.Provider
                            value={{ color: "white", size: "35px" }}
                        >
                            <MdOutlineAssignmentInd />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 py-2 text-gray-700">
                        <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                            Target Saya
                        </h3>
                        <p className="text-2xl font-bold">
                            {dataByRole["totalTarget"]}{" "}
                            <span className="text-sm font-normal">
                                Indikator
                            </span>
                        </p>
                    </div>
                </div>

                {/* Card 2: Akuisisi Verified (Poin Sah) */}
                <div className="flex items-center overflow-hidden bg-white border shadow-sm rounded-xl">
                    <div className="p-4 bg-emerald-500">
                        <IconContext.Provider
                            value={{ color: "white", size: "35px" }}
                        >
                            <RiVerifiedBadgeFill />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 py-2 text-gray-700">
                        <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                            Verified (Sah)
                        </h3>
                        <p className="text-2xl font-bold">
                            {dataByRole["akuisisiVerified"]}{" "}
                            <span className="text-sm font-normal">Nasabah</span>
                        </p>
                    </div>
                </div>

                {/* Card 3: Akuisisi Rejected (Butuh Revisi) */}
                <div className="flex items-center overflow-hidden bg-white border shadow-sm rounded-xl">
                    <div className="p-4 bg-rose-500">
                        <IconContext.Provider
                            value={{ color: "white", size: "35px" }}
                        >
                            <MdErrorOutline />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 py-2 text-gray-700">
                        <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                            Butuh Revisi
                        </h3>
                        <p className="text-2xl font-bold">
                            {dataByRole["akuisisiRejected"]}{" "}
                            <span className="text-sm font-normal">Laporan</span>
                        </p>
                    </div>
                </div>

                {/* Card 4: Total Laporan */}
                <div className="flex items-center overflow-hidden bg-white border shadow-sm rounded-xl">
                    <div className="p-4 bg-slate-600">
                        <IconContext.Provider
                            value={{ color: "white", size: "35px" }}
                        >
                            <HiDocumentDuplicate />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 py-2 text-gray-700">
                        <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                            Total Input
                        </h3>
                        <p className="text-2xl font-bold">
                            {dataByRole["totalAkuisisi"]}
                        </p>
                    </div>
                </div>
            </section>
            <div className="flex w-full mt-10 ">
                <section className="w-full">
                    <RadialChart
                        title={"Data 1"}
                        data={dataByRole["pengusulanPAKGraph"]}
                        chartId={"pengusulan-pak"}
                    />
                </section>

                <section className="w-full">
                    <RadialChart
                        title={"Data 2"}
                        data={dataByRole["prosesPAKGraph"]}
                        chartId={"proses-pak"}
                    />
                </section>
            </div>
            {/* Grid */}
            {/* <section className="grid items-center justify-center grid-cols-2 gap-5 my-auto ">
                <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl">
                    <div className="p-4 bg-hijau">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <HiDocumentDuplicate className="w-12 h-full" />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">
                            Total Arsip Dokumen
                        </h3>
                        <p className="text-3xl">{pengusulanCount ?? 0}</p>
                    </div>
                </div>

                <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl">
                    <div className="p-4 bg-hijau">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <HiDocumentDuplicate className="w-12 h-full" />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">
                            Total Jumlah Riwayat PAK
                        </h3>
                        <p className="text-3xl">{PAKCount ?? 0}</p>
                    </div>
                </div>

                <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl">
                    <div className="p-4 bg-hijau">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <HiDocumentDuplicate className="w-12 h-full" />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">
                            Total Jumlah PAK diproses
                        </h3>
                        <p className="text-3xl">{pengajuanCount ?? 0}</p>
                    </div>
                </div>

                <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl">
                    <div className="p-4 bg-hijau">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <HiDocumentDuplicate className="w-12 h-full" />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">
                            Total Jumlah PAK diproses
                        </h3>
                        <p className="text-3xl">{arsipDokumenCount ?? 0}</p>
                    </div>
                </div>
            </section> */}

            {/* end of content */}
        </main>
    );
}
