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
    transaksis,
    title,
    flash,
    subTitle,
    filtersReq,
    filtersList,
    canManage
}) {
    // ===========================================Pop Up, Modal, Dialog Swal Message===========================================
    const [activeModal, setActiveModal] = useState(null);
    function handleDelete(id) {
        Swal.fire({
            ...(activeModal && { target: `#${activeModal}` }),
            icon: "warning",
            text: "Anda yakin ingin menghapus data transaksi ini?",
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
                router.delete(route("admin.transaksi.destroy", id), {
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
                            routeName={`/admin/transaksi`}
                            initialFilters={{
                                byKategori: filtersReq.kategori,
                                byStatus: filtersReq.status,
                            }}
                            filtersConfig={[
                                {
                                    name: "byKategori",
                                    label: "Kategori ",
                                    options: filtersList.kategori,
                                },
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
                    {role === "Administrator" && (
                        <div className="flex-none pb-3 ">
                            <Link
                                as="button"
                                href={route("admin.transaksi.create")}
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
                    {transaksis.data.length > 0 ? (
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
                                        {/* untuk label feed relasi user , produk, indikator, akuisisi */}

                                        {/* untuk label feed relasi user , produk, indikator, akuisisi */}

                                        <th scope="col" width="15%">
                                            Nama & NIP Pegawai
                                        </th>

                                        <th scope="col" width="15%">
                                            Nama & Kode Produk
                                        </th>

                                        <th scope="col" width="15%">
                                            Indikator
                                        </th>

                                        <th scope="col" width="15%">
                                            Nasabah
                                        </th>

                                        <th scope="col" width="15%">
                                            Nilai Realisasi
                                        </th>

                                        <th scope="col" width="10%">
                                            Poin
                                        </th>

                                        <th scope="col" width="10%">
                                            Periode
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
                                    {transaksis.data?.map((transaksi, i) => {
                                        const isPending =
                                            transaksi.status_verifikasi ===
                                            "pending";

                                        return (
                                            <tr key={transaksi.id}>
                                                <td className="text-center">
                                                    {i + 1}
                                                </td>
                                                {/* Pegawai */}
                                                <td>
                                                    <span className="block font-medium">
                                                        {
                                                            transaksi.pegawai
                                                                ?.name
                                                        }
                                                    </span>
                                                    <span className="text-[11px] text-gray-500">
                                                        {transaksi.pegawai?.nip}
                                                    </span>
                                                </td>

                                                {/* Produk */}
                                                <td>
                                                    <span className="block font-medium">
                                                        {
                                                            transaksi.produk
                                                                ?.nama_produk
                                                        }
                                                    </span>
                                                    <span className="text-[11px] text-gray-500">
                                                        {
                                                            transaksi.produk
                                                                ?.kode_produk
                                                        }
                                                    </span>
                                                </td>

                                                {/* Indikator */}
                                                <td>
                                                    <span className="block">
                                                        {
                                                            transaksi.indikator
                                                                ?.nama_kpi
                                                        }{" "}
                                                        {`(${transaksi.indikator?.satuan})`}
                                                    </span>
                                                </td>

                                                {/* Akuisisi(Nasabah) */}
                                                <td>
                                                    <span className="block font-medium">
                                                        {
                                                            transaksi.akuisisi
                                                                ?.nama_nasabah
                                                        }
                                                    </span>
                                                    <span className="text-[11px] text-gray-500">
                                                        {
                                                            transaksi.akuisisi
                                                                ?.no_identitas_nasabah
                                                        }
                                                    </span>
                                                </td>

                                                {/* Nilai Realisasi */}
                                                <td>
                                                    <span className="block">
                                                        {
                                                            transaksi.nilai_realisasi
                                                        }
                                                    </span>
                                                </td>

                                                {/* Poin */}
                                                <td>
                                                    <span className="block">
                                                        {transaksi.poin_didapat}
                                                    </span>
                                                </td>

                                                {/* Periode */}
                                                <td>
                                                    <span className="block">
                                                        {transaksi.bulan}/
                                                        {transaksi.tahun}
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
                                                            transaksi.updated_at
                                                        ).format("LL")}
                                                    </span>
                                                    <span className="block text-[12px]">
                                                        {moment(
                                                            transaksi.updated_at
                                                        ).fromNow()}
                                                    </span>
                                                </td>

                                                {/* AKSI */}
                                                <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                    <div className="relative inline-flex group">
                                                        <button
                                                            as="button"
                                                            onClick={() => {
                                                                setActiveModal(
                                                                    `Show-${transaksi.id}`
                                                                );
                                                                document
                                                                    .getElementById(
                                                                        `Show-${transaksi.id}`
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
                                                            transaksi={
                                                                transaksi
                                                            }
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
                                                                "admin.transaksi.edit",
                                                                transaksi.id
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
                                                                    transaksi[
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
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <Pagination
                                datas={transaksis}
                                urlRoute={`/pegawai/transaksi`}
                                filters={{
                                    search: filtersReq.search,
                                    byKategori: filtersReq.byKategori,
                                    byStatus: filtersReq.byStatus,
                                }}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                {!subTitle
                                    ? "Belum Ada Data Transaksi Terbaru Untuk Saat Ini"
                                    : "Tidak Ditemukan"}
                            </h2>
                        </div>
                    )}
                </section>
            </main>
        </Authenticated>
    );
}
