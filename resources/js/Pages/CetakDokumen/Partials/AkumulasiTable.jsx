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
            <thead>
                <tr className="text-lg text-center text-white uppercase bg-orange-500">
                    <th colSpan={6}>Akumulasi Angka Kredit</th>
                </tr>
            </thead>
            <tbody className="border">
                <tr className="border">
                    <td className="text-center uppercase border" width="18.5%">
                        <strong>NOMOR SURAT</strong>
                    </td>
                    <td colSpan={5} className="border">
                        <TextInput
                            id="no_surat2"
                            type="text"
                            maxLength={20}
                            name="no_surat2"
                            placeholder="contoh: 1500.445/Akm/2024"
                            required
                            className="w-64 h-12"
                            onChange={(e) =>
                                setData("no_surat2", e.target.value)
                            }
                            list="no_surat2"
                            />
                            <datalist id="no_surat2">
                                <option value="1500.455/Akm/2024" />
                            </datalist>
                    </td>
                </tr>
                <tr className="border">
                    <td
                        colSpan={4}
                        className="font-semibold text-center border"
                    >
                        Hasil Penilaian Kinerja
                    </td>
                    <td rowSpan={2} className="border">
                        Koefisien Per Tahun
                    </td>
                    <td rowSpan={2} className="border">
                        Angka Kredit Yang Didapat
                    </td>
                </tr>
                <tr className="text-center border">
                    <td className="border">Tahun</td>
                    <td className="border">Periodik(Bulan)</td>
                    <td className="border">Predikat</td>
                    <td className="border">Presentase</td>
                </tr>
                <tr className="text-center">
                    <td className="border">1</td>
                    <td className="border ">2</td>
                    <td className="border ">3</td>
                    <td className="border ">4</td>
                    <td className="border ">5</td>
                    <td className="text-center border ">6</td>
                </tr>
                <tr className="text-center">
                    <td className="border">
                        <TextInput
                            id="tahun_terakhir"
                            type="text"
                            name="tahun_terakhir"
                            placeholder="2023"
                            maxLength={4}
                            required
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
                    <td className="text-center border ">
                        <TextInput
                            id="ak_terakhir"
                            name="ak_terakhir"
                            min={0}
                            max={1000}
                            step={0.001}
                            type="number"
                            required
                            className="text-center placeholder:text-accent"
                            placeholder="0,0"
                            defaultValue={data.ak_terakhir}
                            onChange={(e) =>
                                setData("ak_terakhir", e.target.value)
                            }
                        />
                    </td>
                </tr>
                <tr className="text-center uppercase border">
                    <td className="border">
                        <TextInput
                            id="tahun_ini"
                            type="text"
                            name="tahun_ini"
                            required
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
                <tr className="uppercase border">
                    <td
                        colSpan={5}
                        className="font-semibold text-center border"
                    >
                        jumlah angka kredit yang diperoleh
                    </td>
                    <td className="text-center border">
                        {data.jumlah_ak_kredit}
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td
                        rowSpan={3}
                        className="text-lg border text-slate-700"
                    >
                        Tebusan
                    </td>
                    <td colSpan={3} className="border-y">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm "
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

                    <td colSpan={3} className="border">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm "
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
                    <td colSpan={3} className="border-y">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm "
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
                            className="w-5 h-5 rounded-sm "
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
                    <td colSpan={3} className="border-y">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm "
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
                            className="w-5 h-5 rounded-sm "
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
