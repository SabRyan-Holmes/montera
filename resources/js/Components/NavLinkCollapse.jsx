import { NavLinkDashboard } from ".";

export default function NavLinkCollapse({ children, submenu }) {
    // Mengecek apakah salah satu submenu sedang aktif
    const isAnyActive = submenu.some((item) =>
        item.actives?.some((r) => route().current(r))
    );

    return (
        <li className="active:text-primary">
            <details open={isAnyActive}>
                <summary className="cursor-pointer">{children}</summary>
                <ul>
                    {submenu.map((item, i) => (
                        <NavLinkDashboard
                            key={i}
                            href={route(item.route)}
                            active={item.actives?.some((r) => route().current(r))}
                        >
                            {item.label}
                        </NavLinkDashboard>
                    ))}
                </ul>
            </details>
        </li>
    );
}
