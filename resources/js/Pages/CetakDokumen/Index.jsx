import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdPersonSearch } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
import html2canvas from "html2canvas-pro";
import PAK from "@/Pages/CetakDokumen/PAK";
import { Link } from "@inertiajs/react";
import ReactPaginate from "react-paginate";
import { InputLabel } from "@/Components";

export default function Index({
    auth,
    pegawais,
    title,
    search,
    subTitle,
    byDaerah,
}) {
    function printDocument() {
        html2canvas(document.querySelector("#capture")).then((canvas) => {
            document.body.appendChild(canvas); // if you want see your screenshot in body.
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 0, 0);
            // pdf.save("download.pdf");

            pdf.output("dataurlnewwindow");
        });
    }

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        console.log("isi event", event);
        const newOffset =
            (event.selected * pegawais.per_page) % pegawais.last_page;

        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );

        // window.location = `/cetak_dokumen/pegawai?page=${event.selected + 1}`;
        setItemOffset(newOffset);
        // const target = `/cetak_dokumen?page=${event.selected + 1}`;
        // browserHistory.push({
        //     pathname: target,
        // });
    };

    // useEffect(() => {
    //     window.location = `/cetak_dokumen?page=${active}`;
    //     setPageChange(false)
    // }, [selectedPage]);

    //TODO: Logic Kategori  Daerah
    // const [daerah, setDaerah] = useState(null);
    // useEffect(() => {
    //   first

    //   return () => {
    //     second
    //   }
    // }, [setDaerah])

    //TODO: Logic Kategori  Jabatan/Pangkat
    // const [daerah, setDaerah] = useState(null);

    console.log("isi req byDaerah", byDaerah);
    return (
        <Authenticated user={auth.user} title={title}>
            <section className="phone:h-screen laptop:h-full max-w-screen-desktop mx-6">
                <h1 className="my-10 text-3xl ">
                    Data Pejabat Fungsional 2024
                </h1>

                <div className="flex gap-4 m-3  items-center">
                    <div className="flex-none w-72">
                        <p className="text-lg ml-1">Jabatan</p>
                        <select
                            className="select w-full max-w-xs text-sm border border-gradient selection:text-accent  disabled:text-accent"
                            name="byJabatan"
                            defaultValue={"Semua Kategori"}
                            // onChange={(e) => setDaerah(e.target.value)}
                        >
                            <option disabled value={null} className="">
                                Semua Kategori
                            </option>
                            <option>Statistisi Ahli Muda</option>
                            <option>Statistisi Ahli Penyelia</option>
                            <option>Statistisi Ahli Pertama</option>
                            <option>Statistisi Ahli Terampil</option>
                            <option>Statistisi Mahir</option>
                        </select>
                    </div>
                    <div className="flex-none w-72">
                        <InputLabel
                            value="Daerah"
                            Htmlfor="Daerah"
                            className="max-w-sm text-lg  ml-1"
                        />

                        <select
                            className="select w-full max-w-xs text-sm border border-gradient selection:text-accent  disabled:text-accent"
                            name="byDaerah"
                            id="byDaerah"
                            defaultValue={"Semua Kategori"}
                            onChange={(e) => setDaerah(e.target.value)}
                        >
                            <option disabled value={null} className="">
                                Semua Kategori
                            </option>
                            <option>PROVINSI JAMBI</option>
                            <option>KOTA JAMBI</option>
                            <option>KERINCI</option>
                            <option>MUARO JAMBI</option>
                            <option>BATANG HARI</option>
                            <option>SAROLANGUN</option>
                            <option>TANJAB BARAT</option>
                            <option>TANJAB TIMUR</option>
                            <option>MERANGIN</option>
                            <option>SUNGAI PENUH</option>
                            <option>BUNGO</option>
                            <option>TEBO</option>
                        </select>
                    </div>
                    <div className="flex-none  w-80">
                        <InputLabel
                            value="Nama/NIP"
                            Htmlfor="search"
                            className="max-w-sm text-lg ml-1"
                        />
                        <form className="max-w-sm mx-auto ">
                            {byDaerah && (
                                <input
                                    type="hidden"
                                    name="byDaerah"
                                    defaultValue=""
                                    value={byDaerah}
                                />
                            )}
                            <label
                                htmlFor="search"
                                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                            >
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <MdPersonSearch className="w-6 h-6 fill-primary" />
                                </div>
                                <input
                                    type="search"
                                    id="search"
                                    defaultValue={search}
                                    name="search"
                                    className=" w-full p-4 pl-10 text-sm placeholder:text-accent text-gray-900 border-2 bg-slate-100/60 border-t-primary border-l-primary border-r-secondary border-b-hijau focus:border-primary/40 focus:ring-1 focus:ring-opacity-60 focus:ring-primary rounded-md bg-gray-50  focus:border-blue-500"
                                    placeholder="Cari Nama Pegawai/NIP.."
                                />
                                <button className="text-white bg-primary absolute end-2.5 bottom-2.5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="table-bordered rounded-sm overflow-auto pt-3">
                    <table className="ti-custom-table ti-custom-table-head table-xs table">
                        <thead className="">
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">NIP</th>
                                <th scope="col">Nama</th>
                                {/* <th scope="col">No Seri Karpeg</th> */}
                                <th scope="col ">Jabatan</th>
                                {/* <th scope="col">Unit Kerja</th> */}
                                <th scope="col">Daerah</th>
                                <th scope="col" className="flex justify-center">
                                    {" "}
                                    <span className="mx-auto ">Aksi</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {pegawais.data?.map((pegawai, i) => (
                                <Link
                                    as="tr"
                                    href={route(
                                        "cetak_dokumen.create",
                                        pegawai.id
                                    )}
                                    key={i}
                                    className="hover:bg-secondary hover:cursor-pointer"
                                >
                                    <td className="text-center">{i + 1}</td>
                                    <td>{pegawai["NIP/NRP"]}</td>
                                    <td>{pegawai.Nama}</td>
                                    {/* <td>{pegawai["Nomor Seri Karpeg"]}</td> */}
                                    <td>
                                        {
                                            //   const jabatanOnly = pegawai["Jabatan/TMT"].split("/")[0].trim();
                                            pegawai["Jabatan/TMT"]
                                                .split("/")[0]
                                                .trim()
                                        }
                                    </td>
                                    <td>{pegawai["Daerah"]}</td>
                                    <td className="">
                                        <a
                                            className="hover:text-primary flex items-center gap-2"
                                            href="/cetak_dokumen/cetak"
                                            target="_blank"
                                        >
                                            Cetak PAK <FaPrint />
                                        </a>
                                    </td>
                                </Link>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="box-footer mb-8">
                    <div className="sm:flex items-center justify-between">
                        <div className="flex items-center">
                            showing {pegawais.per_page} Entries{" "}
                            <i className="ri-arrow-right-line ml-2 font-semibold "></i>
                        </div>
                        <ReactPaginate
                            breakLabel={<span>...</span>}
                            nextLabel={
                                pegawais.next_page_url && (
                                    <a
                                        className="text-gray-500 dark:text-white/70 hover:text-primary e py-1 px-2 leading-none inline-flex items-center gap-2 rounded-sm hover:border hover:bg-primary/75 font-semibold border-primary"
                                        href={pegawais.next_page_url}
                                        onClick={() => setNum(num + 1)}
                                    >
                                        <span className="sr-only">Next</span>
                                        <span aria-hidden="true">Next</span>
                                    </a>
                                )
                            }
                            s
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={1}
                            pageCount={pegawais.last_page}
                            previousLabel={
                                pegawais.prev_page_url && (
                                    <a
                                        className="text-gray-500 dark:text-white/70 hover:text-primary e py-1 px-2 leading-none inline-flex items-center gap-2 rounded-sm hover:border hover:bg-primary/75 font-semibold border-primary"
                                        href={pegawais.prev_page_url}
                                    >
                                        <span aria-hidden="true">Prev</span>
                                        <span className="sr-only">
                                            Previous
                                        </span>
                                    </a>
                                )
                            }
                            renderOnZeroPageCount={null}
                            containerClassName={
                                "flex items-center text-center justify-center mt-8 mb-4 gap-4 "
                            }
                            pageClassName="border border-solid border-primary text-center hover:bg-success w-6 h-6 flex items-center justify-center rounded-md"
                            activeClassName="bg-primary"
                            className="justify-end flex gap-2"
                        />
                    </div>
                </div>

                {/* <div className="box-footer">
                    <div className="sm:flex items-center justify-between">
                        <div className="">
                            showing {pegawais.per_page} Entries{" "}
                            <i className="ri-arrow-right-line ml-2 font-semibold"></i>
                        </div>
                        <div className="ltr:ml-auto rtl:mr-auto">
                            <nav className="flex justify-center items-center space-x-2 rtl:space-x-reverse">
                                {pegawais.prev_page_url && (
                                    <a
                                        className="text-gray-500 dark:text-white/70 hover:text-primary e py-1 px-2 leading-none inline-flex items-center gap-2 rounded-sm"
                                        href={pegawais.prev_page_url}
                                    >
                                        <span aria-hidden="true">Prev</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                )}

                                {links.map((link, i) => {
                                    console.log('isi link label', link.label)
                                    console.log('isi current', current)
                                    return (
                                        <a
                                            key={i}
                                            className={
                                                "border  leading-none inline-flex items-center text-sm font-medium rounded-sm bg-indigo-500" +
                                                (link.label != current
                                                    ? "bg-white py-1  px-2 text-2xl"
                                                    : "bg-primary py-1 px-2 text-primary ")
                                            }
                                            href={link.url}
                                            aria-current="page"
                                        >
                                            {link.label}
                                        </a>
                                    );
                                })}

                                {pegawais.next_page_url && (
                                    <a
                                        className="text-gray-500 dark:text-white/70 hover:text-primary e py-1 px-2 leading-none inline-flex items-center gap-2 rounded-sm"
                                        href={pegawais.next_page_url} onClick={()=> setNum(num+1)}
                                    >
                                        <span className="sr-only">Next</span>
                                        <span aria-hidden="true">Next</span>
                                    </a>
                                )}
                            </nav>
                        </div>
                    </div>
                </div> */}
            </section>
        </Authenticated>
    );
}
