import React from "react";
import { RiAppsFill } from "react-icons/ri";
import { GrHelpBook } from "react-icons/gr";
import { AiFillNotification } from "react-icons/ai";
import { IoDocuments, IoSettings } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import {
    MdEditDocument,
    MdOutlineAssignmentInd,
    MdOutlineGroupWork,
} from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDatabase, FaUserTie } from "react-icons/fa6";
import { SidebarLink, SidebarLinkCollapse } from "..";
import {
    HiOutlineAdjustmentsVertical,
    HiOutlineBuildingLibrary,
    HiOutlineDocumentChartBar,
    HiOutlineShieldCheck,
    HiOutlineUserGroup,
} from "react-icons/hi2";

export default function SupervisorSidebar({ isCollapsed }) {
    return (
        <ul >
            {/* Header Kategori (Hilang saat collapsed) */}
            {!isCollapsed && (
                <li className="px-4 mt-4 mb-2 text-xs font-bold tracking-wider uppercase text-slate-400">
                    Menu Utama
                </li>
            )}
            {/* Link Dashboard */}
            <SidebarLink
                href={route("dashboard")}
                active={route().current("dashboard")}
                className="z-20 mx-[18px] -mb-1"
                isCollapsed={isCollapsed}
            >
                <MdSpaceDashboard />
                Dashboard
            </SidebarLink>
            <SidebarLink
                href={route("spv.report")}
                active={route().current("spv.report")}
                className="z-20 mx-[18px] -mb-1"
                isCollapsed={isCollapsed}
            >
                <HiOutlineDocumentChartBar />
                Target
            </SidebarLink>

            <SidebarLink
                href={route("spv.verify")}
                active={route().current("spv.verify")}
                className="z-20 mx-[18px] -mb-1"
                isCollapsed={isCollapsed}
            >
                <HiOutlineShieldCheck />
                Verifikasi Data
            </SidebarLink>

            <SidebarLink
                href={route("spv.team")}
                active={route().current("spv.team")}
                className="z-20 mx-[18px] -mb-1"
                isCollapsed={isCollapsed}
            >
                <HiOutlineUserGroup />
                Performa Tim
            </SidebarLink>

            <SidebarLink
                href={route("spv.report")}
                active={route().current("spv.report")}
                className="z-20 mx-[18px] -mb-1"
                isCollapsed={isCollapsed}
            >
                <HiOutlineDocumentChartBar />
                Laporan & Evaluasi
            </SidebarLink>

            {/* <SidebarLinkCollapse
                submenu={[
                    {
                        label: (
                            <>
                                <HiOutlineBuildingLibrary />
                                Target
                            </>
                        ),
                        route: "spv.produk.index",
                        actives: [
                            "spv.produk.index",
                            "spv.produk.create",
                            "spv.produk.show",
                            "spv.produk.edit",
                        ],
                    },
                    // {
                    //     label: (
                    //         <>
                    //             <HiOutlineAdjustmentsVertical />
                    //             Indikator
                    //         </>
                    //     ),
                    //     route: "spv.indikator.index",
                    //     actives: [
                    //         "spv.indikator.index",
                    //         "spv.indikator.create",
                    //         "spv.indikator.show",
                    //         "spv.indikator.edit",
                    //     ],
                    // },
                ]}
            >
                <span className="flex items-center ">
                    <FaDatabase className="mr-2" />
                    Main Data
                </span>
            </SidebarLinkCollapse> */}

            {/* <SidebarLinkCollapse
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
            </SidebarLinkCollapse> */}
        </ul>
    );
}
