import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import { Link, router } from "@inertiajs/react";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import { FilterSearchCustom, Pagination, TooltipHover } from "@/Components";
import { FaCheck, FaEyeSlash, FaTrash } from "react-icons/fa6";
import moment from "moment/min/moment-with-locales";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import ShowModal from "./Partials/ShowModal";
import { IoClose } from "react-icons/io5";

export default function Index({
    auth,
    akuisisis,
    title,
    flash,
    subTitle,
    filtersReq,
    filtersList,
    canCreate,
    canManage,
}) {
    // ===========================================Pop Up, Modal, Dialog Swal Message===========================================
    const [activeModal, setActiveModal] = useState(null);
    function handleDelete(id) {
        Swal.fire({
            ...(activeModal && { target: `#${activeModal}` }),
            icon: "warning",
            text: "Anda yakin ingin menghapus data akuisisi ini?",
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
                router.delete(route("admin.akuisisi.destroy", id), {
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
    const role = auth.user.jabatan.nama_jabatan;
    function formatRole(label) {
        return label.trim().toLowerCase().replace(/\s+/g, "-");
    }
    console.log(filtersList);
    // ===========================================Other Logics===========================================

    return (
        <Authenticated user={auth.user} title={title}>
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section className="flex items-end justify-between gap-4">
                    <div className="flex-1 ">
                        <FilterSearchCustom
                            routeName={`/admin/akuisisi`}
                            initialFilters={{
                                byStatus: filtersReq.status,
                            }}
                            filtersConfig={[
                                {
                                    name: "byStatus",
                                    label: "Status ",
                                    options: filtersList.status,
                                },
                            ]}
                            searchConfig={{
                                name: "search",
                                label: "Nama/ID Nasabah",
                                placeholder: "Ketik Nama/ID Nasabah..",
                                initialValue: filtersReq.search,
                            }}
                        />
                    </div>
                    {canCreate && (
                        <div className="flex-none pb-3 ">
                            <Link
                                as="button"
                                href={
                                    role === "Administrator"
                                        ? route("admin.akuisisi.create")
                                        : route("pegawai.akuisisi.create")
                                }
                                className="flex items-center mx-2 text-white btn glass bg-primary hover:bg-primary/80"
                            >
                                Tambah Data
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
                    {akuisisis.data.length > 0 ? (
                        <>
                            <table className="table overflow-x-scroll text-xs text-center table-bordered">
                                <thead className="text-sm font-medium text-white bg-primary ">
                                    <tr className="text-center">
                                        <th
                                            scope="col"
                                            width="5%"
                                            className="rounded-tl-xl"
                                        >
                                            No
                                        </th>

                                        <th scope="col" width="15%">
                                            Pegawai
                                        </th>
                                        <th scope="col" width="15%">
                                            Produk
                                        </th>
                                        <th scope="col" width="20%">
                                            Nasabah
                                        </th>
                                        <th scope="col" width="15%">
                                            Nominal
                                        </th>
                                        <th scope="col" width="15%">
                                            Tanggal Akuisisi
                                        </th>
                                        <th scope="col" width="15%">
                                            Status
                                        </th>
                                        <th scope="col" width="15%">
                                            Verifikator
                                        </th>

                                        <th
                                            scope="col"
                                            width="10%"
                                            className={
                                                "text-center cursor-pointer " +
                                                (!showLastUpdated
                                                    ? "rounded-tr-xl"
                                                    : "")
                                            }
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                {showLastUpdated ? (
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
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            className="action-btn hover:scale-125 hover:bg-bermuda"
                                                            onClick={() =>
                                                                setShowLastUpdated(
                                                                    !showLastUpdated
                                                                )
                                                            }
                                                        >
                                                            <TbLayoutSidebarLeftCollapse className="mr-1 text-white" />
                                                        </button>
                                                        <span>Aksi</span>
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
                                    </tr>
                                </thead>

                                <tbody>
                                    {akuisisis.data?.map((akuisisi, i) => {
                                        const isPending =
                                            akuisisi.status_verifikasi ===
                                            "pending";

                                        return (
                                            <tr key={akuisisi.id}>
                                                <td>{i + 1}</td>
                                                {/* Pegawai */}
                                                <td>
                                                    <span className="block">
                                                        {akuisisi.pegawai?.name}
                                                    </span>
                                                </td>
                                                {/* Produk */}
                                                <td>
                                                    <span className="block">
                                                        {
                                                            akuisisi.produk
                                                                ?.nama_produk
                                                        }
                                                    </span>
                                                </td>
                                                {/* Nasabah (digabung) */}
                                                <td>
                                                    <span className="block font-medium">
                                                        {akuisisi.nama_nasabah}
                                                    </span>
                                                    <span className="text-[11px] text-gray-500">
                                                        {akuisisi.no_identitas_nasabah ??
                                                            "-"}
                                                    </span>
                                                </td>
                                                {/* Nominal */}
                                                <td>
                                                    <span className="block">
                                                        {
                                                            akuisisi.nominal_realisasi
                                                        }
                                                    </span>
                                                </td>
                                                {/* Tanggal Akuisisi */}
                                                <td>
                                                    <span className="block">
                                                        {moment(
                                                            akuisisi.tanggal_akuisisi
                                                        ).format("LL")}
                                                    </span>
                                                </td>
                                                {/* Status */}
                                                <td>
                                                    <span className="block capitalize">
                                                        {
                                                            akuisisi.status_verifikasi
                                                        }
                                                    </span>
                                                </td>
                                                {/* Verifikator */}
                                                <td>
                                                    <span className="block">
                                                        {akuisisi.verifikator
                                                            ?.name ?? "-"}
                                                    </span>
                                                </td>
                                                {/* Last Updated */}
                                                <td
                                                    className={`text-center ${
                                                        !showLastUpdated &&
                                                        "hidden"
                                                    }`}
                                                >
                                                    <span className="block">
                                                        {moment(
                                                            akuisisi.updated_at
                                                        ).format("LL")}
                                                    </span>
                                                    <span className="block text-[12px]">
                                                        {moment(
                                                            akuisisi.updated_at
                                                        ).fromNow()}
                                                    </span>
                                                </td>

                                                {/* AKSI */}
                                                {canManage ? (
                                                    <>
                                                        <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                            <div className="relative inline-flex group">
                                                                <button
                                                                    as="button"
                                                                    onClick={() => {
                                                                        setActiveModal(
                                                                            `Show-${akuisisi.id}`
                                                                        );
                                                                        document
                                                                            .getElementById(
                                                                                `Show-${akuisisi.id}`
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
                                                                    akuisisi={
                                                                        akuisisi
                                                                    }
                                                                    canManage={
                                                                        true
                                                                    }
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
                                                                        "admin.akuisisi.edit",
                                                                        akuisisi.id
                                                                    )}
                                                                    className="action-btn group/button action-btn-bermuda"
                                                                >
                                                                    <FaEdit className=" group-hover/button:fill-white" />
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
                                                                            akuisisi[
                                                                                "id"
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
                                                    </>
                                                ) : (
                                                    <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                        <div className="relative inline-flex group">
                                                            <button
                                                                as="button"
                                                                onClick={() => {
                                                                    setActiveModal(
                                                                        `Show-${akuisisi.id}`
                                                                    );
                                                                    document
                                                                        .getElementById(
                                                                            `Show-${akuisisi.id}`
                                                                        )
                                                                        .showModal();
                                                                }}
                                                                className="action-btn group/button action-btn-success "
                                                            >
                                                                <span className="mr-1">Lihat</span>
                                                                <FaEye className="scale-125 group-hover/button:fill-white " />
                                                            </button>
                                                            <ShowModal
                                                                handleDelete={
                                                                    handleDelete
                                                                }
                                                                setActiveModal={
                                                                    setActiveModal
                                                                }
                                                                akuisisi={
                                                                    akuisisi
                                                                }
                                                                canManage={true}
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
                                        );
                                    })}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <Pagination
                                datas={akuisisis}
                                urlRoute={`/admin/akuisisi`}
                                filters={{
                                    byStatus: filtersReq.byStatus,
                                    search: filtersReq.search,
                                }}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                {!subTitle
                                    ? "Belum Ada Data Produk Terbaru Untuk Saat Ini"
                                    : "Tidak Ditemukan"}
                            </h2>
                        </div>
                    )}
                </section>
            </main>
        </Authenticated>
    );
}
