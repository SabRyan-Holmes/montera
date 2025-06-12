import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import useFilterSearch from "@/Components/UseFilterSearchCustom";
import FilterSearchPegawai from "../KelolaPegawai/Partials/FilterSearchPegawai";
import moment from "moment/min/moment-with-locales";
import { router } from "@inertiajs/react";
import { InputLabel, PrimaryButton } from "@/Components";
import { MdPersonSearch } from "react-icons/md";

const DEFAULT_CATEGORY = "Semua Kategori";
export default function Index({
    auth,
    riwayatKarir,
    title,
    subTitle,
    flash,
    searchReq: initialSearch,
    byJabatanReq: initialJabatan,
    byJenisPerubahanReq: initialJenisPerubahan,
    jabatanList = [],
}) {
    // ===========================================Handling Search & Filter===========================================
    const [searchInput, setSearchInput] = useState(initialSearch);
    const [submittedSearch, setSubmittedSearch] = useState(initialSearch);
    const [byJabatan, setByJabatan] = useState(initialJabatan);
    const [byJenisPerubahan, setByJenisPerubahan] = useState(
        initialJenisPerubahan
    );

    const role = auth.user.role;
    function formatRole(label) {
        return label.trim().toLowerCase().replace(/\s+/g, "-");
    }
    const routeName = `/${formatRole(role)}/riwayat-karir`;
    // Kirim ke server saat filter/search berubah
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        const currentSearch = urlParams.get("search") || "";
        const currentJabatan = urlParams.get("byJabatan") || DEFAULT_CATEGORY;
        const currentJenisPerubahan =
            urlParams.get("byJenisPerubahan") || DEFAULT_CATEGORY;

        const isSame =
            (submittedSearch || "") === currentSearch &&
            byJenisPerubahan === currentJenisPerubahan &&
            byJabatan === currentJabatan;

        const query = {};

        const trimmedSearch = (submittedSearch || "").trim();
        if (trimmedSearch) query.search = trimmedSearch;
        if (byJenisPerubahan && byJenisPerubahan !== DEFAULT_CATEGORY)
            query.byJenisPerubahan = byJenisPerubahan;
        if (byJabatan && byJabatan !== DEFAULT_CATEGORY)
            query.byJabatan = byJabatan;

        if (!isSame) {
            router.get(routeName, query, {
                replace: true,
                preserveState: true,
            });
        }
    }, [submittedSearch, byJenisPerubahan, byJabatan]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedSearch(searchInput);
    };

    moment.locale("id");
    // console.warn(riwayatKarir);
    return (
        <Authenticated user={auth.user} title={title}>
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section>
                    <form
                        className="max-w-screen-laptop"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex items-center justify-between gap-3 my-3">
                            <div className="flex items-center justify-start gap-3">
                                {/* JABATAN */}
                                <div className="flex-none w-60">
                                    <InputLabel
                                        value="Jabatan"
                                        Htmlfor="Jabatan"
                                        className="max-w-sm ml-1 text-lg"
                                    />
                                    <select
                                        className="w-full max-w-xs text-sm border select border-gradient"
                                        name="byJabatan"
                                        value={byJabatan}
                                        onChange={(e) =>
                                            setByJabatan(e.target.value)
                                        }
                                    >
                                        <option>{DEFAULT_CATEGORY}</option>
                                        {jabatanList.map((item) => (
                                            <option value={item}>
                                                Ahli {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* JENIS PERUBAHAN */}
                                <div className="flex-none w-fit">
                                    <InputLabel
                                        value="Jenis Perubahan"
                                        htmlFor="JenisPerubahan"
                                        className="max-w-sm ml-1 text-lg"
                                    />
                                    <select
                                        className="w-full max-w-xs text-sm border select border-gradient"
                                        name="byJenisPerubahan"
                                        value={byJenisPerubahan}
                                        onChange={(e) =>
                                            setByJenisPerubahan(e.target.value)
                                        }
                                    >
                                        <option>{DEFAULT_CATEGORY}</option>
                                        <option>Nama</option>
                                        <option>NIP</option>
                                        <option>Nomor Seri Karpeg</option>
                                        <option>
                                            Pangkat/Golongan Ruangan/TMT
                                        </option>
                                        <option>Tempat/Tanggal Lahir</option>
                                        <option>Jenis Kelamin</option>
                                        <option>TANJUNG JABUNG BARAT</option>
                                        <option>Pendidikan</option>
                                        <option>Jabatan/TMT</option>
                                        <option>Masa Kerja Golonga</option>
                                        <option>Daerah</option>
                                        <option>Gelar Tambahan</option>
                                    </select>
                                </div>
                            </div>

                            {/* SEARCH */}
                            <div className="flex-none w-80">
                                <InputLabel
                                    value="Nama/NIP"
                                    Htmlfor="search"
                                    className="max-w-sm ml-1 text-lg"
                                />
                                <div className="relative">
                                    <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                                        <MdPersonSearch className="w-6 h-6 fill-primary" />
                                    </div>
                                    <input
                                        type="search"
                                        id="search"
                                        name="search"
                                        value={searchInput}
                                        onChange={(e) =>
                                            setSearchInput(e.target.value)
                                        }
                                        className="w-full p-4 py-[13px] pl-10 text-sm text-gray-900 border border-gradient rounded-md"
                                        placeholder="Cari Nama Pegawai/NIP.."
                                    />
                                    <PrimaryButton
                                        type="submit"
                                        className="absolute end-2 bottom-[6px]"
                                    >
                                        Search
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>

                <section>
                    {role === "Pegawai" && (
                        <strong className="block py-3 text-2xl">
                            Riwayat Karir Saya
                        </strong>
                    )}
                    {subTitle && (
                        <div className="my-4">
                            <strong className="text-2xl font-bold text-gray-600">
                                {subTitle}
                            </strong>
                        </div>
                    )}

                    {riwayatKarir.data.length > 0 ? (
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
                                {riwayatKarir.data?.map((data, i) => (
                                    <tr role="list" key={i}>
                                        <td className="text-center">1</td>
                                        <td>
                                            <span>
                                                {moment(data.created_at).format(
                                                    "LL"
                                                )}
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
                                            <p>{data.keterangan}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
