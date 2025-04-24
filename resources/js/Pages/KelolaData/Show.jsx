import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { useForm } from "@inertiajs/react";
import { FaEdit } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Head, Link } from "@inertiajs/react";
import { DetailPegawai, SecondaryButton } from "@/Components";

export default function Show({ auth, pegawai, title }) {
    // console.log('isi current', current)
    return (
        <Authenticated
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <Head title={title} />
            <section className="px-24 mx-auto mb-24 phone:h-screen laptop:h-full max-w-screen-laptop">
                <div className="flex justify-between">
                    <div className="mt-2 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a
                                    href={route("pegawai.index")}
                                    className="gap-2"
                                >
                                    <FaDatabase className="w-4 h-4 stroke-current" />
                                    <span>Kelola Data</span>
                                </a>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    {pegawai.Nama}
                                </span>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    <FaUserEdit className="w-4 h-4 stroke-current" />

                                    {title}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <SecondaryButton
                        onClick={() => window.history.back()}
                        className="capitalize bg-secondary/5 "
                    >
                        <span>Kembali</span>
                        <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                    </SecondaryButton>
                </div>

                <div className="mt-10 overflow-x-auto">
                   <DetailPegawai pegawai={pegawai}/>

                    <div className="flex items-center justify-center w-full my-9">
                        <Link
                            as="a"
                            href={route("pegawai.edit", pegawai["NIP"])}
                        >
                            <SecondaryButton className="text-white scale-110 bg-secondary glass hover:bg-secondary">
                                <span>Edit Data</span>
                                <FaEdit className="w-4 h-5 mx-1 -mt-1 fill-white group-hover/button:fill-white" />
                            </SecondaryButton>
                        </Link>
                    </div>
                </div>
            </section>
        </Authenticated>
    );
}
