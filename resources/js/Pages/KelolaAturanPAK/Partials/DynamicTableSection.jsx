import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { GoQuestion } from "react-icons/go";
import { TooltipHover } from "@/Components";
import moment from "moment/min/moment-with-locales";


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
}) {
    moment.locale("id");
    console.log('data')
    console.log(data)
    return (
        <section className="flex flex-col flex-1">
            {/* Header */}
            {showHeader && (
                <div className="flex justify-between">
                    <strong className="text-2xl">{title}</strong>
                    <div className="relative group">
                        <GoQuestion className="w-10 h-10" />
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
                                width="5%"
                            >
                                No
                            </th>
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    scope="col"
                                    width={col.width}
                                    className={col.center ? "text-center" : ""}
                                >
                                    {col.header}
                                </th>
                            ))}
                            <th scope="col" width="20%">
                                Terakhir Diubah
                            </th>
                            <th
                                scope="col"
                                className="text-center rounded-tr-xl"
                            >
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border-secondary/15">
                        {data?.sort((a, b) => a[sortField] - b[sortField])
                            .map((item, i) => (
                                <tr
                                    key={i}
                                    className="group/item hover:bg-secondary/50 hover:cursor-pointer"
                                >
                                    <td className="font-bold text-center">{i + 1}</td>
                                    {columns.map((col, idx) => (
                                        <td
                                            key={idx}
                                            className={
                                                col.center
                                                    ? "font-semibold text-center"
                                                    : "font-semibold"
                                            }
                                        >
                                            {col.percent
                                                ? `${item[col.field]}%`
                                                : item[col.field]}
                                        </td>
                                    ))}
                                    <td className="text-sm text-center">
                                        {moment(item.updated_at).fromNow()}
                                    </td>
                                    <td className="p-3 text-center whitespace-nowrap">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center scale-125 hover:scale-[1.3] transition-all group/button group-hover/item:bg-secondary group-hover/item:text-white text-secondary action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                        >
                                            <FaEdit className="fill-secondary group-hover/item:fill-white" />
                                        </button>
                                        <span className="inline-block mx-1"></span>
                                        <button
                                            onClick={() =>
                                                onDelete(item.id, title)
                                            }
                                            className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center text-red-500 hover:scale-[1.3] transition-all scale-125 group/button group-hover/item:bg-red-500 group-hover/item:text-white action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                        >
                                            <FaTrash className="fill-red-500 group-hover/item:fill-white" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Tombol Tambah */}
            <div className="flex justify-end mt-6">
                <button
                    onClick={onAdd}
                    className="text-white scale-95 btn glass bg-sky-600 hover:bg-primary/90"
                >
                    {addButtonText}
                    <IoMdAdd className="w-6 h-6" />
                </button>
            </div>
        </section>
    );
}
