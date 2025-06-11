import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { GoQuestion } from "react-icons/go";
import { TooltipHover } from "@/Components";
import moment from "moment/min/moment-with-locales";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function DynamicTableSection({
    title,
    tooltipMessage,
    columns,
    data,
    onAdd,
    onEdit,
    onDelete,
    addButtonText = "Tambah Data",
    sortField = "nilai",
    showHeader = true,
    defaultConfig,
    withAction = true,
}) {
    moment.locale("id");
    // console.log('data')

    const [dataForm, setDataForm] = useState({
        updateName: title, // Langsung isi dengan title
        value: defaultConfig || "", // Langsung isi dengan defaultConfig
    });

    // Cek apakah item aktif (untuk tebusan)
    const isTebusanActive = (itemId) => {
        // Saya ga ngerti kode diabwah, tapi kayny pengecekanny salah
        // if (!title.includes("Tebusan")) return false;
        // const tebusanConfig = data.find(
        //     (d) => d.name === title
        // )?.default_config;
        // if (!tebusanConfig) return false;
        // return tebusanConfig.some(
        //     (config) => config.id === itemId && config.checked
        // );
    };

    // Cek default config (untuk non-tebusan)
    const isDefault = (itemId) => {
        return itemId == defaultConfig;
    };

    const handleSetDefaultTebusan = async (id) => {
        if (!id) return;

        try {
            const isTebusan = title.includes("Tebusan");
            const payload = {
                updateName: title,
                value: isTebusan
                    ? JSON.stringify({ id: id, toggle: true })
                    : id,
                _token: document.querySelector('meta[name="csrf-token"]')
                    .content,
            };

            // Membuat headers secara dinamis berdasarkan isTebusan
            const headers = {
                Accept: "application/json",
            };

            // Hanya tambahkan Content-Type jika isTebusan true
            if (isTebusan) {
                headers["Content-Type"] = "application/json";
            }

            const response = await router.post(
                route("divisi-sdm.aturan-pak.set-default-config"),
                payload,
                {
                    preserveState: true,
                    preserveScroll: true,
                    headers: headers, // Gunakan headers yang sudah dibuat
                }
            );

            if (response?.data?.success) {
                await refreshData();
                Swal.fire("Berhasil!", response.data.message, "success");
            }
        } catch (err) {
            Swal.fire(
                "Gagal!",
                err.response?.data?.message || "Terjadi kesalahan",
                "error"
            );
        }
    };

    const handleSetDefault = async (id) => {
        if (!id) {
            console.error("ID tidak valid:", id);
            return;
        }

        try {
            // Buat objek form data langsung
            const formData = {
                updateName: title,
                value: id,
            };

            // Update state dan langsung gunakan nilai baru
            setDataForm(formData);

            const response = await router.post(
                route("divisi-sdm.aturan-pak.set-default-config"),
                formData, // Gunakan objek langsung, bukan dataForm
                {
                    preserveState: false,
                    preserveScroll: true,
                }
            );

            if (response?.error) {
                throw new Error(response.error);
            }
        } catch (err) {
            console.error("Gagal mengupdate default:", err);
            Swal.fire({
                title: "Gagal!",
                text: err.message || "Terjadi kesalahan saat menyimpan",
                icon: "error",
            });
        }
    };
    // console.log('data dynamic table section ', title,' : ' ,  data)
    const CheckLastIdx = (idx, arr) => idx === arr.length - 1;
    return (
        <section className="flex flex-col flex-1">
            {/* Header */}
            {showHeader && (
                <div className="flex justify-between">
                    <strong className="text-2xl">{title}</strong>
                    <div className="relative group">
                        <GoQuestion className="w-10 h-10 hover:fill-secondary hover:stroke-secondary" />
                        <TooltipHover
                            className="text-sm w-36"
                            message={tooltipMessage}
                        />
                    </div>
                </div>
            )}

            {/* Tabel */}
            <div className="flex-1 overflow-auto pt-7">
                <table className="table w-full text-sm table-bordered">
                    <thead className="text-base font-medium text-white bg-primary">
                        <tr>
                            <th
                                scope="col"
                                className="rounded-tl-xl"
                                width="3%"
                            >
                                No
                            </th>
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    scope="col"
                                    width={col.width}
                                    className={
                                        col.center
                                            ? "text-center text-nowrap whitespace-nowrap"
                                            : "text-nowrap whitespace-nowrap"
                                    }
                                >
                                    {col.header}
                                </th>
                            ))}
                            <th
                                scope="col"
                                width="20%"
                                className={
                                    !withAction
                                        ? "rounded-tr-xl text-center"
                                        : "text-center"
                                }
                            >
                                Diperbarui
                            </th>
                            {withAction && (
                                <th
                                    scope="col"
                                    className="text-center rounded-tr-xl"
                                >
                                    Aksi
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="border-secondary/15">
                        {data
                            ?.sort((a, b) => a[sortField] - b[sortField])
                            .map((item, i) => (
                                <tr key={i} className="group/item ">
                                    <td className="font-bold text-center">
                                        {i + 1}
                                    </td>
                                    {columns.map((col, idx) => (
                                        <td
                                            onClick={() => {
                                                if (!withAction) return;

                                                if (
                                                    item.id &&
                                                    title.includes("Tebusan")
                                                ) {
                                                    handleSetDefaultTebusan(
                                                        item.id
                                                    );
                                                } else {
                                                    handleSetDefault(item.id);
                                                }
                                            }}
                                            key={idx}
                                            className={[
                                                "cursor-pointer relative group",
                                                "font-semibold",
                                                col.center && "text-center",
                                                withAction &&
                                                    "hover:text-secondary hover:bg-secondary/15",
                                                withAction &&
                                                title.includes("Tebusan")
                                                    ? isTebusanActive(item.id)
                                                        ? "bg-blue-50"
                                                        : "bg-slate-600"
                                                    : withAction &&
                                                      isDefault(item.id)
                                                    ? "bg-green-50"
                                                    : "",
                                            ]
                                                .filter(Boolean)
                                                .join(" ")}
                                        >
                                            {/* Conditional rendering yang benar */}
                                            {/* ANCHOR */}

                                            {title.includes("Tebusan") ? (
                                                <div className="flex items-center gap-2">
                                                    <span>
                                                        {item.pihak_tebusan}{" "}
                                                        {isTebusanActive(
                                                            item.id
                                                        )}
                                                    </span>
                                                    {withAction &&
                                                        isTebusanActive(
                                                            item.id
                                                        ) && (
                                                            <span className="text-white bg-green-500 badge">
                                                                Aktif
                                                            </span>
                                                        )}
                                                </div>
                                            ) : (
                                                <span>
                                                    {col.percent
                                                        ? `${item[col.field]}%`
                                                        : item[col.field]}

                                                    {/* If Default Value Setted(Divisi SDM View) */}
                                                    {withAction &&
                                                        item.id ==
                                                            defaultConfig && (
                                                            <span className="badge-optional">
                                                                Default
                                                            </span>
                                                        )}
                                                </span>
                                            )}
                                            {withAction && (
                                                <TooltipHover
                                                    className="text-sm w-36"
                                                    message="Atur sebagai default"
                                                />
                                            )}
                                        </td>
                                    ))}
                                    <td className="text-sm text-center text-nowrap">
                                        {moment(item.updated_at).fromNow()}
                                    </td>
                                    {withAction && (
                                        <td className="p-3 text-center whitespace-nowrap">
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="transition-all scale-100 hover:scale-125 group/button text-secondary action-btn hover:bg-secondary "
                                            >
                                                <FaEdit className="fill-secondary group-hover/button:fill-white" />
                                            </button>
                                            <span className="inline-block mx-1"></span>
                                            <button
                                                onClick={() =>
                                                    onDelete(item.id, title)
                                                }
                                                className="transition-all scale-100 hover:scale-125 group/button text-warning/80 action-btn hover:bg-warning/80"
                                            >
                                                <FaTrash className="fill-warning/80 group-hover/button:fill-white" />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Tombol Tambah */}
            {withAction && (
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onAdd}
                        className="text-white scale-95 btn glass bg-sky-600 hover:bg-primary/90"
                    >
                        {addButtonText}
                        <IoMdAdd className="w-6 h-6" />
                    </button>
                </div>
            )}
        </section>
    );
}
