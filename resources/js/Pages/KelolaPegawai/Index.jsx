import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import { FaEye, FaEdit } from "react-icons/fa";
import { Link, router } from "@inertiajs/react";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import {
    InputLabel,
    Pagination,
    TooltipHover,
    useFilterSearch,
} from "@/Components";
import { FaTrash } from "react-icons/fa6";

export default function Index({
    auth,
    pegawais,
    title,
    flash,
    searchReq: initialSearch,
    byDaerahReq: initialDaerah,
    byJabatanReq: initialJabatan,
}) {
    // ===========================================Pop Up, Modal, Dialog Swal Message===========================================

    function handleDelete(id) {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin menghapus data pegawai ini?",
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
                router.delete(route("divisi-sdm.pegawai.destroy", id), {
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

    useEffect(() => {
        if (flash.message) {
            Swal.fire({
                title: "Berhasil!",
                text: `${flash.message}`,
                icon: "success",
                iconColor: "#50C878",
                confirmButtonText: "Oke",
                confirmButtonColor: "#2D95C9",
            });
            setTimeout(() => {
                flash.message = null;
            }, 3000);
        }
    }, [flash.message]);

    // ===========================================Handling Search & Filter===========================================
    const {
        search,
        setSearch,
        byDaerah,
        setByDaerah,
        byJabatan,
        setByJabatan,
    } = useFilterSearch({
        initialSearch,
        initialDaerah,
        initialJabatan,
        routeName: "/divisi-sdm/pegawai", // bisa diganti tergantung endpoint-nya
    });

    return (
        <Authenticated user={auth.user} title={title}>
            <section className="mx-auto mb-16 phone:h-screen laptop:h-full max-w-screen-laptop px-7">

                <form className="flex items-center justify-between w-full">
                    <div className="flex items-center justify-start gap-3 my-3 w-fit">
                        <div className="w-fit">
                            <InputLabel
                                value="Jabatan"
                                Htmlfor="Jabatan"
                                className="max-w-sm ml-1 text-lg"
                            />
                            <select
                                className="w-full max-w-xs text-sm border select border-gradient selection:text-accent disabled:text-accent"
                                name="byJabatan"
                                value={byJabatan}
                                onChange={(e) => setByJabatan(e.target.value)}
                            >
                                <option>Semua Kategori</option>
                                <option value="Terampil">Ahli Terampil</option>
                                <option value="Mahir">Mahir</option>
                                <option value="Pertama">Ahli Pertama</option>
                                <option value="Penyelia">Ahli Penyelia</option>
                                <option value="Muda">Ahli Muda</option>
                                <option value="Madya">Ahli Madya</option>
                            </select>
                        </div>
                        <div className="w-fit">
                            <InputLabel
                                value="Daerah"
                                Htmlfor="Daerah"
                                className="max-w-sm ml-1 text-lg"
                            />

                            <select
                                className="w-full max-w-xs text-sm border select border-gradient selection:text-accent disabled:text-accent"
                                name="byDaerah"
                                id="byDaerah"
                                value={byDaerah}
                                onChange={(e) => setByDaerah(e.target.value)}
                            >
                                <option>Semua Kategori</option>
                                <option>PROVINSI JAMBI</option>
                                <option>KOTA JAMBI</option>
                                <option>KERINCI</option>
                                <option>MUARO JAMBI</option>
                                <option>BATANG HARI</option>
                                <option>SAROLANGUN</option>
                                <option>TANJUNG JABUNG BARAT</option>
                                <option>TANJUNG JABUNG TIMUR</option>
                                <option>MERANGIN</option>
                                <option>KOTA SUNGAI PENUH</option>
                                <option>BUNGO</option>
                                <option>TEBO</option>
                            </select>
                        </div>
                        <div className="w-80">
                            <InputLabel
                                value="Nama/NIP"
                                Htmlfor="search"
                                className="max-w-sm ml-1 text-lg"
                            />

                            <label
                                htmlFor="search"
                                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                            >
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                                    <MdPersonSearch className="w-6 h-6 fill-primary" />
                                </div>
                                <input
                                    type="search"
                                    id="search"
                                    name="search"
                                    onSubmit={(e) => setSearch(e.target.value)}
                                    defaultValue={search}
                                    className=" w-full p-4 py-[13px] pl-10 text-sm placeholder:text-accent text-gray-900 border border-gradient rounded-md"
                                    placeholder="Cari Nama Pegawai/NIP.."
                                />
                                <button className="text-white  bg-sky-600/85 absolute end-2 bottom-[6px] hover:bg-primary/85 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <Link
                            as="button"
                            href={route("divisi-sdm.pegawai.create")}
                            className="flex justify-end w-full mt-6 text-white btn glass bg-sky-600 hover:bg-primary/90"
                        >
                            Tambah Pegawai
                            <IoMdAdd className="w-6 h-6" />
                        </Link>
                    </div>
                </form>

                <div className="pt-3">
                    <table className="table text-xs table-bordered">
                        <thead className="text-sm font-medium text-white bg-primary ">
                            <tr>
                                <th
                                    scope="col"
                                    dir="rtl"
                                    className="rounded-tl-xl"
                                >
                                    No
                                </th>
                                <th scope="col" width="15%">
                                    NIP/NRP
                                </th>
                                <th scope="col" width="25%">
                                    Nama
                                </th>
                                <th scope="col" width="20%">
                                    Jabatan
                                </th>
                                <th scope="col" width="15%">
                                    Daerah
                                </th>
                                <th
                                    scope="col"
                                    className="text-center rounded-tr-xl"
                                >
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pegawais.data?.map((pegawai, i) => (
                                <tr
                                    key={i}
                                    className="group/item hover:bg-secondary/35"
                                >
                                    <td className="text-center">{i + 1}</td>
                                    <td>{pegawai["NIP"]}</td>
                                    <td>{pegawai.Nama} {pegawai['Gelar Tambahan'] ?? ''} </td>
                                    {/* <td>{pegawai["Nomor Seri Karpeg"]}</td> */}
                                    <td>
                                        {pegawai["Jabatan/TMT"]
                                            .split("/")[0]
                                            .trim()}
                                    </td>
                                    {/* <td>{pegawai["Unit Kerja"]}</td> */}
                                    <td>{pegawai["Daerah"]}</td>
                                    <td className="text-center whitespace-nowrap text-nowrap">
                                        <div className="relative inline-flex group">
                                            <Link
                                                as="a"
                                                href={route(
                                                    "divisi-sdm.pegawai.show",
                                                    pegawai["NIP"]
                                                )}
                                                className="action-btn group/button group-hover/item:bg-hijau text-hijau"
                                            >
                                                <FaEye className="scale-125 fill-hijau/75 group-hover/item:fill-white" />
                                            </Link>
                                            <TooltipHover
                                                message={"Lihat Data"}
                                            />
                                        </div>
                                        <span className="inline-block mx-2"></span>

                                        {/* EDIT */}

                                        <div className="relative inline-flex group">
                                            <Link
                                                as="a"
                                                href={route(
                                                    "divisi-sdm.pegawai.edit",
                                                    pegawai["NIP"]
                                                )}
                                                className="action-btn group/button group-hover/item:bg-secondary/70 text-secondary/70"
                                            >
                                                <FaEdit className=" fill-secondary group-hover/item:fill-white" />
                                            </Link>
                                            <TooltipHover
                                                message={"Edit Data"}
                                            />
                                        </div>

                                        <span className="inline-block mx-2"></span>
                                        {/* DELETE */}
                                        <div className="relative inline-flex group">
                                            <button
                                                onClick={() =>
                                                    handleDelete(pegawai["NIP"])
                                                }
                                                className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center text-red-500  hover:scale-[1.3] transition-all scale-110 group/button group-hover/item:bg-red-500 group-hover/item:text-white action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                            >
                                                <FaTrash className="scale-125 fill-red-500 group-hover/item:fill-white" />
                                            </button>
                                            <TooltipHover
                                                message={"Hapus Data"}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination
                    datas={pegawais}
                    urlRoute={`/divisi-sdm/pegawai`}
                    filters={{
                        filter1: byDaerah,
                        filter2: byJabatan,
                        filterSearch: search,
                    }}
                />
            </section>
        </Authenticated>
    );
}
