import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { SecondaryButton, SuccessButton } from "@/Components";
import { FaEye, FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { FaPrint } from "react-icons/fa6";
import { RiArrowGoBackFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { IoMdAdd } from "react-icons/io";
import moment from "moment/min/moment-with-locales";

export default function RiwayatCetak({
    auth,
    pegawai,
    title,
    riwayatCetak,
    flash,
}) {
    moment.locale("id");
    function handleDelete(id) {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin menghapus riwayat cetak ini?",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#2D95C9",
            cancelButtonColor: "#9ca3af",
            customClass: {
                actions: "my-actions",
                cancelButton: "order-1 right-gap",
                confirmButton: "order-2",
                denyButton: "order-3",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("cetak_dokumen.destroy", id), {
                    onSuccess: () => {
                        // console.log(
                        //     "data pegawai dengan id ",
                        //     id,
                        //     "berhasil di delete!"
                        // );
                    },
                    onError: () => {
                        console.log("Gagal Menghapus Data");
                    },
                });
            }
        });
    }

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    useEffect(() => {
        if (flash.message) {
            Toast.fire({
                icon: "success",
                title: flash.message,
            });
            setTimeout(() => {
                flash.message = null;
            }, 3000);
        }
    }, [flash.message]);
    // CONSOLE
    // console.log("Isi data");
    // console.log(data);
    // console.log("Isi Error");
    // console.log(errors);
    return (
        <Authenticated
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <section className="m-10 ">
                <div className="flex justify-between">
                    <div className="mt-2 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a
                                    href={route("pegawai.index")}
                                    className="gap-2"
                                >
                                    <FaPrint className="w-4 h-4 stroke-current" />
                                    <span>Riwayat Pencetakan Dokumen PAK</span>
                                </a>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    {pegawai.Nama}
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
                {/* <h1 className="my-10 text-2xl font-[550] capitalize ">
                    Data Pegawai Untuk Pencetakan PAK
                </h1> */}

                <div className="px-2 mx-auto mt-4 overflow-x-auto">
                    {/* <h1 className="text-2xl font-medium my-7">
                        Data Pegawai Untuk Pencetakan PAK
                    </h1> */}
                    <table className="table text-base table-bordered">
                        {/* head */}
                        <thead>
                            <tr className="text-lg bg-primary/70">
                                <th className="px-7" colSpan={2}>
                                    Detail Pegawai
                                </th>
                                {/* <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr className="border">
                                <td className="px-7">Nama</td>
                                <td className="px-7">{pegawai.Nama}</td>
                            </tr>
                            {/* row 2 */}
                            <tr className="border">
                                <td className="px-7">NIP/NRP</td>
                                <td className="px-7">{pegawai["NIP"]}</td>
                            </tr>
                            {/* row 3 */}
                            <tr className="border">
                                <td className="px-7">NOMOR SERI KARPEG</td>
                                <td className="px-7">
                                    {pegawai["Nomor Seri Karpeg"] || '-'}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="px-7">PANGKAT/GOLONGAN/TMT</td>
                                <td className="px-7">
                                    {pegawai["Pangkat/Golongan Ruangan/TMT"]}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="px-7">TEMPAT/TANGGAL LAHIR</td>
                                <td className="px-7">
                                    {pegawai["Tempat/Tanggal Lahir"]}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="px-7">JENIS KELAMIN</td>
                                <td className="px-7">
                                    {pegawai["Jenis Kelamin"]}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="px-7">PENDIDIKAN</td>
                                <td className="px-7">
                                    {pegawai["Pendidikan"]}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="px-7">JABATAN/TMT</td>
                                <td className="px-7">
                                    {pegawai["Jabatan/TMT"]}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="px-7">MASA KERJA GOLONGAN</td>
                                <td className="px-7">
                                    {pegawai["Masa Kerja Golongan"]}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="px-7">UNIT KERJA</td>
                                <td className="px-7">
                                    {pegawai["Unit Kerja"]}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <section className="px-2 pt-3 mx-auto mb-20 overflow-hidden rounded-xl">
                    <table className="table overflow-auto text-xs table-bordered rounded-xl">
                        <thead className="text-sm font-medium text-white border bg-primary rounded-xl border-secondary/15">
                            <tr className="p-1">
                                <th scope="col" width="1%">
                                    No
                                </th>
                                <th scope="col" width="15%">
                                    <span>Tanggal Ditetapkan/</span>
                                    <span className="block">No Surat PAK</span>
                                </th>
                                <th scope="col" width="15%">
                                    Penanda Tangan
                                </th>
                                {/* <th scope="col" width="15%">
                                    NO Surat PAK
                                </th> */}
                                <th scope="col" width="10%"  className="w-16 p-1 text-xs">
                                    <span>Jumlah Angka </span>
                                    <span className="block">Kredit Kumulatif</span>
                                </th>
                                <th scope="col" width="25%">
                                    Keterangan
                                </th>
                                <th scope="col" width="25%">
                                    Terakhir diubah
                                </th>
                                <th scope="col " className="text-center ">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="border-secondary/15 ">
                            {riwayatCetak.length ? (
                                riwayatCetak.map((riwayat, i) => (
                                    <tr
                                        key={i}
                                        className="group/item hover:bg-primary/10 hover:cursor-pointer"
                                    >
                                        <td className="text-center">{i + 1}</td>
                                        <td>
                                            <span className="text-sm">
                                            {moment(
                                                riwayat["tgl_ditetapkan"]
                                            ).format("LL")}
                                            </span>
                                            <span className="block mt-1 font-serif text-sm font-medium">
                                                {riwayat['no_surat3']}
                                            </span>
                                        </td>
                                        <td className="text-nowrap">{riwayat["nama"]}</td>
                                        {/* <td className="overflow-x-scroll">{riwayat["no_surat3"]}</td> */}
                                        <td className="text-center">{parseFloat(riwayat["jakk"]['jumlah']).toFixed(3)}</td>
                                        <td
                                            className={
                                                riwayat["kesimpulan"]
                                                    ?.includes("Sudah")
                                                    ? "text-emerald-500/80"
                                                    : "text-warning"
                                            }
                                        >
                                            <small className="text-xs">
                                            {riwayat["kesimpulan"]}
                                            </small>
                                        </td>
                                        <td className="capitalize">
                                            {moment(
                                                riwayat["updated_at"]
                                            ).fromNow()}
                                        </td>
                                        <td className="text-center whitespace-nowrap text-nowrap">
                                            <Link
                                                as="a"
                                                href={route(
                                                    "cetak_dokumen.cetak"
                                                )}
                                                data={riwayat}
                                                method="post"
                                                className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center scale-125 hover:scale-[1.3] transition-all group/button group-hover/item:bg-hijau group-hover/item:text-white text-hijau/75 action-btn border-hijau/20 hover:bg-hijau hover:text-white "
                                            >
                                                <FaEye className="fill-hijau/75 group-hover/item:fill-white" />
                                            </Link>
                                            <span className="inline-block mx-2"></span>
                                            <Link
                                                as="a"
                                                href={route(
                                                    "cetak_dokumen.edit",
                                                    riwayat.id
                                                )}
                                                className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center scale-125 hover:scale-[1.3] transition-all group/button group-hover/item:bg-secondary group-hover/item:text-white text-secondary action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                            >
                                                <FaEdit className="fill-secondary group-hover/item:fill-white" />
                                            </Link>
                                            <span className="inline-block mx-2"></span>

                                            <button
                                                onClick={() =>
                                                    handleDelete(riwayat["id"])
                                                }
                                                className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center text-red-500  hover:scale-[1.3] transition-all scale-125 group/button group-hover/item:bg-red-500 group-hover/item:text-white action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                            >
                                                <FaTrash className="fill-red-500 group-hover/item:fill-white" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    <tr className="group/item hover:bg-secondary/50 hover:cursor-pointer">
                                        <td
                                            colSpan={6}
                                            className="text-base text-center"
                                        >
                                            Belum ada riwayat cetakan dokumen
                                            PAK
                                        </td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>

                    <div className="flex justify-end w-full">
                        <Link
                            as="button"
                            href={route("cetak_dokumen.create", pegawai["NIP"])}
                            className="flex justify-end w-32 mt-6 text-white btn glass bg-hijau hover:bg-hijau/90"
                        >
                            Tambah
                            <IoMdAdd className="w-6 h-6" />
                        </Link>
                    </div>
                </section>
            </section>
        </Authenticated>
    );
}
