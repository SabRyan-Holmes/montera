import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaUserTie } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Graph from "@/Components/Graph";
import { FaUserLarge, FaUsers } from "react-icons/fa6";
import { SdmPimpinanContent } from "@/Components";
import PegawaiContent from "./pegawaiContent";

export default function AuthDashboard({ title, auth, dataByRole, dataGraph }) {
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}

            {auth.user.role == "divisi_sdm" || auth.user.role == "pimpinan" ? (
                <SdmPimpinanContent
                    dataGraph={dataGraph}
                    dataByRole={dataByRole}
                />
            ) : (
                <PegawaiContent
                dataGraph={dataGraph}
                dataByRole={dataByRole}
            />
            )}
        </AuthenticatedLayout>
    );
}
