import { Link } from "@inertiajs/react";
import { BiSolidDownArrowAlt } from "react-icons/bi";
const Navbar = ({user, title}) => {
    let admin = false
    let name = 'a'
    let loggedIn = false
    if (user) {
      name = user.email
      loggedIn = true
    }

    if (name == 'admin@admin.com') {
      admin = true
    }

    return (
      <div className="">
        <hr className="h-1 bg-base" />
        <div className="navbar bg-neutral text-neutral-content">
            <div className="flex-none">
                <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
          <div className="navbar-start">
            <Link href="/dashboard" method="GET" as="button"><a className="btn btn-ghost normal-case text-xl">{user.name}</a></Link>
          </div>
          <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="">
                        {!user ? <button className="btn btn-ghost mr-8">Login / Register</button> :
                        <button className="btn btn-ghost mr-8">Logged In as {user.name} <BiSolidDownArrowAlt size="1.5em"></BiSolidDownArrowAlt></button>}

                      </label>
                      <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-neutral rounded-box w-52 z-[50] relative text-black">
                          <>
                        <li><Link href="/home">Homepage</Link></li>
                        <li><Link href={route('profile.edit')}>Edit Profile</Link></li>
                        <li><Link href={route('logout')} method="post" as="button">Logout</Link></li>
                          </>
                      </ul>
                    </div>
          </div>
        </div>
        <hr className="h-1 bg-base" />
      </div>
    );
}

export default Navbar
