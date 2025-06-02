import React, { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { InputLabel, PrimaryButton, SecondaryButton } from "@/Components";
import { RiArchive2Fill, RiArrowGoBackFill } from "react-icons/ri";
import { FaDatabase, FaFolder, FaFileAlt } from "react-icons/fa";
import { FaClockRotateLeft, FaFilePdf } from "react-icons/fa6";
import { HiDocumentSearch } from "react-icons/hi";
import moment from "moment/min/moment-with-locales";

export default function Index({
    auth,
    arsipDokumens,
    folderList,
    title,
    flash,
    searchReq: initialSearch,
}) {
    moment.locale("id");

    const [search, setSearch] = useState(initialSearch);
    function formatRole(label) {
        return label.trim().toLowerCase().replace(/\s+/g, "-");
    }
    const role = auth.user.role;

    const folders = [
        { name: "PAK 2024", count: 12 },
        { name: "Kenaikan Pangkat", count: 7 },
        { name: "SK Jabatan", count: 5 },
    ];

    const recentDocs = [
        { name: "Surat Tugas.pdf", size: "1.2MB", uploadedAt: "2025-05-28" },
        {
            name: "Penilaian Kinerja.xlsx",
            size: "560KB",
            uploadedAt: "2025-05-27",
        },
        {
            name: "SK Pengangkatan.docx",
            size: "850KB",
            uploadedAt: "2025-05-25",
        },
    ];

    function formatSize(sizeInBytes) {
        const sizeInMB = (sizeInBytes / 1024 / 1024).toFixed(2);
        return `${sizeInMB} MB`;
      }

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
                                        <HiDocumentSearch  className="w-6 h-6 fill-primary" />
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
                        <table className="table w-full">
                            <thead>
                                <tr className="text-sm text-gray-600">
                                    <th>Nama Dokumen</th>
                                    <th>Ukuran</th>
                                    <th>Diarsipkan</th>
                                    <th>Divalidasi</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arsipDokumens.data.map((data, idx) => (
                                    <tr
                                        key={idx}
                                        className="cursor-pointer group/item hover:bg-primary/40"
                                    >
                                        <td className="flex items-center gap-2">
                                            <FaFilePdf className="text-green-500" />
                                            {data.title}
                                        </td>
                                        <td>{formatSize(data.size)}</td>
                                        <td>{moment(data.created_at).fromNow()}</td>
                                        <td>{moment(data.tanggal_divalidasi).fromNow()}</td>
                                        <td>
                                            <button className="btn btn-xs btn-outline btn-primary">
                                                Lihat
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </Authenticated>
    );
}
