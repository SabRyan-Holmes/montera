import { InputError, SecondaryButton, SuccessButton, SelectInput } from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { FaPlus, FaSave } from "react-icons/fa";
import { FaFileContract, FaPenToSquare } from "react-icons/fa6";
import { RiArrowGoBackFill } from "react-icons/ri";
import TextInput from "@/Components/TextInput";
import { useState, useEffect } from "react";

export default function CreateEdit({
    auth,
    filtersList,
    title,
    akuisisi = null,
    isEdit = false,
}) {
    // 1. SETUP FORM
    const { data, setData, post, processing, errors } = useForm({
        produk_id: akuisisi?.produk_id || "",
        nama_nasabah: akuisisi?.nama_nasabah || "",
        no_identitas_nasabah: akuisisi?.no_identitas_nasabah || "",
        nominal_realisasi: akuisisi?.nominal_realisasi || "",
        tanggal_akuisisi: akuisisi?.tanggal_akuisisi || new Date().toISOString().split('T')[0],
        supervisor_id: akuisisi?.supervisor_id || "",
        lampiran_bukti: null, // File selalu null di awal
        _method: isEdit ? 'PUT' : 'POST', // Trick buat upload file di method PUT
    });

    // State untuk Label Nominal (Rupiah vs Unit)
    const [nominalLabel, setNominalLabel] = useState("Nominal / Jumlah");

    // Logic ganti label berdasarkan kategori produk yg dipilih
    useEffect(() => {
        if (data.produk_id) {
            const selectedProd = filtersList.produks.find(p => p.value == data.produk_id);
            if (selectedProd) {
                const k = selectedProd.kategori.toUpperCase();
                if (k.includes("FUNDING") || k.includes("KREDIT") || k.includes("ANAK")) {
                    setNominalLabel("Nominal (Rupiah)");
                } else {
                    setNominalLabel("Jumlah Unit / User");
                }
            }
        }
    }, [data.produk_id, filtersList.produks]);

    // 2. LOGIC SUBMIT
    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            // PENTING: Pake POST tapi method spoofing PUT biar file keupload
            post(route("admin.akuisisi.update", akuisisi.id));
        } else {
            post(route("admin.akuisisi.store"));
        }
    };

    return (
        <Authenticated
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                {/* --- HEADER --- */}
                <section className="flex justify-between">
                    <div className="mt-2 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a href={route("admin.akuisisi.index")} className="inline-flex items-center gap-2">
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
                    <SecondaryButton onClick={() => window.history.back()} className="bg-secondary/5">
                        <span>Kembali</span>
                        <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                    </SecondaryButton>
                </section>

                {/* --- FORM --- */}
                <section className="m-12 mx-auto overflow-x-auto laptop:w-4/5 max-w-screen-laptop">
                    <form onSubmit={submit} encType="multipart/form-data">
                        <table className="table text-base table-bordered">
                            <thead>
                                <tr className={`text-lg text-white ${isEdit ? "bg-secondary/80" : "bg-primary/90"}`}>
                                    <th colSpan={2}>
                                        {isEdit ? "Edit Laporan Akuisisi" : "Form Input Akuisisi"}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {/* PRODUK */}
                                <tr className="border">
                                    <td width="30%">Produk</td>
                                    <td className="border-x" width="70%">
                                        <SelectInput
                                            id="produk_id"
                                            value={data.produk_id}
                                            options={filtersList.produks}
                                            placeholder="-- Pilih Produk --"
                                            className="w-full"
                                            onChange={(e) => setData("produk_id", e.target.value)}
                                        />
                                        <InputError message={errors.produk_id} className="mt-2" />
                                    </td>
                                </tr>

                                {/* NAMA NASABAH */}
                                <tr className="border">
                                    <td>Nama Nasabah / Merchant</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            value={data.nama_nasabah}
                                            placeholder="Nama Lengkap Nasabah"
                                            className="w-full px-2 h-9"
                                            onChange={(e) => setData("nama_nasabah", e.target.value)}
                                        />
                                        <InputError message={errors.nama_nasabah} className="mt-2" />
                                    </td>
                                </tr>

                                {/* IDENTITAS */}
                                <tr className="border">
                                    <td>No. Identitas (Rekening/KTP/ID)</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            value={data.no_identitas_nasabah}
                                            placeholder="Contoh: 1234567890"
                                            className="w-full px-2 h-9"
                                            onChange={(e) => setData("no_identitas_nasabah", e.target.value)}
                                        />
                                        <InputError message={errors.no_identitas_nasabah} className="mt-2" />
                                    </td>
                                </tr>

                                {/* NOMINAL / JUMLAH */}
                                <tr className="border">
                                    <td>{nominalLabel}</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="number"
                                            value={data.nominal_realisasi}
                                            placeholder="0"
                                            className="w-full px-2 h-9"
                                            onChange={(e) => setData("nominal_realisasi", e.target.value)}
                                        />
                                        <p className="mt-1 text-xs text-gray-400">
                                            *Masukkan angka tanpa titik/koma (Contoh: 5000000)
                                        </p>
                                        <InputError message={errors.nominal_realisasi} className="mt-2" />
                                    </td>
                                </tr>

                                {/* TANGGAL AKUISISI */}
                                <tr className="border">
                                    <td>Tanggal Akuisisi</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="date"
                                            value={data.tanggal_akuisisi}
                                            className="w-full px-2 h-9"
                                            onChange={(e) => setData("tanggal_akuisisi", e.target.value)}
                                        />
                                        <InputError message={errors.tanggal_akuisisi} className="mt-2" />
                                    </td>
                                </tr>

                                {/* SUPERVISOR */}
                                <tr className="border">
                                    <td>Supervisor (Penyetuju)</td>
                                    <td className="border-x">
                                        <SelectInput
                                            id="supervisor_id"
                                            value={data.supervisor_id}
                                            options={filtersList.supervisors}
                                            placeholder="-- Pilih Supervisor --"
                                            className="w-full"
                                            onChange={(e) => setData("supervisor_id", e.target.value)}
                                        />
                                        <InputError message={errors.supervisor_id} className="mt-2" />
                                    </td>
                                </tr>

                                {/* LAMPIRAN BUKTI */}
                                <tr className="border">
                                    <td>
                                        Lampiran Bukti <br/>
                                        <span className="text-xs text-gray-400 font-normal">(Foto/PDF, Max 2MB)</span>
                                    </td>
                                    <td className="border-x">
                                        <input
                                            type="file"
                                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                            onChange={(e) => setData("lampiran_bukti", e.target.files[0])}
                                            accept=".jpg,.jpeg,.png,.pdf"
                                        />
                                        {isEdit && akuisisi?.lampiran_bukti && (
                                            <div className="mt-2 text-xs text-blue-500">
                                                *File sudah ada. Upload baru jika ingin mengganti.
                                            </div>
                                        )}
                                        <InputError message={errors.lampiran_bukti} className="mt-2" />
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
                                <span>{isEdit ? "Simpan Perubahan" : "Simpan Laporan"}</span>
                            </SuccessButton>
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
