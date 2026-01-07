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
    jabatans,
    title,
    flash,
    subTitle,
    filtersReq,
    filtersList,
}) {
    // ===========================================Pop Up, Modal, Dialog Swal Message===========================================
    const [activeModal, setActiveModal] = useState(null);
    function handleDelete(id) {
        Swal.fire({
            ...(activeModal && { target: `#${activeModal}` }),
            icon: "warning",
            text: "Anda yakin ingin menghapus data jabatan ini?",
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
                router.delete(route("admin.jabatan.destroy", id), {
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
        <Authenticated
            user={auth.user}
            title={(role === "Admnistrator" ? "Kelola " : "Daftar ") + title}
        >
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section className="flex items-end justify-between gap-4">
                    <div className="flex-1 ">
                        <FilterSearchCustom
                            routeName={`/admin/jabatan`}
                            initialFilters={{
                                byLevel: filtersReq.byLevel,
                            }}
                              filtersConfig={[
                                {
                                    name: "byLevel",
                                    label: "Level Otoritas",
                                    options: filtersList.level,
                                },
                            ]}
                            searchConfig={{
                                name: "search",
                                label: "Nama Jabatan",
                                placeholder: "Ketik Nama Jabatan..",
                                initialValue: filtersReq.search,
                            }}
                        />
                    </div>

                    {role === "Administrator" && (
                        <div className="flex-none pb-3 ">
                            <Link
                                as="button"
                                href={route("admin.jabatan.create")}
                                className="flex items-center mx-2 text-white btn glass bg-sky-600 hover:bg-primary/90"
                            >
                                Tambah Jabatan
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
                    {jabatans.data.length > 0 ? (
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
                                        <th scope="col" width="20%">
                                            Nama Jabatan
                                        </th>
                                        <th scope="col" width="15%">
                                            Kode Jabatan
                                        </th>
                                        <th scope="col" width="15%">
                                            Level Otoritas
                                        </th>
                                        <th scope="col" width="30%">
                                            Deskripsi Tugas
                                        </th>
                                        <th scope="col" width="30%">
                                            Dibuat
                                        </th>

                                        <th
                                            scope="col"
                                            width="15%"
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
                                                        <FaEyeSlash className="mr-1 text-white" />
                                                        Diperbarui
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center justify-center gap-2">
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
                                    {jabatans.data?.map((jabatan, i) => (
                                        <tr key={jabatan.id}>
                                            <td className="text-center">
                                                {i + 1}
                                            </td>

                                            <td>
                                                <span className="block">
                                                    {jabatan.nama_jabatan}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="block">
                                                    {jabatan.kode_jabatan}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="block">
                                                    {jabatan.level_otoritas}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="block">
                                                    {jabatan.deskripsi_tugas}
                                                </span>
                                            </td>
                                            <td>
                                                 <span className="block">
                                                    {moment(
                                                        jabatan.created_at
                                                    ).format("LL")}
                                                </span>
                                            </td>

                                            <td
                                                className={`font-normal text-center ${
                                                    !showLastUpdated && "hidden"
                                                }`}
                                            >
                                                <span className="block">
                                                    {moment(
                                                        jabatan.updated_at
                                                    ).format("LL")}
                                                </span>
                                                <span className="block text-[12px]">
                                                    {moment(
                                                        jabatan.updated_at
                                                    ).fromNow()}
                                                </span>
                                            </td>

                                            <td className="space-x-2 text-center whitespace-nowrap">
                                                <div className="relative inline-flex group">
                                                    <button
                                                        onClick={() => {
                                                            setActiveModal(
                                                                `Show-${jabatan.id}`
                                                            );
                                                            document
                                                                .getElementById(
                                                                    `Show-${jabatan.id}`
                                                                )
                                                                .showModal();
                                                        }}
                                                        className="action-btn group/button action-btn-success"
                                                    >
                                                        <FaEye className="scale-125 group-hover/button:fill-white" />
                                                    </button>
                                                    <ShowModal
                                                        handleDelete={
                                                            handleDelete
                                                        }
                                                        setActiveModal={
                                                            setActiveModal
                                                        }
                                                        jabatan={jabatan}
                                                        canManage={true}
                                                    />
                                                    <TooltipHover message="Lihat Data" />
                                                </div>

                                                <div className="relative inline-flex group">
                                                    <Link
                                                        href={route(
                                                            "admin.jabatan.edit",
                                                            jabatan.id
                                                        )}
                                                        className="action-btn group/button action-btn-secondary"
                                                    >
                                                        <FaEdit className="group-hover/button:fill-white" />
                                                    </Link>
                                                    <TooltipHover message="Edit Data" />
                                                </div>

                                                <div className="relative inline-flex group">
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                jabatan.id
                                                            )
                                                        }
                                                        className="action-btn action-btn-warning group/button"
                                                    >
                                                        <FaTrash className="scale-125 group-hover/button:fill-white" />
                                                    </button>
                                                    <TooltipHover message="Hapus Data" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            <Pagination
                                datas={jabatans}
                                urlRoute={`/admin/jabatan`}
                                filters={{
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
