import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
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
import UseAturanPenetapan from "./Partials/UseAturanPenetapan";

export default function Index({
    auth,
    koefisien,
    title,
    flash,
    pegawai,
    pegawaiList,
}) {
    // =============================================================Aturan Penetapan==============================================
    // IF EDIT
    useEffect(() => {
        data.id = riwayat.id;
        data.pegawai = riwayat.pegawai;
        setPegawai(riwayat.pegawai);
    }, []);


    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        predikat,
        akNormatif,
    } = UseAturanPenetapan(koefisien);

    // =============================================================Pop Up, Dialog SWAL==============================================
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

    // =============================================================Logic Lainny==============================================
    const [showIframe, setShowIframe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { props } = usePage();

    const submit = (e) => {
        e.preventDefault();

        const action = e.nativeEvent.submitter.value;

        let endpoint = "";

        if (action === "preview") {
            endpoint = "/pak/process";
        } else if (action === "save") {
            endpoint = "/divisi-sdm/pak/save";
        } else if (action === "save_submit") {
            endpoint = "/divisi-sdm/pak/save-and-submit";
        }

        router.post(endpoint, data, {
            preserveScroll: true,
            preserveState: true,
            onStart: () => setIsLoading(true),
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

    const [search, setSearch] = useState("");
    const filtered = pegawaiList.filter((p) =>
        `${p["Nama"]} ${p.NIP}`.toLowerCase().includes(search.toLowerCase())
    );

    const onSelect = (p) => {
        // Set input search agar berubah
        setSearch(`${p.Nama} (${p.NIP})`);
        // Lanjut redirect ke route dengan query string
        router.get(
            route("divisi-sdm.pak.create"),
            { NIP: p.NIP },
            {
                preserveState: true,
                replace: true,
                onSuccess: () => {
                    setData("pegawai", pegawai);
                },
            }
        );
    };

    // CONSOLE
    console.log("Isi data");
    console.log(data);
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
                            {/* Tombol Close */}
                            <button
                                className="absolute z-10 p-2 transition bg-white rounded-full shadow group top-2 right-2 hover:bg-red-500 hover:text-white"
                                onClick={() => setShowIframe(false)}
                            >
                                <IoCloseOutline className="w-6 h-6 stroke-red-500 group-hover:stroke-white" />
                            </button>

                            {/* Loading Spinner (DaisyUI) */}
                            {isLoading && (
                                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70">
                                    <span className="loading loading-spinner loading-lg text-primary"></span>
                                </div>
                            )}

                            {/* Iframe */}
                            <iframe
                                src={route("pak.preview")}
                                width="100%"
                                height="100%"
                                className="border-0"
                                onLoad={() => setIsLoading(false)} // stop loading setelah iframe ready
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
                                    <span>Penetapan Angka Kredit</span>
                                </a>
                            </li>
                            {pegawai && (
                                <li>
                                    <span className="inline-flex items-center gap-2">
                                        {pegawai.Nama}
                                    </span>
                                </li>
                            )}
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
                    <h1 className="text-2xl font-medium my-7">Pilih Pegawai</h1>
                    {/* Konten untuk memilih Pegawai Start */}
                    <div className="mb-6">
                        <label className="block mb-2 font-medium">
                            Cari Pegawai (Nama / NIP)
                        </label>
                        <input
                            type="text"
                            placeholder="Ketik nama atau NIP"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            value={search}
                            defaultValue={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <ul className="mt-2 overflow-y-auto border rounded-md max-h-48">
                                {filtered.length > 0 || pegawai ? (
                                    filtered.map((p, i) => (
                                        <li
                                            key={i}
                                            className="p-2 cursor-pointer hover:bg-blue-100"
                                            onClick={() => onSelect(p)}
                                        >
                                            <a>
                                                {p.Nama} (NIP : {p.NIP})
                                            </a>
                                            {/* <Link
                                                as="a"
                                                href={route(
                                                    "divisi-sdm.pak.create",
                                                    { NIP: p.NIP }
                                                )}
                                                onSuccess={()=> { setSearch(`${pegawai.Nama} (${pegawai.NIP})`);}}
                                                // preserveState
                                            >
                                                {p.Nama} (NIP : {p.NIP})
                                            </Link> */}
                                        </li>
                                    ))
                                ) : (
                                    <li className="p-2 italic text-gray-500">
                                        Tidak ditemukan
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                    {/* Konten untuk memilih Pegawai End */}

                    <DetailPegawai pegawai={pegawai} />
                </div>
            </section>

            <section className="h-full m-12 mt-4">
                <form onSubmit={submit} method="post">
                    <div className="overflow-x-auto">
                        {/* TODO : Benerin bug dimana setelah pilih pegawai, belum terdeteksi penghitungan otomatisny */}
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
