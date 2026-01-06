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
    produks,
    title,
    flash,
    subTitle,
    filtersReq,
    filtersList,
    isDivisiSDM,
}) {
    // ===========================================Pop Up, Modal, Dialog Swal Message===========================================
    console.log("filtersList ", filtersList);
    const [activeModal, setActiveModal] = useState(null);
    function handleDelete(id) {
        Swal.fire({
            ...(activeModal && { target: `#${activeModal}` }),
            icon: "warning",
            text: "Anda yakin ingin menghapus data produk ini?",
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
                router.delete(route("shared.produk.destroy", id), {
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
        <Authenticated
            user={auth.user}
            title={(role === "Admnistrator" ? "Kelola " : "Daftar ") + title}
        >
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">

                <section className="flex items-end justify-between gap-4">
                    <div className="flex-1 ">
                        <FilterSearchCustom
                            routeName={`/master/produk`}
                            initialFilters={{
                                byKategori: filtersReq.kategori,
                                byStatus: filtersReq.status,
                                // minPoin: filtersReq.minPoin,
                            }}
                            filtersConfig={[
                                {
                                    name: "byKategori",
                                    label: "Kategori",
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
                                label: "Nama Produk",
                                placeholder: "Ketik Nama Produk..",
                                initialValue: filtersReq.search,
                            }}
                        />
                    </div>

                    {role === "Administrator" && (
                        <div className="flex-none pb-3 ">
                            <Link
                                as="button"
                                href={route("shared.produk.create")}
                                className="flex items-center mx-2 text-white btn glass bg-sky-600 hover:bg-primary/90"
                            >
                                Tambah Produk
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
                    {produks.data.length > 0 ? (
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
                                            Nama Produk
                                        </th>

                                        <th scope="col" width="15%">
                                            Kategori
                                        </th>
                                        <th scope="col" width="15%">
                                            Harga Satuan
                                        </th>
                                        <th scope="col" width="15%">
                                            Komisi Poin
                                        </th>
                                        <th scope="col" width="15%">
                                            Deskripsi
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
                                <tbody>
                                    {produks.data?.map((produk, i) => (
                                        <tr key={i}>
                                            <td className="text-center">
                                                {i + 1}
                                            </td>
                                            <td className="relative text-center group">
                                                <span className="block">
                                                    {produk["nama_produk"]}
                                                </span>

                                                <span className="badge-xs-secondary">
                                                    {produk["kode_produk"]}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="block">
                                                    {produk["kategori"]}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="block">
                                                    {produk["harga_satuan"]}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="block">
                                                    {produk["komisi_poin"]}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="block">
                                                    {produk[
                                                        "deskripsi_produk"
                                                    ] ?? "Tidak ada deskripsi"}
                                                </span>
                                            </td>

                                            <td
                                                className={`font-normal text-center ${
                                                    !showLastUpdated && "hidden"
                                                }`}
                                            >
                                                <span className="block">
                                                    {moment(
                                                        produk["updated_at"]
                                                    ).format("LL")}
                                                </span>
                                                <span className="block text-[12px]">
                                                    {moment(
                                                        produk.updated_at
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
                                                                    `Show-${produk.id}`
                                                                );
                                                                document
                                                                    .getElementById(
                                                                        `Show-${produk.id}`
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
                                                            produk={produk}
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
                                                                "shared.produk.edit",
                                                                produk.id
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
                                                                    produk["id"]
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
                                                            // onClick={() => {
                                                            //     setActiveModal(
                                                            //         `Show-${produk.id}`
                                                            //     );
                                                            //     document
                                                            //         .getElementById(
                                                            //             `Show-${produk.id}`
                                                            //         )
                                                            //         .showModal();
                                                            // }}
                                                            className="action-btn group/button action-btn-success "
                                                        >
                                                            <span className="group-hover:text-white">
                                                                Lihat
                                                            </span>
                                                            <FaEye className="ml-2 scale-125 group-hover/button:fill-white " />
                                                        </button>
                                                        {/* <ShowModal
                                                            handleDelete={
                                                                handleDelete
                                                            }
                                                            setActiveModal={
                                                                setActiveModal
                                                            }
                                                            produk={produk}
                                                        />
                                                        <TooltipHover
                                                            message={
                                                                "Lihat Data"
                                                            }
                                                        /> */}
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Pagination */}
                            <Pagination
                                datas={produks}
                                urlRoute={`/master/produk`}
                                filters={{
                                    byKategori: filtersReq.byKategori,
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
