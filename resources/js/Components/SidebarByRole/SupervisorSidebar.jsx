import { MdSpaceDashboard } from "react-icons/md";
import { SidebarLink } from "..";
import { HiOutlineDocumentChartBar, HiOutlineShieldCheck, HiOutlineUserGroup } from "react-icons/hi2";

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
                href={route("spv.target-tim.index")}
                active={route().current("spv.target-tim.index") || route().current("spv.target-tim.create*")}
                className="z-20 mx-[18px] -mb-1"
                isCollapsed={isCollapsed}
            >
                <HiOutlineDocumentChartBar />
                Target Kerja Tim
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


        </ul>
    );
}
