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
        event?.event?.preventDefault(); // 👈 INI PENTING
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
<div></div>
    );
}
