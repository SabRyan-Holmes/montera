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
    FileInput,
    TextInput,
    TextInputSecondary,
} from "@/Components";
import { FaSave, FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import PopUpForm from "./PopUpForm";
import DynamicTableSection from "./DynamicTableSection";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function PimpinanContent({ aturanPAK }) {
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

    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [popUpData, setPopUpData] = useState({
        title: "",
        fields: [],
        routeName: "",
    });
    const [isEdit, setIsEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);

    // ANCHOR : Logic & Function Here!
    const findDefaultConfigById = (id, configArray) => {
        return configArray.find((item) => item.id === id);
    };

    // Cari config yang sesuai dengan id
    const defaultConfigPT = findDefaultConfigById(
        aturanPAK.penandaTangan.default_config,
        aturanPAK.penandaTangan.value
    );

    // Data for Penanda Tangan
    console.log("defaultConfigPT");
    console.log(defaultConfigPT);
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: defaultConfigPT.nama, // Tambahkan field untuk selected ID
        nip: defaultConfigPT.nip, // Tambahkan field untuk selected ID
        signature_path: defaultConfigPT.signature_path,
    });
    console.log(data);

    return (
        <main className="grid items-stretch w-full h-full grid-flow-row grid-cols-2 gap-12 mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop content-normal justify-items-center text-slate-600 px-7">
            {/* POP UP For Add/Edit */}

            {/* TODO?  : Mungkin sebaikny tambahin no PAK terakhir? dan ini bisa diupdate setap kali dilakukan penetapan?*/}
            {/* SECTION : Rumus*/}
            {/* TODO : Ini belum terintegrasi database || mungkin fiturny read saja karna kayakny ribet kalo CRUD  */}

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

            {/* !SECTION Koefisien Pertahun */}

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
                        <form action="" className="w-full mt-6 space-y-6 ">
                            <fieldset>
                                <InputLabelCustom
                                    htmlFor="nama"
                                    value="Nama"
                                    className="text-xl"
                                />
                                <TextInputSecondary
                                    id="nama"
                                    type="nama"
                                    name="nama"
                                    value={data.nama}
                                    className="block w-full mt-1 "
                                    placeholder="Masukkan Nama anda sebagai Penanda Tangan"
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                />

                                {/* <InputError
                                message={errors.nama}
                                className="mt-2"
                            /> */}
                            </fieldset>

                            {/*  NIP */}
                            <fieldset>
                                <InputLabelCustom
                                    htmlFor="nip"
                                    value="NIP"
                                    className="text-xl"
                                />
                                <TextInputSecondary
                                    id="nip"
                                    type="nip"
                                    name="nip"
                                    value={data.nip}
                                    className="block w-full mt-1 h-11"
                                    placeholder="Masukkan NIP anda sebagai Penanda Tangan"
                                    onChange={(e) =>
                                        setData("nip", e.target.value)
                                    }
                                />
                            </fieldset>

                            {/*  NIP */}
                            <fieldset>
                                <InputLabelCustom
                                    htmlFor="signature_path"
                                    value="Tanda Tangan/Validasi"
                                    className="text-xl"
                                />

                                <img
                                    src={`/storage/${data.signature_path}`}
                                    alt="Tanda Tangan/Validasi"
                                    className="w-20 h-20"
                                />
                            </fieldset>
                            <div className="flex justify-end w-full gap-3">
                                <SecondaryButton
                                    type="submit"
                                    className="inline-flex justify-end my-5 "
                                    // disabled={processing}
                                >

                                    Upload TTD & Validasi
                                    <IoCloudUploadOutline  className="w-5 h-5 mx-1 stroke-2" />
                                </SecondaryButton>
                                <SuccessButton
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
                            width: "30%",
                        },
                        {
                            header: "Presentase",
                            field: "presentase",
                            width: "15%",
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
