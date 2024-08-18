import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { useForm } from "@inertiajs/react";
import { FaEdit } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Head, Link } from "@inertiajs/react";
import {  SecondaryButton } from "@/Components";

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

                <h1 className="my-6 text-2xl capitalize">{title}</h1>

                <div className="overflow-x-auto">
                    <table className="table text-base table-bordered">
                        {/* head */}
                        <thead>
                            <tr className="text-lg bg-primary/70">
                                <th colSpan={2}>Detail Pegawai</th>
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

                    <div className="flex items-center justify-center w-full my-9">
                        <Link as="a" href={route("pegawai.edit", pegawai.id)}>
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
