import { InputLabel, PrimaryButton } from "@/Components";
import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { MdPersonSearch } from "react-icons/md";

const DEFAULT_CATEGORY = "Semua Kategori";

export default function FilterSearchPegawai({
    routeName,
    initialSearch = "",
    initialDaerah = DEFAULT_CATEGORY,
    initialJabatan = DEFAULT_CATEGORY,
    jabatanList = []
}) {


    const [searchInput, setSearchInput] = useState(initialSearch);
    const [submittedSearch, setSubmittedSearch] = useState(initialSearch);
    const [byDaerah, setByDaerah] = useState(initialDaerah);
    const [byJabatan, setByJabatan] = useState(initialJabatan);

    // Kirim ke server saat filter/search berubah
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        const currentSearch = urlParams.get("search") || "";
        const currentDaerah = urlParams.get("byDaerah") || DEFAULT_CATEGORY;
        const currentJabatan = urlParams.get("byJabatan") || DEFAULT_CATEGORY;

        const isSame =
            (submittedSearch || "") === currentSearch &&
            byDaerah === currentDaerah &&
            byJabatan === currentJabatan;

        const query = {};

        const trimmedSearch = (submittedSearch || "").trim();
        if (trimmedSearch) query.search = trimmedSearch;
        if (byDaerah && byDaerah !== DEFAULT_CATEGORY)
            query.byDaerah = byDaerah;
        if (byJabatan && byJabatan !== DEFAULT_CATEGORY)
            query.byJabatan = byJabatan;

        if (!isSame) {
            router.get(routeName, query, {
                replace: true,
                preserveState: true,
            });
        }
    }, [submittedSearch, byDaerah, byJabatan]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedSearch(searchInput);
    };

    return (
        <form className="max-w-screen-laptop" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between gap-3 my-3">
                <div className="flex items-center justify-start gap-3">
                    <div className="flex-none w-60">
                        <InputLabel value="Jabatan" Htmlfor="Jabatan" className="max-w-sm ml-1 text-lg" />
                        <select
                            className="w-full max-w-xs text-sm border select border-gradient"
                            name="byJabatan"
                            value={byJabatan}
                            onChange={(e) => setByJabatan(e.target.value)}
                        >
                            <option>{DEFAULT_CATEGORY}</option>
                            {jabatanList.map((item) => (
                            <option value={item}>Ahli {item}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-none w-fit">
                        <InputLabel value="Daerah" Htmlfor="Daerah" className="max-w-sm ml-1 text-lg" />
                        <select
                            className="w-full max-w-xs text-sm border select border-gradient"
                            name="byDaerah"
                            value={byDaerah}
                            onChange={(e) => setByDaerah(e.target.value)}
                        >
                            <option>{DEFAULT_CATEGORY}</option>
                            <option>PROVINSI JAMBI</option>
                            <option>KOTA JAMBI</option>
                            <option>KERINCI</option>
                            <option>MUARO JAMBI</option>
                            <option>BATANG HARI</option>
                            <option>SAROLANGUN</option>
                            <option>TANJUNG JABUNG BARAT</option>
                            <option>TANJUNG JABUNG TIMUR</option>
                            <option>MERANGIN</option>
                            <option>KOTA SUNGAI PENUH</option>
                            <option>BUNGO</option>
                            <option>TEBO</option>
                        </select>
                    </div>
                </div>

                <div className="flex-none w-80">
                    <InputLabel value="Nama/NIP" Htmlfor="search" className="max-w-sm ml-1 text-lg" />
                    <div className="relative">
                        <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                            <MdPersonSearch className="w-6 h-6 fill-primary" />
                        </div>
                        <input
                            type="search"
                            id="search"
                            name="search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full p-4 py-[13px] pl-10 text-sm text-gray-900 border border-gradient rounded-md"
                            placeholder="Cari Nama Pegawai/NIP.."
                        />
                        <PrimaryButton type="submit" className="absolute end-2 bottom-[6px]">
                            Search
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </form>
    );
}
