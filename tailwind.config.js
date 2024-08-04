import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                primary: "#38bdf8",
                secondary: '#fb923c',
                'oren': '#fb923c',
                'hijau': '#22c55e',
                'bermuda': '#78dcca',
              },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                inder: ["Inder"],
                kanit: ["Kanit"],
                signika: ["Signika Negative"],
                explora: ["Explora"],
            },
            backgroundImage: {
                // card: "url('/resources/assets/card.png')",
            },

            screens: {
                xs: "400px",
                "phone": "320px",
                "tablet": "768px",
                "laptop": "1024px",
                "desktop": "1440px",
                "8xl": "2400px",
                // "2xl": "1320px",
                // "3xl": "1536px",
            },
            fontSize: {
                xs: '13px',

              },
              width: {
                a4: '210mm',
             },
             height: {
               a4: '297mm',
             },

        },
    },

    daisyui: {
        themes: [
            {

                bps_theme: {
                    "primary": "#38bdf8",

                    "secondary": "#fb923c",
                    "oren": "#fb923c",

                    "accent": "#9ca3af",

                    "neutral": "#ffffff",

                    "base-100": "#f3f4f6",

                    "info": "#7dd3fc",

                    "success": "#00ff00",

                    "warning": "#fb7185",

                    "error": "#ff0000",
                },
            },
        ],
    },

    plugins: [
        require('daisyui'),
        daisyui,
        forms
    ],
};
