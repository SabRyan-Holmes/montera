import { InputLabel, PrimaryButton } from '@/Components'
import React from 'react'
import { MdPersonSearch } from 'react-icons/md'

export default function FilterSearchPegawai({byJabatan, setByJabatan, byDaerah, setByDaerah, search, setSearch}) {
  return (
    <form className="max-w-screen-laptop ">
    <div className="flex items-center justify-between gap-3 my-3">
        <div className="flex items-center justify-start gap-3">
            <div className="flex-none w-60">
                <InputLabel
                    value="Jabatan"
                    Htmlfor="Jabatan"
                    className="max-w-sm ml-1 text-lg"
                />
                <select
                    className="w-full max-w-xs text-sm border select border-gradient selection:text-accent disabled:text-accent"
                    name="byJabatan"
                    value={byJabatan}
                    onChange={(e) =>
                        setByJabatan(e.target.value)
                    }
                >
                    <option>Semua Kategori</option>
                    <option value="Terampil">
                        Ahli Terampil
                    </option>
                    <option value="Mahir">Mahir</option>
                    <option value="Pertama">
                        Ahli Pertama
                    </option>
                    <option value="Penyelia">
                        Ahli Penyelia
                    </option>
                    <option value="Muda">Ahli Muda</option>
                    <option value="Madya">Ahli Madya</option>
                </select>
            </div>
            <div className="flex-none w-fit">
                <InputLabel
                    value="Daerah"
                    Htmlfor="Daerah"
                    className="max-w-sm ml-1 text-lg"
                />

                <select
                    className="w-full max-w-xs text-sm border select border-gradient selection:text-accent disabled:text-accent"
                    name="byDaerah"
                    id="byDaerah"
                    value={byDaerah}
                    onChange={(e) =>
                        setByDaerah(e.target.value)
                    }
                >
                    <option>Semua Kategori</option>
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
                <PrimaryButton type="submit" className=" absolute end-2 bottom-[6px] ">
                    Search
                </PrimaryButton>
            </div>
        </div>
    </div>
</form>
  )
}


