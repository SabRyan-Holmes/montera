export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `${className} inline-flex items-center h-10 px-4 py-2 border hover:border-secondary hover:scale-105  border-secondary/30 rounded-md font-bold text-xs text-secondary
                 uppercase tracking-widest shadow-sm  focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } `
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
