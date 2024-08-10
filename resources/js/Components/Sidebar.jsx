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
        <div className="drawer-side shadow-2xl relative">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

            {/* Smooth Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-800 to-sky-950 transform scale-110 rounded-tr-2xl rounded-br-2xl shadow-xl" />

            <ul className="menu p-4 w-80 min-h-full relative z-10 text-slate-100 space-y-4">
                {/* Sidebar content */}
                <div className="flex-col justify-center items-center mt-10 relative z-20">
                    {/* App Name */}
                    <strong className="flex justify-center text-2xl text-gradient gradient-bps">
                        SiPacak
                    </strong>

                    {/* App Logo */}
                    <img
                        src={logo}
                        className="w-24 h-24 m-3 mx-auto filter drop-shadow-lg relative z-20"
                    />
                </div>

                <div className="relative z-20 h-[2px] mx-3 border-none outline-none rounded-md">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary rounded-md via-hijau to-secondary p-0 opacity-100 h-full w-full transition-colors duration-1000 ease-in-out" />
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
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900 to-transparent rounded-b-lg shadow-inner" />
        </div>
    );
};

export default Sidebar;
