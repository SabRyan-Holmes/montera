import {
    InputError,
    SecondaryButton,
    InputLabel,
    SuccessButton,
} from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { FaCheck, FaDatabase, FaPlus } from "react-icons/fa6";
import { FaSave, FaUserPlus } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { PiSealWarning } from "react-icons/pi";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { MdOutlineAssignmentInd } from "react-icons/md";

export default function Create({ auth, pegawai, title, flash }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        // ANCHOR
        // REVIEW : Ini kalo data ny dr SSO tolong dirubah
        Nama: auth.user.name,
        NIP: auth.user.nip,
        "Jabatan ": "",
        periode_mulai: "",
        periode_berakhir: "",
        jumlah_ak_terakhir: 0.000,
        jumlah_ak_diajukan: 0.000,

        // data pendukung(opsional)
        uraian_tugas: 0.000,
        dokumen_pendukung_path: 0.000,

        "Masa Kerja Golongan": "-", //Anggap Default value karna belum dimigrasi ulang
    });
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        setAlert(true);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("divisi-sdm.pegawai.store"), data);
    };

    const [minPeriode, setMinPeriode] = useState("");

    // console.log("isi errors", errors);
    console.log("isi data", data);
    return (
        <Authenticated
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <section className="h-full m-10 mb-24 laptop:h-full">
                <div className="flex justify-between">
                    <div className="mt-2 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a
                                    href={route("divisi-sdm.pegawai.index")}
                                    className="gap-2"
                                >
                                    <MdOutlineAssignmentInd className="w-4 h-4 stroke-current" />
                                    <span>Pengusulan PAK</span>
                                </a>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    <FaUserPlus className="w-4 h-4 stroke-current" />

                                    {title}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <SecondaryButton
                        onClick={() => window.history.back()}
                        className="capitalize bg-secondary/5 "
                    >
                        <span>Kembali</span>
                        <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                    </SecondaryButton>
                </div>

                <div className="mx-auto overflow-x-auto max-w-screen-laptop">
                    <h1 className="mt-8 mb-4 text-3xl capitalize">{title}</h1>
                    <form onSubmit={submit}>
                        <table className="table text-base table-bordered ">
                            {/* head */}
                            <thead>
                                <tr className="text-lg bg-primary/70">
                                    <th colSpan={2}>Detail Pengusulan PAK</th>
                                </tr>
                            </thead>
                            <tbody className=" bo">
                                {/* ANCHOR */}
                                {/* row 1 */}
                                <tr className="border">
                                    <td className="" width="40%">
                                        Nama
                                    </td>
                                    <td className="border-x" width="60%">
                                        <TextInput
                                            id="Nama"
                                            type="text"
                                            name="Nama"
                                            defaultValue={data.Nama}
                                            placeholder="Masukkan Nama Pegawai"
                                            maxLength={100}
                                            isFocused={true}
                                            className="w-full px-2 h-9 border-slate-100"
                                            onChange={(e) =>
                                                setData("Nama", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.Nama}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                {/* row 2 */}
                                <tr className="border">
                                    <td className="">NIP</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            name="NIP"
                                            defaultValue={data.NIP}
                                            placeholder="Masukkan NIP/NRP"
                                            className="w-full px-2 h-9 placeholder:text-accent "
                                            isFocused={true}
                                            maxLength={18}
                                            onChange={(e) =>
                                                setData("NIP", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors["NIP"]}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                <tr className="border">
                                    <td className="">JABATAN/TMT</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            name="jabatan"
                                            className="w-full px-2 h-9 placeholder:text-accent "
                                            isFocused={true}
                                            placeholder="Masukkan jabatan. contoh: Statistisi Ahli Muda / 01-05-2022 "
                                            maxLength={100}
                                            onChange={(e) =>
                                                setData(
                                                    "jabatan",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors["Jabatan"]}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                {/* row 3 */}

                                <tr className="border-x">
                                    <td className="">
                                        Jumlah Angka Kredit Terakhir
                                    </td>
                                    <td className="border-x">
                                        <input
                                            type="month"
                                            name="periode_mulai"
                                            className="px-4 font-medium rounded-md w-fit border-gradient disabled:text-accent"
                                            onChange={(e) => {
                                                // Set min periode untuk untuk periode berakhir
                                                setMinPeriode(e.target.value);
                                                setData(
                                                    "periode_mulai",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <span>sd</span>
                                        <input
                                            type="month"
                                            name="periode_berakhir"
                                            id="periode_berakhir"
                                            min={minPeriode}
                                            className="px-4 font-medium rounded-md w-fit border-gradient disabled:text-accent"
                                            onChange={(e) =>
                                                setData(
                                                    "periode_mulai",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                </tr>

                                <tr className="border">
                                    <td className="">
                                        Jumlah Angka Kredit Terakhir
                                    </td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            name="Jabatan/TMT"
                                            className="w-full px-2 h-9 placeholder:text-accent "
                                            isFocused={true}
                                            placeholder="Masukkan Jabatan. contoh: Statistisi Ahli Muda / 01-05-2022 "
                                            maxLength={100}
                                            onChange={(e) =>
                                                setData(
                                                    "Jabatan/TMT",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors["Jabatan/TMT"]}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                {/* Ngehapus Field Masa Kerja Golongan */}
                                {/* <tr className="border">
                                    <td className="">MASA KERJA GOLONGAN</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            name="Masa Kerja Golongan"
                                            className="w-full px-2 h-9 placeholder:text-accent "
                                            isFocused={true}
                                            maxLength={100}
                                            placeholder="Masukkan Masa Kerja Golongan. contoh: 2 TAHUN 3 BULAN  "
                                            onChange={(e) =>
                                                setData(
                                                    "Masa Kerja Golongan",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={
                                                errors["Masa Kerja Golongan"]
                                            }
                                            className="mt-2"
                                        />
                                    </td>
                                </tr> */}

                                {/* Nambahin Field Gelar Tambahan / 10 April 2025 */}
                            </tbody>
                        </table>

                        <Transition
                            show={alert}
                            enter="transition ease-in-out duration-700"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out duration-700"
                            leaveTo="opacity-0"
                        >
                            <div
                                role="alert"
                                className="my-2 mt-4 rounded-md shadow-lg alert"
                            >
                                <PiSealWarning className="w-7 h-7 fill-secondary" />
                                <div>
                                    <h3 className="text-base font-bold text-secondary">
                                        Catatan!
                                    </h3>
                                    <div className="text-sm text-red-950">
                                        <span>
                                            Nama, NIP/NRP, Alamat, Jenis Kelamin
                                            tidak bisa diubah setelah sekali
                                            ditambahkan, pastikan sudah mengisi
                                            dengan benar!
                                        </span>
                                    </div>
                                </div>
                                <a
                                    onClick={() => setAlert(false)}
                                    className="group/btn inline text-xs cursor-pointer text-black action-btn hover:scale-[1.15] hover:text-emerald-700 border-hijau/80 bg-hijau/60"
                                >
                                    Saya Paham
                                    <FaCheck className="inline w-4 h-4 ml-1 fill-emerald-900 group-hover/btn:fill-emerald-600" />
                                </a>
                            </div>
                        </Transition>

                        <div className="my-1"></div>
                        <div className="flex justify-center w-full my-4 ">
                            <SuccessButton
                                type="submit"
                                className="gap-1 text-base border"
                            >
                                <span>Tambah Data</span>
                                <FaPlus className="w-4 h-4 fill-white" />
                            </SuccessButton>
                        </div>
                    </form>
                </div>
            </section>
        </Authenticated>
    );
}
