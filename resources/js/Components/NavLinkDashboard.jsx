import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <li className='hover:text-primary active:text-primary focus:bg-success text-base mx-1 my-1'>
            <Link
                {...props}
                className={
                    'font-bold flex ' +
                    (active
                        ? 'border-primary/80 text-primary focus:border-primary bg-slate-800 active:bg-hijau '
                        : 'border-transparent  hover:text-secondary hover:border-gray-300 focus:text-secondary active:text-secondary focus:border-gray-300 ') +
                    className
                }
            >
                {children}
            </Link>
        </li>

    );
}
