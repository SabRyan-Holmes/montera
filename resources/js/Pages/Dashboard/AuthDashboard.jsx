import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaUserTie } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Graph from "@/Components/Graph";
import { FaUserLarge, FaUsers } from "react-icons/fa6";
import { SdmPimpinanContent } from "@/Components";

export default function AuthDashboard({ title, auth, dataByRole, dataGraph }) {
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}

            {auth.user.role == "divisi_sdm" || auth.user.role == "pimpinan" ? (
                <SdmPimpinanContent
                    dataGraph={dataGraph}
                    dataByRole={dataByRole}
                />
            ) : (
                <section className="flex items-center justify-around grid-cols-2 gap-20 px-20 mx-auto ">
                    {/* Grid */}

                    {/* Graph */}
                    {/* <section className="">
                <Graph data={data} />
            </section> */}

                    <section className="items-center justify-center gap-4 my-auto space-y-5 ">
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
                                <p className="text-3xl">{pegawaiCount}</p>
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
                                    {pegawaiFungsional ?? 0}
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
                                    Total Jumlah PAK yang pernah dicetak
                                </h3>
                                <p className="text-3xl">{pakCount ?? 0}</p>
                            </div>
                        </div>
                    </section>

                    {/* end of content */}
                </section>
            )}
        </AuthenticatedLayout>
    );
}
