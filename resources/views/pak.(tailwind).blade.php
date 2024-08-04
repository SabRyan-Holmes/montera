<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Dokumen PAK</title>

    @vite('resources/css/document.css')
    <link rel="stylesheet" type="text/css" media="screen" href="../css/document.css" />
    <style>
        /* div.title-container {
            display: flex;
            align-items: center;
            gap: var(--tw-size-3);
            font-style: italic;
        }

        strong.title {
            font-size: 1rem;
            line-height: var(--tw-line-height-8);
            --tw-text-opacity: 1;
            color: rgb(var(--tw-color-primary) / var(--tw-text-opacity));
        }

        strong.title>span {
            display: block;
        } */
    </style>
</head>

<body>
    <section class="container-a4">
        <div class="flex items-center gap-3 italic">
            <img src="{{asset('logo.png')}}" alt="Logo BPS" class="w-28 h-28" />
            <strong class="text-2xl text-primary uppercase">
                Badan Pusat Statistik
                <span class="block">{{"Provinsi Jambi"}} </span>
            </strong>
        </div>


        <div class="mt-3 w-full mb-3">
            <h2 class="mx-auto text-lg uppercase text-center font-medium">
                Konversi Predikat ke Angka Kredit
                <span class="block">

                    NOMOR :
                    <span class="normal-case">
                        {{ '1500.445/Konv/2024' }}
                    </span>
                </span>
            </h2>
        </div>

        <div class="flex justify-between">
            <strong>Instansi : Badan Pusat Statistik</strong>
            <strong>
                Periode : {{ 'Januari' }} - {{ 'Desember 2024' }}
            </strong>
        </div>

        <div class="mt-2 overflow-x-auto">
            <table class="table-auto w-full border-black-collapse border border-slate-900">
                {{--  head  --}}
                <thead>
                    <tr class="text-center uppercase font-bold">
                        <th colSpan="5" class="border border-black  p-2">
                            Pejabat Fungsional Yang Dinilai
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {{--  Nama  --}}
                    <tr>
                        <th class="border border-black  ">1</th>
                        <td class="border border-black border-x-transparent  p-2">
                            Nama
                        </td>
                        <td colSpan="5" class="border border-black  p-2">
                            : {{ 'Kiky Amci Ilzania, S.Tr.Stat' }}
                        </td>
                    </tr>
                    {{-- {/* NIP */} --}}
                    <tr>
                        <th class="border border-black  ">2</th>
                        <td class="border border-x-transparent border-black  p-2">
                            NIP
                        </td>
                        <td colSpan="5" class="border border-black  p-2">
                            : {{ '1997010220019012001' }}
                        </td>
                    </tr>
                    {{-- {/* No Seri Karpeg */} --}}
                    <tr>
                        <th class="border border-black">3</th>
                        <td class="border border-x-transparent border-black  p-2">
                            Nomor Seri Karpeg
                        </td>
                        <td colSpan="5" class="border border-black  p-2">
                            : {{ 'B 00046316 ' }}
                        </td>
                    </tr>
                    {{-- {/* Tempat/Tgl Lahir */} --}}
                    <tr>
                        <th class="border border-black">4</th>
                        <td class="border border-x-transparent border-black  p-2">
                            Tempat/Tgl Lahir
                        </td>
                        <td colSpan="5" class="border border-black  p-2">
                            : {{ 'Jambi/2 Januari 1997 ' }}
                        </td>
                    </tr>
                    {{-- {/* Jenis Kelamin */} --}}
                    <tr>
                        <th class="border border-black">5</th>
                        <td class="border border-x-transparent border-black  p-2">
                            Jenis Kelamin
                        </td>
                        <td colSpan="5" class="border border-black  p-2">
                            : {{ 'Perempuan ' }}
                        </td>
                    </tr>

                    {{-- {/* Pangkat/Golongan Ruang/TMT */} --}}
                    <tr>
                        <th class="border border-black">6</th>
                        <td class="border border-x-transparent border-black text-nowrap  p-2">
                            Pangkat/Golongan Ruang/TMT
                        </td>
                        <td colSpan="5" class="border border-black  p-2">
                            : {{ 'Penata Muda(III/a)/01/12/2019 ' }}
                        </td>
                    </tr>

                    {{-- {/* Jabatan/TMT */} --}}
                    <tr>
                        <th class="border border-black">7</th>
                        <td class="border border-x-transparent border-black  p-2">
                            Jabatan/TMT
                        </td>
                        <td colSpan="5" class="border border-black  p-2">
                            : {{ 'Statistisi Ahli Pertama/ 17-06-2021 ' }}
                        </td>
                    </tr>

                    {{-- {/* Jabatan/TMT */} --}}
                    <tr>
                        <th class="border border-black">8</th>
                        <td class="border border-x-transparent border-black  p-2">
                            Unit Kerja
                        </td>
                        <td colSpan="5" class="border border-black  p-2">
                            : {{ 'BPS Kabupaten Tanjung Jabung Timur ' }}
                        </td>
                    </tr>

                    {{-- {/* Jabatan/TMT */} --}}
                    <tr>
                        <th class="border border-black">9</th>
                        <td class="border border-x-transparent border-black  p-2">
                            Intansi
                        </td>
                        <td colSpan="5" class="border border-black  p-2">
                            : {{ 'Badan Pusat Statistik ' }}
                        </td>
                    </tr>
                    {{-- -------------------------------------- --}}
                    <tr class="text-center uppercase font-bold">
                        <th colSpan="5" class="border border-black  p-2">
                            konversi predikat kinerja ke angka kredit
                        </th>
                    </tr>
                    {{-- ---------------------------------------- --}}

                    <tr class="text-center  font-bold">
                        <th colSpan="2" class="border border-black capitalize  p-2">
                            Hasil Penilaian Kinerja
                        </th>
                        <th colSpan="2" rowSpan="2" class="border border-black  p-2">
                            Koefisien per Tahun
                        </th>

                        <th class="border border-black  p-2">
                            Angka Kredit yang didapat
                        </th>
                    </tr>
                    <tr class="uppercase w-full ">
                        <th class="border border-black p-2 ">
                            predikat
                        </th>
                        <th class="border border-black ">persentase</th>
                        {{-- {/* Kredit Yang didapat */} --}}

                        <th class="border border-black normal-case text-xs text-nowrap">
                            (kolom 2 x kolom 3)
                        </th>
                    </tr>
                    <tr class="uppercase w-full ">
                        <th class="border border-black p-2 ">{{ '1' }}</th>
                        <th class="border border-black ">{{ '2' }}</th>
                        {{-- {/* Koefisien Pertahun */} --}}
                        <th colSpan="2" class="border border-black normal-case">
                            {{ '3' }}
                        </th>
                        <th class="border border-black normal-case">
                            {{ '5' }}
                        </th>
                    </tr>
                    {{-- {/* ------------------------------------------------------ */} --}}
                    <tr class="uppercase w-full ">
                        <th class="border text-nowrap border-black p-2 ">
                            {{ 'Sangat Baik' }}
                        </th>
                        <th class="border border-black ">{{ '12' }}/12</th>
                        {{-- {/* Koefisien Pertahun */} --}}
                        <th colSpan="2" class="border border-black normal-case">
                            {{ '12.5' }}
                        </th>

                        <th class="border border-black normal-case">
                            {{ '18.75' }}
                        </th>
                    </tr>
                </tbody>
            </table>

            <div class="flex justify-end mr-10">
                <div class="my-6">
                    <strong>Ditetapkan di Jambi </strong>
                    <strong class="block">
                        Pada tanggal {{ '8 Mei 2024' }}
                    </strong>
                    <strong class="pt-2">Kepala BPS Provinsi Jambi </strong>

                    {{-- {/* Img Tanda TanganNanti  */} --}}
                    <img src="" alt="" class=" my-6" />

                    <strong>
                        {{ 'Agus Sudibyo, M.Stat' }}
                    </strong>
                    <strong class="block">
                        {{ 'NIP. 197412311996121001' }}
                    </strong>
                </div>
            </div>
        </div>
    </section>
</body>

</html>
