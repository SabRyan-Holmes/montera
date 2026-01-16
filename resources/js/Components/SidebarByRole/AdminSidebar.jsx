import React from "react";
import { RiAppsFill } from "react-icons/ri";
import { GrHelpBook } from "react-icons/gr";
import { AiFillNotification } from "react-icons/ai";
import { IoDocuments, IoSettings } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import {
    MdEditDocument,
    MdOutlineAssignmentInd,
    MdOutlineGroups,
} from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDatabase, FaUserTie } from "react-icons/fa6";
import { SidebarLink, SidebarLinkCollapse } from "..";
import {
    HiOutlineAdjustmentsVertical,
    HiOutlineBriefcase,
    HiOutlineBuildingLibrary,
    HiOutlineCheckBadge,
    HiOutlineDocumentPlus,
    HiOutlineUsers,
} from "react-icons/hi2";
import { TbTargetArrow } from "react-icons/tb";

export default function AdminSidebar({ isCollapsed }) {
    return (
        <ul>
            {/* Header Kategori (Hilang saat collapsed) */}
            {!isCollapsed && (
                <li className="px-4 mt-4 mb-2 text-xs font-bold tracking-wider uppercase text-slate-400">
                    Menu Utama
                </li>
            )}
            <SidebarLink
                href={route("dashboard")}
                active={route().current("dashboard")}
                className="z-20 mx-[18px] -mb-1"
                isCollapsed={isCollapsed}
            >
                <MdSpaceDashboard />
                Dashboard
            </SidebarLink>
            <SidebarLinkCollapse
                isCollapsed={isCollapsed}
                submenu={[
                    {
                        label: (
                            <>
                                <HiOutlineBuildingLibrary />
                                Produk
                            </>
                        ),
                        route: "admin.produk.index",
                        actives: [
                            "admin.produk.index",
                            "admin.produk.edit",
                            "admin.produk.create",
                            "admin.produk.show",
                        ],
                    },
                    {
                        label: (
                            <>
                                <TbTargetArrow />
                                <span className="text-nowrap">Target</span>
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
                                <HiOutlineDocumentPlus />
                                <span className="text-nowrap">Akuisisi</span>
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
                                <HiOutlineCheckBadge />
                                <span className="text-nowrap">Transaksi</span>
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
                    <RiAppsFill />
                    Main
                </span>
            </SidebarLinkCollapse>

            <SidebarLinkCollapse
                isCollapsed={isCollapsed}
                submenu={[
                    {
                        label: (
                            <>
                                <HiOutlineUsers />
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
                                <HiOutlineBriefcase />
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
                                <MdOutlineGroups />
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
                    <FaDatabase />
                    Data Master
                </span>
            </SidebarLinkCollapse>

            <SidebarLinkCollapse
                isCollapsed={isCollapsed}
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
                    <FaInfoCircle />
                    Info
                </span>
            </SidebarLinkCollapse>
        </ul>
    );
}
