import { InputError, SecondaryButton, SuccessButton } from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { FaPlus, FaUserEdit, FaSave } from "react-icons/fa";
import { FaBriefcase, FaIdCard } from "react-icons/fa6"; // Icon Jabatan
import { RiArrowGoBackFill } from "react-icons/ri";
import TextInput from "@/Components/TextInput";

export default function CreateEdit({
    auth,
    title,
    jabatan = null,
    isEdit = false,
}) {
    // 1. STATE DINAMIS
    const { data, setData, post, put, processing, errors } = useForm({
        nama_jabatan: jabatan?.nama_jabatan || "",
        kode_jabatan: jabatan?.kode_jabatan || "",
        level_otoritas: jabatan?.level_otoritas || "",
        deskripsi_tugas: jabatan?.deskripsi_tugas || "",
    });

    // 2. LOGIC SUBMIT
    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("admin.jabatan.update", jabatan.id));
        } else {
            post(route("admin.jabatan.store"));
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
                                    href={route("admin.jabatan.index")}
                                    className="inline-flex items-center gap-2 "
                                >
                                    <FaBriefcase className="w-4 h-4 stroke-current" />
                                    <span>Kelola Data Jabatan</span>
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
                                            ? "Edit Informasi Jabatan"
                                            : "Detail Jabatan Baru"}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bo">
                                {/* NAMA JABATAN */}
                                <tr className="border">
                                    <td width="40%">Nama Jabatan</td>
                                    <td className="border-x" width="60%">
                                        <TextInput
                                            id="nama_jabatan"
                                            type="text"
                                            value={data.nama_jabatan}
                                            placeholder="Contoh: Kepala Cabang"
                                            className="w-full px-2 h-9 border-slate-100"
                                            isFocused={!isEdit}
                                            onChange={(e) =>
                                                setData("nama_jabatan", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.nama_jabatan}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* KODE JABATAN */}
                                <tr className="border">
                                    <td>Kode Jabatan (Unik)</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            value={data.kode_jabatan}
                                            placeholder="Contoh: KACAB"
                                            className="w-full px-2 uppercase h-9 placeholder:text-accent" // Auto uppercase style
                                            maxLength={10}
                                            onChange={(e) =>
                                                setData("kode_jabatan", e.target.value.toUpperCase())
                                            }
                                        />
                                        <InputError
                                            message={errors.kode_jabatan}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* LEVEL OTORITAS */}
                                <tr className="border">
                                    <td>Level Otoritas (Angka)</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="number"
                                            value={data.level_otoritas}
                                            className="w-full px-2 h-9 placeholder:text-accent"
                                            placeholder="Contoh: 1"
                                            min={0}
                                            onChange={(e) =>
                                                setData("level_otoritas", e.target.value)
                                            }
                                        />
                                        <div className="mt-1 text-xs text-gray-500">
                                            *Semakin kecil angka, semakin tinggi aksesnya.
                                        </div>
                                        <InputError
                                            message={errors.level_otoritas}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* DESKRIPSI TUGAS */}
                                <tr className="border">
                                    <td className="pt-3 align-top">Deskripsi Tugas</td>
                                    <td className="border-x">
                                        <textarea
                                            className="w-full h-24 px-2 py-2 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 placeholder:text-accent"
                                            placeholder="Jelaskan tanggung jawab jabatan ini..."
                                            value={data.deskripsi_tugas}
                                            onChange={(e) =>
                                                setData("deskripsi_tugas", e.target.value)
                                            }
                                        ></textarea>
                                        <InputError
                                            message={errors.deskripsi_tugas}
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
                                        : "Tambah Jabatan"}
                                </span>
                            </SuccessButton>
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
