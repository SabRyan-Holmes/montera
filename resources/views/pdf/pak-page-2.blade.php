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
            Akumulasi Angka Kredit
            <span>

                NOMOR :
                <span>
                    {{ '1500.445/Akm/2024' }}
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

    <div style="margin-top: 0.5rem ">
        {{-- Table --}}
        <table aria-colcount="7" class="table-pak" style="border-collapse: collapse; border-spacing: 0;">
            {{--  head  --}}
            <thead>
                <tr style="text-align: center;  text-transform: uppercase; font-weight: 400;">
                    <th colspan="1" style="width: 30px; font-weight: 450;">I</th>
                    <th colspan="6" style=" padding: 0.4rem /* 8px */; text-align: left; font-weight: 450;">
                        KETERANGAN PERORANGAN
                    </th>
                </tr>
            </thead>
            <tbody>
                {{--  Nama  --}}
                <tr>
                    <th></th>
                    <th style=" width: 30px">1</th>
                    <td colspan="2" class="border-x-transparent" style="padding: 0.3rem /* 8px */;">
                        Nama
                    </td>
                    <td colspan="3" style="
                            padding: 0.3rem /* 8px */;">
                        : {{ 'Kiky Amci Ilzania, S.Tr.Stat' }}
                    </td>
                </tr>
                {{-- {/* NIP */} --}}
                <tr>
                    <th></th>
                    <th>2</th>
                    <td colspan="2" class="border-x-transparent" style="padding: 0.3rem /* 8px */;">
                        NIP
                    </td>
                    <td colspan="3" style="
                            padding: 0.3rem /* 8px */;">
                        : {{ '1997010220019012001' }}
                    </td>
                </tr>
                {{-- {/* No Seri Karpeg */} --}}
                <tr>
                    <th></th>
                    <th style="">3</th>
                    <td colspan="2" class="border-x-transparent" style="padding: 0.3rem /* 8px */;">
                        Nomor Seri Karpeg
                    </td>
                    <td colspan="3" style="
                                padding: 0.3rem /* 8px */;">
                        : {{ 'B 00046316 ' }}
                    </td>
                </tr>
                {{-- {/* Tempat/Tgl Lahir */} --}}
                <tr>
                    <th></th>

                    <th style="">
                        4</th>
                    <td colspan="2" class="border-x-transparent" style="padding: 0.3rem /* 8px */;">
                        Tempat/Tgl Lahir
                    </td>
                    <td colspan="3" style="
                            padding: 0.3rem /* 8px */;">
                        : {{ 'Jambi/2 Januari 1997 ' }}
                    </td>
                </tr>
                {{-- {/* Jenis Kelamin */} --}}
                <tr>
                    <th></th>

                    <th style="">
                        5</th>
                    <td colspan="2" class="border-x-transparent" style="padding: 0.3rem /* 8px */;">
                        Jenis Kelamin
                    </td>
                    <td colspan="3" style="
                            padding: 0.3rem /* 8px */;">
                        : {{ 'Perempuan ' }}
                    </td>
                </tr>

                {{-- {/* Pangkat/Golongan Ruang/TMT */} --}}
                <tr>
                    <th></th>

                    <th style="">
                        6</th>
                    <td colspan="2" class="border-x-transparent "
                        style="padding: 0.3rem /* 8px */; text-wrap: nowrap;">
                        Pangkat/Golongan Ruang/TMT
                    </td>
                    <td colspan="3" style=" padding: 0.3rem /* 8px */;  text-wrap: nowrap;">
                        : {{ 'Penata Muda(III/a)/01/12/2019 ' }}
                    </td>
                </tr>

                {{-- {/* Jabatan/TMT */} --}}
                <tr>
                    <th></th>

                    <th style="">
                        7</th>
                    <td colspan="2" class="border-x-transparent"
                        style="padding: 0.3rem /* 8px */; text-wrap: nowrap;">
                        Jabatan/TMT
                    </td>
                    <td colspan="3" style=" padding: 0.3rem /* 8px */;  text-wrap: nowrap;">
                        : {{ 'Statistisi Ahli Pertama/ 17-06-2021' }}
                    </td>
                </tr>

                {{-- {/* Unit Kerja */} --}}
                <tr>
                    <th></th>

                    <th style="">
                        8</th>
                    <td colspan="2" class="border-x-transparent" style="padding: 0.3rem /* 8px */;">
                        Unit Kerja
                    </td>
                    <td colspan="3" style=" padding: 0.3rem /* 8px */;  text-wrap: nowrap;">
                        : {{ 'BPS Kabupaten Tanjung Jabung Timur ' }}
                    </td>
                </tr>

                {{-- {/* Instansi */} --}}
                <tr>
                    <th></th>
                    <th style="">9</th>
                    <td colspan="2" class="border-x-transparent" style="padding: 0.3rem /* 8px */;">
                        Intansi
                    </td>
                    <td colspan="3" style="
                                    padding: 0.3rem /* 8px */;">
                        : {{ 'Badan Pusat Statistik ' }}
                    </td>
                </tr>
                {{-- -------------------------------------- --}}


            </tbody>

            <tfoot style="font-size: 14px; font-weight: 400;">
                <tr style="text-align: center; text-transform: uppercase; ">
                    <th colspan="7"
                        style=" padding: 0.25rem; font-weight: 600; font-size: 15px;">
                        hasil penilaian angka kredit
                    </th>
                </tr>
                {{-- ---------------------------------------- --}}

                <tr style="text-align: center; font-weight: 400;">
                    <th colspan="5" style="text-transform: uppercase; font-size: 14px; padding: 0px">
                        Hasil Penilaian Kinerja
                    </th>
                    <th rowSpan="2" style="text-transform: uppercase; font-size: 13px;">
                        Koefisien per Tahun
                    </th>
                    <th rowSpan="2" style="text-transform: uppercase; font-size: 13px;">
                        Angka Kredit yang didapat
                    </th>
                </tr>
                <tr style="text-transform: uppercase; width: 100%; font-weight: 400;">
                    <th colspan="2">Tahun</th>
                    <th>Periodik(Bulan)</th>
                    <th>Predikat</th>
                    <th>Prosentase</th>
                </tr>

                <tr style="text-transform: uppercase; width: 100%; font-weight: 400;">
                    <th colspan="2">1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                </tr>

                {{-- Isi Dari Data --}}
                <tr style="text-transform: uppercase; width: 100%; font-weight: 400;">
                    <th colspan="2">
                        {{ '2023' }}
                    </th>
                    <th> {{ '_' }}</th>
                    <th>{{ '_' }}</th>
                    <th>{{ '_' }}</th>
                    <th>{{ '_' }}</th>
                    <th>{{ '27.34' }}</th>
                </tr>

                <tr style="text-transform: uppercase; width: 100%; font-weight: 400;">
                    <th colspan="2">{{ '2024' }}</th>
                    <th> {{ 'Januari-Desember' }}</th>
                    <th>{{ 'Sangat Baik' }}</th>
                    <th>{{ '150 %' }}</th>
                    <th>{{ '12.5' }}</th>
                    <th>{{ '18.75' }}</th>
                </tr>

                <tr style="text-transform: uppercase; width: 100%; font-weight: 400;">
                    <th colspan="2">{{ '' }}</th>
                    <th> {{ '' }}</th>
                    <th>{{ '' }}</th>
                    <th>{{ '' }}</th>
                    <th>{{ '' }}</th>
                    <th>{{ '' }}</th>
                </tr>
                <tr>
                    <th colspan="6"
                        style="padding: 0.25rem; font-weight: 400 text-transform: uppercase;">
                        JUMLAH ANGKA KREDIT YANG DIPEROLEH</th>
                    <th colspan="1" style=" padding: 0.25rem; font-weight: 400">45,094</th>
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

            <div style="margin-top: 2.4rem;">
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
