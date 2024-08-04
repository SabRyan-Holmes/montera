import { DateInput, InputLabel, TextInput } from "@/Components";
import React, { useState } from "react";

export default function AkumulasiTable({ data, setData, pegawai, akNormatif }) {
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
                <tr className="border">
                    <td>Tahun</td>
                    <td>Periodik(Bulan)</td>
                    <td>Predikat</td>
                    <td>Presentase</td>
                </tr>
            </thead>
            <tbody className="border">
                <tr className="text-center">
                    <td className="border"> _</td>
                    <td className="border ">_</td>
                    <td className="border ">_</td>
                    <td className="border ">_</td>
                    <td className="border ">_</td>
                    <td className="border text-center ">
                        <TextInput
                            id="angka_kredit"
                            name="angka_kredit"
                            min={0}
                            max={100}
                            step={0.1}
                            type="number"
                            className="placeholder:text-accent text-center"
                            autoComplete="username"
                            placeholder="0,0"
                            onChange={(e) =>
                                setData("angka_kredit", e.target.value)
                            }
                        />

                        {/* <InputError message={errors.email} className="mt-2" /> */}
                    </td>
                </tr>
                <tr className="border uppercase text-center">
                    {/* TODO: Bikin lebih Dinamsi */}
                    <td className="border">{"2023"}</td>
                    <td className="border ">{"Januari - Desember"}</td>
                    <td className="border">{"Sangat Baik"}</td>
                    <td className="border">{"150%"}</td>
                    <td className="border">{"18.7"}</td>
                    <td className="border">{"18.7"}</td>
                </tr>
                <tr className="border uppercase">
                    <td
                        colSpan={5}
                        className="border text-center font-semibold"
                    >
                        jumlah angka kredit yang diperoleh
                    </td>
                    <td className="border text-center">{"45.094"}</td>
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
