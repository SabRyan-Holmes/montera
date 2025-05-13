import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useRef, useState } from "react";
import { BsPatchQuestion } from "react-icons/bs";
import { GoQuestion } from "react-icons/go";
import { FaTrash } from "react-icons/fa6";
import {
    InputError,
    InputLabel,
    InputLabelCustom,
    PrimaryButton,
    SecondaryButton,
    RadioWithLabel,
    SuccessButton,
    TextInput,
    TooltipHover,
} from "@/Components";
import { FaSave, FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import moment from "moment/min/moment-with-locales";
import PopUpForm from "../KelolaKoefisien/Partials/PopUpForm";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useRemember } from "@inertiajs/react";
import DynamicTableSection from "./Partials/DynamicTableSection";

// ANCHOR : Import Here!

export default function Index({
    auth,
    title,
    flash,
    koefisienPertahun,
    predikatPresentase,
    pangkatJabatan,
    tebusan,
    kesimpulan,
    rumus,
    // ANCHOR : Handle Props Here!!
}) {
    // const [shownMessages, setShownMessages] = useRemember([]);
    // useEffect(() => {
    //     if (flash.message && !shownMessages.includes(flash.message)) {
    //         Swal.fire({
    //             title: "Berhasil!",
    //             text: `${flash.message}`,
    //             icon: "success",
    //             iconColor: "#50C878",
    //             confirmButtonText: "Oke",
    //             confirmButtonColor: "#2D95C9",
    //         });
    //         setShownMessages([...shownMessages, flash.message]);
    //     }
    // }, [flash.message]);
    // 1. Gunakan useRef untuk tracking pesan yang sudah ditampilkan
    const shownMessages = useRef(new Set());

    useEffect(() => {
        if (flash.message && !shownMessages.current.has(flash.message)) {
            Swal.fire({
                title: "Berhasil!",
                text: flash.message,
                icon: "success",
                confirmButtonText: "Oke",
            }).then(() => {
                shownMessages.current.add(flash.message);

                // Bersihkan flash message
                router.get(
                    "",
                    {},
                    {
                        preserveScroll: true,
                        preserveState: true,
                        onFinish: () => {
                            shownMessages.current.delete(flash.message);
                        },
                    }
                );
            });
        }
    }, [flash.message]);

    function handleDelete(id, name) {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin menghapus data koefisien ini?",
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

    let pangkat = pangkatJabatan.pangkat;
    let jabatan = pangkatJabatan.jabatan;

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [popUpData, setPopUpData] = useState({
        title: "",
        fields: [],
        routeName: "",
    });
    const [isEdit, setIsEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    // ANCHOR : Logic & Function Here!

    // Console
    // console.log("field")
    // console.log(field)
    return (
        <Authenticated user={auth.user} title={title}>
            <main className="grid items-stretch w-full h-full grid-flow-row grid-cols-2 gap-12 mx-auto content-normal justify-items-center text-slate-600 px-7">
                {/* SECTION : Penanda Tangan */}
                <section className="mt-10 border rounded-lg bg-slate-700 justify-self-stretch place-self-center border-gradient">
                    <div className="m-12 h-[27rem]">
                        <div className="flex justify-between ">
                            <strong className="text-2xl">Penanda Tangan</strong>
                            <div className="relative group">
                                <GoQuestion className="w-10 h-10" />
                                <TooltipHover
                                    className="text-sm w-36"
                                    message="Daftar nama dan NIP pejabat yang berwenang menandatangani dokumen PAK."
                                />
                            </div>
                        </div>

                        <form>
                            {/*  NAMA */}
                            <div className="mt-5">
                                <InputLabelCustom
                                    htmlFor="nama"
                                    value="Nama"
                                    className="text-xl"
                                />

                                <RadioWithLabel
                                    name={"Agus Subidyo"}
                                    value={"Agus Subidyo"}
                                    checked
                                />
                                <RadioWithLabel
                                    name={"Nama Lain"}
                                    value={"Nama Lain"}
                                />

                                <div className="flex">
                                    <RadioWithLabel />
                                    <TextInput
                                        id="nama"
                                        type="text"
                                        name="nama"
                                        className="block w-full mt-1 h-11"
                                        placeholder="Tambahkan Nama Baru"
                                        isFocused={true}
                                        // value={data.nama}
                                        // autoComplete={data.nama}
                                        // onChange={(e) =>
                                        //     setData("nama", e.target.value)
                                        // }
                                    />
                                </div>

                                <InputError
                                    // message={errors.nama}
                                    className="mt-2"
                                />
                            </div>

                            {/* NIP */}
                            <div className="mt-5">
                                <InputLabelCustom
                                    htmlFor="nip"
                                    value="NIP"
                                    className="text-xl"
                                />

                                <RadioWithLabel
                                    name={"197412311996121001"}
                                    value={"197412311996121001"}
                                    checked
                                />
                                <RadioWithLabel
                                    name={"NIP lain"}
                                    value={"NIP Lain"}
                                />

                                <div className="flex">
                                    <RadioWithLabel />
                                    <TextInput
                                        id="nama"
                                        type="text"
                                        name="nama"
                                        className="block w-full mt-1 h-11"
                                        placeholder="Tambahkan Nama Baru"
                                        isFocused={true}
                                        // value={data.nama}
                                        // autoComplete={data.nama}
                                        // onChange={(e) =>
                                        //     setData("nama", e.target.value)
                                        // }
                                    />
                                </div>

                                <InputError
                                    // message={errors.nama}
                                    className="mt-2"
                                />

                                <div className="flex justify-end w-full">
                                    <SuccessButton
                                        type="submit"
                                        className="inline-flex justify-end my-5 "
                                        // disabled={processing}
                                    >
                                        Simpan
                                        <FaSave className="mx-1" />
                                    </SuccessButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
                {/* !SECTION : Penanda Tangan */}
                {/* SECTION : Rumus*/}
                <section className="mt-10 border rounded-lg bg-slate-700 justify-self-stretch place-self-center border-gradient">
                    <div className="m-12 h-[27rem]">
                        <div className="flex justify-between mb-10">
                            <strong className="text-2xl">
                                Rumus Penghitungan
                            </strong>
                            <div className="relative group">
                                <GoQuestion className="w-10 h-10" />
                                <TooltipHover
                                    className="text-sm w-36"
                                    message="Formula resmi yang digunakan untuk menghitung angka kredit berdasarkan periode dan bobot kinerja."
                                />
                            </div>
                        </div>

                        <form>
                            <div className="flex items-center h-24 gap-2 p-3 text-sm font-bold border rounded-md border-accent">
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
                                <span className="font-bold scale-110">x</span>
                                <strong className="">AK Normatif</strong>
                                <span className="scale-110 ">x</span>
                                <div className="flex-col m-2">
                                    <span>Angka Periode</span>
                                    <div className="border-b-2 border-accent" />
                                    <span className="block text-center">
                                        12
                                    </span>{" "}
                                </div>
                            </div>
                            {/* FOCUS! */}
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
                                    <strong>
                                        Jumlah Angka Kredit Kumulatif
                                    </strong>{" "}
                                    = AK Terakhir + AK Terbaru
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

                            <div className="flex justify-end w-full gap-7">
                                <SecondaryButton
                                    disabled
                                    type="submit"
                                    className="inline-flex justify-end my-5 "
                                    // disabled={processing}
                                >
                                    Edit
                                    <FaEdit className="mx-1" />
                                </SecondaryButton>
                                <SuccessButton
                                    disabled
                                    type="submit"
                                    className="inline-flex justify-end my-5 "
                                    // disabled={processing}
                                >
                                    Simpan
                                    <FaSave className="mx-1" />
                                </SuccessButton>
                            </div>
                        </form>
                    </div>
                </section>
                {/* !SECTION : Rumus*/}

                {/* POP UP For Add/Edit */}
                {isPopUpOpen && (
                    <PopUpForm
                        onClose={() => setIsPopUpOpen(!isPopUpOpen)}
                        isEdit={isEdit}
                        popUpData={popUpData}
                        dataEdit={dataEdit}
                    />
                )}
                {/* SECTION : Koefisien Pertahun */}
                <section className="flex flex-col h-full p-12 border rounded-lg justify-self-stretch place-self-start border-gradient">
                    <DynamicTableSection
                        title="Koefisien Pertahun"
                        tooltipMessage="Nilai standar koefisien per tahun berdasarkan jenjang jabatan fungsional."
                        columns={[
                            {
                                header: "Jabatan",
                                field: "jabatan",
                                width: "30%",
                            },
                            {
                                header: "Nilai",
                                field: "nilai",
                                width: "15%",
                                center: true,
                            },
                        ]}
                        data={koefisienPertahun}
                        onAdd={() => {
                            setPopUpData({
                                title: "Koefisien Per Tahun",
                                fields: ["jabatan", "nilai"],
                                routeName: route("divisi-sdm.aturan-pak.store"),
                            });
                            setIsPopUpOpen(true);
                            setIsEdit(false);
                        }}
                        onEdit={(item) => {
                            setPopUpData({
                                title: "Koefisien Per Tahun",
                                fields: ["jabatan", "nilai"],
                                routeName: route(
                                    "divisi-sdm.aturan-pak.update",
                                    item.id
                                ),
                            });
                            setIsPopUpOpen(true);
                            setIsEdit(true);
                            setDataEdit(item);
                        }}
                        onDelete={(id) =>
                            handleDelete(id, "Koefisien Per Tahun")
                        }
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
                                width: "30%",
                            },
                            {
                                header: "Presentase",
                                field: "presentase",
                                width: "15%",
                                center: true,
                            },
                        ]}
                        data={predikatPresentase}
                        onAdd={() => {
                            setPopUpData({
                                title: "Predikat & Presentase",
                                fields: ["predikat", "presentase"],
                                routeName: route("divisi-sdm.aturan-pak.store"),
                            });
                            setIsPopUpOpen(true);
                            setIsEdit(false);
                        }}
                        onEdit={(item) => {
                            setPopUpData({
                                title: "Predikat & Presentase",
                                fields: ["predikat", "presentase"],
                                routeName: route(
                                    "divisi-sdm.aturan-pak.update",
                                    item.id
                                ),
                            });
                            setIsPopUpOpen(true);
                            setIsEdit(true);
                            setDataEdit(item);
                        }}
                        onDelete={(id) =>
                            handleDelete(id, "Predikat & Presentase")
                        }
                    />
                </section>
                {/* !SECTION : Predikat Presentase */}

                {/* SECTION : Angka Minimal Pangkat Dan Jabatan */}
                <section className="w-3/5 col-span-2 row-span-2 mx-auto border rounded-lg justify-self-stretch place-self-start border-gradient">
                    <div className="m-16">
                        <div className="flex justify-between ">
                            <strong className="text-2xl">
                                Angka Minimal Pangkat Dan Jabatan
                            </strong>
                            <div className="relative group">
                                <GoQuestion className="w-10 h-10" />
                                <TooltipHover
                                    className="text-sm w-36"
                                    message="Batas minimal angka kredit kumulatif untuk kenaikan pangkat dan jabatan."
                                />
                            </div>
                        </div>

                        <div className="pt-7">
                            <table className="table text-sm table-bordered">
                                <thead className="text-base font-medium text-white bg-primary ">
                                    <tr>
                                        <th
                                            scope="col"
                                            dir="rtl"
                                            className="rounded-tl-xl"
                                            width="5%"
                                        >
                                            No
                                        </th>
                                        <th scope="col" width="20%">
                                            Pangkat
                                        </th>
                                        <th
                                            scope="col"
                                            width="20%"
                                            className="text-center"
                                        >
                                            Jabatan
                                        </th>
                                        <th scope="col" width="20%">
                                            Terakhir Diubah
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-center rounded-tr-xl"
                                        >
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=" border-secondary/15">
                                    {pangkatJabatan.pangkat
                                        .sort((a, b) => a[1] - b[1]) // urutkan dari nilai kecil ke besar
                                        .map((data, i) => (
                                            <tr
                                                key={i}
                                                className="group/item hover:bg-secondary/50 hover:cursor-pointer"
                                            >
                                                <td className="text-center">
                                                    {i + 1}
                                                </td>
                                                <td className="font-semibold text-center">
                                                    {data.nilai}
                                                </td>
                                                <td className="font-semibold text-center">
                                                    {jabatan[i]?.nilai ?? "-"}
                                                </td>
                                                <td className="text-sm text-center">
                                                    {moment(
                                                        data.updated_at
                                                    ).fromNow()}
                                                </td>

                                                <td className="p-3 text-center whitespace-nowrap text-nowrap">
                                                    <a
                                                        onClick={() => {
                                                            setIsPopUpOpen(
                                                                !isPopUpOpen
                                                            );
                                                            setIsEdit(true);
                                                            setDataEdit(
                                                                koefisien
                                                            );
                                                        }}
                                                        className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center scale-125 hover:scale-[1.3] transition-all group/button group-hover/item:bg-secondary group-hover/item:text-white text-secondary action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                                    >
                                                        <FaEdit className="fill-secondary group-hover/item:fill-white" />
                                                    </a>

                                                    <span className="inline-block mx-1"></span>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                koefisien.id
                                                            )
                                                        }
                                                        className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center text-red-500  hover:scale-[1.3] transition-all scale-125 group/button group-hover/item:bg-red-500 group-hover/item:text-white action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                                    >
                                                        <FaTrash className="fill-red-500 group-hover/item:fill-white" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    // setIsPopUpOpen(!isPopUpOpen);
                                    // setIsEdit(false);
                                    // setDataEdit(null);
                                }}
                                className="mt-6 text-white scale-95 btn glass bg-sky-600 hover:bg-primary/90"
                            >
                                Tambah Koefisien
                                <IoMdAdd className="w-6 h-6" />
                            </button>
                            {/* {isPopUpOpen && (
                                <PopUpForm
                                    onClose={() => setIsPopUpOpen(!isPopUpOpen)}
                                    isEdit={isEdit}
                                    dataEdit={dataEdit}
                                />
                            )} */}
                        </div>
                    </div>
                </section>
                {/* !SECTION : Angka Minimal Pangkat Dan Jabatan */}

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
                                        field: "choice",
                                        width: "60%",
                                    },
                                ]}
                                data={tebusan.konversi}
                                onAdd={() => {
                                    setPopUpData({
                                        title: "Pihak Tebusan",
                                        fields: ["choice"],
                                        routeName: route(
                                            "divisi-sdm.aturan-pak.store"
                                        ),
                                    });
                                    setIsPopUpOpen(true);
                                    setIsEdit(false);
                                }}
                                onEdit={(item) => {
                                    setPopUpData({
                                        title: "Tebusan",
                                        fields: ["choice"],
                                        routeName: route(
                                            "divisi-sdm.aturan-pak.update",
                                            item.id
                                        ),
                                    });
                                    setIsPopUpOpen(true);
                                    setIsEdit(true);
                                    setDataEdit(item);
                                }}
                                onDelete={(id) => handleDelete(id, "Tebusan")}
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
                                        field: "choice",
                                        width: "60%",
                                    },
                                ]}
                                data={tebusan.akumulasi}
                                onAdd={() => {
                                    setPopUpData({
                                        title: "Pihak Tebusan",
                                        fields: ["choice"],
                                        routeName: route(
                                            "divisi-sdm.aturan-pak.store"
                                        ),
                                    });
                                    setIsPopUpOpen(true);
                                    setIsEdit(false);
                                }}
                                onEdit={(item) => {
                                    setPopUpData({
                                        title: "Tebusan",
                                        fields: ["choice"],
                                        routeName: route(
                                            "divisi-sdm.aturan-pak.update",
                                            item.id
                                        ),
                                    });
                                    setIsPopUpOpen(true);
                                    setIsEdit(true);
                                    setDataEdit(item);
                                }}
                                onDelete={(id) => handleDelete(id, "Tebusan")}
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
                                        field: "choice",
                                        width: "60%",
                                    },
                                ]}
                                data={tebusan.akumulasi}
                                onAdd={() => {
                                    setPopUpData({
                                        title: "Pihak Tebusan",
                                        fields: ["choice"],
                                        routeName: route(
                                            "divisi-sdm.aturan-pak.store"
                                        ),
                                    });
                                    setIsPopUpOpen(true);
                                    setIsEdit(false);
                                }}
                                onEdit={(item) => {
                                    setPopUpData({
                                        title: "Tebusan",
                                        fields: ["choice"],
                                        routeName: route(
                                            "divisi-sdm.aturan-pak.update",
                                            item.id
                                        ),
                                    });
                                    setIsPopUpOpen(true);
                                    setIsEdit(true);
                                    setDataEdit(item);
                                }}
                                onDelete={(id) => handleDelete(id, "Tebusan")}
                            />
                        </div>
                    </div>
                </section>
                {/* !SECTION : Tebusan */}

                {/* SECTION  : Kesimpulan */}
                <section className="w-4/5 col-span-2 row-span-2 p-12 mx-auto border rounded-lg justify-self-stretch place-self-start border-gradient">
                    <DynamicTableSection
                        title="Kesimpulan"
                        tooltipMessage="Pernyataan akhir hasil penilaian PAK terkait kelayakan kenaikan pangkat atau jabatan."
                        columns={[
                            {
                                header: "Kesimpulan",
                                field: "teks",
                                width: "50%",
                            },
                        ]}
                        data={kesimpulan}
                        onAdd={() => {
                            setPopUpData({
                                title: "Kesimpulan",
                                fields: ["teks"],
                                routeName: route("divisi-sdm.aturan-pak.store"),
                            });
                            setIsPopUpOpen(true);
                            setIsEdit(false);
                        }}
                        onEdit={(item) => {
                            setPopUpData({
                                title: "Kesimpulan",
                                fields: ["teks"],
                                routeName: route(
                                    "divisi-sdm.aturan-pak.update",
                                    item.id
                                ),
                            });
                            setIsPopUpOpen(true);
                            setIsEdit(true);
                            setDataEdit(item);
                        }}
                        onDelete={(id) => handleDelete(id, "Kesimpulan")}
                    />
                </section>
                {/* !SECTION : Kesimpulan */}
            </main>
        </Authenticated>
    );
}
