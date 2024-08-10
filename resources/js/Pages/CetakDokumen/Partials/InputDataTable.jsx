import { DateInput, InputLabel, TextInput } from "@/Components";
import React, { useEffect } from "react";

export default function InputDataTable({ data, setData }) {
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

    useEffect(() => {
        setData('angka_periode' , data.periode_mulai + data.periode_berakhir )
        data.angka_periode = data.periode_mulai + data.periode_berakhir
        parseInt(data.angka_periode)
    }, [data.periode_mulai, data.periode_berakhir])


    return (
        <table className="table text-base">
            {/* head */}
            <thead>
                <tr className="text-lg uppercase bg-orange-500 text-white text-center">
                    <th colSpan={4}>Input Data</th>
                </tr>
            </thead>
            <tbody className="border">
                {/* row 1 */}
                <tr>
                    <td className="uppercase border ">
                        Periode/Masa penilaian
                    </td>
                    <td colSpan={3}>
                        <div className="flex items-center gap-4">
                            <select
                                name="periode_mulai"
                                id="periode_mulai"
                                className="w-28 px-4 rounded-md  border-gradient disabled:text-accent font-medium"
                                defaultValue={data.periode_mulai}
                                onChange={(e) => {
                                    const periodeMulai = parseInt(
                                        e.target.value
                                    );
                                    setData("periode_mulai", periodeMulai);

                                    // Jika periode berakhir kurang dari periode mulai, setel periode berakhir menjadi periode mulai
                                    if (data.periode_berakhir < periodeMulai) {
                                        setData(
                                            "periode_berakhir",
                                            periodeMulai
                                        );
                                    }
                                }}
                            >
                                {Object.keys(bulan).map((key) => (
                                    <option key={key} value={key}>
                                        {bulan[key]}
                                    </option>
                                ))}
                            </select>
                            <span>sd</span>
                            <select
                                name="periode_berakhir"
                                id="periode_berakhir"
                                className="w-28 px-4 rounded-md  border-gradient disabled:text-accent font-medium"
                                defaultValue={data.periode_berakhir}
                                disabled={!data.periode_mulai}
                                onChange={(e) => {
                                    setData(
                                        "periode_berakhir",
                                        parseInt(e.target.value)
                                    );
                                }}
                            >
                                {Object.keys(bulan).map((key) => (
                                    <option
                                        key={key}
                                        value={key}
                                        disabled={
                                            data.periode_mulai &&
                                            parseInt(key) < data.periode_mulai
                                        }
                                    >
                                        {bulan[key]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </td>
                </tr>
                {/* row 2 */}
                <tr>
                    <td className="uppercase border ">Tanggal Ditetapkan</td>
                    <td colSpan={3}>
                        <div className="flex items-center gap-4">
                            <DateInput
                                name="tgl_ditetapkan"
                                id="tgl_ditetapkan"
                                onChange={(e) =>
                                    setData("tgl_ditetapkan", e.target.value)
                                }
                            />
                        </div>
                    </td>
                </tr>
                {/* row 3 */}
                <tr>
                    <td className="uppercase border ">Penanda Tangan</td>
                    <td colSpan={3}>
                        <div className="flex items-center gap-4">
                            <InputLabel htmlFor="nama" value="Nama" />
                            <TextInput
                                id="nama"
                                type="text"
                                name="nama"
                                className="w-64"
                                maxLength="50"
                                placeholder="Input nama penanda tangan"
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                            />

                            {/* <InputError message={errors.email} className="mt-2" /> */}

                            {/* NIP */}
                            <InputLabel htmlFor="nip" value="NIP" />
                            <TextInput
                                id="nip"
                                type="text"
                                name="nip"
                                // value={data.nip}
                                className="w-64"
                                maxLength="18"
                                placeholder="NIP penanda tangan"
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setData("nip", e.target.value.toString())}
                            />

                            {/* <InputError message={errors.email} className="mt-2" /> */}
                        </div>
                    </td>
                </tr>
                {/* ------------- */}
            </tbody>
        </table>
    );
}
