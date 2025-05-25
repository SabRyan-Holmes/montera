import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import useFilterSearch from "@/Components/UseFilterSearchCustom";
import FilterSearchPegawai from "../KelolaPegawai/Partials/FilterSearchPegawai";
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
                    {/* {logAktivitas.data.length ? ( */}
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
                                    Waktu Aktivitas
                                </th>
                                <th scope="col" width="20%" className="">
                                    Nama, NIP & Role
                                </th>
                                <th scope="col" width="15%">
                                    <span className="flex justify-center">
                                        Jenis Aktivitas
                                    </span>
                                </th>

                                <th scope="col" width="60%">
                                    <span className="flex justify-center">
                                        Keterangan Aktivitas
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {riwayatKarirDiri.data?.map((pengajuan, i) => ( */}
                            <tr
                                role="list"
                                // key={i}
                                className="group/item hover:bg-secondary/35"
                            >
                                <td className="text-center">{"i + 1"}</td>
                                <td>{"data.created_at"}</td>
                                <td>
                                    <span className="block">
                                        {"data.pegawai.Nama"}
                                    </span>
                                    <span className="block ">
                                        {"data.pegawai.NIP"}
                                    </span>
                                </td>
                                <td
                                    className="relative group cursor-pointer max-w-[300px] text-xs"
                                    // onClick={() =>
                                    //     setExpandedRows((prev) => ({
                                    //         ...prev,
                                    //         [data.id]:
                                    //             !prev[data.id],
                                    //     }))
                                    // }
                                >
                                    {/* Konten teks */}
                                    <span>
                                        {/* {expandedRows[data.id]
                                                    ? data["keterangan"]
                                                    : data["keterangan"]
                                                          .length > 50
                                                    ? data[
                                                          "keterangan"
                                                      ].slice(0, 50) + "..."
                                                    : data[
                                                          "keterangan"
                                                      ]} */}
                                    </span>

                                    {/* Tooltip bubble */}
                                    {/* {!expandedRows[data.id] && (
                                                <div
                                                    className="absolute z-[999] w-20 px-3 py-1 mt-2 text-xs text-white transition-opacity duration-200
                                                -translate-x-1/2 bg-accent rounded shadow-lg opacity-0 pointer-events-none left-1/2 top-full group-hover:opacity-100"
                                                >
                                                    Klik untuk tampilkan lengkap
                                                    <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-accent -top-1 left-1/2"></div>
                                                </div>
                                            )} */}
                                </td>
                            </tr>
                            {/* ))} */}
                        </tbody>
                    </table>
                    {/* ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                Belum Ada Log Aktivitas Untuk Saat Ini
                            </h2>
                        </div>
                    )} */}
                </section>
            </main>
        </Authenticated>
    );
}
