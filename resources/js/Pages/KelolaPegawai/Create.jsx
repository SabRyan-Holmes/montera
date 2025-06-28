import {
    InputError,
    SecondaryButton,
    InputLabel,
    SuccessButton,
} from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { FaCheck, FaDatabase, FaPlus, FaUserTie } from "react-icons/fa6";
import { FaSave, FaUserPlus } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { PiSealWarning } from "react-icons/pi";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";

export default function Create({ auth, pegawai, title, flash }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        Nama: "",
        NIP: "",
        "Nomor Seri Karpeg": "",
        "Pangkat/Golongan Ruangan/TMT": "",
        "Tempat/Tanggal Lahir": "",
        "Jenis Kelamin": "",
        Pendidikan: "",
        "Jabatan/TMT": "",
        "Masa Kerja Golongan": "-", //Anggap Default value karna belum dimigrasi ulang
        "Unit Kerja": "",
        Daerah: "",
        "Gelar Tambahan": "",
    });
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        setAlert(true);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("divisi-sdm.pegawai.store"), data);
    };

    // console.log("isi errors", errors);
    return (
        <Authenticated
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section className="flex justify-between">
                    <div className="mt-2 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a
                                    href={route("divisi-sdm.pegawai.index")}
                                    className="inline-flex items-center gap-2 "
                                >
                                    <FaUserTie className="w-4 h-4 stroke-current" />
                                    <span>Kelola Data Pegawai</span>
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
                </section>

                <section className="m-12 mx-auto overflow-x-auto laptop:w-4/5 max-w-screen-laptop">
                    <form onSubmit={submit}>
                        <table className="table text-base table-bordered ">
                            <thead>
                                <tr className="text-lg bg-primary/70">
                                    <th colSpan={2}>Detail Pegawai</th>
                                </tr>
                            </thead>
                            <tbody className=" bo">
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
                                            placeholder="Masukkan Nama Pegawai"
                                            className="w-full px-2 h-9 border-slate-100"
                                            maxLength={100}
                                            isFocused={true}
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
                                    <td className="">NIP/NRP</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            name="NIP"
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
                                {/* row 3 */}
                                <tr className="border">
                                    <td className="">
                                        NOMOR SERI KARPEG(opsional)
                                    </td>
                                    <td className="border-x">
                                        <TextInput
                                            id="nama"
                                            type="text"
                                            name="Nomor Seri Karpeg"
                                            className="w-full px-2 h-9 placeholder:text-accent "
                                            isFocused={true}
                                            maxLength={30}
                                            placeholder="Masukkan nomor Seri Karpeg. contoh: P 152011"
                                            onChange={(e) =>
                                                setData(
                                                    "Nomor Seri Karpeg",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={
                                                errors["Nomor Seri Karpeg"]
                                            }
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="">
                                        PANGKAT/GOLONGAN RUANGAN/TMT
                                    </td>

                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            name="Pangkat/Golongan Ruangan/TMT"
                                            className="w-full px-2 h-9 placeholder:text-accent "
                                            isFocused={true}
                                            maxLength={100}
                                            placeholder="Masukkan Pangkat/Golongan/TMT. contoh: PENATA / III/c / 01-04-2021"
                                            onChange={(e) =>
                                                setData(
                                                    "Pangkat/Golongan Ruangan/TMT",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={
                                                errors[
                                                    "Pangkat/Golongan Ruangan/TMT"
                                                ]
                                            }
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="border">
                                        TEMPAT/TANGGAL LAHIR
                                    </td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            name="Tempat/Tanggal Lahir"
                                            className="w-full px-2 h-9 placeholder:text-accent "
                                            isFocused={true}
                                            maxLength={50}
                                            placeholder="Masukkan Tempat/Tanggal Lahir. contoh: BATANG HARI  06-01-1972"
                                            onChange={(e) =>
                                                setData(
                                                    "Tempat/Tanggal Lahir",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={
                                                errors["Tempat/Tanggal Lahir"]
                                            }
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="">JENIS KELAMIN</td>

                                    <td className="border-x">
                                        <select
                                            className="w-full max-w-xs text-sm border select border-gradient selection:text-accent disabled:text-accent"
                                            name="Jenis Kelamin"
                                            defaultValue={"Pilih Jenis Kelamin"}
                                            onChange={(e) =>
                                                setData(
                                                    "Jenis Kelamin",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option
                                                disabled
                                                value={null}
                                                className=""
                                            >
                                                Pilih Jenis Kelamin
                                            </option>
                                            <option>PRIA</option>
                                            <option>WANITA</option>
                                        </select>

                                        <InputError
                                            message={errors["Jenis Kelamin"]}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="">PENDIDIKAN</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            name="Pendidikan"
                                            className="w-full px-2 h-9 placeholder:text-accent "
                                            isFocused={true}
                                            placeholder="Masukkan Pendidikan. contoh: S1 Manajemen"
                                            maxLength={100}
                                            onChange={(e) =>
                                                setData(
                                                    "Pendidikan",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors["Pendidikan"]}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="">JABATAN/TMT</td>
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
                                <tr className="border">
                                    <td className="">UNIT KERJA</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            name="Unit Kerja"
                                            className="w-full px-2 h-9 placeholder:text-accent "
                                            isFocused={true}
                                            placeholder="Masukkan Unit Kerja. contoh: BPS Kabupaten Batang Hari"
                                            maxLength={50}
                                            onChange={(e) =>
                                                setData(
                                                    "Unit Kerja",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors["Unit Kerja"]}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="">ASAL DAERAH BPS</td>

                                    <td className="border-x">
                                        <select
                                            className="w-full max-w-xs text-sm border select border-gradient selection:text-accent disabled:text-accent"
                                            name="Daerah"
                                            defaultValue={
                                                "Pilih Asal Daerah BPS"
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "Daerah",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option
                                                disabled
                                                value={null}
                                                className=""
                                            >
                                                Pilih Asal Daerah BPS
                                            </option>
                                            <option>PROVINSI JAMBI</option>
                                            <option>KOTA JAMBI</option>
                                            <option>KERINCI</option>
                                            <option>MUARO JAMBI</option>
                                            <option>BATANG HARI</option>
                                            <option>SAROLANGUN</option>
                                            <option>TANJAB BARAT</option>
                                            <option>TANJAB TIMUR</option>
                                            <option>MERANGIN</option>
                                            <option>SUNGAI PENUH</option>
                                            <option>BUNGO</option>
                                            <option>TEBO</option>
                                        </select>

                                        <InputError
                                            message={errors["Daerah"]}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                {/* Nambahin Field Gelar Tambahan / 10 April 2025 */}
                                <tr className="border">
                                    <td className="">Gelar Tambahan</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="Gelar Tambahan"
                                            className="h-9 w-[30rem] px-2  placeholder:text-accent "
                                            placeholder="Masukkan Gelar Tambahan(opsional)"
                                            onChange={(e) =>
                                                setData(
                                                    "Gelar Tambahan",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
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
                </section>
            </main>
        </Authenticated>
    );
}
