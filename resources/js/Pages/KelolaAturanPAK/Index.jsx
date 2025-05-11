import InputLabel from "@/Components/InputLabelCustom";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { BsPatchQuestion } from "react-icons/bs";
import { GoQuestion } from "react-icons/go";
import { FaTrash } from "react-icons/fa6";

export default function Index({ auth, title, flash }) {
    return (
        <Authenticated user={auth.user} title={title}>
            <main className="grid content-end w-full h-full grid-cols-2 grid-rows-3 gap-12 mx-auto mt-5 border-2 px-7">
                <section className="px-4 border rounded-lg mt-7 border-gradient">
                    <div className="m-5">
                        <div className="flex justify-between">
                            <strong className="text-2xl">Penanda Tangan</strong>
                            <GoQuestion className="w-10 h-10"/>
                        </div>

                        <InputLabel htmlFor="nama" value="Nama" />
                        <form>
                            {/*  */}
                            <div cl>

                            <InputLabel
                                htmlFor="nama"
                                value="Nama dari database"
                                />
                                </div>

                            {/*  */}
                        </form>
                    </div>
                </section>

            </main>
        </Authenticated>
    );
}
