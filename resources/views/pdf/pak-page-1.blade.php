<section class="container-a4">
    <table class="header">
        <tr>
            <td style="width: 20%;"><img src="{{ asset('logo.png') }}" alt="Logo BPS" /></td>
            <td>
                <strong class="title">Badan Pusat Statistik</strong><br>
                <strong class="title">Provinsi Jambi</strong>
            </td>
        </tr>
    </table>

    <div class="sub-title">
        <h2>
            Konversi Predikat ke Angka Kredit
            <span>

                NOMOR :
                <span>
                    {{ '1500.445/Konv/2024' }}
                </span>
            </span>
        </h2>
    </div>

    <div style="width: 100%;">
        <table style="width: 100%;">
            <tr>
                <td style="font-weight: 400; text-align: left;">
                    Instansi: Badan Pusat Statistik
                </td>
                <td style="font-weight: 400; text-align: right;">
                    Periode: {{ 'Januari' }} - {{ 'Desember 2024' }}
                </td>
            </tr>
        </table>
    </div>


    <div style="margin-top: 0.4rem ">
        {{-- Table --}}
        <table aria-colcount="5" class="table-pak-1"
            style="border-collapse: collapse; border-spacing: 0;   font-size: 1rem;
                        line-height: 1rem ;">
            {{--  head  --}}
            <thead>
                <tr style="text-align: center;  text-transform: uppercase; font-weight: 700;">
                    <th colspan="5" style="border: 1px solid #000;  padding: 0.4rem /* 8px */;">
                        Pejabat Fungsional Yang Dinilai
                    </th>
                </tr>
            </thead>
            <tbody>
                {{--  Nama  --}}
                <tr>
                    <th style="border: 1px solid #000;  width: 3.8rem /* 64px */;">
                        1</th>
                    <td colspan="2" class="border-pak1" style="padding: 0.4rem /* 8px */;">
                        Nama
                    </td>
                    <td colspan="2"
                        style="border: 1px solid #000;
                        padding: 0.4rem /* 8px */;">
                        : {{ 'Kiky Amci Ilzania, S.Tr.Stat' }}
                    </td>
                </tr>
                {{-- {/* NIP */} --}}
                <tr>
                    <th style="border: 1px solid #000;">
                        2</th>
                    <td colspan="2" class="border-pak1" style="padding: 0.4rem /* 8px */;">
                        NIP
                    </td>
                    <td colspan="2"
                        style="border: 1px solid #000;
                        padding: 0.4rem /* 8px */;">
                        : {{ '1997010220019012001' }}
                    </td>
                </tr>
                {{-- {/* No Seri Karpeg */} --}}
                <tr>
                    <th style="border: 1px solid #000;">
                        3</th>
                    <td colspan="2" class="border-pak1" style="padding: 0.4rem /* 8px */;">
                        Nomor Seri Karpeg
                    </td>
                    <td colspan="2"
                        style="border: 1px solid #000;
                            padding: 0.4rem /* 8px */;">
                        : {{ 'B 00046316 ' }}
                    </td>
                </tr>
                {{-- {/* Tempat/Tgl Lahir */} --}}
                <tr>
                    <th style="border: 1px solid #000;">
                        4</th>
                    <td colspan="2" class="border-pak1" style="padding: 0.4rem /* 8px */;">
                        Tempat/Tgl Lahir
                    </td>
                    <td colspan="2"
                        style="border: 1px solid #000;
                        padding: 0.4rem /* 8px */;">
                        : {{ 'Jambi/2 Januari 1997 ' }}
                    </td>
                </tr>
                {{-- {/* Jenis Kelamin */} --}}
                <tr>
                    <th style="border: 1px solid #000;">
                        5</th>
                    <td colspan="2" class="border-pak1" style="padding: 0.4rem /* 8px */;">
                        Jenis Kelamin
                    </td>
                    <td colspan="2"
                        style="border: 1px solid #000;
                        padding: 0.4rem /* 8px */;">
                        : {{ 'Perempuan ' }}
                    </td>
                </tr>

                {{-- {/* Pangkat/Golongan Ruang/TMT */} --}}
                <tr>
                    <th style="border: 1px solid #000;">
                        6</th>
                    <td colspan="2" class="border-pak1 " style="padding: 0.4rem; text-wrap: nowrap;">
                        Pangkat/Golongan Ruang/TMT
                    </td>
                    <td colspan="2" style="border: 1px solid #000; padding: 0.4rem /* 8px */;  text-wrap: nowrap;">
                        : {{ 'Penata Muda(III/a)/01/12/2019 ' }}
                    </td>
                </tr>

                {{-- {/* Jabatan/TMT */} --}}
                <tr>
                    <th style="border: 1px solid #000;">
                        7</th>
                    <td colspan="2" class="border-pak1" style="padding: 0.4rem /* 8px */; text-wrap: nowrap;">
                        Jabatan/TMT
                    </td>
                    <td colspan="2" style="border: 1px solid #000; padding: 0.4rem /* 8px */;  text-wrap: nowrap;">
                        : {{ 'Statistisi Ahli Pertama/ 17-06-2021' }}
                    </td>
                </tr>

                {{-- {/* Unit Kerja */} --}}
                <tr>
                    <th style="border: 1px solid #000;">
                        8</th>
                    <td colspan="2" class="border-pak1" style="padding: 0.4rem /* 8px */;">
                        Unit Kerja
                    </td>
                    <td colspan="2" style="border: 1px solid #000; padding: 0.4rem /* 8px */;  text-wrap: nowrap;">
                        : {{ 'BPS Kabupaten Tanjung Jabung Timur ' }}
                    </td>
                </tr>

                {{-- {/* Instansi */} --}}
                <tr>
                    <th style="border: 1px solid #000;">
                        9</th>
                    <td colspan="2" class="border-pak1" style="padding: 0.4rem /* 8px */;">
                        Intansi
                    </td>
                    <td colspan="2"
                        style="border: 1px solid #000;
                                padding: 0.4rem /* 8px */;">
                        : {{ 'Badan Pusat Statistik ' }}
                    </td>
                </tr>
                {{-- -------------------------------------- --}}


            </tbody>

            <tfoot style="font-size: 14px;">
                <tr style="text-align: center;  text-transform: uppercase; font-weight: 700;">
                    <th colspan="5" style="border: 1px solid #000;  padding: 0.4rem /* 8px */;">
                        konversi predikat kinerja ke angka kredit
                    </th>
                </tr>
                {{-- ---------------------------------------- --}}

                <tr style="text-align: center; font-weight: 400;">
                    <th colspan="3" style="border: 1px solid #000; padding: 0.4rem;  font-weight: 400; text-transform: capitalize;">
                        Hasil Penilaian Kinerja
                    </th>
                    <th rowSpan="2" style="border: 1px solid #000; padding: 0.4rem; font-weight: 400;">
                        Koefisien per Tahun
                    </th>
                    <th style="border: 1px solid #000; padding: 0.4rem; font-weight: 400;">
                        Angka Kredit yang didapat
                    </th>
                </tr>

                <tr style="text-transform: uppercase; width: 100%; font-weight: 400;">
                    <th colspan="2" style="border: 1px solid #000; padding: 0.4rem; font-weight: 400;">
                        predikat
                    </th>
                    <th style="border: 1px solid #000; padding: 0.4rem; font-weight: 400;">
                        persentase
                    </th>
                    <th style="border: 1px solid #000; text-transform: none; font-size: 13px; text-wrap: nowrap; font-weight: 400;"
                        class="border border-black normal-case text-xs text-nowrap;">
                        (kolom 2 x kolom 3)
                    </th>
                </tr>

                <tr style="text-transform: uppercase; width: 100%; font-weight: 400;">
                    <th colspan="2" style="border: 1px solid #000; padding: 0.4rem; font-weight: 400;">
                        {{ '1' }}
                    </th>
                    <th style="border: 1px solid #000; font-weight: 400;">
                        {{ '2' }}
                    </th>
                    <th style="border: 1px solid #000; text-transform: none; font-weight: 400;">
                        {{ '3' }}
                    </th>
                    <th style="border: 1px solid #000; text-transform: none; font-weight: 400;">
                        {{ '5' }}
                    </th>
                </tr>

                <tr style="text-transform: uppercase; width: 100%; font-weight: 400;">
                    <th colspan="2"
                        style="border: 1px solid #000; text-wrap: nowrap; padding: 0.4rem; font-weight: 400;">
                        {{ 'Sangat Baik' }}
                    </th>
                    <th style="border: 1px solid #000; font-weight: 400;">
                        {{ '12' }}/12
                    </th>
                    <th style="border: 1px solid #000; text-transform: none; font-weight: 400;">
                        {{ '12.5' }}
                    </th>
                    <th style="border: 1px solid #000; text-transform: none; font-weight: 400;">
                        {{ '18.75' }}
                    </th>
                </tr>
            </tfoot>
        </table>

        <div class="signature-container">
            <strong>Ditetapkan di Jambi </strong>
            <strong style="display:block">
                Pada tanggal {{ '8 Mei 2024' }}
            </strong>
            <strong style="padding-top: 0.7rem;">Kepala BPS Provinsi Jambi </strong>

            <img src="" alt="" />

            <div style="margin-top: 2rem;">
                <strong style="display: block">
                    {{ 'Agus Sudibyo, M.Stat' }}
                </strong>
                <strong style="display: block">
                    NIP. {{ ' 197412311996121001' }}
                </strong>
            </div>
        </div>

        <div style="margin-top:2rem">
            <strong style="font-weight: 400">Tembusan Disampaikan kepada :</strong>
            <span style="display: block">1. Kepala BPS Kabupaten/Kota</span>
            <span style="display: block">2. PNS Bersangkutan</span>
        </div>
    </div>
</section>
