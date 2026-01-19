import ApplicationLogo from "@/Components/ApplicationLogo";
import AdminSidebar from "./SidebarByRole/AdminSidebar";
import PegawaiSidebar from "./SidebarByRole/PegawaiSidebar";
import SupervisorSidebar from "./SidebarByRole/SupervisorSidebar";
import KepalaCabangSidebar from "./SidebarByRole/KepalaCabangSidebar";

const Sidebar = ({ user, isCollapsed }) => {
    const role = user.jabatan?.nama_jabatan;

    const sidebarByRole = {
        Administrator: AdminSidebar,
        Supervisor: SupervisorSidebar,
        "Kepala Cabang": KepalaCabangSidebar,
        Pegawai: PegawaiSidebar,
    };

    const SidebarComponent = sidebarByRole[role] || (() => <></>);

    return (
        <aside
            className={`
                h-screen sticky top-0 shadow-2xl transition-all duration-300 ease-in-out flex flex-col z-20
                ${isCollapsed ? "w-20" : "w-80"}
                bg-secondary text-white
            `}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-secondary to-slate-900 -z-10" />

            {/* === LOGO AREA === */}
            {/* Tambahkan min-w-max agar konten tidak gepeng saat transisi */}
            <div className={`
                flex items-center h-20 transition-all duration-300 border-b border-white/10
                ${isCollapsed ? "justify-center px-0" : "justify-start px-6 gap-3"}
            `}>
                <div className="flex items-center justify-center flex-shrink-0">
                    <a href="/">
                        <ApplicationLogo className="w-8 h-8 transition-transform fill-current text-primary hover:scale-110" />
                    </a>
                </div>

                <div className={`
                    flex flex-col overflow-hidden transition-all duration-300 whitespace-nowrap
                    ${isCollapsed ? "w-0 opacity-0 scale-0" : "w-auto opacity-100 scale-100"}
                `}>
                    <span className="text-lg font-bold tracking-wide text-white">
                        Bank XYZ
                    </span>
                    {/* <span className="text-[10px] font-medium text-primary/80 uppercase tracking-widest">
                        Montera
                    </span> */}
                </div>
            </div>

            {/* === MENU LIST === */}
            {/* PENTING: overflow-x-hidden MENGHILANGKAN SCROLLBAR BAWAH */}
            <div className="flex-1 px-3 py-6 overflow-x-hidden overflow-y-auto custom-scrollbar">
                <SidebarComponent isCollapsed={isCollapsed} />
            </div>

            {/* === FOOTER === */}
            <div className={`
                p-4 border-t border-white/10 text-center text-xs text-slate-400 transition-opacity duration-300 whitespace-nowrap overflow-hidden
                ${isCollapsed ? "opacity-0 hidden" : "opacity-100 block"}
            `}>
                &copy; 2026 BANK XYZ
            </div>
        </aside>
    );
};

export default Sidebar;
