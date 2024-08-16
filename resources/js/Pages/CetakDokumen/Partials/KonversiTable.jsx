import { DateInput, InputLabel, TextInput } from "@/Components";
import React, { useEffect, useState } from "react";

export default function KonversiTable({
    data,
    setData,
    pegawai,
    akNormatif,
    predikat,
}) {
    const handleKeyPress = (e) => {
        // Mencegah karakter non-numeric
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    // Jabatan untuk sesuai Koefisien Pertahun/Ak Normatif

    useEffect(() => {
        const jabatanOnly = pegawai["Jabatan/TMT"].split("/")[0].trim();
        const findAkNormatifValue = (jabatan) => {
            const key = Object.keys(akNormatif).find((k) =>
                jabatan.includes(k)
            );
            return key ? akNormatif[key] : null;
        };

        const akNormatifValue = findAkNormatifValue(jabatanOnly);
        data.ak_normatif = akNormatifValue;
    }, []);

    function hitungAk( periode, akNormatif, presentase) {
        const ak_kredit =
            parseFloat(periode / 12) *
            parseFloat(akNormatif) *
            parseFloat(presentase / 100);
        const result = parseFloat(ak_kredit).toFixed(3);
        // console.log("angka kredit terakhir", akTerakhir);
        // console.log("periode : ", periode);
        // console.log("ak normatif : ", akNormatif);
        // console.log("presentase : ", presentase);
        // console.log("isi nilai ak kredit dari fungsi");
        // console.log(result);

        return result;
    }

    // Logika Hitung AK dijalankan ketika ada perubahan
    useEffect(() => {
        const akNormatif = (data.ak_normatif ? data.ak_normatif : data.ak_normatif_ops)
        const akKreditValue = hitungAk(
            data.angka_periode,
            akNormatif,
            data.presentase
        );
        setData("angka_kredit", akKreditValue);
        data.angka_kredit = akKreditValue;
    }, [data.angka_periode, data.predikat, data.presentase]);

    useEffect(() => {
        setData("predikat", predikat[data.presentase]);
    }, [data.presentase]);

    // data.predikat = predikat[data.presentase];

    return (
        <table className="table text-base">
            {/* head */}
            <thead>
                <tr className="text-lg text-center text-white bg-secondary">
                    <th colSpan={4}>KONVERSI PREDIKAT KINERJA ANGKA KREDIT</th>
                </tr>
            </thead>
            <tbody className="border">
                {/* row 1 */}

                <tr>
                    <td className="text-center uppercase border">
                        <strong>NOMOR SURAT</strong>
                    </td>
                    <td>
                        <TextInput
                            id="no_surat1"
                            name="no_surat1"
                            className="w-64 h-12"
                            required
                            placeholder="contoh: 1500.445/Konv/2024"
                            onChange={(e) =>
                                setData("no_surat1", e.target.value)
                            }
                            list="no_surat1"
                            />
                            <datalist id="no_surat1">
                                <option value="1500.455/KONV/2024" />
                            </datalist>
                    </td>
                </tr>
                <tr className="text-center border">
                    <td
                        colSpan={2}
                        className="font-semibold text-center "
                    >
                        Hasil Penilaian Kinerja
                    </td>
                    <td rowSpan={2} className="border">
                        Koefisien Pertahun
                    </td>
                    <td rowSpan={2}>Angka Kredit yang didapat</td>
                </tr>

                <tr>
                    <td className="text-center uppercase border">Predikat</td>
                    <td className="text-center uppercase border">Presentase</td>
                </tr>

                <tr className="text-center">
                    <td className="border">{data.predikat}</td>
                    <td className="flex justify-center w-full">
                        <select
                            name="presentase"
                            id="presentase"
                            className="w-24 px-1 text-center rounded-md border-gradient"
                            defaultValue={data.presentase}
                            onChange={(e) => {
                                setData("presentase", e.target.value);
                            }}
                        >
                            <option value="75">75%</option>
                            <option value="100">100%</option>
                            <option value="150">150%</option>
                        </select>
                    </td>
                    <td className="border">
                        {data.ak_normatif ? (
                            <span>{data.ak_normatif}</span>
                        ) : (
                            <TextInput
                                id="ak_normatif_ops"
                                type="text"
                                name="ak_normatif_ops"
                                className=""
                                placeholder="Input Manual Angka Normatif"
                                onKeyPress={handleKeyPress}
                                onChange={(e) =>
                                    setData("ak_normatif_ops", parseFloat(e.target.value).toFixed(3))
                                }
                            />
                        )}
                    </td>
                    <td className="border">
                        {data.angka_kredit && !isNaN(data.angka_kredit)
                            ? data.angka_kredit
                            : "0"}
                    </td>
                </tr>

                <tr>
                    <td
                        rowSpan={3}
                        className="text-lg font-semibold "
                    >
                        Tebusan
                    </td>
                    <td className="border">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm "
                            onChange={() => {
                                const newData = data.tebusan1;
                                newData["kepala_reg"] = !newData["kepala_reg"];
                                setData({
                                    ...data,
                                    tebusan1: newData,
                                });
                            }}
                        />
                        <InputLabel
                            htmlFor="kepala_reg"
                            className="inline-block ml-1"
                            value="Kepala Kantor Regional VII BKN"
                        />
                    </td>

                    <td colSpan={2} className="border ">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm "
                            onChange={() => {
                                const newData = data.tebusan1;
                                newData["sekretaris"] = !newData["sekretaris"];
                                setData({
                                    ...data,
                                    tebusan1: newData,
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
                    <td className="border">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm "
                            onChange={() => {
                                const newData = data.tebusan1;
                                newData["kepala_bps"] = !newData["kepala_bps"];
                                setData({
                                    ...data,
                                    tebusan1: newData,
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
                            className="w-5 h-5 rounded-sm "
                            onChange={() => {
                                const newData = data.tebusan1;
                                newData["pns"] = !newData["pns"];
                                setData({
                                    ...data,
                                    tebusan1: newData,
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
                    <td className="border">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm "
                            onChange={() => {
                                const newData = data.tebusan1;
                                newData["kepala_biro"] =
                                    !newData["kepala_biro"];
                                setData({
                                    ...data,
                                    tebusan1: newData,
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
                            className="w-5 h-5 rounded-sm "
                            onChange={() => {
                                const newData = data.tebusan1;
                                newData["arsip"] = !newData["arsip"];
                                setData({
                                    ...data,
                                    tebusan1: newData,
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

                {/* ------------- */}
            </tbody>
        </table>
    );
}
