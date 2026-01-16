import { useEffect, useRef } from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function useSwal() {
    const { flash } = usePage().props;
    const shown = useRef(new Set()); // Mencegah duplikasi render ganda

    // --- KONFIGURASI TOAST ---
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    useEffect(() => {
        // --- LOGIC 1: TOAST (Notifikasi Kecil) ---
        // Dipicu jika backend kirim: ->with('toast', 'Pesan...')
        if (flash.toast && flash.timestamp) {
            // Cek apakah ID timestamp ini sudah ditampilkan sebelumnya
            if (!shown.current.has(flash.timestamp)) {
                Toast.fire({
                    icon: "success",
                    title: flash.toast,
                });
                shown.current.add(flash.timestamp);
            }
        }

        // --- LOGIC 2: SWAL ALERT (Popup Besar) ---
        // Dipicu jika backend kirim: ->with('message', 'Pesan...')
        if (flash.message && flash.timestamp) {
            if (!shown.current.has(flash.timestamp)) {
                // Cek apakah ada modal yang sedang aktif agar Swal muncul di atasnya
                const activeModal = document.querySelector('dialog[open]');

                Swal.fire({
                    target: activeModal ? activeModal : 'body', // Fix z-index issue
                    title: "Berhasil!",
                    text: flash.message,
                    icon: "success",
                    iconColor: "#50C878",
                    confirmButtonText: "Oke",
                    confirmButtonColor: "#2D95C9",
                });
                shown.current.add(flash.timestamp);
            }
        }

        // Cleanup: Reset set setelah beberapa detik agar ID yang sama bisa dipakai ulang (opsional)
        // Berguna jika user melakukan aksi yang sama persis tanpa reload halaman
        const timer = setTimeout(() => {
            if(flash.timestamp) shown.current.delete(flash.timestamp);
        }, 2000);

        return () => clearTimeout(timer);

    }, [flash]); // Trigger setiap kali properti flash berubah
}
