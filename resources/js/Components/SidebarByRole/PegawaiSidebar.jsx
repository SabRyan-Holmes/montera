import { MdSpaceDashboard } from "react-icons/md";
import { SidebarLink } from "..";
import {
    HiOutlineClipboardDocumentList,
    HiOutlineDocumentPlus,
    HiOutlineFlag,
} from "react-icons/hi2";

export default function PegawaiSidebar({ isCollapsed }) {
    return (
        <ul>
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
                href={route("pegawai.target")}
                active={route().current("pegawai.target")}
                className="z-20 mx-[18px] -mb-1"
                isCollapsed={isCollapsed}
            >
                <HiOutlineFlag />
                Target Kerja
            </SidebarLink>

            <SidebarLink
                href={route("pegawai.akuisisi.index")}
                active={route().current("pegawai.akuisisi.*")}
                className="z-20 mx-[18px] -mb-1"
                isCollapsed={isCollapsed}
            >
                <HiOutlineDocumentPlus />
                Akuisisi
            </SidebarLink>
            <SidebarLink
                href={route("pegawai.report")}
                active={route().current("pegawai.report")}
                className="z-20 mx-[18px] -mb-1"
                isCollapsed={isCollapsed}
            >
                <HiOutlineClipboardDocumentList />
                Laporan
            </SidebarLink>
            {/*
            <SidebarLink
                href={route("pegawai.transaksi")}
                active={route().current("pegawai.transaksi")}
                className="z-20 mx-[18px] -mb-1"
                isCollapsed={isCollapsed}
                >
                <HiOutlineTrophy />
                Transaksi Saya
            </SidebarLink>

            <SidebarLink
                href={route("pegawai.stats")}
                active={route().current("pegawai.stats")}
                className="z-20 mx-[18px] -mb-1"
            >
                <MdSpaceDashboard />
                Statistik & Ranking
            </SidebarLink> */}

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
