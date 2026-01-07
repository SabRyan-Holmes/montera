import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",

        // flowbite
        "./node_modules/flowbite/**/*.js",
    ],
    safelist: [
        {
            pattern: /bg-(primary|warning|bermuda|hijau|success)\/(5|10)/,
        },
        {
            pattern: /text-(primary|warning|bermuda|hijau|success)(\/80)?/,
        },
    ],
    darkMode: ["class", '[data-theme="bps-theme"]'],

    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                "primary-dark": "oklch(50% 0.134 242.749)",
                secondary: "#fb923c",
                oren: "#fb923c",
                hijau: "#22c55e",
                bermuda: "#16BDCA",
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                roboto: ["Roboto", "sans-serif"],
                inder: ["Inder"],
                kanit: ["Kanit"],
                signika: ["Signika Negative"],
                explora: ["Explora"],
            },
            backgroundImage: {
                bps: "url('/resources/assets/image/background.jpg')",
            },

            screens: {
                xs: "400px",
                phone: "320px",
                tablet: "768px",
                laptop: "1024px",
                desktop: "1440px",
                "8xl": "2400px",
                // "2xl": "1320px",
                // "3xl": "1536px",
            },
            fontSize: {
                xs: "13px",
            },
            width: {
                a4: "210mm",
            },
            height: {
                a4: "297mm",
            },
        },
    },

    daisyui: {
        themes: [
            {
                bank_xyz_theme: {
                    // Emas Utama (diambil dari warna paling dominan di logo)
                    primary: "#D4AF37",
                    "primary-content": "#ffffff",

                    // Biru Gelap / Navy (Warna standar perbankan agar kontras dengan emas)
                    secondary: "#1E293B",
                    "secondary-content": "#ffffff",

                    // Oranye Cerah (untuk tombol aksi/interaksi agar tidak monoton)
                    accent: "#F59E0B",

                    // Hitam Elegan untuk teks utama
                    neutral: "#ffffff",

                    // Background halaman (Abu-abu sangat muda agar bersih)
                    "base-100": "#F8FAFC",

                    // Warna Status (Standar UI)
                    info: "#3ABFF8",
                    success: "#10B981", // Hijau Emerald lebih mewah dibanding #00ff00
                    warning: "#FBBF24",
                    error: "#EF4444",
                },

                  bps_theme: {

                    primary: "#2D95C9",

                    secondary: "#fb923c",

                    oren: "#fb923c",

                    accent: "#9ca3af",

                    neutral: "#ffffff",

                    "base-100": "#f3f4f6",

                    info: "#7dd3fc",

                    success: "#00ff00",

                    // warning: "#fb7185",

                    warning: "oklch(64.5% 0.246 16.439)",

                    error: "#ff0000",

                },
            },
        ],
    },

    plugins: [
        require("daisyui"),
        daisyui,
        require("flowbite/plugin")({
            charts: true,
        }),
        forms,
    ],
};
