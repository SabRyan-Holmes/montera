import React from "react";
import { RiAppsFill } from "react-icons/ri";
import { GrHelpBook } from "react-icons/gr";
import { AiFillNotification } from "react-icons/ai";
import { IoDocuments, IoSettings } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { MdEditDocument, MdOutlineAssignmentInd } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDatabase, FaUserTie } from "react-icons/fa6";
import { SidebarLink, SidebarLinkCollapse } from "..";


export default function AdminSidebar() {
    return (
        <>
            <section className="scale-105 menu">
                <SidebarLink
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                    className="z-20 mx-[18px] -mb-1"
                >
                    <MdSpaceDashboard />
                    Dashboard
                </SidebarLink>
                <SidebarLinkCollapse
                    submenu={[
                        {
                            label: (
                                <>
                                    <MdOutlineAssignmentInd />
                                    Produk
                                </>
                            ),
                            route: "shared.produk.index",
                            actives: [
                                "shared.produk.index",
                                "shared.produk.create",
                                "shared.produk.show",
                            ],
                        },
                        {
                            label: (
                                <>
                                    <MdEditDocument />
                                    <span className="text-nowrap">
                                        Indikator
                                    </span>
                                </>
                            ),
                            route: "shared.indikator.index",
                            actives: [
                                "shared.indikator.index",
                                "shared.indikator.create",
                                "shared.indikator.show",
                            ],
                        },
                        {
                            label: (
                                <>
                                    <MdEditDocument />
                                    <span className="text-nowrap">
                                        Target
                                    </span>
                                </>
                            ),
                            route: "admin.target.index",
                            actives: [
                                "admin.target.index",
                                "admin.target.create",
                                "admin.target.show",
                            ],
                        },
                        {
                            label: (
                                <>
                                    <MdEditDocument />
                                    <span className="text-nowrap">
                                        Akuisisi
                                    </span>
                                </>
                            ),
                            route: "admin.akuisisi.index",
                            actives: [
                                "admin.akuisisi.index",
                                "admin.akuisisi.create",
                                "admin.akuisisi.show",
                            ],
                        },
                        {
                            label: (
                                <>
                                    <MdEditDocument />
                                    <span className="text-nowrap">
                                        Transaksi
                                    </span>
                                </>
                            ),
                            route: "admin.transaksi.index",
                            actives: [
                                "admin.transaksi.index",
                                "admin.transaksi.create",
                                "admin.transaksi.show",
                            ],
                        },
                    ]}
                >
                    <span className="flex items-center">
                        <RiAppsFill className="mr-2 scale-105" />
                        Main
                    </span>
                </SidebarLinkCollapse>

                <SidebarLinkCollapse
                    submenu={[
                        {
                            label: (
                                <>
                                    <IoDocuments />
                                    User
                                </>
                            ),
                            route: "admin.user.index",
                            actives: [
                                "admin.user.index",
                                "admin.user.create",
                                "admin.user.show",
                                "admin.user.edit",
                            ],
                        },
                        {
                            label: (
                                <>
                                    <IoSettings />
                                    Jabatan
                                </>
                            ),
                            route: "admin.jabatan.index",
                            actives: [
                                "admin.jabatan.index",
                                "admin.jabatan.create",
                                "admin.jabatan.show",
                                "admin.jabatan.edit",
                            ],
                        },
                        {
                            label: (
                                <>
                                    <FaUserTie />
                                    Divisi
                                </>
                            ),
                            route: "admin.divisi.index",
                            actives: [
                                "admin.divisi.index",
                                "admin.divisi.create",
                                "admin.divisi.edit",
                                "admin.divisi.show",
                            ],
                        },
                    ]}
                >
                    <span className="flex items-center ">
                        <FaDatabase className="mr-2" />
                        Data Master
                    </span>
                </SidebarLinkCollapse>

                <SidebarLinkCollapse
                    submenu={[
                        {
                            label: (
                                <>
                                    <AiFillNotification />
                                    Log Aktivitas
                                </>
                            ),
                            route: "main-log",
                            actives: ["divisi-sdm.log-aktivitas.index"],
                        },
                        {
                            label: (
                                <>
                                    <GrHelpBook />
                                    Panduan/Bantuan
                                </>
                            ),
                            route: "help-and-guide",
                            actives: ["help-and-guide"],
                        },
                    ]}
                >
                    <span className="flex items-center">
                        <FaInfoCircle className="mr-2" />
                        Info
                    </span>
                </SidebarLinkCollapse>
                <div className="h-10" />
            </section>
        </>
    );
}
