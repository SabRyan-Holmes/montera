import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    const borderGradient = 'bg-slate-100/60 border-t-primary border-l-primary border-r-secondary border-b-hijau focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-opacity-60 focus:ring-primary';

    return (
        <input
            {...props}
            type={type}
            className={`rounded-md shadow-sm placeholder:text-accent ${borderGradient} ${className}`}
            ref={input}
        />
    );
});
