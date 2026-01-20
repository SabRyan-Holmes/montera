import { Link } from "@inertiajs/react";
import { HiMenuAlt2, HiMenuAlt3 } from "react-icons/hi"; // Icon Hamburger
import { IoIosArrowDown } from "react-icons/io";

const Navbar = ({ user, title, toggleSidebar, isSidebarOpen }) => {
    return (
        <nav>
            <hr className="h-1 bg-base" />
            <div className="relative z-30 shadow-sm navbar bg-neutral text-neutral-content">
                {/* BAGIAN KIRI: Hamburger & Title */}
                <div className="flex items-center flex-none gap-2">
                    {/* TOMBOL HAMBURGER UTAMA */}
                    <button
                        onClick={toggleSidebar}
                        className="btn btn-square btn-ghost text-slate-500 hover:text-primary hover:bg-slate-100"
                    >
                        {isSidebarOpen ? (
                            <HiMenuAlt2 className="w-6 h-6" />
                        ) : (
                            <HiMenuAlt3 className="w-6 h-6" />
                        )}
                    </button>
                </div>

                <div className="navbar-start">
                    <a className="ml-4 text-xl font-semibold normal-case text-slate-700">
                        {title}
                    </a>
                </div>

                {/* BAGIAN KANAN: User Profile (Sama seperti kode awal Anda) */}
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="">
                            {!user ? (
                                <button className="mr-8 btn btn-ghost">
                                    Login / Register
                                </button>
                            ) : (
                                <div className="flex items-center justify-end gap-2 p-2 transition-all group/item w-fit hover:shadow-md hover:bg-base-100/10 rounded-xl hover:cursor-pointer">
                                    <div className="mr-1 font-semibold text-nowrap text-slate-600">
                                        <span className="block text-sm group-hover/item:text-primary">
                                            {user.name}
                                        </span>
                                        <span className="block text-sm group-hover/item:text-primary">
                                            {user.jabatan?.nama_divisi ?? ""}
                                        </span>
                                    </div>
                                    <IoIosArrowDown className="w-5 h-5 fill-slate-500 group-hover/item:fill-primary" />
                                </div>
                            )}
                        </label>
                        <ul
                            tabIndex={0}
                            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52 z-[50] relative text-black"
                        >
                            <li>
                                <Link href="/dashboard">Dashboard</Link>
                            </li>
                            <li>
                                <Link href={route("profile.edit")}>
                                    Update Profil & Akun
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="h-1 bg-base" />
        </nav>
    );
};

export default Navbar;
