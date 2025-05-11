import Authenticated from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";

import { FaTrash } from "react-icons/fa6";

export default function Index({
    auth,
    pegawais,
    title,
    flash,
    searchReq: initialSearch,
    byDaerahReq: initialDaerah,
    byJabatanReq: initialJabatan,
}) {


    return (
        <Authenticated user={auth.user} title={title}>
           <section>Pengusulan Pegawai</section>
        </Authenticated>
    );
}
