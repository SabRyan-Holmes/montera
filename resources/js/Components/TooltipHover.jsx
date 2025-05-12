import React from "react";

export default function TooltipHover({ message, className }) {
    return (
        <div
            className={`${className} absolute z-[999] w-fit px-3 py-1 mt-2 text-xs text-white transition-opacity duration-200
            -translate-x-1/2 bg-accent rounded shadow-lg opacity-0 pointer-events-none left-1/2 top-full group-hover:opacity-100`}
        >
            <small className={`font-semibold ${className}`}>{message}</small>{" "}
            {/* Segitiga bawah tooltip */}
            <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-accent -top-1 left-1/2"></div>
        </div>
    );
}
