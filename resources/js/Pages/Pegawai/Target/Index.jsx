import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { FilterSearchCustom, Pagination } from "@/Components";
import { FaEyeSlash } from "react-icons/fa6";
import moment from "moment/min/moment-with-locales";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

export default function Index({
    auth,
    targets,
    title,
    flash,
    subTitle,
    filtersReq,
    filtersList,
}) {
    // ===========================================Pop Up, Modal, Dialog Swal Message===========================================
    const [activeModal, setActiveModal] = useState(null);
    function handleDelete(id) {
        Swal.fire({
            ...(activeModal && { target: `#${activeModal}` }),
            icon: "warning",
            text: "Anda yakin ingin menghapus data target ini?",
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
                router.delete(route("admin.target.destroy", id), {
                    onSuccess: () => {
                        document.getElementById(activeModal).close();
                    },
                    onError: () => {
                        console.log("Gagal Menghapus Data");
                    },
                });
            }
        });
    }

    useEffect(() => {
        if (flash.message) {
            Swal.fire({
                ...(activeModal && { target: `#${activeModal}` }),
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

    // ===========================================Handling Search & Filter===========================================
    moment.locale("id");
    const [showLastUpdated, setShowLastUpdated] = useState(false);
    const role = auth.user.jabatan.nama_jabatan;
    function formatRole(label) {
        return label.trim().toLowerCase().replace(/\s+/g, "-");
    }

    // ===========================================Other Logics===========================================

    return (
        <Authenticated
            user={auth.user}
            title={(role === "Admnistrator" ? "Kelola " : "Daftar ") + title}
        >
            {/* FIX UTAMA DISINI:
                Gw ganti 'laptop:w-screen-laptop' jadi 'w-full'.
                Biar dia ga maksa selebar layar (yg bikin nabrak sidebar), tapi menyesuaikan sisa ruang.
            */}
            <div className="w-full pb-10 mx-auto phone:h-screen laptop:h-full laptop:px-7 max-w-screen-desktop ">
                <section className="flex items-end justify-between gap-4">
                    <div className="flex-1">
                        <FilterSearchCustom
                            routeName={`/pegawai/target`}
                            initialFilters={{
                                byTipe: filtersReq.tipe,
                                byStatus: filtersReq.status,
                            }}
                            filtersConfig={[
                                {
                                    name: "byTipe",
                                    label: "Tipe Target ",
                                    options: filtersList.tipe_target,
                                },
                                {
                                    name: "byPeriode",
                                    label: "Periode ",
                                    options: filtersList.periode,
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
                </section>

                <section className="pt-3 overflow-no-scroll">
                    {subTitle && (
                        <div className="my-4">
                            <strong className="text-2xl font-bold text-gray-600">
                                {subTitle}
                            </strong>
                        </div>
                    )}

                    {targets.data.length > 0 ? (
                        <>
                            {/* --- WRAPPER UTAMA TABEL --- */}
                            {/* overflow-x-auto: Bikin scrollbar cuma ada di box ini
                                w-full: Biar lebarnya ngikutin parent (yg udah kita benerin jadi w-full)
                            */}
                            <div className="w-full mb-4 overflow-x-auto bg-white border border-gray-200 shadow-sm rounded-xl">
                                <table className="table text-xs text-center min-w-max table-bordered">
                                    <thead className="text-sm font-medium text-white bg-primary">
                                        <tr className="text-center">
                                            <th
                                                scope="col"
                                                width="5%"
                                                className="py-3"
                                            >
                                                No
                                            </th>
                                            <th scope="col" className="py-3">
                                                Nama Produk
                                            </th>
                                            <th scope="col" className="py-3">
                                                Kategori
                                            </th>
                                            <th scope="col" className="py-3">
                                                Nilai Target
                                            </th>
                                            <th scope="col" className="py-3">
                                                Tipe Target
                                            </th>
                                            <th scope="col" className="py-3">
                                                Periode
                                            </th>
                                            <th scope="col" className="py-3">
                                                Tahun
                                            </th>
                                            <th scope="col" className="py-3">
                                                Tanggal Mulai
                                            </th>
                                            <th scope="col" className="py-3">
                                                Tanggal Selesai
                                            </th>
                                            <th scope="col" className="py-3">
                                                Deadline Pencapaian
                                            </th>

                                            {/* Header Aksi & Updated */}
                                            <>
                                                <th
                                                    scope="col"
                                                    width="10%"
                                                    className="py-3 text-center cursor-pointer"
                                                >
                                                    <div className="flex items-center justify-center gap-2">
                                                        {showLastUpdated ? (
                                                            <button
                                                                className="action-btn hover:scale-[1.15] hover:bg-bermuda"
                                                                onClick={() =>
                                                                    setShowLastUpdated(
                                                                        !showLastUpdated
                                                                    )
                                                                }
                                                            >
                                                                <FaEyeSlash className="mr-1 text-white" />
                                                                Diperbarui
                                                            </button>
                                                        ) : (
                                                            <div className="flex items-center justify-center gap-2">
                                                                <button
                                                                    className="action-btn hover:scale-125 hover:bg-bermuda"
                                                                    onClick={() =>
                                                                        setShowLastUpdated(
                                                                            !showLastUpdated
                                                                        )
                                                                    }
                                                                >
                                                                    <TbLayoutSidebarLeftCollapse className="mr-1 text-white" />
                                                                </button>
                                                                <span>
                                                                    Aksi
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </th>
                                                {showLastUpdated && (
                                                    <th
                                                        scope="col"
                                                        className="py-3 text-center"
                                                    >
                                                        Aksi
                                                    </th>
                                                )}
                                            </>
                                        </tr>
                                    </thead>

                                    {/* BODY: Overflow dihapus dari sini biar ga error */}
                                    <tbody>
                                        {targets.data?.map((target, i) => (
                                            <tr
                                                key={target.id}
                                                className="border-b border-gray-100 hover:bg-gray-50"
                                            >
                                                <td className="py-3 text-center">
                                                    {i +
                                                        1 +
                                                        (targets.meta?.from ||
                                                            1) -
                                                        1}
                                                </td>
                                                <td className="relative px-2 py-3 text-left group ">
                                                    <span className="block font-semibold">
                                                        {target.produk
                                                            ?.nama_produk ??
                                                            "-"}
                                                    </span>
                                                    <span className="badge-xs-accent">
                                                        {target.produk?.satuan}
                                                    </span>
                                                </td>
                                                <td className="px-2 py-3 text-center ">
                                                    <span className="block mb-1">
                                                        {target.produk
                                                            ?.kategori_produk ??
                                                            "-"}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <span className="block font-medium">
                                                        {target.nilai_target}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <span className="block capitalize">
                                                        {target.tipe_target}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <span className="block capitalize">
                                                        {target.periode}
                                                    </span>
                                                </td>
                                                <td className="py-3">
                                                    <span className="block">
                                                        {target.tahun}
                                                    </span>
                                                </td>
                                                <td className="py-3 whitespace-nowrap">
                                                    <span className="block">
                                                        {moment(
                                                            target.tanggal_mulai
                                                        ).format("LL")}
                                                    </span>
                                                </td>
                                                <td className="py-3 whitespace-nowrap">
                                                    <span className="block">
                                                        {moment(
                                                            target.tanggal_selesai
                                                        ).format("LL")}
                                                    </span>
                                                </td>
                                                <td className="py-3 whitespace-nowrap">
                                                    <span className="block font-medium text-red-500">
                                                        {moment(
                                                            target.deadline_pencapaian
                                                        ).format("LL")}
                                                    </span>
                                                </td>

                                                {/* Last Updated */}
                                                <td
                                                    className={`font-normal text-center whitespace-nowrap ${
                                                        !showLastUpdated &&
                                                        "hidden"
                                                    }`}
                                                >
                                                    <span className="block">
                                                        {moment(
                                                            target.updated_at
                                                        ).format("LL")}
                                                    </span>
                                                    <span className="block text-[12px] text-gray-400">
                                                        {moment(
                                                            target.updated_at
                                                        ).fromNow()}
                                                    </span>
                                                </td>

                                                {/* Aksi */}
                                                <td className="py-3 space-x-2 text-center whitespace-nowrap text-nowrap">
                                                    <div className="relative inline-flex group">
                                                        <button
                                                            onClick={() => {
                                                                setActiveModal(
                                                                    `Show-${target.id}`
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        const el =
                                                                            document.getElementById(
                                                                                `Show-${target.id}`
                                                                            );
                                                                        if (el)
                                                                            el.showModal();
                                                                    },
                                                                    50
                                                                );
                                                            }}
                                                            className="action-btn group/button action-btn-success"
                                                        >
                                                            <span className="block mr-1 group-hover/button:text-white">
                                                                Lihat
                                                            </span>
                                                            <FaEye className="scale-125 group-hover/button:fill-white" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                datas={targets}
                                urlRoute={`/pegawai/target`}
                                filters={{
                                    search: filtersReq.search,
                                    byTipe: filtersReq.tipe_target,
                                    byPeriode: filtersReq.periode,
                                }}
                            />
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-96">
                            <h2 className="text-2xl font-bold text-gray-600">
                                {!subTitle
                                    ? "Belum Ada Data Target Terbaru Untuk Saat Ini"
                                    : "Tidak Ditemukan"}
                            </h2>
                        </div>
                    )}
                </section>
            </div>
        </Authenticated>
    );
}
