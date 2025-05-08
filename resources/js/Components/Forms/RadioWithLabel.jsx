import React from "react";
import { InputLabelCustom } from "..";

export default function RadioWithLabel({ name, value, ...props }) {
    return (
        <div className="flex items-center gap-3 my-2">
            <input
                {...props}
                type="radio"
                name={name}
                className="radio radio-primary"
            />
            <InputLabelCustom
                htmlFor={name}
                value={value}
                className="text-lg"
            />
        </div>
    );
}
