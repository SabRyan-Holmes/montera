import {
    InputError,
    SecondaryButton,
    SelectInput,
    SuccessButton,
} from "@/Components";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaCheck, FaPlus, FaUserTie } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { PiSealWarning } from "react-icons/pi";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";

export default function Create({ auth, filtersList, title }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_produk: "",
        kode_produk: "",
        kategori: "",
        harga_satuan: "",
        komisi_poin: "",
        deskripsi_produk: "",
        status: "",
    });
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        setAlert(true);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("shared.produk.store"), data);
    };

    // console.log("isi errors", errors);
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
                                    href={route("shared.produk.index")}
                                    className="inline-flex items-center gap-2 "
                                >
                                    <FaUserTie className="w-4 h-4 stroke-current" />
                                    <span>Kelola Data Produk</span>
                                </a>
                            </li>

                            <li>
                                <span className="inline-flex items-center gap-2">
                                    <FaUserPlus className="w-4 h-4 stroke-current" />
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
                        <table className="table text-base table-bordered ">
                            <thead>
                                <tr className="text-lg bg-primary/70">
                                    <th colSpan={2}>Detail Produk</th>
                                </tr>
                            </thead>
                            <tbody className=" bo">
                                {/* row 1 */}
                                <tr className="border">
                                    <td className="" width="40%">
                                        Nama
                                    </td>
                                    <td className="border-x" width="60%">
                                        <TextInput
                                            id="nama_produk"
                                            type="text"
                                            name="nama_produk"
                                            placeholder="Masukkan Nama Produk"
                                            className="w-full px-2 h-9 border-slate-100"
                                            maxLength={100}
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData(
                                                    "nama_produk",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.nama_produk}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                {/* row 2 */}
                                <tr className="border">
                                    <td className="">Kode Produk</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            name="kode_produk"
                                            placeholder="Masukkan Kode Produk"
                                            className="w-full px-2 h-9 placeholder:text-accent "
                                            maxLength={18}
                                            onChange={(e) =>
                                                setData(
                                                    "kode_produk",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors["kode_produk"]}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                {/* row 3 */}
                                <tr className="border">
                                    <td className="">Kategori</td>
                                    <td className="border-x">
                                        <SelectInput
                                            id="kategori"
                                            name="kategori"
                                            value={data.kategori}
                                            className="w-full mt-1"
                                            placeholder="-- Pilih Kategori Produk --"
                                            options={filtersList.kategori} // Oper pilihan di sini
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
                                    <td className="">{`Harga Satuan(Rp)`}</td>

                                    <td className="border-x">
                                        <TextInput
                                            type="number"
                                            name="harga_satuan"
                                            className="w-full px-2 h-9 placeholder:text-accent "
                                            placeholder="Masukkan Harga Satuan dalam Rupiah. contoh: 10000"
                                            onChange={(e) =>
                                                setData(
                                                    "harga_satuan",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors["harga_satuan"]}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="border">KOMISI POIN</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="number"
                                            name="komisi_poin"
                                            className="w-full px-2 h-9 placeholder:text-accent "
                                            isFocused={true}
                                            maxLength={50}
                                            placeholder="Masukkan Komisi Poin. contoh: 10 POIN"
                                            onChange={(e) =>
                                                setData(
                                                    "komisi_poin",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors["komisi_poin"]}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>

                                <tr className="border">
                                    <td className="">DESKRIPSI PRODUK</td>
                                    <td className="border-x">
                                        <TextInput
                                            type="text"
                                            name="deskripsi_produk"
                                            className="w-full px-2 h-9 placeholder:text-accent "
                                            isFocused={true}
                                            placeholder="Masukkan Deskripsi Produk. contoh: PRODUK A adalah.... "
                                            maxLength={100}
                                            onChange={(e) =>
                                                setData(
                                                    "deskripsi_produk",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors["deskripsi_produk"]}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                                <tr className="border">
                                    <td className="">Status</td>
                                    <td className="border-x">
                                        <SelectInput
                                            id="status"
                                            name="status"
                                            value={data.status}
                                            className="w-full mt-1"
                                            placeholder="-- Pilih Status Produk --"
                                            options={filtersList.status} // Oper pilihan di sini
                                            onChange={(e) =>
                                                setData(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors["status"]}
                                            className="mt-2"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* NOTE : Kalo misal butuh peringatan ubah ini */}
                        {/* <Transition
                            show={alert}
                            enter="transition ease-in-out duration-700"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out duration-700"
                            leaveTo="opacity-0"
                        >
                            <div
                                role="alert"
                                className="my-2 mt-4 rounded-md shadow-lg alert"
                            >
                                <PiSealWarning className="w-7 h-7 fill-secondary" />
                                <div>
                                    <h3 className="text-base font-bold text-secondary">
                                        Catatan!
                                    </h3>
                                    <div className="text-sm text-red-950">
                                        <span>
                                            Nama, NIP/NRP, Alamat, Jenis Kelamin
                                            tidak bisa diubah setelah sekali
                                            ditambahkan, pastikan sudah mengisi
                                            dengan benar!
                                        </span>
                                    </div>
                                </div>
                                <a
                                    onClick={() => setAlert(false)}
                                    className="group/btn inline text-xs cursor-pointer text-black action-btn hover:scale-[1.15] hover:text-emerald-700 border-hijau/80 bg-hijau/60"
                                >
                                    Saya Paham
                                    <FaCheck className="inline w-4 h-4 ml-1 fill-emerald-900 group-hover/btn:fill-emerald-600" />
                                </a>
                            </div>
                        </Transition> */}

                        <div className="my-1"></div>
                        <div className="flex justify-center w-full my-4 ">
                            <SuccessButton
                                type="submit"
                                disabled={processing}
                                className="gap-1 text-base border"
                            >
                                <span>Tambah Data</span>
                                <FaPlus className="w-4 h-4 fill-white" />
                            </SuccessButton>
                        </div>
                    </form>
                </section>
            </main>
        </Authenticated>
    );
}
