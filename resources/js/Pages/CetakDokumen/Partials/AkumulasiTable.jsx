import { DateInput, InputLabel, TextInput } from "@/Components";
import React, { useEffect, useState } from "react";

export default function AkumulasiTable({
    data,
    setData,

    predikat,
}) {
    const handleKeyPress = (e) => {
        // Mencegah karakter non-numeric
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    const bulan = {
        1: "Januari",
        2: "Februari",
        3: "Maret",
        4: "April",
        5: "Mei",
        6: "Juni",
        7: "Juli",
        8: "Agustus",
        9: "September",
        10: "Oktober",
        11: "November",
        12: "Desember",
    };

    // FIXME : Bug Ak kredit ikut berubah

    useEffect(() => {
        var jumlahAkKredit =
            parseFloat(data.ak_terakhir) + parseFloat(data.angka_kredit);
        console.log("jumlahAkKredit");
        console.log(jumlahAkKredit);
        setData("jumlah_ak_kredit", jumlahAkKredit.toFixed(3));
    }, [data.ak_terakhir, data.angka_kredit]);

    return (
        <table className="table text-base">
            <thead className="text-base">
                <tr className="text-lg uppercase bg-orange-500 text-white text-center">
                    <th colSpan={6}>Akumulasi Angka Kredit</th>
                </tr>
                <tr className="border">
                    <td colSpan={2} className="text-center">
                        <InputLabel
                            htmlFor="no_surat2"
                            className="inline-block ml-1 text-lg"
                            value="NOMOR SURAT"
                        />
                    </td>
                    <td colSpan={4} className="border">
                        <TextInput
                            id="no_surat2"
                            type="text"
                            maxLength={20}
                            name="no_surat2"
                            placeholder="contoh: 1500.445/Akm/2024"
                            className="w-64"
                            onChange={(e) =>
                                setData("no_surat2", e.target.value)
                            }
                        />

                        {/* <InputError message={errors.email} className="mt-2" /> */}
                    </td>
                </tr>
                <tr className="border">
                    <td colSpan={4} className="border text-center">
                        Hasil Penilaian Kinerja
                    </td>
                    <td rowSpan={2} className="border">
                        Koefisien Per Tahun
                    </td>
                    <td rowSpan={2} className="border">
                        Angka Kredit Yang Didapat
                    </td>
                </tr>
                <tr className="border text-center">
                    <td className="border">Tahun</td>
                    <td className="border">Periodik(Bulan)</td>
                    <td className="border">Predikat</td>
                    <td className="border">Presentase</td>
                </tr>
            </thead>
            <tbody className="border">
                <tr className="text-center">
                    <td className="border">1</td>
                    <td className="border ">2</td>
                    <td className="border ">3</td>
                    <td className="border ">4</td>
                    <td className="border ">5</td>
                    <td className="border text-center ">6</td>
                </tr>
                <tr className="text-center">
                    <td className="border">
                        <TextInput
                            id="tahun_terakhir"
                            type="text"
                            name="tahun_terakhir"
                            placeholder="2023"
                            maxLength={4}
                            onKeyPress={handleKeyPress}
                            className="w-16"
                            onChange={(e) =>
                                setData("tahun_terakhir", e.target.value)
                            }
                        />
                    </td>
                    <td className="border ">_</td>
                    <td className="border ">_</td>
                    <td className="border ">_</td>
                    <td className="border ">_</td>
                    <td className="border text-center ">
                        <TextInput
                            id="ak_terakhir"
                            name="ak_terakhir"
                            min={0}
                            max={100}
                            step={0.1}
                            type="number"
                            className="placeholder:text-accent text-center"
                            placeholder="0,0"
                            defaultValue={data.ak_terakhir}
                            onChange={(e) =>
                                setData("ak_terakhir", e.target.value)
                            }
                        />
                    </td>
                </tr>
                <tr className="border uppercase text-center">
                    <td className="border">
                        <TextInput
                            id="tahun_ini"
                            type="text"
                            name="tahun_ini"
                            placeholder="tahun"
                            maxlength={4}
                            onKeyPress={handleKeyPress}
                            className="w-16"
                            onChange={(e) =>
                                setData("tahun_ini", e.target.value)
                            }
                        />
                    </td>
                    <td className="border ">
                        {bulan[data.periode_mulai]}-
                        {bulan[data.periode_berakhir]}
                    </td>
                    <td className="border">{predikat[data.presentase]}</td>
                    <td className="border">{data.presentase}</td>
                    <td className="border">{data.ak_normatif}</td>
                    <td className="border">{data["angka_kredit"]}</td>
                </tr>
                <tr className="border uppercase">
                    <td
                        colSpan={5}
                        className="border text-center font-semibold"
                    >
                        jumlah angka kredit yang diperoleh
                    </td>
                    <td className="border text-center">
                        {data.jumlah_ak_kredit}
                    </td>
                </tr>
            </tbody>
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
                                const newData = data.tebusan2;
                                newData["kepala_reg"] = !newData["kepala_reg"];
                                setData({
                                    ...data,
                                    tebusan2: newData,
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
                                const newData = data.tebusan2;
                                newData["sekretaris"] = !newData["sekretaris"];
                                setData({
                                    ...data,
                                    tebusan2: newData,
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
                                const newData = data.tebusan2;
                                newData["kepala_bps"] = !newData["kepala_bps"];
                                setData({
                                    ...data,
                                    tebusan2: newData,
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
                                const newData = data.tebusan2;
                                newData["pns"] = !newData["pns"];
                                setData({
                                    ...data,
                                    tebusan2: newData,
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
                                const newData = data.tebusan2;
                                newData["kepala_biro"] =
                                    !newData["kepala_biro"];
                                setData({
                                    ...data,
                                    tebusan2: newData,
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
                                const newData = data.tebusan2;
                                newData["arsip"] = !newData["arsip"];
                                setData({
                                    ...data,
                                    tebusan2: newData,
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
