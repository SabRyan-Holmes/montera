import {
    MdAdminPanelSettings,
    MdAssignment,
    MdEditDocument,
    MdOutlineAssignmentInd,
    MdPeopleAlt,
} from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import {
    FaChartLine,
    FaDatabase,
    FaDownload,
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
import { GrDocumentPerformance, GrHelpBook } from "react-icons/gr";
import { AiFillNotification } from "react-icons/ai";
import { IoDocuments, IoSettings } from "react-icons/io5";
import { SidebarLinkCollapse, TooltipHover } from ".";
import { FaInfoCircle } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";

const Sidebar = ({ role }) => {
    // console.log(active)

    return (
        //TODO: Benerin tampilan side barny kadang dk bener
        <section className="relative shadow-2xl drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

            {/* Smooth Gradient Background */}
            <div className="absolute inset-0 transform shadow-xl bg-gradient-to-br from-slate-950 via-gray-800 to-sky-950 rounded-tr-2xl rounded-br-2xl" />

            <ul className="relative z-10 h-full p-4 space-y-4  overflow-x-clip w-[19rem] text-slate-100">
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

                {/* SECTION - DIVISI SDM - Iterasi Awal */}
                {/* {role === "Divisi SDM" && (
                    <section className="scale-105 menu">
                        <SidebarLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                            className="z-20 mx-[18px] -mb-1"
                        >
                            <MdSpaceDashboard />
                            Dashboard
                        </SidebarLink>

                        <SidebarLink
                            href={route("divisi-sdm.pak.create")}
                            actives={[
                                "divisi-sdm.pak.create",
                                "divisi-sdm.pak.create-by-pengusulan",
                            ]}
                            className="z-20 mx-[18px] -mb-1"
                        >
                            <MdEditDocument />
                            <span className="text-nowrap">
                                Penetapan Angka Kredit
                            </span>
                        </SidebarLink>

                        <SidebarLink
                            href={route("divisi-sdm.pengajuan.index")}
                            active={route().current(
                                "divisi-sdm.pengajuan.index"
                            )}
                            className="z-20 mx-[18px] -mb-1"
                        >
                            <BsFillSendArrowUpFill />
                            Pengajuan PAK
                        </SidebarLink>

                        <SidebarLink
                            href={route("divisi-sdm.riwayat-pak.index")}
                            actives={[
                                "divisi-sdm.riwayat-pak.index",
                                "divisi-sdm.riwayat-pak.edit",
                                "divisi-sdm.pak.edit",
                            ]}
                            className="z-20 mx-[18px] -mb-1"
                        >
                            <IoDocuments />
                            Kelola Riwayat PAK
                        </SidebarLink>

                        <SidebarLink
                            href={route("divisi-sdm.pegawai.index")}
                            actives={[
                                "divisi-sdm.pegawai.index",
                                "divisi-sdm.pegawai.create",
                                "divisi-sdm.pegawai.edit",
                                "divisi-sdm.pegawai.show",
                            ]}
                            className="z-20 mx-[18px] -mb-1"
                        >
                            <FaUserTie />
                            Kelola Pegawai
                        </SidebarLink>

                        <SidebarLink
                            href={route("divisi-sdm.aturan-pak.index")}
                            actives={[
                                "divisi-sdm.aturan-pak.index",
                                "divisi-sdm.aturan-pak.edit",
                            ]}
                            className="z-20 mx-[18px] -mb-1"
                        >
                            <IoSettings />
                            Kelola Aturan PAK
                        </SidebarLink>
                    </section>
                )} */}
                {/* !SECTION - DIVISI SDM - Iterasi Awal */}

                {/* SECTION - DIVISI SDM - Iterasi Akhir */}

                {role === "Divisi SDM" && (
                    <>
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
                                                <MdOutlineAssignmentInd />
                                                Pengusulan PAK
                                            </>
                                        ),
                                        route: "divisi-sdm.pengusulan-pak.index",
                                        actives: [
                                            "divisi-sdm.pengusulan-pak.index",
                                        ],
                                    },
                                    {
                                        label: (
                                            <>
                                                <MdEditDocument />
                                                <span className="text-nowrap">
                                                    Penetapan Angka Kredit
                                                </span>
                                            </>
                                        ),
                                        route: "divisi-sdm.pak.create",
                                        actives: [
                                            "divisi-sdm.pak.create",
                                            "divisi-sdm.pak.create-by-pengusulan",
                                        ],
                                    },
                                    {
                                        label: (
                                            <>
                                                <BsFillSendArrowUpFill />
                                                Pengajuan PAK
                                            </>
                                        ),
                                        route: "divisi-sdm.pengajuan.index",
                                        actives: ["divisi-sdm.pengajuan.index"],
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
                                                <IoDocuments />
                                                Riwayat PAK
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
                                                <IoSettings />
                                                Aturan PAK
                                            </>
                                        ),
                                        route: "divisi-sdm.aturan-pak.index",
                                        actives: [
                                            "divisi-sdm.aturan-pak.index",
                                            "divisi-sdm.aturan-pak.edit",
                                        ],
                                    },
                                    {
                                        label: (
                                            <>
                                                <FaUserTie />
                                                Pegawai
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
                                                <RiArchive2Fill />
                                                Arsip Dokumen
                                            </>
                                        ),
                                        route: "divisi-sdm.arsip-dokumen.index",
                                        actives: [
                                            "divisi-sdm.arsip-dokumen.index",
                                            "divisi-sdm.arsip-dokumen.show",
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
                                        route: "divisi-sdm.log-aktivitas.index",
                                        actives: [
                                            "divisi-sdm.log-aktivitas.index",
                                        ],
                                    },
                                    {
                                        label: (
                                            <>
                                                <GrHelpBook />
                                                Panduan/Bantuan
                                            </>
                                        ),
                                        route: "info.help-and-guide",
                                        actives: ["info.help-and-guide"],
                                    },
                                    {
                                        label: (
                                            <>
                                                <FaDownload />
                                                Download Template
                                            </>
                                        ),
                                        route: "info.download-template",
                                        actives: ["info.download-template"],
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
                )}

                {/* !SECTION - DIVISI SDM - Iterasi Akhir */}

                {/* SECTION - PIMPINAN - Iterasi 2 */}
                {role === "Pimpinan" && (
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
                            href={route("pimpinan.pengajuan.index")}
                            actives={["pimpinan.pengajuan.index"]}
                            className="z-20 mx-[18px] -mb-1"
                        >
                            <BsFillSendArrowUpFill />
                            Pengajuan PAK
                        </SidebarLink>
                        <SidebarLink
                            href={route("pimpinan.aturan-pak.index")}
                            actives={["pimpinan.aturan-pak.index"]}
                            className="z-20 mx-[18px] -mb-1"
                        >
                            <IoSettings />
                            Aturan PAK
                        </SidebarLink>
                        <SidebarLink
                            href={route("pimpinan.pegawai.index")}
                            actives={["pimpinan.pegawai.index"]}
                            className="z-20 mx-[18px] -mb-1"
                        >
                            <RiArchive2Fill />
                            Daftar Pegawai
                        </SidebarLink>

                        {/* NOTE: Iterasi Kedua tinggal nambahin  dibawah ini */}
                        <SidebarLink
                            href={route("pimpinan.riwayat-karir.index")}
                            actives={["pimpinan.riwayat-karir.index"]}
                            className="z-20 mx-[18px] -mb-1"
                        >
                            <MdWorkHistory />
                            Riwayat Karir Pegawai
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
                                    route: "pimpinan.log-aktivitas",
                                    actives: ["pimpinan.log-aktivitas"],
                                },
                                {
                                    label: (
                                        <>
                                            <GrHelpBook />
                                            Panduan/Bantuan
                                        </>
                                    ),
                                    route: "info.help-and-guide",
                                    actives: ["pimpinan.help-and-guide"],
                                },
                                {
                                    label: (
                                        <>
                                            <FaDownload />
                                            Download Template
                                        </>
                                    ),
                                    route: "info.download-template",
                                    actives: ["divisi-sdm.download-template"],
                                },
                            ]}
                        >
                            <span className="flex items-center">
                                <FaInfoCircle className="mr-2" />
                                Info
                            </span>
                        </SidebarLinkCollapse>
                    </section>
                )}
                {/* !SECTION - PIMPINAN - Iterasi 2*/}

                {/* SECTION - PEGAWAI */}
                {!role ||
                    (role === "Pegawai" && (
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
                                href={route("pegawai.pengusulan-pak.index")}
                                actives={[
                                    "pegawai.pengusulan-pak.index",
                                    "pegawai.pengusulan-pak.edit",
                                    "pegawai.pengusulan-pak.create",
                                ]}
                                className="z-20 mx-[18px] -mb-1"
                            >
                                <MdOutlineAssignmentInd />
                                Pengusulan PAK
                            </SidebarLink>

                            <SidebarLink
                                href={route("pegawai.proses-pak.index")}
                                actives={["pegawai.proses-pak.index"]}
                                className="z-20 mx-[18px] -mb-1"
                            >
                                <BsFillSendArrowUpFill />
                                Proses Pengajuan PAK
                            </SidebarLink>

                            <SidebarLink
                                href={route("pegawai.aturan-pak.index")}
                                actives={["pegawai.aturan-pak.index"]}
                                className="z-20 mx-[18px] -mb-1"
                            >
                                <IoSettings />
                                Aturan PAK
                            </SidebarLink>

                            <SidebarLink
                                href={route("pegawai.riwayat-karir.index")}
                                actives={["pegawai.riwayat-karir.index"]}
                                className="z-20 mx-[18px] -mb-1"
                            >
                                <MdWorkHistory />
                                Riwayat Karir
                            </SidebarLink>

                            <SidebarLink
                                href={route("pegawai.arsip-dokumen.index")}
                                actives={[
                                    "pegawai.arsip-dokumen.index",
                                    "pegawai.arsip-dokumen.edit",
                                ]}
                                className="z-20 mx-[18px] -mb-1"
                            >
                                <RiArchive2Fill />
                                Arsip Dokumen
                            </SidebarLink>

                            <SidebarLinkCollapse
                                submenu={[
                                    {
                                        label: (
                                            <>
                                                <GrHelpBook />
                                                Panduan/Bantuan
                                            </>
                                        ),
                                        route: "info.help-and-guide",
                                        actives: ["info.help-and-guide"],
                                    },
                                    {
                                        label: (
                                            <>
                                                <FaDownload />
                                                Download Template
                                            </>
                                        ),
                                        route: "info.download-template",
                                        actives: ["info.download-template"],
                                    },
                                ]}
                            >
                                <span className="flex items-center text-base">
                                    <FaInfoCircle className="mr-2" />
                                    Info
                                </span>
                            </SidebarLinkCollapse>
                        </section>
                    ))}
                {/* !SECTION - PEGAWAI */}
            </ul>

            {/* Decorative Bottom Shadow */}
            <div className="absolute inset-x-0 bottom-0 h-16 rounded-b-lg shadow-inner bg-gradient-to-t from-slate-900 to-transparent" />
        </section>
    );
};

export default Sidebar;
