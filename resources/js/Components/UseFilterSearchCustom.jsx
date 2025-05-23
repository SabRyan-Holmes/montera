import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";

export default function useFilterSearch({
    initialSearch = "",
    initialFilter1 = "",
    initialFilter2 = "",
    routeName = "/pegawai",
}) {
    const [search, setSearch] = useState(initialSearch);
    const [byFilter1, setByFilter1] = useState(initialFilter1);
    const [byFilter2, setByFilter2] = useState(initialFilter2);

    useEffect(() => {
        if (
            (byFilter2 && byFilter2 !== initialFilter2) ||
            (byFilter1 && byFilter1 !== initialFilter1)
        ) {
            router.get(
                routeName,
                { byFilter2, byFilter1 },
                { replace: true, preserveState: true }
            );
        } else if (
            (byFilter2 !== initialFilter2 && search !== initialSearch) ||
            (byFilter1 !== initialFilter1 && search !== initialSearch)
        ) {
            router.get(
                routeName,
                { byFilter2, byFilter1, search },
                { replace: true, preserveState: true }
            );
        }
    }, [byFilter2, byFilter1]);

    useEffect(() => {
        if (byFilter2 === "Semua Kategori" && byFilter1 === "Semua Kategori") {
            router.get(routeName, { search }, { replace: true, preserveState: true });
        } else if (byFilter2 === "Semua Kategori") {
            router.get(routeName, { byFilter1, search }, { replace: true, preserveState: true });
        } else if (byFilter1 === "Semua Kategori") {
            router.get(routeName, { byFilter2, search }, { replace: true, preserveState: true });
        } else if (search && search !== initialSearch) {
            router.get(routeName, { search }, { replace: true, preserveState: true });
        }
    }, [search]);

    return {
        search,
        setSearch,
        byFilter1,
        setByFilter1,
        byFilter2,
        setByFilter2,
    };
}
