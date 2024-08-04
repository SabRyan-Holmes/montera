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
            Penetapan Angka Kredit
            <span>

                NOMOR :
                <span>
                    {{ '1500.445/PAK/2024' }}
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
        {{-- Bagian 1 --}}
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
                {{-- Bagian 1 --}}
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

                {{-- Bagian 2 --}}
            </tbody>
        </table>


        {{-- Bagian 2 Start --}}
        <table aria-colcount="7" class="table-pak scale-90" style="border-collapse: collapse; border-spacing: 0;">
            <thead>
                <tr>
                    <th colspan="7" style=" padding: 0.4rem /* 8px */; text-align: center; font-weight: 450;">
                        HASIL PENILAIAN ANGKA KREDIT
                    </th>
                </tr>
                <tr style="text-align: center;  text-transform: uppercase; font-weight: 400;">
                    <th colspan="1" style="width: 30px; font-weight: 450;">II</th>
                    <th colspan="2" style=" padding: 0.4rem /* 8px */; text-align: left; font-weight: 450;">
                        PENETAPAN ANGKA KREDIT
                    </th>
                    <th style=" padding: 0.4rem /* 8px */;  font-weight: 400;">LAMA</th>
                    <th style=" padding: 0.4rem /* 8px */;  font-weight: 400;">BARU</th>
                    <th style=" padding: 0.4rem /* 8px */;  font-weight: 400;">JUMLAH</th>
                    <th style=" padding: 0.4rem /* 8px */;  font-weight: 400;">KETERANGAN</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th style=" width: 30px">1</th>
                    <th colspan="2" class="border-x-transparent" style="padding: 0.3rem /* 8px */;">
                        2
                    </th>
                    <th style="padding: 0.3rem /* 8px */;">{{ '3' }}</th>
                    <th style="padding: 0.3rem /* 8px */;">{{ '4' }}</th>
                    <th style="padding: 0.3rem /* 8px */;">{{ '5' }}</th>
                    <th style="padding: 0.3rem /* 8px */;">{{ '6' }}</th>
                </tr>
                {{--  AK Dasar  --}}
                <tr>
                    <th></th>
                    <th style=" width: 30px">1</th>
                    <td class="border-x-transparent" style="padding: 0.3rem /* 8px */;">
                        AK Dasar yang diberikan
                    </td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                </tr>

                {{--  AK JF LAMA  --}}
                <tr>
                    <th></th>
                    <th style=" width: 30px">2</th>
                    <td class="border-x-transparent" style="padding: 0.3rem /* 8px */;">
                        AK JF Lama
                    </td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                </tr>

                {{-- AK Penyesuaian/Penyetaraan --}}
                <tr>
                    <th></th>
                    <th style=" width: 30px">3</th>
                    <td class="border-x-transparent" style="padding: 0.3rem /* 8px */;">
                        AK Penyesuaian/Penyetaraan
                    </td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                </tr>


                {{-- AK Konversi --}}
                <tr>
                    <th></th>
                    <th style=" width: 30px">4</th>
                    <td class="border-x-transparent" style="padding: 0.3rem /* 8px */;">
                        AK Konversi
                    </td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                </tr>

                {{-- AK yang diperoleh dari peningkatan pendidikan --}}
                <tr>
                    <th></th>
                    <th style=" width: 30px">5</th>
                    <td class="border-x-transparent" style="padding: 0.3rem /* 8px */;">
                        AK yang diperoleh dari peningkatan pendidikan
                    </td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                </tr>

                {{-- AK yang diperoleh dari peningkatan pendidikan --}}
                <tr>
                    <th></th>
                    <th style=" width: 30px">6</th>
                    <td class="border-x-transparent" style="padding: 0.3rem /* 8px */;">
                        {{ ' ....**)' }}
                    </td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                    <td style="padding: 0.3rem /* 8px */;">{{ '' }}</td>
                </tr>



                {{-- -------------------------------------- --}}
            </tbody>

            <tfoot style="font-size: 14px; font-weight: 400;" class="text-xs">
                <tr>
                    <th colspan="3" style="text-align: left;">Jumlah Angka kredit kumulatif</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr style=" border: 1px solid #334454;">
                    <th colspan="3">Keterangan</th>
                    <th colspan="2">Pangkat</th>
                    <th colspan="2" style=" border: 1px solid #334454;">Jenjang Jabatan</th>
                </tr>
                <tr>
                    <th colspan="3" style="text-align: left;" >
                        Angka Kredit Minimal yang harus dipenuhi untuk kenaikan pangkat/jenjang
                    </th>
                    <th colspan="2">{{'50'}}</th>
                    <th colspan="2">{{'100'}}</th>
                </tr>
                <tr style="border: 1px solid #334454;">
                    <th colspan="3" style="text-align: left;" >{{'Kelebihan/kekurangan*)Angka Kredit yang harus dipeuhi untuk kenaikan jenjang'}}</th>
                    <th colspan="2" rowspan="2" style="border: 1px solid #334454; vertical-align: middle;">{{'3906'}}</th>
                    <th colspan="2" rowspan="2" style="border: 1px solid #334454; vertical-align: middle;">{{'53.906'}}</th>
                </tr>
                <tr>
                    <th colspan="3" style="text-align: left;" >
                        {{'Kelebihan/kekurangan*)Angka Kredit yang harus dipeuhi untuk kenaikan jenjang'}}
                    </th>
                </tr>
                <tr>
                    <th colspan="7">Belum Dapat untuk Kenaikan Pangkat Setingkat Lebih Tinggi</th>
                </tr>
            </tfoot>
        </table>
        {{-- Bagian 2 End --}}


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
            <strong style="font-weight: 400">ASLI Penetapan Angka Kredit Untuk Jabatan Fungsional yang bersangkutan :</strong>
            <span style="display: block">1. Kepala Biro SDM BPS</span>
            <span style="display: block">2. Kepala Kantor Regional VII BKN</span>
            <span style="display: block; text-wrap: nowrap;">3. Sekretaris Tim Penilai yang bersangkutan; dan</span>
            <span style="display: block">4. Arsip</span>
        </div>
    </div>
</section>
