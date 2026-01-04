import { Graph, RadialChart } from "@/Components";
import React from "react";
import { IconContext } from "react-icons";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import { FaUserLarge, FaUsers, FaUserTie } from "react-icons/fa6";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { MdOutlineAssignmentInd, MdWorkHistory } from "react-icons/md";
import { RiArchive2Fill } from "react-icons/ri";

export default function AtasanContent({ dataGraph, dataByRole }) {
    return (
        <main className="w-full gap-20 mx-auto px-7">
            {/* Graph */}
            <div className="flex items-center justify-around gap-20">
                <section className="w-3/5">
                    <Graph data={dataGraph} />
                </section>

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
                                Jumlah Produk
                            </h3>
                            <p className="text-3xl">
                                {dataByRole["produkCount"]}
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
                                Jumlah Akuisisi
                            </h3>
                            <p className="text-3xl">{dataByRole["akuisisiCount"]}</p>
                        </div>
                    </div>

                    <div className="flex items-center overflow-hidden bg-white border shadow rounded-xl">
                        <div className="p-4 bg-hijau">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <MdOutlineAssignmentInd className="w-12 h-full" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Jumlah Target
                            </h3>
                            <p className="text-3xl">
                                {dataByRole["targetCount"]}
                            </p>
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
                                Jumlah Divisi
                            </h3>
                            <p className="text-3xl">{dataByRole["divisiCount"]}</p>
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
                                Jumlah User
                            </h3>
                            <p className="text-3xl">{dataByRole["userCount"]}</p>
                        </div>
                    </div>
                </section>
            </div>

{/* TODO : Radial Chart dashboard */}
            {/* <div className="flex items-start mt-10 justify-evenly">
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
            </div> */}

            {/* end of content */}
        </main>
    );
}
