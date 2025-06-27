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
    defaultConfig = false,
    withAction = true,
}) {
    moment.locale("id");

    const [dataForm, setDataForm] = useState({
        updateName: title, // Langsung isi dengan title
        value: defaultConfig || "", // Langsung isi dengan defaultConfig
    });

    // Cek apakah item aktif (untuk tebusan)
    const isTebusanActive = (itemId) => {
        // ANCHOR
        // Saya ga ngerti kode diabwah, tapi kayny pengecekanny salah
        if (!isTebusan) return false;
        const tebusanConfig = data.find(
            (d) => d.name === title
        )?.default_config;
        if (!tebusanConfig) return false;
        return tebusanConfig.some(
            (config) => config.id === itemId && config.checked
        );
    };

    // Cek default config (untuk non-tebusan)
    const isDefault = (itemId) => {
        return itemId == defaultConfig;
    };

    const handleSetDefaultTebusan = async (id) => {
        if (!id) return;

        try {
            const tipePenetapan = "Tebusan " + title.trim().split(" ")[0];
            const payload = {
                updateName: tipePenetapan, // contoh: "Tebusan Konversi"
                isTebusan: true,
                target_id: id, // ganti nama field biar gak ambigu
            };

            router.post(
                route("divisi-sdm.aturan-pak.set-default-config"),
                payload,
                {
                    preserveState: true,
                    preserveScroll: true,
                    onError: (err) => alert("Gagal: " + JSON.stringify(err)),
                }
            );
        } catch (err) {
            Swal.fire("Error!", err.message || "Gagal toggle tebusan", "error");
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

            const response = router.post(
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

    const isTebusan = ["Konversi", "Akumulasi", "Penetapan"].some((keyword) =>
        title.includes(keyword)
    );

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

                                                if (isTebusan) {
                                                    handleSetDefaultTebusan(
                                                        item.id
                                                    );
                                                } else if (defaultConfig) {
                                                    handleSetDefault(item.id);
                                                }
                                            }}
                                            key={idx}
                                            className={[
                                                "relative group",
                                                "font-semibold",
                                                col.center && "text-center",
                                                withAction &&
                                                (defaultConfig || isTebusan)
                                                    ? "cursor-pointer hover:text-secondary hover:bg-secondary/15"
                                                    : "",
                                            ]
                                                .filter(Boolean)
                                                .join(" ")}
                                        >
                                            {/* TODO: Benerin lagi tampilan untuk tebusan dan bisa diatur defaultny*/}

                                            {isTebusan ? (
                                                <div className="flex items-center gap-2">
                                                    <span>
                                                        {item.pihak_tebusan}{" "}
                                                        {"id : "} {item.id}
                                                        {isTebusanActive(
                                                            item.id
                                                        )}
                                                    </span>
                                                    {withAction &&
                                                        item.checked ===
                                                            true && (
                                                            <span className="badge-xs-primary">
                                                                Aktif
                                                            </span>
                                                        )}
                                                </div>
                                            ) : (
                                                <span>
                                                    {col.percent
                                                        ? `${item[col.field]}%`
                                                        : item[col.field]}
                                                    {withAction &&
                                                        item.id ==
                                                            defaultConfig && (
                                                            <span className="badge-xs-secondary">
                                                                Default
                                                            </span>
                                                        )}
                                                </span>
                                            )}
                                            {withAction &&
                                                (defaultConfig ||
                                                    isTebusan) && (
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
