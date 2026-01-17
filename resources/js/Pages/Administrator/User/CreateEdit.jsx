import { InputError, SecondaryButton, SuccessButton } from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { FaPlus, FaUserTie, FaUserEdit, FaSave } from "react-icons/fa"; // Icon disesuaikan
import { FaUserPlus } from "react-icons/fa6";
import { RiArrowGoBackFill } from "react-icons/ri";
import TextInput from "@/Components/TextInput";

export default function CreateEdit({
    auth,
    filtersList,
    title,
    user = null,
    isEdit = false,
}) {
    // 1. STATE DINAMIS (Isi default value jika mode Edit)
    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || "",
        nip: user?.nip || "",
        email: user?.email || "",
        password: "", // Password selalu kosong di awal (baik create/edit)
        jabatan_id: user?.jabatan_id || "",
        divisi_id: user?.divisi_id || "",
        status_aktif: user?.status_aktif || "aktif",
    });

    // 2. LOGIC SUBMIT (Pilih antara POST atau PUT)
    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            // Mode Edit: Arahkan ke update
            put(route("admin.user.update", user.id));
        } else {
            // Mode Create: Arahkan ke store
            post(route("admin.user.store"));
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
                                    href={route("admin.user.index")}
                                    className="inline-flex items-center gap-2 "
                                >
                                    <FaUserTie className="w-4 h-4 stroke-current" />
                                    <span>Kelola Data User</span>
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
                                            ? "Edit Informasi User"
                                            : "Detail User Baru"}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bo">
                                {/* NAMA */}
                                <tr className="border">
                                    <td width="40%">Nama Lengkap</td>
                                    <td className="border-x" width="60%">
                                        <TextInput
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            placeholder="Masukkan Nama Lengkap"
                                            className="w-full px-2 h-9 border-slate-100"
                                            isFocused={!isEdit} // Fokus otomatis hanya pas Create
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* NIP */}
                                <tr className="border">
                                    <td>NIP (Nomor Induk Pegawai)</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            value={data.nip}
                                            placeholder="Masukkan NIP (Unik)"
                                            className="w-full px-2 h-9 placeholder:text-accent"
                                            maxLength={20}
                                            onChange={(e) =>
                                                setData("nip", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.nip}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* EMAIL */}
                                <tr className="border">
                                    <td>Email</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="email"
                                            value={data.email}
                                            className="w-full px-2 h-9 placeholder:text-accent"
                                            placeholder="contoh@email.com"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* PASSWORD (DINAMIS) */}
                                <tr className="border">
                                    <td>
                                        Password <br />
                                        {isEdit && (
                                            <span className="text-xs font-normal text-gray-400">
                                                (Kosongkan jika tidak ingin
                                                mengubah)
                                            </span>
                                        )}
                                    </td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text" // Biar admin bisa liat pas ngetik (opsional, bisa 'password')
                                            value={data.password}
                                            className="w-full px-2 h-9 placeholder:text-accent"
                                            placeholder={
                                                isEdit
                                                    ? "Isi hanya jika ingin ganti password"
                                                    : "Set Password Awal"
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <div className="mt-1 text-xs text-gray-500">
                                            {isEdit
                                                ? "*Minimal 8 karakter jika diisi"
                                                : "*Wajib diisi, minimal 8 karakter"}
                                        </div>
                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* JABATAN */}
                                <tr className="border">
                                    <td>Jabatan</td>
                                    <td className="border-x">
                                        <select
                                            className="w-full h-10 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.jabatan_id}
                                            onChange={(e) =>
                                                setData(
                                                    "jabatan_id",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="">
                                                -- Pilih Jabatan --
                                            </option>
                                            {filtersList.jabatan.map((jab) => (
                                                <option
                                                    key={jab.id}
                                                    value={jab.id}
                                                >
                                                    {jab.nama_jabatan}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.jabatan_id}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* DIVISI */}
                                <tr className="border">
                                    <td>Divisi</td>
                                    <td className="border-x">
                                        <select
                                            className="w-full h-10 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.divisi_id}
                                            onChange={(e) =>
                                                setData(
                                                    "divisi_id",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="">
                                                -- Pilih Divisi (Opsional) --
                                            </option>
                                            {filtersList.divisi.map((div) => (
                                                <option
                                                    key={div.id}
                                                    value={div.id}
                                                >
                                                    {div.nama_divisi}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.divisi_id}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* STATUS AKTIF */}
                                <tr className="border">
                                    <td>Status Akun</td>
                                    <td className="border-x">
                                        <select
                                            className="w-full h-10 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.status_aktif}
                                            onChange={(e) =>
                                                setData(
                                                    "status_aktif",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            {filtersList.status.map((st) => (
                                                <option
                                                    key={st.id}
                                                    value={st.id}
                                                >
                                                    {st.label}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.status_aktif}
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
                                        : "Tambah User"}
                                </span>
                            </SuccessButton>
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
