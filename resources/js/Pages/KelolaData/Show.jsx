import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { useForm } from "@inertiajs/react";
import { FaEdit } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import {  FaUserEdit } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Head, Link } from "@inertiajs/react";
import { SecondaryButton } from "@/Components";

export default function Show({ auth, pegawai, title }) {
    // console.log('isi current', current)
    return (
        <Authenticated
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <Head title={title}/>
            <section className="phone:h-screen laptop:h-full max-w-screen-laptop mx-auto px-24 mb-24">
            <div className="flex justify-between">
                    <div className="breadcrumbs mt-2 text-sm">
                        <ul>
                            <li>
                                <a
                                    href={route("pegawai.index")}
                                    className="gap-2"
                                >
                                    <FaDatabase className="h-4 w-4 stroke-current" />
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
                                    <FaUserEdit className="h-4 w-4 stroke-current" />

                                    {title}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <SecondaryButton
                        onClick={() => window.history.back()}
                        className="bg-secondary/5 capitalize "
                    >
                        <span>Kembali</span>
                        <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                    </SecondaryButton>
                </div>

                <h1 className="my-6 text-2xl capitalize">
                    {title}
                </h1>

                <div className="overflow-x-auto">
                    <table className="table text-base">
                        {/* head */}
                        <thead>
                            <tr className="text-lg bg-primary/70">
                                <th colSpan={2}>Detail Pegawai</th>
                                {/* <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td>Nama</td>
                                <td>{pegawai.Nama}</td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <td>NIP/NRP</td>
                                <td>{pegawai["NIP/NRP"]}</td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <td>NOMOR SERI KARPEG</td>
                                <td>{pegawai["NOMOR SERI KARPEG"]}</td>
                            </tr>
                            <tr>
                                <td>PANGKAT/GOLONGAN/TMT</td>
                                <td>
                                    {pegawai["Pangkat/Golongan Ruangan/TMT"]}
                                </td>
                            </tr>
                            <tr>
                                <td>TEMPAT/TANGGAL LAHIR</td>
                                <td>{pegawai["Tempat/Tanggal Lahir"]}</td>
                            </tr>
                            <tr>
                                <td>JENIS KELAMIN</td>
                                <td>{pegawai["Jenis Kelamin"]}</td>
                            </tr>
                            <tr>
                                <td>PENDIDIKAN</td>
                                <td>{pegawai["Pendidikan"]}</td>
                            </tr>
                            <tr>
                                <td>JABATAN/TMT</td>
                                <td>{pegawai["Jabatan/TMT"]}</td>
                            </tr>
                            <tr>
                                <td>MASA KERJA GOLONGAN</td>
                                <td>{pegawai["Masa Kerja Golongan"]}</td>
                            </tr>
                            <tr>
                                <td>UNIT KERJA</td>
                                <td>{pegawai["Unit Kerja"]}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="w-full flex justify-center my-4">
                        <Link as="a"
                            href={route('pegawai.edit', pegawai.id)}
                            className="group/button text-base btn glass scale-95  bg-secondary/30 border hover:bg-secondary hover:text-white border-secondary/20 text-secondary px-5 gap-3"
                        >
                            <span>Edit Data</span>
                            <FaEdit className="w-4 h-5 fill-secondary group-hover/button:fill-white" />
                        </Link>
                    </div>
                </div>
            </section>
        </Authenticated>
    );
}
