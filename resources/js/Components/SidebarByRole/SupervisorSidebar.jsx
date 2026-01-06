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

export default function SupervisorSidebar() {
    return (
        <section className="scale-105 menu">
            {/* Link Dashboard */}
            <SidebarLink
                href={route("dashboard")}
                active={route().current("dashboard")}
                className="z-20 mx-[18px] -mb-1"
            >
                <MdSpaceDashboard />
                Dashboard
            </SidebarLink>

            <SidebarLink
                href={route("spv.akuisisi.index")}
                active={route().current("spv.akuisisi.index")}
                className="z-20 mx-[18px] -mb-1"
            >
                <MdSpaceDashboard />
                Verifikasi Data
            </SidebarLink>

            <SidebarLink
                href={route("spv.team")}
                active={route().current("spv.team")}
                className="z-20 mx-[18px] -mb-1"
            >
                <MdSpaceDashboard />
                Monitoring Pegawai
            </SidebarLink>

            <SidebarLink
                href={route("spv.team")}
                active={route().current("main-log")}
                className="z-20 mx-[18px] -mb-1"
            >
                <MdSpaceDashboard />
                Laporan & Evaluasi
            </SidebarLink>

            <SidebarLinkCollapse
                submenu={[
                    {
                        label: (
                            <>
                                <IoDocuments />
                                Produk
                            </>
                        ),
                        route: "shared.produk.index",
                        actives: [
                            "shared.produk.index",
                            "shared.produk.create",
                            "shared.produk.show",
                            "shared.produk.edit",
                        ],
                    },
                    {
                        label: (
                            <>
                                <IoSettings />
                                Indikator
                            </>
                        ),
                        route: "shared.indikator.index",
                        actives: [
                            "shared.indikator.index",
                            "shared.indikator.create",
                            "shared.indikator.show",
                            "shared.indikator.edit",
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
                        actives: ["main-log"],
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
        </section>
    );
}
