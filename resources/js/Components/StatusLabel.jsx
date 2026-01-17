import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { RiLoader2Fill } from "react-icons/ri";

export default function StatusLabel({ status, isDone = false }) {
    // alert(status)
    return (
        <div className="group/item">
            {(status === "pending" ) && (
                <div className="text-xs transition-all duration-150 label-base bg-primary/40 text-slate-500 group-hover/item:text-slate-100">
                    {"Pending"}
                    <RiLoader2Fill className="ml-1 scale-125 fill-slate-500 stroke-slate-500 group-hover/item:fill-white" />
                </div>
            )}

            {status === "direvisi" && (
                <div
                    className="transition-all duration-150 label-base bg-bermuda/20 text-emerald-700 group-hover/item:text-slate-100"
                >
                    {status}
                    <RiLoader2Fill className="ml-1 scale-125 fill-slate-500 stroke-slate-500 group-hover/item:fill-white" />
                </div>
            )}

            {(status == "verified" ||
                status === "divalidasi" ||
                status === "selesai") && (
                <div                    className="inline-flex items-center transition-all duration-150 label-base bg-hijau/10 text-hijau/80 group-hover/item:text-hijau/60"
                >
                    {"Disetujui"}
                    <FaCheck className="ml-1 scale-125 fill-hijau/80 stroke-hijau/80 group-hover/item:fill-hijau" />
                </div>
            )}

            {status === "rejected" && (
                <div
                    className="inline-flex items-center transition-all duration-150 label-base bg-warning/10 text-warning/80 group-hover/item:text-warning/60"
                >
                    {"ditolak"}
                    <IoClose className="ml-1 scale-125 fill-warning/80 stroke-warning/80 group-hover/item:fill-warning" />
                </div>
            )}
        </div>
    );
}
