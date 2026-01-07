import {
    TextInput,
    InputError,
    SecondaryButton,
    SuccessButton,
} from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import { FaDatabase, FaTrash } from "react-icons/fa6";
import { FaSave, FaUserEdit } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import Swal from "sweetalert2";

export default function Edit({ auth, produk, title, flash }) {
    // ==========================================================Form===============================================================
    const {
        data,
        setData,
        patch,
        delete: destroy,
        processing,
        errors,
        clearErrors,
    } = useForm({
        nama_produk: produk["nama_produk"],
        kode_produk: produk["kode_produk"],
        kategori: produk["kategori"],
        harga_satuan: produk["harga_satuan"],
        komisi_poin: produk["komisi_poin"],
        deskripsi_produk: produk["deskripsi_produk"],
        status: produk["status"],
    });
    // ===========================================Pop Up, Modal, Dialog Swal Message===========================================

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    useEffect(() => {
        if (flash.message) {
            Toast.fire({
                icon: "success",
                title: "Data Produk Berhasil Diupdate!!",
            });
            setTimeout(() => {
                flash.message = null;
            }, 3000);
        }
    }, [flash.message]);

    useEffect(() => {
        if (errors && Object.values(errors).length > 0) {
            const firstErrorMessage = Object.values(errors)[0];
            Toast.fire({
                icon: "warning",
                iconColor: "#fb7185",
                title: firstErrorMessage,
                color: "#fb7185",
            });
            setTimeout(() => {
                clearErrors();
            }, 3000);
        }
    }, [errors]);

    function handleDelete(id) {
        Swal.fire({
            icon: "warning",
            text: "Anda yakin ingin menghapus data produk ini?",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#2D95C9",
            cancelButtonColor: "#9ca3af",
            customClass: {
                actions: "my-actions",
                cancelButton: "order-1 right-gap",
                confirmButton: "order-2",
                denyButton: "order-3",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("admin.produk.destroy", id), {
                    onError: () => {
                        alert("Gagal Menghapus Data");
                    },
                });
            }
        });
    }

    // ===========================================Logic Lainnya===========================================
    const submit = (e) => {
        e.preventDefault();
        patch(route("admin.produk.update", produk));
    };

    return (
        <Authenticated
            user={auth.user}
            title={title}
            current={route().current()}
        >
            <main className="mx-auto phone:h-screen laptop:h-full laptop:w-screen-laptop laptop:px-7 max-w-screen-desktop">
                <section className="flex justify-between">
                    <div className="mt-2 text-sm breadcrumbs">
                        <ul>
                            <li>
                                <a
                                    href={route("admin.produk.index")}
                                    className="gap-2"
                                >
                                    <FaDatabase className="w-4 h-4 stroke-current" />
                                    <span>Kelola Data Produk</span>
                                </a>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    {produk.nama_produk}
                                </span>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    <FaUserEdit className="w-4 h-4 stroke-current" />

                                    {title}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <SecondaryButton
                        onClick={() => window.history.back()}
                        className="capitalize bg-secondary/5 "
                    >
                        <span>Kembali</span>
                        <RiArrowGoBackFill className="w-3 h-3 ml-2 fill-secondary" />
                    </SecondaryButton>
                </section>

                <section className="m-12 mx-auto overflow-x-auto laptop:w-4/5 max-w-screen-laptop">
                    <form onSubmit={submit}>
                        <table className="table text-base table-auto ">
                            {/* head */}
                            <thead>
                                <tr className="text-lg bg-primary/70">
                                    <th colSpan={2}>Detail Produk</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr className="border">
                                    <td className="">NAMA PRODUK</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            id="nama_produk"
                                            type="text"
                                            name="nama_produk"
                                            value={data["nama_produk"]}
                                            className="w-full px-2 h-9 border-gradient :text-accent hover:cursor-not-allowed "
                                        />
                                    </td>
                                </tr>
                                {/* row 2 */}
                                <tr className="border">
                                    <td className="">KODE PRODUK</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            id="kode_produk"
                                            type="text"
                                            name="kode_produk"
                                            value={data["kode_produk"]}
                                            className="w-full px-2 h-9 border-gradient :text-accent hover:cursor-not-allowed "
                                        />
                                    </td>
                                </tr>
                                {/* row 3 */}
                                <tr className="border">
                                    <td className="">KATEGORI</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            id="nama"
                                            type="text"
                                            name="kategori"
                                            defaultValue={data["kategori"]}
                                            className="w-full px-2 h-9 border-gradient placeholder:text-accent "
                                            placeholder="Masukkan nomor Seri Karpeg. contoh: P 152011"
                                            onChange={(e) =>
                                                setData(
                                                    "kategori",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors["kategori"]}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="">HARGA SATUAN</td>

                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="harga_satuan"
                                            defaultValue={data["harga_satuan"]}
                                            className="w-full px-2 h-9 border-gradient "
                                            placeholder="contoh: PENATA / III/c / 01-04-2021"
                                            max
                                            onChange={(e) =>
                                                setData(
                                                    "harga_satuan",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="border">KOMISI POIN</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="komisi_poin"
                                            value={data["komisi_poin"]}
                                            className="w-full px-2 h-9 border-gradient :text-accent hover:cursor-not-allowed "
                                            onChange={(e) =>
                                                setData(
                                                    "komisi_poin",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="">DESKRIPSI PRODUK</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="deskripsi_produk"
                                            value={data["deskripsi_produk"]}
                                            className="w-full px-2 h-9 border-gradient placeholder:text-accent :text-accent hover:cursor-not-allowed"
                                            placeholder="input disini"
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="">STATUS</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="status"
                                            value={data["status"]}
                                            className="w-full px-2 h-9 border-gradient placeholder:text-accent :text-accent hover:cursor-not-allowed"
                                            placeholder="input disini"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex justify-center w-full gap-3 my-4">
                            {/* <button
                                type="submit"
                                className="gap-3 px-5 text-base uppercase scale-95 border group/button btn glass bg-hijau/20 hover:bg-hijau hover:text-white border-hijau/20 text-hijau"
                            >
                                <span>Update Data</span>
                                <FaSave className="w-4 h-5 fill-hijau group-hover/button:fill-white" />
                            </button> */}

                            <SuccessButton type="submit">
                                <FaSave className="w-4 h-4 mr-1 " />
                                Update Data
                            </SuccessButton>

                            <SecondaryButton
                                onClick={() => handleDelete(data.id)}
                                className="text-white bg-warning/80"
                            >
                                <FaTrash className="w-4 h-4 mr-1 " />
                                Hapus Data
                            </SecondaryButton>
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
