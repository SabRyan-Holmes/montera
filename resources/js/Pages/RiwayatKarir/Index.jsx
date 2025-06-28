import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import useFilterSearch from "@/Components/UseFilterSearchCustom";
import FilterSearchPegawai from "../KelolaPegawai/Partials/FilterSearchPegawai";
import moment from "moment/min/moment-with-locales";
import { router } from "@inertiajs/react";
import {
    DetailPegawai,
    FilterSearchCustom,
    InputLabel,
    Modal,
    Pagination,
    PrimaryButton,
    SecondaryButton,
} from "@/Components";
import { MdPersonSearch } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import ModalShowPegawai from "./Partials/ModalShowPegawai";

const DEFAULT_CATEGORY = "Semua Kategori";
export default function Index({
    auth,
    riwayatKarir,
    title,
    subTitle,
    flash,
    searchReq,
    byJabatanReq,
    byJenisPerubahanReq,
    jabatanList = [],
    fieldList = [],
    isPegawai = false,
    pegawai,
}) {
    // ===========================================Handling Search & Filter===========================================

    moment.locale("id");

    const role = auth.user.role;
    function formatRole(label) {
        return label.trim().toLowerCase().replace(/\s+/g, "-");
    }

    const [showPegawai, setShowPegawai] = useState(false);
    const closeModal = () => {
        setShowPegawai(false);
    };
    function extractJabatan(jabatanTMT) {
        for (const jabatan of jabatanList) {
            if (jabatanTMT.includes(jabatan)) {
                return jabatan;
            }
        }
        return "Non Fungsional"; // kalau tidak ada yang cocok
    }
    return (
        <Authenticated user={auth.user} title={title}>
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section className="flex items-center justify-between w-full">
                    <FilterSearchCustom
                        routeName={`/${formatRole(role)}/riwayat-karir`}
                        initialFilters={{
                            byJabatan: byJabatanReq,
                            byJenisPerubahan: byJenisPerubahanReq,
                        }}
                        filtersConfig={[
                            {
                                name: "byJabatan",
                                label: "Jabatan",
                                options: jabatanList,
                            },
                            {
                                name: "byJenisPerubahan",
                                label: "Jenis Perubahan ",
                                options: fieldList,
                            },
                        ]}
                        searchConfig={
                            !isPegawai && {
                                name: "search",
                                label: "Nama/NIP Pegawai",
                                placeholder: "Ketik Nama/NIP Pegawai..",
                                initialValue: searchReq,
                            }
                        }
                    />
                </section>

                <section className="pt-3">
                    {role === "Pegawai" && (
                        <div className="flex items-center justify-between my-3">
                            <strong className="block text-2xl">
                                Riwayat Karir Saya
                            </strong>
                            <Modal
                                show={showPegawai}
                                onClose={closeModal}
                                maxWidth="3xl"
                            >
                                <div className="m-10 mb-16 overflow-x-auto ">
                                    <h1 className="my-4 text-xl font-medium">
                                        Detail Pegawai Saya (Di Sistem Terkini )
                                    </h1>
                                    <DetailPegawai
                                        collapse={false}
                                        pegawai={pegawai}
                                    />
                                </div>
                            </Modal>

                            <SecondaryButton
                                className="inline-flex items-center bg-secondary/10"
                                onClick={() => setShowPegawai(true)}
                            >
                                <FaUserTie className="w-4 h-4 mr-2" />
                                <span>Data Pegawai Terkini</span>
                            </SecondaryButton>
                        </div>
                    )}

                    {subTitle && (
                        <div className="my-4">
                            <strong className="text-2xl font-bold text-gray-600">
                                {subTitle}
                            </strong>
                        </div>
                    )}

                    {riwayatKarir.data.length > 0 ? (
                        <>
                            <section className="overflow-auto">
                                <table className="table overflow-auto text-xs table-bordered">
                                    <thead className="text-sm font-medium text-center text-white bg-primary ">
                                        <tr>
                                            <th
                                                scope="col"
                                                dir="rtl"
                                                className="rounded-tl-xl"
                                            >
                                                No
                                            </th>
                                            {!isPegawai && (
                                                <th
                                                    scope="col"
                                                    width="20%"
                                                    className=""
                                                >
                                                    Nama & NIP Pegawai
                                                </th>
                                            )}

                                            <th scope="col" width="7%">
                                                Tanggal & Waktu
                                            </th>

                                            {isPegawai && (
                                                <th
                                                    scope="col"
                                                    width="20%"
                                                    className=""
                                                >
                                                    Diperbarui Oleh
                                                </th>
                                            )}

                                            <th scope="col" width="10%">
                                                <span>Jenis</span>
                                                <span className="block">
                                                    Perubahan
                                                </span>
                                            </th>
                                            <th
                                                scope="col"
                                                width="10%"
                                                className=""
                                            >
                                                Data Lama
                                            </th>
                                            <th
                                                scope="col"
                                                width="10%"
                                                className=""
                                            >
                                                Data Baru
                                            </th>

                                            <th
                                                scope="col"
                                                width="60%"
                                                className="rounded-tr-xl"
                                            >
                                                Keterangan Aktivitas
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {riwayatKarir.data?.map((data, i) => (
                                            <tr role="list" key={i}>
                                                <td className="text-center">
                                                    {i + 1}
                                                </td>
                                                {!isPegawai && (
                                                    <td className="relative group">
                                                        <span className="block">
                                                            {
                                                                data.pegawai[
                                                                    "Nama"
                                                                ]
                                                            }
                                                        </span>
                                                        <span className="block p-1 mt-1 font-medium rounded-md bg-primary/10">
                                                            {
                                                                data.pegawai[
                                                                    "NIP"
                                                                ]
                                                            }
                                                        </span>
                                                        <span className="badge-xs-secondary">
                                                            {extractJabatan(
                                                                data.pegawai[
                                                                    "Jabatan/TMT"
                                                                ]
                                                            )}
                                                        </span>
                                                    </td>
                                                )}
                                                <td>
                                                    <span>
                                                        {moment(
                                                            data.created_at
                                                        ).format("LL")}
                                                    </span>
                                                    <span className="block text-xs">
                                                        {moment(
                                                            data.created_at
                                                        ).fromNow()}
                                                    </span>
                                                </td>
                                                {isPegawai && (
                                                    <td className="relative group">
                                                        <span className="block">
                                                            {
                                                                data.updated_by
                                                                    .name
                                                            }
                                                        </span>
                                                        <span className="block p-1 mt-1 font-medium rounded-md bg-primary/10">
                                                            {
                                                                data.updated_by
                                                                    .nip
                                                            }
                                                        </span>
                                                        <span className="badge-base">
                                                            {
                                                                data.updated_by
                                                                    .role
                                                            }
                                                        </span>
                                                    </td>
                                                )}

                                                <td>{data.jenis_perubahan}</td>
                                                <td>
                                                    {data.nilai_lama ?? "-"}
                                                </td>
                                                <td>{data.nilai_baru}</td>
                                                <td className="text-left">
                                                    <p>{data.keterangan}</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>

                            <Pagination
                                datas={riwayatKarir}
                                urlRoute={`/${formatRole(role)}/riwayat-karir`}
                                filters={{
                                    byJabatan: byJabatanReq,
                                    byJenisPerubahan: byJenisPerubahanReq,
                                    search: searchReq,
                                }}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                {!subTitle
                                    ? "Belum Ada Data Riwayat Karir Terbaru Untuk Saat Ini"
                                    : "Tidak Ditemukan"}
                            </h2>
                        </div>
                    )}
                </section>
            </main>
        </Authenticated>
    );
}
