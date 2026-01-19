import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { FilterSearchCustom, Pagination, TooltipHover } from "@/Components";
import { FaTrash } from "react-icons/fa6";
import moment from "moment/min/moment-with-locales";
import { IoMdAdd } from "react-icons/io";
import ShowModal from "./Partials/ShowModal";

export default function Index({
    auth,
    targets,
    title,
    filtersReq,
    filtersList,
}) {
    moment.locale("id");
    const [activeModal, setActiveModal] = useState(null);

    // --- HELPER FORMAT RUPIAH ---
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    return (
        <Authenticated user={auth.user} title={title}>
            <div className="w-full px-4 pb-10 mx-auto sm:px-6 lg:px-8">
                {/* --- HEADER CONTROL (FILTER & SEARCH) --- */}
                <section className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
                    {/* SEARCH & HISTORIS FILTER */}
                    <div className="w-full">
                        <FilterSearchCustom
                            routeName={`/spv/target-divisi`}
                            // Masukkan semua nilai filter saat ini
                            initialFilters={{ ...filtersReq }}
                            // Config Search
                            searchConfig={{
                                name: "search",
                                label: "Cari Pegawai/Produk",
                                placeholder: "Nama Pegawai atau Produk...",
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
                </section>

                <section className="pt-2">
                    {/* TITLE & ADD BUTTON */}
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-700">
                                Rekapitulasi Target Divisi
                            </h2>
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

                                            <th className="text-left ">
                                                Produk
                                            </th>
                                            <th>Nilai Target</th>
                                            <th>Periode</th>
                                            <th>Tahun</th>
                                            <th>Tgl Mulai</th>
                                            <th>Tgl Selesai</th>
                                            <th>Deadline</th>
                                        </tr>
                                    </thead>

                                    {/* BODY */}
                                    <tbody>
                                        {targets.data.map((item, i) => (
                                            <tr
                                                onClick={() => {
                                                    document
                                                        .getElementById(
                                                            `Show-${item.id}`,
                                                        )
                                                        .showModal();
                                                }}
                                                key={item.id}
                                                className="border-b border-gray-100 hover:bg-secondary/10 hover:cursor-pointer"
                                            >
                                                <td className="py-3 text-center">
                                                    <ShowModal target={item} />
                                                    {i +
                                                        1 +
                                                        (targets.meta?.from ||
                                                            1) -
                                                        1}
                                                </td>

                                                {/* PRODUK */}
                                                <td className="text-left ">
                                                    <span className="block font-medium text-gray-700">
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

                                                {/* NILAI TARGET */}
                                                <td className="text-center ">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-gray-800">
                                                            {item.tipe_target ===
                                                            "nominal"
                                                                ? formatRupiah(
                                                                      item.nilai_target,
                                                                  )
                                                                : item.nilai_target}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400 uppercase">
                                                            {
                                                                item.produk
                                                                    ?.satuan
                                                            }
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="capitalize ">
                                                    {item.periode}
                                                </td>
                                                <td>{item.tahun}</td>
                                                <td className="text-xs whitespace-nowrap">
                                                    {moment(
                                                        item.tanggal_mulai,
                                                    ).format("LL")}
                                                </td>
                                                <td className="text-xs whitespace-nowrap">
                                                    {moment(
                                                        item.tanggal_selesai,
                                                    ).format("LL")}
                                                </td>
                                                <td className="text-xs font-bold text-red-500 whitespace-nowrap">
                                                    {moment(
                                                        item.deadline_pencapaian,
                                                    ).format("LL")}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                datas={targets}
                                urlRoute={`/spv/target-divisi`}
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
