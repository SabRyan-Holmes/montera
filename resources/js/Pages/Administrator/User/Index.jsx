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
    users,
    title,
    canManage,
    subTitle,
    filtersReq,
    filtersList,
}) {
    const [activeModal, setActiveModal] = useState(null);
    function handleDelete(id) {
        Swal.fire({
            ...(activeModal && {
                target: `#${activeModal}`,
            }),
            icon: "warning",
            text: "Anda yakin ingin menghapus data user ini?",
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
                router.delete(route("admin.user.destroy", id), {
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
    moment.locale("id");
    const [showLastUpdated, setShowLastUpdated] = useState(false);
    const role = auth.user.jabatan.nama_jabatan;
    console.log(filtersList);
    return (
        <Authenticated
            user={auth.user}
            title={(canManage ? "Kelola " : "Daftar ") + title}
        >
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section className="flex items-end justify-between gap-4">
                    <div className="flex-1 ">
                        <FilterSearchCustom
                            routeName={`/admin/user`}
                            initialFilters={{
                                byJabatan: filtersReq.jabatan,
                                byDivisi: filtersReq.divisi,
                                byStatus: filtersReq.status,
                            }}
                            filtersConfig={[
                                {
                                    name: "byJabatan",
                                    label: "Jabatan",
                                    options: filtersList.jabatan,
                                },
                                {
                                    name: "byDivisi",
                                    label: "Divisi",
                                    options: filtersList.divisi,
                                },
                            ]}
                            searchConfig={{
                                name: "search",
                                label: "Nama User/NIP",
                                placeholder: "Ketik Nama User/NIP..",
                                initialValue: filtersReq.search,
                            }}
                        />
                    </div>

                    {role === "Administrator" && (
                        <div className="flex-none pb-3 ">
                            <Link
                                as="button"
                                href={route("admin.user.create")}
                                className="flex items-center mx-2 text-white btn glass bg-primary hover:bg-primary/80"
                            >
                                Tambah User
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
                    {users.data.length > 0 ? (
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
                                            Nama
                                        </th>

                                        <th scope="col" width="15%">
                                            NIP
                                        </th>
                                        <th scope="col" width="15%">
                                            Jabatan
                                        </th>
                                        <th scope="col" width="15%">
                                            Divisi
                                        </th>
                                        <th scope="col" width="15%">
                                            Email
                                        </th>
                                        <th scope="col" width="15%">
                                            Status Aktif
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
                                                                className=" action-btn hover:scale-125 hover:bg-bermuda"
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
                                    {users.data?.map((user, i) => (
                                        <tr key={i}>
                                            <td className="text-center">
                                                {i + 1}
                                            </td>
                                            <td>
                                                <span className="block">
                                                    {user["name"]}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="block">
                                                    {user["nip"]}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="block">
                                                    {
                                                        user.jabatan?.[
                                                            "nama_jabatan"
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                            <td className="text-center ">
                                                {user.divisi ? (
                                                    <>
                                                        <span className="block text-gray-700">
                                                            {
                                                                user.divisi
                                                                    ?.nama_divisi
                                                            }
                                                        </span>
                                                        <span className="text-[10px] badge badge-ghost badge-xs">
                                                            {
                                                                user.divisi
                                                                    ?.main_divisi
                                                            }
                                                        </span>
                                                    </>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                            <td>
                                                <span className="block">
                                                    {user["email"]}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="block">
                                                    {user["status_aktif"]}
                                                </span>
                                            </td>

                                            <td
                                                className={`font-normal text-center ${!showLastUpdated && "hidden"}`}
                                            >
                                                <span className="block">
                                                    {moment(
                                                        user["updated_at"],
                                                    ).format("LL")}
                                                </span>
                                                <span className="block text-[12px]">
                                                    {moment(
                                                        user.updated_at,
                                                    ).fromNow()}
                                                </span>
                                            </td>
                                            {role === "Administrator" ? (
                                                <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                    <div className="relative inline-flex group">
                                                        <button
                                                            as="button"
                                                            onClick={() => {
                                                                setActiveModal(
                                                                    `Show-${user.id}`,
                                                                );
                                                                document
                                                                    .getElementById(
                                                                        `Show-${user.id}`,
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
                                                            user={user}
                                                            canManage={true}
                                                        />
                                                        <TooltipHover
                                                            message={
                                                                "Lihat Data"
                                                            }
                                                        />
                                                    </div>

                                                    {}
                                                    <div className="relative inline-flex group">
                                                        <Link
                                                            as="a"
                                                            href={route(
                                                                "admin.user.edit",
                                                                user.id,
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

                                                    {}
                                                    <div className="relative inline-flex group">
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user["id"],
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
                                                            className="action-btn group/button action-btn-success "
                                                        >
                                                            <span className="group-hover:text-white">
                                                                Lihat
                                                            </span>
                                                            <FaEye className="ml-2 scale-125 group-hover/button:fill-white " />
                                                        </button>
                                                        {}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {}
                            <Pagination
                                datas={users}
                                urlRoute={`/admin/user`}
                                filters={{
                                    byJabatan: filtersReq.byJabatan,
                                    byDivisi: filtersReq.byDivisi,
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
