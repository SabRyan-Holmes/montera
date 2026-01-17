import {
    InputError,
    SecondaryButton,
    SuccessButton,
    SelectInput,
} from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { FaPlus, FaUserEdit, FaSave } from "react-icons/fa";
import { FaBuilding, FaSitemap } from "react-icons/fa6"; // Icon Divisi
import { RiArrowGoBackFill } from "react-icons/ri";
import TextInput from "@/Components/TextInput";

export default function CreateEdit({
    auth,
    title,
    divisi = null,
    isEdit = false,
}) {
    // 1. STATE DINAMIS
    const { data, setData, post, put, processing, errors } = useForm({
        nama_divisi: divisi?.nama_divisi || "",
        kode_divisi: divisi?.kode_divisi || "",
        main_divisi: divisi?.main_divisi || "",
        kepala_divisi: divisi?.kepala_divisi || "",
    });

    // 2. LOGIC SUBMIT
    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("admin.divisi.update", divisi.id));
        } else {
            post(route("admin.divisi.store"));
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
                                    href={route("admin.divisi.index")}
                                    className="inline-flex items-center gap-2 "
                                >
                                    <FaSitemap className="w-4 h-4 stroke-current" />
                                    <span>Kelola Data Divisi</span>
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
                                            ? "Edit Informasi Divisi"
                                            : "Detail Divisi Baru"}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bo">
                                {/* NAMA DIVISI */}
                                <tr className="border">
                                    <td width="40%">Nama Divisi</td>
                                    <td className="border-x" width="60%">
                                        <TextInput
                                            id="nama_divisi"
                                            type="text"
                                            value={data.nama_divisi}
                                            placeholder="Contoh: Unit Mikro"
                                            className="w-full px-2 h-9 border-slate-100"
                                            isFocused={!isEdit}
                                            onChange={(e) =>
                                                setData(
                                                    "nama_divisi",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.nama_divisi}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* KODE DIVISI */}
                                <tr className="border">
                                    <td>Kode Divisi (Unik)</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            value={data.kode_divisi}
                                            placeholder="Contoh: MIKRO"
                                            className="w-full px-2 uppercase h-9 placeholder:text-accent"
                                            maxLength={10}
                                            onChange={(e) =>
                                                setData(
                                                    "kode_divisi",
                                                    e.target.value.toUpperCase(),
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.kode_divisi}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* MAIN DIVISI (ENUM) */}
                                <tr className="border">
                                    <td>Main Divisi</td>
                                    <td className="border-x">
                                        <select
                                            className="w-full h-10 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.main_divisi}
                                            onChange={(e) =>
                                                setData(
                                                    "main_divisi",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="">
                                                -- Pilih Induk Divisi --
                                            </option>
                                            <option value="Front Liner">
                                                Front Liner
                                            </option>
                                            <option value="kredit">
                                                Kredit
                                            </option>
                                        </select>
                                        <InputError
                                            message={errors.main_divisi}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* KEPALA DIVISI (OPTIONAL) */}
                                <tr className="border">
                                    <td>Kepala Divisi (Nama/NIP)</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            value={data.kepala_divisi}
                                            className="w-full px-2 h-9 placeholder:text-accent"
                                            placeholder="Contoh: Budi Santoso"
                                            onChange={(e) =>
                                                setData(
                                                    "kepala_divisi",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.kepala_divisi}
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
                                        : "Tambah Divisi"}
                                </span>
                            </SuccessButton>
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
