import { MdAdminPanelSettings } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDatabase, FaNotesMedical, FaPrint } from "react-icons/fa6";
import { MdSwitchAccount } from "react-icons/md";
import { Link } from "@inertiajs/react";
import logo from "../../assets/image/logo.png";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLinkDashboard from "@/Components/NavLinkDashboard";

const Sidebar = ({ active }) => {
    // console.log(active)
    return (
        <div className="relative shadow-2xl drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

            {/* Smooth Gradient Background */}
            <div className="absolute inset-0 transform scale-110 shadow-xl bg-gradient-to-br from-slate-950 via-gray-800 to-sky-950 rounded-tr-2xl rounded-br-2xl" />

            <ul className="relative z-10 min-h-full p-4 space-y-4 menu w-80 text-slate-100">
                {/* Sidebar content */}
                <div className="relative z-20 flex-col items-center justify-center mt-10">
                    {/* App Name */}
                    <strong className="flex justify-center text-2xl italic uppercase text-gradient gradient-base">
                        SiPacak
                    </strong>
                    {/* <strong className="block -mt-1 text-lg font-semibold text-center text-slate-600 ">
                        Sistem Pencetakan Angka Kredit
                    </strong> */}
                    {/* App Logo */}
                    <img
                        src={logo}
                        className="relative z-20 w-24 h-24 m-3 mx-auto mt-0 filter drop-shadow-lg"
                    />
                </div>

                <div className="relative z-20 h-[2px] mx-3 border-none outline-none rounded-md">
                    <div className="absolute inset-0 w-full h-full p-0 transition-colors duration-1000 ease-in-out rounded-md opacity-100 bg-gradient-to-r from-primary via-hijau to-secondary" />
                </div>

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
                            active === "cetak_dokumen.create"
                        }
                        className="relative z-20"
                    >
                        <FaPrint />
                        Cetak Dokumen
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
                        Kelola Data
                    </NavLinkDashboard>
                </section>
            </ul>

            {/* Decorative Bottom Shadow */}
            <div className="absolute inset-x-0 bottom-0 h-16 rounded-b-lg shadow-inner bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
    );
};

export default Sidebar;
