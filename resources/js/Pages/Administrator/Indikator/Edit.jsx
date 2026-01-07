import { TextInput, InputError, SecondaryButton, SuccessButton } from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import { FaDatabase, FaTrash } from "react-icons/fa6";
import { FaSave, FaUserEdit } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import Swal from "sweetalert2";

export default function Edit({ auth, indikator, title, flash }) {
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
        // TODO
        // indikator id//nama dan kode??
        nama_kpi: indikator["nama_kpi"],
        satuan: indikator["satuan"],
        bobot_nilai: indikator["bobot_nilai"],
        target_minimal: indikator["target_minimal"],
        metode_perhitungan: indikator["metode_perhitungan"],
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
                title: "Data Indikator Berhasil Diupdate!!",
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
            text: "Anda yakin ingin menghapus data indikator ini?",
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
                destroy(route("admin.indikator.destroy", id), {
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
        patch(route("admin.indikator.update", indikator));
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
                                    href={route("admin.indikator.index")}
                                    className="gap-2"
                                >
                                    <FaDatabase className="w-4 h-4 stroke-current" />
                                    <span>Kelola Data Indikator</span>
                                </a>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    {indikator.nama_kpi}
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
                                    <th colSpan={2}>Detail Indikator</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr className="border">
                                    <td className="">NAMA KPI/INDIKATOR</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            id="nama_kpi"
                                            type="text"
                                            name="nama_kpi"
                                            value={data["nama_kpi"]}
                                            disabled
                                            className="w-full px-2 h-9 border-gradient disabled:text-accent hover:cursor-not-allowed "
                                        />
                                    </td>
                                </tr>
                                {/* row 2 */}
                                <tr className="border">
                                    <td className="">Satuan</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            id="satuan"
                                            type="text"
                                            name="satuan"
                                            value={data["satuan"]}
                                            disabled
                                            className="w-full px-2 h-9 border-gradient disabled:text-accent hover:cursor-not-allowed "
                                        />
                                    </td>
                                </tr>
                                {/* row 3 */}
                                <tr className="border">
                                    <td className="">BOBOT NILAI</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            id="nama"
                                            type="text"
                                            name="bobot_nilai"
                                            defaultValue={data["bobot_nilai"]}
                                            className="w-full px-2 h-9 border-gradient placeholder:text-accent "
                                            placeholder="Masukkan nomor Seri Karpeg. contoh: P 152011"
                                            onChange={(e) =>
                                                setData(
                                                    "bobot_nilai",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors["bobot_nilai"]}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="">TARGET MINIMAL</td>

                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="target_minimal"
                                            defaultValue={data["target_minimal"]}
                                            className="w-full px-2 h-9 border-gradient "
                                            placeholder="contoh: PENATA / III/c / 01-04-2021"
                                            max
                                            onChange={(e) =>
                                                setData(
                                                    "target_minimal",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="border">METODE PERHITUNGAN</td>
                                    <td className="flex border-x">
                                        <TextInput
                                            type="text"
                                            name="metode_perhitungan"
                                            value={data["metode_perhitungan"]}
                                            disabled
                                            className="w-full px-2 h-9 border-gradient disabled:text-accent hover:cursor-not-allowed "
                                            onChange={(e) =>
                                                setData(
                                                    "metode_perhitungan",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        <div className="flex justify-center w-full gap-3 my-4">
                            <SuccessButton
                                type="submit"
                            >
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
