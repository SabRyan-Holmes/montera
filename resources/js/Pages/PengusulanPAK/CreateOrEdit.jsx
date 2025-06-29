import {
    InputError,
    SecondaryButton,
    InputLabel,
    SuccessButton,
    FileInput,
} from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";
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

export default function Create({
    auth,
    pegawai,
    title,
    isEdit,
    pengusulanPAK = null,
}) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        pegawai_nip: pegawai["NIP"],
        tujuan: "Evaluasi Kinerja Tahunan",
        periode_mulai: "",
        periode_berakhir: "",
        ak_terakhir: "",
        ak_diajukan: "",
        is_penilaian_pdd: false,
        // data pendukung(opsional)
        dokumen_utama_path: null,
        dokumen_pendukung_path: null,
        catatan_pengusul: "",
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

    useEffect(() => {
        if (errors && Object.values(errors).length > 0) {
            const firstErrorMessage = Object.values(errors)[0];
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

    useEffect(() => {
        if (isEdit && pengusulanPAK) {
            const formatToMonth = (dateStr) => {
                if (!dateStr) return "";
                const [year, month] = dateStr.split("-");
                return `${year}-${month}`;
            };

            setData({
                ...pengusulanPAK,
                id: pengusulanPAK.id,
                periode_mulai: formatToMonth(pengusulanPAK.periode_mulai),
                periode_berakhir: formatToMonth(pengusulanPAK.periode_berakhir),
                catatan_pengusul: pengusulanPAK.catatan_pengusul?.isi,
            });
            const dokumenUtamaPath = pengusulanPAK.dokumen_utama_path;
            const dokumenPendukungPath = pengusulanPAK.dokumen_pendukung_path;

            if (dokumenUtamaPath) {
                const fileName = dokumenUtamaPath.split("/").pop();
                setUploadedFiles((prev) => ({
                    ...prev,
                    dokumen_utama_path: {
                        name: fileName,
                        size: null, // optional: ukuran default
                        type: "application/pdf",
                    },
                }));
                setPreviewUrls((prev) => ({
                    ...prev,
                    dokumen_utama_path: `/storage/${dokumenUtamaPath}`, // penting: tambahin /storage/
                }));
            }

            if (dokumenPendukungPath) {
                const fileName = dokumenPendukungPath.split("/").pop();
                setUploadedFiles((prev) => ({
                    ...prev,
                    dokumen_pendukung_path: {
                        name: fileName,
                        size: null,
                        type: "application/pdf",
                    },
                }));
                setPreviewUrls((prev) => ({
                    ...prev,
                    dokumen_pendukung_path: `/storage/${dokumenPendukungPath}`,
                }));
            }
        }
    }, []);

    const submit = (e) => {
        e.preventDefault();
        console.log("isi data sebelum disubmit");
        console.log(data);
        if (isEdit) {
            router.post(
                route("pegawai.pengusulan-pak.update", pengusulanPAK),
                { _method: "patch", ...data },
                {
                    forceFormData: true,
                    onError: (err) => alert(JSON.stringify(err)),
                }
            );
        } else {
            post(route("pegawai.pengusulan-pak.store"), {
                forceFormData: true,
                onSuccess: () => {
                    console.log("berhasil");
                },
            });
        }
    };

    const [minPeriode, setMinPeriode] = useState("");
    const handleFileChange = (e, dataName) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ["application/pdf"];
        const fileType = file.type;

        if (!validTypes.includes(fileType)) {
            // alert("Hanya file PDF, JPG, atau PNG yang diizinkan");
            alert("Hanya file PDF yang diizinkan");
            e.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Ukuran file maksimal 2MB");
            e.target.value = "";
            return;
        }

        // Simpan file
        setUploadedFiles((prev) => ({
            ...prev,
            [dataName]: file,
        }));

        if (file.type === "application/pdf") {
            const url = URL.createObjectURL(file);
            setPreviewUrls((prev) => ({
                ...prev,
                [dataName]: url,
            }));
        }
        setData(dataName, file); // simpan ke form
    };

    const [uploadedFiles, setUploadedFiles] = useState({
        dokumen_utama_path: null,
        dokumen_pendukung_path: null,
    });

    const [previewUrls, setPreviewUrls] = useState({
        dokumen_utama_path: null,
        dokumen_pendukung_path: null,
    });

    // Console.log
    useEffect(() => {
        console.log("data :");
        console.log(data);
    }, [data]);

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
                </section>

                <section className="m-12 mx-auto overflow-x-auto laptop:w-4/5 max-w-screen-laptop">
                    <form onSubmit={submit} encType="multipart/form-data">
                        <table className="table text-base table-bordered ">
                            <thead>
                                <tr className="text-lg bg-primary/70">
                                    <th colSpan={2}>
                                        Pengusulan Penilaian PAK
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=" bo">
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
                                            value={pegawai["Jabatan/TMT"]}
                                            disabled
                                            isFocused={true}
                                            placeholder="Masukkan jabatan. contoh: Statistisi Ahli Muda / 01-05-2022 "
                                            maxLength={200}
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
                                            value={data.tujuan}
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
                                            value={data.periode_mulai}
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
                                            value={data.periode_berakhir}
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
                                            forName="ak_terakhir"
                                            value="Jumlah Angka Kredit Terakhir"
                                        />
                                    </td>
                                    <td className="border-x">
                                        <TextInput
                                            type="number"
                                            name="ak_terakhir"
                                            min={0}
                                            step={0.01}
                                            max={5000}
                                            className="px-2 laptop:w-full h-9 placeholder:text-accent "
                                            placeholder="Input Angka Kredit. contoh: 240.256"
                                            value={data.ak_terakhir}
                                            maxLength={100}
                                            onChange={(e) => {
                                                const value = parseFloat(
                                                    e.target.value
                                                );
                                                setData(
                                                    "ak_terakhir",
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
                                            forName="ak_diajukan"
                                            value="Jumlah Angka Kredit Diajukan"
                                        />
                                    </td>
                                    <td className="border-x">
                                        <TextInput
                                            type="number"
                                            name="ak_diajukan"
                                            min={0}
                                            step={0.01}
                                            max={5000}
                                            className="px-2 laptop:w-full h-9 placeholder:text-accent "
                                            placeholder="Input Angka Kredit. contoh: 272.234"
                                            value={data.ak_diajukan}
                                            onChange={(e) => {
                                                const value = parseFloat(
                                                    e.target.value
                                                );
                                                setData(
                                                    "ak_diajukan",
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
                                            forName="dokumen_utama_path"
                                            htmlFor="dokumen_utama_path"
                                            value="Dokumen Penilaian Kinerja
"
                                        />
                                    </td>
                                    <td>
                                        <fieldset>
                                            <div
                                                div
                                                className="relative inline "
                                            >
                                                {/* ANCHOR */}
                                                <FileInput
                                                    id="dokumen_utama_path"
                                                    name="dokumen_utama_path"
                                                    file={
                                                        uploadedFiles.dokumen_utama_path
                                                    }
                                                    previewUrl={
                                                        previewUrls.dokumen_utama_path
                                                    }
                                                    onChange={(e) =>
                                                        handleFileChange(
                                                            e,
                                                            "dokumen_utama_path"
                                                        )
                                                    }
                                                />
                                            </div>
                                        </fieldset>
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td>
                                        <InputLabel
                                            className="text-lg"
                                            forName="is_penilaian_pdd"
                                            value="Ajukan Penilaian Pendidikan Terbaru?"
                                        />
                                    </td>
                                    <td className="border-x">
                                        <select
                                            className="w-full max-w-xs text-sm border select border-gradient selection:text-accent disabled:text-accent"
                                            name="is_penilaian_pdd"
                                            id="is_penilaian_pdd"
                                            value={data.is_penilaian_pdd}
                                            onChange={(e) =>
                                                setData(
                                                    "is_penilaian_pdd",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value={0}>Tidak</option>
                                            <option value={1}>Ya</option>
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <InputLabel
                                            className="text-lg"
                                            forName="dokumen_pendukung_path"
                                            htmlFor="dokumen_pendukung_path"
                                            value=" Dokumen Penilaian Pendidikan (Ijazah Terbaru)"
                                        />
                                    </td>
                                    <td>
                                        <fieldset>
                                            <div
                                                div
                                                className="relative inline "
                                            >
                                                <FileInput
                                                    id="dokumen_pendukung_path"
                                                    name="dokumen_pendukung_path"
                                                    file={
                                                        uploadedFiles.dokumen_pendukung_path
                                                    }
                                                    previewUrl={
                                                        previewUrls.dokumen_pendukung_path
                                                    }
                                                    onChange={(e) =>
                                                        handleFileChange(
                                                            e,
                                                            "dokumen_pendukung_path"
                                                        )
                                                    }
                                                />
                                                {data.is_penilaian_pdd ==
                                                    false && (
                                                    <span className="mt-2 badge-optional">
                                                        Opsional
                                                    </span>
                                                )}
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
                                                    placeholder="Masukkan Catatan Tambahan"
                                                    value={
                                                        data.catatan_pengusul
                                                    }
                                                    maxLength={100}
                                                    onChange={(e) =>
                                                        setData(
                                                            "catatan_pengusul",
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
                        <div className="my-1"></div>
                        <div className="flex justify-center w-full my-4 ">
                            <SuccessButton
                                type="submit"
                                className="gap-1 text-base border"
                            >
                                {isEdit ? (
                                    <span>Usulkan Ulang</span>
                                ) : (
                                    <span>Ajukan Usulan</span>
                                )}
                                <BsFillSendFill className="w-4 h-4 fill-white" />
                            </SuccessButton>
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
