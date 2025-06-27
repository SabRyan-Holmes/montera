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
import { router, useForm, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import PopUpForm from "./PopUpForm";
import DynamicTableSection from "./DynamicTableSection";

export default function SDMContent({ aturanPAK }) {
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

    const { flash } = usePage().props;

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    const shown = useRef(new Set());

    useEffect(() => {
        if (
            flash.toast &&
            flash.toast_id &&
            !shown.current.has(flash.toast_id)
        ) {
            Toast.fire({
                icon: "success",
                title: flash.toast,
            });

            shown.current.add(flash.toast_id);

            // Optional: reset biar bisa muncul lagi setelah beberapa detik
            setTimeout(() => {
                shown.current.delete(flash.toast_id);
            }, 3000);
        }
    }, [flash.toast_id]);

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

    useEffect(() => {
        // Penanda Tangan
        if (aturanPAK) {
            setData("selectedPTId", penandaTangan.default_config);
        }
        console.log("tebusanKonversi");
        console.log(tebusanKonversi);
    }, [aturanPAK]);

    return (
        <main className="grid items-stretch w-full h-full grid-flow-row grid-cols-2 gap-12 mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop content-normal justify-items-center text-slate-600 px-7">
            {/* POP UP For Add/Edit */}
            {isPopUpOpen && (
                <PopUpForm
                    onClose={() => setIsPopUpOpen(!isPopUpOpen)}
                    isEdit={isEdit}
                    popUpData={popUpData}
                    dataEdit={dataEdit}
                />
            )}

            {/* SECTION : Rumus*/}
            {/* NOTE : Ini belum terintegrasi database || mungkin fiturny read saja karna kayakny ribet kalo CRUD  */}
            <section className="mt-10 border rounded-lg bg-slate-700 justify-self-stretch place-self-center border-gradient">
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
                        <div className="flex items-center h-24 gap-2 p-3 text-sm font-bold text-center border rounded-md border-accent">
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
            <section className="mt-10 border rounded-lg bg-slate-700 justify-self-stretch place-self-center border-gradient">
                <div className="m-12 h-[27rem]">
                    <div className="flex justify-between ">
                        <strong className="text-2xl">Penanda Tangan</strong>
                        <div className="relative group">
                            <GoQuestion className="w-10 h-10" />
                            <TooltipHover
                                className="text-sm w-36"
                                message="Pejabat yang berwenang menandatangani dokumen PAK."
                            />
                        </div>
                    </div>

                    <div>
                        {/*  NAMA */}
                        <fieldset className="mt-5">
                            <InputLabelCustom
                                htmlFor="nama"
                                value="Nama dan NIP"
                                className="text-xl"
                            />

                            {penandaTangan.value.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between"
                                >
                                    <RadioWithLabel
                                        name={"penanda_tangan"}
                                        radioValue={item.id}
                                        value={`${item.nama} - ${item.nip}`}
                                        onChange={(e) =>
                                            setData(
                                                "selectedPTId",
                                                parseInt(e.target.value)
                                            )
                                        }
                                        defaultChecked={
                                            item.id ==
                                            penandaTangan.default_config
                                                ? true
                                                : false
                                        }
                                        // checked={
                                        //     data.selectedPTId == penandaTangan.default_config ? true : false
                                        // }
                                    />
                                    <div className="inline-flex gap-3">
                                        <button
                                            onClick={() => {
                                                setPopUpData({
                                                    title: "Penanda Tangan",
                                                    fields: ["nama", "nip"],
                                                    routeName: route(
                                                        "divisi-sdm.aturan-pak.update",
                                                        item.id
                                                    ),
                                                });
                                                setIsPopUpOpen(true);
                                                setIsEdit(true);
                                                setDataEdit(item);
                                            }}
                                            className="relative inline-flex cursor-pointer action-btn group"
                                        >
                                            <FaEdit className="fill-secondary group-hover/item:fill-white" />
                                            <TooltipHover
                                                message={"Edit Data"}
                                            />
                                        </button>

                                        <button
                                            className="relative inline-flex cursor-pointer action-btn group"
                                            onClick={() =>
                                                handleDelete(
                                                    item.id,
                                                    "Penanda Tangan"
                                                )
                                            }
                                        >
                                            <FaTrash className="fill-red-500 group-hover/item:fill-white" />
                                            <TooltipHover
                                                message={"Hapus Data"}
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </fieldset>

                        <div className="flex items-center justify-end w-full gap-2 mt-10">
                            <button
                                className="text-white scale-90 btn glass bg-sky-600 hover:bg-primary/90"
                                onClick={() => {
                                    setPopUpData({
                                        title: "Penanda Tangan",
                                        fields: ["nama", "nip"],
                                        routeName: route(
                                            "divisi-sdm.aturan-pak.store"
                                        ),
                                    });
                                    setIsPopUpOpen(true);
                                    setIsEdit(false);
                                }}
                            >
                                Tambah Data
                                <IoMdAdd className="w-6 h-6" />
                            </button>
                            <SuccessButton
                                asLink
                                href={route(
                                    "divisi-sdm.aturan-pak.set-default-config"
                                )}
                                data={{
                                    updateName: "Penanda Tangan",
                                    value: data.selectedPTId,
                                }}
                                method="post"
                                className="inline-flex justify-end py-3 normal-case "
                                // disabled={processing}
                            >
                                Simpan
                                <FaSave className="mx-1" />
                            </SuccessButton>
                        </div>
                    </div>
                </div>
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
                    //TODO: Ini dak usah dijadiin default, benerin lagi nanti
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
                    onDelete={(id) => handleDelete(id, "Koefisien Per Tahun")}
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
                            percent: true,
                        },
                    ]}
                    data={predikatPresentase.value}
                    defaultConfig={predikatPresentase.default_config}
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
                    onDelete={(id) => handleDelete(id, "Predikat & Presentase")}
                />
            </section>
            {/* !SECTION : Predikat Presentase */}

            {/* SECTION : Angka Minimal Pangkat Dan Jabatan */}
            <section className="w-full col-span-2 row-span-2 p-12 mx-auto border rounded-lg justify-self-stretch place-self-start border-gradient">
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

                <div className="flex items-center justify-between gap-10 pt-7">
                    <DynamicTableSection
                        title="Angka Minimal Pangkat"
                        showHeader={false}
                        columns={[
                            {
                                header: "Angka Pangkat",
                                field: "angka",
                                center: true,
                            },
                        ]}
                        data={pangkat.value}
                        defaultConfig={pangkat.default_config}
                        onAdd={() => {
                            setPopUpData({
                                title: "Angka Minimal Pangkat",
                                fields: ["angka"],
                                routeName: route("divisi-sdm.aturan-pak.store"),
                            });
                            setIsPopUpOpen(true);
                            setIsEdit(false);
                        }}
                        onEdit={(item) => {
                            setPopUpData({
                                title: "Angka Minimal Pangkat",
                                fields: ["angka"],
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
                            handleDelete(id, "Angka Minimal Pangkat")
                        }
                    />

                    <DynamicTableSection
                        title="Angka Minimal Jabatan"
                        showHeader={false}
                        columns={[
                            {
                                header: "Angka Jabatan",
                                field: "angka",
                                center: true,
                            },
                        ]}
                        data={jabatan.value}
                        defaultConfig={jabatan.default_config}
                        onAdd={() => {
                            setPopUpData({
                                title: "Angka Minimal Jabatan",
                                fields: ["angka"],
                                routeName: route("divisi-sdm.aturan-pak.store"),
                            });
                            setIsPopUpOpen(true);
                            setIsEdit(false);
                        }}
                        onEdit={(item) => {
                            setPopUpData({
                                title: "Angka Minimal Jabatan",
                                fields: ["angka"],
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
                            handleDelete(id, "Angka Minimal Jabatan")
                        }
                    />
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
                                    field: "pihak_tebusan",
                                    width: "60%",
                                },
                            ]}
                            data={tebusanKonversi}
                            // defaultConfig={tebusanKonversi.checked}
                            onAdd={() => {
                                setPopUpData({
                                    title: "Tebusan Konversi",
                                    fields: ["pihak_tebusan"],
                                    routeName: route(
                                        "divisi-sdm.aturan-pak.store"
                                    ),
                                });
                                setIsPopUpOpen(true);
                                setIsEdit(false);
                            }}
                            onEdit={(item) => {
                                setPopUpData({
                                    title: "Tebusan Konversi",
                                    fields: ["pihak_tebusan"],
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
                                handleDelete(id, "Tebusan Konversi")
                            }
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
                            defaultConfig={tebusanAkumulasi.default_config}
                            onAdd={() => {
                                setPopUpData({
                                    title: "Tebusan Akumulasi",
                                    fields: ["pihak_tebusan"],
                                    routeName: route(
                                        "divisi-sdm.aturan-pak.store"
                                    ),
                                });
                                setIsPopUpOpen(true);
                                setIsEdit(false);
                            }}
                            onEdit={(item) => {
                                setPopUpData({
                                    title: "Tebusan Akumulasi",
                                    fields: ["pihak_tebusan"],
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
                                handleDelete(id, "Tebusan Akumulasi")
                            }
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
                            defaultConfig={tebusanPenetapan.default_config}
                            onAdd={() => {
                                setPopUpData({
                                    title: "Tebusan Penetapan",
                                    fields: ["pihak_tebusan"],
                                    routeName: route(
                                        "divisi-sdm.aturan-pak.store"
                                    ),
                                });
                                setIsPopUpOpen(true);
                                setIsEdit(false);
                            }}
                            onEdit={(item) => {
                                setPopUpData({
                                    title: "Tebusan Penetapan",
                                    fields: ["pihak_tebusan"],
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
                                handleDelete(id, "Tebusan Penetapan")
                            }
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
                    onAdd={() => {
                        setPopUpData({
                            title: "Kesimpulan",
                            fields: ["kesimpulan"],
                            routeName: route("divisi-sdm.aturan-pak.store"),
                        });
                        setIsPopUpOpen(true);
                        setIsEdit(false);
                    }}
                    onEdit={(item) => {
                        setPopUpData({
                            title: "Kesimpulan",
                            fields: ["kesimpulan"],
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

            {/* TODO?  : Mungkin sebaikny tambahin no PAK terakhir? dan ini bisa diupdate setap kali dilakukan penetapan?*/}
        </main>
    );
}
