import { Graph, RadialChart } from "@/Components";
import React from "react";
import { IconContext } from "react-icons";
import { FaUserLarge, FaUsers, FaUserTie } from "react-icons/fa6";
import { HiDocumentDuplicate } from "react-icons/hi2";


export default function PegawaiContent({ dataByRole }) {
    const { PAKCount, pengusulanPAKCount, prosesPAKCount, arsipDokumenCount } =
        dataByRole;
    return (
        <main className="w-full mx-auto px-7 ">
              {/* Grid */}
            <section className="grid items-center justify-center grid-cols-2 gap-5 px-24 my-auto gap-x-20 ">
                <div className="flex items-center max-w-sm overflow-hidden bg-white border shadow rounded-xl">
                    <div className="p-4 bg-primary">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <HiDocumentDuplicate className="w-12 h-full" />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">
                            Total Pengusulan Pernah Diajukan
                        </h3>
                        <p className="text-3xl">{pengusulanPAKCount}</p>
                    </div>
                </div>

                <div className="flex items-center max-w-sm overflow-hidden bg-white border shadow rounded-xl">
                    <div className="p-4 bg-secondary">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <HiDocumentDuplicate className="w-12 h-full" />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">
                            Total PAK Pernah Diproses
                        </h3>
                        <p className="text-3xl">{prosesPAKCount}</p>
                    </div>
                </div>
                <div className="flex items-center max-w-sm overflow-hidden bg-white border shadow rounded-xl">
                    <div className="p-4 bg-hijau">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <HiDocumentDuplicate className="w-12 h-full" />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">
                            Total Dokumen PAK Selesai
                        </h3>
                        <p className="text-3xl">{PAKCount}</p>
                    </div>
                </div>

                <div className="flex items-center max-w-sm overflow-hidden bg-white border shadow rounded-xl">
                    <div className="p-4 bg-bermuda">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <HiDocumentDuplicate className="w-12 h-full" />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">
                            Total Dokumen Diarsipkan
                        </h3>
                        <p className="text-3xl">{arsipDokumenCount}</p>
                    </div>
                </div>

                {/* <div className="flex items-center max-w-sm overflow-hidden bg-white border shadow rounded-xl">
                    <div className="p-4 bg-hijau">
                        <IconContext.Provider
                            value={{ color: "white", size: "50px" }}
                        >
                            <HiDocumentDuplicate className="w-12 h-full" />
                        </IconContext.Provider>
                    </div>
                    <div className="px-4 text-gray-700">
                        <h3 className="text-sm tracking-wider">
                            Total Riwayat Karir
                        </h3>
                        <p className="text-3xl">{pengusulanCount ?? 0}</p>
                    </div>
                </div> */}


            </section>
            <div className="flex w-full mt-10 ">
                {/* TODO: */}
                <section className="w-full">
                    <RadialChart
                        title={"Proses Pengusulan PAK"}
                        data={dataByRole["pengusulanPAKGraph"]}
                        chartId={"pengusulan-pak"}
                    />
                </section>

                <section className="w-full">
                    <RadialChart
                        title={"Proses PAK"}
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
