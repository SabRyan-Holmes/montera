import {
    TextInput,
    InputError,
    SecondaryButton,
    InputLabel,
    PrimaryButton,
    SuccessButton,
    DetailPegawai,
} from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import { FaDatabase } from "react-icons/fa6";
import { FaSave, FaUserEdit } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import Swal from "sweetalert2";

export default function Edit({ auth, pegawai, title, flash }) {
    // ==========================================================Form===============================================================

    const {
        data,
        setData,
        patch,
        delete: destroy,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        "Nomor Seri Karpeg": pegawai["Nomor Seri Karpeg"],
        "Pangkat/Golongan Ruangan/TMT": pegawai["Pangkat/Golongan Ruangan/TMT"],
        Pendidikan: pegawai["Pendidikan"],
        "Jabatan/TMT": pegawai["Jabatan/TMT"],
        "Masa Kerja Golongan": pegawai["Masa Kerja Golongan"],
        "Unit Kerja": pegawai["Unit Kerja"],
        Daerah: pegawai["Daerah"],
        "Gelar Tambahan": pegawai["Gelar Tambahan"],
    });
    // ===========================================Pop Up, Modal, Dialog Swal Message===========================================

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    useEffect(() => {
        if (flash.message) {
            Toast.fire({
                icon: "success",
                title: "Data Pegawai Berhasil Diupdate!!",
            });
            setTimeout(() => {
                flash.message = null;
            }, 3000);
        }
    }, [flash.message]);

    useEffect(() => {
        if (errors && Object.values(errors).length > 0) {
            // Ambil nilai pertama dari object errors
            const firstErrorMessage = Object.values(errors)[0];
            // console.log("firstErrorMessage :");
            // console.log(firstErrorMessage);
            Toast.fire({
                icon: "warning",
                iconColor: "#fb7185",
                title: firstErrorMessage,
                color: "#fb7185",
            });
            setTimeout(() => {
                clearErrors();
            }, 3000);
        }
    }, [errors]);

    function handleDelete(id) {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin menghapus data pegawai ini?",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#2D95C9",
            cancelButtonColor: "#9ca3af",
            customClass: {
                actions: "my-actions",
                cancelButton: "order-1 right-gap",
                confirmButton: "order-2",
                denyButton: "order-3",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("divisi-sdm.pegawai.destroy", id), {
                    onSuccess: () => {
                        // console.log(
                        //     "data pegawai dengan id ",
                        //     id,
                        //     "berhasil di delete!"
                        // );
                    },
                    onError: () => {
                        console.log("Gagal Menghapus Data");
                    },
                });
            }
        });
    }

    // ===========================================Logic Lainnya===========================================

    const submit = (e) => {
        e.preventDefault();

        patch(route("divisi-sdm.pegawai.update", pegawai));
    };

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
                                    className="gap-2"
                                >
                                    <FaDatabase className="w-4 h-4 stroke-current" />
                                    <span>Kelola Data</span>
                                </a>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    {pegawai.Nama}
                                </span>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    <FaUserEdit className="w-4 h-4 stroke-current" />

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


                <section className="m-10 mx-auto overflow-x-auto max-w-screen-laptop">
                    <form onSubmit={submit}>
                        <table className="table text-base table-auto ">
                            {/* head */}
                            <thead>
                                <tr className="text-lg bg-primary/70">
                                    <th colSpan={2}>Detail Pegawai</th>
                                    {/* <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr className="border">
                                    <td className="">Nama</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            id="Nama"
                                            type="text"
                                            name="Nama"
                                            value={pegawai.Nama}
                                            disabled
                                            className="w-full px-2 h-9 border-gradient disabled:text-accent hover:cursor-not-allowed "
                                        />
                                    </td>
                                </tr>
                                {/* row 2 */}
                                <tr className="border">
                                    <td className="">NIP/NRP</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            id="NIP"
                                            type="text"
                                            name="NIP"
                                            value={pegawai["NIP"]}
                                            disabled
                                            className="w-full px-2 h-9 border-gradient disabled:text-accent hover:cursor-not-allowed "
                                        />
                                    </td>
                                </tr>
                                {/* row 3 */}
                                <tr className="border">
                                    <td className="">
                                        NOMOR SERI KARPEG(opsional)
                                    </td>
                                    <td className="flex border-x">
                                        <TextInput
                                            id="nama"
                                            type="text"
                                            name="Nomor Seri Karpeg"
                                            defaultValue={
                                                pegawai["Nomor Seri Karpeg"]
                                            }
                                            className="w-full px-2 h-9 border-gradient placeholder:text-accent "
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
                                        PANGKAT/GOLONGAN Ruangan/TMT
                                    </td>

                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="Pangkat/Golongan Ruangan/TMT"
                                            defaultValue={
                                                data[
                                                    "Pangkat/Golongan Ruangan/TMT"
                                                ]
                                            }
                                            className="w-full px-2 h-9 border-gradient "
                                            placeholder="contoh: PENATA / III/c / 01-04-2021"
                                            max
                                            onChange={(e) =>
                                                setData(
                                                    "Pangkat/Golongan Ruangan/TMT",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="border">
                                        TEMPAT/TANGGAL LAHIR
                                    </td>
                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="Tempat/Tanggal Lahir"
                                            value={
                                                pegawai["Tempat/Tanggal Lahir"]
                                            }
                                            disabled
                                            className="w-full px-2 h-9 border-gradient disabled:text-accent hover:cursor-not-allowed "
                                            onChange={(e) =>
                                                setData(
                                                    "Tempat/Tanggal Lahir",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="">JENIS KELAMIN</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="Jenis Kelamin"
                                            value={pegawai["Jenis Kelamin"]}
                                            className="w-full px-2 h-9 border-gradient placeholder:text-accent disabled:text-accent hover:cursor-not-allowed"
                                            disabled
                                            placeholder="input disini"
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="">PENDIDIKAN</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="Pendidikan"
                                            className="h-9 w-[30rem] px-2  placeholder:text-accent "
                                            defaultValue={pegawai["Pendidikan"]}
                                            placeholder="Masukkan Pendidikan. contoh: S1 Manajemen"
                                            onChange={(e) =>
                                                setData(
                                                    "Pendidikan",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="">JABATAN/TMT</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="Jabatan/TMT"
                                            className="h-9 w-[30rem] px-2  placeholder:text-accent "
                                            defaultValue={
                                                pegawai["Jabatan/TMT"]
                                            }
                                            placeholder="Masukkan Jabatan. contoh: Statistisi Ahli Muda / 01-05-2022 "
                                            onChange={(e) =>
                                                setData(
                                                    "Jabatan/TMT",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                </tr>

                                {/* MASA KERJA GA USAH DITAMPILITN */}
                                {/* <tr className="border">
                                    <td className="">MASA KERJA GOLONGAN</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="Masa Kerja Golongan"
                                            className="h-9 w-[30rem] px-2  placeholder:text-accent "
                                            defaultValue={
                                                pegawai["Masa Kerja Golongan"]
                                            }
                                            placeholder="Masukkan Masa Kerja Golongan. contoh: 2 TAHUN 3 BULAN  "
                                            onChange={(e) =>
                                                setData(
                                                    "Masa Kerja Golongan",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                </tr> */}

                                <tr className="border">
                                    <td className="">UNIT KERJA</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="Unit Kerja"
                                            defaultValue={pegawai["Unit Kerja"]}
                                            className="h-9 w-[30rem] px-2  placeholder:text-accent "
                                            placeholder="Masukkan Unit Kerja. contoh: BPS Kabupaten Batang Hari"
                                            onChange={(e) =>
                                                setData(
                                                    "Unit Kerja",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="">ASAL DAERAH BPS</td>
                                    <td className="flex border-x">
                                        <select
                                            className="w-full text-sm border select border-gradient selection:text-accent disabled:text-accent"
                                            name="Daerah"
                                            defaultValue={pegawai.Daerah}
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
                                    </td>
                                </tr>
                                {/* Nambahin Field Gelar Tambahan / 10 April 2025 */}
                                <tr className="border">
                                    <td className="">Gelar Tambahan</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="Gelar Tambahan"
                                            defaultValue={
                                                pegawai["Gelar Tambahan"] &&
                                                pegawai["Gelar Tambahan"]
                                            }
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

                        <div className="flex justify-center w-full my-4">
                            <button
                                type="submit"
                                className="gap-3 px-5 text-base uppercase scale-95 border group/button btn glass bg-hijau/20 hover:bg-hijau hover:text-white border-hijau/20 text-hijau"
                            >
                                <span>Update Data</span>
                                <FaSave className="w-4 h-5 fill-hijau group-hover/button:fill-white" />
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
