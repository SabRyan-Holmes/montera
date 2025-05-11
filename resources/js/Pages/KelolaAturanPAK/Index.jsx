import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import { BsPatchQuestion } from "react-icons/bs";
import { GoQuestion } from "react-icons/go";
import { FaTrash } from "react-icons/fa6";
import {
    InputError,
    InputLabel,
    InputLabelCustom,
    PrimaryButton,
    RadioWithLabel,
    SuccessButton,
    TextInput,
} from "@/Components";
import { FaSave, FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import moment from "moment/min/moment-with-locales";

// const [isPopUpOpen, setIsPopUpOpen] = useState(false);
// const [isEdit, setIsEdit] = useState(false);
// const [dataEdit, setDataEdit] = useState(null);

export default function Index({
    auth,
    title,
    flash,
    koefisienPertahun,
    predikatPresentase,
}) {
    moment.locale("id");

    // const koefisienPertahun = Object.entries(DBkoefisienPertahun).map(([jabatan, nilai]) => ({
    //     jabatan,
    //     nilai,
    //   }));

    // console.log(koefisienPertahun)

    return (
        <Authenticated user={auth.user} title={title}>
            <main className="grid content-end w-full h-full grid-cols-2 grid-rows-3 gap-12 mx-auto mt-5 text-slate-600 px-7">
                {/* SECTION : PENANDA TANGAN */}
                <section className="px-4 border rounded-lg mt-7 border-gradient">
                    <div className="m-5">
                        <div className="flex justify-between ">
                            <strong className="text-2xl">Penanda Tangan</strong>
                            <GoQuestion className="w-10 h-10" />
                        </div>

                        <form>
                            {/*  NAMA */}
                            <div className="mt-5">
                                <InputLabelCustom
                                    htmlFor="nama"
                                    value="Nama"
                                    className="text-xl"
                                />

                                <RadioWithLabel
                                    name={"Agus Subidyo"}
                                    value={"Agus Subidyo"}
                                    checked
                                />
                                <RadioWithLabel
                                    name={"Nama Lain"}
                                    value={"Nama Lain"}
                                />

                                <div className="flex">
                                    <RadioWithLabel />
                                    <TextInput
                                        id="nama"
                                        type="text"
                                        name="nama"
                                        className="block w-full mt-1 h-11"
                                        placeholder="Tambahkan Nama Baru"
                                        isFocused={true}
                                        // value={data.nama}
                                        // autoComplete={data.nama}
                                        // onChange={(e) =>
                                        //     setData("nama", e.target.value)
                                        // }
                                    />
                                </div>

                                <InputError
                                    // message={errors.nama}
                                    className="mt-2"
                                />
                            </div>

                            {/* NIP */}
                            <div className="mt-5">
                                <InputLabelCustom
                                    htmlFor="nip"
                                    value="NIP"
                                    className="text-xl"
                                />

                                <RadioWithLabel
                                    name={"197412311996121001"}
                                    value={"197412311996121001"}
                                    checked
                                />
                                <RadioWithLabel
                                    name={"NIP lain"}
                                    value={"NIP Lain"}
                                />

                                <div className="flex">
                                    <RadioWithLabel />
                                    <TextInput
                                        id="nama"
                                        type="text"
                                        name="nama"
                                        className="block w-full mt-1 h-11"
                                        placeholder="Tambahkan Nama Baru"
                                        isFocused={true}
                                        // value={data.nama}
                                        // autoComplete={data.nama}
                                        // onChange={(e) =>
                                        //     setData("nama", e.target.value)
                                        // }
                                    />
                                </div>

                                <InputError
                                    // message={errors.nama}
                                    className="mt-2"
                                />

                                <div className="flex justify-end w-full">
                                    <SuccessButton
                                        type="submit"
                                        className="inline-flex justify-end my-5 "
                                        // disabled={processing}
                                    >
                                        Simpan
                                        <FaSave className="mx-1" />
                                    </SuccessButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>

                {/* SECTION : RUMUS */}
                <section className="px-4 border rounded-lg mt-7 border-gradient">
                    <div className="m-5">
                        <div className="flex justify-between ">
                            <strong className="text-2xl">
                                Rumus Penghitungan PAK
                            </strong>
                            <GoQuestion className="w-10 h-10" />
                        </div>

                        <form>{/*  NAMA */}</form>
                    </div>
                </section>

                {/* SECTION : KOEFISIEN PERTAHUN */}
                <section className="px-4 border rounded-lg mt-7 border-gradient">
                    <div className="m-5">
                        <div className="flex justify-between ">
                            <strong className="text-2xl">
                                Koefisien Pertahun
                            </strong>
                            <GoQuestion className="w-10 h-10" />
                        </div>

                        <div className="pt-3">
                            <table className="table text-xs table-bordered">
                                <thead className="text-sm font-medium text-white bg-primary ">
                                    <tr>
                                        <th
                                            scope="col"
                                            dir="rtl"
                                            className="rounded-tl-xl"
                                            width="5%"
                                        >
                                            No
                                        </th>
                                        <th scope="col" width="30%">
                                            Jabatan
                                        </th>
                                        <th
                                            scope="col"
                                            width="20%"
                                            className="text-center"
                                        >
                                            Nilai
                                        </th>

                                        <th
                                            scope="col"
                                            className="text-center rounded-tr-xl"
                                        >
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="border-secondary/15 ">
                                    {/* <td className="text-center">{koefisien["nilai"]}</td> */}
                                    {Object.entries(koefisienPertahun)
                                        .sort((a, b) => a[1] - b[1]) // urutkan dari nilai kecil ke besar
                                        .map(([jabatan, nilai], i) => (
                                            <tr
                                                key={i}
                                                className="group/item hover:bg-secondary/50 hover:cursor-pointer"
                                            >
                                                <td className="text-center">
                                                    {i + 1}
                                                </td>
                                                <td>{jabatan}</td>
                                                <td className="text-center">
                                                    {nilai}
                                                </td>

                                                <td className="p-3 text-center whitespace-nowrap text-nowrap">
                                                    <a
                                                        onClick={() => {
                                                            setIsPopUpOpen(
                                                                !isPopUpOpen
                                                            );
                                                            setIsEdit(true);
                                                            setDataEdit(
                                                                koefisien
                                                            );
                                                        }}
                                                        className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center scale-125 hover:scale-[1.3] transition-all group/button group-hover/item:bg-secondary group-hover/item:text-white text-secondary action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                                    >
                                                        <FaEdit className="fill-secondary group-hover/item:fill-white" />
                                                    </a>

                                                    <span className="inline-block mx-1"></span>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                koefisien.id
                                                            )
                                                        }
                                                        className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center text-red-500  hover:scale-[1.3] transition-all scale-125 group/button group-hover/item:bg-red-500 group-hover/item:text-white action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                                    >
                                                        <FaTrash className="fill-red-500 group-hover/item:fill-white" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    // setIsPopUpOpen(!isPopUpOpen);
                                    // setIsEdit(false);
                                    // setDataEdit(null);
                                }}
                                className="mt-6 text-white scale-95 btn glass bg-sky-600 hover:bg-primary/90"
                            >
                                Tambah Koefisien
                                <IoMdAdd className="w-6 h-6" />
                            </button>
                            {/* {isPopUpOpen && (
                                <PopUpForm
                                    onClose={() => setIsPopUpOpen(!isPopUpOpen)}
                                    isEdit={isEdit}
                                    dataEdit={dataEdit}
                                />
                            )} */}
                        </div>
                    </div>
                </section>

                {/* SECTION : KOEFISIEN PERTAHUN */}
                <section className="px-4 border rounded-lg mt-7 border-gradient">
                    <div className="m-5">
                        <div className="flex justify-between ">
                            <strong className="text-2xl">
                                Koefisien Pertahun
                            </strong>
                            <GoQuestion className="w-10 h-10" />
                        </div>

                        <div className="pt-3">
                            <table className="table m-auto text-xs table-bordered">
                                <thead className="text-sm font-medium text-white bg-primary ">
                                    <tr>
                                        <th
                                            scope="col"
                                            dir="rtl"
                                            className="rounded-tl-xl"
                                            width="5%"
                                        >
                                            No
                                        </th>
                                        <th scope="col" width="30%">
                                            Predikat
                                        </th>
                                        <th
                                            scope="col"
                                            width="20%"
                                            className="text-center"
                                        >
                                            Presentase
                                        </th>

                                        <th
                                            scope="col"
                                            className="text-center rounded-tr-xl"
                                        >
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="border-secondary/15 ">
                                    {/* <td className="text-center">{koefisien["nilai"]}</td> */}
                                    {Object.entries(predikatPresentase)
                                        .sort((a, b) => a[1] - b[1]) // urutkan dari nilai kecil ke besar
                                        .map(([predikat, presentase], i) => (
                                            <tr
                                                key={i}
                                                className="group/item hover:bg-secondary/50 hover:cursor-pointer"
                                            >
                                                <td className="text-center">
                                                    {i + 1}
                                                </td>
                                                <td>{predikat}</td>
                                                <td className="text-center">
                                                    {presentase}%
                                                </td>

                                                <td className="p-3 text-center whitespace-nowrap text-nowrap">
                                                    <a
                                                        onClick={() => {
                                                            setIsPopUpOpen(
                                                                !isPopUpOpen
                                                            );
                                                            setIsEdit(true);
                                                            setDataEdit(
                                                                koefisien
                                                            );
                                                        }}
                                                        className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center scale-125 hover:scale-[1.3] transition-all group/button group-hover/item:bg-secondary group-hover/item:text-white text-secondary action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                                    >
                                                        <FaEdit className="fill-secondary group-hover/item:fill-white" />
                                                    </a>

                                                    <span className="inline-block mx-1"></span>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                koefisien.id
                                                            )
                                                        }
                                                        className="items-center justify-center inline-block gap-2 mx-auto font-medium text-center text-red-500  hover:scale-[1.3] transition-all scale-125 group/button group-hover/item:bg-red-500 group-hover/item:text-white action-btn border-hijau/20 hover:bg-hijau hover:text-white"
                                                    >
                                                        <FaTrash className="fill-red-500 group-hover/item:fill-white" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => {
                                    // setIsPopUpOpen(!isPopUpOpen);
                                    // setIsEdit(false);
                                    // setDataEdit(null);
                                }}
                                className="mt-6 text-white scale-95 btn glass bg-sky-600 hover:bg-primary/90"
                            >
                                Tambah Koefisien
                                <IoMdAdd className="w-6 h-6" />
                            </button>
                            {/* {isPopUpOpen && (
                                <PopUpForm
                                    onClose={() => setIsPopUpOpen(!isPopUpOpen)}
                                    isEdit={isEdit}
                                    dataEdit={dataEdit}
                                />
                            )} */}
                        </div>
                    </div>
                </section>
            </main>
        </Authenticated>
    );
}
