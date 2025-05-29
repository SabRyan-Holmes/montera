import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { SdmPimpinanContent } from "@/Components";
import PegawaiContent from "./pegawaiContent";


export default function AuthDashboard({ title, auth, dataByRole, dataGraph }) {
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}

            {auth.user.role == "Divisi SDM" || auth.user.role == "Pimpinan" ? (
                <SdmPimpinanContent
                    dataGraph={dataGraph}
                    dataByRole={dataByRole}
                />
            ) : (
                <PegawaiContent
                dataByRole={dataByRole}
            />
            )}
        </AuthenticatedLayout>
    );
}
