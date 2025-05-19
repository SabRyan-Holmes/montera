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
    Pagination,
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
import FilterSearchPegawai from "../KelolaPegawai/Partials/FilterSearchPegawai";

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


    // ===========================================Handling Pop Up,Dialog & Message===========================================
    // SWAL POP UP
    const [modalMessage, setModalMessage] = useState(null);
    const [activeModalId, setActiveModalId] = useState(null);
    // Cek message dan status modal
    useEffect(() => {
        if (flash.message) {
            if (activeModalId !== null) {
                Swal.fire({
                    target: `#DialogCekValidasi-${activeModalId}`,
                    title: "Berhasil!",
                    text: `${flash.message}`,
                    icon: "success",
                    iconColor: "#50C878",
                    confirmButtonText: "Oke",
                    confirmButtonColor: "#2D95C9",
                });
                // Kirim pesan ke modal tertentu saja
                setModalMessage(flash.message);
            } else {
                // Tampilkan Swal global
                Swal.fire({
                    title: "Berhasil!",
                    text: `${flash.message}`,
                    icon: "success",
                    iconColor: "#50C878",
                    confirmButtonText: "Oke",
                    confirmButtonColor: "#2D95C9",
                });
            }

            setTimeout(() => {
                flash.message = null;
            }, 3000);
        }
    }, [flash.message, activeModalId]);

    // Cancel penagjaun dari divisi SDM
    const handleCancel = (id) => {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin membatalkan pengajuan PAK ini?",
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
                router.post(route("divisi-sdm.pengajuan.cancel", id), {
                    onSuccess: () => {
                        //
                    },
                    onError: () => {
                        console.log("Gagal Menghapus Data");
                    },
                });
            }
        });
    };

    const handleReject = (id) => {
        console.log("isi id di handleReject");
        console.log(id);
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin menolak pengajuan ini?",
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
                router.post(route("pimpinan.pengajuan.reject", id), {
                    onSuccess: () => {
                        //
                    },
                    onError: () => {
                        console.log("Gagal Menolak Pengajuan");
                    },
                });
            }
        });
    };
    // console.log("activeModalId");
    // console.log(activeModalId);

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
        routeName: canValidate
            ? "/pimpinan/pengajuan"
            : "/divisi-sdm/pengajuan", // bisa diganti tergantung endpoint-nya
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
                                            {pengajuan.riwayat_pak["no_surat3"]}
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
                                                pengajuan.riwayat_pak["jakk"][
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
                                                    ? pengajuan.riwayat_pak[
                                                          "kesimpulan"
                                                      ]
                                                    : pengajuan.riwayat_pak[
                                                          "kesimpulan"
                                                      ].length > 50
                                                    ? pengajuan.riwayat_pak[
                                                          "kesimpulan"
                                                      ].slice(0, 50) + "..."
                                                    : pengajuan.riwayat_pak[
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
                                                    className="label-base bg-accent/50 text-slate-500"
                                                >
                                                    DIPROSES
                                                    <RiLoader2Fill className="ml-1 scale-125 fill-slate-500 stroke-slate-500 group-hover/item:fill-white" />
                                                </button>
                                            )}

                                            {pengajuan.status ===
                                                "divalidasi" && (
                                                <a className="label-base bg-success text-slate-500">
                                                    DIVALIDASI
                                                    <FaCheck className="w-4 h-4 stroke-slate-400 " />
                                                </a>
                                            )}
                                            {pengajuan.status === "ditolak" && (
                                                <a className="bg-red-500/80 label-base text-slate-500">
                                                    DITOLAK
                                                    <FaCheck className="w-4 h-4 fill-slate-500 stroke-slate-500 " />
                                                </a>
                                            )}
                                        </td>
                                        {canValidate ? (
                                            <td className="text-center whitespace-nowrap text-nowrap">
                                                {/* Actor Pimpinan */}

                                                {/* Dialog Cek dan Validasi, Membuat Tanda Tangan/sign, dan melihat PDF */}
                                                {/* Jika Belum divalidasi */}
                                                {pengajuan.status ==
                                                "diajukan" ? (
                                                    <>
                                                        <ModalCekValidasi
                                                            pengajuan={
                                                                pengajuan
                                                            }
                                                            setActiveModalId={setActiveModalId}
                                                            message={
                                                                modalMessage
                                                            }
                                                        />
                                                        <button
                                                            className="action-btn hover:scale-[1.15] group/button group-hover/item:bg-primary/70 group-hover/item:text-white text-primary/70"
                                                            onClick={() => {
                                                                setActiveModalId(
                                                                    pengajuan.id
                                                                );
                                                                document
                                                                    .getElementById(
                                                                        `DialogCekValidasi-${pengajuan.id}`
                                                                    )
                                                                    .showModal();
                                                            }}
                                                        >
                                                            Cek & Validasi
                                                            <TbEyeCheck className="w-6 h-6 stroke-hijau/75 group-hover/item:stroke-white " />
                                                        </button>
                                                        <span className="inline-block mx-3"></span>
                                                        <button
                                                            onClick={() =>
                                                                handleReject(
                                                                    pengajuan.id
                                                                )
                                                            }
                                                            className="action-btn hover:scale-[1.15] group/button group-hover/item:bg-warning/80 group-hover/item:text-white text-warning/80"
                                                        >
                                                            Tolak{" "}
                                                            <IoCloseOutline className="w-6 h-6 fill-secondary stroke-warning/80 group-hover/item:stroke-white" />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ModalCekValidasi
                                                            pengajuan={
                                                                pengajuan
                                                            }
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
                                                            Lihat Detail
                                                            <TbEyeCheck className="w-6 h-6 stroke-hijau/75 group-hover/item:stroke-white " />
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        ) : (
                                            <td className="text-center whitespace-nowrap text-nowrap">
                                                {" "}
                                                {/* Actor Divisi SDM */}
                                                {/* Tombol Lihat Detail Riwayat PAK */}
                                                <div className="relative inline-flex group">
                                                    <Link
                                                        as="a"
                                                        className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center scale-110 hover:scale-[1.3] transition-all group/button group-hover/item:bg-hijau group-hover/item:text-white text-hijau/75 action-btn border-hijau/20 hover:bg-hijau hover:text-white "
                                                    >
                                                        <FaEye className="scale-125 fill-hijau/75 group-hover/item:fill-white" />
                                                    </Link>
                                                    <TooltipHover
                                                        message={
                                                            "Lihat Detail PAK"
                                                        }
                                                    />
                                                </div>
                                                <span className="inline-block mx-1"></span>
                                                {/* TODO : bikin nanti logic kalo ditolak baru bisa diedit */}
                                                {pengajuan.status ===
                                                "ditolak" ? (
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
                                                                setShowIframe(
                                                                    true
                                                                );
                                                            }}
                                                            data={
                                                                pengajuan.riwayat_pak
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

                {/* Pagination */}
                <Pagination
                    datas={pengajuans}
                    urlRoute={
                        (canValidate ? "/pimpinan" : "/divisi-sdm") +
                        "/pengajuan"
                    }
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
