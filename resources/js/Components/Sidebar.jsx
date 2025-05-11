import {
    MdAdminPanelSettings,
    MdAssignment,
    MdEditDocument,
    MdOutlineAssignmentInd,
    MdPeopleAlt,
} from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import {
    FaDatabase,
    FaNotesMedical,
    FaPrint,
    FaUserTie,
} from "react-icons/fa6";
import { MdSwitchAccount } from "react-icons/md";
import logo from "../../assets/image/logo.png";
import ApplicationLogo from "@/Components/ApplicationLogo";
import SidebarLink from "@/Components/SidebarLink";
import { RiAppsFill, RiArchive2Fill, RiUserSettingsFill } from "react-icons/ri";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { IoMdArchive } from "react-icons/io";
import { GrDocumentPerformance } from "react-icons/gr";
import { AiFillNotification } from "react-icons/ai";
import { IoDocuments, IoSettings } from "react-icons/io5";
import { SidebarLinkCollapse, TooltipHover } from ".";
import { FaInfoCircle } from "react-icons/fa";
const Sidebar = ({ role }) => {
    // console.log(active)

    return (
        //TODO: Benerin tampilan side barny kadang dk bener
        <section className="relative shadow-2xl drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

            {/* Smooth Gradient Background */}
            <div className="absolute inset-0 transform shadow-xl bg-gradient-to-br from-slate-950 via-gray-800 to-sky-950 rounded-tr-2xl rounded-br-2xl" />

            <ul className="relative z-10 h-full p-4 space-y-4 overflow-y-scroll overflow-x-clip w-[19rem] text-slate-100">
                {/* Sidebar content */}
                {/*  */}
                <div className="flex items-center justify-start gap-2 mb-5">
                    <a href="/">
                        <ApplicationLogo className="mx-auto text-gray-500 fill-current w-7 h-7 aspect-square " />
                    </a>
                    <strong className="text-xs italic font-bold text-slate-400">
                        BPS Provinsi Jambi
                    </strong>
                </div>
                <div className="relative z-20 flex-col items-center justify-center mt-10 space-y-6">
                    {/* App Name */}
                    <strong className="flex justify-center -mb-3 text-3xl tracking-wider uppercase text-gradient gradient-base">
                        SIPACAK
                    </strong>

                    <div className="flex items-center justify-center h-20 mx-5 border rounded-xl bg-slate-400/50 border-t-primary/70 border-x-secondary/70 border-b-hijau/70">
                        <strong className="mx-5 text-lg font-semibold leading-6 text-center height text-slate-300 text-opacity-90 ">
                            Sistem Penetapan dan Pencetakan Angka Kredit
                        </strong>
                    </div>

                    {/* App Logo */}
                    {/* <img
                        src={logo}
                        className="relative z-20 w-24 h-24 m-3 mx-auto mt-0 filter drop-shadow-lg"
                    /> */}

                    <div className="relative z-20 h-[2px] mx-3 border-none outline-none rounded-md bg-slate-300 ">
                        <div className="absolute inset-0 w-full h-full p-0 transition-colors duration-1000 ease-in-out rounded-md opacity-100 bg-gradient-to-r from-primary/40 via-hijau/40 to-secondary/40" />
                    </div>
                </div>

                {role === "divisi_sdm" && (
                    <section className="scale-105 menu">
                        {/* TODO: Nanti Bagus DiCollapse in bisa */}
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
                                            {/* Pengusulan Pegawai */}
                                            <MdOutlineAssignmentInd />{" "}
                                            Pengusulan Pegawai
                                        </>
                                    ),
                                    route: "divisi-sdm.pengusulan-pegawai",
                                    actives: ["divisi-sdm.pengusulan-pegawai"],
                                },
                                {
                                    label: (
                                        <>
                                            {/* PAK */}
                                            <MdEditDocument /> <span className="text-nowrap">Penetapan Angka
                                            Kredit</span>
                                        </>
                                    ),
                                    route: "divisi-sdm.pak.create",
                                    actives: [
                                        "divisi-sdm.pak.create",
                                        "divisi-sdm.pak.edit",
                                    ],
                                },
                                {
                                    label: (
                                        <>
                                            {/* Pengajuan PAK */}
                                            <BsFillSendArrowUpFill />
                                            Pengajuan PAK
                                        </>
                                    ),
                                    route: "divisi-sdm.pengajuan.index",
                                    actives: ["divisi-sdm.pengajuan.index"],
                                },
                                {
                                    label: (
                                        <>
                                            {/* Arsip Dokumen */}
                                            <RiArchive2Fill  />
                                            Arsip Dokumen
                                        </>
                                    ),
                                    route: "divisi-sdm.koefisien.index",
                                    actives: [
                                        "divisi-sdm.koefisien.index",
                                        "divisi-sdm.koefisien.edit",
                                    ],
                                },
                            ]}
                        >
                            <span className="flex items-center">
                                <RiAppsFill className="mr-2 scale-105" />{" "}
                                Proses PAK
                            </span>
                        </SidebarLinkCollapse>

                        <SidebarLinkCollapse
                            submenu={[
                                {
                                    label: (
                                        <>
                                            {/* Kelola Riwayat PAK */}
                                            <IoDocuments className="mr-2" />
                                            Kelola Riwayat PAK
                                        </>
                                    ),
                                    route: "divisi-sdm.riwayat-pak.index",
                                    actives: [
                                        "divisi-sdm.riwayat-pak.index",
                                        "divisi-sdm.riwayat-pak.edit",
                                        "divisi-sdm.pak.edit",
                                    ],
                                },
                                {
                                    label: (
                                        <>
                                            {/* Kelola Pegawai */}
                                            <FaUserTie className="mr-2" />
                                            Kelola Pegawai
                                        </>
                                    ),
                                    route: "divisi-sdm.pegawai.index",
                                    actives: [
                                        "divisi-sdm.pegawai.index",
                                        "divisi-sdm.pegawai.create",
                                        "divisi-sdm.pegawai.edit",
                                        "divisi-sdm.pegawai.show",
                                    ],
                                },
                                {
                                    label: (
                                        <>
                                            {/* Kelola Aturan PAK */}
                                            <IoSettings className="mr-2" />
                                            Kelola Aturan PAK
                                        </>
                                    ),
                                    route: "divisi-sdm.aturan-pak.index",
                                    actives: [
                                        "divisi-sdm.aturan-pak.index",
                                        "divisi-sdm.aturan-pak.edit",
                                    ],
                                },
                            ]}
                        >
                            <span className="flex items-center">
                                <FaDatabase className="mr-2" />
                                Data Master
                            </span>
                        </SidebarLinkCollapse>

                        <SidebarLinkCollapse
                            submenu={[
                                {
                                    label: (
                                        <>
                                            {/* Log Aktivitas */}
                                            <AiFillNotification />
                                            Log Aktivitas
                                        </>
                                    ),
                                    route: "divisi-sdm.log-aktivitas",
                                    active: "divisi-sdm.log-aktivitas",
                                },
                                {
                                    label: (
                                        <>
                                            {/* Kelola Pegawai */}
                                            <FaUserTie className="mr-2" />
                                            Panduan/Bantuan
                                        </>
                                    ),
                                    route: "divisi-sdm.help-and-guide",
                                    active: "divisi-sdm.help-and-guide",
                                },
                                {
                                    label: (
                                        <>
                                            {/* Kelola Aturan PAK */}

                                            <IoSettings className="mr-2" />
                                            Download Template
                                        </>
                                    ),
                                    route: "divisi-sdm.pengusulan-pegawai",
                                    active: "divisi-sdm.pengusulan-pegawai",
                                },
                            ]}
                        >
                            <span className="flex items-center">
                                <FaInfoCircle className="mr-2" />
                                Info
                            </span>
                        </SidebarLinkCollapse>
                        <div className="h-10"/>
                    </section>
                )}

                {role === "pimpinan" && (
                    <section>
                        {/* Link Dashboard */}
                        <SidebarLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                            className="relative z-20"
                        >
                            <MdSpaceDashboard />
                            Dashboard
                        </SidebarLink>

                        {/* Link Pengajuan PAK */}
                        <SidebarLink
                            href={route("pimpinan.pengajuan.index")}
                            active={route().current("pimpinan.pengajuan.index")}
                            className="relative z-20"
                        >
                            <IoDocuments /> Pengajuan PAK
                        </SidebarLink>

                        {/* Link Kelola Data */}
                        <SidebarLink
                            href={route("pimpinan.pegawai.index")}
                            active={route().current("pimpinan.pegawai.index")}
                            className="relative z-20"
                        >
                            <MdPeopleAlt />
                            Daftar Pegawai
                        </SidebarLink>

                        {/* TODO: Link Arsip Dokumen */}
                        <SidebarLink className="relative z-20">
                            <IoMdArchive />
                            Arsip Dokumen
                        </SidebarLink>

                        {/* TODO : Link Log Aktivitas */}
                        <SidebarLink className="relative z-20">
                            <AiFillNotification />
                            Log Aktivitas
                        </SidebarLink>
                    </section>
                )}

                {!role ||
                    (role == "pegawai" && (
                        <section>
                            {/* Link Dashboard */}
                            <SidebarLink
                                href={route("pegawai.dashboard")}
                                active={route().current("pegawai.dashboard")}
                                className="relative z-20"
                            >
                                <MdSpaceDashboard />
                                Dashboard
                            </SidebarLink>

                            {/* Link Pengusulan */}
                            <SidebarLink
                                href={route("pegawai.pengajuan.index")}
                                active={route().current("pengajuan.index")}
                                className="relative z-20"
                            >
                                <GrDocumentPerformance />
                                Pengusulan
                            </SidebarLink>

                            {/* Link Status Pengajuan PAK */}
                            <SidebarLink
                                href={route("pegawai.pengajuan.index")}
                                active={route().current(
                                    "pegawai.pengajuan.index"
                                )}

                            >
                                <FaPrint />
                                Status Pengajuan PAK
                            </SidebarLink>

                            {/* TODO: Link Arsip Dokumen */}
                            <SidebarLink >
                                <IoMdArchive />
                                Arsip Dokumen
                            </SidebarLink>

                            {/* TODO : Link Panduan/Bantuan */}
                            <SidebarLink >
                                <AiFillNotification />
                                Panduan/Bantuan
                            </SidebarLink>
                        </section>
                    ))}
            </ul>

            {/* Decorative Bottom Shadow */}
            <div className="absolute inset-x-0 bottom-0 h-16 rounded-b-lg shadow-inner bg-gradient-to-t from-slate-900 to-transparent" />
        </section>
    );
};

export default Sidebar;
