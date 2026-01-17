import { FaMoneyBillWave, FaCreditCard, FaHandshake } from "react-icons/fa";

export default function CategoryModal({ show, onSelect }) {
    // 1. Kalau show false, jangan render apa-apa
    if (!show) return null;

    const categories = [
        {
            id: "PRODUK FUNDING",
            label: "Funding",
            desc: "Tabungan, Deposito, Giro",
            icon: <FaMoneyBillWave className="w-8 h-8 text-emerald-500" />,
            color: "hover:border-emerald-500 hover:bg-emerald-50",
        },
        {
            id: "PRODUK KREDIT",
            label: "Kredit / Pinjaman",
            desc: "KUR, KPR, Modal Kerja",
            icon: <FaCreditCard className="w-8 h-8 text-blue-500" />,
            color: "hover:border-blue-500 hover:bg-blue-50",
        },
        {
            id: "PRODUK ANAK PERUSAHAAN",
            label: "Anak Perusahaan",
            desc: "Asuransi, Investasi, Sekuritas",
            icon: <FaHandshake className="w-8 h-8 text-purple-500" />,
            color: "hover:border-purple-500 hover:bg-purple-50",
        },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-2xl animate-fade-in-up">
                <div className="p-6 text-center border-b bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-800">
                        Pilih Kategori Produk
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Silakan pilih jenis produk yang ingin Anda laporkan.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            // Saat diklik, panggil fungsi dari Parent lewat props
                            onClick={() => onSelect(cat.id)}
                            className={`flex flex-col items-center p-6 border-2 border-gray-100 rounded-xl transition-all duration-200 group ${cat.color}`}
                        >
                            <div className="p-3 mb-3 transition-transform bg-white rounded-full shadow-sm group-hover:scale-110">
                                {cat.icon}
                            </div>
                            <span className="font-bold text-gray-700 group-hover:text-gray-900">
                                {cat.label}
                            </span>
                            <span className="mt-1 text-xs text-center text-gray-400">
                                {cat.desc}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
