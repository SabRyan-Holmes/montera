import {
    FileInput,
    InputError,
    SecondaryButton,
    SelectInput,
    SuccessButton,
    TooltipHover,
} from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaCheck, FaPlus, FaFileMedical } from "react-icons/fa6";
import { RiArrowGoBackFill } from "react-icons/ri";
import { HiDocumentPlus } from "react-icons/hi2";
import TextInput from "@/Components/TextInput";
import axios from "axios";
import useDynamicLabels from "@/Hooks/UseDynamicLabels";
import CategoryModal from "./Partials/CategoryModal";
import { FaExchangeAlt } from "react-icons/fa";

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

    console.error("tess");
    console.error(useDynamicLabels());
    const submit = (e) => {
        e.preventDefault();
        // Gunakan forceFormData jika mengirim file lampiran
        post(route("pegawai.akuisisi.store"), {
            forceFormData: true,
        });
    };

    // 1. State untuk Label Dinamis (Default general)
    const { labels, setCategory } = useDynamicLabels();

    // 2. Handler saat Produk Dipilih
    const handleProductChange = (e) => {
        const selectedId = e.target.value;
        setData("produk_id", selectedId);

        // Cari data produk
        const selectedProduct = filtersList.produks.find(
            (p) => String(p.value) === String(selectedId),
        );

        // Panggil function dari hooks
        if (selectedProduct) {
            setCategory(selectedProduct.kategori);
        } else {
            setCategory("DEFAULT");
        }
    };

    const [generating, setGenerating] = useState(false);

    const handleGenerateNumber = async () => {
        setGenerating(true);
        try {
            // Panggil endpoint yang kita buat tadi
            const response = await axios.get(
                route("pegawai.akuisisi.generate-tn"),
            );

            // Update data form Inertia
            setData("no_transaksi", response.data.no_transaksi);
        } catch (error) {
            console.error("Gagal generate nomor", error);
            alert("Gagal mengambil nomor transaksi baru.");
        } finally {
            setGenerating(false);
        }
    };

    const [showCategoryModal, setShowCategoryModal] = useState(true); // Default true agar muncul saat load
    const [selectedCategory, setSelectedCategory] = useState(null); // Menyimpan kategori yang dipilih user

    const filteredProducts = selectedCategory
        ? filtersList.produks.filter(
              (p) => p.kategori?.toUpperCase() === selectedCategory,
          )
        : [];

    // Handler ini TETAP DISINI karena dia ngubah State milik Create
    const handleCategorySelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setCategory(categoryId);
        setData("produk_id", "");
        setShowCategoryModal(false);
    };

    return (
        <Authenticated
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <CategoryModal
                show={showCategoryModal}
                onSelect={handleCategorySelect}
            />
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
                                        <td width="40%" className="px-4 py-2">
                                            No. Transaksi / Referensi
                                        </td>
                                        <td
                                            className="px-4 py-2 border-x"
                                            width="60%"
                                        >
                                            <div className="flex items-center gap-2">
                                                {/* Input Field */}
                                                <div className="flex-grow">
                                                    <TextInput
                                                        type="text"
                                                        value={
                                                            data.no_transaksi
                                                        }
                                                        disabled
                                                        className="w-full px-2 h-9 bg-gray-50" // bg-gray-50 memberitahu user ini auto, tapi masih bisa diedit
                                                        onChange={(e) =>
                                                            setData(
                                                                "no_transaksi",
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="Klik tombol generate..."
                                                    />
                                                </div>

                                                {/* Tombol Generate */}
                                                <button
                                                    type="button"
                                                    onClick={
                                                        handleGenerateNumber
                                                    }
                                                    disabled={generating}
                                                    className="flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
                                                    title="Generate Nomor Baru"
                                                >
                                                    {generating ? (
                                                        // Spinner Loading sederhana
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
                                                            {/* Icon Refresh/Generate */}
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
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
                                        <td className="px-4 py-2">
                                            Pilih Produk
                                        </td>
                                        <td className="p-0 border-x">
                                            <div className="flex items-center gap-2 p-3">
                                                <div className="flex-grow">
                                                    <SelectInput
                                                        id="produk_id"
                                                        value={data.produk_id}
                                                        className="w-full"
                                                        placeholder={`-- Pilih Produk ${selectedCategory ? `(${selectedCategory})` : ""} --`}
                                                        options={
                                                            filteredProducts
                                                        } // Gunakan list yang sudah difilter
                                                        onChange={
                                                            handleProductChange
                                                        }
                                                        disabled={
                                                            !selectedCategory
                                                        } // Disable jika belum pilih kategori
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.produk_id
                                                        }
                                                        className="mt-1"
                                                    />
                                                </div>
                                                {/* Tombol Ganti Kategori */}

                                                <div className="relative inline-flex group">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setShowCategoryModal(
                                                                true,
                                                            )
                                                        }
                                                        className="action-btn group action-btn-bermuda"
                                                    >
                                                         <FaExchangeAlt className="scale-125 group-hover:fill-white" />
                                                    </button>
                                                    <TooltipHover
                                                        message={"Ganti Kategori Produk"}
                                                    />
                                                </div>

                                            </div>
                                        </td>
                                    </tr>

                                    <tr className="border bg-yellow-50/30">
                                        {" "}
                                        {/* Kasih background dikit biar beda (opsional) */}
                                        <td className="">Verifikator</td>
                                        <td className="border-x">
                                            <SelectInput
                                                id="supervisor_id"
                                                value={data.supervisor_id}
                                                className="w-full"
                                                placeholder="-- Pilih Supervisor sebagai Verifikator --"
                                                options={
                                                    filtersList.supervisors
                                                } // Data dari backend
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
                                            <p className="mt-1 text-xs text-gray-400">
                                                *Pilih atasan yang akan
                                                memvalidasi laporan ini.
                                            </p>
                                        </td>
                                    </tr>
                                    {/* ANCHOR */}
                                    <tr className="border">
                                        <td className="">{labels.nama}</td>
                                        <td className="border-x">
                                            <TextInput
                                                type="text"
                                                value={data.nama_nasabah}
                                                placeholder="Masukkan Nama Lengkap Nasabah"
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
                                        <td className="">{labels.identitas}</td>
                                        <td className="border-x">
                                            <TextInput
                                                type="text"
                                                value={
                                                    data.no_identitas_nasabah
                                                }
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
                                        <td className="">{labels.nominal}</td>
                                        <td className="border-x">
                                            <TextInput
                                                type="number"
                                                value={data.nominal_realisasi}
                                                className="w-full px-2 h-9"
                                                placeholder={"Contoh: 5000000"}
                                                onChange={(e) =>
                                                    setData(
                                                        "nominal_realisasi",
                                                        e.target.value,
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
                                        <td className="">{labels.tanggal}</td>
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
                                                message={
                                                    errors.tanggal_akuisisi
                                                }
                                                className="mt-2"
                                            />
                                        </td>
                                    </tr>

                                    <tr className="border">
                                        <td className="">
                                            Lampiran Bukti (Opsional)
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
                                                        file,
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
