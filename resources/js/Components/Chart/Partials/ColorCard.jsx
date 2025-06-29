export default function ColorCard({ value, label, color }) {
    const colorClasses = {
        primary: {
            bg: "bg-primary/5",
            ring: "bg-primary/10",
            text: "text-primary",
            textSoft: "text-primary/80",
        },
        bermuda: {
            bg: "bg-bermuda/5",
            ring: "bg-bermuda/10",
            text: "text-bermuda",
            textSoft: "text-bermuda/80",
        },
        warning: {
            bg: "bg-warning/5",
            ring: "bg-warning/10",
            text: "text-warning",
            textSoft: "text-warning/80",
        },
        hijau: {
            bg: "bg-hijau/5",
            ring: "bg-hijau/10",
            text: "text-hijau",
            textSoft: "text-hijau/80",
        },
        success: {
            bg: "bg-success/5",
            ring: "bg-success/10",
            text: "text-success",
            textSoft: "text-success/80",
        },
    };

    const colors = colorClasses[color] ?? colorClasses.primary;

    return (
        <dl
            className={`min-w-[90px] h-[78px] flex flex-col items-center justify-center rounded-lg ${colors.bg}`}
        >
            <dt
                className={`flex items-center justify-center h-8 w-8 mb-1 text-sm font-medium rounded-full ${colors.ring} ${colors.text}`}
            >
                {value}
            </dt>
            <dd className={`text-sm font-medium ${colors.textSoft}`}>
                {label}
            </dd>
        </dl>
    );
}

// export default function ColorCard({ value, label, color = "primary" }) {
//     return (
//         <dl
//             className={`w-full flex flex-col items-center justify-center rounded-lg bg-${color}/5`}
//         >
//             <dt
//                 className={`flex items-center justify-center h-8 my-2 w-8 mb-1 text-sm font-medium rounded-full bg-${color}/10 text-${color}`}
//             >
//                 {value}
//             </dt>
//             <dd className={`text-sm font-medium text-${color}/80`}>{label}</dd>
//         </dl>
//     );
// }
