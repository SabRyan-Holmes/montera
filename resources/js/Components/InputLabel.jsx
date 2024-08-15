export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-semibold text-sm text-slate-700/90 ` + className}>
            {value ? value : children}
        </label>
    );
}
