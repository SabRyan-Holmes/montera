import { Link } from "@inertiajs/react";

export default function SecondaryButton({
    type = "button",
    className = "",
    disabled,
    children,
    asLink = false,
    ...props
}) {
    // Cek apakah ada class background (`bg-`) dalam className yang diberikan
    const hasCustomBg = /(^|\s)bg-[^\s]+/.test(className);

    const commonClassName = `
        ${className}
        ${!hasCustomBg ? "bg-white" : ""}
        inline-flex items-center h-10 px-4 py-2 border hover:border-secondary hover:scale-105 border-secondary/60 rounded-md font-bold text-xs text-secondary
        uppercase tracking-widest shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150
        ${disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : ""}
    `;

    if (asLink) {
        return (
            <Link
                as="button"
                {...props}
                type={type}
                className={commonClassName}
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
            className={commonClassName}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
