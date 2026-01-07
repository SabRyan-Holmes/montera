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
import ShowModal from "./Show";

export default function Index({
    auth,
    targets,
    title,
    flash,
    subTitle,
    filtersReq,
    filtersList,
    isDivisiSDM,
}) {
    // ===========================================Pop Up, Modal, Dialog Swal Message===========================================
    const [activeModal, setActiveModal] = useState(null);
    function handleDelete(id) {
        Swal.fire({
            ...(activeModal && { target: `#${activeModal}` }),
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
                router.delete(route("admin.target.destroy", id), {
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

    // ===========================================Other Logics===========================================

    return (
        <Authenticated user={auth.user} title={`Kelola ${title}`}>
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section className="flex items-end justify-between gap-4">
                    <div className="flex-1 ">
                        <FilterSearchCustom
                            routeName={`/admin/target`}
                            initialFilters={{
                                byTipe: filtersReq.tipe,
                                byStatus: filtersReq.status,
                            }}
                            filtersConfig={[
                                {
                                    name: "byTipe",
                                    label: "Tipe Target ",
                                    options: filtersList.tipe_target,
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

                    {role === "Administrator" && (
                        <div className="flex-none pb-3 ">
                            <Link
                                as="button"
                                href={route("admin.target.create")}
                                className="flex items-center mx-2 text-white btn glass bg-sky-600 hover:bg-primary/90"
                            >
                                Tambah Data
                                <IoMdAdd className="w-5 h-5" />
                            </Link>
                        </div>
                    )}
                </section>

                <section className="pt-3 overflow-x-auto">
                    {subTitle && (
                        <div className="my-4">
                            <strong className="text-2xl font-bold text-gray-600">
                                {subTitle}
                            </strong>
                        </div>
                    )}
                    {targets.data.length > 0 ? (
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
                                            Nama Indikator
                                        </th>

                                        <th scope="col" width="15%">
                                            Nama Produk
                                        </th>
                                        <th scope="col" width="15%">
                                            Nilai Target
                                        </th>
                                        <th scope="col" width="15%">
                                            Tipe Target
                                        </th>
                                        <th scope="col" width="15%">
                                            Periode
                                        </th>
                                        <th scope="col" width="15%">
                                            Tahun
                                        </th>
                                        <th scope="col" width="15%">
                                            Tanggal Mulai
                                        </th>
                                        <th scope="col" width="15%">
                                            Tanggal Selesai
                                        </th>
                                        <th scope="col" width="15%">
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
                                <tbody className="overflow-x-scroll">
                                    {targets.data?.map((target, i) => (
                                        <tr key={target.id}>
                                            <td className="text-center">
                                                {i + 1}
                                            </td>

                                            {/* Nama Indikator */}
                                            <td className="relative text-center group">
                                                <span className="block">
                                                    {target.indikator?.nama_kpi}
                                                </span>
                                                <span className="badge-xs-secondary">
                                                    {
                                                        target.indikator
                                                            ?.kode_indikator
                                                    }
                                                </span>
                                            </td>

                                            {/* Nama Produk */}
                                            <td>
                                                <span className="block">
                                                    {target.produk
                                                        ?.nama_produk ?? "-"}
                                                </span>
                                            </td>

                                            {/* Nilai Target */}
                                            <td>
                                                <span className="block">
                                                    {target.nilai_target}
                                                </span>
                                            </td>

                                            {/* Tipe Target */}
                                            <td>
                                                <span className="block capitalize">
                                                    {target.tipe_target}
                                                </span>
                                            </td>

                                            {/* Periode */}
                                            <td>
                                                <span className="block capitalize">
                                                    {target.periode}
                                                </span>
                                            </td>

                                            {/* Tahun */}
                                            <td>
                                                <span className="block">
                                                    {target.tahun}
                                                </span>
                                            </td>

                                            {/* Tanggal Mulai */}
                                            <td>
                                                <span className="block">
                                                    {moment(
                                                        target.tanggal_mulai
                                                    ).format("LL")}
                                                </span>
                                            </td>

                                            {/* Tanggal Selesai */}
                                            <td>
                                                <span className="block">
                                                    {moment(
                                                        target.tanggal_selesai
                                                    ).format("LL")}
                                                </span>
                                            </td>

                                            {/* Deadline Pencapaian */}
                                            <td>
                                                <span className="block">
                                                    {moment(
                                                        target.deadline_pencapaian
                                                    ).format("LL")}
                                                </span>
                                            </td>

                                            {/* Last Updated */}
                                            <td
                                                className={`font-normal text-center ${
                                                    !showLastUpdated && "hidden"
                                                }`}
                                            >
                                                <span className="block">
                                                    {moment(
                                                        target.updated_at
                                                    ).format("LL")}
                                                </span>
                                                <span className="block text-[12px]">
                                                    {moment(
                                                        target.updated_at
                                                    ).fromNow()}
                                                </span>
                                            </td>

                                            {/* Aksi */}
                                            <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                <div className="relative inline-flex group">
                                                    <button
                                                        onClick={() => {
                                                            setActiveModal(
                                                                `Show-${target.id}`
                                                            );
                                                            document
                                                                .getElementById(
                                                                    `Show-${target.id}`
                                                                )
                                                                .showModal();
                                                        }}
                                                        className="action-btn group/button action-btn-success "
                                                    >
                                                        <FaEye className="scale-125 group-hover/button:fill-white" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            <Pagination
                                datas={targets}
                                urlRoute={`/admin/target`}
                                filters={{
                                    search: filtersReq.search,
                                    byTipe: filtersReq.tipe_target,
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
