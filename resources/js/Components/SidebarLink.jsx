import { Link } from '@inertiajs/react';

export default function SidebarLink({
    active = false,
    actives = [], // tambahan
    className = '',
    children,
    ...props
}) {
    // Cek apakah salah satu dari actives match
    const isActive =
        active || actives.some((r) => route().current(r));

    return (
        <li className="p-0 my-1 -mx-3 text-base hover:text-primary active:text-primary focus:bg-success">
            <Link
                {...props}
                className={
                    'font-bold flex items-center' +
                    (isActive
                        ? 'border-primary/80 text-primary focus:border-primary bg-slate-700/80 active:bg-hijau '
                        : 'border-transparent hover:text-primary-dark focus:text-secondary active:text-secondary active:bg-primary ') +
                    className
                }
            >
                {children}
            </Link>
        </li>
    );
}




// import { Link } from '@inertiajs/react';

// export default function SidebarLink({ active = false, className = '', children, ...props }) {
//     return (
//         <li className='mx-1 my-1 text-base hover:text-primary active:text-primary focus:bg-success'>
//             <Link
//                 {...props}
//                 className={
//                     'font-bold flex ' +
//                     (active
//                         ? 'border-primary/80 text-primary focus:border-primary bg-slate-700/80 active:bg-hijau '
//                         : 'border-transparent  hover:text-primary-dark hover:border-gray-300 focus:text-secondary active:text-secondary focus:border-gray-300 ') +
//                     className
//                 }
//             >
//                 {children}
//             </Link>
//         </li>

//     );
// }
