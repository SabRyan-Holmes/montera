import {
    MdAdminPanelSettings,
    MdAssignment,
    MdEditDocument,
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
import NavLinkDashboard from "@/Components/NavLinkDashboard";
import { RiUserSettingsFill } from "react-icons/ri";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { IoMdArchive } from "react-icons/io";
import { GrDocumentPerformance } from "react-icons/gr";
import { AiFillNotification } from "react-icons/ai";
import { IoDocuments, IoSettings } from "react-icons/io5";
import { NavLinkCollapse, TooltipHover } from ".";
const Sidebar = ({ active, role }) => {
    // console.log(active)

    return (
        //TODO: Benerin tampilan side barny kadang dk bener
        <div className="relative shadow-2xl drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

            {/* Smooth Gradient Background */}
            <div className="absolute inset-0 transform scale-110 shadow-xl bg-gradient-to-br from-slate-950 via-gray-800 to-sky-950 rounded-tr-2xl rounded-br-2xl" />

            <ul className="relative z-10 min-h-full p-4 space-y-4 menu w-80 text-slate-100">
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
                    <section>
                        {/* Link Dashboard */}
                        <NavLinkDashboard
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                            className="relative z-20"
                        >
                            <MdSpaceDashboard />
                            Dashboard
                        </NavLinkDashboard>

                        {/* Penetapan Angka Kredit */}
                        <NavLinkDashboard
                            href={route("divisi-sdm.pak.create")}
                            active={
                                route().current("divisi-sdm.pak.create") ||
                                active === "divisi-sdm.pak.create" ||
                                active === "pak.process"
                            }
                            className="relative z-20"
                        >
                            <MdEditDocument /> Penetapan Angka Kredit
                        </NavLinkDashboard>

                        {/* TODO: Nanti Bagus DiCollapse in bisa */}
                        {/* <NavLinkCollapse
                            submenu={["Kelola Riwayat PAK", " Kelola Pegawai"]}
                            routes={[
                                "divisi-sdm.riwayat-pak.index",
                                "divisi-sdm.pegawai.index",
                            ]}
                        >
                            Data Master
                        </NavLinkCollapse> */}

                        {/* Riwayat Dokumen PAK */}
                        <NavLinkDashboard
                            href={route("divisi-sdm.riwayat-pak.index")}
                            active={
                                route().current(
                                    "divisi-sdm.riwayat-pak.index"
                                ) ||
                                active === "divisi-sdm.riwayat-pak.edit" ||
                                active === "divisi-sdm.pak.edit"
                            }
                            className="relative z-20"
                        >
                            <IoDocuments /> Kelola Riwayat PAK
                        </NavLinkDashboard>

                        {/* Link Pengajuan PAK */}
                        <NavLinkDashboard
                            href={route("divisi-sdm.pengajuan.index")}
                            active={route().current(
                                "divisi-sdm.pengajuan.index"
                            )}
                            className="relative z-20"
                        >
                            <BsFillSendArrowUpFill />
                            Kelola Pengajuan PAK
                        </NavLinkDashboard>

                        {/* Link Kelola Pegawai */}
                        <NavLinkDashboard
                            href={route("divisi-sdm.pegawai.index")}
                            active={
                                route().current("divisi-sdm.pegawai.index") ||
                                active === "divisi-sdm.pegawai.create" ||
                                active === "divisi-sdm.pegawai.edit" ||
                                active === "divisi-sdm.pegawai.show"
                            }
                            className="relative z-20"
                        >
                            <FaUserTie />
                            Kelola Pegawai
                        </NavLinkDashboard>

                        {/* Link Kelola Aturan Koefisen */}
                        <NavLinkDashboard
                            href={route("divisi-sdm.koefisien.index")}
                            active={route().current(
                                "divisi-sdm.koefisien.index"
                            )}
                            className="relative z-20 disabled "
                        >
                            <IoSettings /> Kelola Aturan Koefisien
                        </NavLinkDashboard>

                        {/* TODO? : Mungkin sebaiknya dibuat halaman khusus langsung ke pemrosesan penetapan angka kredit,
                        terus tinggal pilih pegawainy, ketimbang ditampilin daftar tabel pegawainy dulu lalu pilih pegawai mana yang mau dibikin PAK ny   */}
                        {/* Pengusulan Pegawo */}
                        <div className="relative z-50 mt-9 hover:cursor-not-allowed">
                            <p className="ml-5 text-left ">Coming Soon</p>
                            <NavLinkDashboard
                                // href={route("divisi-sdm.pengusulan-pegawai")}
                                active={route().current(
                                    "divisi-sdm.pengusulan-pegawai"
                                )}
                                className="z-50 inline-flex  group"
                            >
                                <MdAssignment /> Pengusulan Pegawai
                            </NavLinkDashboard>

                            {/* TODO: Link Arsip Dokumen */}
                            <NavLinkDashboard className="z-50 inline-flex  group">
                                <IoMdArchive />
                                Arsip Dokumen
                            </NavLinkDashboard>

                            {/* TODO : Link Log Aktivitas */}
                            <NavLinkDashboard className="z-50 inline-flex  group">
                                <AiFillNotification />
                                Log Aktivitas
                            </NavLinkDashboard>
                            <TooltipHover message={"Coming Soon!"} />
                        </div>
                    </section>
                )}

                {role === "pimpinan" && (
                    <section>
                        {/* Link Dashboard */}
                        <NavLinkDashboard
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                            className="relative z-20"
                        >
                            <MdSpaceDashboard />
                            Dashboard
                        </NavLinkDashboard>

                        {/* Link Pengajuan PAK */}
                        <NavLinkDashboard
                            href={route("pimpinan.pengajuan.index")}
                            active={route().current("pimpinan.pengajuan.index")}
                            className="relative z-20"
                        >
                            <IoDocuments /> Pengajuan PAK
                        </NavLinkDashboard>

                        {/* Link Kelola Data */}
                        <NavLinkDashboard
                            href={route("pimpinan.pegawai.index")}
                            active={route().current("pimpinan.pegawai.index")}
                            className="relative z-20"
                        >
                            <MdPeopleAlt />
                            Daftar Pegawai
                        </NavLinkDashboard>

                        {/* TODO: Link Arsip Dokumen */}
                        <NavLinkDashboard className="relative z-20">
                            <IoMdArchive />
                            Arsip Dokumen
                        </NavLinkDashboard>

                        {/* TODO : Link Log Aktivitas */}
                        <NavLinkDashboard className="relative z-20">
                            <AiFillNotification />
                            Log Aktivitas
                        </NavLinkDashboard>
                    </section>
                )}

                {!role ||
                    (role == "pegawai" && (
                        <section>
                            {/* Link Dashboard */}
                            <NavLinkDashboard
                                href={route("pegawai.dashboard")}
                                active={route().current("pegawai.dashboard")}
                                className="relative z-20"
                            >
                                <MdSpaceDashboard />
                                Dashboard
                            </NavLinkDashboard>

                            {/* Link Pengusulan */}
                            <NavLinkDashboard
                                href={route("pegawai.pengajuan.index")}
                                active={route().current("pengajuan.index")}
                                className="relative z-20"
                            >
                                <GrDocumentPerformance />
                                Pengusulan
                            </NavLinkDashboard>

                            {/* Link Status Pengajuan PAK */}
                            <NavLinkDashboard
                                href={route("pegawai.pengajuan.index")}
                                active={route().current(
                                    "pegawai.pengajuan.index"
                                )}
                                className="relative z-20"
                            >
                                <FaPrint />
                                Status Pengajuan PAK
                            </NavLinkDashboard>

                            {/* TODO: Link Arsip Dokumen */}
                            <NavLinkDashboard className="relative z-20">
                                <IoMdArchive />
                                Arsip Dokumen
                            </NavLinkDashboard>

                            {/* TODO : Link Panduan/Bantuan */}
                            <NavLinkDashboard className="relative z-20">
                                <AiFillNotification />
                                Panduan/Bantuan
                            </NavLinkDashboard>
                        </section>
                    ))}
            </ul>

            {/* Decorative Bottom Shadow */}
            <div className="absolute inset-x-0 bottom-0 h-16 rounded-b-lg shadow-inner bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
    );
};

export default Sidebar;
