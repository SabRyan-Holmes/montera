import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import {
    DetailPegawai,
    PrimaryButton,
    SecondaryButton,
    SuccessButton,
} from "@/Components";
import {
    InputDataTable,
    KonversiTable,
    AkumulasiTable,
    PAKTable,
} from "./Partials";
import { FaFilePdf, FaPrint } from "react-icons/fa6";
import { RiArrowGoBackFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { BsFillSendFill } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";

export default function Index({ auth, pegawai, koefisien, title, flash }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        pegawai: pegawai,
        // Input Data
        nama: "Agus Sudibyo, M.Stat",
        nip: "197412311996121001",
        periode_mulai: 0, //Default: Januari
        periode_berakhir: 0, //Default Februari

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
        kesimpulan: "Belum Dapat untuk Kenaikan Pangkat Setingkat Lebih Tinggi",
    });

    //NOTE YG ini mungkin bagsu dimasukin ke database juga?
    const predikat = {
        25: "Sangat Kurang",
        50: "Kurang",
        75: "Butuh Perbaikan",
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
            // console.log("firstErrorMessage :");
            // console.log(firstErrorMessage);
            Toast.fire({
                icon: "warning",
                iconColor: "#fb7185",
                title: firstErrorMessage,
                color: "#fb7185",
            });
        }
    }, [errors]);
    useEffect(() => {
        if (flash.message) {
            Swal.fire({
                title: "Berhasil!",
                text: `${flash.message}`,
                icon: "success",
                iconColor: "#50C878",
                confirmButtonText: "Oke",
                confirmButtonColor: "#2D95C9",
            });
            setTimeout(() => {
                flash.message = null;
            }, 3000);
        }
    }, [flash.message]);

    const [isLoading, setIsLoading] = useState(false);
    const { props } = usePage();

    const submit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const action = e.nativeEvent.submitter.value;

        let endpoint = "";

        if (action === "preview") {
            endpoint = "/pak/process";
        } else if (action === "save") {
            endpoint = "/divisi-sdm/pak/save";
        } else if (action === "save_submit") {
            endpoint = "/divisi-sdm/pak/save-and-submit"; // misalnya kamu punya endpoint ini
        }

        router.post(endpoint, data, {
            preserveScroll: true,
            preserveState: true,

            onFinish: () => setIsLoading(false),
            onError: (errors) => {
                console.error("Error:", errors);
            },
            onSuccess: (page) => {
                if (action === "preview") setShowIframe(true);
                // Tambah logic lain sesuai tombolnya
            },
        });
    };

    // const submit = (e) => {
    //     e.preventDefault();
    //     setIsLoading(true);

    //     router.post("/divisi-sdm/riwayat-pak/process", data, {
    //         preserveScroll: true,
    //         preserveState: true,

    //         onFinish: () => setIsLoading(false),
    //         onError: (errors) => {
    //             console.error("Error:", errors);
    //         },
    //         onSuccess: (page) => {
    //             setShowIframe(true); // Munculkan iframe setelah data dikirim
    //             // Misalnya, URL PDF dikirim di props dari server

    //         },
    //     });
    // };

    const akNormatif = {};
    // Ak normatif berdasarkan data dari tabel Koefisien
    koefisien.forEach((item) => {
        akNormatif[item.jabatan] = item.nilai;
    });

    const [showIframe, setShowIframe] = useState(false);

    // CONSOLE
    // console.log("Isi data");
    // console.log(akNormatif);
    // console.log("Isi Error");
    // console.log(errors);
    return (
        <Authenticated
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <section className="m-10 ">
                {/* Preview PDF di iframe */}
                {showIframe && (
                    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">
                        <div className="relative w-full max-w-7xl h-[80vh] bg-white rounded shadow-lg overflow-hidden">
                            <button
                                className="absolute z-10 p-2 transition bg-white rounded-full shadow group top-2 right-2 hover:bg-red-500 hover:text-white"
                                onClick={() => setShowIframe(false)}
                            >
                                <IoCloseOutline className="w-6 h-6 stroke-red-500 group-hover:stroke-white" />
                            </button>
                            <iframe
                                src={route("pak.preview")}
                                width="100%"
                                height="100%"
                                className="border-0"
                            ></iframe>
                        </div>
                    </div>
                )}
                {/* Preview PDF di iframe */}

                <div className="flex justify-between">
                    <div className="mt-2 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a
                                    href={route("divisi-sdm.pegawai.index")}
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

                <div className="px-2 mx-auto overflow-x-auto">
                    <h1 className="text-2xl font-medium my-7">
                        Data Pegawai Untuk PAK
                    </h1>
                    {/* <DetailPegawai pegawai={pegawai} /> */}
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

                    <div className="flex justify-center w-full pb-12 mt-10 gap-7 ">
                        <SecondaryButton
                            type="submit"
                            name="action"
                            value="preview"
                            className="scale-110 hover:scale-[1.15] hover:bg-secondary/80 group hover:text-white "
                        >
                            Preview Dokumen
                            <FaFilePdf className="mx-1" />
                        </SecondaryButton>

                        <SuccessButton
                            type="submit"
                            name="action"
                            value="save"
                            className="scale-110 hover:scale-[1.15] hover:bg-hijau/80 "
                        >
                            Simpan
                            <FaSave className="mx-1" />
                        </SuccessButton>

                        <PrimaryButton
                            type="submit"
                            name="action"
                            value="save_submit"
                            className="scale-110 hover:scale-[1.15] hover:bg-primary/80 "
                        >
                            Simpan dan Ajukan
                            <BsFillSendFill className="mx-1" />
                        </PrimaryButton>
                    </div>
                </form>
            </section>
        </Authenticated>
    );
}
