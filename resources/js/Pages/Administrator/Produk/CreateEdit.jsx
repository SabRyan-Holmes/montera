import {
    InputError,
    SecondaryButton,
    SelectInput,
    SuccessButton,
} from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { FaPlus, FaUserEdit, FaSave } from "react-icons/fa";
import { FaBox, FaTags } from "react-icons/fa6"; // Icon Produk
import { RiArrowGoBackFill } from "react-icons/ri";
import TextInput from "@/Components/TextInput";

export default function CreateEdit({
    auth,
    title,
    produk = null,
    isEdit = false,
    kategoriList = [], // Props dari controller
    filtersList,
}) {
    // 1. STATE DINAMIS
    const { data, setData, post, put, processing, errors } = useForm({
        nama_produk: produk?.nama_produk || "",
        kode_produk: produk?.kode_produk || "",
        kategori_produk: produk?.kategori_produk || "",
        label_input: produk?.label_input || "Nominal",
        satuan: produk?.satuan || "Rupiah",
        bobot_frontliner: produk?.bobot_frontliner || 0,
        bobot_kredit: produk?.bobot_kredit || 0,
        status: produk?.status || "tersedia",
    });

    // 2. LOGIC SUBMIT
    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("admin.produk.update", produk.id));
        } else {
            post(route("admin.produk.store"));
        }
    };

    return (
        <Authenticated
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                {/* --- HEADER SECTION --- */}
                <section className="flex justify-between">
                    <div className="mt-2 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a
                                    href={route("admin.produk.index")}
                                    className="inline-flex items-center gap-2 "
                                >
                                    <FaBox className="w-4 h-4 stroke-current" />
                                    <span>Kelola Data Produk</span>
                                </a>
                            </li>
                            <li>
                                <span className="inline-flex items-center gap-2 font-semibold">
                                    {isEdit ? <FaUserEdit /> : <FaPlus />}
                                    <span>{title}</span>
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

                {/* --- FORM SECTION --- */}
                <section className="m-12 mx-auto overflow-x-auto laptop:w-4/5 max-w-screen-laptop">
                    <form onSubmit={submit}>
                        <table className="table text-base table-bordered ">
                            <thead>
                                <tr
                                    className={`text-lg text-white ${isEdit ? "bg-secondary/80" : "bg-primary/90"}`}
                                >
                                    <th colSpan={2}>
                                        {isEdit
                                            ? "Edit Informasi Produk"
                                            : "Detail Produk Baru"}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bo">
                                {/* NAMA PRODUK */}
                                <tr className="border">
                                    <td width="40%">Nama Produk</td>
                                    <td className="border-x" width="60%">
                                        <TextInput
                                            id="nama_produk"
                                            type="text"
                                            value={data.nama_produk}
                                            placeholder="Contoh: Tabungan Gold"
                                            className="w-full px-2 h-9 border-slate-100"
                                            isFocused={!isEdit}
                                            onChange={(e) =>
                                                setData(
                                                    "nama_produk",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.nama_produk}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* KODE PRODUK */}
                                <tr className="border">
                                    <td>Kode Produk (Unik)</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            value={data.kode_produk}
                                            placeholder="Contoh: TAB-GOLD"
                                            className="w-full px-2 uppercase h-9 placeholder:text-accent"
                                            maxLength={20}
                                            onChange={(e) =>
                                                setData(
                                                    "kode_produk",
                                                    e.target.value.toUpperCase(),
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.kode_produk}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* KATEGORI PRODUK */}
                                <tr className="border">
                                    <td>Kategori</td>
                                    <td className="border-x">
                                        <SelectInput
                                            id="kategori_produk"
                                            value={data.kategori_produk}
                                            className="w-full"
                                            placeholder="-- Pilih Kategori --"
                                            options={filtersList.kategori} // Array [{id, label}]
                                            onChange={(e) =>
                                                setData(
                                                    "kategori_produk",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.kategori_produk}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* LABEL INPUT & SATUAN */}
                                <tr className="border">
                                    <td>Label Input & Satuan</td>
                                    <td className="border-x">
                                        <div className="flex gap-2">
                                            <div className="w-1/2">
                                                <TextInput
                                                    type="text"
                                                    value={data.label_input}
                                                    placeholder="Label (ex: Nominal)"
                                                    className="w-full px-2 h-9"
                                                    onChange={(e) =>
                                                        setData(
                                                            "label_input",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <TextInput
                                                    type="text"
                                                    value={data.satuan}
                                                    placeholder="Satuan (ex: Rupiah)"
                                                    className="w-full px-2 h-9"
                                                    onChange={(e) =>
                                                        setData(
                                                            "satuan",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-1">
                                            <InputError
                                                message={errors.label_input}
                                                className="w-1/2"
                                            />
                                            <InputError
                                                message={errors.satuan}
                                                className="w-1/2"
                                            />
                                        </div>
                                    </td>
                                </tr>

                                {/* BOBOT PENILAIAN */}
                                <tr className="border">
                                    <td>Bobot Penilaian (Poin)</td>
                                    <td className="border-x">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1/2">
                                                <label className="text-xs text-gray-500">
                                                    Frontliner
                                                </label>
                                                <TextInput
                                                    type="number"
                                                    min="0"
                                                    value={
                                                        data.bobot_frontliner
                                                    }
                                                    className="w-full px-2 h-9"
                                                    onChange={(e) =>
                                                        setData(
                                                            "bobot_frontliner",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <label className="text-xs text-gray-500">
                                                    Kredit
                                                </label>
                                                <TextInput
                                                    type="number"
                                                    min="0"
                                                    value={data.bobot_kredit}
                                                    className="w-full px-2 h-9"
                                                    onChange={(e) =>
                                                        setData(
                                                            "bobot_kredit",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-1">
                                            <InputError
                                                message={
                                                    errors.bobot_frontliner
                                                }
                                                className="w-1/2"
                                            />
                                            <InputError
                                                message={errors.bobot_kredit}
                                                className="w-1/2"
                                            />
                                        </div>
                                    </td>
                                </tr>

                                {/* STATUS */}
                                <tr className="border">
                                    <td>Status Produk</td>
                                    <td className="border-x">
                                        <SelectInput
                                            id="status"
                                            name="status"
                                            value={data.status}
                                            // Masukkan data dari controller langsung kesini
                                            options={filtersList.status}
                                            placeholder="-- Pilih Status --"
                                            className="w-full h-10"
                                            onChange={(e) =>
                                                setData(
                                                    "status",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.status}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="my-1"></div>
                        <div className="flex justify-center w-full my-4 ">
                            <SuccessButton
                                type="submit"
                                disabled={processing}
                                className={`gap-2 text-base border text-white ${isEdit ? "bg-secondary/80 hover:bg-secondary border-secondary/80" : ""}`}
                            >
                                {isEdit ? (
                                    <FaSave className="w-4 h-4" />
                                ) : (
                                    <FaPlus className="w-4 h-4" />
                                )}
                                <span>
                                    {isEdit
                                        ? "Simpan Perubahan"
                                        : "Tambah Produk"}
                                </span>
                            </SuccessButton>
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
