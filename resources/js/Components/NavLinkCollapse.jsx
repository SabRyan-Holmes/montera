import { Link } from "@inertiajs/react";
import { MdOutlineDocumentScanner } from "react-icons/md";
import CollapsedLink from "./CollapsedLink";

export default function NavLink({
    active = false,
    className = "",
    children,
    submenu,
    routes,
    ...props
}) {
    return (
        <li className=" active:text-primary">
            <details open>
                <summary>{children}</summary>
                <ul>
                {submenu.map((data, i) => (
                    <CollapsedLink key={i} submenu={data} href={route(routes[i])} active={route().current(routes[i])} />
                ))}
                    {/* {submenu.map((data, i) => (
                        <li
                            key={i}
                            className="hover:text-yellow-600 active:text-primary"
                        >
                            <Link
                                {...props}
                                className={
                                    "font-bold flex " +
                                    (active
                                        ? "border-primary/80 text-yellow-600 focus:border-primary "
                                        : "border-transparent  hover:text-primary hover:border-gray-300 focus:text-secondary active:text-secondary focus:border-gray-300 ") +
                                    className
                                }
                            >
                                {data}
                            </Link>
                        </li>
                    ))} */}
                </ul>
            </details>
        </li>
    );
}
