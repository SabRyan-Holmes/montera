import { InputLabel, PrimaryButton } from "@/Components";
import { router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { MdPersonSearch } from "react-icons/md";

const DEFAULT_CATEGORY = "Semua Kategori";

export default function FilterSearchCustom({
    routeName,
    filtersConfig = [],
    initialFilters = {},
    searchConfig = null, // { name, label, placeholder, initialValue }
}) {
    // State dinamis untuk filters
    const [filters, setFilters] = useState(() => {
        const init = {};
        filtersConfig.forEach(({ name }) => {
            init[name] = initialFilters[name] || DEFAULT_CATEGORY;
        });
        return init;
    });

    // State untuk search
    const [searchInput, setSearchInput] = useState(searchConfig?.initialValue || "");
    const [submittedSearch, setSubmittedSearch] = useState(searchConfig?.initialValue || "");

    // Kirim data ke server saat filter/search berubah
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const query = {};

        let isSame = true;

        // Cek per filter
        filtersConfig.forEach(({ name }) => {
            const currentValue = urlParams.get(name) || DEFAULT_CATEGORY;
            const selectedValue = filters[name];
            if (selectedValue !== currentValue) isSame = false;

            if (selectedValue && selectedValue !== DEFAULT_CATEGORY) {
                query[name] = selectedValue;
            }
        });

        // Cek search
        if (searchConfig?.name) {
            const currentSearch = urlParams.get(searchConfig.name) || "";
            const trimmedSearch = (submittedSearch || "").trim();
            if (trimmedSearch !== currentSearch) isSame = false;

            if (trimmedSearch) query[searchConfig.name] = trimmedSearch;
        }

        if (!isSame) {
            router.get(routeName, query, {
                replace: true,
                preserveState: true,
            });
        }
    }, [filters, submittedSearch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedSearch(searchInput);
    };

    return (
        <form className="max-w-screen-laptop" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between gap-3 my-3">
                <div className="flex flex-wrap items-center justify-start gap-3">
                    {filtersConfig.map(({ name, label, options }) => (
                        <div key={name} className="flex-none w-60">
                            <InputLabel
                                value={label}
                                Htmlfor={name}
                                className="max-w-sm ml-1 text-lg"
                            />
                            <select
                                className="w-full max-w-xs text-sm border select border-gradient"
                                name={name}
                                id={name}
                                value={filters[name]}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        [name]: e.target.value,
                                    }))
                                }
                            >
                                <option>{DEFAULT_CATEGORY}</option>
                                {options.map((item) => (
                                    <option key={item} value={item} className="capitalize">
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

                {searchConfig && (
                    <div className="flex-none w-80">
                        <InputLabel
                            value={searchConfig.label || "Cari"}
                            Htmlfor={searchConfig.name}
                            className="max-w-sm ml-1 text-lg"
                        />
                        <div className="relative">
                            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                                <MdPersonSearch className="w-6 h-6 fill-primary" />
                            </div>
                            <input
                                type="search"
                                id={searchConfig.name}
                                name={searchConfig.name}
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full p-4 py-[13px] pl-10 text-sm text-gray-900 border border-gradient rounded-md"
                                placeholder={searchConfig.placeholder || "Cari..."}
                            />
                            <PrimaryButton type="submit" className=" absolute end-2 bottom-[6px]">
                                Search
                            </PrimaryButton>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
}
