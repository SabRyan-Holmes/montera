import Graph from "@/Components/Graph";
import React from "react";
import { IconContext } from "react-icons";
import { FaUserLarge, FaUsers, FaUserTie } from "react-icons/fa6";
import { HiDocumentDuplicate } from "react-icons/hi2";

export default function SdmDashboardContent({ dataGraph, dataByRole }) {
    const nonFungsional =
        dataByRole["pegawaiCount"] - dataByRole["pegawaiFungsional"];
    return (
        <section className="flex items-center justify-around grid-cols-2 gap-20 mx-auto px-7 ">
            {/* Graph */}
            <section className="">
                <Graph data={dataGraph} />
            </section>

            {/* TODO : Mungkin sebaikny tambahkan juga No Surat PAK terakhir yang pernah dibuat */}

            {/* Grid */}
            <section className="grid items-center justify-center grid-cols-2 gap-5 my-auto ">
                <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl">
                    <div className="h-full p-4 bg-slate-500">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <FaUsers className="w-12 h-full" />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">
                            Total Seluruh Pegawai di Database
                        </h3>
                        <p className="text-3xl">{dataByRole["pegawaiCount"]}</p>
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
                            Total Jumlah Riwayat PAK{" "}
                        </h3>
                        <p className="text-3xl">
                            {dataByRole["PAKCount"] ?? 0}
                        </p>
                    </div>
                </div>

                <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl">
                    <div className="p-4 bg-primary">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <FaUserTie className="w-12 h-full" />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">
                            Total Jumlah Pegawai Fungsional
                        </h3>
                        <p className="text-3xl">
                            {dataByRole["pegawaiFungsional"] ?? 0}
                        </p>
                    </div>
                </div>

                <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl">
                    <div className="h-full p-4 bg-secondary">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <FaUserLarge className="w-12 h-full" />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">
                            Total Jumlah Pegawai Nonfungsional
                        </h3>
                        <p className="text-3xl">{nonFungsional ?? 0}</p>
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
                            Total Jumlah Pengusulan{" "}
                        </h3>
                        <p className="text-3xl">
                            {dataByRole["pengusulanCount"] ?? 0}
                        </p>
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
                            Total Jumlah Pengajuan{" "}
                        </h3>
                        <p className="text-3xl">
                            {dataByRole["pengajuanCount"] ?? 0}
                        </p>
                    </div>
                </div>
            </section>

            {/* end of content */}
        </section>
    );
}
