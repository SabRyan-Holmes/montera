import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
    MdPersonSearch,
} from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link, router, useForm } from "@inertiajs/react";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import { InputLabel, PrimaryButton } from "@/Components";
import { TiArrowRight } from "react-icons/ti";

export default function Index({
    auth,
    pegawais,
    title,
    search,
    flash,
    subTitle,
    byDaerahReq: initialDaerah,
    byJabatanReq: initialJabatan,
}) {
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        const newOffset = (selectedPage - 1) * pegawais.per_page;

        console.log(
            `User requested page number ${selectedPage}, which is offset ${newOffset}`
        );

        router.get(
            `/pegawai`,
            { page: selectedPage },
            {
                replace: true,
                preserveState: true,
                onSuccess: () => {
                    setItemOffset(newOffset); // Update the offset after successful page load
                },
            }
        );
    };

    useEffect(() => {
        if (flash.message !== null) {
            return () => {
                Swal.fire({
                    title: "Berhasil!",
                    text: `${flash.message}`,
                    icon: "success",
                    iconColor: "#50C878",
                    confirmButtonText: "Oke",
                    confirmButtonColor: "#2D95C9",
                });
            };
        }
    }, [flash.message]);
    const [byDaerah, setByDaerah] = useState(initialDaerah || "");
    const [byJabatan, setByJabatan] = useState(initialJabatan || "");

    useEffect(() => {
        if (byJabatan || byDaerah) {
            router.get(
                "/pegawai",
                { byJabatan, byDaerah, search },
                { replace: true, preserveState: true }
            );
        } else if (byJabatan == "" && byDaerah == "") {
            router.get("/pegawai", {}, { replace: true, preserveState: true });
        }
    }, [byJabatan, byDaerah]);

    return (
        <Authenticated user={auth.user} title={title}>
            <section className="phone:h-screen laptop:h-full max-w-screen-laptop mx-auto px-7">
                <h1 className="my-7 text-3xl">Data Pejabat Fungsional 2024</h1>

                <form className="w-full flex justify-between items-center">
                    <div className="flex gap-3 my-3 items-center  w-fit justify-start">
                        <div className="w-fit">
                            <InputLabel
                                value="Jabatan"
                                Htmlfor="Jabatan"
                                className="max-w-sm text-lg  ml-1"
                            />
                            <select
                                className="select w-full max-w-xs text-sm border border-gradient selection:text-accent  disabled:text-accent"
                                name="byJabatan"
                                defaultValue={byJabatan}
                                onChange={(e) => setByJabatan(e.target.value)}
                            >
                                <option value="">Semua Kategori</option>
                                <option>Ahli Muda</option>
                                <option>Ahli Penyelia</option>
                                <option>Ahli Pertama</option>
                                <option>Ahli Terampil</option>
                                <option>Mahir</option>
                            </select>
                        </div>
                        <div className="w-fit">
                            <InputLabel
                                value="Daerah"
                                Htmlfor="Daerah"
                                className="max-w-sm text-lg  ml-1"
                            />

                            <select
                                className="select w-full max-w-xs text-sm border border-gradient selection:text-accent  disabled:text-accent"
                                name="byDaerah"
                                id="byDaerah"
                                defaultValue={byDaerah}
                                onChange={(e) => setByDaerah(e.target.value)}
                            >
                                <option value="">Semua Kategori</option>
                                <option>PROVINSI JAMBI</option>
                                <option>KOTA JAMBI</option>
                                <option>KERINCI</option>
                                <option>MUARO JAMBI</option>
                                <option>BATANG HARI</option>
                                <option>SAROLANGUN</option>
                                <option>TANJAB BARAT</option>
                                <option>TANJAB TIMUR</option>
                                <option>MERANGIN</option>
                                <option>SUNGAI PENUH</option>
                                <option>BUNGO</option>
                                <option>TEBO</option>
                            </select>
                        </div>
                        <div className="w-80">
                            <InputLabel
                                value="Nama/NIP"
                                Htmlfor="search"
                                className="max-w-sm text-lg ml-1"
                            />

                            <label
                                htmlFor="search"
                                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                            >
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <MdPersonSearch className="w-6 h-6 fill-primary" />
                                </div>
                                <input
                                    type="search"
                                    id="search"
                                    defaultValue={search}
                                    name="search"
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
                            className="w-full flex justify-end btn glass bg-sky-600  text-white  mt-6 hover:bg-primary/90"
                        >
                            Tambah Pegawai
                            <IoMdAdd className="w-6 h-6" />
                        </Link>
                    </div>
                </form>

                <div className="overflow-auto pt-3 ">
                    <table className="table-bordered text-xs table overflow-auto rounded-md ">
                        <thead className="text-white font-medium text-sm bg-primary  rounded-md border border-secondary/15">
                            <tr>
                                <th scope="col" width="1%">
                                    No
                                </th>
                                <th scope="col" width="15%">
                                    NIP
                                </th>
                                <th scope="col" width="25%">
                                    Nama
                                </th>
                                {/* <th scope="col">No Seri Karpeg</th> */}
                                <th scope="col" width="20%">
                                    <span className="flex justify-center">
                                        Jabatan
                                    </span>
                                </th>
                                <th scope="col" width="15%">
                                    <span className="flex justify-center">
                                        Daerah
                                    </span>
                                </th>
                                <th scope="col " className="text-center ">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="border-secondary/15">
                            {pegawais.data?.map((pegawai, i) => (
                                <tr
                                    key={i}
                                    className="group/item hover:bg-secondary/50 hover:cursor-pointer"
                                >
                                    <td className="text-center">{i + 1}</td>
                                    <td>{pegawai["NIP/NRP"]}</td>
                                    <td>{pegawai.Nama}</td>
                                    {/* <td>{pegawai["Nomor Seri Karpeg"]}</td> */}
                                    <td>
                                        {pegawai["Jabatan/TMT"]
                                            .split("/")[0]
                                            .trim()}
                                    </td>
                                    {/* <td>{pegawai["Unit Kerja"]}</td> */}
                                    <td>{pegawai["Daerah"]}</td>
                                    <td className="whitespace-nowrap text-nowrap" >
                                        <Link
                                            as="a"
                                            href={route(
                                                "pegawai.show",
                                                pegawai.id
                                            )}
                                            className="group/button inline-block  text-center font-medium group-hover/item:bg-hijau group-hover/item:text-white text-hijau/75  items-center justify-center gap-2 mx-auto action-btn border-hijau/20 hover:bg-hijau hover:text-white "
                                        >
                                            <FaEye className="fill-hijau/75 group-hover/item:fill-white"  />
                                            <span>Lihat</span>
                                        </Link>
                                        <span className="inline-block mx-1"></span>
                                        <Link
                                            as="a"
                                            href={route(
                                                "pegawai.edit",
                                                pegawai.id
                                            )}
                                            className="group/button inline-block text-center font-medium group-hover/item:bg-secondary group-hover/item:text-white text-secondary  items-center justify-center gap-2 mx-auto action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                        >
                                            <FaEdit className="fill-secondary group-hover/item:fill-white" />
                                            <span>Edit</span>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="box-footer mb-8 text-sm">
                    <div className="sm:flex items-center justify-between">
                        <div className="flex items-center text-xs">
                            showing {pegawais.data.length} Entries{" "}
                            <TiArrowRight className="w-5 h-5" />
                        </div>
                        <ReactPaginate
                            breakLabel={<span>...</span>}
                            nextLabel={
                                pegawais.next_page_url && (
                                    <a
                                        className="group/next dark:text-white/70 border text-primary hover:text-white  py-1 px-2 leading-none inline-flex items-center gap-2 rounded-md hover:border hover:bg-primary/75 font-semibold border-primary"
                                        href={pegawais.next_page_url}
                                        onClick={() => setNum(num + 1)}
                                    >
                                        <span className="sr-only">Next</span>
                                        <span aria-hidden="true">Next</span>
                                        <MdOutlineKeyboardDoubleArrowRight className="-ml-1 w-4 h-4 fill-primary group-hover/next:fill-white" />
                                    </a>
                                )
                            }
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={1}
                            pageCount={pegawais.last_page}
                            previousLabel={
                                pegawais.prev_page_url && (
                                    <a
                                        className="group/next dark:text-white/70 border text-primary hover:text-white  py-1 px-2 leading-none inline-flex items-center gap-2 rounded-md hover:border hover:bg-primary/75 font-semibold border-primary"
                                        href={pegawais.next_page_url}
                                        onClick={() => setNum(num + 1)}
                                    >
                                        <MdOutlineKeyboardDoubleArrowLeft className="-mr-1 w-4 h-4 fill-primary group-hover/next:fill-white" />
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
                            className="justify-end flex gap-2"
                        />
                    </div>
                </div>
            </section>
        </Authenticated>
    );
}
