import {
    InputError,
    SecondaryButton,
    InputLabel,
    SuccessButton,
    FileInput,
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
import Swal from "sweetalert2";
import { BsFillSendFill } from "react-icons/bs";

export default function Create({ auth, pegawai, title, flash, isEdit }) {
    const jabatanDefault = pegawai["Jabatan/TMT"].split("/")[0].trim();
    const { data, setData, post, processing, errors, reset } = useForm({
        // ANCHOR
        // REVIEW : Ini kalo data ny dr SSO tolong dirubah
        // nama: auth.user.name,
        pegawai_nip: pegawai["NIP"],
        jabatan: jabatanDefault,
        tujuan: "Evaluasi Kinerja Tahunan",
        periode_mulai: "",
        periode_berakhir: "",
        jumlah_ak_terakhir: 0.0,
        jumlah_ak_diajukan: 0.0,

        // data pendukung(opsional)
        uraian_tugas: "",
        dokumen_pendukung_path: null,
        catatan_pegawai: "",
    });

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

    // useEffect(() => {
    //     if (flash.message) {
    //         Toast.fire({
    //             icon: "success",
    //             title: "Data Pegawai Berhasil Diupdate!!",
    //         });
    //         setTimeout(() => {
    //             flash.message = null;
    //         }, 3000);
    //     }
    // }, [flash.message]);

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
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        setAlert(true);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("pegawai.pengusulan-pak.store"), {
            onSuccess: () => {
                console.log("berhasil");
            },
        });
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

                <div className="m-12 mx-auto overflow-x-auto laptop:w-4/5 max-w-screen-laptop">
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
                                    <td width="35%">
                                        <InputLabel
                                            className="text-lg"
                                            forName="nama"
                                            value="Nama"
                                        />
                                    </td>
                                    <td className="border-x" width="60%">
                                        <TextInput
                                            id="nama"
                                            type="text"
                                            name="nama"
                                            defaultValue={`${pegawai["Nama"]} ${
                                                pegawai["Gelar Tambahan"] ?? ""
                                            } `}
                                            disabled
                                            className="w-full px-2 h-9 "
                                        />
                                    </td>
                                </tr>
                                {/* row 2 */}
                                <tr className="border">
                                    <td>
                                        <InputLabel
                                            className="text-lg"
                                            forName="nip"
                                            value="NIP"
                                        />
                                    </td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            name="nip"
                                            defaultValue={pegawai["NIP"]}
                                            disabled
                                            className="w-full px-2 h-9 placeholder:text-accent "
                                            isFocused={true}
                                            maxLength={18}
                                            onChange={(e) =>
                                                setData("nip", e.target.value)
                                            }
                                        />
                                    </td>
                                </tr>

                                <tr className="border">
                                    <td>
                                        <InputLabel
                                            className="text-lg"
                                            forName="jabatan"
                                            value="Jabatan/TMT"
                                        />
                                    </td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            name="jabatan"
                                            className="w-full px-2 h-9 placeholder:text-accent"
                                            defaultValue={data.jabatan}
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
                                    </td>
                                </tr>

                                <tr className="border">
                                    <td>
                                        <InputLabel
                                            className="text-lg"
                                            forName="tujuan"
                                            value="Tujuan Pengusulan"
                                        />
                                    </td>
                                    <td className="border-x">
                                        <select
                                            className="w-full max-w-xs text-sm border select border-gradient selection:text-accent disabled:text-accent"
                                            name="tujuan"
                                            id="tujuan"
                                            value={isEdit && data.tujuan}
                                            defaultValue={data.tujuan}
                                            onChange={(e) =>
                                                setData(
                                                    "tujuan",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option>
                                                Evaluasi Kinerja Tahunan
                                            </option>
                                            <option>
                                                Kenaikan Pangkat & Jabatan
                                            </option>
                                            <option>
                                                Mutasi/Rotasi Jabatan
                                            </option>
                                            <option>
                                                Kenaikan Gaji Berkala
                                            </option>
                                            <option>
                                                Pengangkatan Pertama Kali dalam
                                                Jabatan Fungsional
                                            </option>
                                            <option>
                                                Dokumentasi Kinerja Sebagai
                                                Rekam Jejak Karir
                                            </option>
                                            <option>
                                                Kebutuhan Evaluasi atau Inspeksi
                                                Internal
                                            </option>
                                            <option>Lainnya</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr className="border-x">
                                    <td>
                                        <InputLabel
                                            className="text-lg"
                                            forName="periode_mulai"
                                            value="Periode Penilaian"
                                        />
                                    </td>
                                    <td className="laptop:w-3/4 border-x">
                                        <input
                                            type="month"
                                            name="periode_mulai"
                                            className="font-medium rounded-md w-fit border-gradient disabled:text-accent"
                                            isFocused={true}
                                            onChange={(e) => {
                                                setMinPeriode(e.target.value);
                                                setData(
                                                    "periode_mulai",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <span className="mx-3">sd</span>
                                        <input
                                            type="month"
                                            name="periode_berakhir"
                                            id="periode_berakhir"
                                            min={minPeriode}
                                            className="font-medium rounded-md w-fit border-gradient disabled:text-accent"
                                            onChange={(e) => {
                                                const [year, month] =
                                                    e.target.value.split("-");

                                                // Mengonversi bulan menjadi integer
                                                const periodeBerakhir =
                                                    parseInt(month, 10);
                                                const [
                                                    yearMinPeriode,
                                                    monthMinPeriode,
                                                ] = minPeriode.split("-");

                                                if (year !== yearMinPeriode) {
                                                    Swal.fire({
                                                        icon: "warning",
                                                        iconColor: "#fb7185",
                                                        title: "Peringatan!",
                                                        text: "Tahun periode berakhir harus sama dengan periode mulai",
                                                        color: "#fb7185",
                                                        confirmButtonText:
                                                            "Oke",
                                                        confirmButtonColor:
                                                            "#2D95C9",
                                                    });
                                                    e.target.value = ""; //reset
                                                } else {
                                                    setData(
                                                        "periode_berakhir",
                                                        e.target.value
                                                    );
                                                }
                                            }}
                                        />
                                    </td>
                                </tr>

                                <tr className="border">
                                    <td>
                                        <InputLabel
                                            className="text-lg"
                                            forName="jumlah_ak_terakhir"
                                            value="Jumlah Angka Kredit Terakhir"
                                        />
                                    </td>
                                    <td className="border-x">
                                        <TextInput
                                            type="number"
                                            name="jumlah_ak_terakhir"
                                            min={0}
                                            step={0.01}
                                            max={5000}
                                            className="px-2 laptop:w-full h-9 placeholder:text-accent "
                                            placeholder="Input Angka Kredit. contoh: 240.256"
                                            maxLength={100}
                                            onChange={(e) => {
                                                const value = parseFloat(
                                                    e.target.value
                                                );
                                                setData(
                                                    "jumlah_ak_terakhir",
                                                    isNaN(value)
                                                        ? ""
                                                        : value.toFixed(3)
                                                );
                                            }}
                                            onInput={(e) => {
                                                e.target.value = parseFloat(
                                                    e.target.value
                                                ).toFixed(3);
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td>
                                        <InputLabel
                                            className="text-lg"
                                            forName="jumlah_ak_diajukan"
                                            value="Jumlah Angka Kredit Diajukan"
                                        />
                                    </td>
                                    <td className="border-x">
                                        <TextInput
                                            type="number"
                                            name="jumlah_ak_diajukan"
                                            min={0}
                                            step={0.01}
                                            max={5000}
                                            className="px-2 laptop:w-full h-9 placeholder:text-accent "
                                            placeholder="Input Angka Kredit. contoh: 272.234"
                                            onChange={(e) => {
                                                const value = parseFloat(
                                                    e.target.value
                                                );
                                                setData(
                                                    "jumlah_ak_diajukan",
                                                    isNaN(value)
                                                        ? ""
                                                        : value.toFixed(3)
                                                );
                                            }}
                                            onInput={(e) => {
                                                e.target.value = parseFloat(
                                                    e.target.value
                                                ).toFixed(3);
                                            }}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <InputLabel
                                            className="text-lg"
                                            forHtml="uraian_tugas"
                                            value="Uraian Tugas"
                                        />
                                    </td>
                                    <td>
                                        <fieldset>
                                            <div className="relative laptop:w-full">
                                                <textarea
                                                    name="uraian_tugas"
                                                    className="relative h-24 px-2 border laptop:w-full textarea border-gradient placeholder:text-accent"
                                                    placeholder="Masukkan Uraian Tugas."
                                                    maxLength={1000}
                                                    onChange={(e) =>
                                                        setData(
                                                            "uraian_tugas",
                                                            e.target.value
                                                        )
                                                    }
                                                ></textarea>
                                                <span className="mt-2 badge-optional">
                                                    Opsional
                                                </span>
                                            </div>
                                        </fieldset>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <InputLabel
                                            className="text-lg"
                                            forName="dokumen_pendukung_path"
                                            value="Dokumen Pendukung"
                                        />
                                    </td>
                                    <td>
                                        <fieldset>
                                            <div
                                                div
                                                className="relative inline "
                                            >
                                                <FileInput name="dokumen_pendukung_path" />
                                                <span className="mt-2 badge-optional">
                                                    Opsional
                                                </span>
                                            </div>
                                        </fieldset>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <InputLabel
                                            className="text-lg"
                                            forName="catatan_tambahan"
                                            value="Catatan Tambahan"
                                        />
                                    </td>{" "}
                                    <td>
                                        <fieldset>
                                            <div className="relative laptop:w-full">
                                                <textarea
                                                    name="catatan_tambahan"
                                                    className="relative h-24 px-2 border laptop:w-full textarea border-gradient placeholder:text-accent"
                                                    placeholder="Masukkan Uraian Tugas."
                                                    maxLength={100}
                                                    onChange={(e) =>
                                                        setData(
                                                            "catatan_pegawai",
                                                            e.target.value
                                                        )
                                                    }
                                                ></textarea>
                                                <span className="mt-2 badge-optional">
                                                    Opsional
                                                </span>
                                            </div>
                                        </fieldset>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* <Transition
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
                        </Transition> */}

                        <div className="my-1"></div>
                        <div className="flex justify-center w-full my-4 ">
                            <SuccessButton
                                type="submit"
                                className="gap-1 text-base border"
                            >
                                <span>Ajukan Usulan</span>
                                <BsFillSendFill className="w-4 h-4 fill-white" />
                            </SuccessButton>
                        </div>
                    </form>
                </div>
            </section>
        </Authenticated>
    );
}
