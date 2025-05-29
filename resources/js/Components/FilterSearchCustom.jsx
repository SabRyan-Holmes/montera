import { InputLabel, PrimaryButton } from "@/Components";
import React from "react";
import { MdPersonSearch } from "react-icons/md";

export default function FilterSearchCustom({
    byFilter1,
    setByFilter1,
    filter1List = [],
    byFilter2,
    setByFilter2,
    filter2List = [],
    search,
    setSearch,
    filter1Label,
    filter2Label,
    showSearch = false,
}) {
    return (
        <form className="flex items-center justify-between w-full gap-3 my-3">
            <div className="flex items-center justify-start gap-3">
                <div className="flex-none laptop:w-60">
                    <InputLabel
                        value={filter1Label}
                        Htmlfor="Filter1"
                        className="max-w-sm ml-1 text-lg"
                    />
                    <select
                        className="w-full max-w-xs text-sm border select border-gradient selection:text-primary disabled:text-accent"
                        name="byFilter1"
                        value={byFilter1}
                        onChange={(e) => setByFilter1(e.target.value)}
                    >
                        <option value="">Semua Kategori</option>
                        {filter1List.map((item) => (
                            <option className="capitalize">{item}</option>
                        ))}

                        {/* <option value="Terampil">Ahli Terampil</option>
                            <option value="Mahir">Mahir</option>
                            <option value="Pertama">Ahli Pertama</option>
                            <option value="Penyelia">Ahli Penyelia</option>
                            <option value="Muda">Ahli Muda</option>
                            <option value="Madya">Ahli Madya</option> */}
                    </select>
                </div>
                <div className="flex-none laptop:w-60">
                    <InputLabel
                        value={filter2Label}
                        Htmlfor="Filter2"
                        className="max-w-sm ml-1 text-lg"
                    />

                    <select
                        className="w-full max-w-xs text-sm border select border-gradient selection:text-primary disabled:text-accent"
                        name="byFilter2"
                        id="byFilter2"
                        value={byFilter2}
                        onChange={(e) => setByFilter2(e.target.value)}
                    >
                        <option value="">Semua Kategori</option>
                        {filter2List.map((item) => (
                            <option className="capitalize">{item}</option>
                        ))}
                    </select>
                </div>
            </div>

            {showSearch && (
                <div className="w-80">
                    <InputLabel
                        value="Nama/NIP"
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
                            placeholder="Cari Nama Pegawai/NIP.."
                        />
                        <PrimaryButton
                            type="submit"
                            className=" absolute end-2 bottom-[6px] "
                        >
                            Search
                        </PrimaryButton>
                    </div>
                </div>
            )}
        </form>
    );
}
