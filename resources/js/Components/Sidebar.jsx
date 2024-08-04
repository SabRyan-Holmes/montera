import { MdAdminPanelSettings } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaDatabase, FaNotesMedical, FaPrint } from "react-icons/fa6";
import { MdSwitchAccount } from "react-icons/md";
import { Link } from "@inertiajs/react";
import logo from "../../assets/image/logo.png";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLinkDashboard from "@/Components/NavLinkDashboard";


const Sidebar = ({active  }) => {
    // console.log(active)
    return (
        <div className="drawer-side  shadow-2xl">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-72 min-h-full bg-gradient-to-b text-opacity-75 from-slate-950 to bg-cyan-950  text-slate-100 h-full">
                {/* Sidebar content here */}
                <div className="flex-col justify-center items-center mt-7">
                    {/* App Name */}
                    <strong className="flex justify-center text-2xl text-gradient gradient-bps">SiPacak</strong>
                    {/* App Logo */}
                    <img
                        src={logo}
                        className=" text-primary/70 w-24 h-24 m-3 mx-auto"
                    />
                </div>

                {/* <ApplicationLogo className="mx-16 " /> */}
                <div className="border-b-2 border-yellow-600 mt-4 mb-2" />

                {/* Link Dashboard */}
                <NavLinkDashboard
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                >
                    <MdSpaceDashboard />
                    Dashboard
                </NavLinkDashboard>

                {/* Link Dashboard */}
                <NavLinkDashboard
                    href={route("cetak_dokumen.index")}
                    active={active ? active : route().current("cetak_dokumen.index")}
                >
                    <FaPrint />
                    Cetak Dokumen
                </NavLinkDashboard>

                {/* Link Dashboard */}
                <NavLinkDashboard
                    href={route("pegawai.index")}
                    active={active ? active :route().current("pegawai.index")}
                >
                    <FaDatabase />
                    Kelola Data
                </NavLinkDashboard>


            </ul>
        </div>
    );
};

export default Sidebar;
