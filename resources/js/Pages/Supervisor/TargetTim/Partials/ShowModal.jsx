import { SecondaryButton } from "@/Components";
import { IoCloseOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import DetailTarget from "./DetailTarget";

// Modalny gw jadiin component btw
export default function ShowModal({
    target,
    setActiveModal,
    handleDelete,
    canManage = false,
}) {
    return (
                    <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                        {/* TODO Modif habis ini */}
                        {selectedPegawai && (
                            <div className="p-6">
                                {/* Header Modal */}
                                <div className="flex items-center justify-between mb-6">
                        {/* misal aksi detail pas mode per pegawai ini harusny ditampilin kek Daftar Target untuk Pegawai : {selected}  */}
                        {/* jika aksi detail pas mode per produk ini harusny ditampilin kek Daftar Target untuk Produk : {selected}  */}
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Rincian Performa: <span className="text-primary">{selectedPegawai.name}</span>
                                    </h2>

                                </div>

                                {/* Summary Cards dalam Modal */}
                                {/* TODO: ini harusny apa yg ditampilin berdasrakna field target, sesuainn */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                                        <p className="text-xs font-bold text-gray-500 uppercase">Total Realisasi</p>
                                        <p className="text-lg font-black text-secondary">{formatRupiah(selectedPegawai.total_realisasi)}</p>
                                    </div>
                                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                                        <p className="text-xs font-bold text-gray-500 uppercase">Capaian Target</p>
                                        <p className={`text-lg font-black ${
                                            selectedPegawai.persentase >= 100 ? 'text-success' : 'text-warning'
                                        }`}>
                                            {selectedPegawai.persentase}%
                                        </p>
                                    </div>
                                </div>

                                {/* Tabel Transaksi dalam Modal */}
                                <h3 className="mb-3 text-sm font-bold text-gray-700 uppercase">
                                    10 Transaksi Terakhir (Verified)
                                </h3>
                                <div className="overflow-hidden border border-gray-200 rounded-lg min-h-[150px]">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {/* TODO  header ini rombak habis, jika mode pegawai nama pegawai ga usah ditampiln lagi*/}
                                                {/* jika mode produk nama produk ga usah ditampiln lagi*/}
                                                <th className="px-4 py-2 text-xs font-medium text-left text-gray-500 uppercase">Tanggal</th>
                                                <th className="px-4 py-2 text-xs font-medium text-left text-gray-500 uppercase">Nasabah</th>
                                                <th className="px-4 py-2 text-xs font-medium text-left text-gray-500 uppercase">Produk</th>
                                                <th className="px-4 py-2 text-xs font-medium text-right text-gray-500 uppercase">Nominal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {isLoading ? (
                                                // STATE LOADING
                                                <tr>
                                                    <td colSpan="4" className="px-4 py-10 text-center">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <svg className="w-8 h-8 text-primary animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span className="mt-2 text-xs text-gray-500">Mengambil data terbaru...</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : transactions.length > 0 ? (
                                                // STATE ADA DATA
                                                transactions.map((trx, idx) => (
                                                    <tr key={idx}>
                                                        <td className="px-4 py-2 text-sm text-gray-600">{trx.tanggal}</td>
                                                        <td className="px-4 py-2 text-sm font-medium text-gray-800">{trx.nasabah}</td>
                                                        <td className="px-4 py-2 text-sm text-gray-600">{trx.produk}</td>
                                                        <td className="px-4 py-2 text-sm font-bold text-right text-gray-700">
                                                            {formatRupiah(trx.nominal)}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                // STATE KOSONG
                                                <tr>
                                                    <td colSpan="4" className="px-4 py-6 text-sm italic text-center text-gray-400">
                                                        Belum ada transaksi yang diverifikasi.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Footer Modal */}
                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        )}
                    </Modal>
    );
}
