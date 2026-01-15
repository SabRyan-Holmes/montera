import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { FaEye, FaUserFriends, FaBoxOpen, FaEdit } from "react-icons/fa";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { FilterSearchCustom, Pagination, TooltipHover } from "@/Components";
import { FaListUl, FaTrash } from "react-icons/fa6";
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

    // ANCHOR

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
                                // {viewMode === "pegawai"
                                // ? "Daftar Target Per Pegawai"
                                // : viewMode === "produk"
                                // ? "Rekapitulasi Target Per Produk"
                                // : "Daftar Semua Target"}

                                label:
                                    viewMode === "pegawai"
                                        ? "Cari Pegawai"
                                        : viewMode === "produk"
                                        ? "Cari Produk"
                                        : "Cari Pegawai/Produk",
                                placeholder:
                                    viewMode === "pegawai"
                                        ? "Nama Pegawai..."
                                        : viewMode === "produk"
                                        ? "Nama Produk..."
                                        : "Nama Pegawai atau Produk...",
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
                    {/* VIEW TOGGLE (3 MODE) */}
                    <div className="flex items-center p-1 bg-white border border-gray-200 rounded-lg shadow-sm mt-7 overflow-x-auto">
                        <button
                            onClick={() => handleSwitchView("pegawai")}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                                viewMode === "pegawai"
                                    ? "bg-primary text-white shadow-md"
                                    : "text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            <FaUserFriends /> Per Pegawai
                        </button>
                        {/* MODE BARU: SEMUA */}
                        <button
                            onClick={() => handleSwitchView("semua")}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                                viewMode === "semua"
                                    ? "bg-primary text-white shadow-md"
                                    : "text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            <FaListUl /> Semua
                        </button>

                        <button
                            onClick={() => handleSwitchView("produk")}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                                viewMode === "produk"
                                    ? "bg-primary text-white shadow-md"
                                    : "text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            <FaBoxOpen /> Per Produk
                        </button>
                    </div>{" "}
                </section>

                <section className="pt-2">
                    {/* TITLE & SUBTITLE */}
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-700">
                                {viewMode === "pegawai"
                                    ? "Rekapitulasi Target Per Pegawai"
                                    : viewMode === "produk"
                                    ? "Rekapitulasi Target Per Produk"
                                    : "Rekapitulasi Semua Target"}
                            </h2>
                            {subTitle && (
                                <p className="inline-block px-2 py-1 mt-1 text-sm font-medium border rounded text-emerald-600 bg-emerald-50 border-emerald-100">
                                    {subTitle}
                                </p>
                            )}
                        </div>
                        <div className="flex-none pb-3 ">
                            <Link
                                as="button"
                                href={route("spv.target-tim.create")}
                                className="flex items-center mx-2 text-white btn glass bg-primary hover:bg-primary/80"
                            >
                                Tambah Produk
                                <IoMdAdd className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {targets.data.length > 0 ? (
                        <>
                            {/* TABLE WRAPPER */}
                            <div className="w-full mb-4 overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-xl">
                                <table className="table text-xs text-center min-w-max table-bordered">
                                    {/* HEADER */}
                                    <thead className="text-sm font-medium text-white bg-primary">
                                        <tr>
                                            <th>No</th>

                                            {/* HEADER MODE: SEMUA (FIELD LENGKAP) */}
                                            {viewMode === "semua" && (
                                                <>
                                                    <th className=" text-left">
                                                        Pegawai
                                                    </th>
                                                    <th className=" text-left">
                                                        Produk
                                                    </th>
                                                    <th>Nilai Target</th>
                                                    {/* <th>Tipe</th> */}
                                                    <th>Periode</th>
                                                    <th>Tahun</th>
                                                    <th>Tgl Mulai</th>
                                                    <th>Tgl Selesai</th>
                                                    <th>Deadline</th>
                                                </>
                                            )}
                                            {/* HEADER MODE: PEGAWAI */}
                                            {viewMode === "pegawai" && (
                                                <>
                                                    <th>Nama Pegawai</th>
                                                    <th>Email</th>
                                                    <th>NIP</th>
                                                    <th>Total Nominal</th>
                                                    <th>Total Target</th>
                                                    <th>Total Akuisisi</th>
                                                    <th>Total Transaksi Sah</th>
                                                </>
                                            )}

                                            {/* HEADER MODE: PRODUK */}
                                            {viewMode === "produk" && (
                                                <>
                                                    <th className=" text-left">
                                                        Nama Produk
                                                    </th>
                                                    <th>Kategori</th>
                                                    <th>Kode Produk</th>
                                                    <th>Data Input</th>
                                                    <th>Satuan</th>
                                                    <th>Pegawai Tertarget</th>
                                                    <th>Total Target</th>
                                                    <th>Total Nominal</th>
                                                </>
                                            )}

                                            {viewMode === "semua" && (
                                                <th className="right-0 z-10  text-center border-l bg-primary border-white/20">
                                                    Aksi
                                                </th>
                                            )}
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

                                                {/* BODY: SEMUA (LENGKAP) */}
                                                {viewMode === "semua" && (
                                                    <>
                                                        <td className=" text-left">
                                                            <span className="font-bold block text-gray-800">
                                                                {
                                                                    item.pegawai
                                                                        ?.name
                                                                }
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                {
                                                                    item.pegawai
                                                                        ?.nip
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className=" text-left">
                                                            <span className="font-medium block text-gray-700">
                                                                {
                                                                    item.produk
                                                                        ?.nama_produk
                                                                }
                                                            </span>
                                                            <span className="text-[10px] badge badge-ghost badge-xs">
                                                                {
                                                                    item.produk
                                                                        ?.kategori_produk
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className=" text-center">
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-gray-800">
                                                                    {item.tipe_target ===
                                                                    "nominal"
                                                                        ? formatRupiah(
                                                                              item.nilai_target
                                                                          )
                                                                        : item.nilai_target}
                                                                </span>
                                                                <span className="text-[10px] text-gray-400 uppercase">
                                                                    {
                                                                        item
                                                                            .produk
                                                                            ?.satuan
                                                                    }
                                                                </span>
                                                            </div>
                                                        </td>
                                                        {/* <td className=" capitalize">
                                                            {item.tipe_target ==
                                                            "noa"
                                                                ? "NoA"
                                                                : "Nominal"}
                                                        </td> */}
                                                        <td className=" capitalize">
                                                            {item.periode}
                                                        </td>
                                                        <td>{item.tahun}</td>
                                                        <td className=" whitespace-nowrap text-xs">
                                                            {moment(
                                                                item.tanggal_mulai
                                                            ).format("LL")}
                                                        </td>
                                                        <td className=" whitespace-nowrap text-xs">
                                                            {moment(
                                                                item.tanggal_selesai
                                                            ).format("LL")}
                                                        </td>
                                                        <td className=" whitespace-nowrap text-xs font-bold text-red-500">
                                                            {moment(
                                                                item.deadline_pencapaian
                                                            ).format("LL")}
                                                        </td>
                                                    </>
                                                )}

                                                {viewMode === "pegawai" && (
                                                    /* --- ROW: MODE PEGAWAI --- */
                                                    <>
                                                        <td className=" text-left">
                                                            {item.name}
                                                        </td>
                                                        <td>{item.email}</td>
                                                        <td className=" text-left text-gray-600">
                                                            {item.nip || "-"}{" "}
                                                            {/* Asumsi ada kolom nip */}
                                                        </td>
                                                        <td className=" font-mono font-medium text-emerald-600">
                                                            {formatRupiah(
                                                                item.total_nominal ||
                                                                    0
                                                            )}
                                                        </td>
                                                        <td>
                                                            <div className="flex flex-col items-center">
                                                                <span
                                                                    className={`font-bold text-lg ${
                                                                        item.targets_count >
                                                                        0
                                                                            ? "text-blue-600"
                                                                            : "text-disabled-color"
                                                                    }`}
                                                                >
                                                                    {
                                                                        item.targets_count
                                                                    }
                                                                </span>
                                                                <span className="text-[10px] text-gray-400">
                                                                    Target
                                                                </span>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="flex flex-col items-center">
                                                                <span
                                                                    className={`font-bold text-lg ${
                                                                        item.akuisisi_count >
                                                                        0
                                                                            ? "text-blue-600"
                                                                            : "text-disabled-color"
                                                                    }`}
                                                                >
                                                                    {
                                                                        item.akuisisi_count
                                                                    }
                                                                </span>
                                                                <span className="text-[10px] text-gray-400">
                                                                    Akuisisi
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="flex flex-col items-center">
                                                                <span
                                                                    className={`font-bold text-lg ${
                                                                        item.transaksi_count >
                                                                        0
                                                                            ? "text-blue-600"
                                                                            : "text-disabled-color"
                                                                    }`}
                                                                >
                                                                    {
                                                                        item.transaksi_count
                                                                    }
                                                                </span>
                                                                <span className="text-[10px] text-gray-400">
                                                                    Transaksi
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </>
                                                )}

                                                {viewMode === "produk" && (
                                                    /* --- ROW: MODE PRODUK --- */
                                                    <>
                                                        <td className=" text-left">
                                                            <span className="text-sm font-bold text-gray-800">
                                                                {
                                                                    item.nama_produk
                                                                }
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {
                                                                item.kategori_produk
                                                            }
                                                        </td>
                                                        <td>
                                                            {item.kode_produk}
                                                        </td>
                                                        <td className=" text-gray-500 uppercase text-[11px]">
                                                            {item.label_input}
                                                        </td>
                                                        <td className=" text-gray-500 uppercase text-[11px]">
                                                            {item.satuan}
                                                        </td>
                                                        <td>
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
                                                        <td>
                                                            <div className="flex flex-col items-center">
                                                                <span
                                                                    className={`font-bold text-lg ${
                                                                        item.targets_count >
                                                                        0
                                                                            ? "text-blue-600"
                                                                            : "text-gray-300"
                                                                    }`}
                                                                >
                                                                    {
                                                                        item.targets_count
                                                                    }
                                                                </span>
                                                                <span className="text-[10px] text-gray-400">
                                                                    Target
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td>
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
                                                {viewMode === "semua" && (
                                                    /* AKSI LENGKAP (CRUD) UTK MODE SEMUA */
                                                    <td className=" border-l border-gray-100">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => {
                                                                    /* Logic View */
                                                                }}
                                                                className="action-btn group/button action-btn-success"
                                                            >
                                                                <FaEye className="group-hover/button:fill-white" />
                                                            </button>
                                                            <Link
                                                                href={route(
                                                                    "admin.target.edit",
                                                                    item.id
                                                                )}
                                                                className="action-btn group/button action-btn-bermuda"
                                                            >
                                                                <FaEdit className="group-hover/button:fill-white" />
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="action-btn action-btn-warning group/button"
                                                            >
                                                                <FaTrash className="group-hover/button:fill-white" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                )}
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
