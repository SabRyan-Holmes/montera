import { DateInput, InputLabel, TextInput } from "@/Components";
import React, { useEffect, useState } from "react";

export default function KonversiTable({
    data,
    setData,
    aturanKonvTableProps: {
        koefisienPertahun,
        predikatPresentase,
        tebusanKonversi,
    },
    isEdit,
    historyData,
}) {
    const handleKeyPress = (e) => {
        // Mengizinkan angka dan tanda koma atau titik
        if (!/[0-9,.]/.test(e.key)) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        if (!isEdit && data.pegawai) {
            const findkoefisienPertahunValue = (jabatan) => {
                const key = Object.keys(koefisienPertahun).find((k) =>
                    jabatan.includes(k)
                );
                return key ? koefisienPertahun[key] : null;
            };
            let koefisienPertahunValue = findkoefisienPertahunValue(
                data.pegawai["Jabatan/TMT"]
            );
            setData("ak_normatif", koefisienPertahunValue);
        }
    }, [data.pegawai]); // Tambahkan pegawai sebagai dependency jika datanya bisa berubah

    function hitungAk(periode, koefisienPertahun, presentase) {
        const ak_kredit =
            parseFloat(periode / 12) *
            parseFloat(koefisienPertahun) *
            parseFloat(presentase / 100);
        const result = parseFloat(ak_kredit).toFixed(3);
        return result;
    }

    // Logika Hitung AK dijalankan ketika ada perubahan
    useEffect(() => {
        let koefisienPertahun = data.ak_normatif
            ? data.ak_normatif
            : data.ak_normatif_ops;
        if (koefisienPertahun == null) {
            // Ammbil dari inputan custom
            koefisienPertahun = data.ak_normatif_ops;
            data.ak_normatif = koefisienPertahun;
        }
        const akKreditValue = hitungAk(
            data.angka_periode,
            koefisienPertahun,
            data.presentase
        );
        setData("angka_kredit", akKreditValue);

        if (data.angka_periode === 0 && data.angka_kredit === 0) {
            setIsPeriodeExist(false);
        } else {
            setIsPeriodeExist(true);
        }
    }, [
        data.angka_periode,
        data.ak_normatif,
        data.predikat,
        data.presentase,
        data.ak_normatif_ops,
    ]);

    useEffect(() => {
        setData("predikat", predikatPresentase[data.presentase]);
    }, [data.presentase]);

    useEffect(() => {
        // Cek perubahan jabatan setiap kali data pegawai berubah
        if (data.pegawai) {
            isJabatanChanged();
        }
    }, [data.pegawai]);

    const [isPeriodeExist, setIsPeriodeExist] = useState(false);
    const [jabatanChanged, setJabatanChanged] = useState(false);

    // Fungsi untuk mengecek perubahan jabatan
    const isJabatanChanged = () => {
        if (!data.pegawai || !data.ak_normatif) return false;

        const currentJabatan = data.pegawai["Jabatan/TMT"];
        const findkoefisienPertahunValue = (jabatan) => {
            const key = Object.keys(koefisienPertahun).find((k) =>
                jabatan.includes(k)
            );
            return key ? koefisienPertahun[key] : null;
        };

        const expectedValue = findkoefisienPertahunValue(currentJabatan);
        const changed = expectedValue !== data.ak_normatif;
        setJabatanChanged(changed); // Update state
        return changed;
    };

    const handleSesuaikan = () => {
        // Update ke nilai yang sesuai jabatan baru
        const currentJabatan = data.pegawai["Jabatan/TMT"];
        const findkoefisienPertahunValue = (jabatan) => {
            const key = Object.keys(koefisienPertahun).find((k) =>
                jabatan.includes(k)
            );
            return key ? koefisienPertahun[key] : null;
        };

        const newValue = findkoefisienPertahunValue(currentJabatan);

        // Update nilai normatif
        setData("ak_normatif", newValue);
        setData("ak_normatif_ops", null);

        // Hitung ulang angka kredit
        const akKreditValue = hitungAk(
            data.angka_periode,
            newValue,
            data.presentase
        );
        setData("angka_kredit", akKreditValue);
        setJabatanChanged(false); // Kembalikan status ke false
    };

    console.log("data.ak_normatif");
    console.log(data.ak_normatif);

    return (
        <table className="table text-base table-bordered">
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
                            maxLength={30}
                            defaultValue={data.no_surat1}
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
                    <td colSpan={2} className="font-semibold text-center ">
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
                    <td className="flex justify-center w-full border-none">
                        <select
                            name="presentase"
                            id="presentase"
                            className="w-24 px-1 text-center rounded-md border-gradient"
                            defaultValue={data.presentase}
                            onChange={(e) => {
                                setData("presentase", e.target.value);
                            }}
                        >
                            <option value="25">25%</option>
                            <option value="50">50%</option>
                            <option value="75">75%</option>
                            <option value="100">100%</option>
                            <option value="150">150%</option>
                        </select>
                    </td>
                    <td className="border">
                        {/* TODO: Tambahkan logika apakah ak_normatif dr database apakah masih cocok dgn data pegawai terbaru yang bisa saja berubah */}

                        {!isEdit && data.ak_normatif && (
                            <span>{data.ak_normatif}</span>
                        )}

                        {isEdit && jabatanChanged ? (
                            <div className="flex flex-col justify-center gap-1">
                                <small className="block text-xs rounded-lg text-warning bg-warning/10">
                                    Jabatan pegawai telah berubah!
                                    <br />
                                    Koefisien per tahun perlu disesuaikan.
                                </small>
                                <div className="flex justify-center gap-2">
                                    <button
                                        type="button"
                                        className="px-2 py-1 text-xs bg-blue-100 rounded"
                                        onClick={handleSesuaikan}
                                    >
                                        Sesuaikan Otomatis
                                    </button>
                                    <button
                                        type="button"
                                        className="px-2 py-1 text-xs bg-gray-100 rounded"
                                        onClick={() => {
                                            // Reset semua perubahan
                                            setData(
                                                "ak_normatif",
                                                data.ak_normatif
                                            );
                                            setData("ak_normatif_ops", null);
                                            setJabatanChanged(false); // Kembalikan status ke false
                                        }}
                                    >
                                        Biarkan
                                    </button>
                                </div>
                            </div>
                        ) : (
                            isEdit &&
                            data.ak_normatif && <span>{data.ak_normatif}</span>
                        )}
                    </td>
                    <td className="border">
                        {!isPeriodeExist && (
                            <small className="block text-xs rounded-lg text-warning bg-warning/10">
                                Periode Penilaian Harus Diisi Terlebih dahulu!
                            </small>
                        )}

                        {data.angka_kredit && !isNaN(data.angka_kredit)
                            ? data.angka_kredit
                            : "0"}
                    </td>
                </tr>

                <tr>
                    <td rowSpan={3} className="text-lg font-semibold ">
                        Tebusan
                    </td>

                    {/* {tebusanKonversi.map((data, index) => (
                        <td key={index} className="border">
                            <input
                                type="checkbox"
                                value={true}
                                className="w-5 h-5 rounded-sm"
                                defaultChecked={
                                    isEdit && historyData.tebusan1.checked
                                }
                                onChange={() => {
                                    // Salin array-nya dulu biar tidak langsung mutate state
                                    const updatedTebusan = [...data.tebusan1];
                                    updatedTebusan[index] = {
                                        ...item,
                                        checked: !item.checked,
                                    };

                                    setData({
                                        ...data,
                                        tebusan1: updatedTebusan,
                                    });
                                }}
                            />
                            <InputLabel
                                forName={data.pihak_tebusan}
                                className="inline-block ml-2 text-sm"
                                value={data.pihak_tebusan}
                            />
                        </td>
                    ))} */}

                    <td className="border">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm"
                            defaultChecked={
                                isEdit && historyData.tebusan1["kepala_reg"]
                            }
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
                            className="inline-block ml-2 text-sm"
                            value="Kepala Kantor Regional VII BKN"
                        />
                    </td>

                    <td colSpan={2} className="border ">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm"
                            defaultChecked={
                                isEdit && historyData.tebusan1["sekretaris"]
                            }
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
                            className="inline-block ml-2 text-sm"
                            value="Sekretaris Tim Penilai Yang Bersangkutan"
                        />
                    </td>
                </tr>

                <tr>
                    <td className="border">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm"
                            defaultChecked={
                                isEdit && historyData.tebusan1["kepala_bps"]
                            }
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
                                isEdit && historyData.tebusan1["pns"]
                            }
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
                            className="inline-block ml-2 text-sm"
                            value="PNS Bersangkutan"
                        />
                    </td>
                </tr>
                <tr>
                    <td className="border">
                        <input
                            type="checkbox"
                            value={true}
                            className="w-5 h-5 rounded-sm"
                            defaultChecked={
                                isEdit && historyData.tebusan1["kepala_biro"]
                            }
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
                                isEdit && historyData.tebusan1["arsip"]
                            }
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
                            className="inline-block ml-2 text-sm"
                            value="Arsip"
                        />
                    </td>
                </tr>

                {/* ------------- */}
            </tbody>
        </table>
    );
}
