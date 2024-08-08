import { DateInput, InputLabel, TextInput } from "@/Components";
import React, { useEffect, useState } from "react";
import { MdAddBox, MdDelete } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
export default function PAKTable({ data, setData, pegawai, akNormatif }) {
    const handleKeyPress = (e) => {
        // Mencegah karakter non-numeric
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };
    // SetPresentase
    const [presentase1, setPresentase1] = useState(100);

    // Jabatan untuk sesuai Koefisien Pertahun
    const jabatanOnly = pegawai["Jabatan/TMT"].split("/")[0].trim();

    // Logika Hitung jakk
    const calculateTotal = () => {
        let jakk_lama =
            parseFloat(data.ak_dasar["lama"]) +
            parseFloat(data.ak_jf["lama"]) +
            parseFloat(data.ak_penyesuaian["lama"]) +
            parseFloat(data.ak_konversi["lama"]) +
            parseFloat(data.ak_peningkatan["lama"]);

        let jakk_baru =
            parseFloat(data.ak_dasar["baru"]) +
            parseFloat(data.ak_jf["baru"]) +
            parseFloat(data.ak_penyesuaian["baru"]) +
            parseFloat(data.ak_konversi["baru"]) +
            parseFloat(data.ak_peningkatan["baru"]);

        let jakk_jumlah =
            parseFloat(data.ak_dasar["jumlah"]) +
            parseFloat(data.ak_jf["jumlah"]) +
            parseFloat(data.ak_penyesuaian["jumlah"]) +
            parseFloat(data.ak_konversi["jumlah"]) +
            parseFloat(data.ak_peningkatan["jumlah"]);

        for (let key in data.ak_tipe_tambahan) {
            jakk_lama += parseFloat(data.ak_tipe_tambahan[key]["lama"]);
            jakk_baru += parseFloat(data.ak_tipe_tambahan[key]["baru"]);
            jakk_jumlah += parseFloat(data.ak_tipe_tambahan[key]["jumlah"]);
        }

        return { jakk_lama, jakk_baru, jakk_jumlah };
    };

    // Call this function whenever you need to calculate the totals
    const { jakk_lama, jakk_baru, jakk_jumlah } = calculateTotal();
    // Logika Jumlah AK Dasar

    useEffect(() => {
        const newData = data.jakk;
        newData["lama"] = jakk_lama;
        newData["baru"] = jakk_baru;
        newData["jumlah"] = jakk_jumlah;
        setData({
            ...data,
            jakk: newData,
        });

        console.log("isi new data");
        console.log(newData);

        // Logika set akDasar['jumlah']
        const newDataAkDasar = data.ak_dasar;
        newDataAkDasar["jumlah"] =
            parseFloat(data.ak_dasar["lama"]) +
            parseFloat(data.ak_dasar["baru"]);

        setData({
            ...data,
            ak_dasar: newDataAkDasar,
        });

        // Logika set akJf['jumlah']
        const newDataAkJf = data.ak_jf;
        newDataAkJf["jumlah"] =
            parseFloat(data.ak_jf["lama"]) + parseFloat(data.ak_jf["baru"]);

        setData({
            ...data,
            ak_jf: newDataAkJf,
        });

        // Logika set akPenyesuaian['jumlah']
        const newDataAkPenyesuaian = data.ak_penyesuaian;
        newDataAkPenyesuaian["jumlah"] =
            parseFloat(data.ak_penyesuaian["lama"]) +
            parseFloat(data.ak_penyesuaian["baru"]);

        setData({
            ...data,
            ak_penyesuaian: newDataAkPenyesuaian,
        });

        // Logika set akKonversi['jumlah']
        const newDataAkKonversi = data.ak_konversi;
        newDataAkKonversi["jumlah"] =
            parseFloat(data.ak_konversi["lama"]) +
            parseFloat(data.ak_konversi["baru"]);

        setData({
            ...data,
            ak_konversi: newDataAkKonversi,
        });

        // Logika set akPeningkatan['jumlah']
        const newDataAkPeningkatan = data.ak_peningkatan;
        newDataAkPeningkatan["jumlah"] =
            parseFloat(data.ak_peningkatan["lama"]) +
            parseFloat(data.ak_peningkatan["baru"]);

        setData({
            ...data,
            ak_peningkatan: newDataAkPeningkatan,
        });
    }, [jakk_lama, jakk_baru]);

    // Logika Kelebihan/Kekurangan  AK Kredit Untuk Kenaikan Pangkat
    useEffect(() => {
        const pangkatKeker = parseFloat(
            data.jakk["jumlah"] - data.pangkat
        ).toFixed(2);
        console.log("isi pangkat keker");
        console.log(pangkatKeker);
        setData({
            ...data,
            pangkat_keker: pangkatKeker,
        });
        data.pangkat_keker = pangkatKeker;
    }, [jakk_jumlah, data.pangkat]);

    // Logika Kelebihan/Kekurangan  AK Kredit Untuk Kenaikan Jabatan
    useEffect(() => {
        const jabatanKeker = parseFloat(
            data.jakk["jumlah"] - data.jabatan
        ).toFixed(2);
        setData({
            ...data,
            jabatan_keker: jabatanKeker,
        });
        data.jabatan_keker = jabatanKeker;
    }, [jakk_jumlah, data.jabatan]);

    // <========Logika Tambah Kolom=============>
    const dataTipePAK = {
        ak_dasar: data.ak_dasar,
        ak_jf: data.ak_jf,
        ak_penyesuaian: data.ak_penyesuaian,
        ak_konversi: data.ak_konversi,
        ak_peningkatan: data.ak_peningkatan,
        ...data.ak_tipe_tambahan,
    };
    const [rowKeys, setRowKeys] = useState(Object.keys(dataTipePAK));

    const handleAddRow = () => {
        const newRowKey = `ak_tambahan_${
            Object.keys(data.ak_tipe_tambahan).length + 1
        }`;
        setData({
            ...data,
            ak_tipe_tambahan: {
                ...data.ak_tipe_tambahan,
                [newRowKey]: {
                    tipe_ak: "",
                    lama: 0,
                    baru: 0,
                    jumlah: 0,
                    keterangan: "",
                },
            },
        });
        setRowKeys([...rowKeys, newRowKey]);
    };

    const handleRemoveRow = (key) => {
        const newTipeTambahan = { ...data.ak_tipe_tambahan };
        delete newTipeTambahan[key];
        setData({
            ...data,
            ak_tipe_tambahan: newTipeTambahan,
        });
        setRowKeys(rowKeys.filter((rowKey) => rowKey !== key));
    };
    const handleChange = (key, field, value) => {
        let updatedKeyData = {};
        if (key.startsWith("ak_tambahan_")) {
            updatedKeyData = { ...data.ak_tipe_tambahan[key], [field]: value };

            if (field === "lama" || field === "baru") {
                updatedKeyData.jumlah =
                    (parseFloat(updatedKeyData.lama) || 0) +
                    (parseFloat(updatedKeyData.baru) || 0);
            }

            setData({
                ...data,
                ak_tipe_tambahan: {
                    ...data.ak_tipe_tambahan,
                    [key]: updatedKeyData,
                },
            });
        } else {
            updatedKeyData = { ...data[key], [field]: value };

            if (field === "lama" || field === "baru") {
                updatedKeyData.jumlah =
                    (parseFloat(updatedKeyData.lama) || 0) +
                    (parseFloat(updatedKeyData.baru) || 0);
            }

            setData({
                ...data,
                [key]: updatedKeyData,
            });
        }
    };

    return (
        <table className="table text-base">
            {/* head */}
            <thead>
                <tr className="text-lg bg-orange-500 text-white text-center">
                    <th colSpan={6}>PENETAPAN ANGKA KREDIT</th>
                </tr>
                <tr>
                    <td colSpan={2} className="text-lg text-center border">
                        <InputLabel
                            htmlFor="no_surat2"
                            className="inline-block ml-1 text-lg"
                            value="NOMOR SURAT"
                        />
                    </td>
                    <td colSpan={4} className="border">
                        <TextInput
                            className="w-64  border-gradient"
                            placeholder="contoh: 1500.445/PAK/2024"
                            onChange={(e) =>
                                setData("no_surat3", e.target.value)
                            }
                        />
                    </td>
                </tr>
                <tr className="text-base uppercase text-center">
                    <td className="border" width="5%">
                        No{" "}
                    </td>
                    <td className="border" width="40%">
                        Penetapan Angka Kredit{" "}
                    </td>
                    <td className="border">Lama </td>
                    <td className="border">Baru </td>
                    <td className="border">Jumlah </td>
                    <td className="border">Keterangan </td>
                </tr>
            </thead>
            <tbody className="border ">
                {rowKeys.map((key, index) => (
                    <tr
                        key={key}
                        className="text-base capitalize text-slate-600 font-semibold border-separate space-x-0"
                    >
                        {/* Kolom 1 */}
                        <td className="border text-center">
                            {/* Jika Kolom baru ditambahkan pada row TERAKHIR jadi Logo Minus, sebaliknya angka seperti biasa  */}
                            {index !== rowKeys.length - 1 ? (
                                <span>{index + 1}</span>
                            ) : (
                                <FaMinus
                                    onClick={() => handleRemoveRow(key)}
                                    className="w-6 h-6 stroke-rose-500 fill-rose-500 cursor-pointer hover:fill-secondary"
                                />
                            )}
                        </td>
                        {/* Kolom 2 */}
                        <td className="border">
                            {index < 5 ? (
                                dataTipePAK[key].tipe_ak
                            ) : (
                                <TextInput
                                    name={key}
                                    type="text"
                                    className="placeholder:text-accent text-center text-hijau"
                                    placeholder="Input Tipe AK"
                                    value={dataTipePAK[key].tipe_ak}
                                    onChange={(e) =>
                                        handleChange(
                                            key,
                                            "tipe_ak",
                                            e.target.value
                                        )
                                    }
                                />
                            )}
                        </td>
                        {/* Kolom 3 */}
                        <td className="border">
                            <TextInput
                                min={0.1}
                                max={100}
                                step={0.1}
                                type="number"
                                className="placeholder:text-accent text-center text-hijau"
                                autoComplete="username"
                                placeholder="0,0"
                                value={dataTipePAK[key].lama}
                                onChange={(e) =>
                                    handleChange(key, "lama", e.target.value)
                                }
                            />
                        </td>
                        {/* Kolom 4 */}
                        <td className="border">
                            <TextInput
                                min={0.1}
                                max={100}
                                step={0.1}
                                type="number"
                                className="placeholder:text-accent text-center text-hijau"
                                autoComplete="username"
                                placeholder="0,0"
                                value={dataTipePAK[key].baru}
                                onChange={(e) =>
                                    handleChange(key, "baru", e.target.value)
                                }
                            />
                        </td>
                        {/* Kolom 5 */}
                        <td className="border">
                            <TextInput
                                min={0.1}
                                max={100}
                                step={0.1}
                                value={
                                    dataTipePAK[key].jumlah !== 0
                                        ? parseFloat(
                                              dataTipePAK[key].jumlah
                                          ).toFixed(2)
                                        : null
                                }
                                type="number"
                                className="placeholder:text-accent text-center text-hijau"
                                autoComplete="username"
                                placeholder="0,0"
                                disabled
                            />
                        </td>
                        {/* Kolom 6 */}
                        <td className="border">
                            <TextInput
                                className="placeholder:text-accent text-center text-hijau"
                                autoComplete="username"
                                placeholder="Input Ket."
                                value={dataTipePAK[key].keterangan}
                                onChange={(e) =>
                                    handleChange(
                                        key,
                                        "keterangan",
                                        e.target.value
                                    )
                                }
                            />
                        </td>
                        {/* Kolom 7 */}
                        {/* <td className="border">
                                {index >= 5 && (
                                    <button type="button" onClick={() => handleRemoveRow(key)}>
                                        <MdDelete className="w-6 h-6 text-red-500" />
                                    </button>
                                )}
                            </td> */}
                    </tr>
                ))}
                <tr className="text-base capitalize text-slate-600 font-semibold border-separate space-x-0">
                    <td className="border text-center"></td>
                    <td className="border">
                        <button
                            type="button"
                            className="text-primary flex justify-center items-center gap-2"
                            onClick={handleAddRow}
                        >
                            <MdAddBox className="w-6 h-6" />
                            <span className="underline">Tambah Kolom</span>
                        </button>
                    </td>
                    <td className="border"></td>
                    <td className="border"></td>
                    <td className="border"></td>
                    <td className="border"></td>
                    {/* <td className="border"></td> */}
                </tr>

                {/* row 7 */}
                <tr className="text-base capitalize text-center  text-slate-600 font-semibold border-separate space-x-0">
                    <td colSpan={2} className="uppercase">
                        Jumlah Angka Kredit Kumulatif
                    </td>
                    <td className="border ">
                        {parseFloat(jakk_lama.toFixed(2)) > 0
                            ? parseFloat(jakk_lama.toFixed(2))
                            : 0}
                        {/* {parseFloat(jakk_lama.toFixed(2))} */}
                    </td>
                    <td className="border">
                        {parseFloat(jakk_baru.toFixed(2)) > 0
                            ? parseFloat(jakk_baru.toFixed(2))
                            : 0}
                    </td>
                    <td className="border">
                        {parseFloat(jakk_jumlah.toFixed(2)) > 0
                            ? parseFloat(jakk_jumlah.toFixed(2))
                            : 0}
                    </td>
                    <td className="border"></td>
                </tr>
                {/* row 8 */}
                <tr className="text-base capitalize  text-slate-600 font-semibold border-separate space-x-0 text-center">
                    <td colSpan={2} className="uppercase text-center">
                        Keterangan
                    </td>
                    <td className="border" colSpan={2}>
                        Pangkat
                    </td>
                    <td className="border" colSpan={2}>
                        Jenjang Jabatan
                    </td>
                </tr>
                {/* row 8 */}
                <tr className="text-xs capitalize  text-slate-600 font-semibold border-separate space-x-0 text-left ">
                    <td colSpan={2} className="uppercase text-left">
                        Angka Kredit Minimal yang harus dipenuhi untuk kenaikan
                        pangkat/jenjang
                    </td>

                    <td className="border text-center" colSpan={2}>
                        <select
                            name="pangkat"
                            id="pangkat"
                            className="w-24 px-1 rounded-md text-center border-gradient"
                            defaultValue={data.pangkat}
                            onChange={(e) => {
                                setData("pangkat", e.target.value);
                            }}
                        >
                            <option value="100">100</option>
                            <option value="50">50</option>
                            <option value="150">150</option>
                        </select>
                    </td>
                    <td className="border text-center" colSpan={2}>
                        <select
                            name="jabatan"
                            id="jabatan"
                            className="w-24 px-1 rounded-md text-center border-gradient"
                            defaultValue={data.jabatan}
                            onChange={(e) => {
                                setData("jabatan", e.target.value);
                            }}
                        >
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="450">450</option>
                        </select>
                    </td>
                </tr>
                {/* row 8 */}
                <tr className="text-xs capitalize  text-slate-600 font-semibold border-separate space-x-0 text-left">
                    <td colSpan={2} className="uppercase text-left">
                        {data.pangkat_keker > 0 ? (
                            <span>
                                Kelebihan/ <s>Kekurangan</s>
                            </span>
                        ) : (
                            <span>
                                <s>Kelebihan</s> /Kekurangan'
                            </span>
                        )}

                        <span>*{")"}</span>
                        <span>
                            Angka Kredit yang harus dipenuhi untuk kenaikan
                            Pangkat
                        </span>
                    </td>
                    <td
                        className="border text-center text-lg"
                        colSpan={2}
                        rowSpan={2}
                    >
                        {Math.abs(data.pangkat_keker)}
                    </td>
                    <td
                        className="border text-center text-lg"
                        colSpan={2}
                        rowSpan={2}
                    >
                        {Math.abs(data.jabatan_keker)}
                    </td>
                </tr>
                {/* row 8 */}
                <tr className="text-xs capitalize  text-slate-600 font-semibold border-separate space-x-0 text-left">
                    <td colSpan={2} className="uppercase text-left">
                        {data.jabatan_keker > 0 ? (
                            <span>
                                Kelebihan/ <s>Kekurangan</s>
                            </span>
                        ) : (
                            <span>
                                <s>Kelebihan</s> /Kekurangan'
                            </span>
                        )}

                        <span>*{")"}</span>
                        <span>
                            Angka Kredit yang harus dipenuhi untuk kenaikan
                            Jabatan
                        </span>
                    </td>
                </tr>
                {/* row 9 */}
                <tr className="text-base capitalize  text-slate-600 font-semibold border-separate space-x-0 text-left">
                    <td className="ml-5" colSpan={6}>
                        Belum Dapat dipertimbangkan untuk kenaikan pangkat
                        setingkat lebih tinggi
                    </td>
                </tr>
            </tbody>
            {/* Tebusan */}
            <tfoot>
                <tr>
                    <td rowSpan={3} colSpan={2} className="border text-lg">
                        Tebusan
                    </td>
                    <td colSpan={2} className="border-y">
                        <input
                            type="checkbox"
                            value={true}
                            className=" w-5 h-5 rounded-sm"
                            onChange={() => {
                                const newData = data.tebusan3;
                                newData["kepala_reg"] = !newData["kepala_reg"];
                                setData({
                                    ...data,
                                    tebusan3: newData,
                                });
                            }}
                        />
                        <InputLabel
                            htmlFor="kepala_reg"
                            className="inline-block ml-1"
                            value="Kepala Kantor Regional VII BKN"
                        />
                    </td>

                    <td colSpan={2} className="border">
                        <input
                            type="checkbox"
                            value={true}
                            className=" w-5 h-5 rounded-sm"
                            onChange={() => {
                                const newData = data.tebusan3;
                                newData["sekretaris"] = !newData["sekretaris"];
                                setData({
                                    ...data,
                                    tebusan3: newData,
                                });
                            }}
                        />
                        <InputLabel
                            htmlFor="sekretaris"
                            className="inline-block ml-1"
                            value="Sekretaris Tim Penilai Yang Bersangkutan"
                        />
                    </td>
                </tr>

                <tr>
                    <td colSpan={2} className="border-y">
                        <input
                            type="checkbox"
                            value={true}
                            className=" w-5 h-5 rounded-sm"
                            onChange={() => {
                                const newData = data.tebusan3;
                                newData["kepala_bps"] = !newData["kepala_bps"];
                                setData({
                                    ...data,
                                    tebusan3: newData,
                                });
                            }}
                        />
                        <InputLabel
                            htmlFor="kepala_bps"
                            className="inline-block ml-1"
                            value="Kepala BPS Kabupaten/Kota"
                        />
                    </td>
                    <td className="border" colSpan={2}>
                        <input
                            type="checkbox"
                            value={true}
                            className=" w-5 h-5 rounded-sm"
                            onChange={() => {
                                const newData = data.tebusan3;
                                newData["pns"] = !newData["pns"];
                                setData({
                                    ...data,
                                    tebusan3: newData,
                                });
                            }}
                        />
                        <InputLabel
                            htmlFor="pns"
                            className="inline-block ml-1"
                            value="PNS Bersangkutan"
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="border-y">
                        <input
                            type="checkbox"
                            value={true}
                            className=" w-5 h-5 rounded-sm"
                            onChange={() => {
                                const newData = data.tebusan3;
                                newData["kepala_biro"] =
                                    !newData["kepala_biro"];
                                setData({
                                    ...data,
                                    tebusan3: newData,
                                });
                            }}
                        />
                        <InputLabel
                            htmlFor="kepala_biro"
                            className="inline-block ml-1"
                            value="Kepala Biro SDM BPS"
                        />
                    </td>
                    <td className="border" colSpan={2}>
                        <input
                            type="checkbox"
                            value={true}
                            className=" w-5 h-5 rounded-sm"
                            onChange={() => {
                                const newData = data.tebusan3;
                                newData["arsip"] = !newData["arsip"];
                                setData({
                                    ...data,
                                    tebusan3: newData,
                                });
                            }}
                        />
                        <InputLabel
                            htmlFor="arsip"
                            className="inline-block ml-1"
                            value="Arsip"
                        />
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}
