import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create({ title, auth }) {
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}
            <div className="w-full text center">Create Target for this pegawai</div>
        </AuthenticatedLayout>
    );
}
