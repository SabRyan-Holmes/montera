import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdPersonSearch } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import logo from "@/../assets/image/logo.png";
export default function Index({ auth, pegawais, title }) {
    return (
        <section className="p-32  pt-20 mx-auto w-a4 h-a4 bg-slate-300">
            <div className="flex items-center gap-3 italic">
                <img src={logo} alt="Logo BPS" className="w-28 h-28" />
                <strong className="text-2xl">
                    Badan Pusat Statistik{" "}
                    <span className="block">{"Provinsi Jambi"} </span>
                </strong>
            </div>

            <div className="mt-3 w-full mb-3">
                <h2 className="mx-auto text-lg uppercase text-center font-medium">
                    Konversi Predikat ke Angka Kredit
                    <span className="block">
                        {" "}
                        NOMOR :{" "}
                        <span className="normal-case">
                            {"1500.445/Konv/2024"}
                        </span>
                    </span>
                </h2>
            </div>

            <div className="flex justify-between">
                <strong>Instansi : Badan Pusat Statistik</strong>
                <strong>
                    Periode : {"Januari"} - {"Desember 2024"}
                </strong>
            </div>

            <div className="my-7 overflow-x-auto">
                <table className="table-auto w-full border-black-collapse border border-slate-900">
                    {/* head */}
                    <thead>
                        <tr className="text-center uppercase font-bold">
                            <th
                                colSpan="5"
                                className="border border-black  p-2"
                            >
                                Pejabat Fungsional Yang Dinilai
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Nama */}
                        <tr>
                            <th className="border border-black  p-2">1</th>
                            <td className="border border-black border-x-transparent  p-2">
                                Nama
                            </td>
                            <td
                                colSpan="5"
                                className="border border-black  p-2"
                            >
                                : {"Kiky Amci Ilzania, S.Tr.Stat"}
                            </td>
                        </tr>
                        {/* NIP */}
                        <tr>
                            <th className="border border-black  p-2">2</th>
                            <td className="border border-x-transparent border-black  p-2">
                                NIP
                            </td>
                            <td
                                colSpan="5"
                                className="border border-black  p-2"
                            >
                                : {"1997010220019012001"}
                            </td>
                        </tr>
                        {/* No Seri Karpeg */}
                        <tr>
                            <th className="border border-black  p-2">3</th>
                            <td className="border border-x-transparent border-black  p-2">
                                Nomor Seri Karpeg
                            </td>
                            <td
                                colSpan="5"
                                className="border border-black  p-2"
                            >
                                : {"B 00046316 "}
                            </td>
                        </tr>
                        {/* Tempat/Tgl Lahir */}
                        <tr>
                            <th className="border border-black  p-2">4</th>
                            <td className="border border-x-transparent border-black  p-2">
                                Tempat/Tgl Lahir
                            </td>
                            <td
                                colSpan="5"
                                className="border border-black  p-2"
                            >
                                : {"Jambi/2 Januari 1997 "}
                            </td>
                        </tr>
                        {/* Jenis Kelamin */}
                        <tr>
                            <th className="border border-black  p-2">5</th>
                            <td className="border border-x-transparent border-black  p-2">
                                Jenis Kelamin
                            </td>
                            <td
                                colSpan="5"
                                className="border border-black  p-2"
                            >
                                : {"Perempuan "}
                            </td>
                        </tr>

                        {/* Pangkat/Golongan Ruang/TMT */}
                        <tr>
                            <th className="border border-black  p-2">6</th>
                            <td className="border border-x-transparent border-black text-nowrap  p-2">
                                Pangkat/Golongan Ruang/TMT
                            </td>
                            <td
                                colSpan="5"
                                className="border border-black  p-2"
                            >
                                : {"Penata Muda(III/a)/01/12/2019 "}
                            </td>
                        </tr>

                        {/* Jabatan/TMT */}
                        <tr>
                            <th className="border border-black  p-2">7</th>
                            <td className="border border-x-transparent border-black  p-2">
                                Jabatan/TMT
                            </td>
                            <td
                                colSpan="5"
                                className="border border-black  p-2"
                            >
                                : {"Statistisi Ahli Pertama/ 17-06-2021 "}
                            </td>
                        </tr>

                        {/* Jabatan/TMT */}
                        <tr>
                            <th className="border border-black  p-2">8</th>
                            <td className="border border-x-transparent border-black  p-2">
                                Unit Kerja
                            </td>
                            <td
                                colSpan="5"
                                className="border border-black  p-2"
                            >
                                : {"BPS Kabupaten Tanjung Jabung Timur "}
                            </td>
                        </tr>

                        {/* Jabatan/TMT */}
                        <tr>
                            <th className="border border-black  p-2">9</th>
                            <td className="border border-x-transparent border-black  p-2">
                                Intansi
                            </td>
                            <td
                                colSpan="5"
                                className="border border-black  p-2"
                            >
                                : {"Badan Pusat Statistik "}
                            </td>
                        </tr>
                        {/* -------------------------------------- */}
                        <tr className="text-center uppercase font-bold">
                            <th
                                colSpan="5"
                                className="border border-black  p-2"
                            >
                                konversi predikat kinerja ke angka kredit
                            </th>
                        </tr>
                        {/* -------------------------------------- */}

                        <tr className="text-center  font-bold">
                            <th
                                colSpan="2"
                                className="border border-black capitalize  p-2"
                            >
                                Hasil Penilaian Kinerja
                            </th>
                            <th
                                colSpan="2"
                                rowSpan="2"
                                className="border border-black  p-2"
                            >
                                Koefisien per Tahun
                            </th>

                            <th className="border border-black  p-2">
                                Angka Kredit yang didapat
                            </th>
                        </tr>
                        <tr className="uppercase w-full ">
                            <th className="border border-black p-2 ">
                                predikat
                            </th>
                            <th className="border border-black ">persentase</th>
                            {/* Kredit Yang didapat */}

                            <th className="border border-black normal-case text-xs">
                                (kolom 2 x kolom 3)
                            </th>
                        </tr>
                        <tr className="uppercase w-full ">
                            <th  className="border border-black p-2 ">{"1"}</th>
                            <th className="border border-black ">{"2"}</th>
                            {/* Koefisien Pertahun */}
                            <th
                                colSpan="2"
                                className="border border-black normal-case"
                            >
                                {"3"}
                            </th>
                            {/*  */}
                            <th className="border border-black normal-case">
                                {"5"}
                            </th>
                        </tr>
                        {/* ------------------------------------------------------ */}
                        <tr className="uppercase w-full ">
                            <th className="border text-nowrap border-black p-2 ">
                                {"Sangat Baik"}
                            </th>
                            <th className="border border-black ">{"12"}/12</th>
                            {/* Koefisien Pertahun */}
                            <th
                                colSpan="2"
                                className="border border-black normal-case"
                            >
                                {"12.5"}
                            </th>
                            {/*  */}
                            <th className="border border-black normal-case">
                                {"18.75"}
                            </th>
                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-end mr-10">
                    <div className="my-6">
                        <strong>Ditetapkan di Jambi </strong>
                        <strong className="block">
                            Pada tanggal {"8 Mei 2024"}
                        </strong>
                        <strong className="pt-2">Kepala BPS Provinsi Jambi </strong>

                        {/* Img Tanda TanganNanti  */}
                        <img src="" alt="" className=" my-6" />

                        <strong>
                            Agus Sudibyo, M.Stat
                        </strong>
                        <strong className="block">
                            NIP. 197412311996121001
                        </strong>
                    </div>
                </div>
            </div>
        </section>
    );
}
