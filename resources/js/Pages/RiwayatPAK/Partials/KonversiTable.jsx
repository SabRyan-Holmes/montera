import { DateInput, InputLabel, TextInput } from "@/Components";
import React, { useEffect, useState } from "react";

export default function KonversiTable({
    data,
    setData,
    aturanKonvTableProps: { koefisienPertahun, predikatPresentase },
    rumusPenghitungan: { useRumusAngkaKredit },
    isEdit = false,
    isByPengusulan = false,
}) {
    const handleKeyPress = (e) => {
        // Mengizinkan angka dan tanda koma atau titik
        if (!/[0-9,.]/.test(e.key)) {
            e.preventDefault();
        }
    };

    useEffect(() => {
        // Panggil fungsi untuk cek perubahan jabatan
        isJabatanChanged();
    }, [data.pegawai]);

    // Logika Hitung AK dijalankan ketika ada perubahan
    useEffect(() => {
        const akNormatif = data.ak_normatif ?? data.ak_normatif_ops;
        console.log("🔥 MENGHITUNG ANGKA KREDIT");
        console.log("ak_normatif:", data.ak_normatif);
        console.log("angka_periode:", data.angka_periode);
        console.log("presentase:", data.presentase);

        if (data.angka_periode && data.presentase && akNormatif != null) {
            const AKValue = useRumusAngkaKredit(
                data.angka_periode,
                akNormatif,
                data.presentase
            );
            console.log("✅ angka_kredit dihitung:", AKValue);
            setData("angka_kredit", AKValue);
            setIsPeriodeExist(!(data.angka_periode === 0 && angka === 0));
        }
    }, [
        data.ak_normatif,
        data.angka_periode,
        data.predikat,
        data.presentase,
        data.ak_normatif_ops,
    ]);

    useEffect(() => {
        setData("predikat", predikatPresentase[data.presentase]);
    }, [data.presentase]);

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
        const akKreditValue = useRumusAngkaKredit(
            data.angka_periode,
            newValue,
            data.presentase
        );
        setData("angka_kredit", akKreditValue);
        setJabatanChanged(false); // Kembalikan status ke false
    };

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
                    <td className="text-center uppercase border" width="18.5%">
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
                            value={data.presentase}
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
                        {!isEdit && data.ak_normatif && (
                            <span>{data.ak_normatif}</span>
                        )}

                        {!data.ak_normatif && (
                            <small className="block text-xs rounded-lg text-warning bg-warning/10">
                                Pegawai ini tidak termasuk dalam kategori
                                pegawai fungsional!
                            </small>
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
                            : "0.000"}
                    </td>
                </tr>

                {[...Array(Math.ceil(data.tebusan1.length / 2))].map(
                    (_, rowIndex) => {
                        const start = rowIndex * 2;
                        const items = data.tebusan1.slice(start, start + 2);
                        // console.warn(teb)
                        return (
                            <tr key={rowIndex}>
                                {/* Kolom "Tebusan" hanya ditampilkan di baris pertama dengan rowSpan dinamis */}
                                {rowIndex === 0 && (
                                    <td
                                        rowSpan={Math.ceil(
                                            data.tebusan1.length / 2
                                        )}
                                        className="text-lg font-semibold text-center"
                                    >
                                        Tebusan
                                    </td>
                                )}
                                {/* ANCHOR */}
                                {items.map((item, colIndex) => {
                                    const globalIndex = start + colIndex;
                                    // console.log(item)
                                    return (
                                        <td
                                            key={globalIndex}
                                            className="border"
                                            colSpan={colIndex === 1 ? 2 : 1}
                                        >
                                            <input
                                                type="checkbox"
                                                id={`tebusan-${globalIndex}`} // Tambahkan ID                                                className="w-5 h-5 rounded-sm"
                                                checked={item.checked}
                                                onChange={() => {
                                                    setData(
                                                        "tebusan1",
                                                        data.tebusan1.map(
                                                            (item, i) =>
                                                                i ===
                                                                globalIndex
                                                                    ? {
                                                                          ...item,
                                                                          checked:
                                                                              !item.checked,
                                                                      }
                                                                    : item
                                                        )
                                                    );

                                                    // const updated = [
                                                    //     ...data.tebusan1,
                                                    // ];
                                                    // updated[
                                                    //     globalIndex
                                                    // ].checked =
                                                    //     !updated[globalIndex]
                                                    //         .checked;
                                                    // setData(
                                                    //     "tebusan1",
                                                    //     updated
                                                    // );
                                                }}
                                            />
                                            <InputLabel
                                                htmlFor={`tebusan-${globalIndex}`} // Tambahkan ID
                                                className="inline-block ml-2 text-sm"
                                                value={item.pihak_tebusan}
                                            />
                                        </td>
                                    );
                                })}

                                {/* Jika jumlahnya ganjil, isi 1 kolom kosong biar tetap rapi */}
                                {items.length === 1 && (
                                    <td className="border" colSpan={2}></td>
                                )}
                            </tr>
                        );
                    }
                )}
            </tbody>
        </table>
    );
}
