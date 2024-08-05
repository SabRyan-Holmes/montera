<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Dokumen PAK</title>

    {{-- @vite('public/css/pak.css') --}}
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/pak.css') }}" />
    <style>
        .page-break {
            page-break-after: always;
        }

        .scale-90 {
            --tw-scale-x: .5;
            --tw-scale-y: .5;
            transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
        }
    </style>
</head>

<body>
    <main>
        {{-- @dd($data) --}}
        {{-- <p style="text: text-nowrap">Data: {{ $data['tebusan1'] }}</p> --}}
        {{-- Page 1 --}}
        @include('pdf.pak-page-1', ['pegawai' => 'data'])

        {{-- Page 2 --}}
        <div class="page-break"></div>
        @include('pdf.pak-page-2', ['pegawai' => 'data'])

        {{-- Page 3 --}}
        <div class="page-break"></div>
        @include('pdf.pak-page-3', ['pegawai' => 'data'])
    </main>
</body>

</html>
