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
import { FaEyeSlash, FaTrash } from "react-icons/fa6";
import moment from "moment/min/moment-with-locales";
import FilterSearchPegawai from "./Partials/FilterSearchPegawai";
import {
    TbLayoutSidebarLeftCollapse,
    TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import ShowModal from "./Show";

export default function Index({
    auth,
    pegawais,
    title,
    flash,
    subTitle,
    searchReq,
    byDaerahReq,
    byJabatanReq,
    jabatanList,
    isDivisiSDM,
}) {
    // ===========================================Pop Up, Modal, Dialog Swal Message===========================================
    const [activeModal, setActiveModal] = useState(null);
    function handleDelete(nip) {
        Swal.fire({
            ...(activeModal && { target: `#${activeModal}` }),
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
                router.delete(route("divisi-sdm.pegawai.destroy", nip), {
                    onSuccess: () => {
                        document.getElementById(activeModal).close();
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
                ...(activeModal && { target: `#${activeModal}` }),
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
    moment.locale("id");
    const [showLastUpdated, setShowLastUpdated] = useState(false); // Default false
    const role = auth.user.role;
    function formatRole(label) {
        return label.trim().toLowerCase().replace(/\s+/g, "-");
    }

    // ===========================================Other Logics===========================================

    return (
        <Authenticated
            user={auth.user}
            title={(role === "Divisi SDM" ? "Kelola " : "Daftar ") + title}
        >
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section className="flex items-center justify-between">
                    {/* Cukup paanggil komponen */}
                    <FilterSearchPegawai
                        initialSearch={searchReq}
                        initialDaerah={byDaerahReq}
                        initialJabatan={byJabatanReq}
                        jabatanList={jabatanList}
                        routeName={`/${formatRole(role)}/pegawai`}
                    />
                    {isDivisiSDM && (
                        <div>
                            <Link
                                as="button"
                                href={route("divisi-sdm.pegawai.create")}
                                className="flex justify-end mx-2 mt-6 text-white btn glass bg-sky-600 hover:bg-primary/90"
                            >
                                Tambah Pegawai
                                <IoMdAdd className="w-5 h-5" />
                            </Link>
                        </div>
                    )}
                </section>

                <section className="pt-3 ">
                    {subTitle && (
                        <div className="my-4">
                            <strong className="text-2xl font-bold text-gray-600">
                                {subTitle}
                            </strong>
                        </div>
                    )}
                    {pegawais.data.length > 0 ? (
                        <>
                            <table className="table overflow-x-scroll text-xs text-center table-bordered">
                                <thead className="text-sm font-medium text-white bg-primary ">
                                    <tr className="text-center">
                                        <th
                                            scope="col"
                                            dir="rtl"
                                            width="5%"
                                            className=" rounded-tl-xl"
                                        >
                                            No
                                        </th>
                                        <th scope="col" width="15%">
                                            Nama & NIP
                                        </th>

                                        <th scope="col" width="15%">
                                            Jabatan & TMT
                                        </th>
                                        <th scope="col" width="15%">
                                            Daerah/Unit Kerja
                                        </th>
                                        <th scope="col" width="15%">
                                            Pangkat/Golongan Ruangan/TMT
                                            <span className="block text-center">
                                                /Masa Kerja Golongan
                                            </span>
                                        </th>

                                        <>
                                            <th
                                                scope="col"
                                                width="10%"
                                                className="text-center cursor-pointer "
                                            >
                                                <div className="flex items-center justify-center gap-2">
                                                    {showLastUpdated ? (
                                                        <>
                                                            <button
                                                                className="action-btn hover:scale-[1.15] hover:bg-bermuda"
                                                                onClick={() =>
                                                                    setShowLastUpdated(
                                                                        !showLastUpdated
                                                                    )
                                                                }
                                                            >
                                                                <FaEyeSlash className="mr-1 text-white " />
                                                                Diperbarui
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                className=" action-btn hover:scale-125 hover:bg-bermuda"
                                                                onClick={() =>
                                                                    setShowLastUpdated(
                                                                        !showLastUpdated
                                                                    )
                                                                }
                                                            >
                                                                <TbLayoutSidebarLeftCollapse className="mr-1 text-white" />
                                                            </button>
                                                            <span className="">
                                                                Aksi
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </th>
                                            {showLastUpdated && (
                                                <th
                                                    scope="col"
                                                    className="text-center rounded-tr-xl"
                                                >
                                                    Aksi
                                                </th>
                                            )}
                                        </>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pegawais.data?.map((pegawai, i) => (
                                        <tr key={i}>
                                            <td className="text-center">
                                                {i + 1}
                                            </td>
                                            <td>
                                                <span className="block">
                                                    {pegawai["Nama"]}
                                                    {pegawai[
                                                        "Gelar Tambahan"
                                                    ] ?? ""}
                                                </span>
                                                <span className="block p-1 mt-1 font-medium rounded-md bg-primary/10">
                                                    {pegawai["NIP"]}
                                                </span>
                                            </td>
                                            {(() => {
                                                const jtmt =
                                                    pegawai["Jabatan/TMT"] ||
                                                    "";
                                                const parts = jtmt.split("/");
                                                return (
                                                    <td className="text-center">
                                                        <span className="block">
                                                            {parts[0] ?? "-"}
                                                        </span>
                                                        <span className="block">
                                                            {parts[1] ?? "-"}
                                                        </span>
                                                    </td>
                                                );
                                            })()}
                                            {/* <td className="text-center">
                                                <span className="block">
                                                    {pegawai["Jabatan/TMT"]
                                                        ?.split("/")[0]
                                                        .trim()}
                                                </span>
                                                <span className="block">
                                                    {pegawai["Jabatan/TMT"]
                                                        ?.split("/")[1]
                                                        .trim()}
                                                </span>
                                            </td> */}
                                            <td className="text-center ">
                                                <span>{pegawai["Daerah"]}</span>
                                                /
                                                <span className="block ">
                                                    {pegawai["Unit Kerja"]}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="block text-center">
                                                    {
                                                        pegawai[
                                                            "Pangkat/Golongan Ruangan/TMT"
                                                        ]
                                                    }
                                                </span>
                                                <span className="block mt-1 text-center">
                                                    /
                                                    {pegawai[
                                                        "Masa Kerja Golongan"
                                                    ] ?? "-"}
                                                </span>
                                            </td>

                                            <td
                                                className={`font-normal text-center ${
                                                    !showLastUpdated && "hidden"
                                                }`}
                                            >
                                                <span className="block">
                                                    {moment(
                                                        pegawai["updated_at"]
                                                    ).format("LL")}
                                                </span>
                                                <span className="block text-[12px]">
                                                    {moment(
                                                        pegawai.updated_at
                                                    ).fromNow()}
                                                </span>
                                            </td>
                                            {isDivisiSDM ? (
                                                <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                    <div className="relative inline-flex group">
                                                        <button
                                                            as="button"
                                                            onClick={() => {
                                                                setActiveModal(
                                                                    `Show-${pegawai.id}`
                                                                );
                                                                document
                                                                    .getElementById(
                                                                        `Show-${pegawai.id}`
                                                                    )
                                                                    .showModal();
                                                            }}
                                                            className="action-btn group/button action-btn-success "
                                                        >
                                                            <FaEye className="scale-125 group-hover/button:fill-white " />
                                                        </button>
                                                        <ShowModal
                                                            handleDelete={
                                                                handleDelete
                                                            }
                                                            setActiveModal={
                                                                setActiveModal
                                                            }
                                                            pegawai={pegawai}
                                                            canManage={true}
                                                        />
                                                        <TooltipHover
                                                            message={
                                                                "Lihat Data"
                                                            }
                                                        />
                                                    </div>

                                                    {/* EDIT */}

                                                    <div className="relative inline-flex group">
                                                        <Link
                                                            as="a"
                                                            href={route(
                                                                "divisi-sdm.pegawai.edit",
                                                                pegawai["NIP"]
                                                            )}
                                                            className="action-btn group/button action-btn-secondary"
                                                        >
                                                            <FaEdit className=" fill-secondary group-hover/button:fill-white" />
                                                        </Link>
                                                        <TooltipHover
                                                            message={
                                                                "Edit Data"
                                                            }
                                                        />
                                                    </div>

                                                    {/* DELETE */}
                                                    <div className="relative inline-flex group">
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    pegawai[
                                                                        "NIP"
                                                                    ]
                                                                )
                                                            }
                                                            className="action-btn action-btn-warning group/button"
                                                        >
                                                            <FaTrash className="scale-125 group-hover/button:fill-white" />
                                                        </button>
                                                        <TooltipHover
                                                            message={
                                                                "Hapus Data"
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                            ) : (
                                                <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                       <div className="relative inline-flex group">
                                                        <button
                                                            as="button"
                                                            onClick={() => {
                                                                setActiveModal(
                                                                    `Show-${pegawai.id}`
                                                                );
                                                                document
                                                                    .getElementById(
                                                                        `Show-${pegawai.id}`
                                                                    )
                                                                    .showModal();
                                                            }}
                                                            className="action-btn group/button action-btn-success "
                                                        ><span className="group-hover:text-white">Lihat</span>
                                                            <FaEye className="ml-2 scale-125 group-hover/button:fill-white " />
                                                        </button>
                                                        <ShowModal
                                                            handleDelete={
                                                                handleDelete
                                                            }
                                                            setActiveModal={
                                                                setActiveModal
                                                            }
                                                            pegawai={pegawai}
                                                        />
                                                        <TooltipHover
                                                            message={
                                                                "Lihat Data"
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            <Pagination
                                datas={pegawais}
                                urlRoute={`/${formatRole(role)}/pegawai`} // atau `/${formatRole(role)}/pegawai` kalau dinamis
                                filters={{
                                    filter1: byDaerahReq,
                                    filter2: byJabatanReq,
                                    filterSearch: searchReq,
                                }}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                {!subTitle
                                    ? "Belum Ada Data Pegawai Terbaru Untuk Saat Ini"
                                    : "Tidak Ditemukan"}
                            </h2>
                        </div>
                    )}
                </section>
            </main>
        </Authenticated>
    );
}
