export default function InputLabel({
    value,
    className = "",
    children,
    forName, // Prop baru untuk menerima nama (name)
    ...props
}) {
    // Cari elemen input berdasarkan name
    const handleLabelClick = () => {
        const input = document.querySelector(`input[name="${forName}"]`);
        if (input) input.focus();
    };
    return (
        <label
            {...props}
            className={
                className +
                ` block font-semibold text-slate-700/90 ` +
                (className ? className : "text-sm")
            }
            onClick={handleLabelClick} // Tambahkan handler klik
        >
            {value ? value : children}
        </label>
    );
}
