import { DetailPegawai } from "@/Components";
import React from "react";

import { IoCloseOutline } from "react-icons/io5";

export default function ModalShowPegawai({ pegawai }) {
    return (
        <dialog
            id={`ModalShowPegawai-${pegawai.NIP}`}
            className="modal z-[100]"
        >
            <div className="relative w-full max-w-3xl modal-box">
                <form method="dialog">
                    <button className="absolute btn btn-md btn-circle btn-ghost right-2 top-2">
                        <IoCloseOutline className="w-10 h-10 stroke-accent group-hover/item:fill-white" />
                    </button>
                </form>

                <div className="px-2 my-10 mb-16 overflow-x-auto">
                    <h1 className="my-4 text-xl font-medium">
                        Detail Pegawai Saya (Di Sistem Terkini )
                    </h1>
                    <DetailPegawai pegawai={pegawai} />
                </div>
            </div>
        </dialog>
    );
}
