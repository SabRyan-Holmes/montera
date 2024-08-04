import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { Link, Head, useForm } from "@inertiajs/react";
import { InputError, PrimaryButton } from "@/Components";
import {
    InputDataTable,
    KonversiTable,
    AkumulasiTable,
    PAKTable,
} from "./Partials";

export default function Index({ auth, pegawai, title }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        // Input Data
        periode_mulai: "",
        periode_berakhir: "",
        tanggal_ditetapkan: "",
        penanda_tangan: "",

        // Konversi Predikat
        no_surat1: "",
        presentase: "",
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
        angka_kredit: "",
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
        ak_dasar: { lama: 0, baru: 0, jumlah: 0, keterangan: "" },
        ak_jf: { lama: 0, baru: 0, jumlah: 0, keterangan: "" },
        ak_penyesuaian: { lama: 0, baru: 0, jumlah: 0, keterangan: "" },
        ak_konversi: { lama: 0, baru: 0, jumlah: 0, keterangan: "" },
        ak_peningkatan: { lama: 0, baru: 0, jumlah: 0, keterangan: "" },

        // tambahan
        //

        // Jumlah Angka Kredit Kumulatif
        jakk: { lama: "", baru: "", jumlah: "", keterangan: "" },
        //
        tebusan3: {
            kepala_reg: false,
            sekretaris: false,
            kepala_bps: false,
            pns: false,
            kepala_biro: false,
            arsip: false,
        },
    });

    const [alert, setAlert] = useState(false);

    useEffect(() => {
        setAlert(true);
    }, []);

    const submit = (e) => {
        e.preventDefault();

        get(route("cetak_dokumen.cetak"), data);
    };

    // Jabatan untuk sesuai Koefisien Pertahun

    const akNormatif = {
        "Statistisi Ahli Terampil": 5,
        "Statistisi Ahli Mahir": 12.5,
        "Statistisi Ahli Penyelia": 25,
        "Statistisi Ahli Pertama": 12.5,
        "Statistisi Ahli Muda": 25,
        "Statistisi Ahli Madya": 37.5,
    };

    // TODO Logika Penilaian Periode(Menyusul)

    // CONSOLE
    //console.log ('isi current', current)
    // console.log("isi tebusan 1", data.tebusan1);
    // console.log("isi tebusan 2", data.tebusan2);
    // console.log("isi tebusan 3", data.tebusan3);

    console.log(data);
    return (
        <Authenticated
            user={auth.user}
            title={title}
            current={route().current("cetak_dokumen.index")}
        >
            <Head title="Pembuatan Dokumen PAK" />
            <section className="m-10 h-screen">
                <h1 className="my-10 text-3xl capitalize">
                    Data untuk pencetakan dokumen pak
                </h1>

                <div className="overflow-x-auto">
                    <table className="table text-base">
                        {/* head */}
                        <thead>
                            <tr className="text-lg bg-primary/70">
                                <th colSpan={2}>Detail Pegawai</th>
                                {/* <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr className="border">
                                <td>Nama</td>
                                <td>{pegawai.Nama}</td>
                            </tr>
                            {/* row 2 */}
                            <tr className="border">
                                <td>NIP/NRP</td>
                                <td>{pegawai["NIP/NRP"]}</td>
                            </tr>
                            {/* row 3 */}
                            <tr className="border">
                                <td>NOMOR SERI KARPEG</td>
                                <td>{pegawai["NOMOR SERI KARPEG"]}</td>
                            </tr>
                            <tr className="border">
                                <td>PANGKAT/GOLONGAN/TMT</td>
                                <td>
                                    {pegawai["Pangkat/Golongan Ruangan/TMT"]}
                                </td>
                            </tr>
                            <tr className="border">
                                <td>TEMPAT/TANGGAL LAHIR</td>
                                <td>{pegawai["Tempat/Tanggal Lahir"]}</td>
                            </tr>
                            <tr className="border">
                                <td>JENIS KELAMIN</td>
                                <td>{pegawai["Jenis Kelamin"]}</td>
                            </tr>
                            <tr className="border">
                                <td>PENDIDIKAN</td>
                                <td>{pegawai["Pendidikan"]}</td>
                            </tr>
                            <tr className="border">
                                <td>JABATAN/TMT</td>
                                <td>{pegawai["Jabatan/TMT"]}</td>
                            </tr>
                            <tr className="border">
                                <td>MASA KERJA GOLONGAN</td>
                                <td>{pegawai["Masa Kerja Golongan"]}</td>
                            </tr>
                            <tr className="border">
                                <td>UNIT KERJA</td>
                                <td>{pegawai["Unit Kerja"]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="m-12 h-full">
                <form onSubmit={submit}>
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
                        />
                        {/* KONVERSI PREDIKAT KINERJA ANGKA KREDIT | END*/}

                        {/* AKUMULASI ANGKA KREDIT | START */}
                        <AkumulasiTable
                            pegawai={pegawai}
                            data={data}
                            setData={setData}
                            akNormatif={akNormatif}
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

                    <div className="w-full flex justify-center mt-10 ">
                        <PrimaryButton
                            type="submit"
                            className="scale-125 bg-hijau text-white"
                        >
                            {/* <a href="/cetak_dokumen/cetak">Cetak Dokumen PAK</a> */}
                            Cetak Dokumen PAK
                        </PrimaryButton>
                    </div>
                </form>
            </section>
        </Authenticated>
    );
}
