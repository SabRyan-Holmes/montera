import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdPersonSearch } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import { jsPDF } from "jspdf";

import { FaEdit } from "react-icons/fa";

export default function Show({ auth, pegawai, title }) {
    // console.log('isi current', current)
    return (
        <Authenticated
            user={auth.user}
            title={title}
            current={route().current("cetak_dokumen.index")}
        >
            <section className="m-10 h-screen">
                <h1 className="my-10 text-3xl capitalize">
                    Data untuk pencetakan dokumen pak
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

                    <div className="w-full flex justify-center my-4  ">
                        <button className="action-btn text-base bg-secondary/15 text-secondary px-3 gap-3">
                            <span>Edit Data</span>
                            <FaEdit className="w-6 h-6 fill-secondary" />
                        </button>
                        {/* <div className="flex items-center gap-2 text-orange-500">
                            <FaEdit className="w-6 h-6 fill-orange-500" />
                            <span>Edit</span>
                        </div> */}
                    </div>
                </div>
            </section>
        </Authenticated>
    );
}
