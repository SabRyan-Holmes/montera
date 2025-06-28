import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import {
    DetailPegawai,
    InputLabel,
    Modal,
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
import ModalCatatan from "@/Components/ModalCatatan";

export default function Index({
    auth,
    title,
    flash,
    pegawai,
    pegawaiList,
    aturanPAK,
    // IF Edit
    isEdit = false,
    isRevisi = false,
    pengajuanId = null,
    riwayat,

    // IF By Pengusulan
    isByPengusulan,
    pengusulan,
}) {
    // =============================================================Aturan Penetapan==============================================
    const {
        initialized,
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        reset,
        rumusPenghitungan,
        aturanKonvTableProps,
        aturanAkmTableProps,
        aturanPAKTableProps,
    } = UseAturanPenetapan((aturanPAK = aturanPAK));

    const [pegawaiState, setPegawaiState] = useState(null);
    // IF EDIT
    useEffect(() => {
        const { findKoefisienPertahunValue } = rumusPenghitungan;
        console.warn(riwayat);
        if (isEdit && riwayat) {
            setData({
                ...riwayat,
                id: riwayat.id,
                pegawai: riwayat.pegawai,
                //forRevisiPengajuanPAK
                ...(pengajuanId && { pengajuanId: pengajuanId }),
            });
            setPegawaiState(riwayat.pegawai);
        } else if (isByPengusulan && pegawai) {
            let koefisienPertahunValue = findKoefisienPertahunValue(
                pegawai["Jabatan/TMT"]
            );

            // Take the month
            const [yearStart, monthStart, day] =
                pengusulan.periode_mulai?.split("-");
            const [yearEnd, monthEnd, dayEnd] =
                pengusulan.periode_berakhir?.split("-");

            const angkaPeriodeMulai = parseInt(monthStart, 10);
            const angkaPeriodeBerakhir = parseInt(monthEnd, 10);
            const { useRumusAngkaKredit, useRumusAngkaPeriode } =
                rumusPenghitungan;
            const angkaPeriodeValue = useRumusAngkaPeriode(
                angkaPeriodeBerakhir,
                angkaPeriodeMulai
            );
            const angkaKreditValue = useRumusAngkaKredit(
                angkaPeriodeValue,
                koefisienPertahunValue,
                data.presentase
            );
            const today = new Date().toISOString().split("T")[0];
            setData((prev) => ({
                ...prev,
                tgl_ditetapkan: today,
                ak_normatif: koefisienPertahunValue,
                periode_mulai: angkaPeriodeMulai,
                periode_berakhir: angkaPeriodeBerakhir,
                angka_periode: angkaPeriodeValue,
                angka_kredit: angkaKreditValue,
                tahun_periode: yearStart,
            }));
        }
    }, [initialized]);

    // Kalo dpt nilai pegawai stelah dipilih
    useEffect(() => {
        const { findKoefisienPertahunValue } = rumusPenghitungan;
        if (!isEdit && pegawai) {
            setData("pegawai", pegawai);
            setPegawaiState(pegawai);

            const akNormatifValue = findKoefisienPertahunValue(
                pegawai["Jabatan/TMT"]
            );
            // alert(akNormatifValue)
            setData("ak_normatif", akNormatifValue); // langsung set di sini
        }
    }, [pegawai]);

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
            const firstErrorMessage = Object.values(errors)[0];
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

    const submit = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        // alert(action)
        const routeNames = {
            submit: route("divisi-sdm.pak.submit"),
            save: route("divisi-sdm.pak.save"),
            preview: route("pak.process"),
        };

        if (isEdit && data?.id) {
            routeNames["update"] = route(
                "divisi-sdm.riwayat-pak.update",
                data.id
            );
            routeNames["re-submit"] = route(
                "divisi-sdm.pengajuan.ajukan-ulang",
                data.id
            );
        }

        const url = routeNames[action];
        if (!url) return alert(`Unknown action: ${action}`);

        const isPost = action === "preview" || action === "save" || !isEdit;
        const method = isPost ? post : patch;

        method(url, {
            preserveScroll: true,
            preserveState: true,
            onStart: () => setIsLoading(true),
            onFinish: () => setIsLoading(false),
            onError: (errors) => {
                console.error("Error:", errors);
                alert("Submit gagal. Lihat console log.");
            },
            onSuccess: () => {
                if (action === "preview") setShowIframe(true);
                setActiveModal(null);
            },
        });
    };

    const submitModal = (e) => {
        const action = e.target.value;
        const routeNames = {
            submit: route("divisi-sdm.pak.submit"),
            "re-submit": route("divisi-sdm.pengajuan.ajukan-ulang", data.id),
        };
        const routeName = routeNames[action];
        if (!routeName) return alert(`Unknown action: ${action}`);
        const method = action === "re-submit" ? "patch" : "post";
        router[method](routeName, data, {
            preserveScroll: true,
            preserveState: true,
            onStart: () => setIsLoading(true),
            onFinish: () => setIsLoading(false),
            onSuccess: () => {
                setActiveModal(null);
            },
        });
    };

    const [search, setSearch] = useState("");
    const filtered = pegawaiList?.filter((p) =>
        `${p["Nama"]} ${p.NIP}`.toLowerCase().includes(search.toLowerCase())
    );

    const onSelect = (p) => {
        setSearch(`${p.Nama} (${p.NIP})`);
        router.get(
            route("divisi-sdm.pak.create"),
            { NIP: p.NIP },
            {
                preserveState: false,
                replace: true,
                onSuccess: () => {
                    setData("pegawai", pegawai);
                    setPegawaiState(pegawai);
                },
            }
        );
    };

    const [activeModal, setActiveModal] = useState(null);

    return (
        <Authenticated
            user={auth.user}
            title={title + (isByPengusulan ? " - Berdasarkan Pengusulan" : "")}
            current={route().current()}
        >
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop max-w-screen-desktop">
                <section className="m-10 my-3 ">
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

                                {isByPengusulan && (
                                    <li>
                                        <span className="inline-flex items-center gap-2">
                                            Berdasarkan Pengusulan
                                        </span>
                                    </li>
                                )}

                                {isEdit && (
                                    <li>
                                        <span className="inline-flex items-center gap-2">
                                            {riwayat.pegawai.Nama}
                                        </span>
                                    </li>
                                )}

                                {!isEdit && pegawaiState && (
                                    <li>
                                        <span className="inline-flex items-center gap-2">
                                            {pegawaiState.Nama}
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

                    <div className="px-2 mx-auto overflow-x-auto">
                        {!isEdit && !isByPengusulan && (
                            <>
                                {/* Konten untuk memilih Pegawai Start */}

                                <h1 className="my-4 text-2xl font-medium">
                                    Pilih Pegawai
                                </h1>
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
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                    {search && (
                                        <ul className="mt-2 overflow-y-auto border rounded-md max-h-48">
                                            {filtered.length > 0 ||
                                            pegawaiState ? (
                                                filtered.map((p, i) => (
                                                    <li
                                                        key={i}
                                                        className="p-2 cursor-pointer hover:bg-blue-100"
                                                        onClick={() =>
                                                            onSelect(p)
                                                        }
                                                    >
                                                        <a>
                                                            {p.Nama} (NIP :{" "}
                                                            {p.NIP})
                                                        </a>
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
                            </>
                        )}

                        {/* Konten untuk memilih Pegawai End */}
                        <section className={isEdit ? "mt-20" : "mt-10"}>
                            <DetailPegawai
                                pegawai={
                                    !isEdit ? pegawaiState : riwayat.pegawai
                                }
                                collapse={pegawaiState ? true : false}
                            />
                        </section>
                    </div>
                </section>

                <section className="h-full m-12 mt-4">
                    <form onSubmit={submit} method="post">
                        <div className="overflow-x-auto">
                            {/* INPUT DATA | START*/}
                            <InputDataTable
                                data={data}
                                setData={setData}
                                rumusPenghitungan={rumusPenghitungan}
                                isEdit={isEdit}
                                historyData={isEdit ? riwayat : {}}
                                pengusulanData={isByPengusulan && pengusulan}
                            />
                            {/* INPUT DATA | END*/}

                            {/* KONVERSI PREDIKAT KINERJA ANGKA KREDIT | START*/}
                            <KonversiTable
                                data={data}
                                setData={setData}
                                rumusPenghitungan={rumusPenghitungan}
                                isEdit={isEdit}
                                isByPengusulan={isByPengusulan}
                                aturanKonvTableProps={aturanKonvTableProps}
                                historyData={riwayat}
                            />
                            {/* KONVERSI PREDIKAT KINERJA ANGKA KREDIT | END*/}

                            {/* AKUMULASI ANGKA KREDIT | START */}
                            <AkumulasiTable
                                pegawai={pegawaiState}
                                data={data}
                                setData={setData}
                                aturanAkmTableProps={aturanAkmTableProps}
                                isEdit={isEdit}
                                historyData={isEdit ? riwayat : {}}
                                pengusulanData={isByPengusulan && pengusulan}
                            />
                            {/* AKUMULASI ANGKA KREDIT | END */}
                            {/* ANCHOR */}
                            {/* PENETAPAN ANGKA KREDIT | START*/}
                            <PAKTable
                                pegawai={pegawaiState}
                                data={data}
                                setData={setData}
                                isEdit={isEdit}
                                historyData={isEdit ? riwayat : {}}
                                aturanPAKTableProps={aturanPAKTableProps}
                                isByPengusulan={isByPengusulan}
                            />
                            {/* PENETAPAN ANGKA KREDIT | END*/}
                        </div>

                        <div className="flex justify-center w-full gap-6 pb-12 mt-10 space-x-2">
                            <SecondaryButton
                                type="submit"
                                name="action"
                                value="preview"
                                className="scale-110 hover:scale-[1.15] hover:bg-secondary/80 group hover:text-white "
                            >
                                PRATINJAU DOKUMEN
                                <FaFilePdf className="mx-1" />
                            </SecondaryButton>

                            <Modal
                                show={activeModal}
                                onClose={() => setActiveModal(null)} // agar modal bisa ditutup dengan onClose
                                maxWidth="md"
                            >
                                <section className="w-full max-w-md p-6 mx-auto rounded-lg ">
                                    <InputLabel
                                        value="Catatan Pengajuan(opsional)"
                                        forName="catatan"
                                        htmlFor="catatan"
                                        className="mb-4 text-xl font-bold text-gray-800"
                                    />
                                    <fieldset className="relative laptop:w-full">
                                        <textarea
                                            id="catatan"
                                            name="catatan"
                                            className="relative h-24 px-2 border laptop:w-full textarea border-gradient placeholder:text-accent"
                                            placeholder="Ketikkan catatan tambahan untuk pengajuan  ini.."
                                            maxLength={1000}
                                            onChange={(e) =>
                                                setData(
                                                    "catatan",
                                                    e.target.value
                                                )
                                            }
                                        ></textarea>
                                    </fieldset>

                                    <div className="flex justify-end mt-4 space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => setActiveModal(null)}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 bg-gray-100 rounded-md hover:bg-gray-200"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="button"
                                            name="action"
                                            value={
                                                isRevisi
                                                    ? "re-submit"
                                                    : "submit"
                                            }
                                            onClick={submitModal}
                                            className="px-4 py-2 text-sm font-medium text-white transition duration-200 rounded-md bg-sky-600 hover:bg-sky-700"
                                        >
                                            {isRevisi
                                                ? "Ajukan Ulang"
                                                : "Ajukan"}
                                        </button>
                                    </div>
                                </section>
                            </Modal>
                            {isEdit && !isRevisi ? (
                                <>
                                    <SuccessButton
                                        type="submit"
                                        name="action"
                                        value="update"
                                        className="scale-110 hover:scale-[1.15] hover:bg-hijau/80 "
                                    >
                                        Update
                                        <FaSave className="mx-1" />
                                    </SuccessButton>
                                    <button
                                        type="submit"
                                        name="action"
                                        value="save"
                                        className="inline-flex scale-110 hover:scale-[1.15] items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out border border-transparent rounded-md glass bg-bermuda hover:primary/80 focus:primary/80 active:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 "
                                    >
                                        Simpan Sebagai Salinan
                                        <FaSave className="mx-1" />
                                    </button>
                                </>
                            ) : (
                                !isRevisi && (
                                    <SuccessButton
                                        type="submit"
                                        name="action"
                                        value="save"
                                        className="scale-110 hover:scale-[1.15] hover:bg-hijau/80 "
                                    >
                                        Simpan
                                        <FaSave className="mx-1" />
                                    </SuccessButton>
                                )
                            )}

                            {isRevisi ? (
                                <PrimaryButton
                                    type="button"
                                    onClick={() =>
                                        setActiveModal(`ModalCatatan-${0}`)
                                    }
                                    className="scale-110 hover:scale-[1.15]  hover:bg-primary/80 "
                                >
                                    Ajukan Ulang
                                    <BsFillSendFill className="mx-1" />
                                </PrimaryButton>
                            ) : (
                                <PrimaryButton
                                    type="button"
                                    onClick={() =>
                                        setActiveModal(`ModalCatatan-${0}`)
                                    }
                                    className="scale-110 hover:scale-[1.15] hover:bg-primary/80 "
                                >
                                    Ajukan
                                    <BsFillSendFill className="mx-1" />
                                </PrimaryButton>
                            )}
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
