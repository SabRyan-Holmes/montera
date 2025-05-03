export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `${className} inline-flex glass items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase
                tracking-widest hover:primary/80 focus:primary/80 active:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                transition ease-in-out duration-150 hover:scale-105 ${
                    disabled && "opacity-25"
                }`
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
