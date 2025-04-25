import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
    MdPersonSearch,
} from "react-icons/md";
import { FaEye, FaEdit } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link, router } from "@inertiajs/react";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import { InputLabel } from "@/Components";
import { TiArrowRight } from "react-icons/ti";
import { FaTrash } from "react-icons/fa6";

export default function Index({
    auth,
    // pegawais,
    title,
    flash,
    subTitle,
    // searchReq: initialSearch,
    // byDaerahReq: initialDaerah,
    // byJabatanReq: initialJabatan,
}) {


    return (
        <Authenticated user={auth.user} title={title}>
            <section className="mx-auto phone:h-screen laptop:h-full max-w-screen-laptop px-7">


                {/* <div className="mb-8 text-sm box-footer">
                    <div className="items-center justify-between sm:flex">
                        <div className="flex items-center text-xs">
                            showing {pegawais.data.length} Entries{" "}
                            <TiArrowRight className="w-5 h-5" />
                        </div>
                        <ReactPaginate
                            breakLabel={<span>...</span>}
                            nextLabel={
                                pegawais.next_page_url && (
                                    <a
                                        className="inline-flex items-center gap-2 px-2 py-1 font-semibold leading-none border rounded-md group/next dark:text-white/70 text-primary hover:text-white hover:border hover:bg-primary/75 border-primary"
                                        href={pegawais.next_page_url}
                                        onClick={() => setNum(num + 1)}
                                    >
                                        <span className="sr-only">Next</span>
                                        <span aria-hidden="true">Next</span>
                                        <MdOutlineKeyboardDoubleArrowRight className="w-4 h-4 -ml-1 fill-primary group-hover/next:fill-white" />
                                    </a>
                                )
                            }
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={1}
                            pageCount={pegawais.last_page}
                            previousLabel={
                                pegawais.prev_page_url && (
                                    <a
                                        className="inline-flex items-center gap-2 px-2 py-1 font-semibold leading-none border rounded-md group/next dark:text-white/70 text-primary hover:text-white hover:border hover:bg-primary/75 border-primary"
                                        href={pegawais.next_page_url}
                                        onClick={() => setNum(num + 1)}
                                    >
                                        <MdOutlineKeyboardDoubleArrowLeft className="w-4 h-4 -mr-1 fill-primary group-hover/next:fill-white" />
                                        <span className="sr-only">Prev</span>
                                        <span aria-hidden="true">Prev</span>
                                    </a>
                                )
                            }
                            renderOnZeroPageCount={null}
                            containerClassName={
                                "flex items-center text-center justify-center mt-8 mb-4 gap-4 "
                            }
                            pageClassName="border border-solid border-primary text-center hover:bg-primary hover:text-base-100 w-6 h-6 flex items-center text-primary justify-center rounded-md"
                            activeClassName="bg-primary text-white"
                            className="flex justify-end gap-2"
                        />
                    </div>
                </div> */}
            </section>
        </Authenticated>
    );
}
