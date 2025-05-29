import { DateInput, InputLabel, TextInput } from "@/Components";
import React, { useEffect, useState } from "react";
import { MdAddBox, MdDelete } from "react-icons/md";
import { FaMinus } from "react-icons/fa";

export default function PAKTable({
    data,
    setData,
    isEdit=false,
    historyData,
    aturanPAKTableProps: {
        angkaPangkat,
        angkaJabatan,
        kesimpulan,
    },
    isByPengusulan=false
}) {
    // ANCHOR
    // console.log("angkaPangkat");
    // console.log(angkaPangkat);
    // const { angkaPangkat, angkaJabatan, tebusanPenetapan, kesimpulan } =
    //     aturanPAKTableProps;

    const dataTipePAK = {
        ak_dasar: data.ak_dasar,
        ak_jf: data.ak_jf,
        ak_penyesuaian: data.ak_penyesuaian,
        ak_konversi: data.ak_konversi,
        ak_peningkatan: data.ak_peningkatan,
        ...data.ak_tipe_tambahan,
    };

    const [rowKeys, setRowKeys] = useState(Object.keys(dataTipePAK));
    useEffect(() => {
        if (isEdit) {
            if (historyData["ak_tipe_tambahan"] != null) {
                data.ak_tipe_tambahan = historyData["ak_tipe_tambahan"];
                // console.log("data.ak_tipe_tambahan ", data.ak_tipe_tambahan);
                const updatedTipePAK = {
                    ak_dasar: data.ak_dasar,
                    ak_jf: data.ak_jf,
                    ak_penyesuaian: data.ak_penyesuaian,
                    ak_konversi: data.ak_konversi,
                    ak_peningkatan: data.ak_peningkatan,
                    ...data.ak_tipe_tambahan,
                };
                setRowKeys(Object.keys(updatedTipePAK));
            }
        }
    }, []);

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

    useEffect(() => {
        const newData = data.jakk;
        newData["lama"] = jakk_lama;
        newData["baru"] = jakk_baru;
        newData["jumlah"] = jakk_jumlah;
        setData({
            ...data,
            jakk: newData,
        });

        // Logika set akDasar['jumlah']
        const newDataAkDasar = data.ak_dasar;
        newDataAkDasar["jumlah"] = (
            parseFloat(data.ak_dasar["lama"]) +
            parseFloat(data.ak_dasar["baru"])
        ).toFixed(3);

        setData({
            ...data,
            ak_dasar: newDataAkDasar,
        });

        // Logika set akJf['jumlah']
        const newDataAkJf = data.ak_jf;
        newDataAkJf["jumlah"] = (
            parseFloat(data.ak_jf["lama"]) + parseFloat(data.ak_jf["baru"])
        ).toFixed(3);

        setData({
            ...data,
            ak_jf: newDataAkJf,
        });

        // Logika set akPenyesuaian['jumlah']
        const newDataAkPenyesuaian = data.ak_penyesuaian;
        newDataAkPenyesuaian["jumlah"] = (
            parseFloat(data.ak_penyesuaian["lama"]) +
            parseFloat(data.ak_penyesuaian["baru"])
        ).toFixed(3);

        setData({
            ...data,
            ak_penyesuaian: newDataAkPenyesuaian,
        });

        // Logika set akKonversi['jumlah']
        const newDataAkKonversi = data.ak_konversi;
        newDataAkKonversi["jumlah"] = (
            parseFloat(data.ak_konversi["lama"]) +
            parseFloat(data.ak_konversi["baru"])
        ).toFixed(3);

        setData({
            ...data,
            ak_konversi: newDataAkKonversi,
        });

        // Logika set akPeningkatan['jumlah']
        const newDataAkPeningkatan = data.ak_peningkatan;
        newDataAkPeningkatan["jumlah"] = (
            parseFloat(data.ak_peningkatan["lama"]) +
            parseFloat(data.ak_peningkatan["baru"])
        ).toFixed(3);

        setData({
            ...data,
            ak_peningkatan: newDataAkPeningkatan,
        });
    }, [jakk_lama, jakk_baru]);

    // Logika Kelebihan/Kekurangan  AK Kredit Untuk Kenaikan Pangkat
    useEffect(() => {
        const pangkatKeker = parseFloat(
            data.jakk["jumlah"] - data.pangkat
        ).toFixed(3);
        setData({
            ...data,
            pangkat_keker: pangkatKeker,
        });
        data.pangkat_keker = pangkatKeker;
        // console.log("data.pangkat_keker : ", data.pangkat_keker);
    }, [jakk_jumlah, data.pangkat]);

    // Logika Kelebihan/Kekurangan  AK Kredit Untuk Kenaikan Jabatan
    useEffect(() => {
        const jabatanKeker = parseFloat(
            data.jakk["jumlah"] - data.jabatan
        ).toFixed(3);
        setData({
            ...data,
            jabatan_keker: jabatanKeker,
        });
        data.jabatan_keker = jabatanKeker;
    }, [jakk_jumlah, data.jabatan]);

    // <========Logika Tambah Kolom=============>

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

        // Ensure that if value is empty or null, it is converted to 0
        let numericValue = parseFloat(value) || 0;
        // Jadikan kembali menjadi string biasa jika field keterangan/tipe ak
        if (field == "keterangan" || field == "tipe_ak") {
            numericValue = value;
        }

        if (key.startsWith("ak_tambahan_")) {
            updatedKeyData = {
                ...data.ak_tipe_tambahan[key],
                [field]: numericValue,
            };

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
            updatedKeyData = { ...data[key], [field]: numericValue };
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

    useEffect(() => {
        data.ak_konversi["lama"] = data.ak_terakhir;
        data.ak_konversi["baru"] = data.angka_kredit;
        data.ak_konversi["jumlah"] = (
            parseFloat(data.ak_terakhir) + parseFloat(data.angka_kredit)
        ).toFixed(3);
    });

    // console.log("isi data.pangkat");
    // console.log(data.pangkat);
    // console.log("Current pangkat value:", data.pangkat, typeof data.pangkat);

    return (
        <table className="table text-base table-bordered">
            {/* head */}
            <thead>
                <tr className="text-lg text-center text-white bg-secondary">
                    <th colSpan={6}>PENETAPAN ANGKA KREDIT</th>
                </tr>
            </thead>
            <tbody className="border ">
                <tr>
                    <td colSpan={2} className="text-center border ">
                        <strong>NOMOR SURAT</strong>
                    </td>
                    <td colSpan={4} className="border">
                        <TextInput
                            id="no_surat3"
                            name="no_surat3"
                            required
                            className="w-64 h-12 border-gradient"
                            placeholder="contoh: 1500.445/PAK/2024"
                            maxLength={30}
                            defaultValue={data.no_surat3}
                            onChange={(e) => {
                                setData("no_surat3", e.target.value);
                                console.log(
                                    "data.no_surat3 : ",
                                    data.no_surat3
                                );
                            }}
                            list="no_surat3"
                        />
                        <datalist id="no_surat3">
                            <option value="1500.455/PAK/2024" />
                        </datalist>
                    </td>
                </tr>
                <tr className="text-base text-center uppercase">
                    <td className="border" width="5%">
                        No
                    </td>
                    <td className="border" width="40%">
                        Penetapan Angka Kredit
                    </td>
                    <td className="border" width="10%">
                        Lama
                    </td>
                    <td className="border" width="10%">
                        Baru
                    </td>
                    <td className="border" width="12%">
                        Jumlah
                    </td>
                    <td className="border" width="23%">
                        Keterangan
                    </td>
                </tr>
                {rowKeys.map((key, index) => (
                    <tr
                        key={key}
                        className="space-x-0 text-base font-semibold capitalize border-separate text-slate-600"
                    >
                        {/* Kolom 1 */}
                        <td className="text-center border">
                            {/* Jika Kolom baru ditambahkan pada row TERAKHIR jadi Logo Minus, sebaliknya angka seperti biasa  */}
                            {index + 1 < rowKeys.length ||
                            rowKeys.length <= 5 ? (
                                <span>{index + 1}</span>
                            ) : (
                                <FaMinus
                                    onClick={() => handleRemoveRow(key)}
                                    className="w-6 h-6 cursor-pointer stroke-rose-500 fill-rose-500 hover:fill-secondary"
                                />
                            )}
                        </td>
                        {/* Kolom 2 */}
                        <td className="border">
                            {index < 5 ? (
                                <span>{dataTipePAK[key].tipe_ak}</span>
                            ) : (
                                <TextInput
                                    name={key}
                                    type="text"
                                    className="text-center text-green-500 placeholder:text-accent"
                                    placeholder="Input Tipe AK"
                                    maxLength="50"
                                    defaultValue={dataTipePAK[key].tipe_ak}
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
                        <td className="text-center border">
                            <TextInput
                                min={0}
                                max={1000}
                                step={0.001}
                                type="number"
                                className={
                                    "placeholder:text-accent text-center " +
                                    (dataTipePAK[key]["lama"] == 0
                                        ? "text-accent"
                                        : "text-green-500")
                                }
                                placeholder="0,0"
                                value={parseFloat(
                                    dataTipePAK[key]["lama"] || 0
                                ).toFixed(3)}
                                onChange={(e) =>
                                    handleChange(key, "lama", e.target.value)
                                }
                            />
                        </td>
                        {/* Kolom 4 */}
                        <td className="text-center border">
                            <TextInput
                                min={0}
                                max={1000}
                                step={0.001}
                                type="number"
                                // maxLength="6"
                                className={
                                    "placeholder:text-accent text-center " +
                                    (dataTipePAK[key]["baru"] == 0
                                        ? "text-accent"
                                        : "text-green-500")
                                }
                                placeholder="0,0"
                                value={parseFloat(
                                    dataTipePAK[key]["baru"] || 0
                                ).toFixed(3)}
                                onChange={(e) =>
                                    handleChange(key, "baru", e.target.value)
                                }
                            />
                        </td>
                        {/* Kolom 5 */}
                        <td className="text-center border">
                            <TextInput
                                min={0}
                                max={10000}
                                step={0.001}
                                value={parseFloat(
                                    dataTipePAK[key]["jumlah"] || 0
                                ).toFixed(3)}
                                type="number"
                                className={
                                    "placeholder:text-accent text-center " +
                                    (dataTipePAK[key]["jumlah"] == 0
                                        ? "text-accent"
                                        : "text-green-500")
                                }
                                placeholder="0,0"
                                disabled
                            />
                        </td>
                        {/* Kolom 6 */}
                        <td className="text-center border ">
                            <TextInput
                                className="text-center placeholder:text-accent"
                                type="text"
                                placeholder="Input Ket."
                                maxLength="15"
                                defaultValue={dataTipePAK[key].keterangan}
                                onChange={(e) =>
                                    handleChange(
                                        key,
                                        "keterangan",
                                        e.target.value
                                    )
                                }
                            />
                        </td>
                    </tr>
                ))}
                <tr className="space-x-0 text-base font-semibold capitalize border-separate text-slate-600">
                    <td className="text-center border"></td>
                    <td className="border">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 text-primary"
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
                </tr>

                {/* row 7 */}
                <tr className="space-x-0 text-base font-semibold text-center capitalize border-separate text-slate-600">
                    <td colSpan={2} className="uppercase">
                        Jumlah Angka Kredit Kumulatif
                    </td>
                    <td className="border ">
                        {isNaN(jakk_lama)
                            ? 0
                            : parseFloat(jakk_lama.toFixed(3))}
                    </td>

                    <td className="border">
                        {isNaN(jakk_baru)
                            ? 0
                            : parseFloat(jakk_baru.toFixed(3))}
                    </td>
                    <td className="border">
                        {isNaN(jakk_jumlah)
                            ? 0
                            : parseFloat(jakk_jumlah.toFixed(3))}
                    </td>
                    <td className="border"></td>
                </tr>
                {/* row 8 */}
                <tr className="space-x-0 text-base font-semibold text-center capitalize border-separate text-slate-600">
                    <td colSpan={2} className="text-center uppercase">
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
                <tr className="space-x-0 text-xs font-semibold text-left capitalize border-separate text-slate-600 ">
                    <td colSpan={2} className="text-left ">
                        Angka Kredit Minimal yang harus dipenuhi untuk kenaikan
                        pangkat/jabatan
                    </td>

                    {/* NOTE : Update 10 Maret 2025 : Pangkat dan jabatan ditambahkan angka 150 & 300 (ditambahkan jg 250 jaga-jaga) */}

                    <td className="text-center border" colSpan={2}>
                        <select
                            name="pangkat"
                            id="pangkat"
                            className="w-20 text-center rounded-md border-gradient"
                            // TODO: ubah ini nanti sesuai default_config
                            defaultValue={data.pangkat}
                            value={isEdit || isByPengusulan && data.pangkat}
                            onChange={(e) => {
                                setData("pangkat", parseInt(e.target.value));
                            }}
                        >
                            {angkaPangkat.map((angka) => (
                                <option value={angka}>{angka}</option>
                            ))}
                        </select>
                    </td>
                    <td className="text-center border" colSpan={2}>
                        <select
                            name="jabatan"
                            id="jabatan"
                            className="w-20 text-center rounded-md border-gradient"
                            // TODO: ubah ini nanti sesuai default_config
                            defaultValue={data.jabatan}
                            value={isEdit || isByPengusulan && data.pangkat}
                            onChange={(e) => {
                                setData("jabatan", parseInt(e.target.value));
                            }}
                        >
                            {angkaJabatan.map((angka) => (
                                <option value={angka}>{angka}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                {/* row 8 */}
                <tr className="space-x-0 text-xs font-semibold text-left capitalize border-separate text-slate-600">
                    <td colSpan={2} className="text-left">
                        {data.pangkat_keker > 0 ? (
                            <span className="text-green-600/70">
                                Kelebihan/
                                <s className="text-accent">Kekurangan </s>
                            </span>
                        ) : (
                            <span className="text-error">
                                <s className="text-accent">Kelebihan</s>
                                /Kekurangan{" "}
                            </span>
                        )}

                        <span>
                            Angka Kredit yang harus dipenuhi untuk kenaikan
                            Pangkat
                        </span>
                    </td>

                    <td
                        className="text-lg text-center border"
                        colSpan={2}
                        rowSpan={2}
                    >
                        {isNaN(data.pangkat_keker)
                            ? 0
                            : Math.abs(data.pangkat_keker)}
                    </td>
                    <td
                        className="text-lg text-center border"
                        colSpan={2}
                        rowSpan={2}
                    >
                        {isNaN(data.jabatan_keker)
                            ? 0
                            : Math.abs(data.jabatan_keker)}{" "}
                    </td>
                </tr>
                {/* row 8 */}
                <tr className="space-x-0 text-xs font-semibold text-left capitalize border-separate text-slate-600">
                    <td colSpan={2} className="text-left ">
                        {data.jabatan_keker > 0 ? (
                            <span className="text-green-600/70">
                                Kelebihan/
                                <s className="text-accent">Kekurangan </s>
                            </span>
                        ) : (
                            <span className="text-error">
                                <s className="text-accent">Kelebihan </s>
                                /Kekurangan{" "}
                            </span>
                        )}

                        <span>
                            Angka Kredit yang harus dipenuhi untuk kenaikan
                            Jabatan
                        </span>
                    </td>
                </tr>
                {/* row 9 */}
                <tr className="space-x-0 text-base font-semibold text-left capitalize border-separate text-slate-600">
                    <td className="ml-5 text-center" colSpan={6}>
                        <select
                            name="kesimpulan"
                            id="kesimpulan"
                            className="w-3/4 text-center rounded-md border-gradient"
                            defaultValue={kesimpulan.default_config}
                            onChange={(e) => {
                                setData("kesimpulan", e.target.value);
                            }}
                        >
                            {kesimpulan.value.map((kesimpulan) => (
                                <option>{kesimpulan}</option>
                            ))}
                        </select>
                    </td>
                </tr>
            </tbody>
            {/* Tebusan */}
            <tfoot>
                {data.tebusan3
                    .reduce((rows, item, index) => {
                        const groupIndex = Math.floor(index / 2);
                        if (!rows[groupIndex]) rows[groupIndex] = [];
                        rows[groupIndex].push({ ...item, index });
                        return rows;
                    }, [])
                    .map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {rowIndex === 0 && (
                                <td
                                    rowSpan={3}
                                    colSpan={2}
                                    className="text-lg text-center border text-slate-700"
                                >
                                    Tebusan
                                </td>
                            )}

                            {row.map((item) => (
                                <td
                                    key={item.index}
                                    colSpan={2}
                                    className="border-y"
                                >
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded-sm"
                                        value={true}
                                        checked={item.checked}
                                        onChange={() => {
                                            const updated = [...data.tebusan3];
                                            updated[item.index].checked =
                                                !updated[item.index].checked;
                                            setData({
                                                ...data,
                                                tebusan3: updated,
                                            });
                                        }}
                                    />
                                    <InputLabel
                                        htmlFor={`tebusan-${item.index}`}
                                        className="inline-block ml-2 text-sm"
                                        value={item.pihak_tebusan}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
            </tfoot>

            {/* <tfoot>
                <tr>
                    <td
                        rowSpan={3}
                        colSpan={2}
                        className="text-lg border text-slate-700"
                    >
                        Tebusan
                    </td>
                    <td colSpan={2} className="border-y">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm"
                            defaultChecked={
                                isEdit && historyData.tebusan3["kepala_reg"]
                            }
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
                            className="inline-block ml-2 text-sm"
                            value="Kepala Kantor Regional VII BKN"
                        />
                    </td>

                    <td colSpan={2} className="border">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm"
                            defaultChecked={
                                isEdit && historyData.tebusan3["sekretaris"]
                            }
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
                            className="inline-block ml-2 text-sm"
                            value="Sekretaris Tim Penilai Yang Bersangkutan"
                        />
                    </td>
                </tr>

                <tr>
                    <td colSpan={2} className="border-y">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm"
                            defaultChecked={
                                isEdit && historyData.tebusan3["kepala_bps"]
                            }
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
                            className="inline-block ml-2 text-sm"
                            value="Kepala BPS Kabupaten/Kota"
                        />
                    </td>
                    <td className="border" colSpan={2}>
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm"
                            defaultChecked={
                                isEdit && historyData.tebusan3["pns"]
                            }
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
                            className="inline-block ml-2 text-sm"
                            value="PNS Bersangkutan"
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="border-y">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm"
                            defaultChecked={
                                isEdit && historyData.tebusan3["kepala_biro"]
                            }
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
                            className="inline-block ml-2 text-sm"
                            value="Kepala Biro SDM BPS"
                        />
                    </td>
                    <td className="border" colSpan={2}>
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm"
                            defaultChecked={
                                isEdit && historyData.tebusan3["arsip"]
                            }
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
                            className="inline-block ml-2 text-sm"
                            value="Arsip"
                        />
                    </td>
                </tr>
            </tfoot> */}
        </table>
    );
}
