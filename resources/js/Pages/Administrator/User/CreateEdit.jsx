import {
    InputError,
    SecondaryButton,
    SuccessButton,
    SelectInput,
} from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { FaUserPlus, FaUserEdit, FaSave } from "react-icons/fa";
import { FaUserTie, FaUsersGear } from "react-icons/fa6";
import { RiArrowGoBackFill } from "react-icons/ri";
import TextInput from "@/Components/TextInput";
export default function CreateEdit({
    auth,
    title,
    user = null,
    isEdit = false,
    optionList,
}) {
    const { data, setData, post, put, processing, errors,setError,
        clearErrors } = useForm({
        name: user?.name || "",
        nip: user?.nip || "",
        email: user?.email || "",
        password: "",
        jabatan_id: user?.jabatan_id || "",
        divisi_id: user?.divisi_id || "",
        status_aktif: user?.status_aktif || "aktif",
    });
    const submit = (e) => {
        e.preventDefault();
        clearErrors(); // Bersihkan error sebelumnya

        // --- LOGIC VALIDASI MANUAL ---
        // Jika jabatan butuh divisi, tapi user belum pilih divisi
        if (isDivisiRequired() && !data.divisi_id) {
            setError(
                "divisi_id",
                "Divisi wajib dipilih untuk Jabatan Pegawai atau Supervisor.",
            );
            // Stop proses submit disini
            return;
        }
        if (isEdit) {
            put(route("admin.user.update", user.id));
        } else {
            post(route("admin.user.store"));
        }
    };

    const isDivisiRequired = () => {
        if (!data.jabatan_id) return false;

        // Cari object jabatan di optionList berdasarkan ID yang dipilih
        const selectedJabatan = optionList.jabatan.find(
            (opt) => opt.value == data.jabatan_id,
        );

        // Jika ketemu, cek apakah labelnya Pegawai atau Supervisor
        if (selectedJabatan) {
            const label = selectedJabatan.label; // Sesuai database: 'Pegawai', 'Supervisor'
            return ["Pegawai", "Supervisor"].includes(label);
        }
        return false;
    };

    return (
        <Authenticated
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                {}
                <section className="flex justify-between">
                    <div className="mt-2 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a
                                    href={route("admin.user.index")}
                                    className="inline-flex items-center gap-2 "
                                >
                                    <FaUsersGear className="w-4 h-4 stroke-current" />
                                    <span>Kelola Data Pegawai</span>
                                </a>
                            </li>
                            <li>
                                <span className="inline-flex items-center gap-2 font-semibold">
                                    {isEdit ? <FaUserEdit /> : <FaUserPlus />}
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

                {}
                <section className="m-12 mx-auto overflow-x-auto laptop:w-4/5 max-w-screen-laptop">
                    <form onSubmit={submit}>
                        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                            <table className="table text-base table-bordered">
                                <thead>
                                    <tr
                                        className={`text-lg text-white ${isEdit ? "bg-secondary/80" : "bg-primary/90"}`}
                                    >
                                        <th colSpan={2}>
                                            {isEdit
                                                ? "Form Edit User"
                                                : "Form Input User Baru"}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {}
                                    <tr className="border">
                                        <td
                                            width="30%"
                                            className="font-medium bg-gray-50"
                                        >
                                            Nama Lengkap
                                        </td>
                                        <td width="70%">
                                            <TextInput
                                                type="text"
                                                value={data.name}
                                                placeholder="Nama Lengkap Pegawai"
                                                className="w-full px-3 py-2 border-gray-300"
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-1"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="font-medium bg-gray-50">
                                            NIP (Nomor Induk)
                                        </td>
                                        <td>
                                            <TextInput
                                                type="text"
                                                value={data.nip}
                                                placeholder="Nomor Induk Pegawai"
                                                className="w-full px-3 py-2 border-gray-300"
                                                onChange={(e) =>
                                                    setData(
                                                        "nip",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.nip}
                                                className="mt-1"
                                            />
                                        </td>
                                    </tr>

                                    {}
                                    <tr className="border">
                                        <td className="font-medium bg-gray-50">
                                            Jabatan
                                        </td>
                                        <td>
                                            <SelectInput
                                                value={data.jabatan_id}
                                                options={optionList.jabatan}
                                                placeholder="-- Pilih Jabatan --"
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "jabatan_id",
                                                        e.target.value,
                                                    )
                                                }
                                            />

                                            <InputError
                                                message={errors.jabatan_id}
                                                className="mt-1"
                                            />
                                        </td>
                                    </tr>
                                    {/* DIVISI */}
                                    <tr className="border">
                                        <td className="font-medium bg-gray-50">
                                            Divisi
                                            {/* UI: Tampilkan bintang merah jika wajib */}
                                            {isDivisiRequired() && (
                                                <span className="block ml-1 text-warning">
                                                    *
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <SelectInput
                                                value={data.divisi_id}
                                                options={optionList.divisi}
                                                placeholder="-- Pilih Divisi (Opsional) --"
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData(
                                                        "divisi_id",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {/* Helper text visual */}
                                            {isDivisiRequired() && (
                                                <span className="text-xs italic text-warning">
                                                    *Wajib dipilih karena
                                                    jabatan adalah
                                                    Pegawai/Supervisor
                                                </span>
                                            )}
                                            <InputError
                                                message={errors.divisi_id}
                                                className="mt-1"
                                            />
                                        </td>
                                    </tr>

                                    {}
                                    <tr className="border">
                                        <td className="font-medium bg-gray-50">
                                            Alamat Email
                                        </td>
                                        <td>
                                            <TextInput
                                                type="email"
                                                value={data.email}
                                                placeholder="Email User"
                                                className="w-full px-3 py-2 border-gray-300"
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.email}
                                                className="mt-1"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="border">
                                        <td className="font-medium bg-gray-50">
                                            Status Aktif
                                        </td>
                                        <td>
                                            <select
                                                value={data.status_aktif}
                                                onChange={(e) =>
                                                    setData(
                                                        "status_aktif",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            >
                                                <option value="aktif">
                                                    Aktif
                                                </option>
                                                <option value="nonaktif">
                                                    Non-Aktif
                                                </option>
                                            </select>
                                            <InputError
                                                message={errors.status_aktif}
                                                className="mt-1"
                                            />
                                        </td>
                                    </tr>

                                    {}
                                    <tr className="border bg-yellow-50/30">
                                        <td className="font-medium align-top bg-gray-50">
                                            Password
                                            {isEdit && (
                                                <span className="block mt-1 text-xs font-normal text-gray-500">
                                                    *Kosongkan jika tidak ingin
                                                    mengganti password
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <TextInput
                                                type="password"
                                                value={data.password}
                                                placeholder={
                                                    isEdit
                                                        ? "Isi hanya jika ingin ubah password"
                                                        : "Password Baru"
                                                }
                                                className="w-full px-3 py-2 border-gray-300"
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.password}
                                                className="mt-1"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-center w-full my-6">
                            <SuccessButton
                                type="submit"
                                disabled={processing}
                                className={`gap-2 px-8 py-3 text-base border text-white shadow-lg ${isEdit ? "bg-secondary/90 hover:bg-secondary border-secondary/80" : ""}`}
                            >
                                {isEdit ? (
                                    <FaSave className="w-4 h-4" />
                                ) : (
                                    <FaUserPlus className="w-4 h-4" />
                                )}
                                <span>
                                    {isEdit
                                        ? "Simpan Perubahan Data"
                                        : "Tambah Pegawai Baru"}
                                </span>
                            </SuccessButton>
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
