import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";

export default function Authenticated({ user, title, header, children, current }) {
    // console.log('isi current', current)

    return (
        <div className="h-full">
            <Head title={title} />

            <div className="h-full drawer tablet:drawer-open">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="flex flex-col h-full drawer-content bg-neutral">
                    <Navbar user={user} title={title} />
                    <div className="h-full mx-6 mt-6 bg-white">
                        <main>{children}</main>
                    </div>
                </div>
                <Sidebar
                    active={(current? current :  route().current("dashbard"))}
                    divisi={user.name}
                ></Sidebar>
            </div>
        </div>
    );
}
