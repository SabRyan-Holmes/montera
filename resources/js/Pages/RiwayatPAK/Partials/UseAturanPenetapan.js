
import { useForm } from '@inertiajs/react';

export default function UseAturanPenetapan(koefisien = []) {

    const { data, setData, post, processing, errors, reset } = useForm({
        pegawai: null,
        nama: "Agus Sudibyo, M.Stat",
        nip: "197412311996121001",
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

        tebusan1: {
            kepala_reg: false,
            sekretaris: false,
            kepala_bps: false,
            pns: false,
            kepala_biro: false,
            arsip: false,
        },

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

        pangkat: 50,
        jabatan: 100,
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
        kesimpulan: "Belum Dapat untuk Kenaikan Pangkat Setingkat Lebih Tinggi",
    });

    const predikat = {
        25: "Sangat Kurang",
        50: "Kurang",
        75: "Butuh Perbaikan",
        100: "Baik",
        150: "Sangat Baik",
    };

    const akNormatif = {};
    koefisien.forEach((item) => {
        akNormatif[item.jabatan] = item.nilai;
    });

    return {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        predikat,
        akNormatif,
    };
}
