import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status, title }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            title={title}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Profile</h2>}
        >

            <div className="py-12">
                <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-4 overflow-hidden border shadow-md border-gradient sm:p-8 dark:bg-gray-800 sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="w-full max-w-full "
                        />
                    </div>

                    <div className="p-4 overflow-hidden bg-white border shadow-md border-gradient sm:p-8 dark:bg-gray-800 sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 overflow-hidden bg-white border shadow-md border-gradient sm:p-8 dark:bg-gray-800 sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
