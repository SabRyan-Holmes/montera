import {
    InputError,
    SecondaryButton,
    SuccessButton,
    SelectInput,
    FileInput,
} from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { FaExternalLinkAlt, FaPlus, FaSave, FaTrashAlt } from "react-icons/fa";
import { FaFileContract, FaFilePdf, FaPenToSquare } from "react-icons/fa6";
import { RiArrowGoBackFill } from "react-icons/ri";
import TextInput from "@/Components/TextInput";
import { useState, useEffect } from "react";
import axios from "axios";
import useDynamicLabels from "@/Hooks/useDynamicLabels";
import { getFileUrl, getFileName } from "@/Utils/fileUtils";

export default function CreateEdit({
    auth,
    filtersList,
    title,
    akuisisi = null,
    isEdit = false,
}) {
    const { data, setData, post, processing, errors } = useForm({
        no_transaksi: akuisisi?.no_transaksi || "",
        user_id: akuisisi?.user_id || "",
        produk_id: akuisisi?.produk_id || "",
        nama_nasabah: akuisisi?.nama_nasabah || "",
        no_identitas_nasabah: akuisisi?.no_identitas_nasabah || "",
        nominal_realisasi: akuisisi?.nominal_realisasi || "",
        tanggal_akuisisi:
            akuisisi?.tanggal_akuisisi ||
            new Date().toISOString().split("T")[0],
        supervisor_id: akuisisi?.supervisor_id || "",
        lampiran_bukti: null,
        _method: isEdit ? "PUT" : "POST",
        delete_file: false,
    });
    const [nominalLabel, setNominalLabel] = useState("Nominal / Jumlah");
    useEffect(() => {
        if (data.produk_id) {
            const selectedProd = filtersList.produks.find(
                (p) => p.value == data.produk_id,
            );
            if (selectedProd) {
                const k = selectedProd.kategori.toUpperCase();
                if (
                    k.includes("FUNDING") ||
                    k.includes("KREDIT") ||
                    k.includes("ANAK")
                ) {
                    setNominalLabel("Nominal (Rupiah)");
                } else {
                    setNominalLabel("Jumlah Unit / User");
                }
            }
        }
    }, [data.produk_id, filtersList.produks]);
    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(route("admin.akuisisi.update", akuisisi.id));
        } else {
            post(route("admin.akuisisi.store"));
        }
    };
    const [generating, setGenerating] = useState(false);
    const { labels, setCategory } = useDynamicLabels();
    const handleProductChange = (e) => {
        const selectedId = e.target.value;
        setData("produk_id", selectedId);
        const selectedProduct = filtersList.produks.find(
            (p) => String(p.value) === String(selectedId),
        );
        if (selectedProduct) {
            setCategory(selectedProduct.kategori);
        } else {
            setCategory("DEFAULT");
        }
    };
    const handleGenerateNumber = async () => {
        setGenerating(true);
        try {
            const response = await axios.get(route("shared.generate-tn"));
            setData("no_transaksi", response.data.no_transaksi);
        } catch (error) {
            console.error("Gagal generate nomor", error);
            alert("Gagal mengambil nomor transaksi baru.");
        } finally {
            setGenerating(false);
        }
    };

    const handleDeleteExistingFile = () => {
        if (confirm("Yakin ingin menghapus file lampiran ini?")) {
            setData("delete_file", true);
        }
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
                                    href={route("admin.akuisisi.index")}
                                    className="inline-flex items-center gap-2"
                                >
                                    <FaFileContract className="w-4 h-4 stroke-current" />
                                    <span>Data Akuisisi</span>
                                </a>
                            </li>
                            <li>
                                <span className="inline-flex items-center gap-2 font-semibold">
                                    {isEdit ? <FaPenToSquare /> : <FaPlus />}
                                    <span>{title}</span>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <SecondaryButton
                        onClick={() => window.history.back()}
                        className="bg-secondary/5"
                    >
                        <span>Kembali</span>
                        <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                    </SecondaryButton>
                </section>

                <section className="m-12 mx-auto overflow-x-auto laptop:w-4/5 max-w-screen-laptop">
                    <form onSubmit={submit} encType="multipart/form-data">
                        <table className="table text-base table-bordered">
                            <thead>
                                <tr
                                    className={`text-lg text-white ${isEdit ? "bg-secondary/80" : "bg-primary/90"}`}
                                >
                                    <th colSpan={2}>
                                        {isEdit
                                            ? "Edit Laporan Akuisisi"
                                            : "Form Input Akuisisi"}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtersList.pegawais &&
                                    filtersList.pegawais.length > 0 && (
                                        <tr className="border">
                                            <td>Pilih Pegawai (Pemilik)</td>
                                            <td className="border-x">
                                                <SelectInput
                                                    id="user_id"
                                                    value={data.user_id}
                                                    options={
                                                        filtersList.pegawais
                                                    }
                                                    placeholder="-- Pilih Pegawai --"
                                                    className="w-full"
                                                    onChange={(e) =>
                                                        setData(
                                                            "user_id",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={errors.user_id}
                                                    className="mt-2"
                                                />
                                            </td>
                                        </tr>
                                    )}

                                <tr className="border">
                                    <td width="40%" className="px-4 py-2">
                                        No. Transaksi / Referensi
                                    </td>
                                    <td
                                        className="px-4 py-2 border-x"
                                        width="60%"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="flex-grow">
                                                <TextInput
                                                    type="text"
                                                    value={data.no_transaksi}
                                                    disabled
                                                    className="w-full px-2 h-9 bg-gray-50"
                                                    onChange={(e) =>
                                                        setData(
                                                            "no_transaksi",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Klik tombol generate..."
                                                />
                                            </div>

                                            <button
                                                type="button"
                                                onClick={handleGenerateNumber}
                                                disabled={generating}
                                                className="flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
                                                title="Generate Nomor Baru"
                                            >
                                                {generating ? (
                                                    <svg
                                                        className="w-4 h-4 animate-spin"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                            fill="none"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                ) : (
                                                    <>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-4 h-4 mr-1"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                                            />
                                                        </svg>
                                                        Generate
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        <InputError
                                            message={errors.no_transaksi}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td width="30%">Produk</td>
                                    <td className="border-x" width="70%">
                                        <SelectInput
                                            id="produk_id"
                                            value={data.produk_id}
                                            options={filtersList.produks}
                                            placeholder="-- Pilih Produk --"
                                            className="w-full"
                                            onChange={handleProductChange}
                                        />
                                        <InputError
                                            message={errors.produk_id}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                <tr className="border">
                                    <td>{labels.nama}</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            value={data.nama_nasabah}
                                            placeholder="Nama Lengkap Nasabah"
                                            className="w-full px-2 h-9"
                                            onChange={(e) =>
                                                setData(
                                                    "nama_nasabah",
                                                    e.target.value,
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
                                    <td>{labels.identitas}</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            value={data.no_identitas_nasabah}
                                            placeholder={
                                                labels.placeholder_identitas
                                            }
                                            className="w-full px-2 h-9"
                                            onChange={(e) =>
                                                setData(
                                                    "no_identitas_nasabah",
                                                    e.target.value,
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
                                    <td>{labels.nominal}</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="number"
                                            value={data.nominal_realisasi}
                                            placeholder="0"
                                            min={0}
                                            className="w-full px-2 h-9"
                                            onChange={(e) =>
                                                setData(
                                                    "nominal_realisasi",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <p className="mt-1 text-xs text-gray-400">
                                            *Masukkan angka tanpa titik/koma
                                            (Contoh: 5000000)
                                        </p>
                                        <InputError
                                            message={errors.nominal_realisasi}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                <tr className="border">
                                    <td>{labels.tanggal}</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="date"
                                            value={data.tanggal_akuisisi}
                                            className="w-full px-2 h-9"
                                            onChange={(e) =>
                                                setData(
                                                    "tanggal_akuisisi",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.tanggal_akuisisi}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                <tr className="border">
                                    <td>Supervisor (Verifikator)</td>
                                    <td className="border-x">
                                        <SelectInput
                                            id="supervisor_id"
                                            value={data.supervisor_id}
                                            options={filtersList.supervisors}
                                            placeholder="-- Pilih Supervisor --"
                                            className="w-full"
                                            onChange={(e) =>
                                                setData(
                                                    "supervisor_id",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.supervisor_id}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                <tr className="border">
                                    <td>
                                        Lampiran Bukti <br />
                                        <span className="text-xs font-normal text-gray-400">
                                            (Foto/PDF, Max 2MB)
                                        </span>
                                    </td>
                                    <td className="p-4 border-x">
                                        {/* LOGIC FILE EXISTING: Hanya tampil jika ada file DAN belum dihapus user */}
                                        {isEdit &&
                                            akuisisi?.lampiran_bukti &&
                                            !data.delete_file && (
                                                <div className="p-3 mb-4 border border-blue-100 rounded-md bg-blue-50">
                                                    <p className="mb-2 text-xs font-semibold text-gray-500">
                                                        File Tersimpan:
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        {/* Link File */}
                                                        <a
                                                            href={getFileUrl(
                                                                akuisisi.lampiran_bukti,
                                                            )}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center flex-grow gap-2 px-3 py-2 text-sm font-medium text-blue-700 truncate transition-colors bg-white border border-blue-200 rounded-md hover:bg-blue-50"
                                                            title="Klik untuk melihat file"
                                                        >
                                                            <FaFilePdf className="flex-shrink-0 w-4 h-4 text-red-500" />
                                                            <span className="break-all truncate">
                                                                {getFileName(
                                                                    akuisisi.lampiran_bukti,
                                                                )}
                                                            </span>
                                                            <FaExternalLinkAlt className="flex-shrink-0 w-3 h-3 ml-auto opacity-50" />
                                                        </a>

                                                        {/* Tombol Hapus File (X / Tong Sampah) */}
                                                        <button
                                                            type="button"
                                                            onClick={
                                                                handleDeleteExistingFile
                                                            }
                                                            className="flex-shrink-0 p-2 text-red-600 transition-colors bg-white border border-red-200 rounded-md hover:bg-red-50 hover:text-red-700"
                                                            title="Hapus file ini"
                                                        >
                                                            <FaTrashAlt className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                        {/* Info jika file dihapus */}
                                        {data.delete_file && (
                                            <div className="flex items-center gap-1 mb-3 text-xs italic text-red-500">
                                                <FaTrashAlt /> File lama akan
                                                dihapus saat disimpan.
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setData(
                                                            "delete_file",
                                                            false,
                                                        )
                                                    }
                                                    className="ml-2 text-blue-600 underline hover:text-blue-800"
                                                >
                                                    Batal Hapus
                                                </button>
                                            </div>
                                        )}

                                        {/* Input File (Upload baru) */}
                                        <p className="mb-1 text-xs text-gray-600">
                                            {data.delete_file
                                                ? "Upload pengganti (Opsional):"
                                                : "Ganti file (Opsional):"}
                                        </p>
                                        <FileInput
                                            name="lampiran_bukti"
                                            accept=".pdf"
                                            file={data.lampiran_bukti}
                                            error={errors.lampiran_bukti}
                                            onChange={(file) =>
                                                setData("lampiran_bukti", file)
                                            }
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-center w-full my-6">
                            <SuccessButton
                                type="submit"
                                disabled={processing}
                                className={`gap-2 text-base border text-white ${isEdit ? "bg-secondary/80 hover:bg-secondary border-secondary/80" : ""}`}
                            >
                                <FaSave className="w-4 h-4" />
                                <span>
                                    {isEdit
                                        ? "Simpan Perubahan"
                                        : "Simpan Laporan"}
                                </span>
                            </SuccessButton>
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
