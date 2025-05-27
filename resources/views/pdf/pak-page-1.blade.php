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
                style="border-collapse: collapse; border-spacing: 0;
                        line-height: 1rem ;">
                {{--  head  --}}
                <thead>
                    <tr style="text-align: center; text-transform: uppercase; font-weight: 700;">
                        <th colspan="5" style="padding: 0.4rem;">
                            Pejabat Fungsional Yang Dinilai
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {{--  Nama  --}}
                    <tr>
                        <th style=" width: 3.5rem /* 64px */;">
                            1
                        </th>
                        <td colspan="2" style="border-right-color: transparent;">
                            Nama
                        </td>
                        <td colspan="2" style="text-wrap: nowrap;">
                            :
                            {{ $data['pegawai']['Nama'] }} {{ optional($data['pegawai'])['Gelar Tambahan'] ?? '' }}
                        </td>
                    </tr>
                    {{-- {/* NIP */} --}}
                    <tr>
                        <th>
                            2</th>
                        <td colspan="2" style="border-right-color: transparent;">
                            NIP
                        </td>
                        <td colspan="2" style="
                        ">
                            : {{ $data['pegawai']['NIP'] }}
                        </td>
                    </tr>
                    {{-- {/* No Seri Karpeg */} --}}
                    <tr>
                        <th>
                            3</th>
                        <td colspan="2" style="border-right-color: transparent;">
                            Nomor Seri Karpeg
                        </td>
                        <td colspan="2"
                            >
                            : {{ optional($data['pegawai'])['Nomor Seri Karpeg'] ?? '-' }}
                        </td>
                    </tr>
                    {{-- {/* Tempat/Tgl Lahir */} --}}
                    <tr>
                        <th>
                            4</th>
                        <td colspan="2" style="border-right-color: transparent;">
                            Tempat/Tgl Lahir
                        </td>
                        <td colspan="2"
                            style=";
                        ">
                            : {{ $data['pegawai']['Tempat/Tanggal Lahir'] }}
                        </td>
                    </tr>
                    {{-- {/* Jenis Kelamin */} --}}
                    <tr>
                        <th>
                            5</th>
                        <td colspan="2" style="border-right-color: transparent;">
                            Jenis Kelamin
                        </td>
                        <td colspan="2"
                            style=";
                        ">
                            : {{ $data['pegawai']['Jenis Kelamin'] }}
                        </td>
                    </tr>

                    {{-- {/* Pangkat/Golongan Ruang/TMT */} --}}
                    <tr>
                        <th>
                            6</th>
                        <td colspan="2"
                            style="border-right-color: transparent; white-space: nowrap;">
                            Pangkat/Golongan Ruang/TMT
                        </td>
                        <td colspan="2"
                            style="text-wrap: nowrap;">
                            : {{ $data['pegawai']['Pangkat/Golongan Ruangan/TMT'] }}
                        </td>
                    </tr>

                    {{-- {/* Jabatan/TMT */} --}}
                    <tr>
                        <th>
                            7</th>
                        <td colspan="2" style="border-right-color: transparent;">
                            Jabatan/TMT
                        </td>
                        <td colspan="2"
                            style=";   text-wrap: nowrap;">
                            : {{ $data['pegawai']['Jabatan/TMT'] }}
                        </td>
                    </tr>

                    {{-- {/* Unit Kerja */} --}}
                    <tr>
                        <th>
                            8</th>
                        <td colspan="2" style="border-right-color: transparent;">
                            Unit Kerja
                        </td>
                        <td colspan="2"
                            style=";   text-wrap: nowrap;">
                            : {{ $data['pegawai']['Unit Kerja'] }}
                        </td>
                    </tr>

                    {{-- {/* Instansi */} --}}
                    <tr>
                        <th>
                            9</th>
                        <td colspan="2" style="border-right-color: transparent;">
                            Intansi
                        </td>
                        <td colspan="2"
                            style=";
                                ">
                            : {{ 'Badan Pusat Statistik' }}
                        </td>
                    </tr>
                    {{-- -------------------------------------- --}}


                </tbody>

                <tfoot>
                    <tr style="text-transform: uppercase; ">
                        <th colspan="5"
                            style="font-weight: 700;">
                            konversi predikat kinerja ke angka kredit
                        </th>
                    </tr>
                    {{-- ---------------------------------------- --}}

                    <tr style="font-weight:400;">
                        <th colspan="3"
                            style="text-transform: capitalize;">
                            Hasil Penilaian Kinerja
                        </th>
                        <th rowSpan="2" style=" ">
                            Koefisien per Tahun
                        </th>
                        <th style=" ">
                            Angka Kredit yang didapat
                        </th>
                    </tr>

                    <tr style="text-transform: uppercase;">
                        <th colspan="2" style=" ">
                            predikat
                        </th>
                        <th>
                            persentase
                        </th>
                        <th style="text-transform: none; white-space: nowrap;">
                            (kolom 2 x kolom 3)
                        </th>
                    </tr>

                    <tr style="text-transform: uppercase; background-color: #e8f3f3;">
                        <th colspan="2">
                            {{ '1' }}
                        </th>
                        <th>
                            {{ '2' }}
                        </th>
                        <th>
                            {{ '3' }}
                        </th>
                        <th>
                            {{ '4' }}
                        </th>
                    </tr>

                    <tr style="text-transform: uppercase;">
                        <th colspan="2">
                            {{ $data['predikat'] }}
                        </th>
                        <th >
                            {{ $data['angka_periode'] }}
                            /12
                        </th>
                        <th>
                            {{ number_format($data['ak_normatif'] ?? 0, 3) }}
                        </th>
                        <th>
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
                <strong>Kepala BPS Provinsi Jambi </strong>

                {{-- TTD Validasi --}}
                @if (!empty($signature))
                    <div style="margin-top: 0px; margin-bottom: 0px;">
                        <img src="{{ $signature }}" style="width: 60px; height: 34px;" alt="Tanda Tangan">
                    </div>
                @else
                    <div style="height: 80px;"></div> {{-- Spacer jika tidak ada tanda tangan --}}
                @endif
                {{-- TTD Validasi --}}

                <div>
                    <strong style="display: block">
                        {{ $data['nama'] }}
                    </strong>
                    <strong style="display: block">
                        NIP. {{ $data['nip'] }}
                    </strong>
                </div>
            </div>


            @if (!empty($data['tebusan1']))
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

                        // Cek tipe data tebusan1
                        if (is_array($data['tebusan1']) && isset($data['tebusan1'][0]['pihak_tebusan'])) {
                            // Format baru (array of objects)
                            foreach ($data['tebusan1'] as $item) {
                                if ($item['checked']) {
                                    echo "<span style='display: block'>$i. {$item['pihak_tebusan']}</span>";
                                    $i++;
                                }
                            }
                        } else {
                            // Format lama (associative array)
                            foreach ($data['tebusan1'] as $key => $value) {
                                if ($value && isset($tebusan_list[$key])) {
                                    echo "<span style='display: block'>$i. {$tebusan_list[$key]}</span>";
                                    $i++;
                                }
                            }
                        }
                    @endphp
                </div>
            @endif
            {{-- KODE LAMA --}}
            {{-- @if (count(array_filter($data['tebusan1'])) > 0)
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
            @endif --}}



        </div>
    </section>
