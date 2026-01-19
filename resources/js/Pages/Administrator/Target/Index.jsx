import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import { Link, router } from "@inertiajs/react";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import { FilterSearchCustom, Pagination, TooltipHover } from "@/Components";
import { FaEyeSlash, FaTrash } from "react-icons/fa6";
import moment from "moment/min/moment-with-locales";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import ShowModal from "./Partials/ShowModal";
export default function Index({
    auth,
    targets,
    title,
    canManage,
    subTitle,
    filtersReq,
    filtersList,
    isAdmin,
    isAdminOrKacab,
}) {
    const [activeModal, setActiveModal] = useState(null);
    canManage = isAdminOrKacab
    function handleDelete(id) {
        Swal.fire({
            ...(activeModal && {
                target: `#${activeModal}`,
            }),
            icon: "warning",
            text: "Anda yakin ingin menghapus data target ini?",
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
                router.delete(route( `${isAdmin? 'admin' : 'kacab'}.target.destroy`, id), {
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
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka);
    };
    moment.locale("id");
    const [showLastUpdated, setShowLastUpdated] = useState(false);
    return (
        <Authenticated user={auth.user} title={`Kelola ${title}`}>
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section className="flex items-end justify-between gap-4">
                    <div className="flex-1 ">
                        <FilterSearchCustom
                            routeName={`/${isAdmin ? "admin" : "kacab"}/target`}
                            initialFilters={{
                                byTipeSatuan: filtersReq.tipe,
                                byTipeSatuan: filtersReq.tipe,
                                byStatus: filtersReq.status,
                            }}
                            filtersConfig={[
                                {
                                    name: "byTipeTarget",
                                    label: "Tipe Target ",
                                    options: filtersList.tipe_target,
                                },
                                {
                                    name: "byTipeSatuan",
                                    label: "Tipe Satuan ",
                                    options: filtersList.tipe_satuan,
                                },
                                {
                                    name: "byPeriode",
                                    label: "Periode ",
                                    options: filtersList.periode,
                                },
                            ]}
                            searchConfig={{
                                name: "search",
                                label: "Nama Target",
                                placeholder: "Ketik Nama Pegawai/Produk..",
                                initialValue: filtersReq.search,
                            }}
                        />
                    </div>

                    {isAdminOrKacab && (
                        <div className="flex-none pb-3 ">
                            <Link
                                as="button"
                                href={route(`${isAdmin ? 'admin' : 'kacab'}.target.create`)}
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
                    {targets.data.length > 0 ? (
                        <>
                            <div className="overflow-x-scroll">
                                <table className="table text-xs text-center table-bordered">
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

                                            <th scope="col">Pegawai/Divisi</th>
                                            <th scope="col">
                                                Nama & Kategori Produk
                                            </th>
                                            <th scope="col">Nilai Target</th>
                                            <th scope="col">Tipe Target</th>
                                            <th scope="col">Periode</th>
                                            <th scope="col">Tahun</th>
                                            <th scope="col">Tanggal Mulai</th>
                                            <th scope="col">Tanggal Selesai</th>
                                            <th scope="col">
                                                Deadline Pencapaian
                                            </th>

                                            <>
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
                                                            <>
                                                                <button
                                                                    className="action-btn hover:scale-[1.15] hover:bg-primary/80"
                                                                    onClick={() =>
                                                                        setShowLastUpdated(
                                                                            !showLastUpdated,
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
                                                                    className=" action-btn hover:scale-125 hover:bg-primary/80"
                                                                    onClick={() =>
                                                                        setShowLastUpdated(
                                                                            !showLastUpdated,
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
                                        {targets.data?.map((target, i) => (
                                            <tr key={target.id}>
                                                <td className="text-center">
                                                    {i + 1}
                                                </td>

                                                {target.pegawai ? (
                                                    <td className="text-left ">
                                                        <span className="block font-bold text-gray-800">
                                                            {
                                                                target.pegawai
                                                                    ?.name
                                                            }
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {
                                                                target.pegawai
                                                                    ?.nip
                                                            }
                                                        </span>
                                                    </td>
                                                ) : (
                                                    <td className="text-left">
                                                        <span className="block text-gray-700">
                                                            {
                                                                target.divisi
                                                                    ?.nama_divisi
                                                            }
                                                        </span>
                                                        <span className="text-[10px] badge badge-ghost badge-xs">
                                                            {
                                                                target.divisi
                                                                    ?.main_divisi
                                                            }
                                                        </span>
                                                    </td>
                                                )}

                                                <td className="text-left ">
                                                    <span className="block font-bold text-gray-800">
                                                        {
                                                            target.produk
                                                                ?.nama_produk
                                                        }
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {
                                                            target.produk
                                                                ?.kategori_produk
                                                        }
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="block">
                                                        {target.tipe_target ===
                                                        "nominal"
                                                            ? formatRupiah(
                                                                  target.nilai_target,
                                                              )
                                                            : target.nilai_target}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="block capitalize">
                                                        {target.tipe_target}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="block capitalize">
                                                        {target.periode}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="block">
                                                        {target.tahun}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="block">
                                                        {moment(
                                                            target.tanggal_mulai,
                                                        ).format("LL")}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="block">
                                                        {moment(
                                                            target.tanggal_selesai,
                                                        ).format("LL")}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className="block">
                                                        {moment(
                                                            target.deadline_pencapaian,
                                                        ).format("LL")}
                                                    </span>
                                                </td>

                                                <td
                                                    className={`font-normal text-center ${!showLastUpdated && "hidden"}`}
                                                >
                                                    <span className="block">
                                                        {moment(
                                                            target.updated_at,
                                                        ).format("LL")}
                                                    </span>
                                                    <span className="block text-[12px]">
                                                        {moment(
                                                            target.updated_at,
                                                        ).fromNow()}
                                                    </span>
                                                </td>

                                                <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                    <div className="relative inline-flex group">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setActiveModal(
                                                                    `Show-${target.id}`,
                                                                );
                                                                document
                                                                    .getElementById(
                                                                        `Show-${target.id}`,
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
                                                            target={target}
                                                            canManage={isAdminOrKacab}
                                                            isAdmin={isAdmin}
                                                        />
                                                        <TooltipHover
                                                            message={
                                                                "Lihat Data"
                                                            }
                                                        />
                                                    </div>

                                                    <div className="relative inline-flex group">
                                                        <Link
                                                            as="a"
                                                            href={route(
                                                                `${isAdmin? 'admin' : 'kacab'}.target.edit`,
                                                                target.id,
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

                                                    <div className="relative inline-flex group">
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    target[
                                                                        "id"
                                                                    ],
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
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                datas={targets}
                                urlRoute={`/${isAdmin ? "admin" : "kacab"}/target`}
                                filters={{
                                    search: filtersReq.search,
                                    byTipeTarget: filtersReq.tipe_target,
                                    byTipeSatuan: filtersReq.tipe_satuan,
                                    byPeriode: filtersReq.periode,
                                }}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                {!subTitle
                                    ? "Belum Ada Data Target Terbaru Untuk Saat Ini"
                                    : "Tidak Ditemukan"}
                            </h2>
                        </div>
                    )}
                </section>
            </main>
        </Authenticated>
    );
}
