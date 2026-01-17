import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import useSwal from "@/Hooks/UseSwal";
import moment from "moment/min/moment-with-locales";

export default function Authenticated({ user, title, children }) {
    useSwal();
    // 1. UBAH STATE: Cek LocalStorage dulu saat inisialisasi
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        // Cek apakah ada simpanan state di browser?
        const savedState = localStorage.getItem("sidebarOpen");
        // Jika ada, pakai itu. Jika tidak, default True (Terbuka).
        return savedState !== null ? JSON.parse(savedState) : true;
    });

    // 2. FUNGSI TOGGLE: Simpan ke LocalStorage setiap kali berubah
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => {
            const newState = !prev;
            localStorage.setItem("sidebarOpen", JSON.stringify(newState));
            return newState;
        });
    };
    moment.locale("id");

    return (
        <section className="flex h-screen overflow-hidden font-sans text-gray-900 bg-gray-50">
            <Head title={title} />

            {/* SIDEBAR */}
            <div className="relative z-40 flex-shrink-0 h-full overflow-hidden ">
                <Sidebar user={user} isCollapsed={!isSidebarOpen} />
            </div>

            {/* MAIN CONTENT */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <Navbar
                    user={user}
                    title={title}
                    toggleSidebar={toggleSidebar}
                    isSidebarOpen={isSidebarOpen}
                />

                <main className="flex-1 p-6 overflow-y-auto scroll-smooth">
                    {children}
                </main>
            </div>
        </section>
    );
}
