import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    const borderGradient = 'bg-slate-100/60 border-x-primary/50  border-y-secondary/50 border-b-primary-dark focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-opacity-60 focus:ring-primary/50';

    return (
        <input
            {...props}
            type={type}
            className={`rounded-md shadow-sm disabled:text-slate-500/80  placeholder:text-disabled-color text-slate-600 disabled:cursor-not-allowed  ${borderGradient} ${className}`}
            ref={input}
        />
    );
});
