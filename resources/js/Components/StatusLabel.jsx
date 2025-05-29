import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { RiLoader2Fill } from "react-icons/ri";

export default function StatusLabel({ status }) {
    return (
        <div className="group/item ">
            {status === "diproses" ||  status === "diajukan" && (
                <button
                    disabled
                    className="transition-all duration-150 label-base bg-accent/50 text-slate-500 group-hover/item:text-slate-100"
                >
                    {status}
                    <RiLoader2Fill className="ml-1 scale-125 fill-slate-500 stroke-slate-500 group-hover/item:fill-white" />
                </button>
            )}

            {status === "disetujui" && (
                <button
                    disabled
                    className="inline-flex items-center transition-all duration-150 label-base bg-hijau/10 text-hijau/80 group-hover/item:text-hijau/60"
                >
                    disetujui
                    <FaCheck className="ml-1 scale-125 fill-hijau/80 stroke-hijau/80 group-hover/item:fill-white" />
                </button>
            )}

            {status === "ditolak" && (
                <button
                    disabled
                    className="inline-flex items-center transition-all duration-150 label-base bg-warning/10 text-warning/80 group-hover/item:text-warning/60"
                >
                    ditolak
                    <IoClose className="ml-1 scale-125 fill-warning/80 stroke-warning/80 group-hover/item:fill-white" />
                </button>
            )}
        </div>
    );
}
