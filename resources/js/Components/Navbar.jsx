import { Link } from "@inertiajs/react";
import { BiSolidDownArrowAlt } from "react-icons/bi";
import { IoIosArrowDown, IoMdArrowDropdown } from "react-icons/io";
import { ProfileImage } from ".";

const Navbar = ({ user, title }) => {
    let admin = false;
    let name = "a";
    let loggedIn = false;
    if (user) {
        name = user.email;
        loggedIn = true;
    }

    if (name == "admin@admin.com") {
        admin = true;
    }

    const nameParts = user.name.split(" ");
    const first = nameParts[0]
    const second = nameParts[1]
    const fullName = first + ' ' + second

    return (
        <div className="">
            <hr className="h-1 bg-base" />
            <div className="navbar bg-neutral text-neutral-content">
                <div className="flex-none">
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-square btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-5 h-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </label>
                </div>
                <div className="navbar-start">
                    <a className="text-xl normal-case btn btn-ghost">{title}</a>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="">
                            {!user ? (
                                <button className="mr-8 btn btn-ghost">
                                    Login / Register
                                </button>
                            ) : (
                                <div className="flex items-center justify-end gap-2 p-2 transition-all group/item w-60 hover:shadow-md hover:bg-base-100/10 rounded-xl hover:cursor-pointer">
                                    <div className="mr-1 font-semibold text-nowrap">
                                        <span className="block text-sm group-hover/item:text-primary ">
                                            {fullName}
                                        </span>
                                        <span
                                            className={
                                                "block text-xs text-right " +
                                                (user.role == "Ketua Tim"
                                                    ? "text-primary"
                                                    : "text-secondary")
                                            }
                                        >
                                            {user.divisi}
                                        </span>
                                    </div>
                                    {user.profile ? (
                                        <img
                                            src={user.profile}
                                            alt="pp"
                                            className="w-6 h-6 rounded-full avatar"
                                        />
                                    ) : (
                                        <ProfileImage name={fullName} className="w-8 h-8 text-sm" />
                                    )}
                                    <IoIosArrowDown className="w-5 h-5 fill-slate-500 group-hover/item:fill-primary" />
                                </div>
                            )}
                        </label>
                        <ul
                            tabIndex={0}
                            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-neutral rounded-box w-52 z-[50] relative text-black"
                        >
                            <>
                                <li>
                                    <Link href="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href={route("profile.edit")}>
                                        Edit Profil
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
                            </>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="h-1 bg-base" />
        </div>
    );
};

export default Navbar;
