import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { FaEye, FaUserFriends, FaBoxOpen, FaEdit } from "react-icons/fa";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { FilterSearchCustom, Pagination, TooltipHover } from "@/Components";
import { FaTrash } from "react-icons/fa6";
import moment from "moment/min/moment-with-locales";
import { IoMdAdd } from "react-icons/io";

export default function Index({
    auth,
    targets,
    title,
    flash,
    subTitle,
    filtersReq,
    filtersList,
    viewMode,
}) {
    moment.locale("id");

    // --- HELPER FORMAT RUPIAH ---
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    // --- HANDLER SWITCH VIEW ---
    const handleSwitchView = (mode) => {
        router.get(
            route("spv.target-tim"),
            // Reset search tapi PERTAHANKAN filter historis (tahun/periode) saat ganti view
            { ...filtersReq, view: mode, search: "" },
            { preserveState: true, preserveScroll: true }
        );
    };

    // --- HANDLER DELETE ---
    function handleDelete(id, type) {
        // Logic delete sementara
        Swal.fire({
            title: "Info",
            text: "Fitur delete perlu disesuaikan dengan logic backend (hapus user target atau hapus target produk)",
            icon: "info",
        });
    }

    // --- ALERT FLASH ---
    useEffect(() => {
        if (flash.message) {
            Swal.fire({
                title: "Berhasil!",
                text: `${flash.message}`,
                icon: "success",
                iconColor: "#50C878",
                confirmButtonText: "Oke",
                confirmButtonColor: "#2D95C9",
            });
        }
    }, [flash.message]);

    return (
        <Authenticated user={auth.user} title={title}>
            <div className="w-full px-4 pb-10 mx-auto sm:px-6 lg:px-8">
                {/* --- HEADER CONTROL (FILTER & TOGGLE) --- */}
                <section className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
                    {/* LEFT SIDE: SEARCH & HISTORIS FILTER */}
                    <div className="flex-1 w-full md:w-auto">
                        <FilterSearchCustom
                            routeName={`/spv/target-tim`}
                            // Masukkan semua nilai filter saat ini
                            initialFilters={{ ...filtersReq }}
                            // Config Search
                            searchConfig={{
                                name: "search",
                                label:
                                    viewMode === "pegawai"
                                        ? "Cari Pegawai"
                                        : "Cari Produk",
                                placeholder:
                                    viewMode === "pegawai"
                                        ? "Nama Pegawai..."
                                        : "Nama Produk...",
                                initialValue: filtersReq.search,
                            }}
                            // Config Filter Historis (Tahun & Periode)
                            filtersConfig={[
                                {
                                    name: "tahun",
                                    label: "Tahun",
                                    options: filtersList.tahun, // Array tahun dari backend
                                },
                                {
                                    name: "periode",
                                    label: "Periode Target",
                                    options: filtersList.periode, // mingguan, bulanan, tahunan
                                },
                            ]}
                        />
                    </div>

                    {/* RIGHT SIDE: VIEW TOGGLE */}
                    <div className="flex items-center p-1 bg-white border border-gray-200 rounded-lg shadow-sm mt-7">
                        <button
                            onClick={() => handleSwitchView("pegawai")}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                viewMode === "pegawai"
                                    ? "bg-primary text-white shadow-md"
                                    : "text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            <FaUserFriends /> Per Pegawai
                        </button>
                        <button
                            onClick={() => handleSwitchView("produk")}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                                viewMode === "produk"
                                    ? "bg-primary text-white shadow-md"
                                    : "text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            <FaBoxOpen /> Per Produk
                        </button>
                    </div>
                </section>

                <section className="pt-2">
                    {/* TITLE & SUBTITLE */}
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-gray-700">
                            {viewMode === "pegawai"
                                ? "Daftar Target Per Pegawai"
                                : "Rekapitulasi Target Per Produk"}
                        </h2>
                        {subTitle && (
                            <p className="inline-block px-2 py-1 mt-1 text-sm font-medium border rounded text-emerald-600 bg-emerald-50 border-emerald-100">
                                {subTitle}
                            </p>
                        )}
                    </div>

                    {targets.data.length > 0 ? (
                        <>
                            {/* TABLE WRAPPER */}
                            <div className="w-full mb-4 overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-xl">
                                <table className="table text-xs text-center min-w-max table-bordered">
                                    {/* HEADER */}
                                    <thead className="text-sm font-medium text-white bg-primary">
                                        <tr>
                                            <th className="py-3 px-4 w-[5%]">
                                                No
                                            </th>

                                            {viewMode === "pegawai" ? (
                                                /* Header Mode Pegawai */
                                                <>
                                                    <th className="px-4 py-3 text-left">
                                                        Nama Pegawai
                                                    </th>
                                                    <th className="px-4 py-3 text-left">
                                                        NIP Pegawai
                                                    </th>
                                                    <th className="px-4 py-3">
                                                        Total Target (Item)
                                                    </th>
                                                    <th className="px-4 py-3">
                                                        Total Nominal
                                                    </th>
                                                </>
                                            ) : (
                                                /* Header Mode Produk */
                                                <>
                                                    <th className="px-4 py-3 text-left">
                                                        Nama Produk
                                                    </th>
                                                    <th className="px-4 py-3">
                                                        Kategori Produk
                                                    </th>
                                                    <th className="px-4 py-3">
                                                        Satuan
                                                    </th>
                                                    <th className="px-4 py-3">
                                                        Pegawai Tertarget
                                                    </th>
                                                    {/* ini kok ilang total target(item ny??) */}
                                                    <th className="px-4 py-3">
                                                        Total Target (Item)
                                                    </th>
                                                    <th className="px-4 py-3">
                                                        Total Nominal
                                                    </th>
                                                </>
                                            )}

                                            <th className="right-0 z-10 px-4 py-3 text-center border-l bg-primary border-white/20">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* BODY */}
                                    <tbody>
                                        {targets.data.map((item, i) => (
                                            <tr
                                                key={item.id}
                                                className="border-b border-gray-100 hover:bg-gray-50"
                                            >
                                                <td className="py-3 text-center">
                                                    {i +
                                                        1 +
                                                        (targets.meta?.from ||
                                                            1) -
                                                        1}
                                                </td>

                                                {viewMode === "pegawai" ? (
                                                    /* --- ROW: MODE PEGAWAI --- */
                                                    <>
                                                        <td className="px-4 py-3 text-left">
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-bold text-gray-800">
                                                                    {item.name}
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    {item.email}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-left text-gray-600">
                                                            {item.nip || "-"}{" "}
                                                            {/* Asumsi ada kolom nip */}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="font-bold text-blue-700 border-none bg-blue-50 badge badge-lg">
                                                                {
                                                                    item.targets_count
                                                                }{" "}
                                                                Target
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 font-mono font-medium text-emerald-600">
                                                            {formatRupiah(
                                                                item.total_nominal ||
                                                                    0
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    /* --- ROW: MODE PRODUK --- */
                                                    <>
                                                        <td className="px-4 py-3 text-left">
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-bold text-gray-800">
                                                                    {
                                                                        item.nama_produk
                                                                    }
                                                                </span>
                                                                <span className="text-[10px] text-gray-400">
                                                                    {
                                                                        item.kode_produk
                                                                    }
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="text-gray-600 badge badge-outline">
                                                                {
                                                                    item.kategori_produk
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-gray-500 uppercase text-[11px]">
                                                            {item.satuan}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex flex-col items-center">
                                                                <span
                                                                    className={`font-bold text-lg ${
                                                                        item.impacted_employees_count >
                                                                        0
                                                                            ? "text-blue-600"
                                                                            : "text-gray-300"
                                                                    }`}
                                                                >
                                                                    {
                                                                        item.impacted_employees_count
                                                                    }
                                                                </span>
                                                                <span className="text-[10px] text-gray-400">
                                                                    Pegawai
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="font-bold text-blue-700 border-none bg-blue-50 badge badge-lg">
                                                                {
                                                                    item.targets_count
                                                                }{" "}
                                                                Target
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {item.total_team_nominal >
                                                            0 ? (
                                                                <span className="font-mono text-sm text-emerald-600">
                                                                    {formatRupiah(
                                                                        item.total_team_nominal
                                                                    )}
                                                                </span>
                                                            ) : (
                                                                <span className="text-gray-300">
                                                                    -
                                                                </span>
                                                            )}
                                                        </td>
                                                    </>
                                                )}

                                                {/* --- KOLOM AKSI --- */}
                                                <td className="space-x-4 text-center border-l border-gray-100 whitespace-nowrap text-nowrap">
                                                    <div className="relative inline-flex group">
                                                        <Link
                                                            as="a"
                                                            // href={route(
                                                            //     "admin.produk.edit",
                                                            //     produk.id
                                                            // )}
                                                            className="action-btn group/button action-btn-success"
                                                        >
                                                            <span className="hidden mr-1 lg:inline group-hover/button:text-white">
                                                                Lihat
                                                            </span>
                                                            <FaEye className=" group-hover/button:fill-white" />
                                                        </Link>
                                                        <TooltipHover
                                                            message={
                                                                "Lihat Semua Detail Target "
                                                            }
                                                        />
                                                    </div>


                                                    {viewMode === "pegawai" && (
                                                        <div className="relative inline-flex group">
                                                        <Link
                                                            as="a"
                                                            href={route(
                                                                "spv.target-tim.create",
                                                                item.id
                                                            )}
                                                            className="action-btn group/button action-btn-primary"
                                                        >
                                                            <span className="hidden lg:inline group-hover/button:text-white">
                                                                Tambah
                                                            </span>
                                                            <IoMdAdd className=" group-hover/button:fill-white" />
                                                        </Link>
                                                        <TooltipHover
                                                            message={
                                                                "Tambah Target untuk Pegawai ini"
                                                            }
                                                        />
                                                    </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                datas={targets}
                                urlRoute={`/spv/target-tim`}
                                filters={{ ...filtersReq }}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed h-96 rounded-xl bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-500">
                                Data Tidak Ditemukan
                            </h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Coba ubah filter tahun atau periode.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </Authenticated>
    );
}
