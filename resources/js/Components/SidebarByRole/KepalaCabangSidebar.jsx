import {
    MdOutlineDescription,
    MdOutlineMonitorHeart,
    MdOutlineSummarize,
} from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBullseye } from "react-icons/fa6";
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
export default function KepalaCabangSidebar({ isCollapsed }) {
    return (
        <ul>
            {}
            {!isCollapsed && (
                <li className="px-4 mt-4 mb-2 text-xs font-bold tracking-wider uppercase text-slate-400">
                    Menu Utama
                </li>
            )}
            {}
            <SidebarLink
                isCollapsed={isCollapsed}
                href={route("dashboard")}
                active={route().current("dashboard")}
                className="z-20 mx-[21px] "
            >
                <MdSpaceDashboard />
                Dashboard
            </SidebarLink>

            <SidebarLink
                isCollapsed={isCollapsed}
                href={route("kacab.target.index")}
                active={route().current("kacab.target.*")}
                className="z-20 mx-[21px] "
            >
                <FaBullseye />
                Target
            </SidebarLink>

            <SidebarLinkCollapse
                isCollapsed={isCollapsed}
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
                    <MdOutlineMonitorHeart />
                    Analytics
                </span>
            </SidebarLinkCollapse>

            <SidebarLinkCollapse
                isCollapsed={isCollapsed}
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
                <span className="">
                    <HiOutlineUserPlus />
                    Evaluasi & SDM
                </span>
            </SidebarLinkCollapse>

            <SidebarLinkCollapse
                isCollapsed={isCollapsed}
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
                    // {
                    //     label: (
                    //         <>
                    //             <HiOutlineArrowDownTray />
                    //             Export Data
                    //         </>
                    //     ),
                    //     route: "kacab.export-data",
                    //     actives: ["kacab.export-data"],
                    // },
                ]}
            >
                <span className="flex">
                    <MdOutlineDescription />
                    Laporan Resmi
                </span>
            </SidebarLinkCollapse>

            {}
        </ul>
    );
}
