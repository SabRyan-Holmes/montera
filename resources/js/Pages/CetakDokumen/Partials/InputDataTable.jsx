import { DateInput, InputLabel, TextInput } from "@/Components";
import React, { useEffect, useRef, useState } from "react";

export default function InputDataTable({ data, setData, isEdit, historyData }) {
    const handleKeyPress = (e) => {
        // Mencegah karakter non-numeric
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    const [defaultPeriodeMulai, setdefaultPeriodeMulai] = useState();
    const [defaultPeriodeBerakhir, setdefaultPeriodeBerakhir] = useState();

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
        if (isEdit) {
            data.angka_kredit = historyData["angka_kredit"];
            data.angka_periode = historyData["angka_periode"];

            data.periode_mulai = historyData["periode_mulai"];
            data.periode_berakhir = historyData["periode_berakhir"];
            data.tahun_periode = historyData["tahun_periode"];
            data.tgl_ditetapkan = historyData["tgl_ditetapkan"];

            setdefaultPeriodeMulai(
                `${data.tahun_periode}-${String(data.periode_mulai).padStart(
                    2,
                    "0"
                )}`
            );
            setdefaultPeriodeBerakhir(
                `${data.tahun_periode}-${String(data.periode_berakhir).padStart(
                    2,
                    "0"
                )}`
            );

            console.log("angka_kredit : ", data.angka_kredit);
            console.log("angka_periode : ", data.angka_periode);
        }
    }, []);

    useEffect(() => {
        setData(
            "angka_periode",
            data.periode_berakhir - data.periode_mulai + 1
        );
        data.angka_periode = data.periode_berakhir - data.periode_mulai + 1;
        parseInt(data.angka_periode);
        // if(isEdit) {
        //     setData("angka_kredit", historyData["angka_kredit"])
        //     data.angka_periode = historyData["angka_periode"]
        // }
    }, [data.periode_mulai, data.periode_berakhir]);

    const today = new Date().toISOString().split("T")[0];
    const namaInput = useRef();

    const [minPeriode, setMinPeriode] = useState("");

    return (
        <table className="table text-base ">
            {/* head */}
            <thead>
                <tr className="text-lg text-center text-white uppercase bg-secondary">
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
                            <input
                                type="month"
                                name="periode_mulai"
                                // { isEdit && 'defaultValue = historyData '}
                                id="periode_mulai"
                                className="px-4 font-medium rounded-md w-fit border-gradient disabled:text-accent"
                                defaultValue={defaultPeriodeMulai}
                                onChange={(e) => {
                                    // Mengambil nilai dari input (format: YYYY-MM)
                                    const value = e.target.value;

                                    // Memisahkan nilai menjadi tahun dan bulan
                                    const [year, month] = value.split("-");

                                    // Mengonversi bulan menjadi     integer
                                    const periodeMulai = parseInt(month, 10);

                                    // Set min periode untuk untuk periode berakhir
                                    setMinPeriode(value);
                                    // Memasukkan nilai bulan ke dalam state atau data

                                    // setData("periode_mulai", periodeMulai);

                                    // setData("tahun_ini", year);
                                    setData((data) => ({
                                        ...data,
                                        periode_mulai: periodeMulai,
                                    }));
                                    setData((data) => ({
                                        ...data,
                                        tahun_ini: year,
                                    }));

                                    console.log("e.target.value");
                                    console.log(e.target.value);
                                }}
                            />

                            <span>sd</span>
                            <input
                                type="month"
                                name="periode_berakhir"
                                id="periode_berakhir"
                                min={minPeriode}
                                className="px-4 font-medium rounded-md w-fit border-gradient disabled:text-accent"
                                defaultValue={defaultPeriodeBerakhir}
                                onChange={(e) => {
                                    // Mengambil nilai dari input (format: YYYY-MM)
                                    const value = e.target.value;

                                    // Memisahkan nilai menjadi tahun dan bulan
                                    const [year, month] = value.split("-");

                                    // Mengonversi bulan menjadi integer
                                    const periodeBerakhir = parseInt(month, 10);

                                    if (year !== data.tahun_ini) {
                                        alert(
                                            "Tahun periode berakhir harus sama dengan periode mulai!"
                                        );
                                        e.target.value = ""; // Reset input jika tidak sesuai
                                    } else {
                                        // Jika tahun sama, masukkan nilai bulan ke dalam state atau data
                                        setData(
                                            "periode_berakhir",
                                            periodeBerakhir
                                        );
                                        setData("tahun_periode", year);
                                    }
                                }}
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
                                required
                                max={today}
                                defaultValue={data.tgl_ditetapkan}
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
                                ref={namaInput}
                                name="nama"
                                className="w-64 appearance-none no-arrow"
                                maxLength="50"
                                defaultValue={
                                    isEdit ? historyData["nama"] : data.nama
                                }
                                list="namaList"
                                required
                                placeholder="Input nama penanda tangan"
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                            />

                            <datalist
                                id="namaList"
                                className="invisible hidden appearance-none no-arrow"
                            >
                                {/* Datalist untuk autocomplete nama */}
                                <option value="Agus Sudibyo, M.Stat" />
                                <option value="Budi Santoso, M.Si" />
                                <option value="Siti Aminah, M.Sc" />
                                {/* Tambahkan lebih banyak opsi sesuai kebutuhan */}
                            </datalist>

                            {/* NIP */}
                            <InputLabel htmlFor="nip" value="NIP" />
                            <TextInput
                                id="nip"
                                type="text"
                                name="nip"
                                required
                                list="nipList" // tambahkan list untuk datalist
                                defaultValue={
                                    isEdit ? historyData["nip"] : data.nip
                                }
                                className="w-64"
                                maxLength="18"
                                placeholder="NIP penanda tangan"
                                onKeyPress={handleKeyPress}
                                onChange={(e) =>
                                    setData("nip", e.target.value.toString())
                                }
                            />

                            <datalist id="nipList">
                                {" "}
                                {/* Datalist untuk autocomplete NIP */}
                                <option value="197412311996121001" />
                                <option value="198507101990032001" />
                                <option value="196501011989021001" />
                                {/* Tambahkan lebih banyak opsi sesuai kebutuhan */}
                            </datalist>
                        </div>
                    </td>
                </tr>
                {/* ------------- */}
            </tbody>
        </table>
    );
}
