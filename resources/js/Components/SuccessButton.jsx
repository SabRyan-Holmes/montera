import { Link } from "@inertiajs/react";

export default function SuccessButton({
    type = "button",
    className = "",
    disabled,
    children,
    asLink = false,
    ...props
}) {
    if (asLink) {
        return (
            <Link
                as="button"
                {...props}
                className={`${className} inline-flex glass items-center px-4 py-2 bg-hijau border border-transparent rounded-md font-semibold text-xs text-white uppercase
                tracking-widest hover:hijau/80 focus:hijau/80 active:bg-hijau/90 focus:outline-none focus:ring-2 focus:ring-hijau focus:ring-offset-2
                transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                }`}
                disabled={disabled}
            >
                {children}
            </Link>
        );
    }
    return (
        <button
            {...props}
            type={type}
            className={`${className} inline-flex glass items-center px-4 py-2 bg-hijau border border-transparent rounded-md font-semibold text-xs text-white uppercase
            tracking-widest hover:hijau/80 focus:hijau/80 active:bg-hijau/90 focus:outline-none focus:ring-2 focus:ring-hijau focus:ring-offset-2
            transition ease-in-out duration-150 hover:scale-105 hover:bg-hijau/80 ${
                disabled && "opacity-25"
            }`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
