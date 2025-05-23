import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
export default function Index({ auth, arsipDokumens, title, flash }) {
    return (
        <Authenticated user={auth.user} title={title}>
            <section className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">



            </section>
        </Authenticated>
    );
}
