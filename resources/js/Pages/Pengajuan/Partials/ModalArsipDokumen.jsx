import {
    InputError,
    InputLabel,
    Modal,
    TextInput,
} from "@/Components";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

export default function ModalArsipDokumen({ pengajuan, setActiveModal, activeModal }) {
    const { folderArsipList, auth } = usePage().props;
    const role = auth.user.role;
    const fileName = pengajuan.approved_pak_path
    ?.split("/")
    .pop()
    .replace(".pdf", "");

    const { data, setData, reset, post, processing, errors,  } =
        useForm({
            user_nip: auth.user.nip ?? null,
            nip_pak: pengajuan.riwayat_pak.pegawai['NIP'],
            folder_name: '',
            title: fileName, //default nama PAK
            approved_pak_path: pengajuan.approved_pak_path,
            tanggal_divalidasi: pengajuan.tanggal_divalidasi, //default nama PAK
        });

    function formatRoleToRoute(label) {
        return label.trim().toLowerCase().replace(/\s+/g, "-");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route(`${formatRoleToRoute(role)}.arsip-dokumen.store`), {
            preserveState: true,
            preserveScroll: true,
            onError: (errors) => {
                alert(errors);
            },
        });
    };

    const [search, setSearch] = useState("");
    const [folderNameList, setFolderNameList] = useState(folderArsipList || []);

    const folderNamesFiltered = folderNameList?.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
    );

    const onSelect = (folderName) => {
        setSearch(folderName); // Set input search agar berubah
        setData("folder_name", folderName); //setData Form
    };

    const onAddNewFolder = () => {
        const newFolder = search.trim();
        if (!newFolder) return;

        const exists = folderNameList.some(
            (name) => name.toLowerCase() === newFolder.toLowerCase()
        );

        if (!exists) {
            setFolderNameList((prev) => [...prev, newFolder]);
        }

        setData("folder_name", newFolder);
        setSearch(newFolder);
    };
    const modalId = `ModalArsipDokumen-${pengajuan.id}`;

    return (
        <Modal
        id={modalId} // agar Swal bisa target
        show={activeModal === modalId}
        onClose={() => setActiveModal(null)} // agar modal bisa ditutup dengan onClose
        maxWidth="2xl"
    >
            <section className="content-between w-full mx-auto overflow-auto p-7 space-y-7">
                <strong className="block text-xl text-center">Arsipkan Dokumen</strong>
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <fieldset>
                        <div className="relative laptop:w-full">
                            <InputLabel
                                forName="folder_name"
                                value="Nama Folder"
                            />
                            <TextInput
                                id="folder_name"
                                type="text"
                                name="folder_name"
                                className="block w-full mt-1 h-11"
                                placeholder="Ketik & pilih nama folder/buat folder baru"
                                maxLength={70}
                                // value={data.folder_name}
                                defaultValue={data.folder_name}
                                isFocused={true}
                                list="folderNameList"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <datalist
                                id="folderNameList"
                                className="invisible hidden bg-slate-400 "
                            >
                                {folderNameList?.map((item) => (
                                    <option value={item} />
                                ))}
                            </datalist>

                            {search && (
                                <ul className="mt-2 overflow-y-auto border rounded-md max-h-48 ">
                                    {folderNamesFiltered.length > 0 ? (
                                        folderNamesFiltered.map((item, i) => (
                                            <li
                                                key={i}
                                                className="p-2 cursor-pointer hover:bg-blue-100"
                                                onClick={() => onSelect(item)}
                                            >
                                                <a>
                                                    <FaCheck className="inline mx-2 scale-125 fill-success " />
                                                    Folder Terpilih Untuk Arsip
                                                    Dokumen :{" "}
                                                    <span className="font-bold">
                                                        {item}
                                                    </span>
                                                </a>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="flex items-center justify-between p-2 italic text-gray-500 ">
                                            <span>Tidak ditemukan.</span>
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-1 p-1 rounded-md action-btn-success hover:bg-bermuda/20 bg-hijau/10 group/button"
                                                onClick={onAddNewFolder}
                                            >
                                                Tambah Folder Baru
                                                <FaPlus className="inline scale-125 stroke-hijau" />
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            )}
                            <InputError
                                message={errors.folder_name}
                                className="mt-2"
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="relative laptop:w-full">
                            <InputLabel forName="title" value="Judul Dokumen" />
                            <TextInput
                                id="title"
                                type="text"
                                name="title"
                                className="block w-full mt-1 h-11"
                                defaultValue={data.title}
                                placeholder="Ketik judul untuk dokumen"
                                isFocused={true}
                                maxLength={150}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>
                    </fieldset>

                    <div className="flex justify-end mt-4 space-x-3">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 text-sm font-medium text-white transition duration-200 rounded-md bg-sky-600 hover:bg-sky-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </section>
            </Modal>
    );
}
