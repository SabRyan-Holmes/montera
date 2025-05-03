import Authenticated from "@/Layouts/AuthenticatedLayout";
import React from "react";
import logo from "@/../assets/image/logo.png";
export default function Index({ auth, pegawais, title }) {
    return (
        <section className="p-32 pt-20 mx-auto w-a4 h-a4 bg-slate-300">
            <div className="flex items-center gap-3 italic">
                <img src={logo} alt="Logo BPS" className="w-28 h-28" />
                <strong className="text-2xl">
                    Badan Pusat Statistik{" "}
                    <span className="block">{"Provinsi Jambi"} </span>
                </strong>
            </div>

            <div className="w-full mt-3 mb-3">
                <h2 className="mx-auto text-lg font-medium text-center uppercase">
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

            <div className="overflow-x-auto my-7">
                <table className="w-full border table-auto border-black-collapse border-slate-900">
                    {/* head */}
                    <thead>
                        <tr className="font-bold text-center uppercase">
                            <th
                                colSpan="5"
                                className="p-2 border border-black"
                            >
                                Pejabat Fungsional Yang Dinilai
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Nama */}
                        <tr>
                            <th className="p-2 border border-black">1</th>
                            <td className="p-2 border border-black border-x-transparent">
                                Nama
                            </td>
                            <td
                                colSpan="5"
                                className="p-2 border border-black"
                            >
                                : {"Kiky Amci Ilzania, S.Tr.Stat"}
                            </td>
                        </tr>
                        {/* NIP */}
                        <tr>
                            <th className="p-2 border border-black">2</th>
                            <td className="p-2 border border-black border-x-transparent">
                                NIP
                            </td>
                            <td
                                colSpan="5"
                                className="p-2 border border-black"
                            >
                                : {"1997010220019012001"}
                            </td>
                        </tr>
                        {/* No Seri Karpeg */}
                        <tr>
                            <th className="p-2 border border-black">3</th>
                            <td className="p-2 border border-black border-x-transparent">
                                Nomor Seri Karpeg
                            </td>
                            <td
                                colSpan="5"
                                className="p-2 border border-black"
                            >
                                : {"B 00046316 "}
                            </td>
                        </tr>
                        {/* Tempat/Tgl Lahir */}
                        <tr>
                            <th className="p-2 border border-black">4</th>
                            <td className="p-2 border border-black border-x-transparent">
                                Tempat/Tgl Lahir
                            </td>
                            <td
                                colSpan="5"
                                className="p-2 border border-black"
                            >
                                : {"Jambi/2 Januari 1997 "}
                            </td>
                        </tr>
                        {/* Jenis Kelamin */}
                        <tr>
                            <th className="p-2 border border-black">5</th>
                            <td className="p-2 border border-black border-x-transparent">
                                Jenis Kelamin
                            </td>
                            <td
                                colSpan="5"
                                className="p-2 border border-black"
                            >
                                : {"Perempuan "}
                            </td>
                        </tr>

                        {/* Pangkat/Golongan Ruang/TMT */}
                        <tr>
                            <th className="p-2 border border-black">6</th>
                            <td className="p-2 border border-black border-x-transparent text-nowrap">
                                Pangkat/Golongan Ruang/TMT
                            </td>
                            <td
                                colSpan="5"
                                className="p-2 border border-black"
                            >
                                : {"Penata Muda(III/a)/01/12/2019 "}
                            </td>
                        </tr>

                        {/* Jabatan/TMT */}
                        <tr>
                            <th className="p-2 border border-black">7</th>
                            <td className="p-2 border border-black border-x-transparent">
                                Jabatan/TMT
                            </td>
                            <td
                                colSpan="5"
                                className="p-2 border border-black"
                            >
                                : {"Statistisi Ahli Pertama/ 17-06-2021 "}
                            </td>
                        </tr>

                        {/* Jabatan/TMT */}
                        <tr>
                            <th className="p-2 border border-black">8</th>
                            <td className="p-2 border border-black border-x-transparent">
                                Unit Kerja
                            </td>
                            <td
                                colSpan="5"
                                className="p-2 border border-black"
                            >
                                : {"BPS Kabupaten Tanjung Jabung Timur "}
                            </td>
                        </tr>

                        {/* Jabatan/TMT */}
                        <tr>
                            <th className="p-2 border border-black">9</th>
                            <td className="p-2 border border-black border-x-transparent">
                                Intansi
                            </td>
                            <td
                                colSpan="5"
                                className="p-2 border border-black"
                            >
                                : {"Badan Pusat Statistik "}
                            </td>
                        </tr>
                        {/* -------------------------------------- */}
                        <tr className="font-bold text-center uppercase">
                            <th
                                colSpan="5"
                                className="p-2 border border-black"
                            >
                                konversi predikat kinerja ke angka kredit
                            </th>
                        </tr>
                        {/* -------------------------------------- */}

                        <tr className="font-bold text-center">
                            <th
                                colSpan="2"
                                className="p-2 capitalize border border-black"
                            >
                                Hasil Penilaian Kinerja
                            </th>
                            <th
                                colSpan="2"
                                rowSpan="2"
                                className="p-2 border border-black"
                            >
                                Koefisien per Tahun
                            </th>

                            <th className="p-2 border border-black">
                                Angka Kredit yang didapat
                            </th>
                        </tr>
                        <tr className="w-full uppercase ">
                            <th className="p-2 border border-black ">
                                predikat
                            </th>
                            <th className="border border-black ">persentase</th>
                            {/* Kredit Yang didapat */}

                            <th className="text-xs normal-case border border-black">
                                (kolom 2 x kolom 3)
                            </th>
                        </tr>
                        <tr className="w-full uppercase ">
                            <th  className="p-2 border border-black ">{"1"}</th>
                            <th className="border border-black ">{"2"}</th>
                            {/* Koefisien Pertahun */}
                            <th
                                colSpan="2"
                                className="normal-case border border-black"
                            >
                                {"3"}
                            </th>
                            {/*  */}
                            <th className="normal-case border border-black">
                                {"5"}
                            </th>
                        </tr>
                        {/* ------------------------------------------------------ */}
                        <tr className="w-full uppercase ">
                            <th className="p-2 border border-black text-nowrap ">
                                {"Sangat Baik"}
                            </th>
                            <th className="border border-black ">{"12"}/12</th>
                            {/* Koefisien Pertahun */}
                            <th
                                colSpan="2"
                                className="normal-case border border-black"
                            >
                                {"12.5"}
                            </th>
                            {/*  */}
                            <th className="normal-case border border-black">
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
                        <img src="" alt="" className="my-6 " />

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
