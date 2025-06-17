import { Link } from "@inertiajs/react";

export default function SidebarLink({
    active = false,
    actives = [],
    className = '',
    children,
    asDownload = false, // NEW
    ...props
}) {
    const isActive = active || actives.some((r) => route().current(r));

    const classNames =
        'font-bold flex items-center ' +
        (isActive
            ? 'border-primary/80 text-primary focus:border-primary bg-slate-700/80 active:bg-hijau '
            : 'border-transparent hover:text-bermuda focus:text-secondary active:text-secondary active:bg-primary ') +
        className;

    if (asDownload) {
        return (
            <li className="p-0 my-1 -mx-3 text-base hover:text-primary active:text-primary focus:bg-success">
                <a
                    href={props.href}
                    className={classNames}
                    download={false} // ⚠️ let browser handle prompt
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {children}
                </a>
            </li>
        );
    }

    return (
        <li className="p-0 my-1 -mx-3 text-base hover:text-primary active:text-primary focus:bg-success">
            <Link {...props} className={classNames}>
                {children}
            </Link>
        </li>
    );
}







