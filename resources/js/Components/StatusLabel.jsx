import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { RiLoader2Fill } from "react-icons/ri";

export default function StatusLabel({ status }) {
    return (
        <>
            {status === "diproses" && (
                <button
                    disabled
                    className="label-base bg-accent/50 text-slate-500"
                >
                    diproses
                    <RiLoader2Fill className="ml-1 scale-125 fill-slate-500 stroke-slate-500 group-hover/item:fill-white" />
                </button>
            )}

            {status === "disetujui" && (
                <button
                    disabled
                    className="inline-flex items-center label-base bg-hijau/10 text-hijau/80"
                >
                    disetujui
                    <FaCheck className="ml-1 scale-125 fill-hijau/80 stroke-hijau/80 group-hover/item:fill-white" />
                </button>
            )}

            {status === "ditolak" && (
                <button
                    disabled
                    className="inline-flex items-center label-base bg-warning/10 text-warning/80"
                >
                    ditolak
                    <IoClose className="ml-1 scale-125 fill-warning/80 stroke-warning/80 group-hover/item:fill-white" />
                </button>
            )}
        </>
    );
}
