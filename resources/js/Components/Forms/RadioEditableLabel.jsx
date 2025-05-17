// RadioWithEditableLabel.jsx
import React, { useState, forwardRef } from "react";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { TextInput } from "..";
import { FaTrash } from "react-icons/fa6";

const RadioWithEditableLabel = forwardRef(
    (
        {
            name,
            value: initialValue,
            defaultChecked,
            onEditComplete,
            onDelete,
            ...props
        },
        ref
    ) => {
        const [isEditing, setIsEditing] = useState(false);
        const [value, setValue] = useState(initialValue);
        const [tempValue, setTempValue] = useState(initialValue);

        const handleEditClick = (e) => {
            e.stopPropagation(); // Penting: Cegah event bubbling
            e.preventDefault();
            setTempValue(value);
            setIsEditing(true);
        };

        const handleSave = (e) => {
            e?.stopPropagation();
            setIsEditing(false);
            if (tempValue.trim() !== value) {
                setValue(tempValue);
                onEditComplete?.(tempValue);
            }
        };

        const handleCancel = () => {
            setIsEditing(false);
            setTempValue(value);
        };

        const handleKeyDown = (e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") handleCancel();
        };

        return (
            <div className="flex items-center justify-between gap-3 my-2">
                <div className="flex items-center flex-grow gap-3">
                    <input
                        {...props}
                        ref={ref}
                        type="radio"
                        name={name}
                        defaultChecked={defaultChecked}
                        className="radio radio-primary"
                    />

                    {isEditing ? (
                        <>
                            <TextInput
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className="flex-grow"
                            />
                        </>
                    ) : (
                        <label className="flex-grow text-lg">{value}</label>
                    )}
                </div>

                <div className="flex gap-2 ml-2">
                    {isEditing ? (
                        <>
                            <button
                                type="button"
                                onClick={handleSave}
                                className="p-1 text-green-500 hover:text-green-700"
                                aria-label="Save"
                            >
                                <FaCheck />
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="p-1 text-red-500 hover:text-red-700"
                                aria-label="Cancel"
                            >
                                <FaTimes />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={handleEditClick}
                                className="p-1 text-blue-500 hover:text-blue-700"
                                aria-label="Edit"
                            >
                                <FaEdit />
                            </button>
                            {onDelete && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete();
                                    }}
                                    className="p-1 text-red-500 hover:text-red-700"
                                    aria-label="Delete"
                                >
                                    <FaTrash />
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    }
);

export default RadioWithEditableLabel;
