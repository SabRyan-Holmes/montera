import React, { useEffect, useRef, useState } from "react";
import { GoQuestion } from "react-icons/go";
import { FaTrash } from "react-icons/fa6";
import {
    InputError,
    InputLabel,
    InputLabelCustom,
    SecondaryButton,
    RadioWithLabel,
    SuccessButton,
    TooltipHover,
    RadioWithEditableLabel,
} from "@/Components";
import { FaSave, FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import PopUpForm from "./PopUpForm";
import DynamicTableSection from "./DynamicTableSection";

export default function PegawaiContent({ aturanPAK }) {
    const {
        penandaTangan,
        koefisienPertahun,
        predikatPresentase,
        pangkat,
        jabatan,
        tebusanKonversi,
        tebusanAkumulasi,
        tebusanPenetapan,
        kesimpulan,
        rumus,
    } = aturanPAK;
    const shownMessages = useRef(new Set());

    function handleDelete(id, name) {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin menghapus data ini?",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#2D95C9",
            cancelButtonColor: "#9ca3af",
            customClass: {
                actions: "my-actions",
                cancelButton: "order-1 right-gap",
                confirmButton: "order-2",
                denyButton: "order-3",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("divisi-sdm.aturan-pak.destroy", id), {
                    data: {
                        id: id,
                        name: name,
                    },
                    preserveScroll: true,
                    onSuccess: () => {
                        console.log(
                            "Dihapus!",
                            "Data berhasil dihapus.",
                            "success"
                        );
                    },
                    onError: (err) => {
                        alert(
                            "Gagal!",
                            "Terjadi kesalahan saat menghapus data.",
                            err
                        );
                    },
                    onFinish: () => {
                        // Optional: Lakukan sesuatu setelah request selesai
                    },
                });
            }
        });
    }

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [popUpData, setPopUpData] = useState({
        title: "",
        fields: [],
        routeName: "",
    });
    const [isEdit, setIsEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);

    // ANCHOR : Logic & Function Here!

    // Handle Default Penanda Tangan(change config)
    const { data, setData, post, processing, errors, reset } = useForm({
        updateName: "", // Tambahkan field untuk selected ID
        selectedPTId: null, // Tambahkan field untuk selected ID
    });

    return (
        <main className="grid items-stretch w-full h-full grid-flow-row grid-cols-2 gap-12 mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop content-normal justify-items-center text-slate-600 px-7">
            {/* POP UP For Add/Edit */}

            {/* TODO?  : Mungkin sebaikny tambahin no PAK terakhir? dan ini bisa diupdate setap kali dilakukan penetapan?*/}
            {/* SECTION : Rumus*/}
            {/* TODO : Ini belum terintegrasi database || mungkin fiturny read saja karna kayakny ribet kalo CRUD  */}

            <section className="h-full border rounded-lg bg-slate-700 justify-self-stretch place-self-center border-gradient">
                <div className="m-12 h-[27rem]">
                    <div className="flex justify-between mb-10">
                        <strong className="text-2xl">Rumus Penghitungan</strong>
                        <div className="relative group">
                            <GoQuestion className="w-10 h-10" />
                            <TooltipHover
                                className="text-sm w-36"
                                message="Formula resmi yang digunakan untuk menghitung angka kredit berdasarkan periode dan bobot kinerja."
                            />
                        </div>
                    </div>

                    <form>
                        <div className="flex items-center h-24 gap-2 p-3 text-sm font-semibold text-center border rounded-md border-accent">
                            <strong className="text-base font-extrabold underline">
                                Angka kredit
                            </strong>
                            <span className="scale-125 ">=</span>
                            <div className="flex-col m-2">
                                <span>Angka Periode</span>
                                <div className="border-b-2 border-accent" />
                                <span className="block text-center">
                                    12
                                </span>{" "}
                            </div>
                            <span className="scale-110">x</span>
                            <strong className="">AK Normatif</strong>
                            <span className="scale-110 ">x</span>
                            <div className="flex-col m-2">
                                <span>Presentase</span>
                                <div className="border-b-2 border-accent" />
                                <span className="block text-center">
                                    100
                                </span>{" "}
                            </div>
                        </div>
                        {/* Keterangan */}
                        <div className="my-6 space-y-2 text-sm leading-relaxed ">
                            <strong className="text-xl font-bold">
                                Keterangan
                            </strong>
                            <p>
                                <strong>Angka Periode</strong> = Periode
                                Berakhir - Periode Mulai
                            </p>
                            <p>
                                <strong>Akumulasi Angka Kredit</strong>
                            </p>
                            <p>
                                <strong>Jumlah Angka Kredit Kumulatif</strong> =
                                AK Terakhir + AK Terbaru
                            </p>
                            <p>
                                <strong>
                                    AK Minimal untuk Kenaikan Pangkat
                                </strong>{" "}
                                = JAKK - Pangkat Minimal
                            </p>
                            <p>
                                <strong>
                                    AK Minimal untuk Kenaikan Jabatan
                                </strong>{" "}
                                = JAKK - Jabatan Minimal
                            </p>
                        </div>
                        {/* Simpan Button */}
                    </form>
                </div>
            </section>
            {/* !SECTION : Rumus*/}

            {/* SECTION : Penanda Tangan */}
            <section className="flex flex-col h-full p-12 border rounded-lg justify-self-stretch place-self-start border-gradient">
                <DynamicTableSection
                    title="Penanda Tangan"
                    tooltipMessage="Pejabat yang berwenang menandatangani dokumen PAK."
                    columns={[
                        {
                            header: "Nama",
                            field: "nama",
                            width: "40%",
                            className: 'text-nowrap'
                        },
                        {
                            header: "NIP",
                            field: "nip",
                            width: "35%",
                            center: true,
                        },
                    ]}
                    data={penandaTangan.value}
                    withAction={false}
                />
            </section>
            {/* !SECTION : Penanda Tangan */}

            {/* SECTION : Koefisien Per Tahun */}
            <section className="flex flex-col h-full p-12 border rounded-lg justify-self-stretch place-self-start border-gradient">
                <DynamicTableSection
                    title="Koefisien Per Tahun"
                    tooltipMessage="Nilai standar koefisien per tahun berdasarkan jenjang jabatan fungsional."
                    columns={[
                        {
                            header: "Jabatan",
                            field: "jabatan",
                            width: "20%",
                        },
                        {
                            header: "Nilai",
                            field: "nilai",
                            width: "15%",
                            center: true,
                        },
                    ]}
                    data={koefisienPertahun}
                    withAction={false}
                />
            </section>
            {/* !SECTION Koefisien Pertahun */}

            {/* SECTION : Predikat Presentase */}
            <section className="flex flex-col h-full p-12 border rounded-lg justify-self-stretch place-self-start border-gradient">
                <DynamicTableSection
                    title="Predikat & Presentase"
                    tooltipMessage="Kategori penilaian kinerja beserta presentase konversi terhadap angka kredit."
                    columns={[
                        {
                            header: "Predikat",
                            field: "predikat",
                            width: "20%",
                        },
                        {
                            header: "Presentase",
                            field: "presentase",
                            width: "15%",
                            percent:true,
                            center: true,
                        },
                    ]}
                    data={predikatPresentase.value}
                    defaultConfig={predikatPresentase.default_config}
                    withAction={false}
                />
            </section>
            {/* !SECTION : Predikat Presentase */}

            {/* SECTION : Tebusan */}
            <section className="w-4/5 col-span-2 row-span-4 mx-auto border rounded-lg justify-self-stretch place-self-start border-gradient">
                <div className="m-16">
                    <div className="flex justify-between mx-auto ">
                        <strong className="text-2xl">Tebusan</strong>
                        <div className="relative group">
                            <GoQuestion className="w-10 h-10" />
                            <TooltipHover
                                className="text-sm w-36"
                                message="Pihak-pihak yang menerima salinan hasil penilaian PAK sesuai jenis prosesnya."
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <strong className="block text-xl">
                            Konversi Predikat Angka Kredit
                        </strong>

                        <DynamicTableSection
                            title="Konversi Predikat Angka Kredit"
                            showHeader={false}
                            columns={[
                                {
                                    header: "Pihak Tebusan",
                                    field: "pihak_tebusan",
                                    width: "60%",
                                },
                            ]}
                            data={tebusanKonversi}
                            withAction={false}
                        />
                    </div>
                    <div className="pt-7">
                        <strong className="block text-xl">
                            Akumulasi Angka Kredit
                        </strong>
                        <DynamicTableSection
                            title="Akumulasi Angka Kredit"
                            showHeader={false}
                            columns={[
                                {
                                    header: "Pihak Tebusan",
                                    field: "pihak_tebusan",
                                    width: "60%",
                                },
                            ]}
                            data={tebusanAkumulasi}
                            withAction={false}
                        />
                    </div>
                    <div className="pt-7">
                        <strong className="block text-xl">
                            Penetapan Angka Kredit
                        </strong>
                        <DynamicTableSection
                            title="Penetapan Angka Kredit"
                            showHeader={false}
                            columns={[
                                {
                                    header: "Pihak Tebusan",
                                    field: "pihak_tebusan",
                                    width: "60%",
                                },
                            ]}
                            data={tebusanPenetapan}
                            withAction={false}
                        />
                    </div>
                </div>
            </section>
            {/* !SECTION : Tebusan */}

            {/* SECTION  : Kesimpulan */}
            <section className="w-4/5 col-span-2 row-span-2 p-12 mx-auto mb-20 border rounded-lg justify-self-stretch place-self-start border-gradient">
                <DynamicTableSection
                    title="Kesimpulan"
                    tooltipMessage="Pernyataan akhir hasil penilaian PAK terkait kelayakan kenaikan pangkat atau jabatan."
                    columns={[
                        {
                            header: "Kesimpulan",
                            field: "kesimpulan",
                            width: "50%",
                        },
                    ]}
                    data={kesimpulan.value}
                    defaultConfig={kesimpulan.default_config}
                    withAction={false}
                />
            </section>
            {/* !SECTION : Kesimpulan */}
        </main>
    );
}
