<section class="container-a4">
    <table class="header" style="margin-top: 0px">
        <tr>
            <td style="width: 20%;"><img src="{{ asset('logo.png') }}" alt="Logo BPS" /></td>
            <td style="font-style: italic; line-height: 1.2; padding: 0; margin: 0;">
                <strong class="title" style="margin: 0; padding: 0;">Badan Pusat Statistik
                    <span style="display: block; margin: 0; padding: 0;">Provinsi Jambi</span>
                </strong>
            </td>
        </tr>
    </table>

    <div class="sub-title">
        <h2>
            Akumulasi Angka Kredit
            <span>
                NOMOR : {{ $data['no_surat2'] }}
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
                    Periode: <span> @bulan($data['periode_mulai']) - @bulan($data['periode_berakhir']) {{ $data['tahun_ini'] }}</span>
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
                    <th colspan="6" style=" padding: 0.4rem; text-align: left; font-weight: 400;">
                        KETERANGAN PERORANGAN
                    </th>
                </tr>
            </thead>
            <tbody style="font-size: 13px">
                {{--  Nama  --}}
                <tr>
                    <th></th>
                    <th style=" width: 30px">1</th>
                    <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                        Nama
                    </td>
                    <td colspan="3" style="
                            padding: 0.3rem;">
                        : {{ $data['pegawai']['Nama'] }}
                    </td>
                </tr>
                {{-- {/* NIP */} --}}
                <tr>
                    <th></th>
                    <th>2</th>
                    <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                        NIP
                    </td>
                    <td colspan="3" style="
                            padding: 0.3rem;">
                        : {{ $data['pegawai']['NIP/NRP'] }}
                    </td>
                </tr>
                {{-- {/* No Seri Karpeg */} --}}
                <tr>
                    <th></th>
                    <th style="">3</th>
                    <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                        Nomor Seri Karpeg
                    </td>
                    <td colspan="3" style="
                                padding: 0.3rem;">
                        : {{ $data['pegawai']['Nomor Seri Karpeg'] ?: '_' }}

                    </td>
                </tr>
                {{-- {/* Tempat/Tgl Lahir */} --}}
                <tr>
                    <th></th>
                    <th style="">
                        4</th>
                    <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                        Tempat/Tgl Lahir
                    </td>
                    <td colspan="3" style="
                            padding: 0.3rem;">
                        : {{ $data['pegawai']['Tempat/Tanggal Lahir'] }}
                    </td>
                </tr>
                {{-- {/* Jenis Kelamin */} --}}
                <tr>
                    <th></th>
                    <th style="">
                        5</th>
                    <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                        Jenis Kelamin
                    </td>
                    <td colspan="3" style="
                            padding: 0.3rem;">
                        : {{ $data['pegawai']['Jenis Kelamin'] }}
                    </td>
                </tr>

                {{-- {/* Pangkat/Golongan Ruang/TMT */} --}}
                <tr>
                    <th></th>
                    <th style="">
                        6</th>
                    <td colspan="2" style="padding: 0.3rem; border-right-color: transparent; text-wrap: nowrap;">
                        Pangkat/Golongan Ruang/TMT
                    </td>
                    <td colspan="3" style=" padding: 0.3rem;  text-wrap: nowrap;">
                        : {{ $data['pegawai']['Pangkat/Golongan Ruangan/TMT'] }}
                    </td>
                </tr>

                {{-- {/* Jabatan/TMT */} --}}
                <tr>
                    <th></th>
                    <th style="">
                        7</th>
                    <td colspan="2" style="border-right-color: transparent; padding: 0.3rem; text-wrap: nowrap;">
                        Jabatan/TMT
                    </td>
                    <td colspan="3" style=" padding: 0.3rem;  text-wrap: nowrap;">
                        : {{ $data['pegawai']['Jabatan/TMT'] }}
                    </td>
                </tr>

                {{-- {/* Unit Kerja */} --}}
                <tr>
                    <th></th>
                    <th style="">
                        8</th>
                    <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                        Unit Kerja
                    </td>
                    <td colspan="3" style=" padding: 0.3rem;  text-wrap: nowrap;">
                        : {{ $data['pegawai']['Unit Kerja'] }}
                    </td>
                </tr>

                {{-- {/* Instansi */} --}}
                <tr>
                    <th></th>
                    <th style="">9</th>
                    <td colspan="2" style="border-right-color: transparent; padding: 0.3rem;">
                        Intansi
                    </td>
                    <td colspan="3" style="
                                    padding: 0.3rem;">
                        : {{ 'Badan Pusat Statistik ' }}
                    </td>
                </tr>
                {{-- -------------------------------------- --}}


            </tbody>

            <tfoot style="font-size: 14px; font-weight: 400;">
                <tr style="text-align: center; text-transform: uppercase; ">
                    <th colspan="7" style=" padding: 0.25rem; font-weight: 700; font-size: 15px;">
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
                        {{ $data['tahun_terakhir'] }}
                    </th>
                    <th> {{ '_' }}</th>
                    <th>{{ '_' }}</th>
                    <th>{{ '_' }}</th>
                    <th>{{ '_' }}</th>
                    <th>{{ $data['ak_terakhir'] }}</th>
                </tr>

                <tr style="text-transform: uppercase; width: 100%; font-weight: 400;">
                    <th colspan="2">{{ $data['tahun_ini'] }}</th>
                    <th> @bulan($data['periode_mulai']) - @bulan($data['periode_berakhir'])</th>
                    <th>{{ $data['predikat'] }}</th>
                    <th>{{ $data['presentase'] }}</th>
                    <th>{{ $data['ak_normatif'] }}</th>
                    <th>{{ $data['angka_kredit'] }}</th>
                </tr>

                <tr>
                    <th colspan="6" style="padding: 0.25rem; font-weight: 400 text-transform: uppercase;">
                        JUMLAH ANGKA KREDIT YANG DIPEROLEH</th>
                    <th colspan="1" style=" padding: 0.25rem; font-weight: 400">{{ $data['jumlah_ak_kredit'] }}</th>
                </tr>
            </tfoot>

        </table>

        <div class="signature-container">
            <strong>Ditetapkan di Jambi </strong>

            <strong style="display:block">
                Pada tanggal @formatTanggal($data['tgl_ditetapkan'])
            </strong>
            <strong style="padding-top: 0.7rem;">Kepala BPS Provinsi Jambi </strong>

            <img src="" alt="" />

            <div style="margin-top: 3rem;">
                <strong style="display: block">
                    {{ $data['nama'] }}
                </strong>
                <strong style="display: block">
                    NIP. {{ $data['nip'] }}
                </strong>
            </div>
        </div>

        @if (count(array_filter($data['tebusan2'])) > 0)
        <div style="margin-top:12rem">
            <strong style="font-weight: 400">Tembusan Disampaikan kepada :</strong>
            @php
                $tebusan_list = [
                    'kepala_reg' => 'Kepala Kantor Regional VII BKN',
                    'sekretaris' => 'Sekretaris Tim Penilai Yang Bersangkutan',
                    'kepala_bps' => 'Kepala BPS Kabupaten/Kota',
                    'pns' => 'PNS Bersangkutan',
                    'kepala_biro' => 'Kepala Biro SDM BPS',
                    'arsip' => 'Arsip',
                ];
                $i = 1;
            @endphp
            @foreach ($data['tebusan2'] as $key => $value)
                @if ($value)
                    <span style="display: block">{{ $i }}. {{ $tebusan_list[$key] }}</span>
                    @php $i++; @endphp
                @endif
            @endforeach
        </div>
        @endif
    </div>
</section>
