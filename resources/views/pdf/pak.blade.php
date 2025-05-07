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
    <title>{{$title}}</title>
    <link rel="shortcut icon" href="{{ asset('logo.png') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/pak.css') }}" />
    {{-- @vite('public/css/pak.css') --}}

    {{-- For Production --}}
    <link rel="shortcut icon" href="{{ asset('logo.png') }}">
    <link rel="stylesheet" type="text/css" href="{{ public_path('css/pak.css') }}" />

    <style>
        .page-break {
            page-break-after: always;
        }

        .break-inside {
            page-break-inside: avoid
        }

        .border-side-transparent {
            border-left-color: transparent;
            border-right-color: transparent;
        }
    </style>
</head>
{{-- TODO:
    benerin size font yg dk konsisten, dan jadiin 3 angka dibelakang koma
--}}
<body>
    <main>
        {{-- @dd($data)  --}}


        {{-- Page 1 --}}
        @include('pdf.pak-page-1')

        {{-- Page 2 --}}
        <div class="page-break"></div>
        @include('pdf.pak-page-2')

        {{-- Page 3 --}}
        <div class="page-break"></div>
        @include('pdf.pak-page-3', ['pegawai' => 'data'])
    </main>
</body>

</html>
