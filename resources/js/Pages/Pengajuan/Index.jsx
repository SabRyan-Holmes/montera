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
import { DetailPegawai, InputLabel } from "@/Components";
import { TiArrowRight } from "react-icons/ti";
import { FaFileCircleCheck, FaPrint } from "react-icons/fa6";
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { RiFileCloseFill } from "react-icons/ri";
import { TbEyeCheck } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
import ModalCekValidasi from "./Partials/ModalCekValidasi";

export default function Index({
    auth,
    pengajuans,

    title,
    flash,
    subTitle,
    searchReq: initialSearch,
    byDaerahReq: initialDaerah,
    byJabatanReq: initialJabatan,
}) {
    const [byDaerah, setByDaerah] = useState(initialDaerah || "");
    const [byJabatan, setByJabatan] = useState(initialJabatan || "");
    const [search, setSearch] = useState(initialSearch || "");

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        const newOffset = (selectedPage - 1) * pengajuans.per_page;

        router.get(
            `/pengajuan`,
            { page: selectedPage, byJabatan, byDaerah, search },
            {
                replace: true,
                preserveState: true,
                onSuccess: () => {
                    setItemOffset(newOffset);
                },
            }
        );
    };

    useEffect(() => {
        if (
            (byJabatan && byJabatan !== initialJabatan) ||
            (byDaerah && byDaerah !== initialDaerah)
        ) {
            router.get(
                "/pengajuan",
                { byJabatan, byDaerah },
                { replace: true, preserveState: true }
            );
        } else if (
            (byJabatan &&
                byJabatan !== initialJabatan &&
                search !== initialSearch) ||
            (byDaerah && byDaerah !== initialDaerah && search !== initialSearch)
        ) {
            router.get(
                "/pengajuan",
                { byJabatan, byDaerah, search },
                { replace: true, preserveState: true }
            );
        }
    }, [byJabatan, byDaerah]);

    useEffect(() => {
        if (byJabatan === "Semua Kategori" && byDaerah === "Semua Kategori") {
            router.get(
                "/pengajuan",
                { search },
                { replace: true, preserveState: true }
            );
        } else if (byJabatan === "Semua Kategori") {
            router.get(
                "/pengajuan",
                { byDaerah, search },
                { replace: true, preserveState: true }
            );
        } else if (byDaerah === "Semua Kategori") {
            router.get(
                "/pengajuan",
                { byJabatan, search },
                { replace: true, preserveState: true }
            );
        } else if (search && search !== initialSearch) {
            router.get(
                "/pengajuan",
                { search },
                { replace: true, preserveState: true }
            );
        }
    }, [search]);

    return (
        <Authenticated user={auth.user} title={title}>
            <section className="mx-auto phone:h-screen laptop:h-full max-w-screen-laptop px-7">
                <h1 className="my-10 text-3xl ">Data Pengajuan</h1>

                <form className="max-w-screen-laptop ">
                    <div className="flex items-center justify-between gap-3 my-3">
                        <div className="flex items-center justify-start gap-3">
                            <div className="flex-none w-72">
                                <InputLabel
                                    value="Jabatan"
                                    Htmlfor="Jabatan"
                                    className="max-w-sm ml-1 text-lg"
                                />
                                <select
                                    className="w-full max-w-xs text-sm border select border-gradient selection:text-accent disabled:text-accent"
                                    name="byJabatan"
                                    value={byJabatan}
                                    onChange={(e) =>
                                        setByJabatan(e.target.value)
                                    }
                                >
                                    <option>Semua Kategori</option>
                                    <option value="Terampil">
                                        Ahli Terampil
                                    </option>
                                    <option value="Mahir">Mahir</option>
                                    <option value="Pertama">
                                        Ahli Pertama
                                    </option>
                                    <option value="Penyelia">
                                        Ahli Penyelia
                                    </option>
                                    <option value="Muda">Ahli Muda</option>
                                    <option value="Madya">Ahli Madya</option>
                                </select>
                            </div>
                            <div className="flex-none w-72">
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
                                    onChange={(e) =>
                                        setByDaerah(e.target.value)
                                    }
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
                        </div>

                        <div className="flex-none w-80">
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
                                    defaultValue={search}
                                    onSubmit={(e) => setSearch(e.target.value)}
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

                <div className="pt-3 overflow-auto ">
                    {pengajuans.data.length ? (
                        <table className="table overflow-auto text-xs rounded-md table-bordered ">
                            <thead className="text-sm font-medium text-white border rounded-md bg-primary border-secondary/15">
                                <tr>
                                    <th scope="col" width="1%">
                                        No
                                    </th>
                                    <th scope="col" width="15%">
                                        No PAK
                                    </th>
                                    <th scope="col" width="25%">
                                        Nama Pegawai
                                    </th>
                                    {/* <th scope="col">No Seri Karpeg</th> */}
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
                                    <th scope="col" width="20%">
                                        <span className="flex justify-center">
                                            Jabatan
                                        </span>
                                    </th>
                                    <th scope="col " className="text-center ">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pengajuans.data?.map((pengajuan, i) => (
                                    <tr
                                        role="list"
                                        key={i}
                                        className="group/item hover:bg-secondary/50 hover:cursor-pointer"
                                    >
                                        <td className="text-center">{i + 1}</td>
                                        <td>
                                            {" "}
                                            {pengajuan.document["no_surat3"]}
                                        </td>
                                        <td>{pengajuan.pegawai["Nama"]}</td>
                                        {/* <td>{pengajuan.pegawai["Nomor Seri Karpeg"]}</td> */}
                                        <td className="text-center">
                                            {parseFloat(
                                                pengajuan.document["jakk"][
                                                    "jumlah"
                                                ]
                                            ).toFixed(3)}
                                        </td>
                                        <td>
                                            {pengajuan.pegawai["Jabatan/TMT"]
                                                .split("/")[0]
                                                .trim()}
                                        </td>{" "}
                                        <td className="text-center whitespace-nowrap text-nowrap">
                                            {/* Dialog Cek dan Validasi, Membuat Tanda Tangan/sign, dan melihat PDF */}
                                            <ModalCekValidasi
                                                pengajuan={pengajuan}
                                            />

                                            <button
                                                className="inline-flex items-center justify-center gap-2 mx-auto font-medium text-center group/button group-hover/item:bg-hijau group-hover/item:text-white text-hijau/75 action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            `DialogCekValidasi-${pengajuan.id}`
                                                        )
                                                        .showModal()
                                                }
                                            >
                                                Cek & Validasi
                                                <TbEyeCheck className="w-6 h-6 fill-hijau/75 group-hover/item:stroke-white group-hover/item:fill-hijau" />
                                            </button>
                                            <span className="inline-block mx-1"></span>
                                            <Link
                                                as="a"
                                                className="inline-flex items-center justify-center gap-2 mx-auto font-medium text-center group/button group-hover/item:bg-secondary group-hover/item:text-white text-red-500/75 action-btn border-danger/20 hover:bg-danger hover:text-white"
                                                // href={route(
                                                //     "pengajuan.show_history",
                                                //     pengajuan.id
                                                // )}
                                                target="_blank"
                                            >
                                                Tolak{" "}
                                                <IoCloseOutline className="w-6 h-6 fill-secondary stroke-red-500 group-hover/item:fill-white" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                Belum Ada Pengajuan Untuk Saat Ini
                            </h2>
                        </div>
                    )}
                </div>

                {pengajuans.data.length > 0 && (
                    // Pagination
                    <div className="mb-8 text-sm box-footer">
                        <div className="items-center justify-between sm:flex">
                            <div className="flex items-center text-xs">
                                showing {pengajuans.data.length} Entries{" "}
                                <TiArrowRight className="w-5 h-5" />
                            </div>
                            <ReactPaginate
                                breakLabel={<span>...</span>}
                                nextLabel={
                                    pengajuans.next_page_url && (
                                        <a
                                            className="inline-flex items-center gap-2 px-2 py-1 font-semibold leading-none border rounded-md group/next dark:text-white/70 text-primary hover:text-white hover:border hover:bg-primary/75 border-primary"
                                            href={pengajuans.next_page_url}
                                            onClick={() => setNum(num + 1)}
                                        >
                                            <span className="sr-only">
                                                Next
                                            </span>
                                            <span aria-hidden="true">Next</span>
                                            <MdOutlineKeyboardDoubleArrowRight className="w-4 h-4 -ml-1 fill-primary group-hover/next:fill-white" />
                                        </a>
                                    )
                                }
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={1}
                                pageCount={pengajuans.last_page}
                                previousLabel={
                                    pengajuans.prev_page_url && (
                                        <a
                                            className="inline-flex items-center gap-2 px-2 py-1 font-semibold leading-none border rounded-md group/next dark:text-white/70 text-primary hover:text-white hover:border hover:bg-primary/75 border-primary"
                                            href={pengajuans.next_page_url}
                                            onClick={() => setNum(num + 1)}
                                        >
                                            <MdOutlineKeyboardDoubleArrowLeft className="w-4 h-4 -mr-1 fill-primary group-hover/next:fill-white" />
                                            <span className="sr-only">
                                                Prev
                                            </span>
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
                )}
            </section>
        </Authenticated>
    );
}
