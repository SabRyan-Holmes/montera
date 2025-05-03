import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import {
    MdCancel,
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
    MdPersonSearch,
} from "react-icons/md";
import ReactPaginate from "react-paginate";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import {
    InputLabel,
    PrimaryButton,
    TooltipHover,
    useFilterSearch,
} from "@/Components";
import { TiArrowRight } from "react-icons/ti";
import { TbEyeCheck } from "react-icons/tb";
import { IoCloseOutline, IoDocument } from "react-icons/io5";
import ModalCekValidasi from "./Partials/ModalCekValidasi";
import { RiLoader2Fill } from "react-icons/ri";
import { FaCheck, FaEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

export default function Index({
    auth,
    pengajuans,
    title,
    flash,
    subTitle,
    canValidate,
    searchReq: initialSearch,
    byDaerahReq: initialDaerah,
    byJabatanReq: initialJabatan,
}) {
    // ===========================================Pagination===========================================
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        const newOffset = (selectedPage - 1) * pegawais.per_page;
        router.get(
            `divisi-sdm/pengajuan`,
            { page: selectedPage, byJabatan, byDaerah, search },
            {
                replace: true,
                preserveState: true,
                onSuccess: () => {
                    setItemOffset(newOffset); // Update the offset after successful page load
                },
            }
        );
    };

    // ===========================================Handling Pop Up,Dialog & Message===========================================
    // SWAL POP UP
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

    function handleCancel(id) {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin membatalkan pengajuan ini?",
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
                router.delete(route("divisi-sdm.pengajuan.destroy", id), {
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
        routeName: "/divisi-sdm/pengajuan", // bisa diganti tergantung endpoint-nya
    });

    const [expandedRows, setExpandedRows] = useState({}); //Handling wrapped text on pengajuan.kesimpulan
    const [showIframe, setShowIframe] = useState(false);

    // TEST

    return (
        <Authenticated user={auth.user} title={title}>
            <section className="mx-auto phone:h-screen laptop:h-full max-w-screen-laptop px-7">
                {/* Preview PDF di iframe */}
                {showIframe && (
                    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
                        <div className="relative w-full max-w-7xl h-[80vh] bg-white rounded shadow-lg overflow-hidden">
                            <button
                                className="absolute z-10 p-2 transition bg-white rounded-full shadow group top-2 right-2 hover:bg-red-500 hover:text-white"
                                onClick={() => setShowIframe(false)}
                            >
                                <IoCloseOutline className="w-6 h-6 stroke-red-500 group-hover:stroke-white" />
                            </button>
                            <iframe
                                src={route("pak.preview")}
                                width="100%"
                                height="100%"
                                className="border-0"
                            ></iframe>
                        </div>
                    </div>
                )}
                {/* Preview PDF di iframe */}

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

                <div className="pt-3 ">
                    {pengajuans.data.length ? (
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
                                    <th scope="col" width="10%">
                                        No PAK
                                    </th>
                                    <th scope="col" width="25%">
                                        Nama Pegawai
                                    </th>
                                    {/* <th scope="col">No Seri Karpeg</th> */}
                                    <th scope="col" width="20%">
                                        <span className="flex justify-center">
                                            Jabatan Sekarang
                                        </span>
                                    </th>
                                    <th
                                        scope="col"
                                        width="7%"
                                        className="w-16 p-1 text-xs"
                                    >
                                        <span>Jumlah Angka </span>
                                        <span className="block">
                                            Kredit Kumulatif
                                        </span>
                                    </th>
                                    <th scope="col" width="60%">
                                        <span className="flex justify-center">
                                            Kesimpulan
                                        </span>
                                    </th>
                                    <th
                                        scope="col"
                                        width="2rem"
                                        className="text-center "
                                    >
                                        Status
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
                                {pengajuans.data?.map((pengajuan, i) => (
                                    <tr
                                        role="list"
                                        key={i}
                                        className="group/item hover:bg-secondary/35"
                                    >
                                        <td className="text-center">{i + 1}</td>
                                        <td>
                                            {" "}
                                            {pengajuan.document["no_surat3"]}
                                        </td>
                                        <td>{pengajuan.pegawai["Nama"]}</td>
                                        {/* <td>{pengajuan.pegawai["Nomor Seri Karpeg"]}</td> */}
                                        <td>
                                            {pengajuan.pegawai["Jabatan/TMT"]
                                                .split("/")[0]
                                                .trim()}
                                        </td>{" "}
                                        <td className="text-center">
                                            {parseFloat(
                                                pengajuan.document["jakk"][
                                                    "jumlah"
                                                ]
                                            ).toFixed(3)}
                                        </td>
                                        <td
                                            className="relative group cursor-pointer max-w-[300px] text-xs"
                                            onClick={() =>
                                                setExpandedRows((prev) => ({
                                                    ...prev,
                                                    [pengajuan.id]:
                                                        !prev[pengajuan.id],
                                                }))
                                            }
                                        >
                                            {/* Konten teks */}
                                            <span>
                                                {expandedRows[pengajuan.id]
                                                    ? pengajuan.document[
                                                          "kesimpulan"
                                                      ]
                                                    : pengajuan.document[
                                                          "kesimpulan"
                                                      ].length > 50
                                                    ? pengajuan.document[
                                                          "kesimpulan"
                                                      ].slice(0, 50) + "..."
                                                    : pengajuan.document[
                                                          "kesimpulan"
                                                      ]}
                                            </span>

                                            {/* Tooltip bubble */}
                                            {!expandedRows[pengajuan.id] && (
                                                <div
                                                    className="absolute z-[999] w-20 px-3 py-1 mt-2 text-xs text-white transition-opacity duration-200
                                                -translate-x-1/2 bg-accent rounded shadow-lg opacity-0 pointer-events-none left-1/2 top-full group-hover:opacity-100"
                                                >
                                                    Klik untuk tampilkan lengkap
                                                    {/* Segitiga bawah tooltip */}
                                                    <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-accent -top-1 left-1/2"></div>
                                                </div>
                                            )}
                                        </td>

                                            <td className="w-5 p-0 m-0 text-center ">
                                                {pengajuan.status ===
                                                    "diajukan" && (
                                                    <button
                                                        disabled
                                                        className=" label-base bg-accent/50 group-hover/item:text-white text-slate-500"
                                                    >
                                                        DIPROSES
                                                        <RiLoader2Fill className="ml-1 scale-125 fill-slate-500 stroke-slate-500 group-hover/item:fill-white" />
                                                    </button>
                                                )}

                                                {pengajuan.status ===
                                                    "divalidasi" && (
                                                    <a
                                                        disabled
                                                        className="gap-2 cursor-default group-hover/item:text-white group-hover/item:bg-hijau text-slate-500 action-btn bg-success/50 label-base"
                                                    >
                                                        DIVALIDASI
                                                        <FaCheck className="w-4 h-4 fill-slate-500 stroke-slate-500 group-hover/item:fill-white" />
                                                    </a>
                                                )}

                                                {/*
                                                <button className="inline-flex items-center justify-center group-hover/item:text-white group-hover/item:bg-success text-slate-500 action-btn bg-success/70 label-base ">
                                                    DITOLAK
                                                    <RiLoader2Fill className="w-6 h-6 fill-slate-500 stroke-slate-500 group-hover/item:fill-white" />
                                                </button> */}
                                            </td>


                                        {canValidate ? (
                                            <td className="text-center whitespace-nowrap text-nowrap"> {/* Actor Pimpinan */}
                                                {/* Dialog Cek dan Validasi, Membuat Tanda Tangan/sign, dan melihat PDF */}
                                                <ModalCekValidasi
                                                    pengajuan={pengajuan}
                                                />

                                                <button
                                                    className="action-btn hover:scale-[1.15] group/button group-hover/item:bg-hijau group-hover/item:text-white text-hijau"
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                `DialogCekValidasi-${pengajuan.id}`
                                                            )
                                                            .showModal()
                                                    }
                                                >
                                                    Cek & Validasi
                                                    <TbEyeCheck className="w-6 h-6 stroke-hijau/75 group-hover/item:stroke-white " />
                                                </button>
                                                <span className="inline-block mx-3"></span>
                                                <Link
                                                    as="a"
                                                    className="action-btn hover:scale-[1.15] group/button group-hover/item:bg-warning/80 group-hover/item:text-white text-warning/80"
                                                >
                                                    Tolak{" "}
                                                    <IoCloseOutline className="w-6 h-6 fill-secondary stroke-warning/80 group-hover/item:stroke-white" />
                                                </Link>
                                            </td>
                                        ) : (

                                            <td className="text-center whitespace-nowrap text-nowrap">   {/* Actor Divisi SDM */}
                                            {/* Tombol Lihat Detail Riwayat PAK */}
                                            <div className="relative inline-flex group">
                                                <Link
                                                    as="a"
                                                    className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center scale-110 hover:scale-[1.3] transition-all group/button group-hover/item:bg-hijau group-hover/item:text-white text-hijau/75 action-btn border-hijau/20 hover:bg-hijau hover:text-white "
                                                >
                                                    <FaEye className="scale-125 fill-hijau/75 group-hover/item:fill-white" />
                                                </Link>
                                                <TooltipHover
                                                    message={"Lihat Detail PAK"}
                                                />
                                            </div>

                                            <span className="inline-block mx-1"></span>

                                            {/* TODO : bikin nanti logic kalo ditolak baru bisa diedit */}
                                            {pengajuan.status === "ditolak" ? (
                                                <div className="relative inline-flex group">
                                                    <Link
                                                        as="a"
                                                        className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center hover:scale-[1.3] transition-all group/button group-hover/item:bg-secondary group-hover/item:text-white text-secondary action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                                    >
                                                        <FaEdit className="scale-125 fill-secondary group-hover/item:fill-white" />
                                                    </Link>

                                                    <TooltipHover
                                                        message={
                                                            "Lihat Detail PAK"
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                <div className="relative inline-flex group">
                                                    <Link
                                                        as="button"
                                                        href={route(
                                                            "pak.process"
                                                        )}
                                                        onSuccess={() => {
                                                            setShowIframe(true);
                                                        }}
                                                        data={
                                                            pengajuan.document
                                                        }
                                                        method="post"
                                                        className="items-center  justify-center inline-block gap-2 mx-auto font-medium text-center  hover:scale-[1.3] transition-all group/button group-hover/item:bg-secondary group-hover/item:text-white text-secondary action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                                    >
                                                        <IoDocument className="scale-125 fill-secondary group-hover/item:fill-white" />
                                                    </Link>{" "}
                                                    {/* Tooltip Hover  */}
                                                    <TooltipHover
                                                        message={
                                                            "Lihat Tampilan PDF"
                                                        }
                                                    />
                                                </div>
                                            )}

                                            <span className="inline-block mx-1"></span>

                                            <div className="relative inline-flex group">
                                                <button
                                                    onClick={() =>
                                                        handleCancel(
                                                            pengajuan.id
                                                        )
                                                    }
                                                    className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center text-red-500  hover:scale-[1.3] transition-all scale-110 group/button group-hover/item:bg-red-500 group-hover/item:text-white action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                                >
                                                    <MdCancel className="scale-125 fill-red-500 group-hover/item:fill-white" />
                                                </button>
                                                <TooltipHover
                                                    message={"Batalkan"}
                                                />
                                            </div>
                                        </td>
                                        )}


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
