import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function UseAturanPenetapan(aturanPAK, koefisien = []) {


    const { data, setData, post, processing, errors, reset, setDefaults } =
        useForm({
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
            presentase: 100,
            ak_normatif: 0,
            angka_kredit: 0,
            ak_normatif_ops: 0,

            // tebusan1: {
            //     kepala_reg: false,
            //     sekretaris: false,
            //     kepala_bps: false,
            //     pns: false,
            //     kepala_biro: false,
            //     arsip: false,
            // },

            tebusan1: [{}],
            // Next PAK LEBIH DINAMIS
            // Versi lebih dinamis Pihak Tebusan & Checked
            // tebusan1:[
            //     {
            //         "pihak_tebusan" :'Kepala Kantor Regional VII BKN',
            //         'checked' : false
            //     },
            //     {
            //         "pihak_tebusan" :'Sekretaris Tim Penilai Yang Bersangkutan',
            //         'checked' : false
            //     },
            //     {
            //         "pihak_tebusan" :'Kepala BPS Kabupaten/Kota',
            //         'checked' : false
            //     },
            //     {
            //         "pihak_tebusan" :'PNS Bersangkutan',
            //         'checked' : false
            //     },
            //     {
            //         "pihak_tebusan" :'Kepala Biro SDM BPS',
            //         'checked' : false
            //     },
            //     {
            //         "pihak_tebusan" :'Kepala Biro SDM BPS',
            //         'checked' : false
            //     },
            // ],

            no_surat2: "",
            ak_terakhir: 0,
            jumlah_ak_kredit: 0,
            tahun_terakhir: "",
            tahun_ini: "",

            tebusan2: {
                kepala_reg: false,
                sekretaris: false,
                kepala_bps: false,
                pns: false,
                kepala_biro: false,
                arsip: false,
            },

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

            tebusan3: {
                kepala_reg: false,
                sekretaris: false,
                kepala_bps: false,
                pns: false,
                kepala_biro: false,
                arsip: false,
            },
            kesimpulan:
                "Belum Dapat untuk Kenaikan Pangkat Setingkat Lebih Tinggi",
        });

    // Penanda Tangan
    useEffect(() => {
        let defaultConfigPT = aturanPAK.penandaTangan.default_config;
        let defaultPenandaTangan =
            aturanPAK.penandaTangan.value[defaultConfigPT - 1]; //tambah 1 karna indeks array dimulai dari 0

        const tebusanKonversiDefault = aturanPAK.tebusanKonversi.map(item => ({
            pihak_tebusan: item.pihak_tebusan,
            checked: false
        }));

        setData({
            ...data,
            nama: defaultPenandaTangan.nama,
            nip: defaultPenandaTangan.nip,
            tebusan1: tebusanKonversiDefault
        });

    }, []);

    // PREDIKAT
    const predikatPresentase = aturanPAK.predikatPresentase.reduce(
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
    aturanPAK.pangkat.forEach((item) => {
        angkaPangkat.push(item.angka);
    });

    // Angka Minimal Jabatan
    const angkaJabatan = [];
    aturanPAK.jabatan.forEach((item) => {
        angkaJabatan.push(item.angka);
    });

    // Tebusan Konversi
    const tebusanKonversi = [];
    aturanPAK.tebusanKonversi.forEach((item) => {
        tebusanKonversi.push(item.pihak_tebusan);
    });

    // Tebusan Akumulasi
    const tebusanAkumulasi = [];
    aturanPAK.tebusanAkumulasi.forEach((item) => {
        tebusanAkumulasi.push(item.pihak_tebusan);
    });

    // Tebusan Penetapan
    const tebusanPenetapan = [];
    aturanPAK.tebusanPenetapan.forEach((item) => {
        tebusanPenetapan.push(item.pihak_tebusan);
    });

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
        tebusanKonversi,
    };

    const aturanAkmTableProps = {
        predikatPresentase,
        tebusanAkumulasi,
    };

    const aturanPAKTableProps = {
        angkaPangkat,
        angkaJabatan,
        tebusanPenetapan,
        kesimpulan,
    };
    console.log("isi aturanPAK");
    console.log(aturanPAK);
    console.log("isi aturanPAKTableProps");
    console.log(aturanPAKTableProps);

    // console.log("isi keofisienPertahun");
    // console.log("isi predikat");
    // console.log(predikat);
    // console.log("isi keofisienPertahun");
    // console.log(koefisienPertahun);
    return {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        aturanKonvTableProps,
        aturanAkmTableProps,
        aturanPAKTableProps,
    };
}
