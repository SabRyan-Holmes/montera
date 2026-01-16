import { router } from "@inertiajs/react";
import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { TiArrowRight } from "react-icons/ti";
import ReactPaginate from "react-paginate";

const DEFAULT_CATEGORY = "Semua Kategori";

export default function Paginations({ datas, urlRoute, filters }) {
    const handlePageClick = (event) => {
        // ... (Logic handlePageClick sama seperti sebelumnya) ...
        event?.event?.preventDefault();
        const selectedPage = event.selected + 1;

        const filteredQuery = Object.fromEntries(
            Object.entries(filters).filter(
                ([_, value]) => value && value !== DEFAULT_CATEGORY
            )
        );

        router.get(
            urlRoute,
            { page: selectedPage, ...filteredQuery },
            { replace: true, preserveState: true }
        );
    };

    return (
        <div className="py-4 text-sm border-t border-gray-200 pb-11">
            {/* Gunakan Flex-col di mobile, Flex-row di desktop biar responsif */}
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

                {/* Info Entries */}
                <div className="flex items-center text-xs text-gray-500">
                    Showing {datas.from} to {datas.to} of {datas.total} Entries
                    <TiArrowRight className="w-4 h-4 ml-1" />
                </div>

                {/* Komponen Pagination */}
                <ReactPaginate
                    breakLabel={<span className="px-2 text-gray-400">...</span>}
                    nextLabel={
                        datas.next_page_url ? (
                            <span className="flex items-center justify-center w-8 h-8 transition-colors border rounded-md hover:bg-primary hover:text-white border-primary text-primary">
                                <MdOutlineKeyboardDoubleArrowRight className="w-5 h-5" />
                            </span>
                        ) : null
                    }
                    previousLabel={
                        datas.prev_page_url ? (
                            <span className="flex items-center justify-center w-8 h-8 transition-colors border rounded-md hover:bg-primary hover:text-white border-primary text-primary">
                                <MdOutlineKeyboardDoubleArrowLeft className="w-5 h-5" />
                            </span>
                        ) : null
                    }
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1} // Tambah ini biar rapi (1 ... 5)
                    pageCount={datas.last_page}
                    renderOnZeroPageCount={null}

                    // --- CLASS YANG DIPERBAIKI ---
                    containerClassName="flex items-center gap-1" // Container UL
                    pageClassName="block" // Item LI
                    pageLinkClassName="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-md hover:bg-primary hover:text-white border-gray-300 text-gray-600 transition-colors" // Link A
                    activeLinkClassName="!bg-primary !text-white !border-primary" // State Aktif
                    disabledClassName="opacity-50 cursor-not-allowed"
                />
            </div>
        </div>
    );
}
