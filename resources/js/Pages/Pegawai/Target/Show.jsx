import { SecondaryButton } from "@/Components";
import { IoCloseOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import DetailTarget from "./Partials/DetailTarget";

export default function ShowModal({ target, handleDelete, canManage = false }) {
    return (
        <dialog
            id={`Show-${target.id}`}
            onClose={() =>
                document.getElementById(`Show-${target.id}`).close()
            }
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
                        Lihat Detail Data Target
                    </h3>

                    <DetailTarget target={target} collapse={false} />
                </div>
            </div>

            {/* Floating Action Button */}
            {canManage && (
                <div className="fixed z-50 flex gap-4 scale-110 -translate-x-1/2 bottom-14 left-1/2">
                    <SecondaryButton
                        asLink
                        href={route("pegawai.target.edit", target.id)}
                    >
                        <FaEdit className="w-4 h-4 mr-1 " />
                        Edit Data
                    </SecondaryButton>

                    <SecondaryButton
                        onClick={() => handleDelete(target.id)}
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
