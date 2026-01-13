import { Link } from "@inertiajs/react";

export default function SidebarLink({
    active = false,
    actives = [],
    className = '',
    children,
    asDownload = false,
    isCollapsed = false,
    ...props
}) {
    // Cek route aktif
    const isActive = active || actives.some((r) => route().current(r));

    // --- STYLE LOGIC ---

    // 1. BASE CLASSES
    // Saat collapsed: Hapus padding horizontal (px-0), Hapus rounded aneh-aneh.
    const baseClasses = `
        relative flex items-center transition-all duration-300 ease-in-out font-medium
        min-h-[48px] my-1
        ${isCollapsed ? 'justify-center px-0 rounded-lg' : 'justify-start px-5 space-x-3 rounded-l-lg'}
    `;

    // 2. ACTIVE CLASSES (LOGIC BARU DI SINI)
    let activeClasses = "";

    if (isActive) {
        // KONDISI 1: AKTIF
        if (isCollapsed) {
            // Pas Collapse: Warna Primary (Emas), Background transparan/tipis, TANPA GARIS
            activeClasses = "text-primary  border-none ";
        } else {
            // Pas Lebar: Warna Putih, Gradient, GARIS KIRI EMAS
            activeClasses = "bg-gradient-to-r from-white/10 to-transparent text-white border-l-4 border-primary shadow-sm";
        }
    } else {
        // KONDISI 2: TIDAK AKTIF
        if (isCollapsed) {
             // Pas Collapse: Abu-abu, hover putih, TANPA GARIS transparan (biar gak geser)
            activeClasses = "text-slate-400 hover:text-white border-none bg-none";
        } else {
             // Pas Lebar: Abu-abu, hover putih, ada border transparan kiri (biar sejajar sama yang aktif)
            activeClasses = "text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent bg-none";
        }
    }

    const combinedClasses = `${baseClasses} ${activeClasses} ${className}`;

    // --- HELPER RENDER ---
    const renderContent = () => {
        if (Array.isArray(children)) {
            return (
                <>
                    {/* ICON: Membesar sedikit saat collapsed */}
                    <span className={`transition-all duration-300 z-10 ${isCollapsed ? 'text-2xl' : 'text-xl'}`}>
                        {children[0]}
                    </span>

                    {/* TEKS: Hilang saat collapsed */}
                    <span className={`
                        whitespace-nowrap overflow-hidden transition-all duration-300 origin-left
                        ${isCollapsed ? 'w-0 opacity-0 scale-0 hidden' : 'w-auto opacity-100 scale-100 block'}
                    `}>
                        {children.slice(1)}
                    </span>

                    {/* TOOLTIP: Hover saat collapsed */}
                    {isCollapsed && (
                        <div className="absolute left-16 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/10">
                            {children.slice(1)}
                        </div>
                    )}
                </>
            );
        }
        return children;
    };

    if (asDownload) {
        return (
            <li className="list-none group">
                <a
                    href={props.href}
                    className={combinedClasses}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={isCollapsed ? "Download" : ""}
                >
                    {renderContent()}
                </a>
            </li>
        );
    }

    return (
        <li className="list-none group">
            <Link {...props} className={combinedClasses}>
                {renderContent()}
            </Link>
        </li>
    );
}
