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
          {/* === LOGO AREA (UPDATED) === */}
            <div className={`
                flex items-center h-24 transition-all duration-300 border-b border-white/10
                ${isCollapsed ? "justify-center px-0" : "justify-start px-6 gap-3"}
            `}>
                {/* 1. Bagian Icon Kotak (Selalu Muncul) */}
                <a href="/" className="flex-shrink-0 transition-transform cursor-pointer hover:scale-105">
                    <div className="flex items-center justify-center w-10 h-10 border shadow-lg bg-secondary rounded-xl border-white/20 ">
                        <span className="text-[#c5a059] font-black text-xl">
                            X
                        </span>
                    </div>
                </a>

                {/* 2. Bagian Teks (Hilang saat Collapsed) */}
                <div className={`
                    flex flex-col overflow-hidden transition-all duration-300 whitespace-nowrap origin-left
                    ${isCollapsed ? "w-0 opacity-0 scale-0" : "w-auto opacity-100 scale-100"}
                `}>
                    <span className="text-xl font-extrabold tracking-tight text-slate-200/90">
                        Bank <span className="text-[#c5a059]/80">XYZ</span>
                    </span>
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
