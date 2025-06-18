import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { IoCloseOutline } from "react-icons/io5";

export default function Modal({
    id = "modal", // 🆕 default id
    children,
    show = false,
    maxWidth = "2xl",
    closeable = true,
    onClose = () => {},
}) {
    const close = () => {
        if (closeable) {
            onClose(); // bisa sekalian set ID null di parent
        }
    };

    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "4xl": "sm:max-w-4xl",
        tablet: "max-w-screen-tablet", // full width
        laptop: "max-w-screen-laptop", // full width
        none: "max-w-none", // no max width
    }[maxWidth];

    return (
        <Transition show={show} leave="duration-200">
            <Dialog
                as="section"
                id={id}
                className="fixed inset-0 z-50 flex items-center px-4 overflow-y-auto transition-all transform sm:px-0 "
                onClose={close}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-black bg-opacity-70" />
                </TransitionChild>

                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <DialogPanel
                        className={`relative mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}`}
                    >
                        {/* Tombol close */}
                        <button
                            onClick={close}
                            className="absolute btn btn-md btn-circle btn-ghost right-2 top-2 hover:text-warning/80 hover:scale-105 hover:border hover:border-warning/40"
                        >
                            <IoCloseOutline className="w-10 h-10" />
                        </button>

                        {children}
                    </DialogPanel>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
}
