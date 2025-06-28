import React, { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { MdPersonSearch } from "react-icons/md";
import {
    FilterSearchCustom,
    InputLabel,
    Pagination,
    PrimaryButton,
} from "@/Components";
import moment from "moment/min/moment-with-locales";

export default function Index({
    auth,
    logAktivitas,
    title,
    subTitle,
    searchReq,
    byRoleReq,
    byJenisReq,
    aktivitasList,
}) {
    moment.locale("id");
    const styleByRole = {
        "Divisi SDM": "badge-xs-primary",
        Pimpinan: "badge-xs-success",
        Pegawai: "badge-xs-secondary",
    };

    function formatModel(modelPath) {
        if (!modelPath) return "";
        // Ambil kata terakhir setelah backslash
        const parts = modelPath.split("\\");
        const className = parts[parts.length - 1];
        // Pisahkan berdasarkan huruf kapital (kecuali huruf kapital berurutan)
        const readableName = className.replace(/([a-z])([A-Z])/g, "$1 $2");
        return readableName;
    }

    const role = auth.user.role;
    function formatRole(label) {
        return label.trim().toLowerCase().replace(/\s+/g, "-");
    }

    return (
        <Authenticated user={auth.user} title={title}>
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section className="flex items-center justify-between w-full">
                    <FilterSearchCustom
                        routeName={`/${formatRole(role)}/log-aktivitas`}
                        initialFilters={{
                            byJenis: byJenisReq,
                            byRole: byRoleReq,
                        }}
                        filtersConfig={[
                            {
                                name: "byJenisAktivitas",
                                label: "Jenis Aktivitas",
                                options: aktivitasList,
                            },
                            {
                                name: "byRole",
                                label: "Role",
                                options: ["Pegawai", "Divisi SDM", "Pimpinan"],
                            },
                        ]}
                        searchConfig={{
                            name: "search",
                            label: "Keterangan Aktivitas",
                            placeholder: "Ketik keterangan aktivitas..",
                            initialValue: searchReq,
                        }}
                    />
                </section>

                <section className="mt-5">
                    {logAktivitas.data.length > 0 ? (
                        <section className="overflow-auto">
                            <table className="table text-xs table-bordered">
                                <thead className="text-sm font-medium text-center text-white bg-primary ">
                                    <tr>
                                        <th
                                            scope="col"
                                            dir="rtl"
                                            className="rounded-tl-xl"
                                        >
                                            No
                                        </th>
                                        <th scope="col" width="10%">
                                            Tanggal & Waktu
                                        </th>
                                        <th
                                            scope="col"
                                            width="20%"
                                            className=""
                                        >
                                            Nama, NIP & Role
                                        </th>
                                        <th scope="col" width="12%">
                                            <span className="flex justify-center">
                                                Jenis Aktivitas
                                            </span>
                                        </th>
                                        <th scope="col" width="15%">
                                            <span className="flex justify-center">
                                                Target Entitas
                                            </span>
                                        </th>

                                        <th
                                            scope="col"
                                            width="60%"
                                            className="text-center rounded-tr-xl"
                                        >
                                            <span className="flex justify-center">
                                                Keterangan Aktivitas
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logAktivitas.data?.map((data, i) => (
                                        <tr
                                            role="list"
                                            key={i}
                                            className="text-center group/item hover:bg-secondary/35"
                                            onClick={""}
                                        >
                                            <td>{i + 1}</td>
                                            <td>
                                                <span>
                                                    {moment(
                                                        data.created_at
                                                    ).format("LL")}
                                                </span>
                                                <span className="block text-xs font-extralight text-nowrap">
                                                    {moment(
                                                        data.created_at
                                                    ).fromNow()}
                                                </span>
                                            </td>
                                            <td className="relative group">
                                                {/* Logic menampilkan user role Divisi SDM/Pimpinan dengan Pegawai  */}
                                                <span className="block text-nowrap">
                                                    {data.user?.name ??
                                                        data.pegawai?.Nama}
                                                </span>
                                                <span className="block p-1 mx-auto mt-1 font-medium round ed-md w-fit bg-primary/10">
                                                    {data.user?.nip ??
                                                        data.pegawai?.NIP}
                                                </span>
                                                <span
                                                    className={
                                                        styleByRole[
                                                            data.user?.role ??
                                                                "Pegawai"
                                                        ]
                                                    }
                                                >
                                                    {data.user?.role ??
                                                        "Pegawai"}
                                                </span>
                                            </td>
                                            <td>{data.aktivitas}</td>
                                            <td>
                                                <span className="block">
                                                    {formatModel(
                                                        data.entity_type
                                                    )}
                                                </span>
                                                <span className="block">
                                                    {"(ID: #"} {data.entity_id}{" "}
                                                    {")"}
                                                </span>
                                            </td>
                                            <td className="text-left">
                                                {data.keterangan}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                datas={logAktivitas}
                                urlRoute={`/${formatRole(role)}/log-aktivitas`}
                                filters={{
                                    byJenis: byJenisReq,
                                    byRole: byRoleReq,
                                    search: searchReq,
                                }}
                            />
                        </section>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                {!subTitle
                                    ? "Belum Ada Log Aktivitas Terbaru Untuk Saat Ini"
                                    : "Tidak Ditemukan"}
                            </h2>
                        </div>
                    )}
                </section>
            </main>
        </Authenticated>
    );
}
