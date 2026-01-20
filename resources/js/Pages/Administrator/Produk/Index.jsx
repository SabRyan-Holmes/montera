import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import { Link, router } from "@inertiajs/react";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import { FilterSearchCustom, Pagination, TooltipHover } from "@/Components";
import { FaEyeSlash, FaTrash } from "react-icons/fa6";
import moment from "moment/min/moment-with-locales";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import ShowModal from "./Show";
export default function Index({
    auth,
    produks,
    title,
    subTitle,
    filtersReq,
    filtersList,
    canManage,
}) {
    const [activeModal, setActiveModal] = useState(null);
  function handleDelete(id) {
         Swal.fire({
             // Pastikan SWAL muncul di atas Modal jika ada modal aktif
             ...(activeModal && {
                 target: `#${activeModal}`,
             }),
             title: "Hapus Produk Ini?",
             // Menggunakan HTML agar pesan lebih rapi dan tegas
             html: `
             <div style="text-align: left; font-size: 0.95em;">
                 <p>Apakah Anda yakin ingin menghapus data ini secara permanen?</p>
                 <br/>
                 <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 10px; color: #991b1b;">
                     <strong>⚠️ PERINGATAN PENTING:</strong><br/>
                     Menghapus user ini akan <u>secara otomatis menghapus</u> seluruh data terkait:
                     <ul style="margin-top: 5px; margin-left: 20px; list-style-type: disc;">
                         <li>Data Akuisisi</li>
                         <li>Data Target Kinerja</li>
                         <li>Riwayat Transaksi</li>
                     </ul>
                 </div>
             </div>
         `,
             icon: "warning",
             showCancelButton: true,
             // Tombol Konfirmasi sebaiknya MERAH (Danger) bukan Biru
             confirmButtonColor: "#ef4444",
             cancelButtonColor: "#6b7280",
             confirmButtonText: "Ya, Hapus Data!",
             cancelButtonText: "Batal",
             // UX: Focus ke tombol Batal, supaya kalau user tekan Enter tidak langsung terhapus
             focusCancel: true,
             customClass: {
                 actions: "my-actions gap-2", // Tambahkan gap biar ga nempel
                 cancelButton: "order-1",
                 confirmButton: "order-2",
             },
         }).then((result) => {
             if (result.isConfirmed) {
                 router.delete(route("admin.produk.destroy", id), {
                     onSuccess: () => {
                         // Tampilkan pesan sukses kecil setelah berhasil
                         Swal.fire({
                             title: "Terhapus!",
                             text: "Data produk dan data terkait berhasil dihapus.",
                             icon: "success",
                             timer: 1500,
                             showConfirmButton: false,
                             ...(activeModal && { target: `#${activeModal}` }),
                         });

                         // Tutup modal jika ada
                         if (activeModal) {
                             document.getElementById(activeModal).close();
                         }
                     },
                     onError: () => {
                         Swal.fire({
                             title: "Gagal!",
                             text: "Terjadi kesalahan saat menghapus data.",
                             icon: "error",
                             ...(activeModal && { target: `#${activeModal}` }),
                         });
                     },
                 });
             }
         });
     }
    moment.locale("id");
    const [showLastUpdated, setShowLastUpdated] = useState(false);
    return (
        <Authenticated
            user={auth.user}
            title={(canManage ? "Kelola " : "Daftar ") + title}
        >
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section className="flex items-end justify-between gap-4">
                    <div className="flex-1 ">
                        <FilterSearchCustom
                            routeName={`/admin/produk`}
                            initialFilters={{
                                byKategori: filtersReq.kategori,
                                byStatus: filtersReq.status,
                            }}
                            filtersConfig={[
                                {
                                    name: "byKategori",
                                    label: "Kategori",
                                    options: filtersList.kategori,
                                },
                                {
                                    name: "byStatus",
                                    label: "Status ",
                                    options: filtersList.status,
                                },
                            ]}
                            searchConfig={{
                                name: "search",
                                label: "Nama Produk",
                                placeholder: "Ketik Nama Produk..",
                                initialValue: filtersReq.search,
                            }}
                        />
                    </div>
                    {canManage && (
                        <div className="flex-none pb-3 ">
                            <Link
                                as="button"
                                href={route("admin.produk.create")}
                                className="flex items-center mx-2 text-white btn glass bg-primary hover:bg-primary/80"
                            >
                                Tambah Produk
                                <IoMdAdd className="w-5 h-5" />
                            </Link>
                        </div>
                    )}
                </section>
                <section className="pt-3 ">
                    {subTitle && (
                        <div className="my-4">
                            <strong className="text-2xl font-bold text-gray-600">
                                {subTitle}
                            </strong>
                        </div>
                    )}
                    {produks.data.length > 0 ? (
                        <>
                            <div className="overflow-x-scroll overflow-y-hidden">
                                <table className="table text-xs text-center table-bordered">
                                    <thead className="text-sm font-medium text-white bg-primary ">
                                        <tr className="text-center">
                                            <th
                                                scope="col"
                                                dir="rtl"
                                                width="5%"
                                                className=" rounded-tl-xl"
                                            >
                                                No
                                            </th>
                                            <th scope="col">Nama Produk</th>
                                            <th scope="col">Kategori</th>
                                            <th scope="col">Input Data</th>
                                            <th scope="col">Satuan</th>
                                            <th scope="col">
                                                Bobot
                                                <span className="block">
                                                    Front Liner
                                                </span>
                                            </th>
                                            <th scope="col">Bobot Kredit</th>
                                            <th scope="col">Status</th>
                                            <>
                                                <th
                                                    scope="col"
                                                    width="10%"
                                                    className={
                                                        "text-center cursor-pointer " +
                                                        (!showLastUpdated
                                                            ? "rounded-tr-xl"
                                                            : "")
                                                    }
                                                >
                                                    <div className="flex justify-center gap-2 items-ce nter">
                                                        {showLastUpdated ? (
                                                            <>
                                                                <button
                                                                    className="action-btn hover:scale-[1.15] hover:bg-primary/80"
                                                                    onClick={() =>
                                                                        setShowLastUpdated(
                                                                            !showLastUpdated,
                                                                        )
                                                                    }
                                                                >
                                                                    <FaEyeSlash className="mr-1 text-white " />
                                                                    Diperbarui
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <div className="flex items-center justify-center gap-2">
                                                                <button
                                                                    className=" action-btn hover:scale-125 hover:bg-primary/80"
                                                                    onClick={() =>
                                                                        setShowLastUpdated(
                                                                            !showLastUpdated,
                                                                        )
                                                                    }
                                                                >
                                                                    <TbLayoutSidebarLeftCollapse className="mr-1 text-white" />
                                                                </button>
                                                                <span className="">
                                                                    Aksi
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </th>
                                                {showLastUpdated && (
                                                    <th
                                                        scope="col"
                                                        className="text-center rounded-tr-xl"
                                                    >
                                                        Aksi
                                                    </th>
                                                )}
                                            </>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {produks.data?.map((produk, i) => (
                                            <tr key={i}>
                                                <td className="text-center">
                                                    {i + 1}
                                                </td>
                                                <td className="relative text-center group">
                                                    <span className="block">
                                                        {produk["nama_produk"]}
                                                    </span>
                                                    <span className="badge-xs-accent">
                                                        {produk["kode_produk"]}
                                                    </span>
                                                </td>
                                                <td>
                                                    {produk["kategori_produk"]}
                                                </td>
                                                <td>{produk["label_input"]}</td>
                                                <td>{produk["satuan"]}</td>
                                                <td>
                                                    {produk["bobot_frontliner"]}
                                                </td>
                                                <td>
                                                    {produk["bobot_kredit"]}
                                                </td>
                                                <td>{produk["status"]}</td>
                                                <td
                                                    className={`font-normal text-center ${!showLastUpdated && "hidden"}`}
                                                >
                                                    <span className="block">
                                                        {moment(
                                                            produk[
                                                                "updated_at"
                                                            ],
                                                        ).format("LL")}
                                                    </span>
                                                    <span className="block text-[12px]">
                                                        {moment(
                                                            produk.updated_at,
                                                        ).fromNow()}
                                                    </span>
                                                </td>
                                                {canManage ? (
                                                    <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                        <div className="relative inline-flex group">
                                                            <button
                                                                as="button"
                                                                onClick={() => {
                                                                    setActiveModal(
                                                                        `Show-${produk.id}`,
                                                                    );
                                                                    document
                                                                        .getElementById(
                                                                            `Show-${produk.id}`,
                                                                        )
                                                                        .showModal();
                                                                }}
                                                                className="action-btn group/button action-btn-success "
                                                            >
                                                                <FaEye className="scale-125 group-hover/button:fill-white " />
                                                            </button>
                                                            <ShowModal
                                                                handleDelete={
                                                                    handleDelete
                                                                }
                                                                setActiveModal={
                                                                    setActiveModal
                                                                }
                                                                produk={produk}
                                                                canManage={true}
                                                            />
                                                            <TooltipHover
                                                                message={
                                                                    "Lihat Data"
                                                                }
                                                            />
                                                        </div>

                                                        <div className="relative inline-flex group">
                                                            <Link
                                                                as="a"
                                                                href={route(
                                                                    "admin.produk.edit",
                                                                    produk.id,
                                                                )}
                                                                className="action-btn group/button action-btn-bermuda"
                                                            >
                                                                <FaEdit className=" group-hover/button:fill-white" />
                                                            </Link>
                                                            <TooltipHover
                                                                message={
                                                                    "Edit Data"
                                                                }
                                                            />
                                                        </div>

                                                        <div className="relative inline-flex group">
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        produk[
                                                                            "id"
                                                                        ],
                                                                    )
                                                                }
                                                                className="action-btn action-btn-warning group/button"
                                                            >
                                                                <FaTrash className="scale-125 group-hover/button:fill-white" />
                                                            </button>
                                                            <TooltipHover
                                                                message={
                                                                    "Hapus Data"
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                ) : (
                                                    <td className="space-x-2 text-center whitespace-nowrap text-nowrap">
                                                        <div className="relative inline-flex group">
                                                            <button
                                                                as="button"
                                                                className="action-btn group/button action-btn-success "
                                                            >
                                                                <span className="group-hover:text-white">
                                                                    Lihat
                                                                </span>
                                                                <FaEye className="ml-2 scale-125 group-hover/button:fill-white " />
                                                            </button>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination
                                datas={produks}
                                urlRoute={`/admin/produk`}
                                filters={{
                                    byKategori: filtersReq.byKategori,
                                    byStatus: filtersReq.byStatus,
                                    search: filtersReq.search,
                                }}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                {!subTitle
                                    ? "Belum Ada Data Produk Terbaru Untuk Saat Ini"
                                    : "Tidak Ditemukan"}
                            </h2>
                        </div>
                    )}
                </section>
            </main>
        </Authenticated>
    );
}
