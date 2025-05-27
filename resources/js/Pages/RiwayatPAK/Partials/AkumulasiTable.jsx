import { InputLabel, TextInput } from "@/Components";
import React, { useEffect, useRef, useState } from "react";

export default function AkumulasiTable({
    data,
    setData,
    isEdit,
    historyData,
    aturanAkmTableProps: { predikatPresentase, tebusanAkumulasi },
    pengusulanData = null,
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

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isEdit && isFirstRender.current) {
            var jumlahAkKredit =
                parseFloat(data.ak_terakhir) + parseFloat(data.angka_kredit);
            setData({
                ...data,
                jumlah_ak_kredit: jumlahAkKredit.toFixed(3),
            });
            data.jumlah_ak_kredit = jumlahAkKredit.toFixed(3);
            isFirstRender.current = false;
            return;
        }
        var jumlahAkKredit =
            parseFloat(data.ak_terakhir) + parseFloat(data.angka_kredit);
        setData("jumlah_ak_kredit", jumlahAkKredit.toFixed(3));
    }, [data.ak_terakhir, data.angka_kredit]);

    useEffect(() => {
        console.log("isi pNegusulan dari akumulasi");
        console.log(pengusulanData);
        if (pengusulanData !== null) {
            var ak_terakhir = parseFloat(pengusulanData.jumlah_ak_terakhir).toFixed(3);
            setData("ak_terakhir", ak_terakhir);
            data.ak_terakhir = ak_terakhir;
        }
    }, []);

    console.log("Isi Data");
    console.log(data);
    return (
        <table className="table text-base table-bordered">
            <thead>
                <tr className="text-lg text-center text-white uppercase bg-secondary">
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
                            maxLength={30}
                            name="no_surat2"
                            placeholder="contoh: 1500.445/Akm/2024"
                            defaultValue={data.no_surat2}
                            required
                            className="w-64 h-12 border"
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
                <tr className="text-center border">
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
                            type="number"
                            name="tahun_terakhir"
                            placeholder="tahun sebelumnya"
                            maxLength={4}
                            required
                            onKeyPress={handleKeyPress}
                            className="w-32 text-center"
                            defaultValue={data["tahun_terakhir"]}
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
                            max={5000}
                            step={0.001}
                            type="number"
                            required
                            className="text-center placeholder:text-accent"
                            placeholder="0,0"
                            defaultValue={data.ak_terakhir}
                            value={
                                (isEdit && data.ak_terakhir) ||
                                (pengusulanData && data.ak_terakhir)
                            }
                            onChange={(e) => {
                                let value = e.target.value;

                                // Kalau kosong, set ke 0
                                if (value === "" || value === null) {
                                    setData("ak_terakhir", 0);
                                    return;
                                }

                                // Paksa jadi float maksimal 3 digit desimal
                                const floatValue = parseFloat(value);
                                const formatted = floatValue.toFixed(3);

                                // Update input dan data hanya jika user ngetik valid number
                                if (!isNaN(floatValue)) {
                                    setData("ak_terakhir", formatted);
                                    e.target.value = formatted;
                                }
                            }}
                        />
                    </td>
                </tr>
                <tr className="text-center uppercase border">
                    <td className="border">
                        <TextInput
                            id="tahun_ini"
                            type="number"
                            name="tahun_ini"
                            defaultValue={data.tahun_ini}
                            required
                            placeholder="tahun sekarang"
                            maxLength={4}
                            onKeyPress={handleKeyPress}
                            className="w-32 text-center"
                            onChange={(e) =>
                                setData("tahun_ini", e.target.value)
                            }
                        />
                    </td>
                    <td className="border ">
                        {bulan[data.periode_mulai]}-
                        {bulan[data.periode_berakhir]}
                    </td>
                    <td className="border">{data.predikat}</td>
                    <td className="border">{data.presentase}%</td>
                    <td className="border">{data.ak_normatif}</td>
                    <td className="border">
                        {isEdit && !data["angka_kredit"]
                            ? historyData["angka_kredit"]
                            : data["angka_kredit"]}
                    </td>
                </tr>
                <tr className="uppercase border">
                    <td
                        colSpan={5}
                        className="font-semibold text-center border"
                    >
                        jumlah angka kredit yang diperoleh
                    </td>
                    <td className="text-center border">
                        {
                            // Render pertama: tampilkan historyData
                            data.jumlah_ak_kredit // Setelah render pertama: tampilkan hasil dari efek
                        }
                    </td>
                </tr>
            </tbody>
            <tfoot>
                {data.tebusan2
                    .reduce((rows, item, index) => {
                        if (index % 2 === 0) rows.push([item]);
                        else rows[rows.length - 1].push(item);
                        return rows;
                    }, [])
                    .map((pair, index) => (
                        <tr key={index}>
                            {index === 0 && (
                                <td
                                    rowSpan={Math.ceil(
                                        data.tebusan2.length / 2
                                    )}
                                    className="text-lg text-center border text-slate-700"
                                >
                                    Tebusan
                                </td>
                            )}
                            {pair.map((item, i) => (
                                <td
                                    key={item.id}
                                    colSpan={3}
                                    className="border-y"
                                >
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded-sm"
                                        checked={item.checked}
                                        onChange={() => {
                                            const updated = [...data.tebusan2];
                                            const indexInGlobal = index * 2 + i;
                                            updated[indexInGlobal].checked =
                                                !updated[indexInGlobal].checked;
                                            setData("tebusan2", updated);
                                        }}
                                    />
                                    <InputLabel
                                        htmlFor={`tebusan2_${index * 2 + i}`}
                                        className="inline-block ml-2 text-sm"
                                        value={item.pihak_tebusan}
                                    />
                                </td>
                            ))}
                            {pair.length === 1 && (
                                <td colSpan={3} className="border" />
                            )}
                        </tr>
                    ))}
            </tfoot>
        </table>
    );
}
