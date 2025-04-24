import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
    MdPersonSearch,
} from "react-icons/md";
import { FaEye, FaEdit } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link, router } from "@inertiajs/react";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import { InputLabel } from "@/Components";
import { TiArrowRight } from "react-icons/ti";
import { FaTrash } from "react-icons/fa6";

export default function Index({
    auth,
    // pegawais,
    title,
    flash,
    subTitle,
    // searchReq: initialSearch,
    // byDaerahReq: initialDaerah,
    // byJabatanReq: initialJabatan,
}) {


    return (
        <Authenticated user={auth.user} title={title}>
            <section className="mx-auto phone:h-screen laptop:h-full max-w-screen-laptop px-7">
                <h1 className="text-3xl my-7">Data Pegawai Fungsional</h1>

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
                            href={route("pegawai.create")}
                            className="flex justify-end w-full mt-6 text-white btn glass bg-sky-600 hover:bg-primary/90"
                        >
                            Tambah Pegawai
                            <IoMdAdd className="w-6 h-6" />
                        </Link>
                    </div>
                </form>

                <div className="pt-3 overflow-hidden rounded-xl">
                    <table className="table overflow-auto text-xs table-bordered rounded-xl ">
                        <thead className="text-sm font-medium text-white border bg-primary rounded-xl border-secondary/15">
                            <tr>
                                <th scope="col" width="1%">
                                    No
                                </th>
                                <th scope="col" width="15%">
                                    Nama Pegawai
                                </th>
                                <th scope="col" width="25%">
                                    Status
                                </th>
                                <th scope="col " className="text-center ">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="border-secondary/15 ">
                            {pegawais.data?.map((pegawai, i) => (
                                <tr
                                    key={i}
                                    className="group/item hover:bg-secondary/50 hover:cursor-pointer"
                                >
                                    <td className="text-center">{i + 1}</td>
                                    <td>{pegawai["NIP"]}</td>
                                    <td>{pegawai.Nama}</td>
                                    {/* <td>{pegawai["Nomor Seri Karpeg"]}</td> */}
                                    <td>
                                        {pegawai["Jabatan/TMT"]
                                            .split("/")[0]
                                            .trim()}
                                    </td>
                                    {/* <td>{pegawai["Unit Kerja"]}</td> */}
                                    <td>{pegawai["Daerah"]}</td>
                                    <td className="text-center whitespace-nowrap text-nowrap">
                                        <Link
                                            as="a"
                                            href={route(
                                                "pegawai.show",
                                                pegawai["NIP"]
                                            )}
                                            className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center scale-125 hover:scale-[1.3] transition-all group/button group-hover/item:bg-hijau group-hover/item:text-white text-hijau/75 action-btn border-hijau/20 hover:bg-hijau hover:text-white "
                                        >
                                            <FaEye className="fill-hijau/75 group-hover/item:fill-white" />
                                        </Link>
                                        <span className="inline-block mx-2"></span>
                                        <Link
                                            as="a"
                                            href={route(
                                                "pegawai.edit",
                                                pegawai["NIP"]
                                            )}
                                            className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center scale-125 hover:scale-[1.3] transition-all group/button group-hover/item:bg-secondary group-hover/item:text-white text-secondary action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                        >
                                            <FaEdit className="fill-secondary group-hover/item:fill-white" />
                                        </Link>
                                        <span className="inline-block mx-2"></span>

                                        <button
                                            onClick={() =>
                                                handleDelete(pegawai["NIP"])
                                            }
                                            className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center text-red-500  hover:scale-[1.3] transition-all scale-125 group/button group-hover/item:bg-red-500 group-hover/item:text-white action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                        >
                                            <FaTrash className="fill-red-500 group-hover/item:fill-white" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mb-8 text-sm box-footer">
                    <div className="items-center justify-between sm:flex">
                        <div className="flex items-center text-xs">
                            showing {pegawais.data.length} Entries{" "}
                            <TiArrowRight className="w-5 h-5" />
                        </div>
                        <ReactPaginate
                            breakLabel={<span>...</span>}
                            nextLabel={
                                pegawais.next_page_url && (
                                    <a
                                        className="inline-flex items-center gap-2 px-2 py-1 font-semibold leading-none border rounded-md group/next dark:text-white/70 text-primary hover:text-white hover:border hover:bg-primary/75 border-primary"
                                        href={pegawais.next_page_url}
                                        onClick={() => setNum(num + 1)}
                                    >
                                        <span className="sr-only">Next</span>
                                        <span aria-hidden="true">Next</span>
                                        <MdOutlineKeyboardDoubleArrowRight className="w-4 h-4 -ml-1 fill-primary group-hover/next:fill-white" />
                                    </a>
                                )
                            }
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={1}
                            pageCount={pegawais.last_page}
                            previousLabel={
                                pegawais.prev_page_url && (
                                    <a
                                        className="inline-flex items-center gap-2 px-2 py-1 font-semibold leading-none border rounded-md group/next dark:text-white/70 text-primary hover:text-white hover:border hover:bg-primary/75 border-primary"
                                        href={pegawais.next_page_url}
                                        onClick={() => setNum(num + 1)}
                                    >
                                        <MdOutlineKeyboardDoubleArrowLeft className="w-4 h-4 -mr-1 fill-primary group-hover/next:fill-white" />
                                        <span className="sr-only">Prev</span>
                                        <span aria-hidden="true">Prev</span>
                                    </a>
                                )
                            }
                            renderOnZeroPageCount={null}
                            containerClassName={
                                "flex items-center text-center justify-center mt-8 mb-4 gap-4 "
                            }
                            pageClassName="border border-solid border-primary text-center hover:bg-primary hover:text-base-100 w-6 h-6 flex items-center text-primary justify-center rounded-md"
                            activeClassName="bg-primary text-white"
                            className="flex justify-end gap-2"
                        />
                    </div>
                </div>
            </section>
        </Authenticated>
    );
}
