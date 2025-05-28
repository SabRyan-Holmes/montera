import RadialChart from "@/Components/Chart/RadialChart";
import Graph from "@/Components/Graph";
import React from "react";
import { IconContext } from "react-icons";
import { FaFileAlt } from "react-icons/fa";
import { FaUserLarge, FaUsers, FaUserTie } from "react-icons/fa6";
import { HiDocumentDuplicate } from "react-icons/hi2";

export default function SdmDashboardContent({ dataGraph, dataByRole }) {
    const nonFungsional =
        dataByRole["pegawaiCount"] - dataByRole["pegawaiFungsional"];
    return (
        <main className="w-full gap-20 mx-auto px-7">
            {/* Graph */}
            <div className="flex items-center justify-around gap-20">
                <section className="w-3/5">
                    <Graph data={dataGraph} />
                </section>

                {/* NOTE : Mungkin sebaikny tambahkan juga No Surat PAK terakhir yang pernah dibuat */}

                {/* Grid */}

                <section className="grid items-center justify-center w-full grid-cols-2 gap-5 my-auto ">
                    <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl">
                        <div className="h-full p-4 bg-primary">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <FaUsers className="w-12 h-full" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Pegawai di Database
                            </h3>
                            <p className="text-3xl">
                                {dataByRole["pegawaiCount"]}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl">
                        <div className="p-4 bg-primary/75">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <FaUserTie className="w-12 h-full" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Pegawai Fungsional
                            </h3>
                            <p className="text-3xl">
                                {dataByRole["pegawaiFungsional"]}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl">
                        <div className="p-4 bg-secondary">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <HiDocumentDuplicate className="w-12 h-full" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Riwayat PAK
                            </h3>
                            <p className="text-3xl">{dataByRole["PAKCount"]}</p>
                        </div>
                    </div>

                    <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl">
                        <div className="p-4 bg-secondary/75">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <FaFileAlt className="text-blue-600" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Jumlah PAK Ditetapkan
                            </h3>
                            <p className="text-3xl">{dataByRole["PAKCount"]}</p>
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
                                Pengusulan PAK
                            </h3>
                            <p className="text-3xl">
                                {dataByRole["pengusulanCount"]}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl">
                        <div className="p-4 bg-bermuda">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <HiDocumentDuplicate className="w-12 h-full" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Pengajuan PAK
                            </h3>
                            <p className="text-3xl">
                                {dataByRole["pengajuanCount"]}
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <div className="flex items-start mt-10 justify-evenly">
                {/* TODO: */}
                <section>
                    <RadialChart
                        title={"Proses Pengusulan PAK"}
                        data={dataByRole["pengusulanPAKGraph"]}
                        chartId={"pengusulan-pak"}
                    />
                </section>

                <section>
                    <RadialChart
                        title={"Proses Pengajuan PAK"}
                        data={dataByRole["pengajuanPAKGraph"]}
                        chartId={"pengajuan-pak"}
                    />
                </section>
            </div>

            {/* end of content */}
        </main>
    );
}
