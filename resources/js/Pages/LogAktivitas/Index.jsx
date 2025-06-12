import React, { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { MdPersonSearch } from "react-icons/md";
import { InputLabel, PrimaryButton } from "@/Components";
import moment from "moment/min/moment-with-locales";

export default function Index({
    auth,
    logAktivitas,
    title,
    flash,
    searchReq: initialSearch,
    byRoleReq: initialRole,
    byJenisReq: initialJenis,
    byKesimpulan: initialKesimpulan,
    jenisList,
    kesimpulanList,
}) {
    const [search, setSearch] = useState(initialSearch);
    const [byRole, setByRole] = useState(initialRole);
    const [byJenis, setByJenis] = useState(initialJenis);
    const [expandedRows, setExpandedRows] = useState({}); //Handling wrapped text on pengajuan.kesimpulan
    moment.locale("id");

    console.warn(logAktivitas);

    const styleByRole = {
        "Divisi SDM": "badge-xs-primary",
        Pimpinan: "badge-xs-success",
        Pegawai: "badge-xs-secondary",
    };

    function formatModel(modelPath) {
        if (!modelPath) return '';

        // Ambil kata terakhir setelah backslash
        const parts = modelPath.split('\\');
        const className = parts[parts.length - 1];

        // Pisahkan berdasarkan huruf kapital (kecuali huruf kapital berurutan)
        const readableName = className.replace(/([a-z])([A-Z])/g, '$1 $2');

        return readableName;
    }

    // TODO:Filter& Search
    // ANCHOR
    return (
        <Authenticated user={auth.user} title={title}>
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section>
                    <form className="flex items-center justify-between w-full gap-3 my-3">
                        <div className="flex items-center justify-start gap-3">
                            <div className="flex-none laptop:w-64">
                                <InputLabel
                                    value="Jenis"
                                    Htmlfor="byJenis"
                                    className="max-w-sm ml-1 text-lg"
                                />
                                <select
                                    className="w-full max-w-xs text-sm border select border-gradient selection:text-primary disabled:text-accent"
                                    name="byJenis"
                                    value={byJenis}
                                    onChange={(e) => setByJenis(e.target.value)}
                                >
                                    <option value="">Semua Kategori</option>
                                    {/* {jenisList.map((item) => (
                                    <option className="capitalize">
                                        {item}
                                    </option>
                                ))} */}
                                </select>
                            </div>
                            <div className="flex-none laptop:w-64">
                                <InputLabel
                                    value="Role"
                                    Htmlfor="byRole"
                                    className="max-w-sm ml-1 text-lg"
                                />

                                <select
                                    className="w-full max-w-xs text-sm border select border-gradient selection:text-primary disabled:text-accent"
                                    name="byRole"
                                    id="byRole"
                                    value={byRole}
                                    onChange={(e) => setByRole(e.target.value)}
                                >
                                    <option value="">Semua Kategori</option>
                                    <option>diproses</option>
                                    <option>ditolak</option>
                                    <option>disetujui</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-80">
                            <InputLabel
                                value="Keterangan Aktivitas"
                                Htmlfor="search"
                                className="max-w-sm ml-1 text-lg"
                            />

                            <label
                                htmlFor="search"
                                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                            >
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                                    <MdPersonSearch className="w-6 h-6 fill-primary" />
                                </div>
                                <input
                                    type="search"
                                    id="search"
                                    defaultValue={search}
                                    onSubmit={(e) => setSearch(e.target.value)}
                                    name="search"
                                    className=" w-full p-4 py-[13px] pl-10 text-sm placeholder:text-accent text-gray-900 border border-gradient rounded-md"
                                    placeholder="Cari Aktivitas.."
                                />
                                <PrimaryButton
                                    type="submit"
                                    className=" absolute end-2 bottom-[6px] "
                                >
                                    Search
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </section>

                <section className="mt-5">
                    {logAktivitas.data.length ? (
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
                                        Waktu Aktivitas
                                    </th>
                                    <th scope="col" width="20%" className="">
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
                                        className="group/item hover:bg-secondary/35"
                                    >
                                        <td className="text-center">{i + 1}</td>
                                        <td className="text-center">
                                            <span>
                                                {moment(data.created_at).format(
                                                    "LL"
                                                )}
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
                                                {data.user?.role ?? "Pegawai"}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            {data.aktivitas}
                                        </td>
                                        <td>
                                            <span className="flex justify-center">
                                                {formatModel(data.entity_type)} {'(ID: #'} {data.entity_id} {')'}
                                            </span>
                                        </td>
                                        <td>{data.keterangan}</td>
                                        {/* <td
                                            className="relative group cursor-pointer max-w-[300px] text-xs"
                                            onClick={() =>
                                                setExpandedRows((prev) => ({
                                                    ...prev,
                                                    [logAktivitas.id]:
                                                        !prev[logAktivitas.id],
                                                }))
                                            }
                                        >
                                            <span>
                                                {expandedRows[logAktivitas.id]
                                                    ? logAktivitas["keterangan"]
                                                    : logAktivitas["keterangan"]
                                                          .length > 50
                                                    ? logAktivitas[
                                                          "keterangan"
                                                      ].slice(0, 50) + "..."
                                                    : logAktivitas[
                                                          "keterangan"
                                                      ]}
                                            </span>

                                            {!expandedRows[logAktivitas.id] && (
                                                <div
                                                    className="absolute z-[999] w-20 px-3 py-1 mt-2 text-xs text-white transition-opacity duration-200
                                                -translate-x-1/2 bg-accent rounded shadow-lg opacity-0 pointer-events-none left-1/2 top-full group-hover:opacity-100"
                                                >
                                                    Klik untuk tampilkan lengkap
                                                    <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 bg-accent -top-1 left-1/2"></div>
                                                </div>
                                            )}
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                Belum Ada Log Aktivitas Untuk Saat Ini
                            </h2>
                        </div>
                    )}
                </section>
            </main>
        </Authenticated>
    );
}
