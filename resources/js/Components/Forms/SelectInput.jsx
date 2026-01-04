import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectInput(
    { options = [], className = '', isFocused = false, placeholder = "Pilih Opsi", ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    // Mengikuti style border gradient yang kamu buat
    const borderGradient = 'bg-slate-100/60 border-t-primary/50 border-l-primary/50 border-r-secondary/50 border-b-hijau/50 focus:outline-none focus:border-primary/50/40 focus:ring-1 focus:ring-opacity-60 focus:ring-primary/50';

    return (
        <select
            {...props}
            className={`rounded-md shadow-sm disabled:text-slate-500/80 text-slate-600 disabled:cursor-not-allowed ${borderGradient} ${className}`}
            ref={input}
        >
            {/* Opsi Default / Placeholder */}
            <option value="" disabled>
                {placeholder}
            </option>

            {/* Render Pilihan Dinamis */}
            {options.map((option, index) => (
                <option
                    key={index}
                    value={typeof option === 'object' ? option.value : option}
                >
                    {typeof option === 'object' ? option.label : option.toUpperCase()}
                </option>
            ))}
        </select>
    );
});
