import React from "react";
import { RiAppsFill } from "react-icons/ri";
import { GrHelpBook } from "react-icons/gr";
import { AiFillNotification } from "react-icons/ai";
import { IoDocuments, IoSettings } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import {
    MdEditDocument,
    MdOutlineAssignmentInd,
    MdOutlineDescription,
    MdOutlineMonitorHeart,
    MdOutlineSummarize,
} from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDatabase, FaUserTie } from "react-icons/fa6";
import { SidebarLink, SidebarLinkCollapse } from "..";
import {
    HiOutlineArrowDownTray,
    HiOutlineChartPie,
    HiOutlineDocumentText,
    HiOutlineSquare3Stack3D,
    HiOutlineStar,
    HiOutlineTrophy,
    HiOutlineUserPlus,
} from "react-icons/hi2";

export default function KepalaCabangSidebar() {
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

            <SidebarLinkCollapse
                submenu={[
                    {
                        label: (
                            <>
                                <MdOutlineSummarize />
                                Ringkasan
                            </>
                        ),
                        route: "kacab.summary",
                        actives: ["kacab.summary"],
                    },
                    {
                        label: (
                            <>
                                <HiOutlineChartPie />
                                Realisasi
                            </>
                        ),
                        route: "kacab.realisasi",
                        actives: ["kacab.realisasi"],
                    },
                    {
                        label: (
                            <>
                                <HiOutlineSquare3Stack3D />
                                Performa Divisi
                            </>
                        ),
                        route: "kacab.divisi",
                        actives: ["kacab.divisi"],
                    },
                ]}
            >
                <span className="flex items-center ">
                    <MdOutlineMonitorHeart className="mr-2" />
                    Monitoring & Analytics
                </span>
            </SidebarLinkCollapse>

            <SidebarLinkCollapse
                submenu={[
                    {
                        label: (
                            <>
                                <HiOutlineTrophy />
                                Leaderboard Pegawai
                            </>
                        ),
                        route: "kacab.pegawai_rank",
                        actives: ["kacab.pegawai_rank"],
                    },
                    {
                        label: (
                            <>
                                <HiOutlineStar />
                                Promosi Pegawai
                            </>
                        ),
                        route: "kacab.pegawai_promotion",
                        actives: ["kacab.pegawai_promotion"],
                    },
                ]}
            >
                <span className="flex items-center ">
                    <HiOutlineUserPlus className="mr-2" />
                    Evaluasi & SDM
                </span>
            </SidebarLinkCollapse>

            <SidebarLinkCollapse
                submenu={[
                    {
                        label: (
                            <>
                                <HiOutlineDocumentText />
                                Laporan Sah
                            </>
                        ),
                        route: "kacab.final-report",
                        actives: ["kacab.final-report"],
                    },
                    {
                        label: (
                            <>
                                <HiOutlineArrowDownTray />
                                Export Data
                            </>
                        ),
                        route: "kacab.export-data",
                        actives: ["kacab.export-data"],
                    },
                ]}
            >
                <span className="flex items-center ">
                    <MdOutlineDescription className="mr-2" />
                    Laporan Resmi
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
