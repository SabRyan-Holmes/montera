import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AdminContent from "./AdminContent";
import PegawaiContent from "./PegawaiContent";
import SupervisorContent from "./SupervisorContent";
import KacabContent from "./KacabContent";

export default function AuthDashboard({
    title,
    auth,
    dataByRole,
}) {

    const role = auth.user.jabatan.nama_jabatan;
    const contentByRole = {
        Administrator: AdminContent,
        Supervisor: SupervisorContent,
        "Kepala Cabang": KacabContent,
        Pegawai: PegawaiContent,
    };

    const ContentComponent = contentByRole[role];

    if (!ContentComponent) return null;
    return (
        <AuthenticatedLayout user={auth.user} title={title} >
            {/* content */}
              {ContentComponent && (
                <ContentComponent
                    dataByRole={dataByRole}
                />
            )}
        </AuthenticatedLayout>
    );
}
