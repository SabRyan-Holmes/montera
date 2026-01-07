import { SecondaryButton } from "@/Components";
import { IoCloseOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import DetailProduk from "./Partials/DetailProduk";

export default function ShowModal({
    produk,
    setActiveModal,
    handleDelete,
    canManage = false,
}) {
    return (
        <dialog
            id={`Show-${produk.id}`}
            onClose={() => setActiveModal(null)}
            className="modal"
        >
            <div className="relative w-full max-w-3xl modal-box">
                <form method="dialog">
                    <button className="absolute btn btn-md btn-circle btn-ghost right-2 top-2">
                        <IoCloseOutline className="w-10 h-10 stroke-accent group-hover/item:fill-white" />
                    </button>
                </form>

                <div className="px-2 my-10 mb-16 overflow-x-auto">
                    <h3 className="mb-2 text-xl font-bold">
                        Lihat Detail Data Produk
                    </h3>

                    <DetailProduk produk={produk} collapse={false} />
                </div>
            </div>

            {/* Floating Action Button */}
            {canManage && (
                <div className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-14 left-1/2">
                    <SecondaryButton
                        asLink
                        href={route("shared.produk.edit", produk.id)}
                    >
                        <FaEdit className="w-4 h-4 mr-1 " />
                        Edit Data
                    </SecondaryButton>

                    <SecondaryButton
                        onClick={() => handleDelete(produk.id)}
                        className="text-white bg-warning/80"
                    >
                        <FaTrash className="w-4 h-4 mr-1 " />
                        Hapus Data
                    </SecondaryButton>
                </div>
            )}
            {/* Floating Action Button */}
        </dialog>
    );
}
