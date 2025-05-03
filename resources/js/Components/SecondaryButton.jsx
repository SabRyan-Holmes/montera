import { Link } from "@inertiajs/react";

export default function SecondaryButton({
    type = "button",
    className = "",
    disabled,
    children,
    asLink = false, // ← tambahkan ini
    ...props
}) {
    const commonClassName = `
        ${className}
        inline-flex items-center h-10 px-4 py-2 border border-secondary/30 rounded-md font-bold text-xs text-secondary
        uppercase tracking-widest shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2
        disabled:opacity-25 transition ease-in-out duration-150 hover:border-secondary hover:scale-105
        ${disabled ? "opacity-25" : ""}
    `;

    if (asLink) {
        return (
            <Link
                as="button"
                {...props}
                type={type}
                className={`${className} inline-flex items-center h-10 px-4 py-2 border hover:border-secondary hover:scale-105  border-secondary/60 rounded-md font-bold text-xs text-secondary
                     uppercase tracking-widest shadow-sm  focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
                         disabled && "opacity-25"
                     } `}
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

// import { Link } from "@inertiajs/react";

// export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
//     return (
//         <Link
//             as="button"
//             {...props}
//             type={type}
//             className={
//                 `${className} inline-flex items-center h-10 px-4 py-2 border hover:border-secondary hover:scale-105  border-secondary/30 rounded-md font-bold text-xs text-secondary
//                  uppercase tracking-widest shadow-sm  focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
//                     disabled && 'opacity-25'
//                 } `
//             }
//             disabled={disabled}
//         >
//             {children}
//         </Link>
//     );
// }
