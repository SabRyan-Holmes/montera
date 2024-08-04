import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import Modal from "react-modal";

export default function Dashboard({ auth }) {
    const [loading, setLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const downloadPdf = async () => {
        setLoading(true);
        try {
            const response = await fetch("/cetak");
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
            setIsModalOpen(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12 text-center">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={downloadPdf}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Download PDF"}
                </button>

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="PDF Modal"
                    className="pdf-modal"
                    overlayClassName="pdf-overlay"
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    ariaHideApp={false}
                >
                    <div className="pdf-modal-content">
                        <div className="pdf-modal-header">
                            <h2>PDF Preview</h2>
                            <button
                                onClick={closeModal}
                                className="text-red-600 text-3xl"
                            >
                                &times;
                            </button>
                        </div>
                        {pdfUrl && (
                            <iframe
                                src={pdfUrl}
                                width="100%"
                                height="600px"
                                style={{ border: "none" }}
                            />
                        )}
                    </div>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
}
