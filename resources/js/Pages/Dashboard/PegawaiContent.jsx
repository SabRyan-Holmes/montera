import Graph from "@/Components/Graph";
import React from "react";
import { IconContext } from "react-icons";
import { FaUserLarge, FaUsers, FaUserTie } from "react-icons/fa6";
import { HiDocumentDuplicate } from "react-icons/hi2";

export default function PegawaiContent({ dataGraph, dataByRole }) {
    const { PAKCount, pengusulanCount, pengajuanCount, arsipDokumenCount } =
        dataByRole;
    return (
        <section className="flex items-center justify-around grid-cols-2 gap-20 mx-auto px-7 ">
            {/* Graph */}
            <section className="">{/* <Graph data={dataGraph} /> */}</section>

            {/* Grid */}
            <section className="grid items-center justify-center grid-cols-2 gap-5 my-auto ">
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
                            Total Jumlah Riwayat PAK{" "}
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
                            Total Jumlah Pengusulan
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
                            Total Jumlah PAK diproses{" "}
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
                            Total Jumlah PAK diproses{" "}
                        </h3>
                        <p className="text-3xl">{arsipDokumenCount ?? 0}</p>
                    </div>
                </div>
            </section>

            {/* end of content */}
        </section>
    );
}
