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
                                    Tanggal & Waktu
                                </th>
                                <th scope="col" width="20%" className="">
                                    Diperbarui Oleh
                                </th>
                                <th scope="col" width="10%" className="text-center">
                                    <span>
                                        Jenis
                                    </span>
                                    <span className="block">
                                        Perubahan
                                    </span>
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
                            {/* {riwayatKarirDiri.data?.map((pengajuan, i) => ( */}
                            <tr
                                role="list"
                                // key={i}
                                className="group/item hover:bg-secondary/35"
                            >
                                <td className="text-center">1</td>
                                <td>
                                    25 Mei 2025
                                    <span className="block text-xs">1 Hari yang Lalu</span>
                                    </td>
                                <td className="relative group">
                                    <span className="block">
                                        {"Dwi Utaminingsih"}
                                    </span>
                                    <span className="block ">
                                        {"198807032011012019"}
                                    </span>
                                    <span className="badge-base">
                                        {"Divisi SDM"}
                                    </span>
                                </td>
                                <td>
                                    {"Jabatan"}
                                </td>
                                <td>
                                    {"Muda"}
                                </td>
                                <td>
                                    {"Madya"}
                                </td>
                                <td>
                                    <p>
                                    Divisi SDM memperbarui <span>'{'Jabatan'}'</span> pegawai dengan
                                    <br />
                                    NIP : <span>200002122022012003</span> &
                                    <br />
                                    Nama :  <span>DIAS KHUSNUL KHOTIMAH S.Tr.Stat </span>
                                    </p>
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
