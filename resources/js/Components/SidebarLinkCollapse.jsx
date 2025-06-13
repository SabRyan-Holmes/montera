import { SidebarLink } from ".";

export default function SidebarLinkCollapse({ children, submenu }) {
    // Mengecek apakah salah satu submenu sedang aktif
    const isAnyActive = submenu.some((item) =>
        item.actives?.some((r) => route().current(r))
    );

    return (
        <li className="mx-2 active:text-primary">
            <details open={isAnyActive}>
                <summary className="text-base font-bold text-white cursor-pointer">{children}</summary>
                <ul>
                    {submenu.map((item, i) => (
                        <SidebarLink
                            key={i}
                            href={route(item.route)}
                            active={item.actives?.some((r) => route().current(r))}
                            asDownload={item.route.includes('download') || item.route.includes('help')} // Custom flag
                        >
                            {item.label}
                        </SidebarLink>
                    ))}
                </ul>
            </details>
        </li>
    );
}
