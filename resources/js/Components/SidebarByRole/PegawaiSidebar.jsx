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

export default function PegawaiSidebar() {
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
                href={route("pegawai.target.index")}
                active={route().current("pegawai.target.index")}
                className="z-20 mx-[18px] -mb-1"
            >
                <MdSpaceDashboard />
                Target Kerja
            </SidebarLink>

            <SidebarLink
                href={route("dashboard")}
                active={route().current("main-log")}
                className="z-20 mx-[18px] -mb-1"
            >
                <MdSpaceDashboard />
                Akuisisi
            </SidebarLink>

            <SidebarLink
                href={route("dashboard")}
                active={route().current("main-log")}
                className="z-20 mx-[18px] -mb-1"
            >
                <MdSpaceDashboard />
                Statistik & Ranking
            </SidebarLink>

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
