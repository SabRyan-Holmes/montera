import React, { useState } from "react";
import Navbar from "@/Components/Navbar";
import { Link, Head } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import { IconContext } from "react-icons";
import { FaUserTie } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi2";
import { MdEventRepeat } from "react-icons/md";
import { MdEventBusy } from "react-icons/md";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AdminPage({
    title,
    auth,
    userCount,
    kegiatanCount,
    documentCount,
    processCount,
    rejectedCount,
    acceptedCount,
}) {
    console.log(`isi route  : ${route}`);
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}
            <section className="h-screen">
                <div className="grid bg-white grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-3 sm:px-8 capitalize">
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-primary">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <MdEvent className="h-full w-12" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Total
                            </h3>
                            <p class="text-3xl">{kegiatanCount}</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-secondary">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <HiDocumentDuplicate className="h-full w-12" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Total Jumlah Dokumen PAK yang pernah dicetak
                            </h3>
                            <p className="text-3xl">{documentCount}</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
                        <div className="p-4 bg-indigo-400 h-full">
                            <IconContext.Provider
                                value={{ color: "white", size: "50px" }}
                            >
                                <FaUserTie className="h-full w-12" />
                            </IconContext.Provider>
                        </div>
                        <div className="px-4 text-gray-700">
                            <h3 className="text-sm tracking-wider">
                                Jumlah Pegawai
                            </h3>
                            <p className="text-3xl">{userCount}</p>
                        </div>
                    </div>
                </div>
                {/* end of content */}
            </section>
        </AuthenticatedLayout>
    );
}
