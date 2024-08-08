<section class="container-a4">
    <table class="header" style="margin-top: 0px">
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
                    {{ $data['no_surat3'] }}
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
                    Periode: <span> @bulan($data['periode_mulai']) - @bulan($data['periode_berakhir']) {{ $data['tahun_ini'] }}</span>
                </td>
            </tr>
        </table>
    </div>

    <div style="margin-top: 0.5rem ">
        {{-- Table --}}
        {{-- Bagian 1 --}}
        <table aria-colcount="7" class="table-pak-3">
            {{--  head  --}}
            <thead>
                <tr style="text-align: center;  text-transform: uppercase; font-weight: 400;">
                    <th colspan="1" style="width: 30px; font-weight: 450;">I</th>
                    <th colspan="6" style=" padding: 0.4rem; text-align: left; font-weight: 450;">
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
                    <td colspan="2" style=" border-right-color: transparent;">
                        Nama
                    </td>
                    <td colspan="3" style="
                             text-align: left">
                        : {{ $data['pegawai']['Nama'] }}
                    </td>
                </tr>
                {{-- {/* NIP */} --}}
                <tr>
                    <th></th>
                    <th>2</th>
                    <td colspan="2" style=" border-right-color: transparent;">
                        NIP
                    </td>
                    <td colspan="3" style="
                            ">
                        : {{ $data['pegawai']['NIP/NRP'] }}
                    </td>
                </tr>
                {{-- {/* No Seri Karpeg */} --}}
                <tr>
                    <th></th>
                    <th style="">3</th>
                    <td colspan="2" style=" border-right-color: transparent;">
                        Nomor Seri Karpeg
                    </td>
                    <td colspan="3" style="
                                ">
                        : {{ $data['pegawai']['Nomor Seri Karpeg'] ?: '  _  ' }}
                    </td>
                </tr>
                {{-- {/* Tempat/Tgl Lahir */} --}}
                <tr>
                    <th></th>

                    <th style="">
                        4</th>
                    <td colspan="2" style=" border-right-color: transparent;">
                        Tempat/Tgl Lahir
                    </td>
                    <td colspan="3" style="
                            ">
                        : {{ $data['pegawai']['Tempat/Tanggal Lahir'] }}
                    </td>
                </tr>
                {{-- {/* Jenis Kelamin */} --}}
                <tr>
                    <th></th>
                    <th style="">
                        5</th>
                    <td colspan="2" style=" border-right-color: transparent;">
                        Jenis Kelamin
                    </td>
                    <td colspan="3" style="
                            ">
                        : {{ $data['pegawai']['Jenis Kelamin'] }}
                    </td>
                </tr>

                {{-- {/* Pangkat/Golongan Ruang/TMT */} --}}
                <tr>
                    <th></th>
                    <th style="">
                        6</th>
                    <td colspan="2" style=" text-wrap: nowrap; border-right-color: transparent;">
                        Pangkat/Golongan Ruang/TMT
                    </td>
                    <td colspan="3" style="   text-wrap: nowrap;">
                        : {{ $data['pegawai']['Pangkat/Golongan Ruangan/TMT'] }}
                    </td>
                </tr>

                {{-- {/* Jabatan/TMT */} --}}
                <tr>
                    <th></th>
                    <th style="">
                        7</th>
                    <td colspan="2" style=" border-right-color: transparent; text-wrap: nowrap;">
                        Jabatan/TMT
                    </td>
                    <td colspan="3" style="   text-wrap: nowrap;">
                        : {{ $data['pegawai']['Jabatan/TMT'] }}
                    </td>
                </tr>

                {{-- {/* Unit Kerja */} --}}
                <tr>
                    <th></th>
                    <th style="">
                        8</th>
                    <td colspan="2" style=" border-right-color: transparent;">
                        Unit Kerja
                    </td>
                    <td colspan="3" style="   text-wrap: nowrap;">
                        : {{ $data['pegawai']['Unit Kerja'] }}
                    </td>
                </tr>

                {{-- {/* Instansi */} --}}
                <tr>
                    <th></th>
                    <th style="">9</th>
                    <td colspan="2" style=" border-right-color: transparent;">
                        Intansi
                    </td>
                    <td colspan="3" style="
                                    ">
                        : {{ 'Badan Pusat Statistik ' }}
                    </td>
                </tr>
                {{-- -------------------------------------- --}}
            </tbody>
        </table>


        {{-- Bagian 2 Start --}}
        <table aria-colcount="7" class="table-pak-3" style="margin-bottom: 3rem">
            <thead>
                <tr>
                    <th colspan="7" style="text-align: center; font-weight: 450;">
                        HASIL PENILAIAN ANGKA KREDIT
                    </th>
                </tr>
                <tr style="text-align: center; text-transform: uppercase; ">
                    <th style="width: 30px; font-weight: 450;">II</th>
                    <th colspan="2" style="text-align: left; font-weight: 450;">
                        PENETAPAN ANGKA KREDIT
                    </th>
                    <th>LAMA</th>
                    <th>BARU</th>
                    <th>JUMLAH</th>
                    <th>KETERANGAN</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>1</th>
                    <th colspan="2">2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                </tr>
                <tr>
                    <th></th>
                    <th style="width: 30px">1</th>
                    <td style="text-align: left; ">{{ $data['ak_dasar']['tipe_ak'] }}</td>
                    <td style="text-align: center">{{ $data['ak_dasar']['lama'] }}</td>
                    <td style="text-align: center">{{ $data['ak_dasar']['baru'] }}</td>
                    <td style="text-align: center">{{ $data['ak_dasar']['jumlah'] }}</td>
                    <td style="text-align: center">{{ $data['ak_dasar']['keterangan'] ?: '_' }}</td>
                </tr>
                <tr>
                    <th></th>
                    <th style="width: 30px">2</th>
                    <td style="text-align: left">AK JF Lama</td>
                    <td style="text-align: center">{{ $data['ak_jf']['lama'] }}</td>
                    <td style="text-align: center">{{ $data['ak_jf']['baru'] }}</td>
                    <td style="text-align: center">{{ $data['ak_jf']['jumlah'] }}</td>
                    <td style="text-align: center">{{ $data['ak_jf']['keterangan'] ?: '_' }}</td>
                </tr>
                <tr>
                    <th></th>
                    <th style="width: 30px">3</th>
                    <td style="text-align: left">AK Penyesuaian/Penyetaraan</td>
                    <td style="text-align: center">{{ $data['ak_penyesuaian']['lama'] }}</td>
                    <td style="text-align: center">{{ $data['ak_penyesuaian']['baru'] }}</td>
                    <td style="text-align: center">{{ $data['ak_penyesuaian']['jumlah'] }}</td>
                    <td style="text-align: center">{{ $data['ak_penyesuaian']['keterangan'] ?: '_' }}</td>
                </tr>
                <tr>
                    <th></th>
                    <th style="width: 30px">4</th>
                    <td style="text-align: left">AK Konversi</td>
                    <td style="text-align: center">{{ $data['ak_konversi']['lama'] }}</td>
                    <td style="text-align: center">{{ $data['ak_konversi']['baru'] }}</td>
                    <td style="text-align: center">{{ $data['ak_konversi']['jumlah'] }}</td>
                    <td style="text-align: center">{{ $data['ak_konversi']['keterangan'] ?: '_' }}</td>
                </tr>
                <!-- Baris 6 dan seterusnya -->
                @php $index = 6; @endphp
                @foreach ($data['ak_tipe_tambahan'] as $key => $value)
                    <tr>
                        <th></th>
                        <th style="width: 30px">{{ $index }}</th>
                        <td style="text-align: left">{{ $value['tipe_ak'] }}</td>
                        <td style="text-align: center">{{ $value['lama'] }}</td>
                        <td style="text-align: center">{{ $value['baru'] }}</td>
                        <td style="text-align: center">{{ $value['jumlah'] }}</td>
                        <td style="text-align: center">{{ $value['keterangan'] ?: '_' }}</td>
                    </tr>
                    @php $index++; @endphp
                @endforeach
            </tbody>
            <tfoot style="font-size: 13.7px; font-weight: 400;" class="text-xs">
                <tr>
                    <th colspan="3" style="text-align: left;">Jumlah Angka kredit kumulatif</th>
                    <th>{{ $data['jakk']['lama'] }}</th>
                    <th>{{ $data['jakk']['baru'] }}</th>
                    <th>{{ $data['jakk']['jumlah'] }}</th>
                    <th>{{ $data['jakk']['keterangan'] }}</th>
                </tr>
                <tr style="border: 1px solid #334454;">
                    <th colspan="3">Keterangan</th>
                    <th colspan="2">Pangkat</th>
                    <th colspan="2" style="border: 1px solid #334454;">Jenjang Jabatan</th>
                </tr>
                <tr>
                    <th colspan="3" style="text-align: left;">Angka Kredit Minimal yang harus dipenuhi untuk
                        kenaikan pangkat/jenjang</th>
                    <th colspan="2">{{ $data['pangkat'] }}</th>
                    <th colspan="2">{{ $data['jabatan'] }}</th>
                </tr>
                <tr>
                    <th colspan="3" style="text-align: left;">
                        <span>
                            {!! $data['pangkat_keker'] >= 0 ? 'Kelebihan/ <del>Kekurangan</del>' : '<del>Kelebihan</del> /Kekurangan' !!}
                        </span>
                        <span>Angka Kredit yang harus dipenuhi untuk kenaikan pangkat'</span>
                    </th>
                    <th colspan="2" rowspan="2" style="text-align: center; vertical-align: middle; ">
                        {{ abs($data['pangkat_keker']) }}</th>
                    <th colspan="2" rowspan="2" style="text-align: center; vertical-align: middle;">
                        {{ abs($data['jabatan_keker']) }}</th>
                </tr>
                <tr>
                    <th colspan="3" style="text-align: left;">
                        <span>
                            {!! $data['jabatan_keker'] >= 0 ? 'Kelebihan/ <del>Kekurangan</del>' : '<del>Kelebihan</del> /Kekurangan' !!}
                        </span>
                        <span>Angka Kredit yang harus dipenuhi untuk kenaikan jabatan'</span>

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


        <div style="margin-top:2rem">
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
            @foreach ($data['tebusan3'] as $key => $value)
                @if ($value)
                    <span style="display: block">{{ $i }}. {{ $tebusan_list[$key] }}</span>
                    @php $i++; @endphp
                @endif
            @endforeach
        </div>
    </div>
</section>
