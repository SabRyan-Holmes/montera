<!DOCTYPE html>
<html data-theme="bank_xyz_theme" lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title inertia>{{ config('app.name', 'Laravel Application') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link rel="shortcut icon" href="{{ asset('logo.png') }}">

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>

    @routes
    @viteReactRefresh
    @inertiaHead

    <!----------------------------------------------- NOTE:  FOR HOSTING!! --------------------------------------------------->
    <!-- Import manifest.json -->
    @php
        $manifest = json_decode(file_get_contents(public_path('build/manifest.json')), true);
    @endphp

    <!-- Vite imports -->
    <script type="module" src="{{ asset('build/' . $manifest['resources/js/app.jsx']['file']) }}"></script>
    <script type="module"
        src="{{ asset('build/' . $manifest['resources/js/Pages/' . $page['component'] . '.jsx']['file']) }}"></script>

    <!-- Import CSS -->
    <link rel="stylesheet" href="{{ asset('build/assets/CIKpBp9r.css') }}">
    <!----------------------------------------------- NOTE:  FOR HOSTING!! --------------------------------------------------->

</head>

<body class="antialiased">
    @inertia
    <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
</body>

</html>
