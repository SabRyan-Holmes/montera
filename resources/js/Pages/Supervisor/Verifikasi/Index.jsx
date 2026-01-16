import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
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
import { FaCheck, FaEyeSlash, FaTrash } from "react-icons/fa6";
import moment from "moment/min/moment-with-locales";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import ShowModal from "./Partials/ShowModal";
import { IoClose } from "react-icons/io5";

export default function Index({
    auth,
    akuisisis,
    title,
    canApprove,
    subTitle,
    filtersReq,
    filtersList,
}) {
    // ===========================================Pop Up, Modal, Dialog Swal Message===========================================

    // ===========================================Handling Search & Filter===========================================
    moment.locale("id");
    const [showLastUpdated, setShowLastUpdated] = useState(false); // Default false
    const role = auth.user.jabatan.nama_jabatan;
    function formatRole(label) {
        return label.trim().toLowerCase().replace(/\s+/g, "-");
    }

    // ===========================================Other Logics===========================================

    // 1. State untuk menyimpan data yang sedang dibuka
    const [activeModal, setActiveModal] = useState(null);

    const [activeData, setActiveData] = useState(null);

    // 2. Logic Handler Approve (Langsung tembak API)
    const handleApprove = (id) => {
        router.patch(
            route("spv.verify.approve", id),
            {},
            {
                onSuccess: () => {
                    setActiveData(null); // Tutup modal
                    Swal.fire("Berhasil", "Data berhasil disetujui", "success");
                },
            }
        );
    };

    // 3. Logic Handler Reject (Menerima 'reason' dari Modal)
    const handleReject = (id, reason) => {
        router.patch(
            route("spv.verify.reject", id),
            {
                catatan_revisi: reason, // Kirim data dari textarea modal
            },
            {
                onSuccess: () => {
                    setActiveData(null); // Tutup modal
                    Swal.fire("Ditolak", "Data berhasil ditolak", "info");
                },
            }
        );
    };

    // Handler untuk Approve
    // const handleApprove = (id) => {
    //     router.patch(
    //         route("supervisor.verify.approve", id), // Sesuaikan dengan nama route Anda: 'verify.approve'
    //         {},
    //         {
    //             onStart: () => {
    //                 // Opsional: Tampilkan loading state jika perlu
    //             },
    //             onError: (errors) => {
    //                 console.error("Error approving:", errors);
    //                 Swal.fire({
    //                     title: "Gagal!",
    //                     text: "Terjadi kesalahan saat menyetujui data.",
    //                     icon: "error",
    //                     confirmButtonColor: "#EF4444",
    //                 });
    //             },
    //             onSuccess: () => {
    //                 setActiveModal(null); // Tutup modal setelah sukses
    //                 Swal.fire({
    //                     title: "Berhasil Disetujui!",
    //                     text: "Data akuisisi telah diverifikasi dan poin berhasil ditambahkan ke pegawai.",
    //                     icon: "success",
    //                     confirmButtonColor: "#2D95C9", // Warna biru sesuai tema
    //                 });
    //             },
    //         }
    //     );
    // };

    // Handler untuk Reject
    // Menerima parameter 'reason' (catatan revisi) dari modal
    // const handleReject = (id, reason) => {
    //     router.patch(
    //         route("supervisor.verify.reject", id), // Sesuaikan dengan nama route Anda: 'verify.reject'
    //         {
    //             catatan_revisi: reason, // Kirim alasan penolakan ke backend
    //         },
    //         {
    //             onStart: () => {
    //                 // Opsional: Tampilkan loading state
    //             },
    //             onError: (errors) => {
    //                 console.error("Error rejecting:", errors);
    //                 Swal.fire({
    //                     title: "Gagal!",
    //                     text: "Terjadi kesalahan saat menolak data.",
    //                     icon: "error",
    //                     confirmButtonColor: "#EF4444",
    //                 });
    //             },
    //             onSuccess: () => {
    //                 setActiveModal(null); // Tutup modal setelah sukses
    //                 Swal.fire({
    //                     title: "Berhasil Ditolak",
    //                     text: "Data akuisisi telah ditolak dan dikembalikan ke pegawai untuk revisi.",
    //                     icon: "info", // Icon info atau warning cocok untuk reject
    //                     confirmButtonColor: "#EF4444", // Warna merah untuk reject
    //                 });
    //             },
    //         }
    //     );
    // };
    return (
        <Authenticated user={auth.user} title={title}>
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section className="flex items-end justify-between gap-4">
                    <div className="flex-1 ">
                        <FilterSearchCustom
                            routeName={`/verify-akuisisi`}
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
                                label: "Nama/NIP Pegawai",
                                placeholder: "Ketik Nama/NIP Pegawai..",
                                initialValue: filtersReq.search,
                            }}
                        />
                    </div>
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
                                                <td className="p-0 m-0">
                                                    <StatusLabel
                                                        status={
                                                            akuisisi.status_verifikasi
                                                        }
                                                    />
                                                    <div className="mt-2 font-normal">
                                                        {/* <span className="block">
                                                            {moment(
                                                                akuisisi.updated_at
                                                            ).format("LL")}
                                                        </span> */}
                                                        <span className="block text-[12px]">
                                                            {moment(
                                                                akuisisi.updated_at
                                                            ).fromNow()}
                                                        </span>
                                                    </div>
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
                                                <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                    <div className="relative inline-flex group">
                                                        <button
                                                            onClick={() =>
                                                                setActiveData(
                                                                    akuisisi
                                                                )
                                                            }
                                                            className="action-btn group action-btn-success text"
                                                        >
                                                            <FaEye className="scale-125 group-hover:text-white" />
                                                        </button>

                                                        <TooltipHover
                                                            message={
                                                                "Lihat Detail"
                                                            }
                                                        />
                                                    </div>
                                                    <div className="relative inline-flex group">
                                                        <button
                                                            className="group action-btn action-btn-success"
                                                            onClick={() =>
                                                                handleApprove(
                                                                    akuisisi.id
                                                                )
                                                            }
                                                            disabled={
                                                                !isPending
                                                            }
                                                        >
                                                            <FaCheck className="scale-125 group-hover:fill-white" />
                                                        </button>
                                                        <TooltipHover
                                                            message={
                                                                "Setujui Akuisisi" +
                                                                (!isPending
                                                                    ? `(Telah ${akuisisi.status_verifikasi})`
                                                                    : "")
                                                            }
                                                        />
                                                    </div>
                                                    <div className="relative inline-flex group">
                                                        <button
                                                            disabled={
                                                                !isPending
                                                            }
                                                            onClick={() =>
                                                                handleReject(
                                                                    akuisisi.id
                                                                )
                                                            }
                                                            className="group action-btn action-btn-warning"
                                                        >
                                                            <IoClose className="scale-125 group-hover:fill-white " />
                                                        </button>
                                                        <TooltipHover
                                                            message={
                                                                "Tolak Akuisisi" +
                                                                (!isPending
                                                                    ? `(Telah ${akuisisi.status_verifikasi})`
                                                                    : "")
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
                                datas={akuisisis}
                                urlRoute={`verify-akuisisi`}
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

                {/* 4. PANGGIL MODAL DISINI */}
                {/* Modal hanya dirender jika activeData tidak null */}
                {activeData && (
                    <ShowModal
                        akuisisi={activeData} // Data yang dilempar
                        onClose={() => setActiveData(null)} // Fungsi tutup modal
                        canApprove={canApprove} // Cek role
                        // Masukkan Handler
                        handleApprove={() => handleApprove(activeData.id)}
                        // Handler Reject menerima parameter reason dari dalam modal
                        handleReject={(reason) =>
                            handleReject(activeData.id, reason)
                        }
                    />
                )}
            </main>
        </Authenticated>
    );
}
