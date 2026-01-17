import {
    InputError,
    SecondaryButton,
    SelectInput,
    SuccessButton,
} from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { FaPlus, FaPencil } from "react-icons/fa6"; // Tambah icon edit
import { RiArrowGoBackFill } from "react-icons/ri";
import { HiDocumentPlus } from "react-icons/hi2";
import TextInput from "@/Components/TextInput";
import { IoMdAdd, IoMdSave } from "react-icons/io";

// Props 'target' akan dikirim dari Controller Edit method (kosong saat create)
export default function CreateEdit({ auth, optionList, title, defaultValues, target = null }) {

    // Tentukan Mode: Edit jika 'target' ada, Create jika null
    const isEdit = !!target;

    // Inisialisasi form
    const { data, setData, post, patch, processing, errors } = useForm({
        user_id: target?.user_id || defaultValues?.user_id || "",
        supervisor_id: defaultValues?.supervisor_id ,
        produk_id: target?.produk_id || defaultValues?.produk_id || "",
        nilai_target: target?.nilai_target || "",
        tipe_target: target?.tipe_target || defaultValues?.tipe_target || "nominal",
        periode: target?.periode || defaultValues?.periode || "bulanan",
        tahun: target?.tahun || defaultValues?.tahun || new Date().getFullYear(),
        tanggal_mulai: target?.tanggal_mulai || "",
        tanggal_selesai: target?.tanggal_selesai || "",
        deadline_pencapaian: target?.deadline_pencapaian || "",
    keterangan_tambahan: target?.keterangan_tambahan || "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            // Mode Edit: Method PUT ke route update
            patch(route("spv.target-tim.update", target.id));
        } else {
            // Mode Create: Method POST ke route store
            post(route("spv.target-tim.store"));
        }
    };

    return (
        <Authenticated
            user={auth.user}
            title={title} // Title dikirim dinamis dari controller
            current={route().current()}
        >
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                {/* Header Breadcrumb & Back Button */}
                <section className="flex justify-between">
                    <div className="mt-2 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a
                                    href={route("spv.target-tim.index")}
                                    className="inline-flex items-center gap-2 "
                                >
                                    <HiDocumentPlus className="w-4 h-4 stroke-current" />
                                    <span>Target Tim</span>
                                </a>
                            </li>
                            <li>
                                <span className="inline-flex items-center gap-2">
                                    {isEdit ? <FaPencil className="w-3 h-3" /> : <FaPlus className="w-3 h-3" />}
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
                    <form onSubmit={submit}>
                        <div className="overflow-hidden border border-gray-200 shadow-sm rounded-xl">
                            <table className="table text-base table-bordered ">
                                <thead>
                                    <tr className={`text-lg text-white bg-primary`}>
                                        <th colSpan={2}>
                                            {isEdit ? "Form Edit Target" : "Form Input Target Baru"}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                     <InputError message={errors.supervisor_id} className="mt-1" />

                                    {/* --- 1. PEGAWAI --- */}
                                    <tr className="border">
                                        <td className="w-1/4 font-medium bg-gray-50">Pegawai Target</td>
                                        <td className="p-2">
                                            <SelectInput
                                                id="user_id"
                                                value={data.user_id}
                                                className="w-full"
                                                placeholder="-- Pilih Pegawai --"
                                                options={optionList.pegawai}
                                                onChange={(e) => setData("user_id", e.target.value)}
                                            />
                                            <InputError message={errors.user_id} className="mt-1" />
                                        </td>
                                    </tr>

                                    {/* --- 2. PRODUK --- */}
                                    <tr className="border">
                                        <td className="font-medium bg-gray-50">Produk</td>
                                        <td className="p-2">
                                            <SelectInput
                                                id="produk_id"
                                                value={data.produk_id}
                                                className="w-full"
                                                placeholder="-- Pilih Produk Perbankan --"
                                                options={optionList.produk}
                                                onChange={(e) => setData("produk_id", e.target.value)}
                                            />
                                            <InputError message={errors.produk_id} className="mt-1" />
                                        </td>
                                    </tr>

                                    {/* --- 3. NILAI TARGET & TIPE --- */}
                                    <tr className="border">
                                        <td className="font-medium bg-gray-50">Nilai Target</td>
                                        <td className="p-2">
                                            <div className="flex gap-4">
                                                <div className="flex-1">
                                                    <TextInput
                                                        type="number"
                                                        value={data.nilai_target}
                                                        placeholder="Contoh: 50000000"
                                                        className="w-full h-10 px-3"
                                                        onChange={(e) => setData("nilai_target", e.target.value)}
                                                    />
                                                </div>
                                                <div className="w-1/3">
                                                    <SelectInput
                                                        value={data.tipe_target}
                                                        className="w-full h-10"
                                                        options={optionList.tipe_target}
                                                        onChange={(e) => setData("tipe_target", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <InputError message={errors.nilai_target} className="mt-1" />
                                            <p className="mt-1 text-xs text-gray-400">*Masukkan angka tanpa titik/koma</p>
                                        </td>
                                    </tr>

                                    {/* --- 4. TAHUN & PERIODE --- */}
                                    <tr className="border">
                                        <td className="font-medium bg-gray-50">Tahun & Periode</td>
                                        <td className="p-2">
                                            <div className="flex gap-4">
                                                <TextInput
                                                    type="number"
                                                    value={data.tahun}
                                                    className="w-24 h-10 px-3 text-center"
                                                    onChange={(e) => setData("tahun", e.target.value)}
                                                />
                                                <SelectInput
                                                    value={data.periode}
                                                    className="flex-1 h-10"
                                                    options={optionList.periode}
                                                    onChange={(e) => setData("periode", e.target.value)}
                                                />
                                            </div>
                                            <InputError message={errors.tahun} className="mt-1" />
                                        </td>
                                    </tr>

                                    {/* --- 5. RENTANG WAKTU --- */}
                                    <tr className="border">
                                        <td className="font-medium bg-gray-50">Rentang Waktu</td>
                                        <td className="p-2">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1">
                                                    <span className="block mb-1 text-xs text-gray-500">Tanggal Mulai</span>
                                                    <TextInput
                                                        type="date"
                                                        value={data.tanggal_mulai}
                                                        className="w-full h-10 px-2"
                                                        onChange={(e) => setData("tanggal_mulai", e.target.value)}
                                                    />
                                                </div>
                                                <span className="pt-5 text-gray-400">s/d</span>
                                                <div className="flex-1">
                                                    <span className="block mb-1 text-xs text-gray-500">Tanggal Selesai</span>
                                                    <TextInput
                                                        type="date"
                                                        value={data.tanggal_selesai}
                                                        className="w-full h-10 px-2"
                                                        onChange={(e) => setData("tanggal_selesai", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-4 mt-1">
                                                <InputError message={errors.tanggal_mulai} className="flex-1" />
                                                <InputError message={errors.tanggal_selesai} className="flex-1" />
                                            </div>
                                        </td>
                                    </tr>

                                    {/* --- 6. DEADLINE --- */}
                                    <tr className="border">
                                        <td className="font-medium bg-gray-50">Deadline Pencapaian</td>
                                        <td className="p-2">
                                            <TextInput
                                                type="date"
                                                value={data.deadline_pencapaian}
                                                className="w-full h-10 px-2"
                                                onChange={(e) => setData("deadline_pencapaian", e.target.value)}
                                            />
                                            <InputError message={errors.deadline_pencapaian} className="mt-1" />
                                            <p className="mt-1 text-xs text-red-400">*Batas akhir perhitungan poin insentif</p>
                                        </td>
                                    </tr>

                                    {/* --- 7. KETERANGAN --- */}
                                    <tr className="border">
                                        <td className="pt-3 font-medium align-top bg-gray-50">Keterangan Tambahan</td>
                                        <td className="p-2">
                                            <textarea
                                                className="w-full h-24 p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="Catatan khusus untuk target ini (Opsional)"
                                                value={data.keterangan_tambahan}
                                                onChange={(e) => setData("keterangan_tambahan", e.target.value)}
                                            ></textarea>
                                            <InputError message={errors.keterangan_tambahan} className="mt-1" />
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-center w-full my-6">
                            <SuccessButton
                                type="submit"
                                disabled={processing}
                                className={`px-8 py-3 text-base`}
                            >
                                <IoMdSave className="w-5 h-5 fill-white" />
                                <span>{isEdit ? "Update Target" : "Simpan Target"}</span>
                            </SuccessButton>
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
