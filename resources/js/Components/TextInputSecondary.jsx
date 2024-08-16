import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInputSecondary({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={`rounded-md  placeholder:text-accent h-12 shadow-md shadow-primary/15 text-slate-600 bg-slate-200/40 border-x-orange-800 border-[1.4px] border-y-sky-800 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-opacity-60 focus:ring-primary ${className}`}
            ref={input}
        />
    );
});
