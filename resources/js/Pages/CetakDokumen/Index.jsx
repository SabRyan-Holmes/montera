import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
    MdPersonSearch,
} from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
import html2canvas from "html2canvas-pro";
import PAK from "@/Pages/CetakDokumen/PAK";
import { Link, router } from "@inertiajs/react";
import ReactPaginate from "react-paginate";
import { InputLabel } from "@/Components";
import { TiArrowRight } from "react-icons/ti";

export default function Index({
    auth,
    pegawais,
    title,
    search,
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
            `/cetak_dokumen/pegawai`,
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

    const [byDaerah, setByDaerah] = useState(initialDaerah || "");
    const [byJabatan, setByJabatan] = useState(initialJabatan || "");

    useEffect(() => {
        if (byJabatan || byDaerah) {
            router.get(
                "/cetak_dokumen/pegawai",
                { byJabatan, byDaerah, search },
                { replace: true, preserveState: true }
            );
        } else if (byJabatan == "" && byDaerah == "") {
            router.get(
                "/cetak_dokumen/pegawai",
                {},
                { replace: true, preserveState: true }
            );
        }
    }, [byJabatan, byDaerah]);

    console.log("isi req byDaerah", byDaerah);

    return (
        <Authenticated user={auth.user} title={title}>
            <section className="phone:h-screen laptop:h-full max-w-screen-laptop mx-auto px-7">
            <h1 className="my-10 text-3xl ">
                    Data Pejabat Fungsional 2024
                </h1>

                <form className="max-w-screen-laptop ">
                    <div className="flex gap-3 my-3 items-center">
                        <div className="flex-none w-72">
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
                        <div className="flex-none w-72">
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
                        <div className="flex-none w-80">
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
                        <tbody>
                            {pegawais.data?.map((pegawai, i) => (
                                <tr
                                    role="list"
                                    href={route(
                                        "cetak_dokumen.create",
                                        pegawai.id
                                    )}
                                    key={i}
                                    className="group/item hover:bg-secondary/50 hover:cursor-pointer"
                                >
                                    <td className="text-center">{i + 1}</td>
                                    <td>{pegawai["NIP/NRP"]}</td>
                                    <td>{pegawai.Nama}</td>
                                    {/* <td>{pegawai["Nomor Seri Karpeg"]}</td> */}
                                    <td>
                                        {
                                            //   const jabatanOnly = pegawai["Jabatan/TMT"].split("/")[0].trim();
                                            pegawai["Jabatan/TMT"]
                                                .split("/")[0]
                                                .trim()
                                        }
                                    </td>
                                    <td>{pegawai["Daerah"]}</td>
                                    <td className="text-center">
                                        <Link
                                            as="a"
                                            className="group/button text-center font-medium group-hover/item:bg-hijau group-hover/item:text-white text-hijau/75 inline-flex items-center justify-center gap-2 mx-auto action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                            href={route(
                                                "cetak_dokumen.create",
                                                pegawai.id
                                            )}
                                            target="_blank"
                                        >
                                            Cetak PAK{" "}
                                            <FaPrint className="fill-hijau/75 group-hover/item:fill-white" />
                                        </Link>
                                    </td>

                                    {/* <Link
                                            as="a"
                                            href={route(
                                                "pegawai.edit",
                                                pegawai.id
                                            )}
                                            className="  flex items-center gap-2 text-secondary/75 font-medium  border-secondary/15"
                                        >
                                            <FaEdit className="w-6 h-6 fill-secondary/75" />
                                            <span>Edit</span>
                                        </Link> */}
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
