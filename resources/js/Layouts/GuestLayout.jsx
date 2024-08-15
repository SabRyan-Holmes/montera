import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="flex flex-col items-center min-h-screen pt-6 bg-opacity-100 bg-center bg-cover sm:justify-center sm:pt-0 bg-bps ">

            <div className="w-full px-6 mt-6 overflow-hidden border shadow-md border-gradient sm:max-w-md py-7 sm:rounded-lg ">
                {children}
            </div>
        </div>
    );
}
