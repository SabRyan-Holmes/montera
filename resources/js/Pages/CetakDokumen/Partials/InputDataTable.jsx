import { DateInput, InputLabel, TextInput } from "@/Components";
import React from "react";

export default function InputDataTable({ data, setData}) {

    const handleKeyPress = (e) => {
        // Mencegah karakter non-numeric
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

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
                            <DateInput name="periode_awal" id="periode_awal" />
                            <span>sd</span>
                            <DateInput
                                name="periode_akhir"
                                id="periode_akhir"
                            />
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
                                // onChange={onChangeToNumber}
                                placeholder="NIP penanda tangan"
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setData("nip", e.target.value)}
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
