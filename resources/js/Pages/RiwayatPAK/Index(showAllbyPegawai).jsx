import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { DetailPegawai, SecondaryButton, SuccessButton } from "@/Components";
import { FaEye, FaEdit } from "react-icons/fa";
import { FaPlane, FaTrash } from "react-icons/fa6";
import { FaPrint } from "react-icons/fa6";
import { RiArrowGoBackFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { IoMdAdd } from "react-icons/io";
import moment from "moment/min/moment-with-locales";
import { BsFillSendFill, BsSend } from "react-icons/bs";

export default function Index({
    auth,
    pegawai,
    title,
    RiwayatPAK,
    pengajuans,
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
                router.delete(route("divisi-sdm.riwayat-pak.destroy", id), {
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
                                    href={route("divisi-sdm.pegawai.index")}
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
                    <DetailPegawai pegawai={pegawai} />
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
                                <th
                                    scope="col"
                                    width="10%"
                                    className="w-16 p-1 text-xs"
                                >
                                    <span>Jumlah Angka </span>
                                    <span className="block">
                                        Kredit Kumulatif
                                    </span>
                                </th>
                                <th
                                    scope="col"
                                    width="25%"
                                    className="text-center"
                                >
                                    Keterangan
                                </th>
                                <th scope="col" width="15%">
                                    Terakhir diubah
                                </th>
                                <th scope="col " className="text-center ">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="border-secondary/15 ">
                            {RiwayatPAK.length ? (
                                RiwayatPAK.map((riwayat, i) => (
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
                                                {riwayat["no_surat3"]}
                                            </span>
                                        </td>
                                        <td className="text-nowrap">
                                            {riwayat["nama"]}
                                        </td>
                                        {/* <td className="overflow-x-scroll">{riwayat["no_surat3"]}</td> */}
                                        <td className="text-center">
                                            {parseFloat(
                                                riwayat["jakk"]["jumlah"]
                                            ).toFixed(3)}
                                        </td>
                                        <td
                                            className={
                                                riwayat["kesimpulan"]?.includes(
                                                    "Sudah"
                                                )
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
                                        <td className="text-center whitespace-nowrap text-nowrap ">
                                            <div className="grid grid-flow-col-dense gap-4 mx-2">
                                                <Link
                                                    as="a"
                                                    href={route(
                                                        "pak.preview"
                                                    )}
                                                    data={riwayat}

                                                    className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center scale-125 hover:scale-[1.3] transition-all group/button group-hover/item:bg-hijau group-hover/item:text-white text-hijau/75 action-btn border-hijau/20 hover:bg-hijau hover:text-white "
                                                >
                                                    <FaPrint className="fill-hijau/75 group-hover/item:fill-white" />
                                                </Link>
                                                <Link
                                                    as="a"
                                                    href={route(
                                                        "divisi-sdm.riwayat-pak.edit",
                                                        riwayat.id
                                                    )}
                                                    className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center scale-125 hover:scale-[1.3] transition-all group/button group-hover/item:bg-secondary group-hover/item:text-white text-secondary action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                                >
                                                    <FaEdit className="fill-secondary group-hover/item:fill-white" />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            riwayat["id"]
                                                        )
                                                    }
                                                    className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center text-red-500  hover:scale-[1.3] transition-all scale-125 group/button group-hover/item:bg-red-500 group-hover/item:text-white action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                                >
                                                    <FaTrash className="fill-red-500 group-hover/item:fill-white" />
                                                </button>

                                                <div>
                                                    {
                                                        // Cek udah diajukan atau tidak dengan mengecek apakah sudah ada Pengajuan dengan id riwayatPAK.id(yang dimapping)
                                                        pengajuans.includes(
                                                            riwayat.id
                                                        ) ? (
                                                            <Link
                                                                as="a"
                                                                href={route(
                                                                    "divisi-sdm.pengajuan.store"
                                                                )}
                                                                data={{
                                                                    id: riwayat.id,
                                                                }}
                                                                method="post"
                                                                className="items-center justify-center inline-block w-full gap-2 text-xs font-medium text-center transition-all scale-125 cursor-not-allowed group/button group-hover/item:bg-accent group-hover/item:text-white text-accent action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                                            >
                                                                Diajukan
                                                                <BsFillSendFill className="fill-gray group-hover/item:fill-white" />
                                                            </Link>
                                                        ) : (
                                                            <Link
                                                                as="a"
                                                                href={route(
                                                                    "divisi-sdm.pengajuan.store"
                                                                )}
                                                                data={{
                                                                    id: riwayat.id,
                                                                }}
                                                                method="post"
                                                                className="w-full items-center text-xs
                                                 justify-center inline-block gap-2 font-medium text-center scale-125 hover:scale-[1.3] transition-all group/button group-hover/item:bg-secondary group-hover/item:text-white text-secondary action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                                            >
                                                                Ajukan
                                                                <BsFillSendFill className="fill-secondary group-hover/item:fill-white" />
                                                            </Link>
                                                        )
                                                    }
                                                </div>
                                            </div>
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
                            href={route(
                                "divisi-sdm.pak.create",
                                pegawai["NIP"]
                            )}
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
