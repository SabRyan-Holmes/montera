import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    const borderGradient = 'bg-slate-100/60 border-t-primary/50 border-l-primary/50 border-r-secondary/50 border-b-hijau/50 focus:outline-none focus:border-primary/50/40 focus:ring-1 focus:ring-opacity-60 focus:ring-primary/50';

    return (
        <input
            {...props}
            type={type}
            className={`rounded-md shadow-sm placeholder:text-accent text-slate-600 disabled:cursor-not-allowed ${borderGradient} ${className}`}
            ref={input}
        />
    );
});
