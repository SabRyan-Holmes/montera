import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

export default function useFilterSearch({
    initialSearch = "",
    initialDaerah = "",
    initialJabatan = "",
    routeName = "/pegawai",
}) {
    const [search, setSearch] = useState(initialSearch);
    const [byDaerah, setByDaerah] = useState(initialDaerah);
    const [byJabatan, setByJabatan] = useState(initialJabatan);

    useEffect(() => {
        if (
            (byJabatan && byJabatan !== initialJabatan) ||
            (byDaerah && byDaerah !== initialDaerah)
        ) {
            router.get(
                routeName,
                { byJabatan, byDaerah },
                { replace: true, preserveState: true }
            );
        } else if (
            (byJabatan !== initialJabatan && search !== initialSearch) ||
            (byDaerah !== initialDaerah && search !== initialSearch)
        ) {
            router.get(
                routeName,
                { byJabatan, byDaerah, search },
                { replace: true, preserveState: true }
            );
        }
    }, [byJabatan, byDaerah]);

    useEffect(() => {
        if (byJabatan === "Semua Kategori" && byDaerah === "Semua Kategori") {
            router.get(routeName, { search }, { replace: true, preserveState: true });
        } else if (byJabatan === "Semua Kategori") {
            router.get(routeName, { byDaerah, search }, { replace: true, preserveState: true });
        } else if (byDaerah === "Semua Kategori") {
            router.get(routeName, { byJabatan, search }, { replace: true, preserveState: true });
        } else if (search && search !== initialSearch) {
            router.get(routeName, { search }, { replace: true, preserveState: true });
        }
    }, [search]);

    return {
        search,
        setSearch,
        byDaerah,
        setByDaerah,
        byJabatan,
        setByJabatan,
    };
}
