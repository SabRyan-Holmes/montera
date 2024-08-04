import { DateInput, InputLabel, TextInput } from "@/Components";
import React, { useState } from "react";

export default function KonversiTable({ data, setData, pegawai, akNormatif }) {
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

    return (
        <table className="table text-base">
            {/* head */}
            <thead>
                <tr className="text-lg bg-orange-500 text-white text-center">
                    <th colSpan={4}>KONVERSI PREDIKAT KINERJA ANGKA KREDIT</th>
                </tr>
            </thead>
            <tbody className="border">
                {/* row 1 */}

                <tr>
                    <td className="uppercase border text-center">
                        <InputLabel
                            htmlFor="no_surat1"
                            className="inline-block ml-1 text-lg "
                            value="NOMOR SURAT"
                        />
                    </td>
                    <td>
                        <TextInput
                            id="no_surat1"
                            name="no_surat1"
                            className="w-64"
                            placeholder="contoh: 1500.445/Konv/2024"
                            onChange={(e) =>
                                setData("no_surat1", e.target.value)
                            }
                        />
                    </td>
                </tr>
                <tr className="border text-center">
                    <td
                        colSpan={2}
                        className="text-center font-medium text-normal "
                    >
                        Hasil Penilaian Kinerja
                    </td>
                    <td rowSpan={2} className="border">
                        Koefisien Pertahun
                    </td>
                    <td rowSpan={2}>Angka Kredit yang didapat</td>
                </tr>

                <tr>
                    <td className="uppercase text-center border">Predikat</td>
                    <td className="uppercase text-center border">Presentase</td>
                </tr>

                <tr className="text-center">
                    <td className="border">
                        {presentase1 == 150 && <strong>Sangat Baik</strong>}

                        {presentase1 == 100 && <strong>Baik</strong>}
                    </td>
                    <td className="flex justify-center w-full">
                        <select
                            name="presentase"
                            id="presentase"
                            className="w-24 px-1 rounded-md text-center border-gradient"
                            onChange={(e) => {
                                setData("presentase", e.target.value);
                                setPresentase1(e.target.value);
                            }}
                        >
                            <option selected value="75">75%</option>
                            <option selected value="100">
                                100%
                            </option>
                            <option value="150">150%</option>
                        </select>
                    </td>
                    <td className="border">
                        {akNormatif[jabatanOnly] ? (
                            <span>{akNormatif[jabatanOnly]}</span>
                        ) : (
                            <TextInput
                                id="ak_normatif1"
                                type="text"
                                name="ak_normatif1"
                                className=""
                                // onChange={onChangeToNumber}
                                placeholder="Input Manual Angka Normatif"
                                onKeyPress={handleKeyPress}
                                onChange={(e) =>
                                    setData("ak_normatif1", e.target.value)
                                }
                            />
                        )}
                    </td>
                    {/* TODO Logika Angka Kredit Nanti */}
                    <td className="border">{"18.7"}</td>
                </tr>

                <tr>
                    <td
                        rowSpan={3}
                        className="text-lg font-semibold text-slate-500"
                    >
                        Tebusan
                    </td>
                    <td className="border">
                        <input
                            type="checkbox"
                            value={true}
                            className=" w-5 h-5 rounded-sm"
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
                            className=" w-5 h-5 rounded-sm"
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
                            className=" w-5 h-5 rounded-sm"
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
                            className=" w-5 h-5 rounded-sm"
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
                            className=" w-5 h-5 rounded-sm"
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
                            className=" w-5 h-5 rounded-sm"
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
