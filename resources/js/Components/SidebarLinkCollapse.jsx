import { SidebarLink } from ".";
import { HiChevronDown, HiChevronRight } from "react-icons/hi"; // Icon panah
import { useState, useEffect } from "react";

export default function SidebarLinkCollapse({
    children,
    submenu,
    isCollapsed,
}) {
    // 1. Cek apakah ada anak menu yang aktif
    const isAnyActive = submenu.some((item) =>
        item.actives?.some((r) => route().current(r))
    );

    // 2. State Lokal untuk Buka/Tutup (Sinkron dengan isAnyActive saat pertama render)
    const [isOpen, setIsOpen] = useState(isAnyActive);

    // Efek: Jika sidebar di-collapse, paksa tutup menu biar ga berantakan
    useEffect(() => {
        if (isCollapsed) {
            setIsOpen(false);
        } else if (isAnyActive) {
            // Jika sidebar dibuka kembali dan menu ini aktif, buka lagi otomatis
            setIsOpen(true);
        }
    }, [isCollapsed, isAnyActive]);

    // 3. STYLE LOGIC (Mirip SidebarLink)
    // Parent Menu styling (Header Collapsible)
    const parentBaseClasses = `
        relative flex items-center justify-between w-full transition-all duration-300 ease-in-out font-medium
        min-h-[48px] my-1 cursor-pointer select-none mx-5
        ${isCollapsed ? "justify-center px-0 rounded-lg mx-0" : "px-5 rounded-l-lg"}
    `;

    // Warna saat aktif vs tidak aktif (untuk Header-nya)
    const parentClasses = isAnyActive
        ? isCollapsed
            ? "text-primary border-none " // Collapsed Aktif
            : "mx-6" // Expanded Aktif
        : isCollapsed
        ? "text-slate-400 hover:text-white" // Collapsed Inaktif
        : "text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent"; // Expanded Inaktif

    return (
        <li className="mb-1 list-none">
            {/* --- HEADER MENU (TOMBOL KLIK) --- */}
            <div
                onClick={() => !isCollapsed && setIsOpen(!isOpen)}
                className={`${parentBaseClasses} ${parentClasses}  group relative`}
                title={isCollapsed ? "Menu Grup" : ""}
            >
                {/* Bagian Kiri: Icon + Label */}
                <div
                    className={`flex items-center ${
                        isCollapsed ? "justify-center w-full" : "space-x-3"
                    }`}
                >
                    {/* Icon Utama (Ambil dari children span pertama jika struktur sama) */}
                    <span
                        className={`transition-all duration-300 z-10 ${
                            isCollapsed ? "text-2xl" : "text-xl"
                        }`}
                    >
                        {/* Kita asumsikan children[0] adalah span icon */}
                        {children.props?.children[0]}
                    </span>

                    {/* Label Teks (Hilang saat Collapsed) */}
                    <span
                        className={`
                        whitespace-nowrap overflow-hidden transition-all duration-300 origin-left flex-1
                        ${
                            isCollapsed
                                ? "w-0 opacity-0 scale-0 hidden"
                                : "w-auto opacity-100 scale-100 block"
                        }
                    `}
                    >
                        {/* Kita asumsikan children[0] adalah span label */}
                        {children.props?.children[1]}
                    </span>
                </div>

                {/* Bagian Kanan: Panah Chevron (Hanya muncul saat Expanded) */}
                {!isCollapsed && (
                    <div className="transition-transform duration-300 mr-7 text-slate-500">
                        {isOpen ? <HiChevronDown /> : <HiChevronRight />}
                    </div>
                )}

                {/* --- TOOLTIP SAAT COLLAPSED --- */}
                {/* Saat di-hover dalam mode collapse, muncul tooltip nama menu */}
                {isCollapsed && (
                    <div className="absolute left-16 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/10">
                        {children.props?.children[1]}
                    </div>
                )}
            </div>

            {/* --- SUBMENU LIST --- */}
            {/* Animasi smooth saat expand/collapse */}
            <div
                className={`
                    overflow-hidden transition-[max-height] duration-500 ease-in-out
                    ${
                        isOpen && !isCollapsed
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                    }
                `}
            >
                <ul className="mt-1 border-l border-white/10">
                    {submenu.map((item, i) => (
                        <SidebarLink
                            key={i}
                            href={route(item.route)}
                            // Cek active lebih detail
                            active={item.actives?.some((r) =>
                                route().current(r)
                            )}
                            asDownload={
                                item.route.includes("download") ||
                                item.route.includes("help")
                            }
                            // Submenu tidak perlu prop isCollapsed karena sidebar induk sudah expanded jika submenu muncul
                            isCollapsed={false}
                            // Style khusus submenu (lebih kecil, padding dikit)
                            className="!min-h-[40px] text-[15px] !px-4 !my-0.5 ml-4"
                        >
                            {/* Dot Icon Kecil untuk Submenu */}
                            <span className="mr-2 bg-current rounded-full opacity-60 "></span>
                            <div className="flex items-center justify-center gap-2">{item.label}</div>
                        </SidebarLink>
                    ))}
                </ul>
            </div>
        </li>
    );
}
