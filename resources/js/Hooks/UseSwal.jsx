import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function useSwal() {
    const { flash } = usePage().props;

    // --- KONFIGURASI TOAST ---
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000, // Sedikit diperlama biar kebaca
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    useEffect(() => {
        // Pastikan ada timestamp/ID unik dari backend
        if (!flash.timestamp) return;

        // Kunci unik untuk storage browser
        const storageKey = `swal_shown_${flash.timestamp}`;

        // 1. Cek di sessionStorage apakah ID ini sudah pernah ditampilkan?
        if (sessionStorage.getItem(storageKey)) {
            return; // Jika sudah ada, STOP. Jangan tampilkan lagi.
        }

        // --- LOGIC 1: TOAST ---
        if (flash.toast) {
            Toast.fire({
                icon: "success",
                title: flash.toast,
            });
            // Tandai sudah tampil di storage
            sessionStorage.setItem(storageKey, 'true');
        }

        // --- LOGIC 2: SWAL ALERT ---
        if (flash.message) {
            const activeModal = document.querySelector('dialog[open]');

            Swal.fire({
                target: activeModal ? activeModal : 'body',
                title: "Berhasil!",
                text: flash.message,
                icon: "success",
                iconColor: "#50C878",
                confirmButtonText: "Oke",
                confirmButtonColor: "#2D95C9",
            });

            // Tandai sudah tampil di storage
            sessionStorage.setItem(storageKey, 'true');
        }

        // HAPUS bagian setTimeout cleanup!
        // Kita TIDAK mau menghapus history bahwa pesan ini sudah tampil.
        // Biarkan sessionStorage membersihkan dirinya sendiri saat tab ditutup.

    }, [flash]);
}
