import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Report({ title, auth }) {
    return (
        <AuthenticatedLayout user={auth.user} title={title}>
            {/* content */}
            <div className="w-full text center">Content</div>
        </AuthenticatedLayout>
    );
}
