import ApplicationLogo from "@/Components/ApplicationLogo";
import AdminSidebar from "./SidebarByRole/AdminSidebar";
import PegawaiSidebar from "./SidebarByRole/PegawaiSidebar";
import SupervisorSidebar from "./SidebarByRole/SupervisorSidebar";
import KepalaCabangSidebar from "./SidebarByRole/KepalaCabangSidebar";

const Sidebar = ({ role, isAtasan }) => {
    const sidebarByRole = {
        Administrator: AdminSidebar,
        Supervisor: SupervisorSidebar,
        "Kepala Cabang": KepalaCabangSidebar,
        Pegawai: PegawaiSidebar,
    };

    const SidebarComponent = sidebarByRole[role] || <></>;

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
                        Bank XYZ
                    </strong>
                </div>
                <div className="relative z-20 flex-col items-center justify-center mt-10 space-y-6">
                    {/* App Name */}
                    <strong className="flex justify-center -mb-3 text-3xl tracking-wider uppercase text-gradient gradient-base">
                        MONTERA
                    </strong>

                    <div className="flex items-center justify-center h-20 mx-5 border rounded-xl bg-slate-400/50 border-y-primary/70 border-x-secondary/70 ">
                        <strong className="mx-5 text-lg font-semibold leading-6 text-center height text-slate-300 text-opacity-90 ">
                            Monitoring Target, Evaluasi & Realisasi Akuisisi
                        </strong>
                    </div>

                    {/* App Logo */}
                    {/* <img
                        src={logo}
                        className="relative z-20 w-24 h-24 m-3 mx-auto mt-0 filter drop-shadow-lg"
                    /> */}

                    <div className="relative z-20 h-[2px] mx-3 border-none outline-none rounded-md bg-slate-300 ">
                        <div className="absolute inset-0 w-full h-full p-0 transition-colors duration-1000 ease-in-out rounded-md opacity-100 bg-gradient-to-r from-primary via-primary/20 to-secondary" />
                    </div>
                </div>

                <SidebarComponent />


            </ul>

            {/* Decorative Bottom Shadow */}
            <div className="absolute inset-x-0 bottom-0 h-16 rounded-b-lg shadow-inner bg-gradient-to-t from-slate-900 to-transparent" />
        </section>
    );
};

export default Sidebar;
