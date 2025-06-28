import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    InputLabel,
    PrimaryButton,
    SecondaryButton,
    TooltipHover,
} from "@/Components";
import { RiArchive2Fill, RiArrowGoBackFill } from "react-icons/ri";
import { FaDatabase, FaFolder, FaFileAlt, FaEdit } from "react-icons/fa";
import { FaClockRotateLeft, FaEye, FaFilePdf, FaTrash } from "react-icons/fa6";
import { HiDocumentSearch } from "react-icons/hi";
import moment from "moment/min/moment-with-locales";
import { IoCloseOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { router, usePage, useRemember } from "@inertiajs/react";
import PopUpForm from "../AturanPAK/Partials/PopUpForm";

export default function Index({
    auth,
    arsipDokumens,
    folderList,
    title,
    subTitle,
    flash,
    searchReq: initialSearch,
}) {
    moment.locale("id");

    const [shownMessages, setShownMessages] = useRemember([]);
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
            setShownMessages([...shownMessages, flash.message]);
        }
    }, [flash.message]);
    const [search, setSearch] = useState(initialSearch);
    function formatRole(label) {
        return label.trim().toLowerCase().replace(/\s+/g, "-");
    }
    const role = auth.user.role;

    function formatSize(sizeInBytes) {
        const sizeInMB = (sizeInBytes / 1024 / 1024).toFixed(2);
        return `${sizeInMB} MB`;
    }

    const handleViewDocument = (path) => {
        const url = `/storage/${path}`;
        setLinkIframe(url);
        setShowIframe(true);
    };

    const handleEdit = (data) => {
        setIsEdit(true);
        setDataEdit(data);
        setPopUpData({
            title: "Arsip Dokumen",
            fields: ["title", "folder_name"],
            routeName: route(
                `${formatRole(role)}.arsip-dokumen.update`,
                data.id
            ),
        });
        setIsPopUpOpen(!isPopUpOpen);
    };

    function handleDelete(id) {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin menghapus arsip dokumen ini?",
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
                router.delete(
                    route(`${formatRole(role)}.arsip-dokumen.destroy`, id),
                    {
                        onError: () => {
                            alert("Gagal Menghapus Data");
                        },
                    }
                );
            }
        });
    }

    const [showIframe, setShowIframe] = useState(false);
    const [linkIframe, setLinkIframe] = useState("");
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [popUpData, setPopUpData] = useState({
        title: "",
        fields: [],
        routeName: "",
    });

    return (
        <Authenticated user={auth.user} title={title}>
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <div className="flex justify-between">
                    <div className="mt-2 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a
                                    href={route(
                                        `${formatRole(
                                            role
                                        )}.arsip-dokumen.index`
                                    )}
                                    className="gap-2"
                                >
                                    <RiArchive2Fill className="w-4 h-4 stroke-current" />
                                    <span>Arsip Dokumen</span>
                                </a>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    Semua Dokumen
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
                                src={linkIframe}
                                width="100%"
                                height="100%"
                                className="border-0"
                            ></iframe>
                        </div>
                    </div>
                )}

                {isPopUpOpen && (
                    <PopUpForm
                        onClose={() => setIsPopUpOpen(!isPopUpOpen)}
                        isEdit={isEdit}
                        popUpData={popUpData}
                        dataEdit={dataEdit}
                    />
                )}
                <section>
                    <form className="w-full mx-auto">
                        <div className="flex items-center justify-between gap-3 my-3">
                            <div className="w-full mx-auto ">
                                <InputLabel
                                    value="Folder/Nama Dokumen"
                                    Htmlfor="search"
                                    className="max-w-sm ml-1 text-base"
                                />

                                <label
                                    htmlFor="search"
                                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                >
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                                        <HiDocumentSearch className="w-6 h-6 fill-primary" />
                                    </div>
                                    <input
                                        type="search"
                                        id="search"
                                        defaultValue={search}
                                        onSubmit={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        name="search"
                                        className=" w-full p-4 py-[13px] pl-10 text-sm placeholder:text-accent text-gray-900 border border-gradient rounded-md"
                                        placeholder="Cari nama dokumen/folder.."
                                    />
                                    <PrimaryButton
                                        type="submit"
                                        className=" absolute end-2 bottom-[6px] "
                                    >
                                        Search
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>

                <section className="my-10">
                    <h2 className="mb-3 space-x-2 text-lg font-semibold text-secondary">
                        <FaFolder className="inline" />
                        <strong className="">Folder</strong>
                    </h2>
                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="flex gap-4 px-1 w-max">

                            {/* Saya ingin ini ditampilkan nama folder sesuai kecocokan nama folderny */}
                            {folderList.length === 0 ? (
                                <p className="text-sm text-gray-500">
                                    Belum ada folder
                                </p>
                            ) : (
                                folderList.map((folder, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white shrink-0 shadow-md rounded-xl px-5 py-4 flex items-center gap-4 hover:shadow-lg transition duration-200 border border-gray-100 min-w-[200px]"
                                    >
                                        <FaFolder className="text-3xl text-secondary" />
                                        <div>
                                            <div className="w-40 font-medium truncate">
                                                {folder.folder_name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {folder.count} Dokumen
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="mb-3 space-x-2 text-lg font-semibold text-hijau">
                        <FaClockRotateLeft className="inline" />
                        <strong className="">Terbaru</strong>
                    </h2>
                    <div className="p-4 overflow-x-auto bg-white shadow-md rounded-xl">
                                                    {/* Saya ingin ini ditampilkan nama dokumen ini sesuai kecocokan nama folderny saat */}

                        {arsipDokumens.data.length > 0 ? (
                            <section>
                                <table className="table w-full">
                                    <thead>
                                        <tr className="text-sm text-gray-600">
                                            <th width="40%">Nama Dokumen</th>
                                            <th>Ukuran</th>
                                            <th>Diarsipkan</th>
                                            <th>Divalidasi</th>
                                            <th className="text-center">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {arsipDokumens.data.map((data, idx) => (
                                            <tr
                                                key={idx}
                                                className="overflow-hidden cursor-pointer group/item hover:bg-primary/40"
                                            >
                                                <td className="flex items-center gap-2">
                                                    <FaFilePdf className="text-green-500" />
                                                    {data.title}
                                                </td>
                                                <td>{formatSize(data.size)}</td>
                                                <td>
                                                    {moment(
                                                        data.created_at
                                                    ).fromNow()}
                                                </td>
                                                <td>
                                                    {moment(
                                                        data.tanggal_divalidasi
                                                    ).fromNow()}
                                                </td>
                                                {/* TODO: Logic Action Button */}
                                                <td className="space-x-2 text-center text-nowrap ">
                                                    <button
                                                        onClick={(e) =>
                                                            handleViewDocument(
                                                                data.file_path
                                                            )
                                                        }
                                                        className="relative group action-btn action-btn-primary"
                                                    >
                                                        <FaEye className="scale-125 group-hover:fill-white" />
                                                        <TooltipHover message="Lihat Dokumen" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleEdit(data)
                                                        }
                                                        className="relative group action-btn action-btn-secondary"
                                                    >
                                                        <FaEdit className="scale-125 group-hover:fill-white" />
                                                        <TooltipHover message="Edit Dokumen" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                data.id
                                                            )
                                                        }
                                                        className="relative group action-btn action-btn-warning"
                                                    >
                                                        <FaTrash className="scale-125 group-hover:fill-white" />
                                                        <TooltipHover message="Hapus Dokumen" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-56">
                                <h2 className="text-2xl font-bold text-gray-600">
                                    {!subTitle
                                        ? "Belum Ada Arsip Dokumen Untuk Saat Ini"
                                        : "Tidak Ditemukan"}
                                </h2>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </Authenticated>
    );
}
