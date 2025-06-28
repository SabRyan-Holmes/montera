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
        const selectedPage = event.selected + 1;

        const filteredQuery = Object.fromEntries(
            Object.entries(filters).filter(
                ([_, value]) => value && value !== DEFAULT_CATEGORY
            )
        );

        router.get(
            urlRoute,
            {
                page: selectedPage,
                ...filteredQuery,
            },
            {
                replace: true,
                preserveState: true,
            }
        );
    };

    return (
        <div className="mb-8 text-sm box-footer">
            <div className="items-center justify-between sm:flex">
                <div className="flex items-center text-xs">
                    showing {datas.data.length} Entries{" "}
                    <TiArrowRight className="w-5 h-5" />
                </div>
                <ReactPaginate
                    breakLabel={<span>...</span>}
                    nextLabel={
                        datas.next_page_url && (
                            <a
                                className="inline-flex items-center gap-2 px-2 py-1 font-semibold leading-none border rounded-md group/next dark:text-white/70 text-primary hover:text-white hover:border hover:bg-primary/75 border-primary"
                                href="#"
                            >
                                <span className="sr-only">Next</span>
                                <span aria-hidden="true">Next</span>
                                <MdOutlineKeyboardDoubleArrowRight className="w-4 h-4 -ml-1 fill-primary group-hover/next:fill-white" />
                            </a>
                        )
                    }
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    pageCount={datas.last_page}
                    previousLabel={
                        datas.prev_page_url && (
                            <a
                                className="inline-flex items-center gap-2 px-2 py-1 font-semibold leading-none border rounded-md group/next dark:text-white/70 text-primary hover:text-white hover:border hover:bg-primary/75 border-primary"
                                href="#"
                            >
                                <MdOutlineKeyboardDoubleArrowLeft className="w-4 h-4 -mr-1 fill-primary group-hover/next:fill-white" />
                                <span className="sr-only">Prev</span>
                                <span aria-hidden="true">Prev</span>
                            </a>
                        )
                    }
                    renderOnZeroPageCount={null}
                    containerClassName="flex items-center text-center justify-center mt-8 mb-4 gap-4"
                    pageClassName="border border-solid border-primary text-center hover:bg-primary hover:text-base-100 w-6 h-6 flex items-center text-primary justify-center rounded-md"
                    activeClassName="bg-primary text-white"
                    className="flex justify-end gap-2"
                />
            </div>
        </div>
    );
}
