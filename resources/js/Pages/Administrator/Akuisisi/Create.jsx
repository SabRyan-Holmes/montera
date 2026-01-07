import {
    FileInput,
    InputError,
    SecondaryButton,
    SelectInput,
    SuccessButton,
} from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaCheck, FaPlus, FaFileMedical } from "react-icons/fa6";
import { RiArrowGoBackFill } from "react-icons/ri";
import { HiDocumentPlus } from "react-icons/hi2";
import TextInput from "@/Components/TextInput";

export default function Create({ auth, filtersList, title }) {
    const { data, setData, post, processing, errors } = useForm({
        no_transaksi: "",
        produk_id: "",
        nama_nasabah: "",
        no_identitas_nasabah: "",
        nominal_realisasi: "",
        tanggal_akuisisi: new Date().toISOString().split("T")[0],
        lampiran_bukti: null,
    });

    const submit = (e) => {
        e.preventDefault();
        // Gunakan forceFormData jika mengirim file lampiran
        post(route("pegawai.akuisisi.store"), {
            forceFormData: true,
        });
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
                                    href={route("pegawai.akuisisi.index")}
                                    className="inline-flex items-center gap-2 "
                                >
                                    <HiDocumentPlus className="w-4 h-4 stroke-current" />
                                    <span>Laporan Akuisisi</span>
                                </a>
                            </li>
                            <li>
                                <span className="inline-flex items-center gap-2">
                                    <FaPlus className="w-4 h-4 stroke-current" />
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

                <section className="m-12 mx-auto overflow-x-auto laptop:w-4/5 max-w-screen-laptop ">
                    <form onSubmit={submit} encType="multipart/form-data">
                        <div className="overflow-hidden border border-gray-200 shadow-sm rounded-xl">
                            <table className="table text-base table-bordered ">
                                <thead>
                                    <tr className="text-lg bg-primary/70">
                                        <th colSpan={2}>Form Input Akuisisi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border">
                                        <td width="40%">
                                            No. Transaksi / Referensi
                                        </td>
                                        <td className="border-x" width="60%">
                                            <TextInput
                                                type="text"
                                                value={data.no_transaksi}
                                                placeholder="Contoh: TR-2023001"
                                                className="w-full px-2 h-9"
                                                onChange={(e) =>
                                                    setData(
                                                        "no_transaksi",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.no_transaksi}
                                                className="mt-2"
                                            />
                                        </td>
                                    </tr>

                                    <tr className="border">
                                        <td className="">Pilih Produk</td>
                                        <td className="border-x">
                                            <SelectInput
                                                id="produk_id"
                                                value={data.produk_id}
                                                className="w-full mt-1"
                                                placeholder="-- Pilih Produk Perbankan --"
                                                options={filtersList.produks}
                                                onChange={(e) =>
                                                    setData(
                                                        "produk_id",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.produk_id}
                                                className="mt-2"
                                            />
                                        </td>
                                    </tr>

                                    <tr className="border">
                                        <td className="">Nama Nasabah</td>
                                        <td className="border-x">
                                            <TextInput
                                                type="text"
                                                value={data.nama_nasabah}
                                                placeholder="Masukkan Nama Lengkap Nasabah"
                                                className="w-full px-2 h-9"
                                                onChange={(e) =>
                                                    setData(
                                                        "nama_nasabah",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.nama_nasabah}
                                                className="mt-2"
                                            />
                                        </td>
                                    </tr>

                                    <tr className="border">
                                        <td className="">
                                            No. Identitas / Rekening
                                        </td>
                                        <td className="border-x">
                                            <TextInput
                                                type="text"
                                                value={
                                                    data.no_identitas_nasabah
                                                }
                                                placeholder="NIK atau Nomor Rekening (Opsional)"
                                                className="w-full px-2 h-9"
                                                onChange={(e) =>
                                                    setData(
                                                        "no_identitas_nasabah",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors.no_identitas_nasabah
                                                }
                                                className="mt-2"
                                            />
                                        </td>
                                    </tr>

                                    <tr className="border">
                                        <td className="">
                                            Nominal Realisasi (Rp)
                                        </td>
                                        <td className="border-x">
                                            <TextInput
                                                type="number"
                                                value={data.nominal_realisasi}
                                                className="w-full px-2 h-9"
                                                placeholder="Contoh: 5000000"
                                                onChange={(e) =>
                                                    setData(
                                                        "nominal_realisasi",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors.nominal_realisasi
                                                }
                                                className="mt-2"
                                            />
                                        </td>
                                    </tr>

                                    <tr className="border">
                                        <td className="">Tanggal Akuisisi</td>
                                        <td className="border-x">
                                            <TextInput
                                                type="date"
                                                value={data.tanggal_akuisisi}
                                                className="w-full px-2 h-9"
                                                onChange={(e) =>
                                                    setData(
                                                        "tanggal_akuisisi",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors.tanggal_akuisisi
                                                }
                                                className="mt-2"
                                            />
                                        </td>
                                    </tr>

                                    <tr className="border">
                                        <td className="">
                                            Lampiran Bukti (PDF)
                                        </td>
                                        <td className="p-4 border-x">
                                            {" "}
                                            {/* Tambahkan padding agar cantik */}
                                            {/* PENGGUNAAN KOMPONEN BARU */}
                                            <FileInput
                                                name="lampiran_bukti"
                                                accept=".pdf"
                                                file={data.lampiran_bukti} // Passing state file saat ini
                                                error={errors.lampiran_bukti} // Passing error dari Laravel
                                                onChange={(file) =>
                                                    setData(
                                                        "lampiran_bukti",
                                                        file
                                                    )
                                                } // Update state
                                            />
                                            {/* Tidak perlu InputError manual di sini jika sudah di handle komponen,
                    tapi kalau mau double protection boleh saja dihapus props error di atas */}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-center w-full my-4 ">
                            <SuccessButton
                                type="submit"
                                disabled={processing}
                                className="gap-1 text-base border"
                            >
                                <span>Kirim Laporan</span>
                                <FaCheck className="w-4 h-4 fill-white" />
                            </SuccessButton>
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
