import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { PrimaryButton, SecondaryButton, SuccessButton } from "@/Components";
import {
    InputDataTable,
    KonversiTable,
    AkumulasiTable,
    PAKTable,
} from "./Partials";
import { FaPrint } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from "axios";

export default function Index({ auth, pegawai, title }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        pegawai: pegawai,
        // Input Data
        nama: "Agus Sudibyo, M.Stat",
        nip: "197412311996121001",
        periode_mulai: 1, //Default: Januari
        periode_berakhir: 2, //Default Februari
        angka_periode: 0,
        tgl_ditetapkan: "",
        penanda_tangan: "",

        // Konversi Predikat
        no_surat1: "",
        predikat: "Baik",
        presentase: 100,
        ak_normatif: 0, //Koefisien pertahun || Dipakai juga untuk Akumalasi AK
        angka_kredit: 0, //Angka Kredit || Dipakai juga untuk Akumalasi AK
        ak_normatif_ops: 0, //AK Normatif opsional(jika tidak ada)

        tebusan1: {
            kepala_reg: false,
            sekretaris: false,
            kepala_bps: false,
            pns: false,
            kepala_biro: false,
            arsip: false,
        },

        // Akumulasi angka kredit
        no_surat2: "",
        // ak_normatif: 0,
        // angka_kredit: 0,
        ak_terakhir: 0,
        jumlah_ak_kredit: 0,
        tahun_terakhir: "",
        tahun_ini: "",

        tebusan2: {
            kepala_reg: false,
            sekretaris: false,
            kepala_bps: false,
            pns: false,
            kepala_biro: false,
            arsip: false,
        },

        // Penetapan Angka Kredit
        no_surat3: "",
        ak_dasar: {
            tipe_ak: "AK Dasar yang diberikan",
            lama: 0,
            baru: 0,
            jumlah: 0,
            keterangan: "",
        },
        ak_jf: {
            tipe_ak: "AK JF Lama",
            lama: 0,
            baru: 0,
            jumlah: 0,
            keterangan: "",
        },
        ak_penyesuaian: {
            tipe_ak: "AK Penyesuaian/ Penyetsaraan",
            lama: 0,
            baru: 0,
            jumlah: 0,
            keterangan: "",
        },
        ak_konversi: {
            tipe_ak: "AK Konversi",
            lama: 0,
            baru: 0,
            jumlah: 0,
            keterangan: "",
        },
        ak_peningkatan: {
            tipe_ak: "AK yang diperoleh dari Peningkatan yang diberikan",
            lama: 0,
            baru: 0,
            jumlah: 0,
            keterangan: "",
        },

        // Menampung Tambahan Kolom
        ak_tipe_tambahan: {},

        // Jumlah Angka Kredit Kumulatif
        jakk: { lama: "", baru: "", jumlah: "", keterangan: "" },

        // tambahan
        pangkat: 50,
        jabatan: 100,
        // Kelebihan/Kekurangan
        pangkat_keker: "",
        jabatan_keker: "",

        tebusan3: {
            kepala_reg: false,
            sekretaris: false,
            kepala_bps: false,
            pns: false,
            kepala_biro: false,
            arsip: false,
        },

        kesimpulan: "Belum Dapat untuk Kenaikan Pangkat Setingkat",
    });

    const predikat = {
        75: "Cukup",
        100: "Baik",
        150: "Sangat Baik",
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    useEffect(() => {
        if (errors && Object.values(errors).length > 0) {
            // Ambil nilai pertama dari object errors
            const firstErrorMessage = Object.values(errors)[0];
            console.log("firstErrorMessage :");
            console.log(firstErrorMessage);
            Toast.fire({
                icon: "warning",
                iconColor: "#fb7185",
                title: firstErrorMessage,
                color: "#fb7185",
            });
        }
    }, [errors]);

    const props = usePage().props;
    const [isLoading, setIsLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post("/cetak_dokumen/cetak", {
                _token: props.csrf_token,
                data: data,
            });

            // Buka PDF di tab baru dengan URL yang diberikan dalam respons
            window.open(response.data.url, "_blank");
        } catch (error) {
            console.error("Error:", error);
            // Tangani error, mungkin tampilkan pesan error ke pengguna
        } finally {
            setIsLoading(false); // Hentikan loading, baik saat sukses maupun error
        }
    };

    // Jabatan untuk sesuai Koefisien Pertahun
    const akNormatif = {
        Terampil: 5,
        Mahir: 12.5,
        Penyelia: 25,
        Pertama: 12.5,
        Muda: 25,
        Madya: 37.5,
    };

    // CONSOLE
    console.log("Isi data");
    console.log(data);
    console.log("Isi Error");
    console.log(errors);
    return (
        <Authenticated
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <section className="m-10 ">
                <div className="flex justify-between">
                    <div className="mt-2 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a
                                    href={route("pegawai.index")}
                                    className="gap-2"
                                >
                                    <FaPrint className="w-4 h-4 stroke-current" />
                                    <span>Cetak Dokumen</span>
                                </a>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    {pegawai.Nama}
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
                </div>
                {/* <h1 className="my-10 text-2xl font-[550] capitalize ">
                    Data Pegawai Untuk Pencetakan PAK
                </h1> */}

                <div className="overflow-x-auto px-7">
                    <h1 className="text-2xl font-medium my-7">
                        Data Pegawai Untuk Pencetakan PAK
                    </h1>
                    <table className="table text-base">
                        {/* head */}
                        <thead>
                            <tr className="text-lg bg-primary/70">
                                <th className="px-7" colSpan={2}>
                                    Detail Pegawai
                                </th>
                                {/* <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr className="border">
                                <td className="px-7">Nama</td>
                                <td className="px-7">{pegawai.Nama}</td>
                            </tr>
                            {/* row 2 */}
                            <tr className="border">
                                <td className="px-7">NIP/NRP</td>
                                <td className="px-7">{pegawai["NIP/NRP"]}</td>
                            </tr>
                            {/* row 3 */}
                            <tr className="border">
                                <td className="px-7">NOMOR SERI KARPEG</td>
                                <td className="px-7">
                                    {pegawai["NOMOR SERI KARPEG"]}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="px-7">PANGKAT/GOLONGAN/TMT</td>
                                <td className="px-7">
                                    {pegawai["Pangkat/Golongan Ruangan/TMT"]}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="px-7">TEMPAT/TANGGAL LAHIR</td>
                                <td className="px-7">
                                    {pegawai["Tempat/Tanggal Lahir"]}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="px-7">JENIS KELAMIN</td>
                                <td className="px-7">
                                    {pegawai["Jenis Kelamin"]}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="px-7">PENDIDIKAN</td>
                                <td className="px-7">
                                    {pegawai["Pendidikan"]}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="px-7">JABATAN/TMT</td>
                                <td className="px-7">
                                    {pegawai["Jabatan/TMT"]}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="px-7">MASA KERJA GOLONGAN</td>
                                <td className="px-7">
                                    {pegawai["Masa Kerja Golongan"]}
                                </td>
                            </tr>
                            <tr className="border">
                                <td className="px-7">UNIT KERJA</td>
                                <td className="px-7">
                                    {pegawai["Unit Kerja"]}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="h-full m-12 mt-4">
                <form onSubmit={submit} method="post">
                    <div className="overflow-x-auto">
                        {/* INPUT DATA | START*/}
                        <InputDataTable data={data} setData={setData} />
                        {/* INPUT DATA | END*/}

                        {/* KONVERSI PREDIKAT KINERJA ANGKA KREDIT | START*/}
                        <KonversiTable
                            pegawai={pegawai}
                            data={data}
                            setData={setData}
                            akNormatif={akNormatif}
                            predikat={predikat}
                        />
                        {/* KONVERSI PREDIKAT KINERJA ANGKA KREDIT | END*/}

                        {/* AKUMULASI ANGKA KREDIT | START */}
                        <AkumulasiTable
                            pegawai={pegawai}
                            data={data}
                            setData={setData}
                            akNormatif={akNormatif}
                            predikat={predikat}
                        />
                        {/* AKUMULASI ANGKA KREDIT | END */}

                        {/* PENETAPAN ANGKA KREDIT | START*/}
                        <PAKTable
                            pegawai={pegawai}
                            data={data}
                            setData={setData}
                            akNormatif={akNormatif}
                        />
                        {/* PENETAPAN ANGKA KREDIT | END*/}
                    </div>

                    <div className="flex justify-center w-full pb-12 mt-10 ">
                        <SuccessButton type="submit"
                        className="scale-125">
                            {/* <a href="/cetak_dokumen/cetak">Cetak Dokumen PAK</a> */}
                            Cetak Dokumen PAK
                        </SuccessButton>
                    </div>
                </form>
            </section>
        </Authenticated>
    );
}
