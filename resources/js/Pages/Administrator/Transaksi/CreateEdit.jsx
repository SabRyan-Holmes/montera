import {
    InputError,
    SecondaryButton,
    SuccessButton,
    SelectInput,
} from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { FaPlus, FaSave } from "react-icons/fa";
import { FaMoneyBillTransfer, FaPenToSquare } from "react-icons/fa6"; // Ganti icon sesuai kebutuhan
import { RiArrowGoBackFill } from "react-icons/ri";
import TextInput from "@/Components/TextInput";

export default function CreateEdit({
    auth,
    filtersList,
    title,
    transaksi = null,
    isEdit = false,
}) {
    // 1. Setup Form
    const { data, setData, post, put, processing, errors } = useForm({
        user_id: transaksi?.user_id || "",
        produk_id: transaksi?.produk_id || "",
        akuisisi_id: transaksi?.akuisisi_id || "",
        tanggal_realisasi:
            transaksi?.tanggal_realisasi ||
            new Date().toISOString().split("T")[0],
        nilai_realisasi: transaksi?.nilai_realisasi || "",
        poin_didapat: transaksi?.poin_didapat || 0,
    });

    // 2. Logic Auto-Fill dari Akuisisi
    // Ketika Admin memilih ID Akuisisi, otomatis isi field lain
    // LOGIC AUTO-FILL (Updated)
    const handleAkuisisiChange = (e) => {
        const selectedId = e.target.value;
        setData("akuisisi_id", selectedId);

        if (selectedId) {
            // Cari data akuisisi yang dipilih dari list
            const selectedAkuisisi = filtersList.akuisisis.find(
                (a) => a.value == selectedId,
            );

            if (selectedAkuisisi) {
                // Auto-fill logic
                setData((prevData) => ({
                    ...prevData,
                    akuisisi_id: selectedId,
                    user_id: selectedAkuisisi.user_id,
                    produk_id: selectedAkuisisi.produk_id,
                    nilai_realisasi: selectedAkuisisi.nominal,
                    tanggal_realisasi: selectedAkuisisi.tanggal,

                    // AMBIL POIN DARI HASIL HITUNGAN CONTROLLER TADI
                    poin_didapat: selectedAkuisisi.poin_otomatis,
                }));
            }
        }
    };

    // 3. Submit Logic
    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("admin.transaksi.update", transaksi.id));
        } else {
            post(route("admin.transaksi.store"));
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
                                <a
                                    href={route("admin.transaksi.index")}
                                    className="inline-flex items-center gap-2"
                                >
                                    <FaMoneyBillTransfer className="w-4 h-4 stroke-current" />
                                    <span>Data Transaksi</span>
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

                {/* --- FORM --- */}
                <section className="m-12 mx-auto overflow-x-auto laptop:w-4/5 max-w-screen-laptop">
                    <form onSubmit={submit}>
                        <table className="table text-base table-bordered">
                            <thead>
                                <tr
                                    className={`text-lg text-white ${isEdit ? "bg-secondary/80" : "bg-primary/90"}`}
                                >
                                    <th colSpan={2}>
                                        {isEdit
                                            ? "Edit Data Transaksi"
                                            : "Form Input Transaksi"}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Referensi Akuisisi (Paling Atas karena Auto-fill) */}
                                <tr className="border">
                                    <td width="30%">
                                        Referensi Laporan Akuisisi
                                    </td>
                                    <td className="border-x" width="70%">
                                        <SelectInput
                                            id="akuisisi_id"
                                            value={data.akuisisi_id}
                                            options={filtersList.akuisisis}
                                            placeholder="-- Pilih Laporan Verified Akuisisi -- (Produk - Pegawai - No Transaksi - Nama Nasabah)  "
                                            className="w-full"
                                            onChange={handleAkuisisiChange}
                                        />
                                        <InputError
                                            message={errors.akuisisi_id}
                                            className="mt-2"
                                        />
                                        <p className="mt-1 text-xs text-gray-400">
                                            *Memilih akuisisi akan otomatis
                                            mengisi data Pegawai, Produk, dan
                                            Nominal.
                                        </p>
                                    </td>
                                </tr>

                                {/* Produk */}
                                <tr className="border">
                                    <td>Produk</td>
                                    <td className="border-x">
                                        <SelectInput
                                            id="produk_id"
                                            disabled
                                            value={data.produk_id}
                                            options={filtersList.produks}
                                            placeholder="-- Pilih Produk --"
                                            className="w-full bg-gray-100"
                                            onChange={(e) =>
                                                setData(
                                                    "produk_id",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.produk_id}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* Pegawai (Readonly/Disabled biar konsisten sama akuisisi) */}
                                <tr className="border">
                                    <td>Pegawai</td>
                                    <td className="border-x">
                                        <SelectInput
                                            id="user_id"
                                            value={data.user_id}
                                            options={filtersList.pegawais}
                                            placeholder="-- Pilih Pegawai --"
                                            className="w-full bg-gray-100"
                                            onChange={(e) =>
                                                setData(
                                                    "user_id",
                                                    e.target.value,
                                                )
                                            }
                                            disabled
                                        />
                                        <InputError
                                            message={errors.user_id}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* Tanggal Realisasi */}
                                <tr className="border">
                                    <td>Tanggal Realisasi</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="date"
                                            value={data.tanggal_realisasi}
                                            className="w-full px-2 h-9"
                                            onChange={(e) =>
                                                setData(
                                                    "tanggal_realisasi",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.tanggal_realisasi}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* Nominal Realisasi */}
                                <tr className="border">
                                    <td>Nilai Realisasi (Rp)</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="number"
                                            value={data.nilai_realisasi}
                                            className="w-full px-2 h-9"
                                            placeholder="0"
                                            onChange={(e) =>
                                                setData(
                                                    "nilai_realisasi",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.nilai_realisasi}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                {/* Poin Didapat */}
                                <tr className="border">
                                    <td>Poin Didapat</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="number"
                                            value={data.poin_didapat}
                                            className="w-full px-2 font-bold text-blue-600 h-9"
                                            placeholder="0"
                                            onChange={(e) =>
                                                setData(
                                                    "poin_didapat",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.poin_didapat}
                                            className="mt-2"
                                        />
                                        <p className="mt-1 text-xs text-gray-400">
                                            *Hitung berdasarkan bobot produk &
                                            indikator kinerja.
                                        </p>
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
                                        : "Simpan Transaksi"}
                                </span>
                            </SuccessButton>
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
