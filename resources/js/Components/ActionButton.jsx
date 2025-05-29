// import { Link } from "@inertiajs/react";
// import React from "react";

// export default function ActionButton({
//     type = "button",
//     className = "",
//     disabled,
//     children,
//     asLink = false, // ← tambahkan ini
//     ...props
// }) {

//     const commonClassName = `
//     ${className}
//     transition-all scale-110 group/button action-btn border-hijau/20 hover:bg-hijau disabled:bg-accent/25 disabled:cursor-not-allowed
//     ${disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : ""}
// `;
//     if (asLink) {
//         return (
//             <Link
//                 as="button"
//                 {...props}
//                 type={type}
//                 className={`${className} inline-flex items-center h-10 px-4 py-2 border hover:border-secondary hover:scale-105  border-secondary/60 rounded-md font-bold text-xs text-secondary
//                      uppercase tracking-widest shadow-sm  focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
//                          disabled &&
//                          "opacity-50 cursor-not-allowed hover:scale-100"
//                      } `}
//                 disabled={disabled}
//             >
//                 {children}
//             </Link>
//         );
//     }

//     return (
//         <button
//             {...props}
//             type={type}
//             className={commonClassName}
//             disabled={disabled}
//         >
//             {children}
//         </button>
//     );
// }

//     return (
//         <Link
//             as="button"
//             href={route("pimpinan.pengajuan.approve")}
//             className="transition-all scale-110 group/button action-btn border-hijau/20 hover:bg-hijau disabled:bg-accent/25 disabled:cursor-not-allowed "
//             disabled={pengajuan.status !== "diajukan"}
//             method="post"
//             data={{
//                 fast_approve: true,
//                 id: pengajuan.id,
//             }}
//             preserveScroll={true}
//             onError={() => console.log("Error:", errors)}
//         >
//             <FaCheck
//                 className={
//                     "scale-125 group-hover/button:fill-white " +
//                     (pengajuan.status !== "diproses"
//                         ? "fill-accent"
//                         : "fill-hijau")
//                 }
//             />
//         </Link>
//     );
// }
