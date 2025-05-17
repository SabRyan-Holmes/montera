import React from "react";
import { InputLabelCustom } from "..";

export default function RadioWithLabel({ name, value, radioValue, ...props }) {
    // Pisahkan nama dan NIP berdasarkan tanda "-"
    const [nama, nip] = value.split(" - ");
    const uniqueId = `${name}_${radioValue}`; // Buat ID unik
    return (
        <div className="flex items-center gap-3 my-2">
            <input
                {...props}
                type="radio"
                name={name}
                value={radioValue}
                id={uniqueId} // Gunakan ID unik
                className="radio radio-primary"
            />
            <label htmlFor={uniqueId} className="flex flex-col">
                <span className="text-lg font-medium">{nama}</span>
                <span className="text-base font-medium text-gray-500">{nip}</span>
            </label>
        </div>
    );
}
