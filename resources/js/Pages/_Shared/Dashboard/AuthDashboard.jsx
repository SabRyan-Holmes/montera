import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AtasanContent  from "./AtasanContent";
import PegawaiContent from "./PegawaiContent";

export default function AuthDashboard({ title, auth, dataByRole, dataGraph, isAtasan }) {
    return (
        <AuthenticatedLayout user={auth.user} title={title} isAtasan={isAtasan}>
            {/* content */}
            {isAtasan ? (
                <AtasanContent dataGraph={dataGraph} dataByRole={dataByRole} />
            ) : (
                <PegawaiContent dataByRole={dataByRole} />
            )}
        </AuthenticatedLayout>
    );
}
