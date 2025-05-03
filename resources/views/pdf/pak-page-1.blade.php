    <section class="container-a4">
        <table class="header" style="margin-top: 0px">
            <tr>
                {{-- <td style="width: 20%;"><img src="{{ asset('logo.png') }}" alt="Logo BPS" /></td> --}}
                {{-- For Hosting change to public_path --}}
                <td style="width: 20%;"><img src="{{ public_path('logo.png') }}" alt="Logo BPS" /></td>
                <td style="font-style: italic; line-height: 1.2; padding: 0; margin: 0;">
                    <strong class="title" style="margin: 0; padding: 0;">Badan Pusat Statistik
                        <span style="display: block; margin: 0; padding: 0;">Provinsi Jambi</span>
                    </strong>
                </td>
            </tr>
        </table>

        <div class="sub-title">
            <h2>
                Konversi Predikat ke Angka Kredit
                <span>

                    NOMOR :
                    <span>
                        {{ $data['no_surat1'] }}
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
                        {{-- FIXME: mungkin SEBAIKNYA UNTUK BULAN BAGUS VALUE NYA STRING AJ, JANGAN ANGKA --}}
                        Periode: @bulan($data['periode_mulai']) - @bulan($data['periode_berakhir']) {{ $data['tahun_periode'] }}
                    </td>
                </tr>
            </table>
        </div>


        <div style="margin-top: 0.1rem ">
            {{-- Table --}}
            <table aria-colcount="5" class="table-pak"
                style="border-collapse: collapse; border-spacing: 0; font-size: 15px;
                        line-height: 1rem ;">
                {{--  head  --}}
                <thead>
                    <tr style="text-align: center;  text-transform: uppercase; font-weight: 700;">
                        <th colspan="5" style="border: 1px solid #000;  padding: 0.4rem /* 8px */; font-size: 15px;">
                            Pejabat Fungsional Yang Dinilai
                        </th>
                    </tr>
                </thead>
                <tbody style="font-size: 15px">
                    {{--  Nama  --}}
                    <tr>
                        <th style="border: 1px solid #000;  width: 3.8rem /* 64px */;">
                            1</th>
                        <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                            Nama
                        </td>
                        <td colspan="2"
                            style="border: 1px solid #000;
                        padding: 0.4rem /* 8px */; text-wrap: nowrap;">
                            {{-- FIXME: nama pgeawai harusny ad di dari data useForm --}}
                            :
                            {{-- {{ 'Kiky Amci Ilzania, S.Tr.Stat' }} --}}
                            {{ $data['pegawai']['Nama'] }}
                        </td>
                    </tr>
                    {{-- {/* NIP */} --}}
                    <tr>
                        <th style="border: 1px solid #000;">
                            2</th>
                        <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                            NIP
                        </td>
                        <td colspan="2"
                            style="border: 1px solid #000;
                        padding: 0.4rem /* 8px */;">
                            : {{ $data['pegawai']['NIP'] }}
                        </td>
                    </tr>
                    {{-- {/* No Seri Karpeg */} --}}
                    <tr>
                        <th style="border: 1px solid #000;">
                            3</th>
                        <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                            Nomor Seri Karpeg
                        </td>
                        <td colspan="2"
                            style="border: 1px solid #000;
                            padding: 0.4rem /* 8px */;">
                            : {{ optional($data['pegawai'])['Nomor Seri Karpeg'] ?? '-' }}
                        </td>
                    </tr>
                    {{-- {/* Tempat/Tgl Lahir */} --}}
                    <tr>
                        <th style="border: 1px solid #000;">
                            4</th>
                        <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                            Tempat/Tgl Lahir
                        </td>
                        <td colspan="2"
                            style="border: 1px solid #000;
                        padding: 0.4rem /* 8px */;">
                            : {{ $data['pegawai']['Tempat/Tanggal Lahir'] }}
                        </td>
                    </tr>
                    {{-- {/* Jenis Kelamin */} --}}
                    <tr>
                        <th style="border: 1px solid #000;">
                            5</th>
                        <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                            Jenis Kelamin
                        </td>
                        <td colspan="2"
                            style="border: 1px solid #000;
                        padding: 0.4rem /* 8px */;">
                            : {{ $data['pegawai']['Jenis Kelamin'] }}
                        </td>
                    </tr>

                    {{-- {/* Pangkat/Golongan Ruang/TMT */} --}}
                    <tr>
                        <th style="border: 1px solid #000;">
                            6</th>
                        <td colspan="2"
                            style="border-right-color: transparent; padding: 0.3rem; padding-right: 0px; margin-right: 0px;  text-wrap: nowrap; font-size: 13.7px">
                            Pangkat/Golongan Ruang/TMT
                        </td>
                        <td colspan="2"
                            style="border: 1px solid #000; padding: 0.4rem /* 8px */;  text-wrap: nowrap;">
                            : {{ $data['pegawai']['Pangkat/Golongan Ruangan/TMT'] }}
                        </td>
                    </tr>

                    {{-- {/* Jabatan/TMT */} --}}
                    <tr>
                        <th style="border: 1px solid #000;">
                            7</th>
                        <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                            Jabatan/TMT
                        </td>
                        <td colspan="2"
                            style="border: 1px solid #000; padding: 0.4rem /* 8px */;  text-wrap: nowrap;">
                            : {{ $data['pegawai']['Jabatan/TMT'] }}
                        </td>
                    </tr>

                    {{-- {/* Unit Kerja */} --}}
                    <tr>
                        <th style="border: 1px solid #000;">
                            8</th>
                        <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                            Unit Kerja
                        </td>
                        <td colspan="2"
                            style="border: 1px solid #000; padding: 0.4rem /* 8px */;  text-wrap: nowrap;">
                            : {{ $data['pegawai']['Unit Kerja'] }}
                        </td>
                    </tr>

                    {{-- {/* Instansi */} --}}
                    <tr>
                        <th style="border: 1px solid #000;">
                            9</th>
                        <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                            Intansi
                        </td>
                        <td colspan="2"
                            style="border: 1px solid #000;
                                padding: 0.4rem /* 8px */;">
                            : {{ 'Badan Pusat Statistik' }}
                        </td>
                    </tr>
                    {{-- -------------------------------------- --}}


                </tbody>

                <tfoot style="font-size: 15px;">
                    <tr style="text-align: center;  text-transform: uppercase; ">
                        <th colspan="5"
                            style="border: 1px solid #000;  padding: 0.4rem /* 8px */; font-weight: 700; font-size:15px">
                            konversi predikat kinerja ke angka kredit
                        </th>
                    </tr>
                    {{-- ---------------------------------------- --}}

                    <tr style="text-align: center; font-weight: 400;">
                        <th colspan="3"
                            style="border: 1px solid #000; padding: 0.4rem;  font-weight: 400; text-transform: capitalize;">
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
                        <th style="border: 1px solid #000; text-transform: none; font-size: 14px; text-wrap: nowrap; font-weight: 400;"
                            class="border border-black normal-case text-xs text-nowrap;">
                            (kolom 2 x kolom 3)
                        </th>
                    </tr>

                    <tr style="text-transform: uppercase; width: 100%; font-weight: 400; background-color: #e8f3f3;">
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
                            {{ '4' }}
                        </th>
                    </tr>

                    <tr style="text-transform: uppercase; width: 100%; font-weight: 400;">
                        <th colspan="2"
                            style="border: 1px solid #000; text-wrap: nowrap; padding: 0.4rem; font-weight: 400;">
                            {{ $data['predikat'] }}
                        </th>
                        <th style="border: 1px solid #000; font-weight: 400;">
                            {{-- {{ ($data['periode_berakhir'] - $data['periode_mulai']) + 1 }} --}}
                            {{ $data['angka_periode'] }}
                            /12
                        </th>
                        <th style="border: 1px solid #000; text-transform: none; font-weight: 400;">
                            {{ number_format($data['ak_normatif'] ?? 0, 3) }}
                        </th>
                        <th style="border: 1px solid #000; text-transform: none; font-weight: 400;">
                            {{ $data['angka_kredit'] }}
                        </th>
                    </tr>
                </tfoot>
            </table>

            <div class="signature-container">
                <strong>Ditetapkan di Jambi </strong>
                <strong style="display:block">
                    Pada tanggal @formatTanggal($data['tgl_ditetapkan'])
                </strong>
                <strong style="padding-top: 0.7rem;">Kepala BPS Provinsi Jambi </strong>

                {{-- TTD --}}

                <div style="margin-top: 3.2rem;">
                    <strong style="display: block">
                        {{ $data['nama'] }}
                    </strong>
                    <strong style="display: block">
                        NIP. {{ $data['nip'] }}
                    </strong>
                </div>
            </div>

            @if (count(array_filter($data['tebusan1'])) > 0)
                <div style="margin-top:12rem; font-size: 15px">
                    <strong style="font-weight: 400;">Tembusan Disampaikan kepada :</strong>
                    @php
                        $tebusan_list = [
                            'kepala_reg' => 'Kepala Kantor Regional VII BKN',
                            'sekretaris' => 'Sekretaris Tim Penilai Yang Bersangkutan',
                            'kepala_bps' => 'Kepala BPS Kabupaten/Kota',
                            'kepala_biro' => 'Kepala Biro SDM BPS',
                            'pns' => 'PNS Bersangkutan',
                            'arsip' => 'Arsip',
                        ];
                        $i = 1;
                    @endphp
                    @foreach ($data['tebusan1'] as $key => $value)
                        @if ($value)
                            <span style="display: block">{{ $i }}. {{ $tebusan_list[$key] }}</span>
                            @php $i++; @endphp
                        @endif
                    @endforeach
                </div>
            @endif


        </div>
    </section>
