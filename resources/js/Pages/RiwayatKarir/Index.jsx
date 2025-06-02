import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import useFilterSearch from "@/Components/UseFilterSearchCustom";
import FilterSearchPegawai from "../KelolaPegawai/Partials/FilterSearchPegawai";
import moment from "moment/min/moment-with-locales";
export default function Index({
    auth,
    riwayatKarirDiri,
    title,
    flash,
    searchReq: initialSearch,
    byDaerahReq: initialDaerah,
    byJabatanReq: initialJabatan,
}) {
    const {
        search,
        setSearch,
        byDaerah,
        setByDaerah,
        byJabatan,
        setByJabatan,
    } = useFilterSearch({
        initialSearch,
        initialDaerah,
        initialJabatan,
        routeName: "/pegawai/riwayat-karir", // bisa diganti tergantung endpoint-nya
    });
    moment.locale("id");
    console.warn(riwayatKarirDiri)
    return (
        <Authenticated user={auth.user} title={title}>
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section>
                    <FilterSearchPegawai
                        byJabatan={byJabatan}
                        setByJabatan={setByJabatan}
                        byDaerah={byDaerah}
                        setByDaerah={setByDaerah}
                        search={search}
                        setSearch={setSearch}
                    />
                </section>

                <section>
                    <strong className="block py-6 text-2xl">Riwayat Karir Saya</strong>
                    {riwayatKarirDiri.data.length > 0 ? (
                        <table className="table text-xs table-bordered">
                            <thead className="text-sm font-medium text-white bg-primary ">
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
                                    <th scope="col" width="20%" className="">
                                        Diperbarui Oleh
                                    </th>
                                    <th
                                        scope="col"
                                        width="10%"
                                        className="text-center"
                                    >
                                        <span>Jenis</span>
                                        <span className="block">Perubahan</span>
                                    </th>
                                    <th scope="col" width="10%" className="">
                                        Data Lama
                                    </th>
                                    <th scope="col" width="10%" className="">
                                        Data Baru
                                    </th>

                                    <th scope="col" width="60%">
                                        <span className="flex justify-center">
                                            Keterangan Aktivitas
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {riwayatKarirDiri.data?.map((data, i) => (
                                    <tr role="list" key={i}>
                                        <td className="text-center">1</td>
                                        <td>
                                            <span>
                                                {moment(data.created_at).format('LL')}
                                            </span>
                                            <span className="block text-xs">
                                                {moment(
                                                    data.created_at
                                                ).fromNow()}
                                            </span>
                                        </td>
                                        <td className="relative group">
                                            <span className="block">
                                                {data.updated_by.name}
                                            </span>
                                            <span className="block ">
                                                {data.updated_by.nip}
                                            </span>
                                            <span className="badge-base">
                                                {data.updated_by.role}
                                            </span>
                                        </td>
                                        <td>{data.jenis_perubahan}</td>
                                        <td>{data.nilai_lama}</td>
                                        <td>{data.nilai_baru}</td>
                                        <td>
                                            <p>
                                                {data.keterangan}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                Belum Ada Riwayat Karir/Pembaruan Data Untuk
                                Saat Ini
                            </h2>
                        </div>
                    )}
                </section>
            </main>
        </Authenticated>
    );
}
