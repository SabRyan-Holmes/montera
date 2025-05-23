import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { MdDelete, MdPersonSearch } from "react-icons/md";
import { FaEye, FaFilePdf, FaPrint, FaTrash } from "react-icons/fa6";
import { Link, router } from "@inertiajs/react";
import {
    InputLabel,
    Pagination,
    TooltipHover,
    useFilterSearch,
} from "@/Components";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { IoCloseOutline, IoDocument } from "react-icons/io5";
import Show from "./Show";
import FilterSearchPegawai from "../KelolaPegawai/Partials/FilterSearchPegawai";
import { BsFillSendFill } from "react-icons/bs";

export default function Index({
    auth,
    riwayatPAK,
    pengajuans,
    title,
    subTitle,
    flash,
    searchReq: initialSearch,
    byDaerahReq: initialDaerah,
    byJabatanReq: initialJabatan,
}) {
    // ===========================================Handling Pop Up,Dialog & Message===========================================
    console.log(pengajuans);
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

    function handleDelete(id) {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin menghapus data riwayat PAK ini?",
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
                        console.log("Berhasil Menghapus Data");
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
        routeName: "/divisi-sdm/riwayat-pak", // bisa diganti tergantung endpoint-nya
    });

    // ===========================================Logic Lain===========================================
    const [expandedRows, setExpandedRows] = useState({}); //Handling wrapped text on riwayatPAK.kesimpulan
    const [showIframe, setShowIframe] = useState(false);

    // console.log("subtitle");
    // console.log(subTitle);
    return (
        <Authenticated user={auth.user} title={title}>
            <section className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
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

                {/* FilterSearchPegawai */}
                <FilterSearchPegawai
                    byJabatan={byJabatan}
                    setByJabatan={setByJabatan}
                    byDaerah={byDaerah}
                    setByDaerah={setByDaerah}
                    search={search}
                    setSearch={setSearch}
                />

                <div className="pt-3 ">
                    {subTitle && (
                        <div className="my-4">
                            <strong className="text-2xl font-bold text-gray-600">
                                {subTitle}
                            </strong>
                        </div>
                    )}
                    {riwayatPAK.data.length ? (
                        <>
                            <table className="table text-xs table-bordered">
                                <thead className="text-sm font-medium text-white bg-primary ">
                                    <tr>
                                        <th
                                            scope="col"
                                            dir="rtl"
                                            className="text-center rounded-tl-xl "
                                        >
                                            No
                                        </th>
                                        <th scope="col" width="10%">
                                            No PAK
                                        </th>
                                        <th
                                            scope="col"
                                            width="20%"
                                            className=""
                                        >
                                            Nama & NIP
                                        </th>
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
                                            className="text-center rounded-tr-xl"
                                        >
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {riwayatPAK.data?.map((pak, i) => (
                                        <tr
                                            role="list"
                                            key={i}
                                            className="group/item hover:bg-secondary/35"
                                        >
                                            <td className="text-center">
                                                {i + 1}
                                            </td>
                                            <td> {pak["no_surat3"]}</td>
                                            <td>
                                                <span className="block">
                                                    {pak.pegawai["Nama"]} {pak.pegawai["Gelar Tambahan"] ?? ""}                                                 </span>
                                                <span className="block p-1 mt-1 font-medium rounded-md bg-primary/10">
                                                    {pak.pegawai["NIP"]}
                                                </span>
                                            </td>{" "}
                                            <td>
                                                {pak.pegawai["Jabatan/TMT"]
                                                    .split("/")[0]
                                                    .trim()}
                                            </td>{" "}
                                            <td className="text-center">
                                                {parseFloat(
                                                    pak["jakk"]["jumlah"]
                                                ).toFixed(3)}
                                            </td>
                                            <td
                                                className="relative group cursor-pointer max-w-[300px] text-xs"
                                                onClick={() =>
                                                    setExpandedRows((prev) => ({
                                                        ...prev,
                                                        [pak.id]: !prev[pak.id],
                                                    }))
                                                }
                                            >
                                                {/* Konten teks */}
                                                <span>
                                                    {expandedRows[pak.id]
                                                        ? pak["kesimpulan"]
                                                        : pak["kesimpulan"]
                                                              .length > 50
                                                        ? pak[
                                                              "kesimpulan"
                                                          ].slice(0, 50) + "..."
                                                        : pak["kesimpulan"]}
                                                </span>

                                                {/* Tooltip bubble */}
                                                {!expandedRows[pak.id] && (
                                                    <div
                                                        className="absolute z-[999] w-20 px-3 py-1 mt-2 text-xs text-white transition-opacity duration-200
                                                -translate-x-1/2 bg-accent rounded shadow-lg opacity-0 pointer-events-none left-1/2 top-full group-hover:opacity-100"
                                                    >
                                                        Klik untuk tampilkan
                                                        lengkap
                                                        {/* Segitiga bawah tooltip */}
                                                        <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-accent -top-1 left-1/2"></div>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="text-center whitespace-nowrap text-nowrap">
                                                {/* CEK SUDAH DIAJUKAN ATAU BELUM */}
                                                {pengajuans.includes(pak.id) ? (
                                                    <div className="relative inline-flex group">
                                                        <Link
                                                            as="button"
                                                            disabled
                                                            className="cursor-not-allowed hover:scale-105 action-btn group/button group-hover/item:bg-accent/80 text-accent/80"
                                                        >
                                                            <BsFillSendFill className="scale-125 fill-accent/70 group-hover/item:fill-white" />
                                                        </Link>{" "}
                                                        {/* Tooltip Hover  */}
                                                        <TooltipHover
                                                            message={
                                                                "Sudah Diajukan ke Pimpinan"
                                                            }
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="relative inline-flex group">
                                                        <Link
                                                            as="button"
                                                            href={route(
                                                                "divisi-sdm.pengajuan.store"
                                                            )}
                                                            data={{
                                                                riwayat_pak_id:
                                                                    pak.id,
                                                                pegawai_id:
                                                                    pak.pegawai_id,
                                                                pengaju_id:
                                                                    auth.user
                                                                        .id,
                                                            }}
                                                            method="post"
                                                            className="action-btn group/button group-hover/item:bg-primary/80 text-primary/80"
                                                        >
                                                            <BsFillSendFill className="scale-125 fill-primary/70 group-hover/item:fill-white" />
                                                        </Link>{" "}
                                                        {/* Tooltip Hover  */}
                                                        <TooltipHover
                                                            message={
                                                                "Ajukan ke Pimpinan"
                                                            }
                                                        />
                                                    </div>
                                                )}

                                                <span className="inline-block mx-1"></span>

                                                {/* Dialog Show Modal */}
                                                <div className="relative inline-flex group">
                                                    <button
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    `Show-${pak.id}`
                                                                )
                                                                .showModal()
                                                        }
                                                        className="action-btn group/button group-hover/item:bg-hijau text-hijau"
                                                    >
                                                        <FaEye className="scale-125 fill-hijau/75 group-hover/item:fill-white" />
                                                    </button>
                                                    <TooltipHover
                                                        message={"Lihat Data"}
                                                    />
                                                    <Show riwayatPAK={pak} />
                                                </div>

                                                <span className="inline-block mx-1"></span>

                                                {/* EDIT */}
                                                <div className="relative inline-flex group">
                                                    <Link
                                                        as="a"
                                                        href={route(
                                                            "divisi-sdm.pak.edit",
                                                            { id: pak.id }
                                                        )}
                                                        className="action-btn group/button group-hover/item:bg-secondary/70 text-secondary/70"
                                                    >
                                                        <FaEdit className="scale-125 fill-secondary group-hover/item:fill-white" />
                                                    </Link>

                                                    <TooltipHover
                                                        message={"Edit Data"}
                                                    />
                                                </div>
                                                {/* DELETE */}
                                                <span className="inline-block mx-1"></span>

                                                <div className="relative inline-flex group">
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(pak.id)
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
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                {!subTitle
                                    ? "Belum Ada Riwayat PAK Terbaru Untuk Saat Ini"
                                    : "Riwayat PAK Tidak Ditemukan"}
                            </h2>
                        </div>
                    )}
                </div>

                {riwayatPAK.data.length > 0 && (
                    // Pagination
                    <Pagination
                        datas={riwayatPAK}
                        urlRoute={`/divisi-sdm/riwayat-pak`}
                        filters={{
                            filter1: byDaerah,
                            filter2: byJabatan,
                            filterSearch: search,
                        }}
                    />
                )}
            </section>
        </Authenticated>
    );
}
