import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import { Link, router } from "@inertiajs/react";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import {
    FilterSearchCustom,
    Pagination,
    StatusLabel,
    TooltipHover,
} from "@/Components";
import { FaEyeSlash, FaTrash } from "react-icons/fa6";
import moment from "moment/min/moment-with-locales";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import ShowModal from "./Partials/ShowModal";

export default function Index({
    auth,
    akuisisis,
    title,
    subTitle,
    filtersReq,
    filtersList,
    canCreate,
    canManage,
    isAdmin,
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

    // --- HELPER FORMAT RUPIAH ---
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    // ===========================================Handling Search & Filter===========================================
    moment.locale("id");
    const [showLastUpdated, setShowLastUpdated] = useState(false); // Default false

    // ===========================================Other Logics===========================================

    return (
        <Authenticated user={auth.user} title={title}>
            <section className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section className="flex items-end justify-between gap-4">
                    <div className="flex-1 ">
                        <FilterSearchCustom
                            routeName={`/${
                                canManage ? "admin" : "pegawai"
                            }/akuisisi`}
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
                                    canManage
                                        ? route("admin.akuisisi.create")
                                        : route("pegawai.akuisisi.create")
                                }
                                className="flex items-center mx-2 text-white btn glass bg-primary hover:bg-primary/80"
                            >
                                {canManage ? "Tambah Data" : "Ajukan Akuisisi"}
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
                            <div className="overflow-x-scroll overflow-y-hidden">
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
                                            {canManage && (
                                                <th scope="col" width="15%">
                                                    Pegawai
                                                </th>
                                            )}

                                            <th scope="col">Produk</th>
                                            <th scope="col" width="15%">
                                                Nasabah
                                            </th>
                                            <th scope="col" width="15%">
                                                Nominal
                                            </th>
                                            <th scope="col">
                                                Tanggal Akuisisi
                                            </th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Supervisor</th>

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
                                                            className="action-btn hover:scale-[1.15] hover:bg-primary/90"
                                                            onClick={() =>
                                                                setShowLastUpdated(
                                                                    !showLastUpdated,
                                                                )
                                                            }
                                                        >
                                                            <FaEyeSlash className="mr-1 text-white " />
                                                            Diperbarui
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                className="action-btn hover:scale-125 hover:bg-primary/90"
                                                                onClick={() =>
                                                                    setShowLastUpdated(
                                                                        !showLastUpdated,
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
                                            const isRejected =
                                                akuisisi.status_verifikasi ===
                                                "rejected";

                                            return (
                                                <tr key={akuisisi.id}>
                                                    <td>{i + 1}</td>
                                                    {/* Pegawai */}
                                                    {canManage && (
                                                        <td>
                                                            <span className="block">
                                                                {
                                                                    akuisisi
                                                                        .pegawai
                                                                        ?.name
                                                                }
                                                            </span>
                                                        </td>
                                                    )}
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
                                                            {
                                                                akuisisi.nama_nasabah
                                                            }
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
                                                                // akuisisi.nominal_realisasi,
                                                                akuisisi.nominal_formatted
                                                            }
                                                        </span>
                                                    </td>
                                                    {/* Tanggal Akuisisi */}
                                                    <td>
                                                        <span className="block">
                                                            {moment(
                                                                akuisisi.tanggal_akuisisi,
                                                            ).format("LL")}
                                                        </span>
                                                    </td>
                                                    {/* Status */}
                                                    <td className="p-0 m-0">
                                                        <StatusLabel
                                                            status={
                                                                akuisisi.status_verifikasi
                                                            }
                                                        />
                                                        <div className="mt-2 font-normal">
                                                            {/* <span className="block">
                                                                {moment(
                                                                    akuisisi.updated_at,
                                                                ).format("LL")}
                                                            </span> */}
                                                            <span className="block text-[12px]">
                                                                {moment(
                                                                    akuisisi.updated_at,
                                                                ).fromNow()}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    {/* Verifikator */}
                                                    <td>
                                                        <span className="block">
                                                            {akuisisi.supervisor
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
                                                                akuisisi.updated_at,
                                                            ).format("LL")}
                                                        </span>
                                                        <span className="block text-[12px]">
                                                            {moment(
                                                                akuisisi.updated_at,
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
                                                                                `Show-${akuisisi.id}`,
                                                                            );
                                                                            document
                                                                                .getElementById(
                                                                                    `Show-${akuisisi.id}`,
                                                                                )
                                                                                .showModal();
                                                                        }}
                                                                        className="action-btn group/button action-btn-success "
                                                                    >
                                                                        <FaEye className="scale-125 group-hover/button:fill-white group-hover/button:text-white " />
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
                                                                            akuisisi.id,
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
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                                <div className="relative inline-flex group">
                                                                    <button
                                                                        as="button"
                                                                        onClick={() => {
                                                                            setActiveModal(
                                                                                `Show-${akuisisi.id}`,
                                                                            );
                                                                            document
                                                                                .getElementById(
                                                                                    `Show-${akuisisi.id}`,
                                                                                )
                                                                                .showModal();
                                                                        }}
                                                                        className="action-btn group action-btn-success "
                                                                    >

                                                                        <FaEye className="scale-125 group-hover:fill-white " />
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
                                                                            canManage
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
                                                                        as="button"
                                                                        href={route(
                                                                            `${isAdmin ? "admin" : "pegawai"}.akuisisi.edit`,
                                                                            akuisisi.id,
                                                                        )}
                                                                        disabled={!isRejected}
                                                                        className="action-btn group/button action-btn-bermuda"
                                                                    >
                                                                        <FaEdit className=" group-hover/button:fill-white" />
                                                                    </Link>
                                                                    <TooltipHover
                                                                        message={
                                                                            `Revisi Data ${!isRejected && '(setelah ditolak)'}`
                                                                        }
                                                                    />
                                                                </div>
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <Pagination
                                datas={akuisisis}
                                urlRoute={`/${canManage ? "admin" : "pegawai"}/akuisisi`}
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
            </section>
        </Authenticated>
    );
}
