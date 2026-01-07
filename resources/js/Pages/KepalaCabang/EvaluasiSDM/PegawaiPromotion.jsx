import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function PegawaiRank({ title, auth }) {
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}
            <div className="w-full text center">Content</div>
        </AuthenticatedLayout>
    );
}
