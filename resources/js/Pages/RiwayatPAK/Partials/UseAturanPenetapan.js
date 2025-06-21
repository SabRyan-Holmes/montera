import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function UseAturanPenetapan(aturanPAK) {
    console.warn("Sebelum : aturanPAK.tebusanKonversi");
    console.warn(aturanPAK.tebusanKonversi);
    const { auth, isByPengusulan, pengusulan } = usePage().props;
    const [initialized, setInitialized] = useState(false);
    const { data, setData, post, processing, errors, reset, setDefaults } =
        useForm({
            created_by: auth.user.nip,
            pengusulan_pak_id: isByPengusulan ? pengusulan.id : null,
            // Kalo Edit Ini langsungg terisi dengan useEffect
            id: null,
            pegawai: null,

            nama: "",
            nip: "",
            periode_mulai: 0,
            periode_berakhir: 0,

            angka_periode: 0,
            tgl_ditetapkan: "",
            penanda_tangan: "",

            no_surat1: "",
            predikat: "Baik",
            presentase: "",
            ak_normatif: 0,
            angka_kredit: 0,
            ak_normatif_ops: 0,

            tebusan1: [{}],

            no_surat2: "",
            ak_terakhir: 0,
            jumlah_ak_kredit: 0,
            tahun_terakhir: 2024,
            tahun_ini: 2025,

            tebusan2: [{}],

            no_surat3: "",
            ak_dasar: {
                tipe_ak: "AK Dasar yang diberikan",
                lama: 0,
                baru: 0,
                jumlah: 0,
                keterangan: "",
            },
            ak_jf: {
                tipe_ak: "AK JF Lama",
                lama: 0,
                baru: 0,
                jumlah: 0,
                keterangan: "",
            },
            ak_penyesuaian: {
                tipe_ak: "AK Penyesuaian/ Penyetsaraan",
                lama: 0,
                baru: 0,
                jumlah: 0,
                keterangan: "",
            },
            ak_konversi: {
                tipe_ak: "AK Konversi",
                lama: 0,
                baru: 0,
                jumlah: 0,
                keterangan: "",
            },
            ak_peningkatan: {
                tipe_ak: "AK yang diperoleh dari Peningkatan yang diberikan",
                lama: 0,
                baru: 0,
                jumlah: 0,
                keterangan: "",
            },

            ak_tipe_tambahan: {},
            jakk: { lama: "", baru: "", jumlah: "", keterangan: "" },

            pangkat: "",
            jabatan: "",
            pangkat_keker: "",
            jabatan_keker: "",

            tebusan3: [{}],
            kesimpulan:
                "Belum Dapat untuk Kenaikan Pangkat Setingkat Lebih Tinggi",
        });

    const findKoefisienPertahunValue = (jabatan) => {
        const key = Object.keys(koefisienPertahun).find((k) =>
            jabatan.includes(k)
        );
        return key ? koefisienPertahun[key] : null;
    };

    function useRumusAngkaKredit(periode, koefisienPertahun, presentase) {
        const ak_kredit =
            parseFloat(periode / 12) *
            parseFloat(koefisienPertahun) *
            parseFloat(presentase / 100);
        const result = parseFloat(ak_kredit).toFixed(3);
        return result;
    }

    function useRumusAngkaPeriode(angkaPeriodeBerakhir, angkaPeriodeMulai) {
        const result = Math.abs(angkaPeriodeBerakhir - angkaPeriodeMulai + 1);
        return result;
    }

    // FIRST MOUNTED/RENDER
    useEffect(() => {
        // TODO: SET Default dari default aturan PAK
        // 1. Penanda Tangan
        let defaultConfigPT = aturanPAK.penandaTangan.default_config;
        let defaultPenandaTangan =
            aturanPAK.penandaTangan.value[defaultConfigPT - 1]; //tambah 1 karna indeks array dimulai dari 0

        const makeDefaultTebusan = (list) =>
            list.value.map((item) => {
                const config = list.default_config.find(
                    (c) => c.id === item.id
                );

                return {
                    pihak_tebusan: item.pihak_tebusan,
                    checked: config ? config.checked : false,
                };
            });

        // 3. Predikat Presentase(PP)
        // Fungsi untuk mencari nilai dalam array berdasarkan id
        const findDefaultConfigById = (id, configArray) => {
            return configArray.find((item) => item.id === id);
        };

        // Cari config yang sesuai dengan id
        const defaultConfigPP = findDefaultConfigById(
            aturanPAK.predikatPresentase.default_config,
            aturanPAK.predikatPresentase.value
        );

        // 4. Pangkat
        const defaultConfigPangkat = findDefaultConfigById(
            aturanPAK.pangkat.default_config,
            aturanPAK.pangkat.value
        );

        // 5. Jabatan
        const defaultConfigJabatan = findDefaultConfigById(
            aturanPAK.jabatan.default_config,
            aturanPAK.jabatan.value
        );

        // 5. no Surat
        const defaultConfigNoSuratTerakhir = findDefaultConfigById(
            aturanPAK.noSuratTerakhir.default_config,
            aturanPAK.noSuratTerakhir.value
        );
        // alert(defaultConfigPP.presentase) //Ini ditemukan
        // alert(defaultConfigPangkat.angka) //Ini ditemukan
        // Set All Default Based on Default Config

        // ANCHOR Logic Checked on DefaultConfig Tebusan Belum
        // console.warn('Sebelum:', tebusanKonversiDefault);
        setData((prev) => ({
            ...prev,
            nama: defaultPenandaTangan.nama,
            nip: defaultPenandaTangan.nip,
            presentase: defaultConfigPP.presentase,
            predikat: defaultConfigPP.predikat,
            tebusan1: aturanPAK.tebusanKonversi,
            tebusan2: aturanPAK.tebusanAkumulasi,
            tebusan3: aturanPAK.tebusanPenetapan,
            pangkat: defaultConfigPangkat.angka,
            jabatan: defaultConfigJabatan.angka,
            no_surat1: `${defaultConfigNoSuratTerakhir.no_surat}/Konv/${defaultConfigNoSuratTerakhir.tahun}`,
            no_surat2: `${defaultConfigNoSuratTerakhir.no_surat}/Akm/${defaultConfigNoSuratTerakhir.tahun}`,
            no_surat3: `${defaultConfigNoSuratTerakhir.no_surat}/PAK/${defaultConfigNoSuratTerakhir.tahun}`,
        }));

        // Set flag bahwa inisialisasi selesai
        setInitialized(true);
        // console.warn(data.tebusan1)
    }, []);

    // PREDIKAT
    const predikatPresentase = aturanPAK.predikatPresentase.value.reduce(
        (acc, item) => {
            acc[item.presentase] = item.predikat;
            return acc;
        },
        {}
    );

    // KoefisienPertahun
    const koefisienPertahun = aturanPAK.koefisienPertahun.reduce(
        (acc, item) => {
            acc[item.jabatan] = item.nilai;
            return acc;
        },
        {}
    );

    // Angka Minimal Pangkat
    const angkaPangkat = [];
    aturanPAK.pangkat.value.forEach((item) => {
        angkaPangkat.push(item.angka);
    });

    // Angka Minimal Jabatan
    const angkaJabatan = [];
    aturanPAK.jabatan.value.forEach((item) => {
        angkaJabatan.push(item.angka);
    });

    // Tebusan Konversi
    // const tebusanKonversi = [];
    // aturanPAK.tebusanKonversi.value.forEach((item) => {
    //     tebusanKonversi.push(item.pihak_tebusan);
    // });

    // // Tebusan Akumulasi
    // const tebusanAkumulasi = [];
    // aturanPAK.tebusanAkumulasi.value.forEach((item) => {
    //     tebusanAkumulasi.push(item.pihak_tebusan);
    // });

    // // Tebusan Penetapan
    // const tebusanPenetapan = [];
    // aturanPAK.tebusanPenetapan.value.forEach((item) => {
    //     tebusanPenetapan.push(item.pihak_tebusan);
    // });

    // Kesimpulan
    let kesimpulanValue = [];
    let kesimpulan_default = aturanPAK.kesimpulan.default_config;
    aturanPAK.kesimpulan.value.forEach((item) => {
        kesimpulanValue.push(item.kesimpulan);
    });

    let kesimpulan = {
        value: kesimpulanValue,
        default_config: kesimpulanValue[kesimpulan_default - 1],
    };

    const aturanKonvTableProps = {
        koefisienPertahun,
        predikatPresentase,
    };

    const aturanAkmTableProps = {
        predikatPresentase,
    };

    const aturanPAKTableProps = {
        angkaPangkat,
        angkaJabatan,
        kesimpulan,
    };

    const rumusPenghitungan = {
        findKoefisienPertahunValue,
        useRumusAngkaKredit,
        useRumusAngkaPeriode,
    };

    // console.log("isi aturanPAK");
    // console.log(aturanPAK);
    // console.log("isi aturanPAKTableProps");
    // console.log(aturanPAKTableProps);

    // console.log("isi keofisienPertahun");
    // console.log("isi predikat");
    // console.log(predikat);
    // console.log("isi keofisienPertahun");
    // console.log(koefisienPertahun);
    return {
        initialized,
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        rumusPenghitungan,
        aturanKonvTableProps,
        aturanAkmTableProps,
        aturanPAKTableProps,
    };
}
