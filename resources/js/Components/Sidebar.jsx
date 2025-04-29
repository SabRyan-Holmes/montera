import { MdAdminPanelSettings } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDatabase, FaNotesMedical, FaPrint } from "react-icons/fa6";
import { MdSwitchAccount } from "react-icons/md";
import logo from "../../assets/image/logo.png";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLinkDashboard from "@/Components/NavLinkDashboard";
import { RiUserSettingsFill } from "react-icons/ri";
import { BsFillSendArrowUpFill } from "react-icons/bs";
const Sidebar = ({ active, role }) => {
    // console.log(active)

    return (
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

                {role === "Divisi Sumber Daya Manusia" && (
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

                        {/* Link Cetak Dokumen */}
                        <NavLinkDashboard
                            href={route("cetak_dokumen.index")}
                            active={
                                route().current("cetak_dokumen.index") ||
                                active === "cetak_dokumen.create" ||
                                active === "cetak_dokumen.show_history" ||
                                active === "cetak_dokumen.edit"
                            }
                            className="relative z-20"
                        >
                            <FaPrint />
                            Penetapan Angka Kredit
                        </NavLinkDashboard>

                        {/* Link Pengajuan PAK */}
                        <NavLinkDashboard
                            href={route("pengajuan.index")}
                            active={route().current("pengajuan.index")}
                            className="relative z-20"
                        >
                            <BsFillSendArrowUpFill />
                            Status Pengajuan
                        </NavLinkDashboard>

                        {/* Link Kelola Data */}
                        <NavLinkDashboard
                            href={route("pegawai.index")}
                            active={
                                route().current("pegawai.index") ||
                                active === "pegawai.create" ||
                                active === "pegawai.edit" ||
                                active === "pegawai.show"
                            }
                            className="relative z-20"
                        >
                            <FaDatabase />
                            Kelola Data Pegawai
                        </NavLinkDashboard>

                        {/* Link Kelola Aturan Koefisen */}
                        <NavLinkDashboard
                            href={route("koefisien.index")}
                            active={route().current("koefisien.index")}
                            className="relative z-20 disabled "
                        >
                            <RiUserSettingsFill />
                            Kelola Aturan Koefisien
                        </NavLinkDashboard>
                    </section>
                )}

                {role === "Pimpinan" && (
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

                        {/* Link Cetak Dokumen */}
                        <NavLinkDashboard
                            href={route("pengajuan.index")}
                            active={route().current("pengajuan.index")}
                            className="relative z-20"
                        >
                            <FaPrint />
                            Pengajuan PAK
                        </NavLinkDashboard>
                    </section>
                )}
            </ul>

            {/* Decorative Bottom Shadow */}
            <div className="absolute inset-x-0 bottom-0 h-16 rounded-b-lg shadow-inner bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
    );
};

export default Sidebar;
