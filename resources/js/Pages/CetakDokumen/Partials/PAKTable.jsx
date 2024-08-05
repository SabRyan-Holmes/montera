import { DateInput, InputLabel, TextInput } from "@/Components";
import React, { useEffect, useState } from "react";
import { MdAddBox } from "react-icons/md";

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

    // CONSOLE
    // console.log(data.)
    var jakk_lama =
        parseFloat(data.ak_dasar["lama"]) +
        parseFloat(data.ak_jf["lama"]) +
        parseFloat(data.ak_penyesuaian["lama"]) +
        parseFloat(data.ak_konversi["lama"]) +
        parseFloat(data.ak_peningkatan["lama"]);

    var jakk_baru =
        parseFloat(data.ak_dasar["baru"]) +
        parseFloat(data.ak_jf["baru"]) +
        parseFloat(data.ak_penyesuaian["baru"]) +
        parseFloat(data.ak_konversi["baru"]) +
        parseFloat(data.ak_peningkatan["baru"]);

    var jakk_jumlah =
        parseFloat(data.ak_dasar["jumlah"]) +
        parseFloat(data.ak_jf["jumlah"]) +
        parseFloat(data.ak_penyesuaian["jumlah"]) +
        parseFloat(data.ak_konversi["jumlah"]) +
        parseFloat(data.ak_peningkatan["jumlah"]);

    // var jakk_keterangan =
    //     parseFloat(data.ak_dasar["keterangan"]) +
    //     parseFloat(data.ak_jf["keterangan"]) +
    //     parseFloat(data.ak_penyesuaian["keterangan"]) +
    //     parseFloat(data.ak_konversi["keterangan"]) +
    //     parseFloat(data.ak_peningkatan["keterangan"]);

    // Logika Jumlah AK Dasar

    const [jumlahAkDasar, setjumlahAkDasar] = useState(data.ak_dasar["jumlah"]);

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
                            autoComplete="username"
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
                {/* row 1 */}
                <tr className="text-base capitalize  text-slate-600 font-semibold border-separate space-x-0">
                    <td className="border text-center">1</td>
                    <td className="border">AK Dasar yang diberikan</td>
                    <td className="border" width="10%">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            type="number"
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="0,0"
                            onChange={(e) => {
                                const newData = data.ak_dasar;
                                newData["lama"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_dasar: newData,
                                });
                            }}
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            type="number"
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="0,0"
                            onChange={(e) => {
                                const newData = data.ak_dasar;
                                newData["baru"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_dasar: newData,
                                });
                            }}
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            value={
                                data.ak_dasar["jumlah"] != 0
                                    ? parseFloat(
                                          data.ak_dasar["jumlah"].toFixed(2)
                                      )
                                    : null
                            }
                            type="number"
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="0,0"
                            disabled
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="Input Ket."
                            onChange={(e) => {
                                const newData = data.ak_dasar;
                                newData["keterangan"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_dasar: newData,
                                });
                            }}
                        />
                    </td>
                </tr>
                {/* row 2 */}
                <tr className="text-base capitalize  text-slate-600 font-semibold border-separate space-x-0">
                    <td className="border text-center">2</td>
                    <td className="border">AK JF Lama</td>
                    <td className="border ">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            type="number"
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="0,0"
                            onChange={(e) => {
                                const newData = data.ak_jf;
                                newData["lama"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_jf: newData,
                                });
                            }}
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            type="number"
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="0,0"
                            onChange={(e) => {
                                const newData = data.ak_jf;
                                newData["baru"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_jf: newData,
                                });
                            }}
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            value={
                                data.ak_jf["jumlah"] != 0
                                    ? parseFloat(
                                          data.ak_jf["jumlah"].toFixed(2)
                                      )
                                    : null
                            }
                            type="number"
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="0,0"
                            disabled
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="Input Ket."
                            onChange={(e) => {
                                const newData = data.ak_jf;
                                newData["keterangan"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_jf: newData,
                                });
                            }}
                        />
                    </td>
                </tr>
                {/* row 3 */}
                <tr className="text-base capitalize  text-slate-600 font-semibold border-separate space-x-0">
                    <td className="border text-center">3</td>
                    <td className="border">AK Penyesuaian/ Penyetsaraan</td>
                    <td className="border ">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            type="number"
                            className="placeholder:text-accent text-center text-hijau number-input"
                            autoComplete="username"
                            placeholder="0,0"
                            onChange={(e) => {
                                const newData = data.ak_penyesuaian;
                                newData["lama"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_penyesuaian: newData,
                                });
                            }}
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            type="number"
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="0,0"
                            onChange={(e) => {
                                const newData = data.ak_penyesuaian;
                                newData["baru"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_penyesuaian: newData,
                                });
                            }}
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            value={
                                data.ak_penyesuaian["jumlah"] != 0
                                    ? parseFloat(
                                          data.ak_penyesuaian["jumlah"].toFixed(
                                              2
                                          )
                                      )
                                    : null
                            }
                            type="number"
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="0,0"
                            disabled
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="Input Ket."
                            onChange={(e) => {
                                const newData = data.ak_penyesuaian;
                                newData["keterangan"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_penyesuaian: newData,
                                });
                            }}
                        />
                    </td>
                </tr>
                {/* row 4 */}
                <tr className="text-base capitalize  text-slate-600 font-semibold border-separate space-x-0">
                    <td className="border text-center">4</td>
                    <td className="border">AK Konversi</td>
                    <td className="border ">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            type="number"
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="0,0"
                            onChange={(e) => {
                                const newData = data.ak_konversi;
                                newData["lama"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_konversi: newData,
                                });
                            }}
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            type="number"
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="0,0"
                            onChange={(e) => {
                                const newData = data.ak_konversi;
                                newData["baru"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_konversi: newData,
                                });
                            }}
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            value={
                                data.ak_konversi["jumlah"] != 0
                                    ? parseFloat(
                                          data.ak_konversi["jumlah"].toFixed(2)
                                      )
                                    : null
                            }
                            type="number"
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="0,0"
                            disabled
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="Input Ket."
                            onChange={(e) => {
                                const newData = data.ak_konversi;
                                newData["keterangan"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_konversi: newData,
                                });
                            }}
                        />
                    </td>
                </tr>
                {/* row 5 */}
                <tr className="text-base capitalize  text-slate-600 font-semibold border-separate space-x-0">
                    <td className="border text-center">5</td>
                    <td className="border">
                        AK yang diperoleh dari Peningkatan yang diberikan
                    </td>
                    <td className="border ">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            type="number"
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="0,0"
                            onChange={(e) => {
                                const newData = data.ak_peningkatan;
                                newData["lama"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_peningkatan: newData,
                                });
                            }}
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            type="number"
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="0,0"
                            onChange={(e) => {
                                const newData = data.ak_peningkatan;
                                newData["baru"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_peningkatan: newData,
                                });
                            }}
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            min={0.1}
                            max={100}
                            step={0.1}
                            value={
                                data.ak_peningkatan["jumlah"] != 0
                                    ? parseFloat(
                                          data.ak_peningkatan["jumlah"].toFixed(
                                              2
                                          )
                                      )
                                    : null
                            }
                            type="number"
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="0,0"
                            disabled
                        />
                    </td>
                    <td className="border">
                        <TextInput
                            className="placeholder:text-accent text-center text-hijau"
                            autoComplete="username"
                            placeholder="Input Ket."
                            onChange={(e) => {
                                const newData = data.ak_peningkatan;
                                newData["keterangan"] = e.target.value;
                                setData({
                                    ...data,
                                    ak_peningkatan: newData,
                                });
                            }}
                        />
                    </td>
                </tr>
                {/* row 6 */}
                <tr className="text-base capitalize  text-slate-600 font-semibold border-separate space-x-0">
                    <td className="border text-center">6</td>
                    <td className="border">
                        <button className="text-primary flex justify-center items-center gap-2">
                            <MdAddBox className="w-6 h-6 " />
                            <span className="underline">Tambah Kolom</span>
                        </button>
                    </td>
                    {/* TODO: LOGIKA TAMBAH KOLOM */}
                    <td className="border "></td>
                    <td className="border"></td>
                    <td className="border"></td>
                    <td className="border"></td>
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
                    <td className="border text-center text-lg" colSpan={2} rowSpan={2}>
                        {Math.abs(data.pangkat_keker)}
                    </td>
                    <td className="border text-center text-lg" colSpan={2} rowSpan={2}>
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
