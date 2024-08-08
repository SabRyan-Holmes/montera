<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Dokumen PAK</title>

    {{-- @vite('public/css/pak.css') --}}
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/pak.css') }}" />
    <style>
        .page-break {
            page-break-after: always;
        }

        .border-side-transparent {
            border-left-color: transparent;
            border-right-color: transparent;
        }
    </style>
</head>

<body>
    <main>
        {{-- @dd($data)  --}}


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
