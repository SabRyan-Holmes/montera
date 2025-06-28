import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useRef, useState } from "react";
import { router, useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useRemember } from "@inertiajs/react";
import SDMContent from "./Partials/SDMContent";
import PegawaiContent from "./Partials/PegawaiContent";
import PimpinanContent from "./Partials/PimpinanContent";
// ANCHOR : Import Here!

export default function Index({ auth, title, flash, aturanPAK }) {
    const shownMessages = useRef(new Set());
    useEffect(() => {
        if (flash.message && !shownMessages.current.has(flash.message)) {
            Swal.fire({
                title: "Berhasil!",
                text: flash.message,
                icon: "success",
                confirmButtonText: "Oke",
            }).then(() => {
                shownMessages.current.add(flash.message);

                // Bersihkan flash message
                router.get(
                    "",
                    {},
                    {
                        preserveScroll: true,
                        preserveState: true,
                        onFinish: () => {
                            shownMessages.current.delete(flash.message);
                        },
                    }
                );
            });
        }
    }, [flash.message]);





    const role = auth.user.role
    return (
        <Authenticated user={auth.user} title={role === "Divisi SDM" ? `Kelola ${title}` : `Monitoring ${title}`}>

            {role === "Divisi SDM" &&
            <SDMContent aturanPAK={aturanPAK} />
            }

            {role === "Pegawai" &&
            <PegawaiContent aturanPAK={aturanPAK} />
            }

            {role === "Pimpinan" &&
            <PimpinanContent aturanPAK={aturanPAK} />
            }

        </Authenticated>
    );
}
