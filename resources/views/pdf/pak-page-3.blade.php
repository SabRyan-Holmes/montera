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
                    Periode: <span> @bulan($data['periode_mulai']) - @bulan($data['periode_berakhir']) {{ $data['tahun_periode'] }}</span>
                </td>
            </tr>
        </table>
    </div>

    <div style="margin-top: 0.1rem ">
        {{-- Table --}}
        <table aria-colcount="7" class="table-pak-3">
            <thead>
                <tr style="text-align: center;  text-transform: uppercase; font-weight: 400;">
                    <th colspan="1" style="width: 25px; font-weight: 450;">I</th>
                    <th colspan="6" style=" padding: 0.4rem; text-align: left; font-weight: 450;">
                        KETERANGAN PERORANGAN
                    </th>
                </tr>
            </thead>
            <tbody>
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
                <tr>
                    <th></th>
                    <th>2</th>
                    <td colspan="2" style=" border-right-color: transparent;">
                        NIP
                    </td>
                    <td colspan="3" style="
                            ">
                        : {{ $data['pegawai']['NIP'] }}
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <th style="">3</th>
                    <td colspan="2" style=" border-right-color: transparent;">
                        Nomor Seri Karpeg
                    </td>
                    <td colspan="3" style="
                                ">
                        : {{ $data['pegawai']['Nomor Seri Karpeg'] ?: '-' }}
                    </td>
                </tr>
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
                <tr>
                    <th></th>
                    <th style="">
                        6</th>
                    <td colspan="2" style=" text-wrap: nowrap; border-right-color: transparent;">
                        Pangkat/Golongan Ruang/TMT
                    </td>
                    <td colspan="3">
                        : {{ $data['pegawai']['Pangkat/Golongan Ruangan/TMT'] }}
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <th style="">
                        7</th>
                    <td colspan="2" style=" border-right-color: transparent; ">
                        Jabatan/TMT
                    </td>
                    <td colspan="3">
                        : {{ $data['pegawai']['Jabatan/TMT'] }}
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <th style="">
                        8</th>
                    <td colspan="2" style=" border-right-color: transparent;">
                        Unit Kerja
                    </td>
                    <td colspan="3">
                        : {{ $data['pegawai']['Unit Kerja'] }}
                    </td>
                </tr>
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
            </tbody>
        </table>


        {{-- Bagian 2  --}}
        <table aria-colcount="7" class="table-pak-3" style="margin-bottom: 0rem padding-bottom:0rem">
            <thead>
                <tr>
                    <th colspan="7" style="text-align: center; font-weight: 460;">
                        HASIL PENILAIAN ANGKA KREDIT
                    </th>
                </tr>
                <tr style="text-align: center; text-transform: uppercase; font-size: 12.7px;">
                    <th style="width: 25px; font-weight: 450; font-size: 14px;">II</th>
                    <th colspan="2" style="text-align: left; font-weight: 450; font-size: 14px;">
                        PENETAPAN ANGKA KREDIT
                    </th>
                    <th>LAMA</th>
                    <th>BARU</th>
                    <th>JUMLAH</th>
                    <th>KETERANGAN</th>
                </tr>
            </thead>
            <tbody>
                <tr style="background-color: #e8f3f3;">
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

                    {{-- <td style="text-align: center">{{ number_format($data['ak_dasar']['lama'] ?? 0, 3) }}</td> --}}
                    {{-- <td style="text-align: center">{{ is_numeric($data['ak_dasar']['lama'] ?? null) && number_format($data['ak_dasar']['lama'], 3) }}</td> --}}

                    <td style="text-align: center">
                        {{ !empty($data['ak_dasar']['lama']) ? number_format($data['ak_dasar']['lama'] ?? 0, 3) : $data['ak_dasar']['lama'] }}
                    </td>
                    <td style="text-align: center">
                        {{ !empty($data['ak_dasar']['baru']) ? number_format($data['ak_dasar']['baru'] ?? 0, 3) : $data['ak_dasar']['baru'] }}
                    </td>
                    <td style="text-align: center">
                        {{ !empty($data['ak_dasar']['jumlah']) ? number_format($data['ak_dasar']['jumlah'] ?? 0, 3) : $data['ak_dasar']['jumlah'] }}
                    </td>
                    <td style="text-align: center">{{ $data['ak_dasar']['keterangan'] }}</td>
                </tr>
                <tr>
                    <th></th>
                    <th style="width: 30px">2</th>
                    <td style="text-align: left">AK JF Lama</td>

                    <td style="text-align: center">
                        {{ !empty($data['ak_jf']['lama']) ? number_format($data['ak_jf']['lama'] ?? 0, 3) : $data['ak_jf']['lama'] }}
                    </td>
                    <td style="text-align: center">
                        {{ !empty($data['ak_jf']['baru']) ? number_format($data['ak_jf']['baru'] ?? 0, 3) : $data['ak_jf']['baru'] }}
                    </td>
                    <td style="text-align: center">
                        {{ !empty($data['ak_jf']['jumlah']) ? number_format($data['ak_jf']['jumlah'] ?? 0, 3) : $data['ak_jf']['jumlah'] }}
                    </td>
                    <td style="text-align: center">{{ $data['ak_jf']['keterangan'] }}</td>
                </tr>
                <tr>
                    <th></th>
                    <th style="width: 30px">3</th>
                    <td style="text-align: left">AK Penyesuaian/Penyetaraan</td>

                    <td style="text-align: center">
                        {{ !empty($data['ak_penyesuaian']['lama']) ? number_format($data['ak_penyesuaian']['lama'] ?? 0, 3) : $data['ak_penyesuaian']['lama'] }}
                    </td>
                    <td style="text-align: center">
                        {{ !empty($data['ak_penyesuaian']['baru']) ? number_format($data['ak_penyesuaian']['baru'] ?? 0, 3) : $data['ak_penyesuaian']['baru'] }}
                    </td>
                    <td style="text-align: center">
                        {{ !empty($data['ak_penyesuaian']['jumlah']) ? number_format($data['ak_penyesuaian']['jumlah'] ?? 0, 3) : $data['ak_penyesuaian']['jumlah'] }}
                    </td>
                    <td style="text-align: center">{{ $data['ak_penyesuaian']['keterangan'] }}</td>
                </tr>
                <tr>
                    <th></th>
                    <th style="width: 30px">4</th>
                    <td style="text-align: left">AK Konversi</td>

                    <td style="text-align: center">
                        {{ !empty($data['ak_konversi']['lama']) ? number_format($data['ak_konversi']['lama'] ?? 0, 3) : $data['ak_konversi']['lama'] }}
                    </td>
                    <td style="text-align: center">
                        {{ !empty($data['ak_konversi']['baru']) ? number_format($data['ak_konversi']['baru'] ?? 0, 3) : $data['ak_konversi']['baru'] }}
                    </td>
                    <td style="text-align: center">
                        {{ !empty($data['ak_konversi']['jumlah']) ? number_format($data['ak_konversi']['jumlah'] ?? 0, 3) : $data['ak_konversi']['jumlah'] }}
                    </td>
                    <td style="text-align: center">{{ $data['ak_konversi']['keterangan'] }}
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <th style="width: 30px">5</th>
                    <td style="text-align: left">AK Yang diperoleh dari peningkatan pendidikan</td>
                    <td style="text-align: center">
                        {{ !empty($data['ak_peningkatan']['lama']) ? number_format($data['ak_peningkatan']['lama'] ?? 0, 3) : $data['ak_peningkatan']['lama'] }}
                    </td>
                    <td style="text-align: center">
                        {{ !empty($data['ak_peningkatan']['baru']) ? number_format($data['ak_peningkatan']['baru'] ?? 0, 3) : $data['ak_peningkatan']['baru'] }}
                    </td>
                    <td style="text-align: center">
                        {{ !empty($data['ak_peningkatan']['jumlah']) ? number_format($data['ak_peningkatan']['jumlah'] ?? 0, 3) : $data['ak_peningkatan']['jumlah'] }}
                    </td>
                    <td style="text-align: center">{{ $data['ak_peningkatan']['keterangan'] }}</td>
                </tr>
                <!-- Baris 6 dan seterusnya -->
                @php $index = 6; @endphp
                @if (isset($data['ak_tipe_tambahan']) && is_array($data['ak_tipe_tambahan']) && count($data['ak_tipe_tambahan']) > 0)
                    @foreach ($data['ak_tipe_tambahan'] as $key => $value)
                        <tr>
                            <th></th>
                            <th style="width: 30px">{{ $index }}</th>
                            <td style="text-align: left">{{ $value['tipe_ak'] }}</td>
                            <td style="text-align: center">
                                {{ !empty($value['lama']) ? number_format($value['lama'] ?? 0, 3) : $value['lama'] }}
                            </td>
                            <td style="text-align: center">
                                {{ !empty($value['baru']) ? number_format($value['baru'] ?? 0, 3) : $value['baru'] }}
                            </td>
                            <td style="text-align: center">
                                {{ !empty($value['jumlah']) ? number_format($value['jumlah'] ?? 0, 3) : $value['jumlah'] }}
                            </td>
                            <td style="text-align: center">{{ $value['keterangan'] }}</td>
                        </tr>
                        @php $index++; @endphp
                    @endforeach
                @endif

            </tbody>
            <tfoot style="font-weight: 400; font-size: 13px;">
                <tr>
                    <th colspan="3" style="text-align: center; text-transform: uppercase;">Jumlah Angka kredit
                        kumulatif</th>
                    {{-- <th>{{ number_format($data['jakk']['lama'] ?? 0, 3) }}</th> --}}
                    <th>{{ isset($data['jakk']['lama']) && is_numeric($data['jakk']['lama']) ? number_format((float) $data['jakk']['lama'], 3) : '0.000' }}
                    </th>
                    <th>{{ number_format($data['jakk']['baru'] ?? 0, 3) }}</th>
                    <th>{{ number_format($data['jakk']['jumlah'] ?? 0, 3) }}</th>
                    <th>{{ $data['jakk']['keterangan'] }}</th>
                </tr>
                <tr style="border: 1px solid #334454; ">
                    <th colspan="3">Keterangan</th>
                    <th colspan="2">Pangkat</th>
                    <th colspan="2" style="border: 1px solid #334454;">Jenjang Jabatan</th>
                </tr>
                <tr>
                    <th colspan="3" style="text-align: left;">Angka Kredit Minimal yang harus
                        dipenuhi untuk
                        kenaikan pangkat/jenjang</th>
                    <th colspan="2">{{ number_format($data['pangkat'] ?? 0, 3) }}</th>
                    <th colspan="2">{{ number_format($data['jabatan'] ?? 0, 3) }}</th>
                </tr>
                <tr>
                    <th colspan="3" style="text-align: left;">
                        @if ($data['pangkat_keker'] >= 0)
                            <span>
                                Kelebihan/<del>Kekurangan</del><span>{{ '*)' }}</span>
                            </span>
                        @else
                            <span>
                                <del>Kelebihan</del>/Kekurangan<span>{{ '*)' }}</span>
                            </span>
                        @endif
                        <span>Angka Kredit yang harus dipenuhi untuk kenaikan pangkat</span>
                    </th>
                    <th colspan="2" rowspan="2" style="text-align: center; vertical-align: middle; ">
                        {{ abs($data['pangkat_keker']) }}</th>
                    <th colspan="2" rowspan="2" style="text-align: center; vertical-align: middle;">
                        {{ abs($data['jabatan_keker']) }}</th>
                </tr>
                <tr>
                    <th colspan="3" style="text-align: left;">
                        @if ($data['jabatan_keker'] >= 0)
                            <span>
                                Kelebihan/<del>Kekurangan</del><span>{{ '*)' }}</span>
                            </span>
                        @else
                            <span>
                                <del>Kelebihan</del>/Kekurangan<span>{{ '*)' }}</span>
                            </span>
                        @endif

                        <span>Angka Kredit yang harus dipenuhi untuk kenaikan jabatan</span>

                    </th>
                </tr>
                <tr>
                    <th colspan="7" style="text-align: left; font-size: 13.7px;">{{ $data['kesimpulan'] }}</th>
                </tr>
            </tfoot>
        </table>
        {{-- Bagian 2 End --}}

        <div
            style="{{ isset($data['ak_tipe_tambahan']) && count($data['ak_tipe_tambahan']) > 3 ? 'margin-top: 7rem;' : 'margin-top: 0rem;' }}">
            @if (!empty($data['tebusan3']))
                <div class="tebusan-container">
                    <strong style="font-weight: 400;  width: 40%; word-wrap: break-word;">
                        ASLI Penetapan Angka Kredit untuk Jabatan
                        Fungsional yang bersangkutan
                    </strong>
                    <strong style="font-weight: 400; margin-top: 0.4rem; display: block">
                        Tembusan Disampaikan kepada:
                    </strong>
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

                        // Cek tipe data tebusan3
                        if (is_array($data['tebusan3']) && isset($data['tebusan3'][0]['pihak_tebusan'])) {
                            // Format baru (array of objects)
                            foreach ($data['tebusan3'] as $item) {
                                if ($item['checked']) {
                                    echo "<span style='display: block'>$i. {$item['pihak_tebusan']}</span>";
                                    $i++;
                                }
                            }
                        } else {
                            // Format lama (associative array)
                            foreach ($data['tebusan3'] as $key => $value) {
                                if ($value && isset($tebusan_list[$key])) {
                                    echo "<span style='display: block'>$i. {$tebusan_list[$key]}</span>";
                                    $i++;
                                }
                            }
                        }
                    @endphp
                </div>
            @endif

            <div class="signature-container">
                <strong>Ditetapkan di Jambi </strong>
                <strong style="display:block;">
                    Pada tanggal @formatTanggal($data['tgl_ditetapkan'])
                </strong>
                <strong>Kepala BPS Provinsi Jambi </strong>

                @if (!empty($signature))
                    <div style="margin-top: 0px; margin-bottom: 0px;">
                        <img src="{{ $signature }}" style="width: 60px; height: 60px;" alt="Tanda Tangan">
                    </div>
                @else
                    <div style="height: 70px;"></div>
                @endif

                <div style="margin-top: 0px ">
                    <strong style="display: block">{{ $data['nama'] }}</strong>
                    <strong style="display: block">NIP. {{ $data['nip'] }}</strong>
                </div>

            </div>
        </div>


    </div>
</section>
